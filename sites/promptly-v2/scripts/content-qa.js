#!/usr/bin/env node

/**
 * Content QA Script
 * Scans MDX and content files for common grammar, spacing, and formatting issues
 */

import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

const issues = []

// Define check patterns
const checks = [
  {
    name: 'Double spaces',
    pattern: /[^\s`]  +[^\s`]/g,
    description: 'Multiple consecutive spaces found',
    exclude: ['node_modules', 'build', 'dist']
  },
  {
    name: 'Smart quotes/apostrophes',
    pattern: /[\u2018\u2019\u201C\u201D]/g,
    description: 'Smart quotes that should be straight quotes',
    exclude: ['node_modules', 'build', 'dist']
  },
  {
    name: 'Incorrect spacing before punctuation',
    pattern: / [.!?:;,]/g,
    description: 'Space before punctuation',
    exclude: ['node_modules', 'build', 'dist']
  },
  {
    name: 'Missing space after punctuation',
    pattern: /[.!?:;,][a-zA-Z]/g,
    description: 'Missing space after punctuation (except URLs)',
    exclude: ['node_modules', 'build', 'dist']
  },
  {
    name: 'Inconsistent possessive',
    pattern: /\b[a-z]+\s+[A-Z][a-z]*\s+s\b/g,
    description: 'Possible formatting issue like "teacher Teacher s"',
    exclude: ['node_modules', 'build', 'dist']
  }
]

async function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n')
    
    checks.forEach(check => {
      let match
      check.pattern.lastIndex = 0 // Reset regex
      
      while ((match = check.pattern.exec(content)) !== null) {
        // Skip URLs and file paths for certain checks
        if (check.name === 'Missing space after punctuation') {
          const before = content.substring(Math.max(0, match.index - 25), match.index)
          const after = content.substring(match.index, match.index + 25)
          if (before.includes('http') || after.includes('://') || after.includes('.com') || 
              after.includes('.js') || after.includes('.ts') || after.includes('.tsx') ||
              after.includes('.jpg') || after.includes('.png') || after.includes('.svg') ||
              after.includes('.gif') || after.includes('.webp') || after.includes('.ai') ||
              before.includes('avatar') || before.includes('image') || before.includes('src') ||
              before.includes('featuredImage') || before.includes('Icon') || before.includes('otter') ||
              before.includes('P.S') || before.includes('e.g') || before.includes('i.e')) {
            continue
          }
        }
        
        const lineNumber = content.substring(0, match.index).split('\n').length
        const lineText = lines[lineNumber - 1]
        
        issues.push({
          file: path.relative(process.cwd(), filePath),
          line: lineNumber,
          check: check.name,
          description: check.description,
          match: match[0],
          context: lineText.trim()
        })
        
        // Prevent infinite loops with global patterns
        if (!check.pattern.global) break
      }
    })
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message)
  }
}

async function main() {
  console.log('🔍 Running Content QA checks...\n')
  
  // Focus primarily on content files 
  const contentFiles = await glob('content/**/*.{md,mdx}', { cwd: process.cwd() })
  
  const allFiles = [...contentFiles]
  
  for (const file of allFiles) {
    await scanFile(path.resolve(file))
  }
  
  // Report issues
  if (issues.length === 0) {
    console.log('✅ No content issues found!')
    return
  }
  
  console.log(`❌ Found ${issues.length} potential issues:\n`)
  
  // Group by file
  const byFile = issues.reduce((acc, issue) => {
    if (!acc[issue.file]) acc[issue.file] = []
    acc[issue.file].push(issue)
    return acc
  }, {})
  
  Object.entries(byFile).forEach(([file, fileIssues]) => {
    console.log(`📄 ${file}`)
    fileIssues.forEach(issue => {
      console.log(`  Line ${issue.line}: ${issue.check}`)
      console.log(`    ${issue.description}`)
      console.log(`    Match: "${issue.match}"`)
      console.log(`    Context: ${issue.context}`)
      console.log()
    })
  })
  
  process.exit(1)
}

main().catch(console.error)