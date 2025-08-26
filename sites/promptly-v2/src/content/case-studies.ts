export type CaseStudy = {
  slug: string;              // e.g. "saving-hours-per-week"
  title: string;
  kicker?: string;           // small eyebrow like "Case Study"
  excerpt: string;
  author: string;            // e.g. "Sarah Johnson"
  role?: string;             // e.g. "Year 3 Teacher"
  org?: string;              // e.g. "Greenfield Academy"
  dateISO: string;           // YYYY-MM-DD
  cover?: string;            // optional path in /public/images/case-studies/...
  heroAlt?: string;
  body: string;              // MDX-ish string (we'll render simply)
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "saving-hours-per-week",
    title: "Saving 4–8 Hours Per Week with AI-Powered Comments",
    kicker: "Case Study",
    excerpt: "How Sarah transformed her feedback process and reclaimed precious time for what matters most—teaching and students.",
    author: "Sarah Johnson",
    role: "Head of Year 7",
    org: "Greenfield Academy",
    dateISO: "2024-12-15",
    cover: "/images/case-studies/saving-hours-per-week.jpg",
    heroAlt: "Teacher preparing report comments efficiently",
    body: `
## Overview
Before Promptly, report comments took hours. With Promptly, Sarah reduced weekly comment writing from ~4 hours to under 60 minutes.

### Results
- ~3–4 hours saved weekly during report cycles  
- Clearer, kinder parent messaging  
- Less Sunday evening stress

### What changed
Promptly provided tone-safe, school-appropriate phrasing, quick edit controls, and reusable snippets.

### Teacher quote
> "I got my Sunday evenings back."

### The Challenge

Every term, I needed to write detailed comments for each of my students across multiple subjects. The process was exhausting:

- **3-4 hours per evening** writing individual comments
- **Repetitive phrasing** that felt impersonal
- **Inconsistent tone** across different subjects
- **Weekend work** just to meet deadlines

I was burning out, and my family time was suffering.

### The Transformation

Within my first week using Promptly:

**Time Savings**
- Comments that took 10-15 minutes now take 2-3 minutes
- **Reduced my evening workload by 75%**
- Freed up 4+ hours weekly for lesson planning and family time

**Quality Improvements**
- More consistent, professional tone across all comments
- Better use of educational terminology
- Parents specifically mentioned the clarity of feedback

**Reduced Stress**
- No more Sunday evening panic sessions
- Confident that every comment meets our school's standards
- Energy restored for actual teaching
    `
  },
  {
    slug: "clearer-kinder-parent-communication",
    title: "Transforming Parent Communication with Clearer, Kinder Feedback",
    kicker: "Case Study",
    excerpt: "How Dr. Priya Patel improved parent satisfaction and student outcomes with consistent, supportive messaging.",
    author: "Dr. Priya Patel",
    role: "Science Teacher & Form Tutor",
    org: "Oaklands Secondary School",
    dateISO: "2024-11-28",
    cover: "/images/case-studies/better-parent-communication.jpg",
    heroAlt: "Teacher sharing feedback with parent",
    body: `
## Overview
Family communications used to be inconsistent. Promptly standardized tone and clarity.

### Results
- Fewer follow-up emails  
- Better home–school collaboration  
- More confident teacher voice

### Why it matters
Parents felt informed and supported; teachers felt safe from "AI saying the wrong thing".

### The Communication Crisis

For years, I struggled with writing reports that truly served families:

**The Problems I Faced**
- **Vague, generic comments** that told parents nothing actionable
- **Overly academic language** that alienated non-English speaking families
- **Negative framing** that discouraged rather than motivated
- **Inconsistent messaging** between written reports and verbal updates

### The Results

**Parent Satisfaction Soared**
- **95% positive feedback** in post-report parent surveys (up from 67%)
- **Increased attendance** at parents' evenings from 40% to 78%
- **More collaborative conversations** during meetings

**Student Engagement Improved**
When parents understand progress clearly, they become better learning partners:
- **23% improvement** in homework completion rates
- **Reduced parent-student conflict** around academic expectations
- **Increased student self-advocacy** in class
    `
  },
  {
    slug: "report-comments-at-scale",
    title: "How Sarah Saved 8 Hours Per Week on Report Comments",
    kicker: "Case Study",
    excerpt: "A Year 3 teacher's journey from weekend grading marathons to family time, powered by Promptly.",
    author: "Zaza Research Team",
    role: "Field Notes",
    org: "St. Mary's Primary School",
    dateISO: "2024-11-20",
    cover: "/images/case-studies/saving-hours-per-week.jpg",
    heroAlt: "Teacher completing reports quickly",
    body: `
## Overview
When report season hit, Sarah needed a safe, repeatable way to produce high-quality comments quickly.

### Results
- 8+ hours saved in peak weeks  
- Measurably improved comment quality  
- Lower stress and better work–life balance

### Takeaway
Promptly enables safe speed without compromising empathy.

### The Challenge: Weekend Grading Marathons

Meet Sarah Thompson, a dedicated Year 3 teacher at St. Mary's Primary School. Like many educators, Sarah found herself drowning in the administrative side of teaching. Every weekend became a marathon of:

- Writing individualized report comments for 28 students
- Crafting personalized parent communication emails
- Creating differentiated feedback for assignments
- Planning next week's lessons while exhausted from grading

### The Results: Numbers That Tell the Story

**Time Savings Breakdown**
- Report Comments (28 students): 8 hours → 2 hours (6 hours saved)
- Parent Emails (weekly): 1.5 hours → 30 minutes (1 hour saved)
- Assignment Feedback: 2 hours → 45 minutes (1.25 hours saved)
- **Total Weekly Savings: 8.25 hours**

**Quality Improvements**
- **100% positive parent feedback** on report clarity and helpfulness
- **Increased consistency** in feedback across all students
- **More personalized content** with AI-suggested observations
- **Reduced errors** from fatigue and rushed writing
    `
  }
];

export const getCaseStudy = (slug: string): CaseStudy | undefined => CASE_STUDIES.find(c => c.slug === slug);

export const getAllCaseStudies = (): CaseStudy[] => {
  return CASE_STUDIES.sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
};

export const getRelatedCaseStudies = (currentSlug: string, limit: number = 2): CaseStudy[] => {
  return CASE_STUDIES
    .filter(caseStudy => caseStudy.slug !== currentSlug)
    .slice(0, limit);
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};