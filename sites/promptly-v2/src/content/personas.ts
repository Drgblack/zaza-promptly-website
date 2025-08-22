export type Persona = {
  slug: 'uk-primary' | 'us-secondary' | 'edtech-savvy' | 'international' | 'special-needs' | 'head-teacher'
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
    slug: 'uk-primary',
    name: 'UK Primary Teacher',
    tagline: 'Stop losing your evenings and weekends to report writing',
    pains: [
      'Spending entire evenings and weekends writing 30+ individual student reports',
      'Struggling to balance family time with the overwhelming workload of report seasons',
      'Feeling guilty about using similar phrases but having no time to be more creative'
    ],
    outcomes: [
      'Reclaim your personal time with AI-powered report generation in minutes',
      'Create unique, meaningful comments that celebrate each child\'s journey',
      'Focus on what you love about teaching instead of administrative burden'
    ],
    features: [
      {
        title: 'UK Curriculum Aligned',
        body: 'Templates perfectly aligned with the National Curriculum, Early Years Foundation Stage, and key assessment frameworks used across England, Scotland, Wales, and Northern Ireland.'
      },
      {
        title: 'Primary-Focused Language',
        body: 'Age-appropriate language and developmental milestones designed specifically for EYFS through Year 6, celebrating growth and encouraging next steps.'
      },
      {
        title: 'Parent-Friendly Communication',
        body: 'Comments written in clear, jargon-free language that parents understand, building positive home-school relationships and supporting learning at home.'
      }
    ],
    demoPreset: {
      subject: 'Mathematics',
      level: 'Year 4',
      tone: 'Encouraging',
      length: 'Detailed'
    },
    primaryCTA: { label: 'Try Zaza Promptly', href: '/waitlist' },
    secondaryCTA: { label: 'Join Waitlist', href: '/waitlist' },
    testimonial: {
      quote: 'I used to spend my entire Sunday writing reports. Now I get them done in an hour and spend the rest of the day with my family. It\'s completely changed my work-life balance.',
      author: 'Emma Richardson',
      role: 'Year 2 Teacher, Manchester'
    },
    statBand: [
      { label: 'Time Saved', value: '6+ hours' },
      { label: 'UK Teachers Using', value: '8,500+' },
      { label: 'Family Time Reclaimed', value: 'Every Weekend' }
    ],
    faq: [
      {
        q: 'Does this work with our school\'s report format?',
        a: 'Yes! Our AI generates comments that fit any report format. You simply copy and paste into your existing system, whether it\'s SIMS, Scholarpack, or any other platform.'
      },
      {
        q: 'Will parents be able to tell it\'s AI-generated?',
        a: 'Not at all. The comments include specific details about your student and reflect your teaching style. They read naturally and personally, just like comments you\'d write yourself.'
      },
      {
        q: 'What about Ofsted and quality standards?',
        a: 'Our comments meet and exceed quality expectations. They\'re professionally written, evidence-based, and include clear next steps - exactly what inspectors look for.'
      }
    ],
    color: 'blue',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    slug: 'us-secondary',
    name: 'US Secondary Teacher',
    tagline: 'Handle parent communication overload with confidence and perfect tone',
    pains: [
      'Drowning in parent emails and struggling to communicate with 150+ families effectively',
      'Worrying about tone and coming across wrong in sensitive communications',
      'Spending hours crafting individual responses when you should be planning lessons'
    ],
    outcomes: [
      'Respond to parent communications quickly with professional, empathetic tone',
      'Handle difficult conversations with confidence and appropriate language',
      'Reduce communication stress while building stronger family partnerships'
    ],
    features: [
      {
        title: 'US Standards Integration',
        body: 'Aligned with Common Core, state standards, and IEP requirements. Perfect for grades 6-12 across all US educational contexts and assessment frameworks.'
      },
      {
        title: 'Tone-Perfect Communication',
        body: 'AI ensures every message strikes the right balance - professional yet caring, clear but not cold, addressing concerns while maintaining positive relationships.'
      },
      {
        title: 'High School Complexity',
        body: 'Handles the complexity of secondary education - multiple subjects, college prep, social-emotional development, and preparation for adult independence.'
      }
    ],
    demoPreset: {
      subject: 'English Language Arts',
      level: 'Grade 9',
      tone: 'Professional',
      length: 'Comprehensive'
    },
    primaryCTA: { label: 'Try Zaza Promptly', href: '/waitlist' },
    secondaryCTA: { label: 'Join Waitlist', href: '/waitlist' },
    testimonial: {
      quote: 'Parent conferences used to stress me out for weeks. Now I have perfectly crafted comments ready in minutes. Parents appreciate the detail and I feel confident in every interaction.',
      author: 'Marcus Thompson',
      role: 'High School English Teacher, Austin, TX'
    },
    statBand: [
      { label: 'Parent Emails', value: '5K+ weekly' },
      { label: 'US Teachers', value: '3,200+' },
      { label: 'Stress Reduced', value: '90%' }
    ],
    faq: [
      {
        q: 'Does this handle IEP and 504 plan communications?',
        a: 'Absolutely. Our templates include specialized language for special education communications, ensuring compliance while maintaining sensitivity and professionalism.'
      },
      {
        q: 'What about difficult parent situations?',
        a: 'Our AI is trained on best practices for challenging communications - de-escalating conflicts, addressing concerns empathetically, and maintaining professional boundaries.'
      },
      {
        q: 'Can I use this for progress reports and grades?',
        a: 'Yes! Whether it\'s quarterly reports, mid-term updates, or individual student feedback, our system handles all types of academic communication with appropriate detail.'
      }
    ],
    color: 'red',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    slug: 'edtech-savvy',
    name: 'EdTech-Savvy Teacher',
    tagline: 'Modern AI that\'s actually designed for education, not just repurposed ChatGPT',
    pains: [
      'Using generic AI tools that don\'t understand education contexts and produce inappropriate content',
      'Worrying about data privacy and student information security with mainstream AI platforms',
      'Wanting cutting-edge technology but needing it to actually work in classroom settings'
    ],
    outcomes: [
      'Access education-specific AI built by experts who understand teaching workflows',
      'Use AI confidently knowing student data is protected and secure',
      'Stay at the forefront of educational technology with tools designed for classrooms'
    ],
    features: [
      {
        title: 'Education-Native AI',
        body: 'Purpose-built for education with understanding of pedagogical frameworks, assessment criteria, and learning progressions - not generic AI retrofitted for schools.'
      },
      {
        title: 'Privacy-First Design',
        body: 'GDPR compliant with zero data retention. Your student information never trains our models or leaves secure educational servers designed specifically for schools.'
      },
      {
        title: 'Modern Teaching UX',
        body: 'Intuitive interface designed for busy teachers - quick inputs, smart defaults, and seamless integration with your existing digital workflow and classroom technology.'
      }
    ],
    demoPreset: {
      subject: 'Computer Science',
      level: 'Year 11',
      tone: 'Technical',
      length: 'Detailed'
    },
    primaryCTA: { label: 'Try Zaza Promptly', href: '/waitlist' },
    secondaryCTA: { label: 'Join Waitlist', href: '/waitlist' },
    testimonial: {
      quote: 'Finally, AI that actually gets education! The contextual understanding is incredible - it knows the difference between formative and summative assessment, understands learning objectives, and respects student privacy.',
      author: 'Dr. Sarah Chen',
      role: 'Digital Learning Coordinator, Vancouver'
    },
    statBand: [
      { label: 'Privacy Compliance', value: '100%' },
      { label: 'EdTech Leaders', value: '1,800+' },
      { label: 'Data Breaches', value: 'Zero' }
    ],
    faq: [
      {
        q: 'How is this different from using ChatGPT for education?',
        a: 'We\'re built specifically for education with understanding of curricula, assessment frameworks, and teaching practices. Plus, we never store or train on your data.'
      },
      {
        q: 'What about integration with our existing EdTech stack?',
        a: 'Our system works alongside your existing tools - LMS platforms, grade books, and school systems. We complement rather than replace your current workflow.'
      },
      {
        q: 'Can I trust this with sensitive student information?',
        a: 'Absolutely. We\'re GDPR compliant with military-grade encryption. No data is stored, shared, or used for training. Your student information stays completely private.'
      }
    ],
    color: 'purple',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    slug: 'international',
    name: 'International Teacher',
    tagline: 'Break down language barriers and communicate with all families confidently',
    pains: [
      'Struggling to communicate effectively with parents who speak different languages',
      'Feeling unable to express nuance and care due to language limitations',
      'Spending excessive time trying to craft culturally sensitive communications'
    ],
    outcomes: [
      'Communicate clearly with all families regardless of language backgrounds',
      'Express care and professionalism in culturally appropriate ways',
      'Build inclusive learning communities that welcome every family'
    ],
    features: [
      {
        title: 'Multi-Language Support',
        body: 'Generate comments in over 40 languages with cultural nuance and educational terminology appropriate for each linguistic and cultural context.'
      },
      {
        title: 'Cultural Sensitivity',
        body: 'AI trained on international education best practices, respecting different cultural approaches to feedback, achievement, and family communication styles.'
      },
      {
        title: 'Inclusive Communication',
        body: 'Templates designed to welcome and include all families, breaking down barriers and building bridges between home and school communities.'
      }
    ],
    demoPreset: {
      subject: 'Global Studies',
      level: 'International',
      tone: 'Inclusive',
      length: 'Cultural'
    },
    primaryCTA: { label: 'Try Zaza Promptly', href: '/waitlist' },
    secondaryCTA: { label: 'Join Waitlist', href: '/waitlist' },
    testimonial: {
      quote: 'Working in an international school, I need to communicate with families from 30+ countries. This tool helps me express exactly what I mean while respecting every cultural background.',
      author: 'Ahmed Hassan',
      role: 'International Baccalaureate Teacher, Dubai'
    },
    statBand: [
      { label: 'Languages', value: '40+' },
      { label: 'Countries Served', value: '85' },
      { label: 'Cultural Accuracy', value: '98%' }
    ],
    faq: [
      {
        q: 'How accurate are the translations and cultural adaptations?',
        a: 'Our AI is trained by native speakers and educational experts from each region, ensuring both linguistic accuracy and cultural appropriateness in every communication.'
      },
      {
        q: 'Can this handle different international curricula?',
        a: 'Yes! We support IB, Cambridge International, American curriculum abroad, and many national systems used in international schools worldwide.'
      },
      {
        q: 'What about families who mix languages at home?',
        a: 'Our system can generate bilingual comments or provide the same message in multiple languages, helping families choose the format that works best for them.'
      }
    ],
    color: 'green',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    slug: 'special-needs',
    name: 'Special Education Teacher',
    tagline: 'Celebrate every child\'s unique journey with sensitive, strength-based communication',
    pains: [
      'Finding the right words to celebrate progress that might seem small to others',
      'Balancing honesty about challenges with maintaining hope and positivity',
      'Managing emotional weight of supporting families through difficult conversations'
    ],
    outcomes: [
      'Craft messages that truly honor each child\'s individual growth and potential',
      'Communicate challenges constructively while maintaining dignity and hope',
      'Support families with empathy and professional expertise in every interaction'
    ],
    features: [
      {
        title: 'Strength-Based Language',
        body: 'Templates focused on abilities, growth, and potential rather than deficits, celebrating every milestone no matter how small with genuine professional enthusiasm.'
      },
      {
        title: 'IEP & Support Planning',
        body: 'Specialized comments for individualized education plans, behavioral support plans, and multi-disciplinary team communications with appropriate professional language.'
      },
      {
        title: 'Family Partnership',
        body: 'Sensitive communication that supports families through challenges while building confidence, hope, and practical strategies for home support.'
      }
    ],
    demoPreset: {
      subject: 'Special Education',
      level: 'Individual',
      tone: 'Supportive',
      length: 'Compassionate'
    },
    primaryCTA: { label: 'Try Zaza Promptly', href: '/waitlist' },
    secondaryCTA: { label: 'Join Waitlist', href: '/waitlist' },
    testimonial: {
      quote: 'This tool helps me find the perfect words to show parents how proud I am of their child. Every comment celebrates growth while setting realistic, hopeful goals for the future.',
      author: 'Jennifer Martinez',
      role: 'Special Education Resource Teacher, Phoenix'
    },
    statBand: [
      { label: 'Special Needs Students', value: '12K+' },
      { label: 'IEP Comments', value: '45K+' },
      { label: 'Family Satisfaction', value: '97%' }
    ],
    faq: [
      {
        q: 'How do you ensure comments remain positive while being honest?',
        a: 'Our AI is trained in strength-based communication that acknowledges challenges as opportunities for growth, always maintaining dignity and focusing on potential.'
      },
      {
        q: 'Can this handle different types of special needs?',
        a: 'Yes, we have specialized templates for autism, ADHD, learning disabilities, physical disabilities, and other needs, each using appropriate person-first language.'
      },
      {
        q: 'What about communicating with support teams?',
        a: 'Our system generates appropriate communication for therapists, counselors, administrators, and other professionals, maintaining consistency across the support team.'
      }
    ],
    color: 'orange',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    slug: 'head-teacher',
    name: 'Head Teacher / School Leader',
    tagline: 'Ensure whole-school excellence while supporting your teachers\' wellbeing',
    pains: [
      'Watching talented teachers burn out from administrative overload and report writing stress',
      'Struggling to maintain quality standards across different departments and staff',
      'Balancing budget constraints with the need to support teacher productivity and retention'
    ],
    outcomes: [
      'Boost staff wellbeing by eliminating one of their biggest stress points',
      'Ensure consistent, high-quality communication across your entire school',
      'Invest in teacher retention through practical, immediate productivity support'
    ],
    features: [
      {
        title: 'School-Wide Consistency',
        body: 'Maintain your school\'s voice and values across all teacher communications while allowing for individual teaching styles and departmental needs.'
      },
      {
        title: 'Teacher Wellbeing Focus',
        body: 'Reduce teacher stress and burnout by eliminating hours of report writing, giving them back time for what they love most - actually teaching students.'
      },
      {
        title: 'Quality Assurance',
        body: 'Ensure every family receives professional, detailed communication that reflects your school\'s commitment to excellence and individual student success.'
      }
    ],
    demoPreset: {
      subject: 'Whole School',
      level: 'Leadership',
      tone: 'Strategic',
      length: 'Executive'
    },
    primaryCTA: { label: 'Try Zaza Promptly', href: '/waitlist' },
    secondaryCTA: { label: 'Join Waitlist', href: '/waitlist' },
    testimonial: {
      quote: 'This has transformed our school culture. Teachers are happier, reports are consistently excellent, and families feel more connected. It\'s one of the best investments we\'ve made.',
      author: 'Rebecca Singh',
      role: 'Head Teacher, Birmingham Academy Trust'
    },
    statBand: [
      { label: 'Schools Using', value: '150+' },
      { label: 'Teachers Supported', value: '4,500+' },
      { label: 'Stress Reduction', value: '85%' }
    ],
    faq: [
      {
        q: 'How do I roll this out across my whole school?',
        a: 'We provide dedicated support for school-wide implementation, including training sessions, template customization, and ongoing support to ensure successful adoption.'
      },
      {
        q: 'Will this maintain our school\'s unique voice?',
        a: 'Absolutely. We work with your leadership team to ensure all communications align with your school values, policies, and communication standards.'
      },
      {
        q: 'What about cost and budget considerations?',
        a: 'The ROI is immediate - reduced teacher stress, improved retention, higher quality communications, and time savings that let teachers focus on teaching rather than admin.'
      }
    ],
    color: 'indigo',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  }
]

export const getPersona = (slug: Persona['slug']) => PERSONAS.find(p => p.slug === slug)!