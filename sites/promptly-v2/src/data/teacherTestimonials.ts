// Teacher testimonials with credentials and locations

export interface TeacherTestimonial {
  id: string
  quote: string
  author: string
  role: string
  location: string
  experience: string
  avatar?: string
  keywords: string[]
}

export const teacherTestimonials: TeacherTestimonial[] = [
  {
    id: 'sarah-manchester',
    quote: 'Promptly has given me back my evenings. I used to spend 3-4 hours every Sunday writing reports. Now it takes me 45 minutes and the quality is actually better - more consistent and empathetic.',
    author: 'Sarah Mitchell',
    role: 'Year 3 Teacher',
    location: 'Manchester, UK',
    experience: '8 years teaching',
    keywords: ['teacher report comments helper', 'teacher time saving apps']
  },
  {
    id: 'james-london',
    quote: 'As a head teacher, I was sceptical about AI in schools. But seeing how Promptly helps my teachers write clearer parent communications while maintaining their authentic voice - it\'s transformed our parent engagement.',
    author: 'James Richardson',
    role: 'Head Teacher',
    location: 'London, UK', 
    experience: '15 years in education',
    keywords: ['safe ai for parent communication', 'gdpr compliant ai for schools']
  },
  {
    id: 'maria-berlin',
    quote: 'The GDPR compliance gives me peace of mind. As a teacher in Germany, data protection is crucial. Promptly helps me communicate with international parents professionally while keeping everything secure.',
    author: 'Maria Schmidt',
    role: 'International School Teacher',
    location: 'Berlin, Germany',
    experience: '12 years teaching',
    keywords: ['gdpr compliant ai for schools', 'international teacher communication']
  },
  {
    id: 'david-chicago',
    quote: 'Parent emails used to stress me out - finding the right tone, being professional but warm. Promptly helps me write emails that actually strengthen parent-teacher relationships.',
    author: 'David Chen',
    role: 'High School Teacher',
    location: 'Chicago, USA',
    experience: '6 years teaching',
    keywords: ['parent email generator for teachers', 'teacher productivity ai']
  },
  {
    id: 'emma-edinburgh',
    quote: 'I teach students with additional support needs. Promptly helps me write sensitive, strength-based reports that celebrate each child\'s unique progress. Parents love the positive, specific feedback.',
    author: 'Emma Watson',
    role: 'Special Education Teacher',
    location: 'Edinburgh, UK',
    experience: '10 years in SEND',
    keywords: ['empathetic parent communication tools', 'strength-based reporting']
  },
  {
    id: 'lisa-toronto',
    quote: 'The AI understands educational context. It doesn\'t just make my writing sound corporate - it maintains my caring teacher voice while making everything clearer and more professional.',
    author: 'Lisa Thompson',
    role: 'Primary Teacher',
    location: 'Toronto, Canada',
    experience: '14 years teaching',
    keywords: ['ai writing assistant for educators', 'teacher voice preservation']
  },
  {
    id: 'michael-sydney',
    quote: 'Reduced my report writing time by 70% without losing quality. The consistency across all my student reports is amazing - parents notice the professional standard.',
    author: 'Michael Brown',
    role: 'Secondary Teacher',
    location: 'Sydney, Australia',
    experience: '9 years teaching',
    keywords: ['teacher report writing efficiency', 'ai for teacher productivity']
  },
  {
    id: 'anna-stockholm',
    quote: 'As an ESL teacher, finding the right words in English for difficult conversations was challenging. Promptly helps me communicate clearly and sensitively with all families.',
    author: 'Anna Lindqvist',
    role: 'ESL Teacher',
    location: 'Stockholm, Sweden',
    experience: '7 years teaching',
    keywords: ['international teacher support', 'multilingual communication']
  }
]

export const quickTestimonials: TeacherTestimonial[] = teacherTestimonials.slice(0, 4)

export const testimonialsByKeyword = (keyword: string): TeacherTestimonial[] => {
  return teacherTestimonials.filter(testimonial => 
    testimonial.keywords.some(k => k.includes(keyword))
  )
}