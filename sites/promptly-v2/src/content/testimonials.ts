export interface Testimonial {
  id: string
  name: string
  role: string
  location: string
  quote: string
  context: string
  timeframe: string
  impact: string
  avatar: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah-uk-primary',
    name: 'Sarah Thompson',
    role: 'Year 3 Teacher',
    location: 'Manchester, UK',
    quote: "Draft has been a game-changer for my parent communications. What used to take me 2 hours every Sunday evening now takes 30 minutes.",
    context: 'Uses Draft for termly reports and weekly parent updates',
    timeframe: '6 months using Draft',
    impact: 'Saves 6+ hours per week on communication tasks',
    avatar: '/images/testimonials/sarah-thompson.svg'
  },
  {
    id: 'michael-us-secondary',
    name: 'Michael Rodriguez',
    role: 'High School English Teacher',
    location: 'Austin, Texas',
    quote: "As someone who teaches 150+ students, Draft helps me write personalized feedback that actually sounds like me. My students and parents notice the difference.",
    context: 'Teaching 5 classes of 30+ students, uses Draft for progress reports and parent conferences',
    timeframe: '8 months using Draft',
    impact: 'Maintains personal voice while scaling feedback to 150+ students',
    avatar: '/images/testimonials/michael-rodriguez.svg'
  },
  {
    id: 'emma-uk-senco',
    name: 'Emma Clarke',
    role: 'SENCO & Year 6 Teacher',
    location: 'Birmingham, UK',
    quote: "Draft understands the nuanced language needed for SEND reports. It helps me communicate sensitively with families while meeting statutory requirements.",
    context: 'Coordinates support for 45+ students with additional needs, writes complex EHCP reports',
    timeframe: '4 months using Draft',
    impact: 'Reduces SEND report writing time by 60% while improving clarity',
    avatar: '/images/testimonials/emma-clarke.svg'
  },
  {
    id: 'david-us-principal',
    name: 'David Chen',
    role: 'Elementary Principal',
    location: 'Portland, Oregon',
    quote: "I recommended Draft to my whole staff after seeing how it helped our new teachers find their professional voice in parent communications.",
    context: 'Leads school of 400+ students, supports 25 teaching staff',
    timeframe: '1 year using Draft',
    impact: 'Improved school-wide communication consistency and new teacher confidence',
    avatar: '/images/testimonials/david-chen.svg'
  }
]

// Testimonial categories for different use cases
export const TESTIMONIAL_CATEGORIES = {
  'time-saving': ['sarah-uk-primary', 'michael-us-secondary'],
  'professional-voice': ['michael-us-secondary', 'david-us-principal'],
  'specialized-needs': ['emma-uk-senco'],
  'leadership': ['david-us-principal']
} as const

// Quick testimonial snippets for different sections
export const QUICK_TESTIMONIALS = [
  {
    quote: "Saves me 6+ hours every week",
    author: "Sarah T., Manchester"
  },
  {
    quote: "Sounds exactly like my voice",
    author: "Michael R., Texas"
  },
  {
    quote: "Perfect for sensitive SEND communications",
    author: "Emma C., Birmingham"
  },
  {
    quote: "Recommended to my entire staff",
    author: "David C., Principal"
  }
] as const
