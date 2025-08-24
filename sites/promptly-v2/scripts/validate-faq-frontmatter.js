#!/usr/bin/env node

/**
 * FAQ Frontmatter Validation Script
 * Ensures all FAQ MDX files have required frontmatter fields
 */

import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

const errors = []
const warnings = []

// Required frontmatter fields for FAQ entries
const requiredFields = [
  { name: 'title', type: 'string' },
  { name: 'category', type: 'string' },
  { name: 'updated', type: 'date' }
]

// Optional but recommended fields
const optionalFields = [
  { name: 'needsReview', type: 'boolean' },
  { name: 'slug', type: 'string' },
  { name: 'priority', type: 'number' }
]

function parseFrontmatter(content, filePath) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  
  if (!frontmatterMatch) {
    errors.push({
      file: filePath,
      error: 'No frontmatter found',
      description: 'MDX file must start with YAML frontmatter between --- markers'
    })
    return null
  }

  try {
    // Simple YAML parsing for basic key-value pairs
    const frontmatterText = frontmatterMatch[1]
    const frontmatter = {}
    
    // Split into lines and parse each line
    const lines = frontmatterText.split('\n')
    let inMultiline = false
    let multilineKey = ''
    let multilineValue = ''
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      
      // Handle multiline values (not needed for our basic validation but good to handle)
      if (inMultiline) {
        if (line.startsWith('  ') || line.startsWith('    ')) {
          multilineValue += line.substring(2) + '\\n'
        } else {
          frontmatter[multilineKey] = multilineValue.trim()
          inMultiline = false
          // Process this line normally
          i-- // Reprocess this line
        }
        continue
      }
      
      // Simple key: value parsing
      const colonIndex = line.indexOf(':')
      if (colonIndex === -1) continue
      
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      
      // Convert boolean strings (must come before number conversion)
      if (value === 'true') value = true
      else if (value === 'false') value = false
      // Convert numbers (only if not a boolean)
      else if (!isNaN(value) && value !== '' && typeof value === 'string') {
        const numValue = Number(value)
        if (!isNaN(numValue)) {
          value = numValue
        }
      }
      
      frontmatter[key] = value
    }
    
    return frontmatter
  } catch (error) {
    errors.push({
      file: filePath,
      error: 'Invalid frontmatter YAML',
      description: `Failed to parse frontmatter: ${error.message}`
    })
    return null
  }
}

function validateDateFormat(dateString, filePath, fieldName) {
  if (!dateString) return false
  
  // Accept various date formats
  const dateFormats = [
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO format
    /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
    /^\d{2}-\d{2}-\d{4}$/, // MM-DD-YYYY
  ]
  
  const isValidFormat = dateFormats.some(format => format.test(dateString))
  
  if (!isValidFormat) {
    errors.push({
      file: filePath,
      field: fieldName,
      error: 'Invalid date format',
      description: `Expected format: YYYY-MM-DD, got: "${dateString}"`
    })
    return false
  }
  
  // Try to parse the date to ensure it's valid
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    errors.push({
      file: filePath,
      field: fieldName,
      error: 'Invalid date value',
      description: `Date "${dateString}" cannot be parsed`
    })
    return false
  }
  
  return true
}

function validateFrontmatter(frontmatter, filePath) {
  if (!frontmatter) return false
  
  let isValid = true
  
  // Check required fields
  for (const field of requiredFields) {
    const value = frontmatter[field.name]
    
    if (value === undefined || value === null || value === '') {
      errors.push({
        file: filePath,
        field: field.name,
        error: 'Missing required field',
        description: `${field.name} is required but not found`
      })
      isValid = false
      continue
    }
    
    // Type-specific validation
    switch (field.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push({
            file: filePath,
            field: field.name,
            error: 'Invalid type',
            description: `Expected string, got ${typeof value}`
          })
          isValid = false
        } else if (value.trim().length < 3) {
          warnings.push({
            file: filePath,
            field: field.name,
            warning: 'Very short value',
            description: `${field.name} should be at least 3 characters long`
          })
        }
        break
        
      case 'date':
        if (!validateDateFormat(value, filePath, field.name)) {
          isValid = false
        }
        break
    }
  }
  
  // Validate category values
  if (frontmatter.category) {
    const validCategories = [
      'Getting started',
      'AI quality & pedagogy', 
      'Data privacy & safety (GDPR)',
      'Pricing & Billing',
      'Schools & IT (deployments, SSO, DPA)',
      'Accessibility & languages',
      'Integrations (Stripe, Brevo)',
      'Accounts & subscriptions',
      'Troubleshooting'
    ]
    
    if (!validCategories.includes(frontmatter.category)) {
      warnings.push({
        file: filePath,
        field: 'category',
        warning: 'Unknown category',
        description: `Category "${frontmatter.category}" is not in the standard list. Valid categories: ${validCategories.join(', ')}`
      })
    }
  }
  
  // Check for slug consistency with filename
  const filename = path.basename(filePath, '.mdx')
  if (frontmatter.slug && frontmatter.slug !== filename) {
    warnings.push({
      file: filePath,
      field: 'slug',
      warning: 'Slug mismatch',
      description: `Slug "${frontmatter.slug}" doesn't match filename "${filename}"`
    })
  }
  
  // Validate needsReview is boolean if present
  if (frontmatter.needsReview !== undefined && typeof frontmatter.needsReview !== 'boolean') {
    errors.push({
      file: filePath,
      field: 'needsReview',
      error: 'Invalid type',
      description: 'needsReview must be true or false'
    })
    isValid = false
  }
  
  return isValid
}

async function validateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const relativePath = path.relative(process.cwd(), filePath)
    
    const frontmatter = parseFrontmatter(content, relativePath)
    if (!frontmatter) {
      return false // Error already added by parseFrontmatter
    }
    
    return validateFrontmatter(frontmatter, relativePath)
  } catch (error) {
    errors.push({
      file: path.relative(process.cwd(), filePath),
      error: 'File read error',
      description: error.message
    })
    return false
  }
}

async function main() {
  console.log('🔍 Validating FAQ frontmatter...')
  
  // Find all FAQ MDX files
  const faqFiles = await glob('content/faq/**/*.mdx', { cwd: process.cwd() })
  
  if (faqFiles.length === 0) {
    console.log('⚠️  No FAQ MDX files found in content/faq/')
    process.exit(0)
  }
  
  console.log(`📄 Found ${faqFiles.length} FAQ files to validate\\n`)
  
  let validFiles = 0
  
  for (const file of faqFiles) {
    const filePath = path.resolve(file)
    const isValid = await validateFile(filePath)
    if (isValid) {
      validFiles++
    }
  }
  
  // Report results
  console.log(`\\n📊 Validation Results:`)
  console.log(`✅ Valid files: ${validFiles}/${faqFiles.length}`)
  
  if (warnings.length > 0) {
    console.log(`\\n⚠️  ${warnings.length} warnings:`)
    warnings.forEach(warning => {
      console.log(`  ${warning.file}`)
      console.log(`    ${warning.field}: ${warning.warning}`)
      console.log(`    ${warning.description}\\n`)
    })
  }
  
  if (errors.length > 0) {
    console.log(`\\n❌ ${errors.length} errors:`)
    errors.forEach(error => {
      console.log(`  ${error.file}`)
      if (error.field) {
        console.log(`    Field: ${error.field}`)
      }
      console.log(`    Error: ${error.error}`)
      console.log(`    ${error.description}\\n`)
    })
    
    console.log('💡 Fix these errors to ensure FAQ content is properly structured.')
    process.exit(1)
  }
  
  if (warnings.length === 0) {
    console.log('\\n🎉 All FAQ frontmatter is valid!')
  } else {
    console.log('\\n✅ No critical errors found, but please review warnings above.')
  }
  
  process.exit(0)
}

main().catch(error => {
  console.error('Script error:', error)
  process.exit(1)
})
