#!/usr/bin/env node

/**
 * Build Search Index
 * Generates a static JSON search index from blog posts and case studies at build time
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = path.join(__dirname, '..')

// Utility functions (replicated from blog.ts and case-studies.ts to avoid TS import issues)
function getPostSlugs() {
  const blogDir = path.join(projectRoot, 'content', 'blog')
  if (!fs.existsSync(blogDir)) return []
  
  return fs.readdirSync(blogDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => file.replace(/\.mdx?$/, ''))
}

function getCaseStudySlugs() {
  const caseStudiesDir = path.join(projectRoot, 'content', 'case-studies')
  if (!fs.existsSync(caseStudiesDir)) return []
  
  return fs.readdirSync(caseStudiesDir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

async function getPostMeta(slug) {
  try {
    const blogDir = path.join(projectRoot, 'content', 'blog')
    const mdxPath = path.join(blogDir, `${slug}.mdx`)
    const mdPath = path.join(blogDir, `${slug}.md`)
    
    let filePath
    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath
    } else {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    // Check if file has export const metadata pattern
    const hasExportMetadata = /export\s+const\s+metadata\s*=/.test(fileContent)
    
    if (hasExportMetadata) {
      try {
        const metadataMatch = fileContent.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?})/m)
        if (metadataMatch) {
          const metadataCode = `(${metadataMatch[1]})`
          const metadata = eval(metadataCode)
          return {
            slug,
            ...metadata
          }
        }
      } catch (error) {
        console.warn(`Failed to parse metadata for ${slug}:`, error)
      }
    }
    
    // Fall back to frontmatter parsing
    const { data } = matter(fileContent)
    
    // Only include published posts
    if (data.isPublished === false || data.isDraft === true) {
      return null
    }
    
    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || data.excerpt || '',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author?.name || data.author || 'Zaza Team',
      tags: data.tags || [],
      category: data.category
    }
  } catch (error) {
    console.error(`Failed to load post metadata for ${slug}:`, error)
    return null
  }
}

async function getCaseStudyMeta(slug) {
  try {
    const caseStudiesDir = path.join(projectRoot, 'content', 'case-studies')
    const fullPath = path.join(caseStudiesDir, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // Check if file has export const metadata pattern first
    const hasExportMetadata = /export\s+const\s+metadata\s*=/.test(fileContents)
    
    if (hasExportMetadata) {
      try {
        const metadataMatch = fileContents.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?})/m)
        if (metadataMatch) {
          const metadataCode = `(${metadataMatch[1]})`
          const metadata = eval(metadataCode)
          return {
            slug,
            metadata: {
              title: metadata.title || 'Untitled Case Study',
              description: metadata.description || '',
              date: metadata.date || new Date().toISOString().split('T')[0],
              author: metadata.author || 'Zaza Team',
              school: metadata.school || '',
              image: metadata.image || '/images/case-studies/default.jpg'
            }
          }
        }
      } catch (error) {
        console.warn(`Failed to parse metadata for ${slug}:`, error)
      }
    }
    
    // Fall back to frontmatter parsing
    const { data } = matter(fileContents)
    
    // Only include published case studies
    if (data.isPublished === false || data.isDraft === true) {
      return null
    }
    
    return {
      slug,
      metadata: {
        title: data.title || 'Untitled Case Study',
        description: data.description || data.excerpt || '',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author?.name || data.author || 'Zaza Team',
        school: data.school || '',
        image: data.featuredImage || data.image || '/images/case-studies/default.jpg'
      }
    }
  } catch (error) {
    console.error(`Failed to load case study ${slug}:`, error)
    return null
  }
}

async function buildSearchIndex() {
  console.log('🔍 Building search index...')

  try {

    // Get all blog posts
    console.log('📝 Fetching blog posts...')
    const blogSlugs = getPostSlugs()
    const blogPosts = []
    for (const slug of blogSlugs) {
      const post = await getPostMeta(slug)
      if (post) blogPosts.push(post)
    }
    
    // Get all case studies
    console.log('📊 Fetching case studies...')
    const caseStudySlugs = getCaseStudySlugs()
    const caseStudies = []
    for (const slug of caseStudySlugs) {
      const caseStudy = await getCaseStudyMeta(slug)
      if (caseStudy) caseStudies.push(caseStudy)
    }

    // Build search index entries
    const searchIndex = []

    // Add blog posts to index
    blogPosts.forEach(post => {
      if (post) {
        searchIndex.push({
          id: `blog-${post.slug}`,
          type: 'blog',
          slug: post.slug,
          title: post.title,
          description: post.description,
          excerpt: post.description, // Use description as excerpt for blogs
          tags: post.tags || [],
          author: post.author,
          date: post.date,
          category: post.category,
          url: `/blog/${post.slug}`,
          // Create searchable text content
          searchContent: `${post.title} ${post.description} ${(post.tags || []).join(' ')} ${post.author || ''}`
        })
      }
    })

    // Add case studies to index
    caseStudies.forEach(caseStudy => {
      if (caseStudy && caseStudy.metadata) {
        searchIndex.push({
          id: `case-study-${caseStudy.slug}`,
          type: 'case-study',
          slug: caseStudy.slug,
          title: caseStudy.metadata.title,
          description: caseStudy.metadata.description,
          excerpt: caseStudy.metadata.description,
          tags: [], // Case studies don't currently have tags - could be added later
          author: caseStudy.metadata.author,
          date: caseStudy.metadata.date,
          category: 'Case Study',
          school: caseStudy.metadata.school,
          url: `/case-studies/${caseStudy.slug}`,
          // Create searchable text content
          searchContent: `${caseStudy.metadata.title} ${caseStudy.metadata.description} ${caseStudy.metadata.author || ''} ${caseStudy.metadata.school || ''}`
        })
      }
    })

    // Sort by date (most recent first)
    searchIndex.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Create the public directory if it doesn't exist
    const publicDir = path.join(projectRoot, 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Write the search index to a JSON file
    const searchIndexPath = path.join(publicDir, 'search-index.json')
    fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2))

    console.log(`✅ Search index built successfully!`)
    console.log(`📄 ${blogPosts.length} blog posts indexed`)
    console.log(`📊 ${caseStudies.length} case studies indexed`)
    console.log(`🔍 ${searchIndex.length} total items in search index`)
    console.log(`💾 Index saved to: ${searchIndexPath}`)

    // Also create a smaller metadata file for quick loading
    const metadataOnly = searchIndex.map(item => ({
      id: item.id,
      type: item.type,
      title: item.title,
      url: item.url,
      category: item.category
    }))

    const metadataPath = path.join(publicDir, 'search-metadata.json')
    fs.writeFileSync(metadataPath, JSON.stringify(metadataOnly, null, 2))
    console.log(`🏃 Lightweight metadata saved to: ${metadataPath}`)

  } catch (error) {
    console.error('❌ Error building search index:', error)
    process.exit(1)
  }
}

// Run the script
buildSearchIndex()