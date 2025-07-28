const sharp = require('sharp')
const fs = require('fs').promises
const path = require('path')

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png']
const OUTPUT_FORMATS = ['webp', 'avif']

async function optimizeImages() {
  try {
    console.log('🔍 Scanning for images to optimize...')
    
    const files = await getAllFiles(PUBLIC_DIR)
    const imageFiles = files.filter(file => 
      SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())
    )

    console.log(`📁 Found ${imageFiles.length} images to optimize`)

    for (const imagePath of imageFiles) {
      await optimizeImage(imagePath)
    }

    console.log('✅ Image optimization complete!')
  } catch (error) {
    console.error('❌ Error optimizing images:', error)
    process.exit(1)
  }
}

async function getAllFiles(dir) {
  const files = []
  
  try {
    const items = await fs.readdir(dir, { withFileTypes: true })
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      
      if (item.isDirectory()) {
        files.push(...await getAllFiles(fullPath))
      } else {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not read directory: ${dir}`)
  }
  
  return files
}

async function optimizeImage(imagePath) {
  try {
    const ext = path.extname(imagePath).toLowerCase()
    const baseName = imagePath.replace(ext, '')
    
    console.log(`🔄 Optimizing: ${path.basename(imagePath)}`)
    
    const imageBuffer = await fs.readFile(imagePath)
    
    for (const format of OUTPUT_FORMATS) {
      const outputPath = `${baseName}.${format}`
      
      // Skip if already exists
      try {
        await fs.access(outputPath)
        console.log(`   ⏭️  ${format.toUpperCase()} already exists`)
        continue
      } catch {}
      
      let optimizedBuffer
      
      switch (format) {
        case 'webp':
          optimizedBuffer = await sharp(imageBuffer)
            .webp({ quality: 80, effort: 6 })
            .toBuffer()
          break
        case 'avif':
          optimizedBuffer = await sharp(imageBuffer)
            .avif({ quality: 80, effort: 9 })
            .toBuffer()
          break
      }
      
      await fs.writeFile(outputPath, optimizedBuffer)
      console.log(`   ✅ Created ${format.toUpperCase()}`)
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${imagePath}:`, error.message)
  }
}

// Run the optimization
optimizeImages() 