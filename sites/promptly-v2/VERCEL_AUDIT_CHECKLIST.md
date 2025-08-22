# Vercel Configuration Audit Checklist for zazapromptly.com

## ✅ Expected Configuration vs. Current Setup

### Git Repository Settings
- **✅ Expected**: `zaza-websites-claudecode` 
- **✅ Branch**: `main` (with deployments from main branch)
- **Action**: Verify in Vercel Dashboard → Settings → Git

### Build & Framework Settings
- **✅ Framework**: Next.js (auto-detected)
- **✅ Root Directory**: `sites/promptly-v2`
- **✅ Build Command**: `npm run build` (or auto-detected `next build`)
- **✅ Output Directory**: `.next` (default)
- **✅ Install Command**: `npm install` (default)
- **Action**: Verify in Vercel Dashboard → Settings → Build & Development

### Environment Variables Required
Based on codebase analysis, verify these environment variables are set:

#### Core App Settings
- `NEXT_PUBLIC_SITE_URL=https://www.zazapromptly.com`
- `NEXT_PUBLIC_ENV=production`

#### Stripe Configuration (Required for checkout)
- `STRIPE_PUBLIC_KEY=pk_live_...` or `pk_test_...`
- `STRIPE_SECRET_KEY=sk_live_...` or `sk_test_...` 
- `STRIPE_PRICE_ID_PROMPTLY_MONTHLY=price_...`
- `STRIPE_PRICE_ID_PROMPTLY_ANNUAL=price_...`

#### Sentry (Error Tracking)
- `SENTRY_DSN=https://...`
- `SENTRY_ENV=production`
- `SENTRY_TRACES_SAMPLE_RATE=0.1`
- `SENTRY_REPLAYS_SESSION_SAMPLE_RATE=0.0`
- `SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE=0.1`

#### Analytics (Optional)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...` (Google Analytics)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=zazapromptly.com` (if using Plausible)

#### Feature Flags
- `NEXT_PUBLIC_ENABLE_WAITLIST=true`
- `NEXT_PUBLIC_ENABLE_CHECKOUT=false` (or true if accepting payments)
- `NEXT_PUBLIC_ENABLE_ANALYTICS=true` (if analytics enabled)

### Domain Configuration
- **✅ Primary Domain**: `zazapromptly.com`
- **✅ WWW Redirect**: `www.zazapromptly.com` → redirect to `zazapromptly.com`
- **Action**: Verify in Vercel Dashboard → Settings → Domains

## 🔧 Step-by-Step Verification Process

### 1. Access Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find the project for zazapromptly.com

### 2. Verify Git Configuration
1. Navigate to **Settings** → **Git**
2. Confirm:
   - Repository: `zaza-websites-claudecode`
   - Production Branch: `main`
   - Root Directory: `sites/promptly-v2`

### 3. Verify Build Settings
1. Navigate to **Settings** → **Build & Development**
2. Confirm:
   - Framework: Next.js
   - Build Command: `npm run build` (or default)
   - Output Directory: `.next` (or default)
   - Install Command: `npm install` (or default)

### 4. Audit Environment Variables
1. Navigate to **Settings** → **Environment Variables**
2. Check all variables listed above are present
3. Ensure production values (not test/development values)

### 5. Verify Domain Setup
1. Navigate to **Settings** → **Domains**
2. Confirm both domains are properly configured:
   - `zazapromptly.com` (primary)
   - `www.zazapromptly.com` (redirect)

## 🚨 Common Issues & Fixes

### If Wrong Root Directory
1. Settings → Build & Development
2. Set Root Directory: `sites/promptly-v2`
3. Redeploy

### If Missing Environment Variables
1. Settings → Environment Variables
2. Add missing variables from the list above
3. Redeploy latest deployment

### If Wrong Git Repository
1. Settings → Git
2. Disconnect current repo
3. Connect `zaza-websites-claudecode`
4. Set Root Directory: `sites/promptly-v2`

### If Domain Issues
1. Settings → Domains
2. Remove incorrect domains
3. Add `zazapromptly.com` as primary
4. Add `www.zazapromptly.com` and set to redirect

## ⚡ Quick Redeploy
After any configuration changes:
1. Go to **Deployments** tab
2. Find latest successful deployment
3. Click **⋯** → **Redeploy**
4. Monitor deployment logs for success

---
**Last Updated**: August 22, 2025  
**Live Site**: https://zazapromptly.com