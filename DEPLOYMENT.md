# Deployment Configuration

## Overview
This repository deploys a Next.js application from a subdirectory structure.

## Configuration
- **Node Version**: 20.x (aligned with Vercel default)
- **Approach**: Custom vercel.json commands with --prefix flag
- **Subdirectory Path**: `sites/promptly-v2`
- **Framework**: Next.js 14.2.8

## Build Commands
- **Install**: `npm run vercel:install` → `npm ci --prefix sites/promptly-v2`
- **Build**: `npm run vercel:build` → `npm run build --prefix sites/promptly-v2`
- **Output**: `sites/promptly-v2/.next`

## Vercel Configuration
The deployment uses custom commands in `vercel.json` rather than the Vercel "Root Directory" setting to maintain flexibility and ensure proper subdirectory handling.

## Alternative Approach
If the current approach fails, switch to using Vercel's "Root Directory" setting:
1. In Vercel Dashboard → Project → Settings → General → Build & Development Settings
2. Set Root Directory to: `sites/promptly-v2`
3. Remove custom `installCommand` and `buildCommand` from `vercel.json`
4. Let Vercel auto-detect the Next.js framework

## Files Modified
- `package.json`: Added engines field and helper scripts
- `vercel.json`: Custom build commands with --prefix
- `.vercelignore`: Explicitly allows sites/promptly-v2/**

## Troubleshooting
If build fails with "directory not found":
1. Check that `sites/promptly-v2` exists in git: `git ls-files 'sites/promptly-v2/**'`
2. Verify .vercelignore is not excluding the directory
3. Consider switching to Root Directory approach (see Alternative Approach above)