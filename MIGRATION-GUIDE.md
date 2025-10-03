# Domain Migration Guide: zazapromptly.com → zazadraft.com

## ✅ Completed Steps

1. **Redirects**: Added 301 redirect configuration in vercel.json
2. **Repository**: Updated README to indicate the site has moved

## 🔧 Owner Tasks Required

### 1. Google Search Console
- [ ] Add and verify https://zazadraft.com (if not already done)
- [ ] In the zazapromptly.com property, use **Change of Address** to point to https://zazadraft.com
- [ ] Resubmit the zazadraft.com sitemap(s)

### 2. Google Analytics / GTM
- [ ] Create a new GA4 data stream for zazadraft.com (recommended), or update existing with new domain settings
- [ ] Update GTM variables if you use domain filters
- [ ] Migrate any conversion goals (form submits, CTA clicks) to the new domain

### 3. Email & Brevo
- [ ] Forward any emails from @zazapromptly.com to help@zazatechnologies.com
- [ ] In Brevo, update links inside templates to zazadraft.com
- [ ] Ensure DKIM/SPF are set for zazadraft.com sender domain (Brevo)

### 4. Social & Listings
- [ ] Update social bios and links (LinkedIn/X/TikTok) from promptly → draft
- [ ] Update any app store listings for Promptly (privacy policy, homepage) to zazadraft.com

### 5. Backlinks (Optional)
- [ ] For known high-value backlinks pointing to zazapromptly.com, ask partners to update to zazadraft.com

## 🧪 QA Testing Script

Run these commands after deployment to verify the redirect works:

```bash
# Test redirect preserves path and returns 301
curl -I https://zazapromptly.com/en/pricing
# Expected: Location: https://zazadraft.com/en/pricing

# Test various paths
curl -I https://zazapromptly.com/
curl -I https://www.zazapromptly.com/de/blog
curl -I https://zazapromptly.com/en/pricing?utm_source=test

# All should redirect to corresponding zazadraft.com URLs
```

## 📋 DNS Configuration

**Current**: Keep zazapromptly.com pointing to Vercel (A/ALIAS/CNAME as it is)
- No content changes needed - the 301 redirect handles everything
- Ensure both apex and www domains are configured on the Vercel project

## ⚠️ Important Notes

- The 301 redirect preserves all paths and query parameters
- Google will follow redirects and transfer SEO value
- Keep the domain attached to the Vercel project for the redirect to work
- No rush on backlink updates - the 301 redirect maintains SEO value

## 🎯 Success Criteria

- [ ] All zazapromptly.com URLs redirect to zazadraft.com with 301 status
- [ ] Path preservation works (e.g., /en/pricing → /en/pricing)
- [ ] Query parameters are preserved
- [ ] Google Search Console shows the domain migration
- [ ] Analytics tracking moves to new domain