import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Target,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

const values = [
  {
    icon: ShieldCheck,
    title: 'Child Safety First',
    desc: 'Zero tolerance for compromises. Every instructor undergoes rigorous 5-point verification including police character clearance and POCSO compliance.',
  },
  {
    icon: Award,
    title: 'Academic Excellence',
    desc: 'Physical education is an academic subject, not a leisure period. All staff hold recognized NCTE degrees (D.P.Ed, B.P.Ed, M.P.Ed).',
  },
  {
    icon: HeartHandshake,
    title: 'Integrity & Transparency',
    desc: 'Clear monthly billing, prompt teacher salaries with PF/ESI, and no hidden placement overheads for partnering school boards.',
  },
  {
    icon: Target,
    title: 'Continuous Up-Skilling',
    desc: 'Quarterly training workshops in modern sports biomechanics, first-aid CPR certification, and tournament coaching drills.',
  },
]

const team = [
  {
    name: 'Vikramaditya Shekhawat',
    role: 'Founder & Managing Director',
    bio: 'Former State Athletics Champion and sports administration veteran with 15+ years in school physical curriculum design.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
  },
  {
    name: 'Meenakshi Rathore',
    role: 'Head of School Operations',
    bio: 'Oversees 500+ school partner relationships across 15 Rajasthan districts. Expert in CBSE PE syllabus implementation.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
  },
  {
    name: 'Devendra Singh Gehlot',
    role: 'Head of PTI Recruitment & Screening',
    bio: 'Master of Physical Education (LNIPE Gwalior). Spearheads our 5-step background verification and practical demo audits.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
  },
]

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            About FitKids Staffing
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-text-primary">
            Pioneering Professional Physical Education Across Rajasthan
          </h1>
          <p className="mt-4 text-text-muted text-base sm:text-lg leading-relaxed">
            Founded in Jaipur in 2019, FitKids Staffing was built with a singular mission: to make structured, qualified, and safe physical education accessible to every school.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 max-w-6xl mx-auto">
          <div className="space-y-6 text-text-muted text-sm sm:text-base leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
              Our Journey: Solving Rajasthan’s PE Teacher Shortage
            </h2>
            <p>
              In 2019, our founder noticed a recurring crisis in private schools across Jaipur and Jodhpur: while academic departments had qualified subject teachers, sports periods were frequently compromised with untrained whistle-blowers or unverified local hires.
            </p>
            <p>
              Schools struggled with high staff turnover, absent instructors during crucial sports days, and compliance risks surrounding PF and police verification. FitKids Staffing created a seamless model: an outsourced, fully managed instructor service backed by a 24-hour substitute guarantee.
            </p>
            <p>
              Today, FitKids proudly manages 1,200+ Physical Training Instructors deployed across 500+ private, international, and boarding schools throughout Rajasthan.
            </p>
            <div className="pt-2 flex items-center space-x-6 text-text-primary font-semibold text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-cerulean" />
                <span>Jaipur Headquartered</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-neon-rose" />
                <span>15 Cities Covered</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1000&h=750&fit=crop"
              alt="FitKids school sports assembly"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jet via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs uppercase tracking-wider text-cerulean font-semibold">Our Mission</span>
              <p className="text-lg font-bold text-white font-heading mt-1">
                "Every child deserves an inspiring, qualified sports teacher on the playground."
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
              The Principles That Guide Us
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Built on ethics, child safety, and professional accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cerulean/15 text-cerulean mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
              Leadership Team
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Veteran physical educators and operations professionals leading our Rajasthan network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm flex flex-col">
                <div className="relative h-64 w-full bg-card-bg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-text-primary">
                      {member.name}
                    </h3>
                    <p className="text-xs text-cerulean font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-border bg-gradient-to-r from-card to-card-bg p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
            Partner With Rajasthan's Most Trusted PE Staffing Agency
          </h3>
          <p className="mt-2 text-sm text-text-muted max-w-xl mx-auto">
            Schedule a demo class or speak with our Jaipur central desk today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild variant="brand" size="lg">
              <Link href="/for-schools" className="flex items-center space-x-2">
                <span>Hire a PTI Teacher</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Our Office</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
