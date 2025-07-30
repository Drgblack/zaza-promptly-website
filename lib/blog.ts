import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  publishedAt: Date;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  tags: string[];
  category: string;
  featuredImage?: string;
  readingTime: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
  };
  content: string;
  isPublished: boolean;
  isDraft: boolean;
  locale?: string;
  translations?: {
    [key: string]: {
      title: string;
      description: string;
      excerpt: string;
      content: string;
    };
  };
}

export interface BlogMetadata {
  title: string;
  description: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  tags: string[];
  category: string;
  featuredImage?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  isPublished?: boolean;
  isDraft?: boolean;
  locale?: string;
  translations?: {
    [key: string]: {
      title: string;
      description: string;
      excerpt: string;
      content: string;
    };
  };
}

// Ensure blog directory exists
export function ensureBlogDirectory() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

// Get all blog posts
export async function getAllBlogPosts(locale?: string): Promise<BlogPost[]> {
  ensureBlogDirectory();
  
  const files = fs.readdirSync(BLOG_DIR);
  const mdFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
  
  const posts = await Promise.all(
    mdFiles.map(async (file) => {
      const slug = file.replace(/\.(mdx|md)$/, '');
      return await getBlogPost(slug, locale);
    })
  );
  
  return posts
    .filter(post => post.isPublished)
    .filter(post => !locale || post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get published blog posts
export async function getPublishedBlogPosts(locale?: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts(locale);
  return posts.filter(post => post.isPublished && !post.isDraft);
}

// Get blog post by slug
export async function getBlogPost(slug: string, locale?: string): Promise<BlogPost> {
  ensureBlogDirectory();
  
  // Try .mdx first, then .md
  let filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(BLOG_DIR, `${slug}.md`);
  }
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  const metadata = data as BlogMetadata;
  
  // Handle translations if locale is specified and not 'en'
  let title = metadata.title;
  let description = metadata.description;
  let excerpt = metadata.excerpt;
  let translatedContent = content;
  
  if (locale && locale !== 'en' && metadata.translations?.[locale]) {
    const translation = metadata.translations[locale];
    title = translation.title;
    description = translation.description;
    excerpt = translation.excerpt;
    translatedContent = translation.content;
  }
  
  // Calculate reading time (average 200 words per minute)
  const wordCount = translatedContent.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  // Generate excerpt if not provided
  excerpt = excerpt || translatedContent.split('\n\n')[0].substring(0, 160) + '...';
  
  // Handle author field - can be string or object
  let authorObj;
  if (typeof metadata.author === 'string') {
    authorObj = { name: metadata.author };
  } else if (metadata.author && typeof metadata.author === 'object') {
    authorObj = metadata.author;
  } else {
    authorObj = { name: 'Zaza Promptly Team' };
  }
  
  return {
    slug,
    title,
    description,
    excerpt,
    date: metadata.date,
    publishedAt: new Date(metadata.date),
    author: authorObj,
    tags: metadata.tags || [],
    category: metadata.category || 'Education',
    featuredImage: metadata.featuredImage,
    readingTime,
    seo: {
      title: metadata.seo?.title || title,
      description: metadata.seo?.description || description,
      keywords: metadata.seo?.keywords || metadata.tags || [],
      canonicalUrl: `https://zazapromptly.com${locale && locale !== 'en' ? `/${locale}` : ''}/blog/${slug}`
    },
    content: translatedContent,
    isPublished: metadata.isPublished !== false,
    isDraft: metadata.isDraft === true,
    locale: locale || metadata.locale || 'en',
    translations: metadata.translations
  };
}

// Get posts by category
export async function getBlogPostsByCategory(category: string, locale?: string): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts(locale);
  return posts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

// Get posts by tag
export async function getBlogPostsByTag(tag: string, locale?: string): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts(locale);
  return posts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

// Get related posts
export async function getRelatedPosts(slug: string, limit: number = 3, locale?: string): Promise<BlogPost[]> {
  const currentPost = await getBlogPost(slug, locale);
  const allPosts = await getPublishedBlogPosts(locale);
  
  // Filter out current post
  const otherPosts = allPosts.filter(post => post.slug !== slug);
  
  // Score posts based on tag and category similarity
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Category match (highest weight)
    if (post.category === currentPost.category) {
      score += 10;
    }
    
    // Tag matches
    const tagMatches = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    ).length;
    score += tagMatches * 3;
    
    // Author match
    if (post.author.name === currentPost.author.name) {
      score += 2;
    }
    
    return { post, score };
  });
  
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

// Get all categories
export async function getAllCategories(locale?: string): Promise<string[]> {
  const posts = await getPublishedBlogPosts(locale);
  const categories = [...new Set(posts.map(post => post.category))];
  return categories.sort();
}

// Get all tags
export async function getAllTags(locale?: string): Promise<string[]> {
  const posts = await getPublishedBlogPosts(locale);
  const tags = [...new Set(posts.flatMap(post => post.tags))];
  return tags.sort();
}

// Search blog posts
export async function searchBlogPosts(query: string, locale?: string): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts(locale);
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.category.toLowerCase().includes(searchTerm)
  );
}

// Create new blog post
export async function createBlogPost(
  slug: string, 
  metadata: BlogMetadata, 
  content: string
): Promise<void> {
  ensureBlogDirectory();
  
  const frontmatter = matter.stringify(content, metadata);
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  
  fs.writeFileSync(filePath, frontmatter);
}

// Get blog post slugs for static generation
export async function getBlogPostSlugs(): Promise<string[]> {
  ensureBlogDirectory();
  
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => file.replace(/\.(mdx|md)$/, ''));
}

// Get popular posts (based on a simple metric like recent + high tag count)
export async function getPopularPosts(limit: number = 5, locale?: string): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts(locale);
  
  // Simple popularity algorithm: recent posts with more tags
  const scoredPosts = posts.map(post => {
    const daysSincePublished = (Date.now() - post.publishedAt.getTime()) / (1000 * 60 * 60 * 24);
    const recencyScore = Math.max(0, 30 - daysSincePublished); // Favor posts from last 30 days
    const tagScore = post.tags.length * 2;
    const titleEngagementScore = post.title.split(' ').length > 6 ? 3 : 0; // Favor descriptive titles
    
    return {
      post,
      score: recencyScore + tagScore + titleEngagementScore
    };
  });
  
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

// Generate blog post URL
export function getBlogPostUrl(slug: string): string {
  return `/blog/${slug}`;
}

// Generate category URL
export function getCategoryUrl(category: string): string {
  return `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`;
}

// Generate tag URL
export function getTagUrl(tag: string): string {
  return `/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`;
}

// Validate blog post metadata
export function validateBlogMetadata(metadata: Partial<BlogMetadata>): string[] {
  const errors: string[] = [];
  
  if (!metadata.title) errors.push('Title is required');
  if (!metadata.description) errors.push('Description is required');
  if (!metadata.date) errors.push('Date is required');
  if (!metadata.author?.name) errors.push('Author name is required');
  if (!metadata.category) errors.push('Category is required');
  if (!metadata.tags || metadata.tags.length === 0) errors.push('At least one tag is required');
  
  return errors;
}