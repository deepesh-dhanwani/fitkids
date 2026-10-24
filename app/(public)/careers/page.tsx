import React from 'react'
import { PTIApplicationForm } from '@/components/public/PTIApplicationForm'
import {
  Banknote,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react'

const openRoles = [
  {
    title: 'Senior Physical Education Teacher (B.P.Ed / M.P.Ed)',
    location: 'Jaipur, Rajasthan',
    type: 'Full-Time Monthly Contract',
    salary: '₹24,000 – ₹30,000 / month',
    reqs: 'B.P.Ed degree + 3+ years experience with CBSE senior secondary students. Basketball or Athletics expertise preferred.',
  },
  {
    title: 'Female Physical Training Instructor (D.P.Ed / B.P.Ed)',
    location: 'Ajmer / Jodhpur, Rajasthan',
    type: 'Full-Time Monthly Contract',
    salary: '₹22,000 – ₹26,000 / month',
    reqs: 'Physical education degree. Strong background in gymnastics, aerobics, swimming, and junior girls drill coordination.',
  },
  {
    title: 'Head Football & Athletics Academy Coach',
    location: 'Udaipur, Rajasthan',
    type: 'Full-Time Contract',
    salary: '₹28,000 – ₹35,000 / month',
    reqs: 'AIFF C-License or NIS diploma in football. Proven experience leading teams to CBSE Cluster victories.',
  },
]

const instructorPerks = [
  {
    icon: Banknote,
    title: 'Assured Punctual Salary on 1st of Every Month',
    desc: 'Direct electronic bank transfer with complete salary slips. Never face delayed payments from unorganized school managements.',
  },
  {
    icon: ShieldCheck,
    title: 'PF, ESI & Medical Insurance Benefits',
    desc: 'Full social security cover under Employees Provident Fund and ESI healthcare schemes for you and your family.',
  },
  {
    icon: TrendingUp,
    title: 'Placement in Premier Institutions',
    desc: 'Work in respected CBSE, ICSE, and international day-boarding schools with high-grade sports infrastructure.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Coaching Certifications',
    desc: 'Free access to FitKids physical training workshops, modern sports science drills, and referee certification courses.',
  },
]

export default function CareersPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-neon-rose bg-neon-rose/10 px-3 py-1 rounded-full border border-neon-rose/20">
            Join Rajasthan's Top PE Network
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-text-primary">
            Careers for Qualified PTI Teachers & Sports Coaches
          </h1>
          <p className="mt-4 text-text-muted text-base sm:text-lg leading-relaxed">
            Elevate your sports teaching career. Get placed in top schools across Rajasthan with guaranteed on-time monthly salary, PF, ESI, and continuous mentorship.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-24">
          {instructorPerks.map((perk, i) => {
            const Icon = perk.icon
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-cerulean/40 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cerulean/15 text-cerulean mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-text-primary mb-2">
                  {perk.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Open Roles */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cerulean">Immediate Openings</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary mt-1">
              Featured Opportunities Across Rajasthan
            </h2>
          </div>

          <div className="space-y-4">
            {openRoles.map((role, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-border/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-lg text-text-primary">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center text-cerulean font-medium">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {role.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {role.type}
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {role.salary}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed max-w-2xl pt-1">
                    {role.reqs}
                  </p>
                </div>
                <a
                  href="#application-form"
                  className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2.5 rounded-lg bg-cerulean/10 text-cerulean hover:bg-cerulean hover:text-white transition-all shrink-0"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form Section */}
        <div id="application-form" className="max-w-3xl mx-auto scroll-mt-24">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl">
            <div className="mb-8 text-center">
              <span className="text-xs uppercase tracking-wider text-neon-rose font-bold">
                Instructor Registration
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary mt-1">
                Candidate Application Form
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-md mx-auto">
                Complete this 3-step application. Our recruitment desk will call you to schedule your screening session.
              </p>
            </div>

            <PTIApplicationForm />
          </div>
        </div>
      </div>
    </div>
  )
}
