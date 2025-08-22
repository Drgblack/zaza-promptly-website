# Sample Resources Placeholder

This directory would contain the actual PDF resources for download.

For production, you would place the following PDF files here:

- comment-tips.pdf
- report-template.pdf
- parent-comm-guide.pdf
- ai-prompt-templates.pdf
- assessment-rubrics.pdf
- classroom-management-guide.pdf
- lesson-planning-templates.pdf
- time-management-guide.pdf
- differentiation-strategies.pdf
- parent-conference-templates.pdf
- behavior-intervention-plans.pdf
- formative-assessment-toolkit.pdf
- student-goal-setting-worksheets.pdf

Each PDF would be served through the /api/download endpoint with proper:
- Content-Type: application/pdf
- Content-Disposition: attachment; filename="[filename].pdf"
- Proper caching headers
- Download tracking (with user consent)