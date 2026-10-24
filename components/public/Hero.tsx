'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  School as SchoolIcon,
} from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Decorative background glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cerulean/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-neon-rose/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Trust Pill */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs sm:text-sm text-text-muted backdrop-blur-md mb-8 hover:border-cerulean/40 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-cerulean animate-ping" />
            <span className="font-medium text-text-primary">Rajasthan&apos;s #1 PTI Staffing Network</span>
            <span className="text-border">|</span>
            <span className="flex items-center text-cerulean">
              <ShieldCheck className="h-3.5 w-3.5 mr-1" />
              100% Police Verified
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading leading-[1.1] text-text-primary">
            Qualified <span className="gradient-text">PTI Teachers</span> for Your School.
          </h1>

          {/* Tagline / Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed">
            Eliminate sports department hiring hassles. We deploy police-verified, D.P.Ed & B.P.Ed certified Physical Training Instructors to CBSE and ICSE schools across Rajasthan on transparent monthly contracts.
          </p>

          {/* Two Primary CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button asChild variant="brand" size="lg" className="w-full sm:w-auto text-base h-13 px-8 shadow-xl shadow-cerulean/20">
              <Link href="/for-schools" className="flex items-center space-x-2">
                <span>Hire a PTI for Your School</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base h-13 px-8 border-border hover:bg-white/5">
              <Link href="/careers">Apply as a PTI Teacher</Link>
            </Button>
          </div>

          {/* Quick Assurance Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-text-muted pt-8 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>24h Replacement Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Zero Recruitment Costs</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Free On-Campus Demo Class</span>
            </div>
          </div>
        </div>

        {/* Floating Bento Hero Visual */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl border border-border bg-card/40 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border/60 bg-jet/60 p-5 flex items-start space-x-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cerulean/10 border border-cerulean/20 text-cerulean">
                <SchoolIcon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-text-primary text-base">Schools Partnered</h4>
                <p className="text-xs text-text-muted mt-1">Leading private & residential schools in Jaipur, Jodhpur, Udaipur & Ajmer.</p>
                <div className="mt-3 flex items-center text-xs font-semibold text-cerulean">
                  <span>500+ Institutions</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-jet/60 p-5 flex items-start space-x-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-rose/10 border border-neon-rose/20 text-neon-rose">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-text-primary text-base">Verified Instructors</h4>
                <p className="text-xs text-text-muted mt-1">NCTE certified B.P.Ed/M.P.Ed physical trainers and NIS coaches.</p>
                <div className="mt-3 flex items-center text-xs font-semibold text-neon-rose">
                  <span>1,200+ Active PTIs</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-jet/60 p-5 flex items-start space-x-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-text-primary text-base">Student Impact</h4>
                <p className="text-xs text-text-muted mt-1">Cardiovascular fitness, daily morning drills, athletics & CBSE tournament wins.</p>
                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-400">
                  <span>2,000,000+ Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
