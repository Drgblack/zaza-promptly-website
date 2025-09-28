#!/usr/bin/env node
/**
 * Image Audit Script
 * Scans for images > 300KB and non-webp formats
 */

import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif']
const MAX_SIZE_KB = 300
const PREFERRED_FORMATS = ['.webp', '.avif']

async function scanDirectory(dir) {
  const issues = []
  
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      
      if (entry.isDirectory()) {
        // Skip node_modules and .next directories
        if (!['node_modules', '.next', '.git'].includes(entry.name)) {
          const subIssues = await scanDirectory(fullPath)
          issues.push(...subIssues)
        }
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase()
        
        if (IMAGE_EXTENSIONS.includes(ext)) {
          const stats = await stat(fullPath)
          const sizeKB = stats.size / 1024
          const relativePath = fullPath.replace(process.cwd(), '').replace(/\\/g, '/')
          
          // Check size
          if (sizeKB > MAX_SIZE_KB) {
            issues.push({
              type: 'large-file',
              path: relativePath,
              size: `${Math.round(sizeKB)}KB`,
              issue: `File exceeds ${MAX_SIZE_KB}KB limit`
            })
          }
          
          // Check format (only flag non-webp for display images, not icons)
          if (!PREFERRED_FORMATS.includes(ext) && !relativePath.includes('icon') && ext !== '.svg') {
            issues.push({
              type: 'format',
              path: relativePath,
              format: ext,
              issue: 'Consider converting to WebP for better compression'
            })
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning ${dir}:`, error.message)
  }
  
  return issues
}

async function main() {
  console.log('🔍 Auditing images...\n')
  
  const publicDir = join(process.cwd(), 'public')
  const srcDir = join(process.cwd(), 'src')
  
  const publicIssues = await scanDirectory(publicDir)
  const srcIssues = await scanDirectory(srcDir)
  const allIssues = [...publicIssues, ...srcIssues]
  
  if (allIssues.length === 0) {
    console.log('✅ No image issues found!')
    return
  }
  
  console.log(`⚠️  Found ${allIssues.length} image issues:\n`)
  
  // Group by type
  const largeFiles = allIssues.filter(i => i.type === 'large-file')
  const formatIssues = allIssues.filter(i => i.type === 'format')
  
  if (largeFiles.length > 0) {
    console.log('📏 Large Files (> 300KB):')
    largeFiles.forEach(issue => {
      console.log(`  - ${issue.path} (${issue.size})`)
    })
    console.log()
  }
  
  if (formatIssues.length > 0) {
    console.log('🖼️  Format Optimization Opportunities:')
    formatIssues.forEach(issue => {
      console.log(`  - ${issue.path} (${issue.format} → .webp)`)
    })
    console.log()
  }
  
  console.log('💡 Recommendations:')
  console.log('  - Use WebP format for photos (better compression)')
  console.log('  - Keep SVG for icons and simple graphics')
  console.log('  - Consider AVIF for even better compression')
  console.log('  - Optimize images before adding to repository')
}

main().catch(console.error)