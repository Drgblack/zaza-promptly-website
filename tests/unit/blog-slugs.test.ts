import { getBlogPost, getBlogPostSlugs } from '@/lib/blog';

// Mock fs to avoid file system dependencies in unit tests
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readdirSync: jest.fn(),
  readFileSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

// Mock gray-matter
jest.mock('gray-matter', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Blog slug resolver', () => {
  const mockFs = require('fs');
  const mockMatter = require('gray-matter').default;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBlogPostSlugs', () => {
    it('should return array of slugs from MDX files', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue([
        'zaza-promptly-official-launch.mdx',
        'ai-lesson-planning-2025.mdx', 
        'teacher-burnout-prevention-strategies.md',
        'when-parents-question-everything-you-do.md',
        'not-a-blog-post.txt', // Should be filtered out
        '.hidden-file.mdx' // Should be included
      ]);

      const slugs = await getBlogPostSlugs();
      
      expect(slugs).toEqual([
        'zaza-promptly-official-launch',
        'ai-lesson-planning-2025',
        'teacher-burnout-prevention-strategies', 
        'when-parents-question-everything-you-do',
        '.hidden-file'
      ]);
    });

    it('should return empty array when blog directory does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => {});
      mockFs.readdirSync.mockReturnValue([]);

      const slugs = await getBlogPostSlugs();
      
      expect(slugs).toEqual([]);
    });
  });

  describe('getBlogPost', () => {
    const mockPost = {
      title: 'Test Post',
      description: 'Test description',
      excerpt: 'Test excerpt', 
      date: '2025-01-29',
      author: { name: 'Test Author' },
      tags: ['test'],
      category: 'AI Tools',
      isPublished: true,
      isDraft: false
    };

    it('should successfully parse and return blog post', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('mock file content');
      mockMatter.mockReturnValue({
        data: mockPost,
        content: 'Test content'
      });

      const post = await getBlogPost('test-slug', 'en');
      
      expect(post.slug).toBe('test-slug');
      expect(post.title).toBe('Test Post');
      expect(post.isPublished).toBe(true);
      expect(post.category).toBe('AI Tools');
    });

    it('should throw error for non-existent post', async () => {
      mockFs.existsSync.mockReturnValue(false);

      await expect(getBlogPost('non-existent-slug', 'en')).rejects.toThrow('Blog post not found: non-existent-slug');
    });

    it('should handle string author format', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('mock file content');
      mockMatter.mockReturnValue({
        data: { ...mockPost, author: 'String Author' },
        content: 'Test content'
      });

      const post = await getBlogPost('test-slug', 'en');
      
      expect(post.author).toEqual({ name: 'String Author' });
    });

    it('should use default author when author is missing', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('mock file content');
      mockMatter.mockReturnValue({
        data: { ...mockPost, author: undefined },
        content: 'Test content'
      });

      const post = await getBlogPost('test-slug', 'en');
      
      expect(post.author).toEqual({ name: 'Zaza Promptly Team' });
    });
  });
});