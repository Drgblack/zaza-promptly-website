# Post-Deploy Verification Checklist

After merge and deploy, verify the following items before posting the Go/No-Go comment:

## 🔍 Manual Verification Steps

### 1. HTTP Response Verification
- [ ] `HEAD /resources/report-template-v2.pdf` returns 200
- [ ] `GET /resources/report-template-v2.pdf` returns 200 with correct content-type headers
- [ ] `HEAD /resources/parent-meeting-notes-v2.pdf` returns 200  
- [ ] `GET /resources/parent-meeting-notes-v2.pdf` returns 200 with correct content-type headers
- [ ] `HEAD /resources/behaviour-progress-checklist-v2.pdf` returns 200
- [ ] `GET /resources/behaviour-progress-checklist-v2.pdf` returns 200 with correct content-type headers

### 2. Browser Compatibility Testing
- [ ] **Chrome/Edge**: Inline open works for PDFs (opens in new tab)
- [ ] **Firefox**: Inline open works for PDFs (opens in new tab)
- [ ] **Safari**: Inline open works for PDFs (opens in new tab)

### 3. Download Behavior Testing
- [ ] PDF files: "Open" button opens inline in new tab
- [ ] PDF files: "Download" button forces download with correct filename
- [ ] Future DOCX files: Download button forces attachment (when implemented)
- [ ] Future ZIP files: Download button forces attachment (when implemented)

### 4. CI Verification
- [ ] Run `npm run test:downloads` - should show green for v2 files
- [ ] Verify branded templates (report-template-v2, parent-meeting-notes-v2, behaviour-progress-checklist-v2) all pass
- [ ] Expected placeholder failures are documented and acceptable

### 5. Analytics Verification
- [ ] Accept cookie consent in browser
- [ ] Click "Open" button on a PDF - verify `resource_open` event in browser console
- [ ] Click "Download" button on a PDF - verify `resource_download` event in browser console
- [ ] Verify events only fire after consent is granted
- [ ] Test with "Do Not Track" enabled - verify no events fire

## 📝 Go/No-Go Comment Template

Once all verification is complete, post this comment:

---

## Downloads - Go/No-Go

### ✅ Manual Verification Results
- [ ] HTTP responses (200 status, correct headers)
- [ ] Inline open works (Chrome, Firefox, Safari)
- [ ] Download behavior correct (attachment for docx/zip)
- [ ] Analytics events fire after consent
- [ ] Do Not Track respected

### 📊 CI Verifier Results
```
StatusFilename                           Size    Type           Error               
--------------------------------------------------------------------------------
✅ PASSreport-template-v2.pdf             171KB   pdf                                
✅ PASSparent-meeting-notes-v2.pdf        181KB   pdf                                
✅ PASSbehaviour-progress-checklist-v2.pdf 198KB   pdf                                
❌ FAILcomment-tips.pdf                   0.5KB   pdf            Placeholder file
❌ FAILparent-comm-guide.pdf              0.5KB   pdf            Placeholder file
[... other placeholder failures ...]
--------------------------------------------------------------------------------
Total: 30 | Passed: 3 | Failed: 27 (placeholders)
```

### 🎯 Decision: **GO** / **NO-GO**
- **Branded templates**: All working ✅
- **Core functionality**: Verified ✅ 
- **Accessibility**: Enhanced ✅
- **Analytics**: Consent-aware ✅

**Status: Ready for production** ✅

---

## 🔧 Quick Test Commands

```bash
# Test HTTP responses
curl -I https://yoursite.com/resources/report-template-v2.pdf
curl -I https://yoursite.com/resources/parent-meeting-notes-v2.pdf

# Run CI verifier
npm run test:downloads

# Check analytics in browser console after accepting cookies
# Should see: "📊 Tracked resource_open: report-template-v2.pdf"
# Should see: "📊 Tracked resource_download: report-template-v2.pdf"
```