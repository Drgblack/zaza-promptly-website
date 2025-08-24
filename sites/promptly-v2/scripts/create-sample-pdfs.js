#!/usr/bin/env node

/**
 * Creates sample placeholder PDF files for testing download functionality
 * In production, these would be replaced with actual resource PDFs
 */

import fs from 'fs'
import path from 'path'

const resourcesDir = path.join(process.cwd(), 'resources')
const resourcesJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'resources.json'), 'utf-8'))
const resourceFiles = resourcesJson.map(resource => resource.filename)

// Simple PDF header (minimal valid PDF structure for testing)
const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
>>
endobj
4 0 obj
<<
/Length 60
>>
stream
BT
/F1 12 Tf
100 700 Td
(Sample PDF for Testing) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000100 00000 n 
0000000280 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
400
%%EOF`

console.log('📄 Creating sample PDF files for testing...')

// Ensure directory exists
if (!fs.existsSync(resourcesDir)) {
  fs.mkdirSync(resourcesDir, { recursive: true })
}

// Create sample PDF files
resourceFiles.forEach(filename => {
  const filePath = path.join(resourcesDir, filename)
  fs.writeFileSync(filePath, pdfContent)
  console.log(`✅ Created ${filename}`)
})

console.log(`\n🎉 Created ${resourceFiles.length} sample PDF files in ${resourcesDir}`)
console.log('\nThese are minimal test PDFs. In production, replace with actual resource files.')
