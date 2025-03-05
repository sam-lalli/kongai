import HeroSection from '@/components/HeroSection'
import TextPreview from '@/components/TextPreview'
import WhyUs from '@/components/WhyUs'
import React from 'react'

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <HeroSection />
      <WhyUs />
      <TextPreview />

    </main>
  )
}

export default HomePage