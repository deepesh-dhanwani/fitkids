'use client'

import React, { useEffect, useState, useRef } from 'react'

const stats = [
  { label: 'Partner Schools', value: 500, suffix: '+', desc: 'Across all major boards' },
  { label: 'PTIs Placed', value: 1200, suffix: '+', desc: 'Police verified & trained' },
  { label: 'Students Impacted', value: 2, suffix: 'M+', desc: 'Daily sports participation' },
  { label: 'Cities Covered', value: 15, suffix: '', desc: 'Pan-Rajasthan operational reach' },
]

export function StatsCounter() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-card-bg/50 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary flex items-center justify-center">
                <span className="gradient-text">
                  {hasAnimated ? stat.value : '0'}
                </span>
                <span className="text-cerulean">{stat.suffix}</span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-text-primary font-heading">
                {stat.label}
              </h3>
              <p className="mt-1 text-xs text-text-muted">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
