#!/usr/bin/env node

/**
 * Build step to populate resource metadata and validate files
 * - Fills filesize from actual files
 * - Validates all referenced files exist
 * - Fails build if any files are missing
 */

import { readFileSync, writeFileSync, statSync, existsSync } from 'fs'
import { join } from 'path'

interface ResourceMetadata {
  filename: string
  title: string
  description: string
  filesize: number
  lastUpdated: string
  format: string
  preview: string
  license: string
}

const RESOURCES_DIR = join(process.cwd(), 'resources')
const METADATA_PATH = join(process.cwd(), 'public', 'resources', 'resources.json')

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${Math.round(bytes / (1024 * 1024))} MB`
}

function validateAndPopulateMetadata(): ResourceMetadata[] {
  console.log('🔨 Building resource metadata...')
  
  // Read the metadata template
  let resources: ResourceMetadata[]
  try {
    const metadataContent = readFileSync(METADATA_PATH, 'utf-8')
    resources = JSON.parse(metadataContent)
  } catch (error) {
    console.error('❌ Failed to read resources metadata:', error)
    process.exit(1)
  }
  
  const errors: string[] = []
  const warnings: string[] = []
  
  // Validate and populate each resource
  for (const resource of resources) {
    const filePath = join(RESOURCES_DIR, resource.filename)
    
    // Check if file exists
    if (!existsSync(filePath)) {
      errors.push(`Missing file: ${resource.filename}`)
      continue
    }
    
    try {
      // Get file stats
      const stats = statSync(filePath)
      const previousSize = resource.filesize
      
      // Update filesize
      resource.filesize = stats.size
      
      // Log size changes or new files
      if (previousSize === 0) {
        console.log(`📄 ${resource.filename}: ${formatFileSize(stats.size)}`)
      } else if (Math.abs(stats.size - previousSize) > 100) {
        console.log(`📄 ${resource.filename}: ${formatFileSize(previousSize)} → ${formatFileSize(stats.size)}`)
      }
      
      // Warn about very small files (likely test files)
      if (stats.size < 5000) {
        warnings.push(`${resource.filename} is very small (${formatFileSize(stats.size)}) - might be a test file`)
      }
      
      // Validate format matches file extension
      const extension = resource.filename.split('.').pop()?.toUpperCase()
      if (extension && extension !== resource.format) {
        warnings.push(`${resource.filename}: format "${resource.format}" doesn't match extension ".${extension?.toLowerCase()}"`)
      }
      
    } catch (error) {
      errors.push(`Failed to read ${resource.filename}: ${error}`)
    }
  }
  
  // Check for orphaned files in resources directory
  try {
    const resourceFilenames = new Set(resources.map(r => r.filename))
    const actualFiles = require('fs').readdirSync(RESOURCES_DIR)
      .filter((file: string) => file.endsWith('.pdf') || file.endsWith('.docx') || file.endsWith('.pptx') || file.endsWith('.zip'))
    
    for (const file of actualFiles) {
      if (!resourceFilenames.has(file)) {
        warnings.push(`Orphaned file found: ${file} (not in metadata)`)
      }
    }
  } catch (error) {
    warnings.push(`Failed to check for orphaned files: ${error}`)
  }
  
  // Report warnings
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:')
    warnings.forEach(warning => console.log(`  ${warning}`))
  }
  
  // Handle errors
  if (errors.length > 0) {
    console.error('\n❌ Validation failed:')
    errors.forEach(error => console.error(`  ${error}`))
    console.error(`\n💥 Build failed with ${errors.length} error(s)`)
    process.exit(1)
  }
  
  return resources
}

function writeUpdatedMetadata(resources: ResourceMetadata[]): void {
  try {
    const jsonContent = JSON.stringify(resources, null, 2)
    writeFileSync(METADATA_PATH, jsonContent, 'utf-8')
    console.log(`\n✅ Updated metadata for ${resources.length} resources`)
  } catch (error) {
    console.error('❌ Failed to write updated metadata:', error)
    process.exit(1)
  }
}

function generateStats(resources: ResourceMetadata[]): void {
  const totalSize = resources.reduce((sum, r) => sum + r.filesize, 0)
  const avgSize = totalSize / resources.length
  const formats = [...new Set(resources.map(r => r.format))]
  
  console.log('\n📊 Resource Statistics:')
  console.log(`  Total files: ${resources.length}`)
  console.log(`  Total size: ${formatFileSize(totalSize)}`)
  console.log(`  Average size: ${formatFileSize(avgSize)}`)
  console.log(`  Formats: ${formats.join(', ')}`)
  
  // Show largest and smallest files
  const sorted = [...resources].sort((a, b) => b.filesize - a.filesize)
  console.log(`  Largest: ${sorted[0].filename} (${formatFileSize(sorted[0].filesize)})`)
  console.log(`  Smallest: ${sorted[sorted.length - 1].filename} (${formatFileSize(sorted[sorted.length - 1].filesize)})`)
}

// Main execution
async function main() {
  try {
    const resources = validateAndPopulateMetadata()
    writeUpdatedMetadata(resources)
    generateStats(resources)
    
    console.log('\n🎉 Resource metadata build completed successfully!')
  } catch (error) {
    console.error('💥 Unexpected error:', error)
    process.exit(1)
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Build interrupted')
  process.exit(1)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Build terminated')
  process.exit(1)
})

// Run the main function
main().catch((error) => {
  console.error('💥 Fatal error:', error)
  process.exit(1)
})