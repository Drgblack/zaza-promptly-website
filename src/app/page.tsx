import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      {/* <FAQ /> */}
      <CallToAction />
    </main>
  )
}
