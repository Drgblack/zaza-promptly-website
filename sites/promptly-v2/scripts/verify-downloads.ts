#!/usr/bin/env node

/**
 * End-to-end download verification script
 * Tests all download links from /free-resources page
 */

import { spawn } from 'child_process'
import { JSDOM } from 'jsdom'

interface DownloadTest {
  href: string
  filename: string
  expectedContentType: string
  expectedHeader: string
  passed: boolean
  error?: string
}

interface TestResult {
  url: string
  headStatus: number
  getStatus: number
  contentType: string
  contentLength: number
  fileHeader: string
  error?: string
}

// File type expectations
const FILE_EXPECTATIONS: Record<string, { contentType: string; header: string }> = {
  '.pdf': {
    contentType: 'application/pdf',
    header: '%PDF'
  },
  '.docx': {
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    header: 'PK'
  },
  '.pptx': {
    contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    header: 'PK'
  },
  '.zip': {
    contentType: 'application/zip',
    header: 'PK'
  }
}

const MIN_FILE_SIZE_KB = 5

async function startServer(): Promise<() => void> {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting Next.js server...')
    
    const server = spawn('npm', ['run', 'dev'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false
    })

    let serverReady = false
    
    const cleanup = () => {
      if (!server.killed) {
        server.kill('SIGTERM')
        // Force kill after 5 seconds if it doesn't stop gracefully
        setTimeout(() => {
          if (!server.killed) {
            server.kill('SIGKILL')
          }
        }, 5000)
      }
    }

    server.stdout?.on('data', (data) => {
      const output = data.toString()
      console.log('Server:', output.trim())
      
      if (output.includes('Ready in') && !serverReady) {
        serverReady = true
        console.log('✅ Server is ready!')
        resolve(cleanup)
      }
    })

    server.stderr?.on('data', (data) => {
      console.error('Server error:', data.toString().trim())
    })

    server.on('error', (error) => {
      console.error('Failed to start server:', error)
      reject(error)
    })

    server.on('exit', (code) => {
      if (!serverReady) {
        reject(new Error(`Server exited with code ${code} before ready`))
      }
    })

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!serverReady) {
        cleanup()
        reject(new Error('Server failed to start within 30 seconds'))
      }
    }, 30000)
  })
}

async function scrapeDownloadLinks(): Promise<string[]> {
  console.log('📄 Fetching /free-resources page...')
  
  try {
    const response = await fetch('http://localhost:3000/free-resources')
    if (!response.ok) {
      throw new Error(`Failed to fetch /free-resources: ${response.status} ${response.statusText}`)
    }
    
    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document
    
    // Find all download links
    const downloadLinks: string[] = []
    const links = document.querySelectorAll('a[href*="/resources/"]')
    
    links.forEach(link => {
      const href = link.getAttribute('href')
      if (href && href.startsWith('/resources/')) {
        downloadLinks.push(href)
      }
    })
    
    console.log(`📋 Found ${downloadLinks.length} download links`)
    return downloadLinks
  } catch (error) {
    throw new Error(`Failed to scrape download links: ${error}`)
  }
}

async function testDownloadLink(href: string): Promise<TestResult> {
  const url = `http://localhost:3000${href}`
  const filename = href.split('/').pop() || ''
  const extension = filename.substring(filename.lastIndexOf('.'))
  
  const result: TestResult = {
    url: href,
    headStatus: 0,
    getStatus: 0,
    contentType: '',
    contentLength: 0,
    fileHeader: ''
  }
  
  try {
    // HEAD request
    const headResponse = await fetch(url, { method: 'HEAD' })
    result.headStatus = headResponse.status
    result.contentType = headResponse.headers.get('content-type') || ''
    result.contentLength = parseInt(headResponse.headers.get('content-length') || '0')
    
    if (!headResponse.ok) {
      result.error = `HEAD request failed: ${headResponse.status} ${headResponse.statusText}`
      return result
    }
    
    // GET request 
    const getResponse = await fetch(url)
    result.getStatus = getResponse.status
    
    if (!getResponse.ok) {
      result.error = `GET request failed: ${getResponse.status} ${getResponse.statusText}`
      return result
    }
    
    // Read first few bytes for header validation
    const arrayBuffer = await getResponse.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)
    
    // Convert first 4 bytes to string for header check
    let headerString = ''
    for (let i = 0; i < Math.min(4, bytes.length); i++) {
      if (bytes[i] >= 32 && bytes[i] <= 126) {
        // Printable ASCII
        headerString += String.fromCharCode(bytes[i])
      } else {
        // Non-printable, represent as hex for PK headers
        headerString += bytes[i].toString(16).padStart(2, '0').toUpperCase()
      }
    }
    
    result.fileHeader = headerString
    
    return result
  } catch (error) {
    result.error = `Request failed: ${error}`
    return result
  }
}

function validateResult(result: TestResult, href: string): DownloadTest {
  const filename = href.split('/').pop() || ''
  const extension = filename.substring(filename.lastIndexOf('.'))
  const expectations = FILE_EXPECTATIONS[extension]
  
  const test: DownloadTest = {
    href,
    filename,
    expectedContentType: expectations?.contentType || 'unknown',
    expectedHeader: expectations?.header || 'unknown',
    passed: false
  }
  
  // Check if we have expectations for this file type
  if (!expectations) {
    test.error = `Unknown file extension: ${extension}`
    return test
  }
  
  // Check for request errors
  if (result.error) {
    test.error = result.error
    return test
  }
  
  // Validate HEAD status
  if (result.headStatus !== 200) {
    test.error = `HEAD status ${result.headStatus}, expected 200`
    return test
  }
  
  // Validate GET status
  if (result.getStatus !== 200) {
    test.error = `GET status ${result.getStatus}, expected 200`
    return test
  }
  
  // Validate Content-Type
  if (!result.contentType.includes(expectations.contentType)) {
    test.error = `Content-Type "${result.contentType}", expected "${expectations.contentType}"`
    return test
  }
  
  // Validate content length (convert to KB)
  const sizeKB = result.contentLength / 1024
  if (sizeKB <= MIN_FILE_SIZE_KB) {
    test.error = `File size ${sizeKB.toFixed(1)}KB, expected > ${MIN_FILE_SIZE_KB}KB`
    return test
  }
  
  // Validate file header
  const headerMatches = expectations.header === '%PDF' 
    ? result.fileHeader.startsWith('%PDF')
    : result.fileHeader.startsWith('PK') || result.fileHeader.includes('50') // PK is 0x50 0x4B
  
  if (!headerMatches) {
    test.error = `File header "${result.fileHeader}", expected to start with "${expectations.header}"`
    return test
  }
  
  // All checks passed
  test.passed = true
  return test
}

function printSummaryTable(tests: DownloadTest[]): void {
  console.log('\n📊 Download Verification Results')
  console.log('=' .repeat(80))
  console.log(
    'Status'.padEnd(6) +
    'Filename'.padEnd(35) +
    'Size'.padEnd(8) +
    'Type'.padEnd(15) +
    'Error'.padEnd(20)
  )
  console.log('-'.repeat(80))
  
  let passCount = 0
  let failCount = 0
  
  for (const test of tests) {
    const status = test.passed ? '✅ PASS' : '❌ FAIL'
    const error = test.error || ''
    const truncatedError = error.length > 40 ? error.substring(0, 37) + '...' : error
    
    console.log(
      status.padEnd(6) +
      test.filename.padEnd(35) +
      ''.padEnd(8) +  // Size will be shown in error if relevant
      test.expectedContentType.split('/').pop()?.padEnd(15) +
      truncatedError.padEnd(20)
    )
    
    if (test.passed) {
      passCount++
    } else {
      failCount++
      if (error.length > 40) {
        console.log('      Error: ' + error)
      }
    }
  }
  
  console.log('-'.repeat(80))
  console.log(`Total: ${tests.length} | Passed: ${passCount} | Failed: ${failCount}`)
  
  if (failCount > 0) {
    console.log(`\n❌ ${failCount} download(s) failed verification`)
    process.exit(1)
  } else {
    console.log(`\n✅ All ${passCount} downloads passed verification`)
    process.exit(0)
  }
}

async function main() {
  console.log('🧪 Starting download verification...\n')
  
  let cleanup: (() => void) | null = null
  
  try {
    // Start development server
    cleanup = await startServer()
    
    // Wait a moment for server to be fully ready
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Scrape download links
    const downloadLinks = await scrapeDownloadLinks()
    
    if (downloadLinks.length === 0) {
      throw new Error('No download links found on /free-resources page')
    }
    
    // Test each download link
    console.log('\n🔍 Testing download links...')
    const tests: DownloadTest[] = []
    
    for (const href of downloadLinks) {
      console.log(`Testing ${href}...`)
      const result = await testDownloadLink(href)
      const test = validateResult(result, href)
      tests.push(test)
      
      if (test.passed) {
        console.log(`  ✅ ${test.filename}`)
      } else {
        console.log(`  ❌ ${test.filename}: ${test.error}`)
      }
    }
    
    // Print summary table
    printSummaryTable(tests)
    
  } catch (error) {
    console.error('\n💥 Verification failed:', error)
    process.exit(1)
  } finally {
    if (cleanup) {
      console.log('\n🛑 Stopping server...')
      cleanup()
    }
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Interrupted, cleaning up...')
  process.exit(1)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Terminated, cleaning up...')
  process.exit(1)
})

// Run the main function
main().catch((error) => {
  console.error('💥 Unexpected error:', error)
  process.exit(1)
})
