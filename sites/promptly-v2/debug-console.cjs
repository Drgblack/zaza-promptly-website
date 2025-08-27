const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  // Listen to console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('❌ Console Error:', msg.text());
    }
  });
  
  // Listen to page errors
  page.on('pageerror', error => {
    console.log('🔥 Page Error:', error.message);
    console.log('Stack:', error.stack);
  });
  
  try {
    console.log('🔍 Navigating to https://www.zazapromptly.com/en...');
    await page.goto('https://www.zazapromptly.com/en', { waitUntil: 'networkidle' });
    console.log('✅ Page loaded successfully');
    
    // Wait a bit to catch any delayed errors
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.log('💥 Navigation Error:', error.message);
  } finally {
    await browser.close();
  }
})();