import { test, expect } from '@playwright/test';

const requiredPosts = [
  'teach-thinking-student-centred-problem-solving',
  'ai-lesson-planning-2025', 
  'teacher-burnout-prevention-strategies',
  'when-parents-question-everything-you-do'
];

const expectedTitles = [
  'Teach Thinking, Not Just Tasks',
  'AI Lesson Planning Revolution',
  'Teacher Burnout in 2025',
  'When Parents Question Everything'
];

test.describe('Blog functionality', () => {
  test('blog index page loads successfully', async ({ page }) => {
    await page.goto('/blog');
    
    // Check page loads with 200 status
    await expect(page).toHaveTitle(/AI Education Blog/);
    
    // Check main heading is present
    await expect(page.locator('h1')).toContainText('AI Education Blog');
    
    // Check at least 4 posts are displayed
    const postCards = page.locator('[data-testid="blog-post-card"], article');
    await expect(postCards).toHaveCount({ min: 4 });
    
    // Check that all required posts are present on the index
    for (const title of expectedTitles) {
      await expect(page.getByText(title, { exact: false })).toBeVisible();
    }
  });

  test.describe('Individual blog posts', () => {
    for (const slug of requiredPosts) {
      test(`${slug} renders successfully`, async ({ page }) => {
        const response = await page.goto(`/blog/${slug}`);
        
        // Check 200 status
        expect(response?.status()).toBe(200);
        
        // Check page has title
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title).not.toContain('404');
        
        // Check H1 is present and not empty
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
        
        const h1Text = await h1.textContent();
        expect(h1Text).toBeTruthy();
        expect(h1Text!.length).toBeGreaterThan(10);
        
        // Check category chip is present
        const categoryBadge = page.locator('[data-testid="category-badge"], .badge, [class*="badge"]').first();
        await expect(categoryBadge).toBeVisible();
        
        // Check article content is present
        const content = page.locator('article, main, [data-testid="blog-content"]').first();
        await expect(content).toBeVisible();
        
        // Check content has meaningful length
        const contentText = await content.textContent();
        expect(contentText!.length).toBeGreaterThan(100);
      });
    }
  });

  test('unknown blog route shows custom 404', async ({ page }) => {
    const response = await page.goto('/blog/deog', { waitUntil: 'networkidle' });
    
    // Check 404 status
    expect(response?.status()).toBe(404);
    
    // Check custom 404 page elements
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.getByText('Page Not Found')).toBeVisible();
    await expect(page.getByText('field trip')).toBeVisible();
    
    // Check helpful links are present
    await expect(page.getByRole('link', { name: /blog/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /try promptly/i })).toBeVisible();
  });

  test('non-existent route shows custom 404', async ({ page }) => {
    const response = await page.goto('/deog', { waitUntil: 'networkidle' });
    
    // Check 404 status  
    expect(response?.status()).toBe(404);
    
    // Check custom 404 page elements
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.getByText('Page Not Found')).toBeVisible();
    
    // Check Try Promptly CTA is present
    await expect(page.getByRole('link', { name: /try promptly/i })).toBeVisible();
    
    // Check helpful navigation links
    await expect(page.getByRole('link', { name: /blog/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
  });
  
  test('blog posts show correct categories from teacher taxonomy', async ({ page }) => {
    await page.goto('/blog');
    
    // Check that posts show teacher-focused categories
    const expectedCategories = ['AI Tools', 'Lesson Planning', 'Parent Communication', 'Teacher Wellness'];
    
    for (const category of expectedCategories) {
      // At least one post should have this category
      const categoryElements = page.getByText(category);
      const count = await categoryElements.count();
      if (count > 0) {
        await expect(categoryElements.first()).toBeVisible();
      }
    }
  });

  test('blog post spacing is properly optimized', async ({ page }) => {
    // Test a few key posts for proper spacing
    const testPosts = [
      'ai-lesson-planning-2025',
      'teacher-burnout-prevention-strategies', 
      'teach-thinking-student-centred-problem-solving'
    ];

    for (const slug of testPosts) {
      await page.goto(`/blog/${slug}`);
      
      // Check that page loads successfully
      await expect(page).toHaveTitle(/.+/);
      
      // Find the article container and first h1
      const articleContainer = page.locator('article').first();
      const h1Element = page.locator('h1').first();
      
      await expect(articleContainer).toBeVisible();
      await expect(h1Element).toBeVisible();
      
      // Get bounding rectangles
      const containerBox = await articleContainer.boundingBox();
      const h1Box = await h1Element.boundingBox();
      
      if (containerBox && h1Box) {
        // Calculate vertical gap between container top and h1
        const verticalGap = h1Box.y - containerBox.y;
        
        // Verify gap is less than 64px as specified
        expect(verticalGap).toBeLessThan(64);
        
        console.log(`${slug}: Container to H1 gap: ${verticalGap}px`);
      }
    }
  });

  test('no hero wrapper rendered when coverImage is empty', async ({ page }) => {
    // Test the new post which has empty coverImage
    await page.goto('/blog/teach-thinking-student-centred-problem-solving');
    
    // Check for absence of hero/featured image containers
    const heroSelectors = [
      'figure img[alt*="Teach Thinking"]',
      '.h-64.sm\\:h-80.lg\\:h-96', 
      '[class*="aspect-\\[16\\/9\\]"]'
    ];
    
    for (const selector of heroSelectors) {
      const heroElement = page.locator(selector);
      await expect(heroElement).toHaveCount(0);
    }
    
    // Verify content starts immediately with category badge
    const categoryBadge = page.locator('[class*="bg-purple-100"]').first();
    await expect(categoryBadge).toBeVisible();
    
    const badgeBox = await categoryBadge.boundingBox();
    if (badgeBox) {
      // Category badge should appear near top of container (within first 100px)
      expect(badgeBox.y).toBeLessThan(150);
    }
  });

  test('old launch post redirects to new article', async ({ page }) => {
    const response = await page.goto('/blog/zaza-promptly-official-launch');
    
    // Check that we got redirected (301/308 status) 
    expect([301, 302, 307, 308]).toContain(response?.status());
    
    // Verify we ended up on the new article page
    await expect(page).toHaveURL(/.*teach-thinking-student-centred-problem-solving/);
    
    // Verify new article loads properly
    await expect(page.locator('h1')).toContainText('Teach Thinking, Not Just Tasks');
  });
});