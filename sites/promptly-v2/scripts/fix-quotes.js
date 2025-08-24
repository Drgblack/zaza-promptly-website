#!/usr/bin/env node

/**
 * Fix Smart Quotes Script
 * Replaces smart quotes with straight quotes in MDX files
 */

import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

async function fixQuotes() {
  console.log('🔧 Fixing smart quotes in content files...\n')
  
  const contentFiles = await glob('content/**/*.{md,mdx}', { cwd: process.cwd() })
  let totalFixed = 0
  let filesModified = 0
  
  for (const file of contentFiles) {
    const filePath = path.resolve(file)
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Replace smart quotes with straight quotes
    const fixedContent = content
      .replace(/[""]/g, '"')  // Smart double quotes
      .replace(/['']/g, "'")  // Smart single quotes/apostrophes
    
    if (fixedContent !== content) {
      fs.writeFileSync(filePath, fixedContent, 'utf8')
      filesModified++
      
      // Count fixes
      const fixes = (content.match(/[""'']/g) || []).length
      totalFixed += fixes
      
      console.log(`✅ Fixed ${fixes} quotes in ${path.relative(process.cwd(), filePath)}`)
    }
  }
  
  if (totalFixed === 0) {
    console.log('✅ No smart quotes found - all files are clean!')
  } else {
    console.log(`\n🎉 Fixed ${totalFixed} smart quotes across ${filesModified} files`)
  }
}

fixQuotes().catch(console.error)
