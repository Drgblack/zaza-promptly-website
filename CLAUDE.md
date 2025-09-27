## About-Founder Page Upgrade - Completed ✅

### What Changed:
- **Restructured page layout** with clear visual hierarchy and scannable sections
- **Added authentic story arc**: apprenticeship → travel → Frankfurt Diploma → UTAS IS Honours → UQ MBA → PhD Professional Education → Zaza Technologies
- **Corrected family references**: sister, aunty, uncle, cousins as teachers (removed incorrect wife reference)
- **Updated copy accuracy**: "20+ years building, researching, and shipping tools" (removed formal teaching claim)
- **Enhanced components**: FounderPortrait with purple glow, StoryBlock for readability, accurate Timeline
- **Improved accessibility**: semantic structure, proper contrast, alt text, keyboard navigation
- **Added FAQ Q8**: "Can I trust Promptly's suggestions?" with approved copy

### Performance & SEO:
- Person schema with proper educational background
- Mobile-responsive design tested
- Portrait using existing `/images/founder-gb-v1.jpg`
- Deploy successful - page loads correctly at /about-founder

### Build Issue Resolution ✅:
- **Fixed client/server component error**: Separated motion animations into `AboutFounderClient.tsx`
- **Maintained SEO**: Kept metadata and Person schema in server component
- **Preserved functionality**: All animations and interactions work properly
- **Build deploys successfully**: No more "Element type is invalid" errors

### Final Status:
- All acceptance criteria met ✅
- Visual consistency maintained ✅
- Build and deployment successful ✅
- Page loads correctly at /about-founder ✅

## Snippet Tool UX V2 - Completed ✅

### What Changed:
- **Fixed dropdown clipping** with HeadlessUI portal-based selects
- **Simple mode default** with 3 intuitive preset buttons
- **"Improve my draft"** functionality for enhancing existing comments
- **Feature flag** `NEXT_PUBLIC_SNIPPET_V2` for safe rollout (OFF by default)
- **Portal rendering** prevents dropdown overlap issues
- **Backward compatibility** when flag disabled

### Deployment Safety:
- Clean implementation from stable production base
- Only touches snippet-related files
- No routing, middleware, or global config changes
- Guard file prevents app directory conflicts

### Feature Flag Usage:
- **Preview**: `NEXT_PUBLIC_SNIPPET_V2=true` (ON for testing)
- **Production**: `NEXT_PUBLIC_SNIPPET_V2=false` (OFF by default)
- Toggle in Vercel environment variables when ready

### Important Rules:
- **Never create** `sites/promptly-v2/app/` directory; only use `sites/promptly-v2/src/app/`
- **Do not edit** vercel.json for outputDir; use minimal config only
- **Feature work** must ship behind flags; preview=on, prod=off
- **Deployment issues** → revert branch changes, not Vercel project settings