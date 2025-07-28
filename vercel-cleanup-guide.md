# Vercel Cleanup and Repository Mapping Guide

## 🎯 Overview

This guide will help you clean up your Vercel deployments and properly map them to your newly organized GitHub repositories.

## 📋 Current Vercel Projects Analysis

Based on your Vercel dashboard, here are the projects that need attention:

### ✅ **Keep These (Production Sites)**
- `zaza-homepage` → `www.zazatechnologies.com` (Working ✅)
- `zaza-promptly-website` → `zaza-promptly-product-page.vercel.app` (Needs linking)
- `zaza-leadfinder` → `zaza-leadfinder.vercel.app` (Working ✅)

### 🗑️ **Archive These (v0.dev Test Outputs)**
All projects starting with `v0-` should be archived or deleted:
- `v0-zaza-vision-and-mission-s`
- `v0-zaza-study-1`
- `v0-zaza-schwoop-pitch`
- `v0-schwoop-website-f`
- `v0-zaza-terms-of-use-s`
- `v0-free-resources-s`
- `v0-zaza-promptly-chat-gpt-fhd-s`
- `v0-zaza-visuals-landing-page`
- `v0-open-ai-and-ai-sdk-chatbot`
- `v0-blog`
- `v0-zaza-inbox-website-fhd`
- `v0-schwoop-challenge-page`
- `v0-schwoop-tik-tok-challenge-f`
- `v0-contact-page-s`
- `v0-about-the-founder-m`
- `v0-zaza-technologies-about-s`
- `v0-vertical-nav-sections`
- `v0-aventum-website-redesign`
- `v0-faq-page`
- `v0-support-page`
- `v0-privacy-policy-page`
- `v0-zaza-teach-full-page`
- `v0-product-overview-hub`
- `v0-blog-page`
- `v0-zaza-technologies-homepage-v2-0`
- `v0-zaza-ecosystem-support-page`
- `v0-terms-of-service-page`
- `v0-waitlist-page`
- `v0-for-schools-and-institutions`
- `v0-about-the-founder`
- `v0-zaza-technologies-homepage`
- `zaza-vercel`
- `zaza-vercel-working`

## 🛠️ Step-by-Step Vercel Cleanup

### Step 1: Archive v0.dev Test Projects

1. **Go to Vercel Dashboard** → Projects
2. **For each v0-* project:**
   - Click on the project
   - Go to Settings → General
   - Scroll to bottom → "Delete Project"
   - Confirm deletion

**Or use Vercel CLI (faster):**

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel
vercel login

# List all projects
vercel projects ls

# Delete v0-* projects (replace PROJECT_ID with actual IDs)
vercel projects rm PROJECT_ID
```

### Step 2: Map Repositories to Vercel Projects

After running the GitHub cleanup script, map your repositories:

#### **Zaza Technologies (Main Site)**
- **Repository:** `zaza-technologies-site`
- **Vercel Project:** `zaza-homepage`
- **Domain:** `www.zazatechnologies.com`
- **Action:** Update Git repository link in Vercel settings

#### **Zaza Promptly**
- **Repository:** `zaza-promptly-site`
- **Vercel Project:** `zaza-promptly-website`
- **Domain:** `zaza-promptly-product-page.vercel.app`
- **Action:** Update Git repository link in Vercel settings

#### **Zaza Teach**
- **Repository:** `zaza-teach-site`
- **Vercel Project:** Create new project
- **Domain:** `zaza-teach.vercel.app`
- **Action:** Import from GitHub repository

#### **Zaza Inbox**
- **Repository:** `zaza-inbox-site`
- **Vercel Project:** Create new project
- **Domain:** `zaza-inbox.vercel.app`
- **Action:** Import from GitHub repository

#### **Zaza Schwoop**
- **Repository:** `zaza-schwoop-site`
- **Vercel Project:** Create new project
- **Domain:** `zaza-schwoop.vercel.app`
- **Action:** Import from GitHub repository

#### **Zaza ClarityDeck**
- **Repository:** `zaza-claritydeck-site`
- **Vercel Project:** Create new project
- **Domain:** `zaza-claritydeck.vercel.app`
- **Action:** Import from GitHub repository

#### **Zaza Visuals**
- **Repository:** `zaza-visuals-site`
- **Vercel Project:** Create new project
- **Domain:** `zaza-visuals.vercel.app`
- **Action:** Import from GitHub repository

#### **Zaza Study**
- **Repository:** `zaza-study-site`
- **Vercel Project:** Create new project
- **Domain:** `zaza-study.vercel.app`
- **Action:** Import from GitHub repository

### Step 3: Update Vercel Project Settings

For each project, update these settings:

1. **Git Repository Link:**
   - Go to Settings → Git
   - Update repository to point to the correct GitHub repo

2. **Environment Variables:**
   - Go to Settings → Environment Variables
   - Add any necessary environment variables

3. **Domain Settings:**
   - Go to Settings → Domains
   - Configure custom domains if needed

4. **Build Settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 4: Set Up Automatic Deployments

For each project:

1. **Enable Auto-Deploy:**
   - Go to Settings → Git
   - Ensure "Auto Deploy" is enabled

2. **Branch Settings:**
   - Production Branch: `main`
   - Preview Branches: `develop`, `staging`

3. **Deployment Protection:**
   - Go to Settings → Git
   - Enable "Require Preview Deployment" if needed

## 🔗 Final Repository → Vercel Mapping

| Product | GitHub Repository | Vercel Project | Domain | Status |
|---------|------------------|----------------|---------|---------|
| Zaza Technologies | `zaza-technologies-site` | `zaza-homepage` | `www.zazatechnologies.com` | ✅ Live |
| Zaza Promptly | `zaza-promptly-site` | `zaza-promptly-website` | `zaza-promptly.vercel.app` | 🔄 Update |
| Zaza Teach | `zaza-teach-site` | `zaza-teach` | `zaza-teach.vercel.app` | ➕ Create |
| Zaza Inbox | `zaza-inbox-site` | `zaza-inbox` | `zaza-inbox.vercel.app` | ➕ Create |
| Zaza Schwoop | `zaza-schwoop-site` | `zaza-schwoop` | `zaza-schwoop.vercel.app` | ➕ Create |
| Zaza ClarityDeck | `zaza-claritydeck-site` | `zaza-claritydeck` | `zaza-claritydeck.vercel.app` | ➕ Create |
| Zaza Visuals | `zaza-visuals-site` | `zaza-visuals` | `zaza-visuals.vercel.app` | ➕ Create |
| Zaza Study | `zaza-study-site` | `zaza-study` | `zaza-study.vercel.app` | ➕ Create |

## 🚀 Quick Commands for Vercel CLI

```bash
# Create new projects for each product
vercel --name zaza-teach --repo DigBlack/zaza-teach-site
vercel --name zaza-inbox --repo DigBlack/zaza-inbox-site
vercel --name zaza-schwoop --repo DigBlack/zaza-schwoop-site
vercel --name zaza-claritydeck --repo DigBlack/zaza-claritydeck-site
vercel --name zaza-visuals --repo DigBlack/zaza-visuals-site
vercel --name zaza-study --repo DigBlack/zaza-study-site

# Update existing project repository
vercel projects link zaza-promptly-website --repo DigBlack/zaza-promptly-site
```

## 📝 Post-Cleanup Checklist

- [ ] All v0-* projects archived/deleted
- [ ] All repositories properly linked to Vercel projects
- [ ] Custom domains configured
- [ ] Environment variables set
- [ ] Auto-deploy enabled
- [ ] Test deployments working
- [ ] Update any external links pointing to old URLs

## ⚠️ Important Notes

1. **Backup First:** Before deleting any Vercel projects, ensure you have the code backed up in GitHub
2. **Test Deployments:** After linking repositories, test that deployments work correctly
3. **Domain DNS:** If using custom domains, update DNS settings accordingly
4. **Environment Variables:** Don't forget to transfer any environment variables from old projects 