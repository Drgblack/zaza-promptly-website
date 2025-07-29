const fs = require('fs');
const path = require('path');
const { seoDefaults } = require('../../packages/seo/seoDefaults');
const { getFAQPageStructuredData, getProductStructuredData } = require('../../packages/seo/structuredData');

const POSTS_DIR = path.join(__dirname, '../../apps/zaza-blog-post/content/posts');
const HISTORY_FILE = path.join(__dirname, '../../GENERATED_BLOG_HISTORY.md');

function getDateForDay(day) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = (day + 7 - dayOfWeek) % 7;
  const target = new Date(now);
  target.setDate(now.getDate() + diff);
  return target.toISOString().slice(0, 10);
}

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function writePost({ title, description, content, date, slug, faqs = [] }) {
  const frontmatter = [
    '---',
    `title: "${title}"`,
    `description: "${description}"`,
    `date: "${date}"`,
    `slug: "${slug}"`,
    '---',
    ''
  ].join('\n');
  const faqJsonLd = faqs.length ? `\n<script type="application/ld+json">${JSON.stringify(getFAQPageStructuredData(faqs), null, 2)}</script>\n` : '';
  const mdx = `${frontmatter}${faqJsonLd}${content.trim()}\n`;
  const filename = path.join(POSTS_DIR, `${slug}.mdx`);
  fs.writeFileSync(filename, mdx);
  fs.appendFileSync(HISTORY_FILE, `- [${title}](/blog/${slug}) (${date})\n`);
}

function generateMondayPost() {
  const date = getDateForDay(1); // Monday
  const title = 'How Zaza Promptly Can Save Teachers Hours Every Week';
  const description = 'Explore how Zaza Promptly helps teachers write reports and parent messages faster, with less stress.';
  const slug = slugify(title);
  const content = `
Teaching is hard. Writing reports shouldn't be.

Zaza Promptly uses AI to help you generate professional, accurate, and tone-matched report comments instantly. Whether you're stuck for words or just exhausted, Promptly gives you a fast, supportive head start  -  every time.

No fluff. No nonsense. Just relief.
`;
  writePost({ title, description, content, date, slug });
}

function generateWednesdayPost() {
  const date = getDateForDay(3); // Wednesday
  const title = 'Zaza Teach: AI Lesson Planning for Real Classrooms';
  const description = 'Discover how Zaza Teach empowers teachers to plan, adapt, and share lessons with AI support.';
  const slug = slugify(title);
  const content = `
Lesson planning is time-consuming. Zaza Teach makes it easier.

With AI-powered suggestions, curriculum alignment, and easy sharing, you can focus on what matters most: your students.
`;
  writePost({ title, description, content, date, slug });
}

function generateFridayPost() {
  const date = getDateForDay(5); // Friday
  // Example: rotate topics, here is a teacher trends post
  const title = 'Global EdTech Trends: How Teachers Are Saving Time Worldwide';
  const description = 'A look at international EdTech adoption, teacher productivity tips, and wellbeing strategies from around the world.';
  const slug = slugify(title);
  const content = `
**Teacher Insights:**

- In Finland, teachers use digital portfolios to reduce paperwork.
- In Australia, EdTech tools are helping with differentiated instruction.
- US teachers report that AI tools like Zaza Promptly save them 3+ hours per week (source: recent teacher survey).

**Wellbeing Tip:**

Take 10 minutes each Friday to reflect on your wins  -  big or small. Celebrate progress, not just perfection.

*This post is part of our weekly Teacher Trends series. Want to share your story? Contact us!*
`;
  const faqs = [
    { question: 'How can EdTech save teachers time?', answer: 'By automating repetitive tasks, providing instant feedback, and streamlining communication.' },
    { question: 'What are some global trends in teacher productivity?', answer: 'Digital portfolios, AI lesson planning, and wellbeing initiatives are on the rise.' }
  ];
  writePost({ title, description, content, date, slug, faqs });
}

function main() {
  generateMondayPost();
  generateWednesdayPost();
  generateFridayPost();
  console.log('Weekly blog posts generated and logged.');
}

if (require.main === module) {
  main();
} 