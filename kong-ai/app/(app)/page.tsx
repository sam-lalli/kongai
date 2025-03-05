import HeroSection from '@/components/HeroSection'
import ScrollReveal from '@/components/ScrollReveal'
import WhyUs from '@/components/WhyUs'
import React from 'react'

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <HeroSection />
      
      <ScrollReveal>
        <WhyUs />
      </ScrollReveal>

    </main>
  )
}

export default HomePage