#!/usr/bin/env node

/**
 * Pre-deploy validation script for Zaza Promptly
 * Runs comprehensive checks before deployment including:
 * - Lighthouse CI for performance budgets
 * - Internal link validation
 * - Sitemap.xml validation
 * - Locale route integrity
 * - Basic accessibility checks
 * - SEO meta validation
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const https = require('https');
const http = require('http');

const chalk = require('chalk');

// Configuration
const CONFIG = {
  // Performance budgets (in milliseconds)
  performance: {
    lcp: {
      desktop: 2500,
      mobile: 3000
    },
    cls: 0.1,
    tbt: 200,
    fcp: {
      desktop: 1800,
      mobile: 2500
    }
  },
  
  // Pages to test
  testPages: [
    '/',
    '/faqs',
    '/pricing',
    '/for-primary-teachers',
    '/for-secondary-english',
    '/for-special-education-iep',
    '/for-heads-of-year'
  ],
  
  // Locales to validate
  locales: ['en', 'de', 'es', 'fr', 'it'],
  
  // Required meta tags
  requiredMeta: [
    'title',
    'description',
    'og:title',
    'og:description',
    'twitter:title',
    'twitter:description'
  ]
};

class PreDeployValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = 0;
    this.failed = 0;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    switch (type) {
      case 'success':
        console.log(chalk.green(`[${timestamp}] ✅ ${message}`));
        break;
      case 'error':
        console.log(chalk.red(`[${timestamp}] ❌ ${message}`));
        break;
      case 'warning':
        console.log(chalk.yellow(`[${timestamp}] ⚠️  ${message}`));
        break;
      case 'info':
      default:
        console.log(chalk.blue(`[${timestamp}] ℹ️  ${message}`));
        break;
    }
  }

  async runCheck(name, checkFn) {
    this.log(`Running ${name}...`);
    try {
      await checkFn();
      this.passed++;
      this.log(`${name} passed`, 'success');
    } catch (error) {
      this.failed++;
      this.errors.push(`${name}: ${error.message}`);
      this.log(`${name} failed: ${error.message}`, 'error');
    }
  }

  // Build the Next.js app
  async buildApp() {
    this.log('Building Next.js application...');
    try {
      execSync('npm run build', { 
        stdio: 'pipe',
        timeout: 300000 // 5 minutes timeout
      });
      this.log('Build completed successfully', 'success');
    } catch (error) {
      throw new Error(`Build failed: ${error.message}`);
    }
  }

  // Start the Next.js server for testing
  async startServer() {
    return new Promise((resolve, reject) => {
      this.log('Starting Next.js server for testing...');
      
      const server = spawn('npm', ['start'], {
        stdio: 'pipe',
        env: { ...process.env, PORT: '3000' }
      });

      let serverReady = false;
      const timeout = setTimeout(() => {
        if (!serverReady) {
          server.kill();
          reject(new Error('Server failed to start within timeout'));
        }
      }, 60000); // 1 minute timeout

      server.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Ready on') || output.includes('started server')) {
          serverReady = true;
          clearTimeout(timeout);
          this.log('Next.js server started successfully', 'success');
          resolve(server);
        }
      });

      server.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      server.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });
  }

  // Run Lighthouse CI performance tests
  async runLighthouseCi() {
    this.log('Running Lighthouse CI performance tests...');
    
    const lighthouseConfig = {
      ci: {
        collect: {
          url: CONFIG.testPages.map(page => `http://localhost:3000${page}`),
          numberOfRuns: 1,
          settings: {
            chromeFlags: '--headless --no-sandbox --disable-gpu',
          }
        },
        assert: {
          assertions: {
            'categories:performance': ['error', { minScore: 0.75 }],
            'categories:accessibility': ['error', { minScore: 0.9 }],
            'categories:seo': ['error', { minScore: 0.8 }],
            'categories:best-practices': ['error', { minScore: 0.9 }],
            // Performance budgets
            'largest-contentful-paint': ['error', { maxNumericValue: CONFIG.performance.lcp.desktop }],
            'cumulative-layout-shift': ['error', { maxNumericValue: CONFIG.performance.cls }],
            'total-blocking-time': ['error', { maxNumericValue: CONFIG.performance.tbt }],
            'first-contentful-paint': ['error', { maxNumericValue: CONFIG.performance.fcp.desktop }]
          }
        },
        upload: {
          target: 'temporary-public-storage'
        }
      }
    };

    // Write lighthouse config
    fs.writeFileSync('.lighthouserc.json', JSON.stringify(lighthouseConfig, null, 2));

    try {
      execSync('npx @lhci/cli autorun', { 
        stdio: 'inherit',
        timeout: 300000 // 5 minutes timeout
      });
      
      // Clean up
      if (fs.existsSync('.lighthouserc.json')) {
        fs.unlinkSync('.lighthouserc.json');
      }
      
    } catch (error) {
      throw new Error(`Lighthouse CI failed: Performance or accessibility scores below threshold`);
    }
  }

  // Check internal links
  async checkInternalLinks() {
    this.log('Validating internal links...');
    
    const baseUrl = 'http://localhost:3000';
    const checkedLinks = new Set();
    const brokenLinks = [];

    const checkLink = async (url) => {
      if (checkedLinks.has(url)) return;
      checkedLinks.add(url);

      return new Promise((resolve) => {
        const client = url.startsWith('https:') ? https : http;
        
        client.get(url, (res) => {
          if (res.statusCode >= 400) {
            brokenLinks.push(`${url} -> ${res.statusCode}`);
          }
          resolve();
        }).on('error', () => {
          brokenLinks.push(`${url} -> Network Error`);
          resolve();
        });
      });
    };

    // Check main pages
    for (const page of CONFIG.testPages) {
      await checkLink(`${baseUrl}${page}`);
      
      // Also check localized versions
      for (const locale of CONFIG.locales) {
        if (locale !== 'en') {
          await checkLink(`${baseUrl}/${locale}${page}`);
        }
      }
    }

    if (brokenLinks.length > 0) {
      throw new Error(`Found ${brokenLinks.length} broken links:\n${brokenLinks.join('\n')}`);
    }
  }

  // Validate sitemap.xml
  async validateSitemap() {
    this.log('Validating sitemap.xml...');
    
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      throw new Error('sitemap.xml not found in public directory');
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Check for required pages in sitemap
    const requiredUrls = [];
    CONFIG.testPages.forEach(page => {
      CONFIG.locales.forEach(locale => {
        const url = locale === 'en' ? page : `/${locale}${page}`;
        requiredUrls.push(url === '/' ? '' : url);
      });
    });

    const missingUrls = requiredUrls.filter(url => {
      const fullUrl = `https://zazapromptly.com${url}`;
      return !sitemapContent.includes(fullUrl);
    });

    if (missingUrls.length > 0) {
      throw new Error(`Missing URLs in sitemap: ${missingUrls.join(', ')}`);
    }

    // Validate XML structure
    if (!sitemapContent.includes('<?xml version="1.0"') || 
        !sitemapContent.includes('<urlset') ||
        !sitemapContent.includes('</urlset>')) {
      throw new Error('Invalid sitemap.xml structure');
    }
  }

  // Validate robots.txt
  async validateRobots() {
    this.log('Validating robots.txt...');
    
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
      this.warnings.push('robots.txt not found - consider adding one for SEO');
      return;
    }

    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    
    if (!robotsContent.includes('User-agent:')) {
      throw new Error('robots.txt missing User-agent directive');
    }

    if (!robotsContent.includes('Sitemap:')) {
      this.warnings.push('robots.txt should include Sitemap directive');
    }
  }

  // Check locale route integrity
  async validateLocaleRoutes() {
    this.log('Validating locale route integrity...');
    
    const baseUrl = 'http://localhost:3000';
    const routeErrors = [];

    for (const locale of CONFIG.locales) {
      for (const page of CONFIG.testPages) {
        const url = locale === 'en' ? `${baseUrl}${page}` : `${baseUrl}/${locale}${page}`;
        
        try {
          await new Promise((resolve, reject) => {
            const client = url.startsWith('https:') ? https : http;
            
            client.get(url, (res) => {
              if (res.statusCode >= 400) {
                routeErrors.push(`${locale}${page} -> ${res.statusCode}`);
              }
              resolve();
            }).on('error', (error) => {
              routeErrors.push(`${locale}${page} -> ${error.message}`);
              resolve(); // Don't reject, just log
            });
          });
        } catch (error) {
          routeErrors.push(`${locale}${page} -> ${error.message}`);
        }
      }
    }

    if (routeErrors.length > 0) {
      throw new Error(`Locale route errors:\n${routeErrors.join('\n')}`);
    }
  }

  // Basic accessibility checks
  async checkAccessibility() {
    this.log('Running basic accessibility checks...');
    
    // Check if accessibility-related packages are installed
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const hasA11yDeps = packageJson.dependencies?.['@axe-core/react'] || 
                       packageJson.devDependencies?.['@axe-core/react'] ||
                       packageJson.dependencies?.['eslint-plugin-jsx-a11y'] ||
                       packageJson.devDependencies?.['eslint-plugin-jsx-a11y'];
    
    if (!hasA11yDeps) {
      this.warnings.push('Consider adding accessibility testing dependencies like @axe-core/react');
    }

    // Check for common accessibility patterns in code
    const srcFiles = this.getAllFiles(path.join(process.cwd(), 'app'), '.tsx').concat(
      this.getAllFiles(path.join(process.cwd(), 'components'), '.tsx')
    );

    let missingAltTags = 0;
    let missingAriaLabels = 0;

    srcFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for images without alt text
      const imgMatches = content.match(/<img[^>]*>/g);
      if (imgMatches) {
        imgMatches.forEach(img => {
          if (!img.includes('alt=')) {
            missingAltTags++;
          }
        });
      }

      // Check for buttons without accessible names
      const buttonMatches = content.match(/<button[^>]*>/g);
      if (buttonMatches) {
        buttonMatches.forEach(button => {
          if (!button.includes('aria-label=') && !content.includes('</button>')) {
            missingAriaLabels++;
          }
        });
      }
    });

    if (missingAltTags > 0) {
      this.warnings.push(`Found ${missingAltTags} images potentially missing alt text`);
    }

    if (missingAriaLabels > 0) {
      this.warnings.push(`Found ${missingAriaLabels} interactive elements potentially missing accessible names`);
    }
  }

  // Helper function to get all files with specific extension
  getAllFiles(dir, ext) {
    const files = [];
    
    if (!fs.existsSync(dir)) return files;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...this.getAllFiles(fullPath, ext));
      } else if (fullPath.endsWith(ext)) {
        files.push(fullPath);
      }
    });
    
    return files;
  }

  // Generate final report
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log(chalk.bold('Pre-Deploy Validation Report'));
    console.log('='.repeat(60));
    
    console.log(`\n${chalk.green('Passed:')} ${this.passed}`);
    console.log(`${chalk.red('Failed:')} ${this.failed}`);
    console.log(`${chalk.yellow('Warnings:')} ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n' + chalk.red.bold('ERRORS:'));
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }
    
    if (this.warnings.length > 0) {
      console.log('\n' + chalk.yellow.bold('WARNINGS:'));
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`);
      });
    }
    
    console.log('\n' + '='.repeat(60));
    
    if (this.failed === 0) {
      console.log(chalk.green.bold('✅ All checks passed! Ready for deployment.'));
      return true;
    } else {
      console.log(chalk.red.bold('❌ Some checks failed. Please fix errors before deploying.'));
      return false;
    }
  }

  // Main execution
  async run() {
    console.log(chalk.bold.blue('🚀 Starting pre-deploy validation...\n'));
    
    let server = null;
    
    try {
      // Build the application
      await this.runCheck('Build Application', () => this.buildApp());
      
      // Start server for testing
      server = await this.startServer();
      
      // Wait a moment for server to be fully ready
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Run all validation checks
      await this.runCheck('Lighthouse CI Performance', () => this.runLighthouseCi());
      await this.runCheck('Internal Links', () => this.checkInternalLinks());
      await this.runCheck('Sitemap Validation', () => this.validateSitemap());
      await this.runCheck('Robots.txt Validation', () => this.validateRobots());
      await this.runCheck('Locale Routes', () => this.validateLocaleRoutes());
      await this.runCheck('Basic Accessibility', () => this.checkAccessibility());
      
    } catch (error) {
      this.log(`Fatal error: ${error.message}`, 'error');
      this.failed++;
    } finally {
      // Clean up server
      if (server) {
        this.log('Shutting down test server...');
        server.kill();
      }
    }
    
    // Generate and return report
    const success = this.generateReport();
    process.exit(success ? 0 : 1);
  }
}

// Check if required dependencies are installed
function checkDependencies() {
  const requiredDeps = ['chalk'];
  const missingDeps = [];
  
  requiredDeps.forEach(dep => {
    try {
      require.resolve(dep);
    } catch (error) {
      missingDeps.push(dep);
    }
  });
  
  if (missingDeps.length > 0) {
    console.log(`Missing dependencies: ${missingDeps.join(', ')}`);
    console.log('Installing...');
    execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit' });
  }
}

// Run the validator
if (require.main === module) {
  checkDependencies();
  const validator = new PreDeployValidator();
  validator.run().catch(error => {
    console.error(chalk.red(`Fatal error: ${error.message}`));
    process.exit(1);
  });
}

module.exports = PreDeployValidator;