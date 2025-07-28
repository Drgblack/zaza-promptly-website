import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

const POSTS_PATH = path.join(process.cwd(), 'apps/zaza-blog-post/content/posts');

export const metadata = {
  title: 'Zaza Blog | AI in Education, Tips & Stories',
  description: 'Read the latest posts from Zaza Technologies: AI-powered education, teacher tips, product updates, and more.',
  openGraph: {
    title: 'Zaza Blog | AI in Education, Tips & Stories',
    description: 'Read the latest posts from Zaza Technologies: AI-powered education, teacher tips, product updates, and more.',
    url: 'https://zazatechnologies.com/blog',
    siteName: 'Zaza Technologies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Blog | AI in Education, Tips & Stories',
    description: 'Read the latest posts from Zaza Technologies: AI-powered education, teacher tips, product updates, and more.',
  },
  alternates: {
    canonical: 'https://zazatechnologies.com/blog',
  },
};

function getAllPosts() {
  const files = fs.readdirSync(POSTS_PATH).filter(f => f.endsWith('.mdx'));
  return files.map((file) => {
    const slug = file.replace(/\.mdx?$/, '');
    const filePath = path.join(POSTS_PATH, file);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      excerpt: content.split('\n').slice(2, 6).join(' ').slice(0, 160) + '...',
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Zaza Blog</h1>
      <ul className="space-y-8">
        {posts.map(post => (
          <li key={post.slug} className="border-b pb-6">
            <Link href={`/blog/${post.slug}`} className="text-2xl font-semibold text-purple-700 hover:underline">
              {post.title}
            </Link>
            <div className="text-gray-500 text-sm mb-2">{post.date}</div>
            <p className="text-gray-700 mb-2">{post.description || post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-purple-600 hover:underline text-sm">Read more →</Link>
          </li>
        ))}
      </ul>
    </main>
  );
} 