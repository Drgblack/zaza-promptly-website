# Vercel Project Restructure Guide

## Overview
Restructuring from:
- **Old**: `https://vercel.com/zaza-d3c15292/zaza-site-base/deployments`
- **New**: `https://vercel.com/zaza-84f92db5/zaza-promptly/deployments`

## Steps Required

### 1. Vercel Dashboard Changes

#### Create New Project
1. Go to Vercel Dashboard
2. Create new project named: `zaza-promptly`
3. Connect to same GitHub repository: `zaza-websites-promptly`
4. Set build configuration:
   ```
   Framework: Next.js
   Root Directory: sites/promptly-v2
   Build Command: npm run build
   Output Directory: (leave blank - auto-detected)
   Install Command: npm ci
   Node.js Version: 18.x
   ```

#### Environment Variables
Copy all environment variables from old project to new project:
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.zazapromptly.com
NEXT_PUBLIC_ENV=production

# Stripe Configuration
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID_PROMPTLY_MONTHLY=price_...
STRIPE_PRICE_ID_PROMPTLY_ANNUAL=price_...

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=...

# Email Services
EMAIL_SERVER_HOST=...
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=...
EMAIL_SERVER_PASSWORD=...
EMAIL_FROM=noreply@zazapromptly.com

# Feature Flags
NEXT_PUBLIC_ENABLE_WAITLIST=true
NEXT_PUBLIC_ENABLE_CHECKOUT=false
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Sentry
SENTRY_DSN=...
SENTRY_ENV=production
```

#### Domain Configuration
1. Add domains to new project:
   - `zazapromptly.com`
   - `www.zazapromptly.com`
2. Configure DNS records as instructed by Vercel
3. Wait for SSL certificates to provision

### 2. Repository Structure Changes

The current structure should remain the same since it's already organized correctly:
```
zaza-websites-promptly/
├── sites/
│   └── promptly-v2/          # Main Promptly site (Vercel root)
│       ├── src/
│       ├── public/
│       ├── package.json
│       ├── next.config.mjs
│       └── vercel.json
├── content/                  # Shared content
├── lib/                      # Shared utilities
├── messages/                 # i18n messages
└── public/                   # Root public assets
```

### 3. GitHub Repository Settings

#### Branch Protection (if needed)
1. Go to GitHub repository settings
2. Update branch protection rules for main/master branch
3. Add Vercel deployment checks

#### Webhooks
Vercel will automatically create webhooks when connecting the new project.

### 4. Deployment Configuration

#### Update vercel.json (if needed)
The current `sites/promptly-v2/vercel.json` should work as-is:
```json
{
  "redirects": [
    // ... existing redirects
  ]
}
```

#### Build Settings
Ensure the root directory is set correctly in Vercel:
- **Root Directory**: `sites/promptly-v2`
- **Build Command**: `npm run build`
- **Install Command**: `npm ci`

### 5. DNS and Domain Migration

#### Update DNS Records
1. Update A/CNAME records to point to new Vercel deployment
2. Ensure both apex and www domains are configured
3. Test SSL certificate provisioning

#### Domain Verification
1. Verify domain ownership in new Vercel project
2. Configure custom domains
3. Set up redirects (www → apex or vice versa)

### 6. Monitoring and Analytics

#### Update Analytics
1. Verify Google Analytics tracking is working
2. Check Sentry error reporting
3. Monitor Core Web Vitals in Vercel Analytics

#### Performance Monitoring
1. Enable Vercel Analytics
2. Set up performance budgets
3. Configure alerts for deployment failures

### 7. Testing and Verification

#### Pre-Migration Checklist
- [ ] New Vercel project created with correct settings
- [ ] All environment variables copied
- [ ] Domain configuration ready
- [ ] DNS changes prepared

#### Post-Migration Checklist
- [ ] Site loads correctly on new domain
- [ ] All pages and routes work
- [ ] Forms and API endpoints function
- [ ] Analytics tracking active
- [ ] SSL certificates valid
- [ ] Performance metrics acceptable

#### Rollback Plan
1. Keep old Vercel project active during transition
2. DNS can be quickly switched back if issues arise
3. Environment variables backed up
4. Database connections (if any) remain unchanged

### 8. Cleanup

#### After Successful Migration
1. Archive old Vercel project (`zaza-site-base`)
2. Update any external service configurations
3. Update documentation with new URLs
4. Notify team members of new deployment URLs

#### Communication
1. Update team on new Vercel project URL
2. Share new deployment webhook URLs if needed
3. Update CI/CD pipelines if applicable

## Timeline

**Preparation**: 1-2 hours
- Create new Vercel project
- Configure environment variables
- Prepare DNS changes

**Migration**: 30 minutes
- Deploy to new project
- Update DNS records
- Verify functionality

**Verification**: 1 hour
- Test all functionality
- Monitor for issues
- Complete checklist

**Total Estimated Time**: 2-4 hours

## Support

If issues arise during migration:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test DNS propagation
4. Monitor error tracking (Sentry)
5. Have rollback plan ready

## Notes

- The repository folder structure (`sites/promptly-v2/`) can remain the same
- Only the Vercel project name and URL structure changes
- All existing functionality should be preserved
- This is primarily a Vercel infrastructure change, not a code change