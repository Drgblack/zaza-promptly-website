#!/usr/bin/env node
/**
 * Optimize the large founder image
 */

import sharp from 'sharp'
import { join } from 'path'

async function optimizeFounderImage() {
  const inputPath = join(process.cwd(), 'public/images/founder-new.jpg')
  const outputPath = join(process.cwd(), 'public/images/founder-new-optimized.webp')
  
  try {
    const info = await sharp(inputPath)
      .resize(800, 800, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 85,
        effort: 6 
      })
      .toFile(outputPath)
    
    console.log(`✅ Optimized founder image:`)
    console.log(`  - Input: ${(2277094 / 1024).toFixed(0)}KB`)
    console.log(`  - Output: ${(info.size / 1024).toFixed(0)}KB`)
    console.log(`  - Savings: ${((2277094 - info.size) / 2277094 * 100).toFixed(1)}%`)
    console.log(`  - Format: WebP`)
    console.log(`  - Dimensions: ${info.width}x${info.height}`)
    
  } catch (error) {
    console.error('Error optimizing image:', error)
  }
}

optimizeFounderImage()