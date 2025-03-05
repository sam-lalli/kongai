"use client"

import Image from "next/image"
import { CheckCircle, Dumbbell, MessageSquare } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

export default function FeatureSection() {
  const features = [
    "Daily workout texts tailored to your goals",
    "Real-time form correction and feedback",
    "Adaptive progression based on your performance",
    "Nutrition guidance customized to your body type",
    "Recovery optimization to prevent injuries",
    "Text-based check-ins to keep you accountable",
  ]

  return (
    <ScrollReveal>
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-zinc-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
              <Image src="/KongAIfullbody.webp" alt="Kong AI Fitness Coach" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="text-xl font-bold">Kong AI Assistant</h3>
                  </div>
                  <p className="text-zinc-300">Your 24/7 fitness companion</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Unleash Your Full Potential with Kong AI</h2>
              <p className="text-lg text-zinc-400 mb-8">
                Our revolutionary AI fitness coach combines cutting-edge technology with proven fitness science to
                deliver personalized workout texts that drive results.
              </p>

              <div className="bg-zinc-800/30 backdrop-blur-sm p-4 rounded-xl border border-zinc-700 mb-8">
                <div className="flex items-center mb-3">
                  <Dumbbell className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="font-bold text-lg">Daily Workout Texts</h3>
                </div>
                <p className="text-zinc-400 mb-4">
                  Kong AI sends you personalized workout texts right when you need them, adapting to your schedule,
                  progress, and feedback.
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

