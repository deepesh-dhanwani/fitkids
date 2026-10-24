'use client'

import React from 'react'
import { FileText, UserCheck, PlayCircle, ShieldCheck } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: FileText,
    title: 'Share Requirement',
    description:
      'Fill our 60-second form specifying school board (CBSE/ICSE/State), number of PTIs required, and sports focus areas.',
  },
  {
    step: '02',
    icon: UserCheck,
    title: 'Profile Matching',
    description:
      'We shortlist 2 to 3 pre-screened D.P.Ed/B.P.Ed instructors from our active roster matching your city and campus culture.',
  },
  {
    step: '03',
    icon: PlayCircle,
    title: 'Demo Class & Interview',
    description:
      'Conduct a live on-ground demonstration class with your students and interview the shortlisted instructors.',
  },
  {
    step: '04',
    icon: ShieldCheck,
    title: 'Contract & Deployment',
    description:
      'Sign the transparent service agreement. Teacher reports on day one with 24-hour backup replacement guarantee.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            Hassle-Free Process
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-text-primary">
            How FitKids Staffing Works
          </h2>
          <p className="mt-3 text-text-muted text-sm sm:text-base">
            From inquiry to first morning drill in under 5 business days. Zero recruitment overhead for your school administration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-cerulean/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cerulean/10 border border-cerulean/20 text-cerulean group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-heading text-2xl font-black text-border-color group-hover:text-cerulean/30 transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
