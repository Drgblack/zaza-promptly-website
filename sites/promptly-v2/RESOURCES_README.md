# Resource Downloads System Documentation

## Overview
The Promptly v2 resource downloads system provides secure, trackable downloads for educational PDFs and templates. This system includes resource metadata management, file serving, and analytics tracking.

## File Structure

### Resource Storage
```
public/resources/           # Static resource files (publicly accessible)
├── ai-prompt-templates.pdf
├── assessment-rubrics.pdf  
├── behavior-intervention-plans.pdf
├── classroom-management-guide.pdf
├── comment-tips.pdf
├── differentiation-strategies.pdf
├── formative-assessment-toolkit.pdf
├── lesson-planning-templates.pdf
├── parent-comm-guide.pdf
├── parent-conference-templates.pdf
├── report-template.pdf
├── sample-content.md
├── student-goal-setting-worksheets.pdf
└── time-management-guide.pdf
```

### Resource Metadata
```
content/resources.json      # Resource metadata and configuration
```

### API Endpoints
```
src/app/api/download/route.ts     # Download API handler
```

### Frontend Components
```
src/app/free-resources/page.tsx   # Resource listing page
```

## How Resources Are Served

### 1. Resource Discovery
Resources are discovered through the `/free-resources` page which:
- Loads resource metadata from `content/resources.json`
- Displays filterable/searchable resource list
- Provides download links via `/api/download?resource={slug}`

### 2. Download Flow
1. User clicks download link on `/free-resources` page
2. Request routed to `/api/download?resource={slug}`
3. API validates resource slug against `resources.json`
4. API locates file in `public/resources/`
5. API serves file with proper headers for download

### 3. API Response Headers
```typescript
Content-Type: application/pdf
Content-Disposition: attachment; filename="{resource.filename}"
Content-Length: {file-size}
Cache-Control: public, max-age=31536000, immutable
X-Resource-Title: {resource.title}
X-Resource-Category: {resource.category}
```

### 4. Error Handling
- **400**: Missing resource parameter
- **404**: Resource not found in metadata or file missing from disk
- **500**: Server error reading file

## Resource Metadata Schema

Each resource in `content/resources.json` contains:

```typescript
interface Resource {
  slug: string          // Unique identifier for URL parameters
  title: string         // Display name
  description: string   // Brief description for UI
  filename: string      // Actual PDF filename in public/resources/
  category: string      // Category for filtering (Guides|Templates)
  updated: string       // Last update date (YYYY-MM-DD)
  sizeKB: number       // File size in kilobytes
  license: string       // Usage license terms
}
```

### Example Resource Entry
```json
{
  "slug": "comment-tips",
  "title": "Comment Writing Tips", 
  "description": "Practical techniques to speed up high-quality commenting.",
  "filename": "comment-tips.pdf",
  "category": "Guides",
  "updated": "2025-08-20",
  "sizeKB": 240,
  "license": "Personal classroom use only. Non-commercial."
}
```

## Verification and Testing

### Manual Testing
1. **Resource Page Access**: Visit `/free-resources`
2. **Search/Filter**: Test category filters and search functionality
3. **Download Links**: Click download links and verify file delivery
4. **File Integrity**: Ensure downloaded files open correctly

### Automated Testing Script
```bash
# Create sample PDFs for testing
npm run create-sample-pdfs

# Test download API endpoints
curl -I "http://localhost:3000/api/download?resource=comment-tips"
curl -I "http://localhost:3000/api/download?resource=invalid-resource"
```

### File Verification Script
```bash
#!/bin/bash
# Verify all resources.json files exist on disk

RESOURCES_DIR="public/resources"
RESOURCES_JSON="content/resources.json"

echo "🔍 Verifying resource files..."

# Parse resources.json and check each file exists
jq -r '.[].filename' "$RESOURCES_JSON" | while read filename; do
    if [[ -f "$RESOURCES_DIR/$filename" ]]; then
        echo "✅ $filename"
    else
        echo "❌ Missing: $filename"
    fi
done

echo "✅ Verification complete"
```

### Build-time Verification
The system includes build-time checks that can be added to CI/CD:

```javascript
// scripts/verify-resources.js
import fs from 'fs'
import path from 'path'
import resources from '../content/resources.json'

const resourcesDir = path.join(process.cwd(), 'public', 'resources')
let errors = []

resources.forEach(resource => {
    const filePath = path.join(resourcesDir, resource.filename)
    if (!fs.existsSync(filePath)) {
        errors.push(`Missing file: ${resource.filename} for resource: ${resource.slug}`)
    }
})

if (errors.length > 0) {
    console.error('❌ Resource verification failed:')
    errors.forEach(error => console.error(`  ${error}`))
    process.exit(1)
} else {
    console.log('✅ All resources verified')
}
```

## Analytics and Tracking

### Download Tracking
The system tracks resource downloads via Google Analytics:

```typescript
// Respects user cookie consent
const trackDownload = (resource: Resource) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download', {
      event_category: 'Resource',
      event_label: resource.title,
      resource_category: resource.category,
      resource_slug: resource.slug,
      resource_filename: resource.filename,
      value: 1
    })
  }
}
```

### Tracked Metrics
- Download count by resource
- Download count by category
- Popular resources over time
- Geographic download distribution

## Adding New Resources

### 1. Add PDF File
Place the PDF file in `public/resources/`

### 2. Update Metadata
Add entry to `content/resources.json`:

```json
{
  "slug": "new-resource-slug",
  "title": "New Resource Title",
  "description": "Brief description of the resource.",
  "filename": "new-resource.pdf",
  "category": "Guides", // or "Templates"
  "updated": "2025-08-22",
  "sizeKB": 350,
  "license": "Personal classroom use only. Non-commercial."
}
```

### 3. Test Download
1. Build and start the application
2. Visit `/free-resources`
3. Verify new resource appears
4. Test download functionality

## Security Considerations

### File Access Control
- Resources served only through API (not direct static file access)
- Resource slug validation prevents directory traversal
- File existence verification before serving

### Content Security
- All resources are PDF files only
- File MIME type validation
- No user-uploaded content in resources directory

### Rate Limiting
Consider implementing rate limiting for download endpoints:

```typescript
// Example rate limiting middleware
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}
```

## Troubleshooting

### Common Issues

1. **404 errors on downloads**
   - Check resource slug exists in `resources.json`
   - Verify PDF file exists in `public/resources/`
   - Ensure filename matches exactly (case-sensitive)

2. **Build errors related to resources**
   - Run `npm run create-sample-pdfs` to create test files
   - Verify `resources.json` syntax is valid JSON

3. **Missing resources on production**
   - Ensure `public/resources/` directory is included in deployment
   - Check file permissions on production server

### Debug Commands
```bash
# List all resource files
ls -la public/resources/

# Validate resources.json
jq . content/resources.json

# Test API endpoint
curl -v "http://localhost:3000/api/download?resource=comment-tips"

# Check file sizes match metadata
du -k public/resources/*.pdf
```

## Performance Considerations

### Caching Strategy
- Resources cached with `max-age=31536000` (1 year)
- `immutable` directive prevents revalidation
- CDN integration recommended for production

### File Size Optimization
- Keep PDFs under 500KB when possible
- Use PDF compression tools before upload
- Monitor download times and user experience

## Future Enhancements

### Potential Improvements
1. **Resource versioning** - Track and serve multiple versions
2. **Access control** - Premium resources for subscribers
3. **Usage analytics** - Detailed download reports
4. **Content management** - Admin interface for resource management
5. **Search optimization** - Full-text search within PDFs
6. **Bulk downloads** - ZIP file generation for resource bundles

### API Extensions
```typescript
// Future API endpoints
GET /api/resources              // List all resources with metadata
GET /api/resources/categories   // Get available categories
GET /api/resources/stats        // Download statistics
POST /api/resources/feedback    // Resource feedback/ratings
```
