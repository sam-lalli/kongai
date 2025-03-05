"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  threshold?: number
  delay?: number
}

export default function ScrollReveal({ children, threshold = 0.1, delay = 0 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is visible
        if (entry.isIntersecting) {
          // Add a delay if specified
          if (delay) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          } else {
            setIsVisible(true)
          }
          // Once it's visible, we don't need to observe anymore
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      {
        threshold, // Percentage of element visibility needed to trigger callback
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      {children}
    </div>
  )
}

