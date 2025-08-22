#!/usr/bin/env node

const { SiteChecker } = require('broken-link-checker');
const { spawn } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const PRODUCTION_URL = 'https://www.zazapromptly.com';
const DEV_PORT = 3000;
const baseUrl = process.env.CHECK_LINKS_URL || PRODUCTION_URL;

// Specific links to check based on codebase inventory
const CRITICAL_LINKS = [
  '/',
  '/products',
  '/pricing',
  '/blog',
  '/case-studies',
  '/learning-centre',
  '/free-resources',
  '/contact',
  '/waitlist',
  '/thank-you',
  '/privacy',
  '/terms',
  '/cookies',
  '/faq',
  '/about/founder',
  '/personas/uk-primary',
  '/personas/us-secondary',
  '/personas/uk-secondary',
  '/personas/us-primary',
  '/personas/au-primary',
  '/personas/nz-primary',
  '/personas/ca-primary'
];
let hasErrors = false;
let brokenLinks = [];
let checkedLinks = [];

console.log(`🔍 Checking links starting from: ${baseUrl}`);
console.log(`📋 Will specifically check ${CRITICAL_LINKS.length} critical links`);

// Function to check specific links first using native http/https
function checkLink(url) {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(url);
      const client = urlObj.protocol === 'https:' ? https : http;
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: 'HEAD',
        timeout: 10000,
        headers: {
          'User-Agent': 'Promptly-V2-Link-Checker/1.0'
        }
      };

      const req = client.request(options, (res) => {
        resolve({
          status: res.statusCode,
          ok: res.statusCode >= 200 && res.statusCode < 400,
          error: null
        });
      });

      req.on('error', (error) => {
        resolve({
          status: null,
          ok: false,
          error: error.message
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          status: null,
          ok: false,
          error: 'Request timeout'
        });
      });

      req.end();
    } catch (error) {
      resolve({
        status: null,
        ok: false,
        error: `Invalid URL: ${error.message}`
      });
    }
  });
}

// Function to check specific links first
async function checkCriticalLinks() {
  console.log('\n🎯 Checking critical links first...');
  
  for (const link of CRITICAL_LINKS) {
    const fullUrl = baseUrl + link;
    console.log(`Checking: ${fullUrl}`);
    
    const result = await checkLink(fullUrl);
    
    if (result.ok) {
      console.log(`✅ ${link} (${result.status})`);
      checkedLinks.push({ url: link, status: result.status, ok: true });
    } else {
      console.log(`❌ ${link} (${result.status || result.error})`);
      brokenLinks.push({ url: link, status: result.status, error: result.error || `HTTP ${result.status}` });
      hasErrors = true;
    }
  }
  
  console.log(`\n📊 Critical Links Summary: ${checkedLinks.length} OK, ${brokenLinks.length} broken\n`);
}

// Function to start dev server if needed
async function startDevServerIfNeeded() {
  if (!baseUrl.includes('localhost')) {
    return null;
  }
  
  console.log('Starting dev server...');
  const devServer = spawn('npm', ['run', 'dev'], { 
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false 
  });
  
  // Wait for server to start
  await new Promise((resolve) => {
    devServer.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready') || output.includes('ready') || output.includes('Local:')) {
        console.log('Dev server is ready');
        setTimeout(resolve, 2000); // Give it a moment to fully start
      }
    });
    
    // Fallback timeout
    setTimeout(resolve, 10000);
  });
  
  return devServer;
}

// Store devServer reference globally for cleanup
let globalDevServer = null;

const siteChecker = new SiteChecker({
  // Only check internal links
  filterLevel: 1,
  // Don't follow external links
  excludedKeywords: [
    'mailto:',
    'tel:',
    'javascript:',
    'data:',
    '#',
    'http://localhost:3001', // Different port
    'https://twitter.com',
    'https://linkedin.com',
    'https://github.com',
    'https://vercel.com'
  ],
  // Handle robots.txt and other common exclusions
  honorRobotExclusions: false,
  // Accept redirects as valid
  acceptedSchemes: ['http', 'https'],
  // Don't follow redirects, just accept them
  maxSockets: 5,
  // Timeout per request
  requestDelay: 100,
  // User agent
  userAgent: 'Promptly-V2-Link-Checker/1.0'
}, {
  robots: function(robots, customData){
    // Ignore robots.txt for internal link checking
  },
  html: function(tree, robots, response, pageUrl, customData) {
    // Track pages being checked
    console.log(`📄 Checking page: ${pageUrl}`);
  },
  junk: function(result, customData) {
    // Skip junk links (fragments, etc.)
  },
  link: function(result, customData) {
    if (result.broken) {
      hasErrors = true;
      brokenLinks.push({
        url: result.url.original,
        fromPage: result.base.original,
        status: result.http.response?.statusCode || null,
        error: result.brokenReason
      });
      console.error(`❌ BROKEN LINK: ${result.url.original}`);
      console.error(`   From page: ${result.base.original}`);
      console.error(`   Status: ${result.http.response?.statusCode || 'No response'}`);
      console.error(`   Reason: ${result.brokenReason}`);
      console.error('');
    } else if (result.excluded) {
      // Silently skip excluded links
    } else {
      checkedLinks.push({
        url: result.url.original,
        fromPage: result.base.original,
        status: result.http.response?.statusCode || 200,
        ok: true
      });
      console.log(`✅ ${result.url.original}`);
    }
  },
  page: function(error, pageUrl, customData) {
    if (error) {
      hasErrors = true;
      console.error(`❌ PAGE ERROR: ${pageUrl}`);
      console.error(`   Error: ${error.message}`);
      console.error('');
    }
  },
  site: function(error, siteUrl, customData) {
    // Cleanup
    if (globalDevServer) {
      console.log('Stopping dev server...');
      process.kill(-globalDevServer.pid);
    }
    
    if (error) {
      hasErrors = true;
      console.error(`❌ SITE ERROR: ${siteUrl}`);
      console.error(`   Error: ${error.message}`);
    }
    
    // Generate report
    const report = {
      timestamp: new Date().toISOString(),
      baseUrl,
      totalChecked: checkedLinks.length,
      totalBroken: brokenLinks.length,
      checkedLinks,
      brokenLinks
    };
    
    writeFileSync('link-check-report.json', JSON.stringify(report, null, 2));
    
    console.log('\n🏁 Link checking completed');
    console.log(`📊 Total links checked: ${checkedLinks.length}`);
    console.log(`❌ Broken links found: ${brokenLinks.length}`);
    console.log('📄 Report saved to: link-check-report.json');
    
    if (hasErrors) {
      console.error('\n💥 Found broken links or errors!');
      console.error('\n🔴 Broken Links Summary:');
      brokenLinks.forEach(link => {
        console.error(`  • ${link.url} (${link.error})`);
      });
      process.exit(1);
    } else {
      console.log('\n🎉 All links are working!');
      process.exit(0);
    }
  },
  end: function() {
    console.log('Link checking finished');
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, cleaning up...');
  if (globalDevServer) {
    process.kill(-globalDevServer.pid);
  }
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, cleaning up...');
  if (globalDevServer) {
    process.kill(-globalDevServer.pid);
  }
  process.exit(1);
});

// Main execution
async function main() {
  let devServer = null;
  
  try {
    // Start dev server if needed
    devServer = await startDevServerIfNeeded();
    globalDevServer = devServer; // Store for cleanup
    
    // First check critical links if checking production
    if (!baseUrl.includes('localhost')) {
      await checkCriticalLinks();
    }
    
    // Then run comprehensive site check
    console.log('🔍 Starting comprehensive site crawl...');
    siteChecker.enqueue(baseUrl);
  } catch (error) {
    console.error('Fatal error:', error);
    if (devServer) {
      process.kill(-devServer.pid);
    }
    process.exit(1);
  }
}

// Start the check
main();