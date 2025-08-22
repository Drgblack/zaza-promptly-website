#!/usr/bin/env node

const { SiteChecker } = require('broken-link-checker');
const { spawn } = require('child_process');
const { readFileSync } = require('fs');

// Read package.json to get the dev server port
let devPort = 3000;
try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  // Default to 3000, but allow override via env or package.json
  devPort = process.env.DEV_PORT || 3000;
} catch (e) {
  console.log('Using default port 3000');
}

const baseUrl = process.env.CHECK_LINKS_URL || `http://localhost:${devPort}`;
let hasErrors = false;

console.log(`🔍 Checking links starting from: ${baseUrl}`);

// Start the dev server if we're checking localhost
let devServer = null;
if (baseUrl.includes('localhost')) {
  console.log('Starting dev server...');
  devServer = spawn('npm', ['run', 'dev'], { 
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
}

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
  // Maximum concurrent requests
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
      console.error(`❌ BROKEN LINK: ${result.url.original}`);
      console.error(`   From page: ${result.base.original}`);
      console.error(`   Status: ${result.http.response?.statusCode || 'No response'}`);
      console.error(`   Reason: ${result.brokenReason}`);
      console.error('');
    } else if (result.excluded) {
      // Silently skip excluded links
    } else {
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
    if (devServer) {
      console.log('Stopping dev server...');
      process.kill(-devServer.pid);
    }
    
    if (error) {
      hasErrors = true;
      console.error(`❌ SITE ERROR: ${siteUrl}`);
      console.error(`   Error: ${error.message}`);
    }
    
    console.log('\n🏁 Link checking completed');
    
    if (hasErrors) {
      console.error('💥 Found broken links or errors!');
      process.exit(1);
    } else {
      console.log('🎉 All links are working!');
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
  if (devServer) {
    process.kill(-devServer.pid);
  }
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, cleaning up...');
  if (devServer) {
    process.kill(-devServer.pid);
  }
  process.exit(1);
});

// Start the site check
siteChecker.enqueue(baseUrl);