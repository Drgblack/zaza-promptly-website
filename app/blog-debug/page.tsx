import { getAllBlogPosts } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export default async function BlogDebugPage() {
  try {
    const allPosts = await getAllBlogPosts()
    
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Blog Debug Information</h1>
        
        <div className="bg-green-100 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">✅ Blog System Status: Working</h2>
          <p>Found {allPosts.length} blog posts</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Blog Posts:</h2>
          {allPosts.map((post) => (
            <div key={post.slug} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-600">Slug: {post.slug}</p>
              <p className="text-gray-600">Published: {post.isPublished ? 'Yes' : 'No'}</p>
              <p className="text-gray-600">Draft: {post.isDraft ? 'Yes' : 'No'}</p>
              <p className="text-gray-600">Date: {post.date}</p>
              <p className="text-gray-600">Category: {post.category}</p>
              <p className="text-gray-600">Tags: {post.tags.join(', ')}</p>
              <a 
                href={`/blog/${post.slug}`} 
                className="text-blue-600 hover:underline"
              >
                → View Post: /blog/{post.slug}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Environment Info:</h3>
          <p>Node Environment: {process.env.NODE_ENV}</p>
          <p>Deployment Time: {new Date().toISOString()}</p>
          <p>Current Domain: zazatechnologies.com</p>
        </div>
      </div>
    )
  } catch (error: any) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Blog Debug Information</h1>
        
        <div className="bg-red-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">❌ Blog System Error</h2>
          <p className="font-mono text-sm">{error.message}</p>
          <pre className="mt-4 text-xs overflow-auto">{error.stack}</pre>
        </div>
      </div>
    )
  }
}