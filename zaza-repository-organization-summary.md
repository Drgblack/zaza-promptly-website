# 🎯 Zaza Repository Organization - Complete Plan

## 📊 Current State Analysis

### GitHub Repositories (33 total)
- **Clean names:** `zaza-promptly-site`, `zaza-visuals-site`, `zaza-homepage`, `zaza-leadfinder`
- **Suffixed duplicates:** `zaza-technologies-site-6g`, `zaza-inbox-site-p7`, etc. (20+ duplicates)
- **Needs renaming:** `zaza-teach` → `zaza-teach-site`

### Vercel Deployments (33+ projects)
- **Production sites:** `zaza-homepage`, `zaza-promptly-website`, `zaza-leadfinder`
- **v0.dev test outputs:** 30+ projects starting with `v0-*`
- **Status:** Most show "No Production Deployment"

### v0.dev Projects
- **Working screenshots:** 2 projects with "Give 11 PM Back to Your Family" design
- **Placeholder projects:** 90+ projects with "No screenshot available"
- **Recent activity:** Most projects edited within last 5 hours

## 🎯 Target Organization

### ✅ **Final Repository Structure**

| Product | GitHub Repository | Vercel Project | Domain | Status |
|---------|------------------|----------------|---------|---------|
| **Zaza Technologies** | `zaza-technologies-site` | `zaza-homepage` | `www.zazatechnologies.com` | ✅ Live |
| **Zaza Promptly** | `zaza-promptly-site` | `zaza-promptly-website` | `zaza-promptly.vercel.app` | 🔄 Update |
| **Zaza Teach** | `zaza-teach-site` | `zaza-teach` | `zaza-teach.vercel.app` | ➕ Create |
| **Zaza Inbox** | `zaza-inbox-site` | `zaza-inbox` | `zaza-inbox.vercel.app` | ➕ Create |
| **Zaza Schwoop** | `zaza-schwoop-site` | `zaza-schwoop` | `zaza-schwoop.vercel.app` | ➕ Create |
| **Zaza ClarityDeck** | `zaza-claritydeck-site` | `zaza-claritydeck` | `zaza-claritydeck.vercel.app` | ➕ Create |
| **Zaza Visuals** | `zaza-visuals-site` | `zaza-visuals` | `zaza-visuals.vercel.app` | ➕ Create |
| **Zaza Study** | `zaza-study-site` | `zaza-study` | `zaza-study.vercel.app` | ➕ Create |

## 🛠️ Implementation Steps

### Phase 1: GitHub Repository Cleanup
1. **Run the cleanup script:** `cleanup-zaza-repos.ps1`
2. **Archive duplicate repositories** with suffixes (-6g, -zb, etc.)
3. **Rename core repositories** to clean names
4. **Update README files** with descriptions and Vercel links
5. **Set repositories to public** (marketing sites only)

### Phase 2: Vercel Project Cleanup
1. **Delete v0-* projects** (30+ test outputs)
2. **Create new Vercel projects** for missing products
3. **Link repositories** to correct Vercel projects
4. **Configure domains** and environment variables
5. **Set up auto-deploy** for all projects

### Phase 3: Final Verification
1. **Test all deployments** work correctly
2. **Update external links** pointing to old URLs
3. **Document the new structure** for team reference

## 📋 Repository Descriptions

### Zaza Technologies Site
- **Description:** Zaza Technologies - Main company website and landing page
- **Tech Stack:** Next.js 15, TypeScript, Tailwind CSS
- **Features:** Company overview, product showcase, contact information
- **Public:** ✅ (marketing site)

### Zaza Promptly Site
- **Description:** Zaza Promptly - AI-powered student comments for teachers
- **Tech Stack:** Next.js 15, TypeScript, Tailwind CSS
- **Features:** Product landing page, pricing, testimonials, FAQ
- **Public:** ✅ (marketing site)

### Zaza Teach Site
- **Description:** Zaza Teach - AI-powered lesson planning tool for teachers
- **Tech Stack:** Next.js 15, TypeScript, Tailwind CSS
- **Features:** Product showcase, features, pricing, demo
- **Public:** ✅ (marketing site)

### Zaza Inbox Site
- **Description:** Zaza Inbox - Smart email management for educators
- **Tech Stack:** Next.js 15, TypeScript, Tailwind CSS
- **Features:** Product landing page, features, integration guide
- **Public:** ✅ (marketing site)

### Zaza Schwoop Site
- **Description:** Zaza Schwoop - Student engagement and gamification platform
- **Tech Stack:** Next.js 15, TypeScript, Tailwind CSS
- **Features:** Product showcase, challenge examples, pricing
- **Public:** ✅ (marketing site)

### Zaza ClarityDeck Site
- **Description:** Zaza ClarityDeck - Presentation and content creation tool
- **Tech Stack:** Next.js 15, TypeScript, Tailwind CSS
- **Features:** Product demo, templates, pricing
- **Public:** ✅ (marketing site)

### Zaza Visuals Site
- **Description:** Zaza Visuals - Creative design and visual content platform
- **Tech Stack:** Next.js 15, TypeScript, Tailwind CSS
- **Features:** Portfolio showcase, design tools, pricing
- **Public:** ✅ (marketing site)

### Zaza Study Site
- **Description:** Zaza Study - Learning management and study tools
- **Tech Stack:** Next.js 15, TypeScript, Tailwind CSS
- **Features:** Study tools, progress tracking, pricing
- **Public:** ✅ (marketing site)

## 🔒 Security Considerations

### Public Repositories (Marketing Sites)
- All product landing pages can be public
- No sensitive business logic or API keys
- Only static content and UI components

### Private Repositories (Product Code)
- `zaza-leadfinder` - Contains business logic, keep private
- Any repositories with actual product functionality
- Repositories with API keys or sensitive data

## 📈 Benefits of This Organization

1. **Clear Naming Convention:** Easy to identify which repository belongs to which product
2. **Reduced Confusion:** No more duplicate repositories with random suffixes
3. **Better SEO:** Clean URLs and repository names
4. **Easier Maintenance:** Clear separation between marketing sites and product code
5. **Professional Appearance:** Clean GitHub profile and Vercel dashboard
6. **Scalable Structure:** Easy to add new products following the same pattern

## 🚀 Quick Start Commands

```bash
# 1. Run GitHub cleanup script
.\cleanup-zaza-repos.ps1

# 2. Install Vercel CLI
npm i -g vercel

# 3. Login to Vercel
vercel login

# 4. Create new Vercel projects
vercel --name zaza-teach --repo DigBlack/zaza-teach-site
vercel --name zaza-inbox --repo DigBlack/zaza-inbox-site
vercel --name zaza-schwoop --repo DigBlack/zaza-schwoop-site
vercel --name zaza-claritydeck --repo DigBlack/zaza-claritydeck-site
vercel --name zaza-visuals --repo DigBlack/zaza-visuals-site
vercel --name zaza-study --repo DigBlack/zaza-study-site

# 5. Update existing project
vercel projects link zaza-promptly-website --repo DigBlack/zaza-promptly-site
```

## 📞 Support

If you encounter any issues during the cleanup process:

1. **Check the logs** in the PowerShell script output
2. **Verify GitHub CLI** is properly authenticated
3. **Ensure Vercel CLI** is logged in
4. **Backup repositories** before making changes
5. **Test deployments** after linking repositories

## 🎉 Expected Outcome

After completing this organization:

- **8 clean repositories** with consistent naming
- **8 Vercel projects** properly linked to repositories
- **Clean Vercel dashboard** with no v0-* clutter
- **Professional GitHub profile** with organized repositories
- **Easy maintenance** and future development workflow 