import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function BlogTestPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Blog Test Page</h1>
      <p>This is a test to verify new routes work correctly.</p>
      <p>Generated at: {new Date().toISOString()}</p>
      <p>If you can see this page, the deployment system is working.</p>
      <p>Now testing blog system...</p>
      <Link href="/blog" className="text-blue-600 hover:underline">→ Go to Blog</Link>
    </div>
  )
}