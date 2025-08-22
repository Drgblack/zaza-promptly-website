#!/usr/bin/env node

/**
 * Generates branded PDFs from HTML templates using Playwright
 */

import { chromium } from 'playwright'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

interface PDFTemplate {
  filename: string
  title: string
  content: string
  editable?: boolean
}

const OUTPUT_DIR = path.join(process.cwd(), 'resources')
const BRAND_COLORS = {
  primary: '#7c3aed', // purple-600
  secondary: '#3b4371',
  dark: '#1e293b', // slate-800
  text: '#334155', // slate-700
  accent: '#06b6d4' // cyan-500
}

// Shared theme HTML template
const createPDFHTML = (template: PDFTemplate): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    @page {
      size: A4;
      margin: 20mm;
    }
    
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: ${BRAND_COLORS.text};
      background: white;
    }
    
    .pdf-header {
      position: fixed;
      top: -15mm;
      left: 0;
      right: 0;
      height: 15mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20mm;
      border-bottom: 1px solid #e2e8f0;
      background: white;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 14pt;
      color: ${BRAND_COLORS.primary};
    }
    
    .logo-icon {
      width: 24px;
      height: 24px;
      background: ${BRAND_COLORS.primary};
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
    
    .resource-label {
      font-size: 9pt;
      color: ${BRAND_COLORS.text};
      opacity: 0.7;
    }
    
    .pdf-footer {
      position: fixed;
      bottom: -15mm;
      left: 0;
      right: 0;
      height: 15mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20mm;
      border-top: 1px solid #e2e8f0;
      font-size: 8pt;
      color: ${BRAND_COLORS.text};
      opacity: 0.7;
      background: white;
    }
    
    .page-number {
      font-weight: 500;
    }
    
    .content {
      margin-top: 10mm;
      margin-bottom: 10mm;
    }
    
    h1 {
      font-size: 24pt;
      font-weight: 700;
      color: ${BRAND_COLORS.dark};
      margin-bottom: 8mm;
      line-height: 1.2;
    }
    
    h2 {
      font-size: 16pt;
      font-weight: 600;
      color: ${BRAND_COLORS.dark};
      margin-top: 8mm;
      margin-bottom: 4mm;
      border-bottom: 2px solid ${BRAND_COLORS.primary};
      padding-bottom: 2mm;
    }
    
    h3 {
      font-size: 13pt;
      font-weight: 600;
      color: ${BRAND_COLORS.dark};
      margin-top: 6mm;
      margin-bottom: 3mm;
    }
    
    p {
      margin-bottom: 4mm;
      text-align: justify;
    }
    
    ul, ol {
      margin-left: 6mm;
      margin-bottom: 4mm;
    }
    
    li {
      margin-bottom: 2mm;
    }
    
    .highlight-box {
      background: #f1f5f9;
      border-left: 4px solid ${BRAND_COLORS.primary};
      padding: 4mm;
      margin: 6mm 0;
      border-radius: 2mm;
    }
    
    .tips-box {
      background: #ecfdf5;
      border: 1px solid #86efac;
      padding: 4mm;
      margin: 6mm 0;
      border-radius: 2mm;
    }
    
    .warning-box {
      background: #fef3c7;
      border: 1px solid #fbbf24;
      padding: 4mm;
      margin: 6mm 0;
      border-radius: 2mm;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 6mm 0;
    }
    
    th, td {
      border: 1px solid #e2e8f0;
      padding: 3mm;
      text-align: left;
      vertical-align: top;
    }
    
    th {
      background: #f8fafc;
      font-weight: 600;
      color: ${BRAND_COLORS.dark};
    }
    
    .form-field {
      border-bottom: 1px solid ${BRAND_COLORS.text};
      min-height: 6mm;
      margin: 2mm 0;
      padding: 1mm 2mm;
      display: inline-block;
      min-width: 40mm;
    }
    
    .checkbox {
      width: 4mm;
      height: 4mm;
      border: 1px solid ${BRAND_COLORS.text};
      display: inline-block;
      margin-right: 2mm;
      vertical-align: middle;
    }
    
    .date-field {
      min-width: 25mm;
    }
    
    .signature-field {
      min-width: 60mm;
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="pdf-header">
    <div class="logo">
      <div class="logo-icon">⚡</div>
      <span>Promptly</span>
    </div>
    <div class="resource-label">Free Resource</div>
  </div>
  
  <div class="pdf-footer">
    <div>
      <span class="page-number">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>
    <div>For classroom use only • www.zazapromptly.com</div>
  </div>
  
  <div class="content">
    ${template.content}
  </div>
</body>
</html>
`

// PDF Templates
const templates: PDFTemplate[] = [
  {
    filename: 'report-template-v2.pdf',
    title: 'Student Report Template',
    editable: true,
    content: `
      <h1>Student Report Template</h1>
      
      <div class="highlight-box">
        <p><strong>Purpose:</strong> This template provides a structured framework for creating comprehensive student reports that communicate progress effectively to parents and guardians.</p>
      </div>
      
      <h2>Student Information</h2>
      <table>
        <tr>
          <td><strong>Student Name:</strong></td>
          <td class="form-field"></td>
          <td><strong>Class:</strong></td>
          <td class="form-field"></td>
        </tr>
        <tr>
          <td><strong>Term/Period:</strong></td>
          <td class="form-field"></td>
          <td><strong>Academic Year:</strong></td>
          <td class="form-field"></td>
        </tr>
        <tr>
          <td><strong>Report Date:</strong></td>
          <td class="form-field date-field"></td>
          <td><strong>Teacher:</strong></td>
          <td class="form-field"></td>
        </tr>
      </table>
      
      <h2>Academic Performance</h2>
      
      <h3>Key Subject Areas</h3>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Current Level</th>
            <th>Target Level</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>English</td>
            <td class="form-field"></td>
            <td class="form-field"></td>
            <td class="form-field"></td>
          </tr>
          <tr>
            <td>Mathematics</td>
            <td class="form-field"></td>
            <td class="form-field"></td>
            <td class="form-field"></td>
          </tr>
          <tr>
            <td>Science</td>
            <td class="form-field"></td>
            <td class="form-field"></td>
            <td class="form-field"></td>
          </tr>
          <tr>
            <td>Other: <span class="form-field" style="min-width: 30mm;"></span></td>
            <td class="form-field"></td>
            <td class="form-field"></td>
            <td class="form-field"></td>
          </tr>
        </tbody>
      </table>
      
      <h3>Academic Strengths</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h3>Areas for Development</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h2>Social & Personal Development</h2>
      
      <h3>Key Skills Assessment</h3>
      <ul>
        <li><span class="checkbox"></span> Works well independently</li>
        <li><span class="checkbox"></span> Collaborates effectively with peers</li>
        <li><span class="checkbox"></span> Shows resilience when facing challenges</li>
        <li><span class="checkbox"></span> Demonstrates good listening skills</li>
        <li><span class="checkbox"></span> Takes responsibility for learning</li>
        <li><span class="checkbox"></span> Shows respect for others and school values</li>
      </ul>
      
      <h3>Social Development Comments</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h2>Attendance & Punctuality</h2>
      <table>
        <tr>
          <td><strong>Attendance Rate:</strong></td>
          <td class="form-field" style="min-width: 15mm;"></td>
          <td><strong>% (Target: 96%+)</strong></td>
        </tr>
        <tr>
          <td><strong>Punctuality:</strong></td>
          <td class="form-field"></td>
          <td></td>
        </tr>
      </table>
      
      <h2>Next Steps & Targets</h2>
      
      <div class="tips-box">
        <p><strong>Tip:</strong> Make targets SMART (Specific, Measurable, Achievable, Relevant, Time-bound) and involve the student in setting them where appropriate.</p>
      </div>
      
      <h3>Priority Targets for Next Term</h3>
      <ol>
        <li>
          <strong>Target:</strong> <span class="form-field" style="min-width: 80mm;"></span>
          <br><strong>Success Criteria:</strong> <span class="form-field" style="min-width: 80mm;"></span>
        </li>
        <li>
          <strong>Target:</strong> <span class="form-field" style="min-width: 80mm;"></span>
          <br><strong>Success Criteria:</strong> <span class="form-field" style="min-width: 80mm;"></span>
        </li>
        <li>
          <strong>Target:</strong> <span class="form-field" style="min-width: 80mm;"></span>
          <br><strong>Success Criteria:</strong> <span class="form-field" style="min-width: 80mm;"></span>
        </li>
      </ol>
      
      <h3>How Parents/Guardians Can Support</h3>
      <div class="form-field" style="width: 100%; min-height: 20mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h2>Additional Comments</h2>
      <div class="form-field" style="width: 100%; min-height: 25mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h2>Sign-off</h2>
      <table style="margin-top: 10mm;">
        <tr>
          <td><strong>Class Teacher:</strong></td>
          <td class="form-field signature-field"></td>
          <td><strong>Date:</strong></td>
          <td class="form-field date-field"></td>
        </tr>
        <tr>
          <td><strong>Head Teacher:</strong></td>
          <td class="form-field signature-field"></td>
          <td><strong>Date:</strong></td>
          <td class="form-field date-field"></td>
        </tr>
      </table>
      
      <div class="warning-box" style="margin-top: 10mm;">
        <p><strong>Important:</strong> This report has been prepared with care and reflects your child's progress at this point in time. If you have any questions or concerns, please don't hesitate to contact the school to arrange a meeting.</p>
      </div>
    `
  },
  {
    filename: 'parent-meeting-notes-v2.pdf',
    title: 'Parent Meeting Notes Template',
    editable: true,
    content: `
      <h1>Parent Meeting Notes</h1>
      
      <div class="highlight-box">
        <p><strong>Purpose:</strong> Use this template to structure parent meetings, ensure key topics are covered, and maintain clear records of discussions and agreed actions.</p>
      </div>
      
      <h2>Meeting Details</h2>
      <table>
        <tr>
          <td><strong>Student Name:</strong></td>
          <td class="form-field"></td>
          <td><strong>Class/Year Group:</strong></td>
          <td class="form-field"></td>
        </tr>
        <tr>
          <td><strong>Meeting Date:</strong></td>
          <td class="form-field date-field"></td>
          <td><strong>Meeting Time:</strong></td>
          <td class="form-field" style="min-width: 20mm;"></td>
        </tr>
        <tr>
          <td><strong>Meeting Type:</strong></td>
          <td colspan="3">
            <span class="checkbox"></span> Routine Parent Evening &nbsp;&nbsp;
            <span class="checkbox"></span> Concern Meeting &nbsp;&nbsp;
            <span class="checkbox"></span> Progress Review &nbsp;&nbsp;
            <span class="checkbox"></span> Other: <span class="form-field" style="min-width: 30mm;"></span>
          </td>
        </tr>
      </table>
      
      <h2>Attendees</h2>
      <table>
        <tr>
          <td><strong>Parent/Guardian 1:</strong></td>
          <td class="form-field"></td>
        </tr>
        <tr>
          <td><strong>Parent/Guardian 2:</strong></td>
          <td class="form-field"></td>
        </tr>
        <tr>
          <td><strong>School Staff:</strong></td>
          <td class="form-field"></td>
        </tr>
        <tr>
          <td><strong>Student Present:</strong></td>
          <td><span class="checkbox"></span> Yes &nbsp;&nbsp; <span class="checkbox"></span> No</td>
        </tr>
      </table>
      
      <h2>Academic Progress Discussion</h2>
      
      <h3>Current Performance Overview</h3>
      <div class="form-field" style="width: 100%; min-height: 20mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h3>Key Strengths Highlighted</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h3>Areas of Concern (if any)</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h2>Behaviour & Social Development</h2>
      
      <h3>Classroom Behaviour</h3>
      <ul>
        <li><span class="checkbox"></span> Excellent - consistently meets expectations</li>
        <li><span class="checkbox"></span> Good - generally meets expectations</li>
        <li><span class="checkbox"></span> Satisfactory - usually meets expectations</li>
        <li><span class="checkbox"></span> Needs improvement - requires support</li>
      </ul>
      
      <h3>Social Skills & Relationships</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h2>Parent/Guardian Concerns & Questions</h2>
      
      <div class="tips-box">
        <p><strong>Key Questions to Consider:</strong> How is my child settling in? Are they happy? What can we do at home to support their learning? Are there any upcoming changes or challenges?</p>
      </div>
      
      <ol>
        <li class="form-field" style="width: 100%; min-height: 10mm; border: 1px solid #ccc; padding: 2mm; margin-bottom: 4mm;"></li>
        <li class="form-field" style="width: 100%; min-height: 10mm; border: 1px solid #ccc; padding: 2mm; margin-bottom: 4mm;"></li>
        <li class="form-field" style="width: 100%; min-height: 10mm; border: 1px solid #ccc; padding: 2mm; margin-bottom: 4mm;"></li>
      </ol>
      
      <h2>Support Strategies Discussed</h2>
      
      <h3>At School</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h3>At Home</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h2>Action Points</h2>
      
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Responsible Person</th>
            <th>Deadline</th>
            <th>Completed ✓</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="form-field" style="min-height: 8mm;"></td>
            <td class="form-field"></td>
            <td class="form-field date-field"></td>
            <td class="checkbox"></td>
          </tr>
          <tr>
            <td class="form-field" style="min-height: 8mm;"></td>
            <td class="form-field"></td>
            <td class="form-field date-field"></td>
            <td class="checkbox"></td>
          </tr>
          <tr>
            <td class="form-field" style="min-height: 8mm;"></td>
            <td class="form-field"></td>
            <td class="form-field date-field"></td>
            <td class="checkbox"></td>
          </tr>
          <tr>
            <td class="form-field" style="min-height: 8mm;"></td>
            <td class="form-field"></td>
            <td class="form-field date-field"></td>
            <td class="checkbox"></td>
          </tr>
        </tbody>
      </table>
      
      <h2>Follow-up Arrangements</h2>
      
      <table>
        <tr>
          <td><strong>Next Meeting Required:</strong></td>
          <td><span class="checkbox"></span> Yes &nbsp;&nbsp; <span class="checkbox"></span> No</td>
        </tr>
        <tr>
          <td><strong>Proposed Date:</strong></td>
          <td class="form-field date-field"></td>
        </tr>
        <tr>
          <td><strong>Additional Contact Method:</strong></td>
          <td>
            <span class="checkbox"></span> Phone Call &nbsp;&nbsp;
            <span class="checkbox"></span> Email Update &nbsp;&nbsp;
            <span class="checkbox"></span> Written Report
          </td>
        </tr>
      </table>
      
      <h2>Additional Notes</h2>
      <div class="form-field" style="width: 100%; min-height: 20mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h2>Meeting Summary</h2>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <div class="warning-box" style="margin-top: 10mm;">
        <p><strong>Confidentiality Note:</strong> These notes contain sensitive information about the student and family. Please store securely and follow school data protection policies.</p>
      </div>
      
      <h2>Sign-off</h2>
      <table style="margin-top: 8mm;">
        <tr>
          <td><strong>Teacher Signature:</strong></td>
          <td class="form-field signature-field"></td>
          <td><strong>Date:</strong></td>
          <td class="form-field date-field"></td>
        </tr>
        <tr>
          <td><strong>Parent/Guardian Signature:</strong></td>
          <td class="form-field signature-field"></td>
          <td><strong>Date:</strong></td>
          <td class="form-field date-field"></td>
        </tr>
      </table>
    `
  },
  {
    filename: 'behaviour-progress-checklist-v2.pdf',
    title: 'Behaviour Progress Checklist',
    editable: true,
    content: `
      <h1>Behaviour Progress Checklist</h1>
      
      <div class="highlight-box">
        <p><strong>Purpose:</strong> Track and monitor student behaviour progress over time. Use this checklist to identify patterns, celebrate improvements, and plan targeted interventions.</p>
      </div>
      
      <h2>Student Information</h2>
      <table>
        <tr>
          <td><strong>Student Name:</strong></td>
          <td class="form-field"></td>
          <td><strong>Class/Year Group:</strong></td>
          <td class="form-field"></td>
        </tr>
        <tr>
          <td><strong>Teacher:</strong></td>
          <td class="form-field"></td>
          <td><strong>Review Period:</strong></td>
          <td class="form-field"></td>
        </tr>
        <tr>
          <td><strong>Start Date:</strong></td>
          <td class="form-field date-field"></td>
          <td><strong>Review Date:</strong></td>
          <td class="form-field date-field"></td>
        </tr>
      </table>
      
      <h2>Target Behaviours</h2>
      
      <div class="tips-box">
        <p><strong>Instructions:</strong> Select 3-5 key behaviours to focus on. Rate each behaviour weekly using the scale: 1 = Needs significant support, 2 = Developing, 3 = Meeting expectations, 4 = Exceeding expectations</p>
      </div>
      
      <h3>Core Classroom Behaviours</h3>
      
      <table>
        <thead>
          <tr>
            <th>Behaviour</th>
            <th>Week 1</th>
            <th>Week 2</th>
            <th>Week 3</th>
            <th>Week 4</th>
            <th>Week 5</th>
            <th>Week 6</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Following Instructions</strong><br><small>Listens to and follows teacher directions promptly</small></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 25mm;"></td>
          </tr>
          <tr>
            <td><strong>Staying on Task</strong><br><small>Remains focused on work without constant reminders</small></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 25mm;"></td>
          </tr>
          <tr>
            <td><strong>Appropriate Voice Level</strong><br><small>Uses inside voice and speaks at appropriate times</small></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 25mm;"></td>
          </tr>
          <tr>
            <td><strong>Respecting Others</strong><br><small>Treats peers and adults with kindness and respect</small></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 25mm;"></td>
          </tr>
          <tr>
            <td><strong>Managing Emotions</strong><br><small>Uses appropriate strategies when frustrated or upset</small></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 25mm;"></td>
          </tr>
        </tbody>
      </table>
      
      <h3>Social & Collaborative Behaviours</h3>
      
      <table>
        <thead>
          <tr>
            <th>Behaviour</th>
            <th>Week 1</th>
            <th>Week 2</th>
            <th>Week 3</th>
            <th>Week 4</th>
            <th>Week 5</th>
            <th>Week 6</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Working Cooperatively</strong><br><small>Collaborates well in group activities</small></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 25mm;"></td>
          </tr>
          <tr>
            <td><strong>Sharing & Turn-Taking</strong><br><small>Shares materials and waits for turn to speak</small></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 25mm;"></td>
          </tr>
          <tr>
            <td><strong>Problem-Solving</strong><br><small>Attempts to solve conflicts peacefully</small></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 8mm;"></td>
            <td class="form-field" style="min-width: 25mm;"></td>
          </tr>
        </tbody>
      </table>
      
      <h2>Weekly Reflection</h2>
      
      <h3>Week 1 Summary</h3>
      <p><strong>Highlights:</strong> <span class="form-field" style="min-width: 100mm;"></span></p>
      <p><strong>Challenges:</strong> <span class="form-field" style="min-width: 100mm;"></span></p>
      
      <h3>Week 2 Summary</h3>
      <p><strong>Highlights:</strong> <span class="form-field" style="min-width: 100mm;"></span></p>
      <p><strong>Challenges:</strong> <span class="form-field" style="min-width: 100mm;"></span></p>
      
      <h3>Week 3 Summary</h3>
      <p><strong>Highlights:</strong> <span class="form-field" style="min-width: 100mm;"></span></p>
      <p><strong>Challenges:</strong> <span class="form-field" style="min-width: 100mm;"></span></p>
      
      <h2>Interventions & Strategies Used</h2>
      
      <div class="tips-box">
        <p><strong>Strategy Bank:</strong> Visual cues, movement breaks, peer support, choice boards, calm-down time, positive reinforcement, clear expectations, structured routines</p>
      </div>
      
      <ul>
        <li><span class="checkbox"></span> <strong>Positive Reinforcement:</strong> <span class="form-field" style="min-width: 60mm;"></span></li>
        <li><span class="checkbox"></span> <strong>Visual Supports:</strong> <span class="form-field" style="min-width: 60mm;"></span></li>
        <li><span class="checkbox"></span> <strong>Environmental Changes:</strong> <span class="form-field" style="min-width: 60mm;"></span></li>
        <li><span class="checkbox"></span> <strong>Peer Support:</strong> <span class="form-field" style="min-width: 60mm;"></span></li>
        <li><span class="checkbox"></span> <strong>Break/Movement:</strong> <span class="form-field" style="min-width: 60mm;"></span></li>
        <li><span class="checkbox"></span> <strong>Communication Tools:</strong> <span class="form-field" style="min-width: 60mm;"></span></li>
        <li><span class="checkbox"></span> <strong>Other:</strong> <span class="form-field" style="min-width: 60mm;"></span></li>
      </ul>
      
      <h2>Parent/Guardian Input</h2>
      
      <h3>Home Observations</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h3>Strategies That Work at Home</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h2>Progress Summary</h2>
      
      <h3>Overall Progress Rating</h3>
      <ul>
        <li><span class="checkbox"></span> <strong>Excellent Progress</strong> - Significant improvement in most areas</li>
        <li><span class="checkbox"></span> <strong>Good Progress</strong> - Clear improvement in several areas</li>
        <li><span class="checkbox"></span> <strong>Some Progress</strong> - Small improvements noted</li>
        <li><span class="checkbox"></span> <strong>Limited Progress</strong> - Minimal change observed</li>
        <li><span class="checkbox"></span> <strong>No Progress</strong> - No significant change</li>
      </ul>
      
      <h3>Key Successes</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h3>Ongoing Concerns</h3>
      <div class="form-field" style="width: 100%; min-height: 15mm; border: 1px solid #ccc; padding: 2mm;"></div>
      
      <h2>Next Steps</h2>
      
      <h3>Recommended Actions</h3>
      <ol>
        <li><span class="form-field" style="min-width: 120mm;"></span></li>
        <li><span class="form-field" style="min-width: 120mm;"></span></li>
        <li><span class="form-field" style="min-width: 120mm;"></span></li>
      </ol>
      
      <h3>Review Schedule</h3>
      <p><strong>Next Review Date:</strong> <span class="form-field date-field"></span></p>
      <p><strong>Review Frequency:</strong> 
        <span class="checkbox"></span> Weekly &nbsp;&nbsp;
        <span class="checkbox"></span> Fortnightly &nbsp;&nbsp;
        <span class="checkbox"></span> Monthly &nbsp;&nbsp;
        <span class="checkbox"></span> Other: <span class="form-field" style="min-width: 30mm;"></span>
      </p>
      
      <div class="warning-box" style="margin-top: 10mm;">
        <p><strong>Remember:</strong> Behaviour change takes time and consistency. Celebrate small wins and maintain positive relationships with students and families throughout the process.</p>
      </div>
    `
  }
]

async function generatePDFs() {
  console.log('🎨 Starting PDF generation with Playwright...')
  
  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }
  
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  for (const template of templates) {
    console.log(`📄 Generating ${template.filename}...`)
    
    try {
      const html = createPDFHTML(template)
      await page.setContent(html, { waitUntil: 'networkidle' })
      
      const pdfPath = path.join(OUTPUT_DIR, template.filename)
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>', // Header is handled in CSS
        footerTemplate: '<div></div>', // Footer is handled in CSS  
        margin: {
          top: '20mm',
          right: '20mm', 
          bottom: '20mm',
          left: '20mm'
        }
      })
      
      console.log(`✅ Generated ${template.filename}`)
    } catch (error) {
      console.error(`❌ Failed to generate ${template.filename}:`, error)
      process.exit(1)
    }
  }
  
  await browser.close()
  
  console.log(`\n🎉 Successfully generated ${templates.length} PDF resources!`)
  console.log('\n📊 Generated Files:')
  templates.forEach(t => {
    console.log(`  - ${t.filename} (${t.title})`)
  })
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 PDF generation interrupted')
  process.exit(1)
})

// Run the generation
generatePDFs().catch((error) => {
  console.error('💥 PDF generation failed:', error)
  process.exit(1)
})