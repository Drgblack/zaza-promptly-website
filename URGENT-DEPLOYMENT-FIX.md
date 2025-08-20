# URGENT: Deployment Platform Issue

**Problem**: Live site stuck on commit `a156ff93` (from 2025-07-something) despite multiple successful pushes to main branch.

**Local Status**: 
- Current commit: `089e6dec` (2025-08-20 19:01:30 UTC)
- All pricing fixes committed and pushed

**Live Site Status**:
- Still showing old commit: `a156ff93` 
- Pricing page redirects to `/promptly-pricing` instead of `/pricing`
- Header missing "Pricing" navigation link

**Root Cause**: Deployment platform (Vercel) not detecting or building new commits from GitHub.

**Immediate Actions Needed**:
1. Check Vercel dashboard for deployment failures
2. Verify GitHub webhook configuration
3. Manual trigger deployment if needed
4. Clear any cached deployment configurations

**Files Updated** (not yet deployed):
- `lib/subscription-tiers.ts` - Updated pricing to $14.99/$149.9
- Multiple cache-busting trigger files
- All components have correct pricing

This explains why user sees no changes despite successful builds locally.