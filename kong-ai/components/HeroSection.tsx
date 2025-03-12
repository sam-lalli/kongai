"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star, MessageSquare } from "lucide-react"

export default function HeroSection() {
 const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    generateLeaves()
  }, [])

  const generateLeaves = () => {
    const leafContainer = document.querySelector(".leaf-container")
    if (!leafContainer) return

    for (let i = 0; i < 20; i++) {
      const leaf = document.createElement("div")
      leaf.className = "leaf"
      leaf.style.left = `${Math.random() * 100}%`
      leaf.style.animationDelay = `${Math.random() * 10}s`
      leaf.style.animationDuration = `${10 + Math.random() * 10}s`
      leaf.style.animation = `fall ${10 + Math.random() * 10}s linear infinite`
      leafContainer.appendChild(leaf)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/HeroImage.jpg" alt="King Kong in jungle" fill priority className="object-cover brightness-50" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black z-10"></div>

      {/* Dynamic leaves effect */}
      <div className="leaf-container absolute inset-0 z-20 pointer-events-none"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-30">
        <div className="max-w-3xl mx-auto md:mx-0 md:ml-12 lg:ml-24">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight">
              Become the <span className="text-green-500">King</span> of Your Fitness Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-zinc-300 max-w-2xl">
              Dominate your fitness goals with Kong AI, the world&apos;s most powerful AI fitness coach that texts you
              personalized workouts daily.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-lg">
                Join The Beta <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center bg-zinc-800/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-700">
                <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm">Daily workout texts keep you on track</span>
              </div>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-white bg-black text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg"
              >
                Watch Demo
              </Button> */}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-green-500 bg-zinc-800 flex items-center justify-center"
                    >
                      <span className="text-xs font-bold">K{i}</span>
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-white font-medium">Join 10,000+ fitness enthusiasts</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-green-500 text-green-500" />
                    ))}
                    <span className="ml-2 text-zinc-400 text-sm">4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

