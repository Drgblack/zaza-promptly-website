export type Persona = {
  slug: 'teacher' | 'head-of-year' | 'slt' | 'senco' | 'tutor' | 'admin'
  name: string
  tagline: string
  pains: string[]       // 3 bullets
  outcomes: string[]    // 3 bullets
  features: { title: string; body: string }[] // 3 items
  demoPreset?: { subject?: string; level?: string; tone?: string; length?: string }
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  testimonial?: { quote: string; author: string; role?: string }
  statBand?: { label: string; value: string }[]
  faq?: { q: string; a: string }[] // 3-5
  color: string
  icon: string // SVG path data
}

export const PERSONAS: Persona[] = [
  {
    slug: 'teacher',
    name: 'Classroom Teacher',
    tagline: 'AI-powered comments that save hours while maintaining your personal touch',
    pains: [
      'Spending 3+ hours every week writing individual student comments',
      'Struggling to find fresh, meaningful ways to express similar feedback',
      'Balancing detailed feedback with heavy workload and time constraints'
    ],
    outcomes: [
      'Generate personalized comments in seconds, not hours',
      'Maintain consistent, high-quality feedback across all students',
      'Focus your energy on teaching while AI handles the writing'
    ],
    features: [
      {
        title: 'Subject-Specific Templates',
        body: 'Pre-built templates for Mathematics, English, Science, History, and more. Each tailored to subject-specific assessment criteria and learning objectives.'
      },
      {
        title: 'Progress-Focused Comments',
        body: 'Generate comments that highlight student growth, identify next steps, and provide constructive feedback that motivates continued learning.'
      },
      {
        title: 'Behavior & Achievement Recognition',
        body: 'Thoughtful comments for celebrating successes, addressing concerns, and encouraging positive classroom behavior with personalized touches.'
      }
    ],
    demoPreset: {
      subject: 'Mathematics',
      level: 'Year 7',
      tone: 'Encouraging',
      length: 'Detailed'
    },
    primaryCTA: { label: 'Start Free Trial', href: '/pricing' },
    secondaryCTA: { label: 'Try Snippet Tool', href: '/#snippet' },
    testimonial: {
      quote: 'Promptly has transformed my feedback process. What used to take me 4 hours now takes 30 minutes, and the quality is consistently high.',
      author: 'Sarah Mitchell',
      role: 'Year 6 Teacher, Birmingham'
    },
    statBand: [
      { label: 'Time Saved', value: '85%' },
      { label: 'Teachers Using', value: '12,000+' },
      { label: 'Comments Generated', value: '500K+' }
    ],
    faq: [
      {
        q: 'Will parents notice the comments are AI-generated?',
        a: 'No. Our AI creates personalized, contextual comments that reflect your teaching style and include specific student details you provide.'
      },
      {
        q: 'Can I customize comments for different subjects?',
        a: 'Absolutely. We offer subject-specific templates for all major curriculum areas, with terminology and focus areas tailored to each subject.'
      },
      {
        q: 'How do I ensure comments remain personal and meaningful?',
        a: 'You provide the key details about each student, and our AI weaves these into professionally crafted comments that maintain your personal touch.'
      },
      {
        q: 'What if I need to modify a generated comment?',
        a: 'Every comment can be easily edited before use. Many teachers use our suggestions as a starting point and add their own finishing touches.'
      }
    ],
    color: 'blue',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    slug: 'head-of-year',
    name: 'Head of Year',
    tagline: 'Pastoral care and behavioral comments that support whole-child development',
    pains: [
      'Managing complex behavioral interventions across 200+ students',
      'Ensuring consistent messaging between pastoral and academic feedback',
      'Time pressure when writing detailed reports for parents and staff'
    ],
    outcomes: [
      'Create comprehensive pastoral comments efficiently',
      'Maintain consistent approach to behavioral support across year group',
      'Focus on strategic leadership while AI handles routine documentation'
    ],
    features: [
      {
        title: 'Pastoral Care Focus',
        body: 'Specialized templates for wellbeing check-ins, behavioral interventions, and personal development tracking with sensitivity and professional tone.'
      },
      {
        title: 'Behavioral Intervention Plans',
        body: 'Generate structured comments for behavior reports, intervention strategies, and progress monitoring with clear next steps for all stakeholders.'
      },
      {
        title: 'Parent Communication',
        body: 'Professional, empathetic comments for difficult conversations, celebrating improvements, and building positive home-school partnerships.'
      }
    ],
    demoPreset: {
      subject: 'Pastoral Care',
      level: 'Year 9',
      tone: 'Professional',
      length: 'Comprehensive'
    },
    primaryCTA: { label: 'Start Free Trial', href: '/pricing' },
    secondaryCTA: { label: 'View Free Resources', href: '/free-resources' },
    testimonial: {
      quote: 'The pastoral care templates are invaluable. I can now provide detailed, professional feedback for all my students without the usual time pressure.',
      author: 'James Thompson',
      role: 'Head of Year 10, Manchester'
    },
    statBand: [
      { label: 'Behavioral Reports', value: '15K+' },
      { label: 'Year Groups Supported', value: '400+' },
      { label: 'Intervention Success', value: '92%' }
    ],
    faq: [
      {
        q: 'How does Promptly handle sensitive behavioral issues?',
        a: 'Our pastoral templates are designed with professional sensitivity, using appropriate language for challenging situations while maintaining a supportive tone.'
      },
      {
        q: 'Can I track behavioral interventions over time?',
        a: 'Yes, you can generate progressive comments that reference previous interventions and show development patterns across reporting periods.'
      },
      {
        q: 'Are the comments suitable for serious disciplinary matters?',
        a: 'Our templates cover the full spectrum from positive recognition to serious concerns, always maintaining professional standards and constructive language.'
      }
    ],
    color: 'purple',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    slug: 'slt',
    name: 'Senior Leadership',
    tagline: 'Strategic oversight comments that align with school vision and standards',
    pains: [
      'Ensuring consistent quality and messaging across all staff feedback',
      'Time constraints when reviewing and contributing to school reports',
      'Balancing strategic priorities with detailed student feedback requirements'
    ],
    outcomes: [
      'Generate strategic, whole-school perspective comments efficiently',
      'Ensure alignment between individual feedback and school priorities',
      'Focus on leadership responsibilities while maintaining quality oversight'
    ],
    features: [
      {
        title: 'Strategic Overview Comments',
        body: 'Generate comments that align individual student progress with school-wide objectives, policies, and strategic priorities for comprehensive reporting.'
      },
      {
        title: 'Quality Assurance Templates',
        body: 'Standardized comment structures that ensure consistency across departments while maintaining high professional standards and school voice.'
      },
      {
        title: 'Stakeholder Communication',
        body: 'Professional templates for communicating with governors, parents, and external agencies with appropriate tone and institutional perspective.'
      }
    ],
    demoPreset: {
      subject: 'School Leadership',
      level: 'Whole School',
      tone: 'Strategic',
      length: 'Executive Summary'
    },
    primaryCTA: { label: 'Start Free Trial', href: '/pricing' },
    secondaryCTA: { label: 'Learn More', href: '/learning-centre' },
    testimonial: {
      quote: 'Promptly helps maintain our school standards across all communications. The strategic templates ensure consistency while saving significant time.',
      author: 'Dr. Rachel Green',
      role: 'Deputy Head, London Academy'
    },
    statBand: [
      { label: 'Schools Using', value: '200+' },
      { label: 'Leadership Reports', value: '50K+' },
      { label: 'Quality Rating', value: '98%' }
    ],
    faq: [
      {
        q: 'How do templates align with our school values?',
        a: 'Our strategic templates are flexible and can be customized to reflect your school\'s specific values, policies, and communication style.'
      },
      {
        q: 'Can we ensure consistency across all staff feedback?',
        a: 'Yes, the leadership templates provide a framework that maintains your school\'s voice while allowing for individual teacher personalization.'
      },
      {
        q: 'Are comments suitable for external stakeholders?',
        a: 'Absolutely. Our professional templates are designed for all audiences including governors, Ofsted, parents, and external partners.'
      }
    ],
    color: 'green',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    slug: 'senco',
    name: 'SENCO',
    tagline: 'Specialized comments for students with additional learning needs and SEND support',
    pains: [
      'Creating detailed, sensitive comments for diverse SEND requirements',
      'Ensuring compliance with EHCP and IEP documentation standards',
      'Balancing individual needs assessment with efficient report writing'
    ],
    outcomes: [
      'Generate SEND-focused comments that celebrate progress and potential',
      'Maintain compliance with statutory requirements and best practices',
      'Support individual student needs with professional, empathetic feedback'
    ],
    features: [
      {
        title: 'SEND-Focused Templates',
        body: 'Specialized comment structures for autism, ADHD, dyslexia, and other needs, using strength-based language that celebrates progress and potential.'
      },
      {
        title: 'Individual Needs Assessment',
        body: 'Generate comments that reflect personal learning goals, accommodations made, and progress toward EHCP outcomes with professional sensitivity.'
      },
      {
        title: 'Support Strategy Documentation',
        body: 'Create clear, actionable comments about interventions, accommodations, and next steps that support multi-agency working and family understanding.'
      }
    ],
    demoPreset: {
      subject: 'SEND Support',
      level: 'Individual Needs',
      tone: 'Supportive',
      length: 'Detailed'
    },
    primaryCTA: { label: 'Start Free Trial', href: '/pricing' },
    secondaryCTA: { label: 'Free SEND Resources', href: '/free-resources' },
    testimonial: {
      quote: 'The SEND templates are incredibly thoughtful and professional. They help me communicate each child\'s unique journey with the respect they deserve.',
      author: 'Maria Santos',
      role: 'SENCO, Leeds Primary'
    },
    statBand: [
      { label: 'SEND Students Supported', value: '8,000+' },
      { label: 'EHCP Comments', value: '25K+' },
      { label: 'Family Satisfaction', value: '96%' }
    ],
    faq: [
      {
        q: 'Are the templates appropriate for all SEND needs?',
        a: 'Yes, we offer specialized templates for autism, ADHD, dyslexia, physical disabilities, and other needs, all using positive, strength-based language.'
      },
      {
        q: 'Do comments comply with EHCP requirements?',
        a: 'Our templates are designed to support statutory requirements, focusing on outcomes, progress evidence, and next steps in professional language.'
      },
      {
        q: 'How do you ensure sensitive, respectful language?',
        a: 'All SEND templates use person-first language, celebrate achievements, and focus on potential rather than deficits, following best practice guidelines.'
      },
      {
        q: 'Can parents easily understand the generated comments?',
        a: 'Yes, our templates balance professional accuracy with family-friendly language, helping parents understand their child\'s progress and support needs.'
      }
    ],
    color: 'orange',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    slug: 'tutor',
    name: 'Form Tutor',
    tagline: 'Personal development and pastoral comments that nurture the whole student',
    pains: [
      'Finding time for meaningful personal development feedback for 30+ tutees',
      'Balancing academic oversight with pastoral care responsibilities',
      'Creating engaging comments that motivate and guide personal growth'
    ],
    outcomes: [
      'Generate personal development comments that inspire and guide',
      'Maintain strong tutor-student relationships through thoughtful feedback',
      'Support whole-child development with efficient, meaningful comments'
    ],
    features: [
      {
        title: 'Personal Development Focus',
        body: 'Templates designed for character development, resilience building, and personal growth with age-appropriate language and motivational tone.'
      },
      {
        title: 'Wellbeing & Mental Health',
        body: 'Sensitive comments for supporting student wellbeing, recognizing challenges, and celebrating personal achievements beyond academic performance.'
      },
      {
        title: 'Goal Setting & Life Skills',
        body: 'Comments that encourage self-reflection, goal setting, and development of crucial life skills like organization, communication, and leadership.'
      }
    ],
    demoPreset: {
      subject: 'Personal Development',
      level: 'Year 8',
      tone: 'Encouraging',
      length: 'Personal'
    },
    primaryCTA: { label: 'Start Free Trial', href: '/pricing' },
    secondaryCTA: { label: 'Explore Tools', href: '/#snippet' },
    testimonial: {
      quote: 'Promptly helps me give each tutee the personal attention they deserve. The personal development templates are particularly inspiring.',
      author: 'David Kumar',
      role: 'Form Tutor, Coventry Academy'
    },
    statBand: [
      { label: 'Tutees Supported', value: '18K+' },
      { label: 'Wellbeing Comments', value: '95K+' },
      { label: 'Student Engagement', value: '91%' }
    ],
    faq: [
      {
        q: 'How do tutor comments differ from subject teacher feedback?',
        a: 'Tutor comments focus on personal development, wellbeing, and whole-child progress rather than specific academic achievement in individual subjects.'
      },
      {
        q: 'Can I track personal development over time?',
        a: 'Yes, our templates help create progressive narratives about character development, resilience, and personal growth across school years.'
      },
      {
        q: 'Are comments age-appropriate for different year groups?',
        a: 'Absolutely. Our templates adjust language, expectations, and developmental focus based on the student\'s age and maturity level.'
      }
    ],
    color: 'red',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    slug: 'admin',
    name: 'School Admin',
    tagline: 'Administrative and operational comments that keep schools running smoothly',
    pains: [
      'Managing high volumes of administrative communications and reports',
      'Ensuring consistent, professional tone across all school correspondence',
      'Balancing detailed record-keeping with efficient workflow management'
    ],
    outcomes: [
      'Streamline administrative communications with professional templates',
      'Maintain consistent school voice across all operational communications',
      'Focus on strategic administration while AI handles routine correspondence'
    ],
    features: [
      {
        title: 'Administrative Templates',
        body: 'Professional templates for attendance reports, incident documentation, and operational communications that maintain school standards and compliance.'
      },
      {
        title: 'Communication Tools',
        body: 'Standardized formats for parent communications, staff notices, and external correspondence that ensure consistency and professionalism.'
      },
      {
        title: 'Data Management Support',
        body: 'Generate clear, accurate comments for data reports, compliance documentation, and operational overviews that support school management.'
      }
    ],
    demoPreset: {
      subject: 'Administrative',
      level: 'School Operations',
      tone: 'Professional',
      length: 'Concise'
    },
    primaryCTA: { label: 'Start Free Trial', href: '/pricing' },
    secondaryCTA: { label: 'Contact Us', href: '/contact' },
    testimonial: {
      quote: 'Promptly has revolutionized our administrative processes. Professional, consistent communications that save hours of drafting time.',
      author: 'Linda Foster',
      role: 'Office Manager, Bristol School'
    },
    statBand: [
      { label: 'Admin Tasks Streamlined', value: '75%' },
      { label: 'Communications Sent', value: '200K+' },
      { label: 'Efficiency Gain', value: '60%' }
    ],
    faq: [
      {
        q: 'Can templates maintain our school\'s communication style?',
        a: 'Yes, administrative templates are highly customizable to reflect your school\'s specific tone, policies, and communication preferences.'
      },
      {
        q: 'Are the templates suitable for external communications?',
        a: 'Absolutely. All templates maintain professional standards appropriate for parents, local authorities, Ofsted, and other external partners.'
      },
      {
        q: 'How do you ensure compliance with data protection?',
        a: 'Our templates include appropriate privacy considerations and can be customized to meet your school\'s specific GDPR and data protection requirements.'
      }
    ],
    color: 'indigo',
    icon: 'M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2m-2 0v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 0V9a2 2 0 012-2h2M9 5V3a2 2 0 012-2h2a2 2 0 012 2v2M9 5h4'
  }
]

export const getPersona = (slug: Persona['slug']) => PERSONAS.find(p => p.slug === slug)!