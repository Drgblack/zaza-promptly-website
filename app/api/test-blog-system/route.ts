import { NextRequest, NextResponse } from 'next/server'
import { getAllBlogPosts, getBlogPost } from '@/lib/blog'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const blogDir = path.join(process.cwd(), 'content/blog')
    const blogDirExists = fs.existsSync(blogDir)
    
    let files: string[] = []
    if (blogDirExists) {
      files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    }
    
    // Test getting all posts
    let allPosts: any[] = []
    let postsError = null
    try {
      allPosts = await getAllBlogPosts()
    } catch (error: any) {
      postsError = error.message
    }
    
    // Test getting a specific post
    let testPost = null
    let testPostError = null
    if (files.length > 0) {
      const testSlug = files[0].replace(/\.(md|mdx)$/, '')
      try {
        testPost = await getBlogPost(testSlug)
      } catch (error: any) {
        testPostError = error.message
      }
    }
    
    const publishedPosts = allPosts.filter(p => p.isPublished && !p.isDraft)
    
    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      blogDirectory: {
        exists: blogDirExists,
        path: blogDir,
        filesCount: files.length,
        files: files.slice(0, 5) // Show first 5 files
      },
      blogSystem: {
        totalPosts: allPosts.length,
        publishedPosts: publishedPosts.length,
        error: postsError
      },
      testPost: {
        slug: testPost?.slug || null,
        title: testPost?.title || null,
        hasContent: testPost?.content ? testPost.content.length > 0 : false,
        error: testPostError
      },
      routes: {
        blogIndex: '/blog',
        blogDynamic: '/blog/[slug]',
        blogNew: '/blog-new',
        blogNewDynamic: '/blog-new/[slug]'
      }
    })
    
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}