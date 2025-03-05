"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, Clock } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

export default function TextPreview() {
  const [currentMessage, setCurrentMessage] = useState(0)

  const messages = [
    {
      time: "7:00 AM",
      text: "Good morning, King! 👑 Today's workout is PUSH DAY. Ready to dominate the jungle? Reply YES to start.",
    },
    {
      time: "7:01 AM",
      text: "YES 💪",
      isUser: true,
    },
    {
      time: "7:02 AM",
      text: "Great! Here's your workout:\n\n1. Bench Press: 4 sets x 8-10 reps\n2. Incline DB Press: 3 sets x 10-12 reps\n3. Shoulder Press: 4 sets x 8-10 reps\n4. Lateral Raises: 3 sets x 12-15 reps\n5. Tricep Pushdowns: 3 sets x 12-15 reps\n\nText DONE when complete!",
    },
    {
      time: "8:45 AM",
      text: "DONE! That was intense!",
      isUser: true,
    },
    {
      time: "8:46 AM",
      text: "Amazing work! Based on your performance, I'm adjusting your next workout to increase shoulder press weight by 5lbs. Rest well, tomorrow is LEG DAY! 💪",
    },
    {
        time: "8:47 AM",
        text: "Thanks Kong!!!",
        isUser: true,
      },
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <ScrollReveal>
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-zinc-900 to-black relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Personal Trainer in Your Pocket</h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Kong AI texts you personalized workouts based on your goals, schedule, and progress. No more guesswork or
              generic plans.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-zinc-800/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl">
            <div className="bg-zinc-900 p-4 flex items-center border-b border-zinc-700">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                <span className="font-bold text-black">K</span>
              </div>
              <div>
                <h3 className="font-bold">Kong AI Coach</h3>
                <p className="text-xs text-zinc-400">Your personal fitness guide</p>
              </div>
            </div>

            <div className="p-4 h-80 overflow-y-auto flex flex-col space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${index > currentMessage ? "opacity-0 h-0 m-0" : "opacity-100"} transition-all duration-500
                        ${message.isUser ? "justify-end" : ""}`}
                    >
                        {!message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center mr-2">
                            <span className="font-bold text-xs text-black">K</span>
                        </div>
                        )}
                        <div
                        className={`p-3 max-w-[85%] ${
                            message.isUser
                            ? "bg-green-500/20 backdrop-blur-sm rounded-2xl rounded-tr-none"
                            : "bg-zinc-700/50 backdrop-blur-sm rounded-2xl rounded-tl-none"
                        }`}
                        >
                        <div className="text-xs text-zinc-400 mb-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {message.time}
                        </div>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-zinc-700 bg-zinc-900/90 flex items-center">
              <input
                type="text"
                placeholder="Message Kong AI..."
                className="bg-zinc-700/30 text-white rounded-full py-2 px-4 flex-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <ThumbsUp className="h-5 w-5 text-green-500 ml-2" />
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

