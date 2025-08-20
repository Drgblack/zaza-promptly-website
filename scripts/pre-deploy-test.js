#!/usr/bin/env node

/**
 * Simplified pre-deploy test script for validation
 * Tests key functionality without full production build
 */

const fs = require('fs');
const path = require('path');

// Configuration for testing
const CONFIG = {
  testPages: [
    '/',
    '/faqs',
    '/pricing',
    '/for-primary-teachers',
    '/for-secondary-english', 
    '/for-special-education-iep',
    '/for-heads-of-year'
  ],
  locales: ['en', 'de', 'es', 'fr', 'it'],
  requiredMeta: ['title', 'description', 'og:title', 'og:description']
};

class PreDeployTester {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = 0;
    this.failed = 0;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const colors = {
      success: '\x1b[32m',
      error: '\x1b[31m', 
      warning: '\x1b[33m',
      info: '\x1b[36m',
      reset: '\x1b[0m'
    };
    
    const color = colors[type] || colors.info;
    const emoji = {
      success: '✅',
      error: '❌', 
      warning: '⚠️',
      info: 'ℹ️'
    }[type] || 'ℹ️';
    
    console.log(`${color}[${timestamp}] ${emoji} ${message}${colors.reset}`);
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

  // Check if all new route files exist
  async validateRouteFiles() {
    const routesToCheck = [
      'app/[locale]/pricing/page.tsx',
      'app/[locale]/for-primary-teachers/page.tsx',
      'app/[locale]/for-secondary-english/page.tsx',
      'app/[locale]/for-special-education-iep/page.tsx',
      'app/[locale]/for-heads-of-year/page.tsx'
    ];

    const missing = [];
    for (const route of routesToCheck) {
      const fullPath = path.join(process.cwd(), route);
      if (!fs.existsSync(fullPath)) {
        missing.push(route);
      }
    }

    if (missing.length > 0) {
      throw new Error(`Missing route files: ${missing.join(', ')}`);
    }
  }

  // Check if analytics files exist
  async validateAnalyticsFiles() {
    const analyticsFiles = [
      'hooks/useAnalytics.ts',
      'lib/ab-testing.ts',
      'components/ab-test/hero-ab-test.tsx',
      'components/ab-test/snippet-demo-ab-test.tsx'
    ];

    const missing = [];
    for (const file of analyticsFiles) {
      const fullPath = path.join(process.cwd(), file);
      if (!fs.existsSync(fullPath)) {
        missing.push(file);
      }
    }

    if (missing.length > 0) {
      throw new Error(`Missing analytics files: ${missing.join(', ')}`);
    }
  }

  // Validate sitemap includes new routes
  async validateSitemap() {
    const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts');
    if (!fs.existsSync(sitemapPath)) {
      throw new Error('sitemap.ts not found');
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    const requiredRoutes = ['/pricing', '/for-primary-teachers', '/for-secondary-english', '/for-special-education-iep', '/for-heads-of-year'];
    const missing = requiredRoutes.filter(route => !sitemapContent.includes(route));

    if (missing.length > 0) {
      throw new Error(`Missing routes in sitemap: ${missing.join(', ')}`);
    }
  }

  // Check email sequence files
  async validateEmailSequences() {
    const emailSeqPath = path.join(process.cwd(), 'lib', 'email-sequences.ts');
    if (!fs.existsSync(emailSeqPath)) {
      throw new Error('email-sequences.ts not found');
    }

    const content = fs.readFileSync(emailSeqPath, 'utf8');
    
    const requiredSequences = ['promptly_interest', 'teach_waitlist', 'general_tips'];
    const missing = requiredSequences.filter(seq => !content.includes(seq));

    if (missing.length > 0) {
      throw new Error(`Missing email sequences: ${missing.join(', ')}`);
    }
  }

  // Check pricing page components
  async validatePricingComponents() {
    const pricingClient = path.join(process.cwd(), 'app', '[locale]', 'pricing', 'PricingPageClient.tsx');
    if (!fs.existsSync(pricingClient)) {
      throw new Error('PricingPageClient.tsx not found');
    }

    const content = fs.readFileSync(pricingClient, 'utf8');
    
    // Check for Stripe integration
    if (!content.includes('stripe') && !content.includes('checkout')) {
      this.warnings.push('Pricing page may be missing Stripe integration');
    }

    // Check for analytics tracking
    if (!content.includes('trackCheckoutClick')) {
      this.warnings.push('Pricing page may be missing checkout tracking');
    }
  }

  // Validate translation structure
  async validateTranslations() {
    const translationPath = path.join(process.cwd(), 'messages', 'en.json');
    if (!fs.existsSync(translationPath)) {
      throw new Error('en.json translations not found');
    }

    const translations = JSON.parse(fs.readFileSync(translationPath, 'utf8'));
    
    if (!translations.Navigation) {
      throw new Error('Missing Navigation translations');
    }

    if (!translations.Pricing) {
      throw new Error('Missing Pricing translations');
    }
  }

  // Generate final report
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('\x1b[1mPre-Deploy Test Report\x1b[0m');
    console.log('='.repeat(60));
    
    console.log(`\n\x1b[32mPassed:\x1b[0m ${this.passed}`);
    console.log(`\x1b[31mFailed:\x1b[0m ${this.failed}`);
    console.log(`\x1b[33mWarnings:\x1b[0m ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n\x1b[31m\x1b[1mERRORS:\x1b[0m');
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }
    
    if (this.warnings.length > 0) {
      console.log('\n\x1b[33m\x1b[1mWARNINGS:\x1b[0m');
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`);
      });
    }
    
    console.log('\n' + '='.repeat(60));
    
    if (this.failed === 0) {
      console.log('\x1b[32m\x1b[1m✅ All core checks passed! Funnel implementation complete.\x1b[0m');
      return true;
    } else {
      console.log('\x1b[31m\x1b[1m❌ Some checks failed. Please review errors.\x1b[0m');
      return false;
    }
  }

  // Main execution
  async run() {
    console.log('\x1b[1m\x1b[36m🚀 Running pre-deploy tests...\x1b[0m\n');
    
    try {
      await this.runCheck('Route Files', () => this.validateRouteFiles());
      await this.runCheck('Analytics Files', () => this.validateAnalyticsFiles());
      await this.runCheck('Sitemap Validation', () => this.validateSitemap());
      await this.runCheck('Email Sequences', () => this.validateEmailSequences());
      await this.runCheck('Pricing Components', () => this.validatePricingComponents());
      await this.runCheck('Translation Structure', () => this.validateTranslations());
      
    } catch (error) {
      this.log(`Fatal error: ${error.message}`, 'error');
      this.failed++;
    }
    
    const success = this.generateReport();
    process.exit(success ? 0 : 1);
  }
}

// Run the test
if (require.main === module) {
  const tester = new PreDeployTester();
  tester.run().catch(error => {
    console.error(`\x1b[31mFatal error: ${error.message}\x1b[0m`);
    process.exit(1);
  });
}

module.exports = PreDeployTester;