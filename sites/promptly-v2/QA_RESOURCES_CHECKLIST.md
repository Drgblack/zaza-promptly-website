# Resources QA Checklist

This checklist ensures all downloadable resources meet quality and accessibility standards before publication.

## Visual Check - Browser Compatibility
- [ ] Chrome (desktop)
- [ ] Chrome (mobile)
- [ ] Firefox (desktop)
- [ ] Firefox (mobile)
- [ ] Safari (desktop)
- [ ] Safari (mobile)
- [ ] Edge (desktop)
- [ ] Edge (mobile)

## Functionality Testing
- [ ] Open inline vs download behaviour works correctly
- [ ] PDF opens in new tab when using "Open" button
- [ ] Download triggers proper file download when using "Download" button
- [ ] Analytics events fire correctly (check console logs)
- [ ] Resource tracking respects cookie consent

## Print Quality & Content
- [ ] Print-to-PDF clarity is acceptable
- [ ] Print-to-PDF margins are appropriate
- [ ] Copy-paste fidelity for text content works properly
- [ ] Text remains selectable and searchable

## Accessibility Requirements
- [ ] Accessibility check: selectable text (not image-only)
- [ ] Screen readers can access content properly
- [ ] Aria-labels are descriptive and helpful
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators are visible

## Technical Standards
- [ ] File size sanity check (<2 MB unless justified)
- [ ] File format is appropriate for content type
- [ ] Filename follows naming conventions
- [ ] Resource metadata is accurate (title, description, format)
- [ ] License information is clearly specified

## Content Quality
- [ ] Content is accurate and up-to-date
- [ ] No spelling or grammatical errors
- [ ] Visual design is consistent with brand standards
- [ ] Resource provides clear value to users

## Performance Impact
- [ ] Resource loads efficiently
- [ ] No negative impact on page load speed
- [ ] Appropriate compression applied where possible
- [ ] CDN delivery working correctly (if applicable)
