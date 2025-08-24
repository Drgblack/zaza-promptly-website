export interface Testimonial {
  id: string
  name: string
  role: string
  location: string
  quote: string
  context: string
  timeframe: string
  impact: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah-uk-primary',
    name: 'Sarah Thompson',
    role: 'Year 3 Teacher',
    location: 'Manchester, UK',
    quote: "Promptly has been a game-changer for my parent communications. What used to take me 2 hours every Sunday evening now takes 30 minutes.",
    context: 'Uses Promptly for termly reports and weekly parent updates',
    timeframe: '6 months using Promptly',
    impact: 'Saves 6+ hours per week on communication tasks'
  },
  {
    id: 'michael-us-secondary',
    name: 'Michael Rodriguez',
    role: 'High School English Teacher',
    location: 'Austin, Texas',
    quote: "As someone who teaches 150+ students, Promptly helps me write personalized feedback that actually sounds like me. My students and parents notice the difference.",
    context: 'Teaching 5 classes of 30+ students, uses Promptly for progress reports and parent conferences',
    timeframe: '8 months using Promptly',
    impact: 'Maintains personal voice while scaling feedback to 150+ students'
  },
  {
    id: 'emma-uk-senco',
    name: 'Emma Clarke',
    role: 'SENCO & Year 6 Teacher',
    location: 'Birmingham, UK',
    quote: "Promptly understands the nuanced language needed for SEND reports. It helps me communicate sensitively with families while meeting statutory requirements.",
    context: 'Coordinates support for 45+ students with additional needs, writes complex EHCP reports',
    timeframe: '4 months using Promptly',
    impact: 'Reduces SEND report writing time by 60% while improving clarity'
  },
  {
    id: 'david-us-principal',
    name: 'David Chen',
    role: 'Elementary Principal',
    location: 'Portland, Oregon',
    quote: "I recommended Promptly to my whole staff after seeing how it helped our new teachers find their professional voice in parent communications.",
    context: 'Leads school of 400+ students, supports 25 teaching staff',
    timeframe: '1 year using Promptly',
    impact: 'Improved school-wide communication consistency and new teacher confidence'
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
