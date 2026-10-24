import React from 'react'
import { SchoolQuoteForm } from '@/components/public/SchoolQuoteForm'
import {
  ShieldCheck,
  RotateCcw,
  BadgePercent,
  CalendarCheck,
  CheckCircle2,
  Users,
  Award,
  Clock,
} from 'lucide-react'

const benefits = [
  {
    icon: RotateCcw,
    title: '24-Hour Emergency Substitute',
    desc: 'Never suffer canceled sports periods. If your regular PTI takes leave or is unavailable, our pre-cleared backup teacher is on ground the next morning.',
  },
  {
    icon: ShieldCheck,
    title: 'Police & Degree Verification Guarantee',
    desc: 'Eliminate school liability. Every teacher has verified police clearance, Aadhaar background authentication, and verified university degree transcripts.',
  },
  {
    icon: BadgePercent,
    title: 'Zero Permanent Payroll Overheads',
    desc: 'No school liabilities for Provident Fund (PF), ESIC, bonus disputes, or long-term gratuity. FitKids is the direct employer of record.',
  },
  {
    icon: CalendarCheck,
    title: 'Flexible Month-to-Month Contracts',
    desc: 'Simple institutional contracts aligned with your academic terms. Pause or replace teachers anytime with 30-day notice.',
  },
]

const pricingTiers = [
  {
    name: 'General PTI Staffing',
    subtitle: 'Assembly Drills, Mass-PT, General PE',
    price: '₹24,000 – ₹28,000',
    frequency: 'per PTI / month + GST',
    desc: 'Ideal for primary and middle school general physical training, assembly coordination, and basic fitness periods.',
    features: [
      'NCTE D.P.Ed or B.P.Ed certified instructor',
      'Morning prayer & drill formations',
      'Daily 6-8 games periods execution',
      'Intra-school house sports coordination',
      '24h backup replacement guarantee',
      'Monthly geofenced attendance report',
    ],
    popular: false,
  },
  {
    name: 'Specialized Sports Coach',
    subtitle: 'Competitive Academies & Tournaments',
    price: '₹30,000 – ₹38,000',
    frequency: 'per Coach / month + GST',
    desc: 'For schools aiming for gold medals in CBSE Clusters, SGFI, and state-level basketball, football, or cricket meets.',
    features: [
      'B.P.Ed / M.P.Ed + State/National Player or NIS Coach',
      'Morning drills + Afternoon specialized sports academy',
      'Dedicated coaching for Football, Cricket, or Basketball',
      'Team selection trials & tactical scrimmage schedules',
      'Tournaments accompaniment & coaching',
      'Biometric athlete performance report cards',
    ],
    popular: true,
  },
  {
    name: 'Enterprise School Group',
    subtitle: 'Multiple Campuses & Custom Requirements',
    price: 'Custom Institutional Quote',
    frequency: 'volume discount applied',
    desc: 'Customized full sports department outsourcing for large multi-branch school trusts across Rajasthan.',
    features: [
      'Deployment of 5 to 20+ verified PTIs & coaches',
      'Dedicated On-Site Sports Director / Head of PE',
      'Comprehensive Annual Sports Day Turnkey Management',
      'Wholesale athletic equipment procurement audit',
      'Quarterly teacher retraining & compliance audits',
      'Priority backup substitute allocation within 12h',
    ],
    popular: false,
  },
]

export default function ForSchoolsPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            School Partnerships
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-text-primary">
            Hire Verified PTI Teachers for Your Institution
          </h1>
          <p className="mt-4 text-text-muted text-base sm:text-lg leading-relaxed">
            Eliminate sports department recruitment headaches. Over 500 Rajasthan schools rely on FitKids for certified, dependable physical education instructors on monthly contracts.
          </p>
        </div>

        {/* Form and Quick Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto mb-28">
          {/* Form Column */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-wider text-neon-rose font-bold">
                Direct School Desk
              </span>
              <h2 className="text-2xl font-bold font-heading text-text-primary mt-1">
                Request a Staffing Quotation
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1">
                Fill in your campus requirements. We will send vetted profiles and organize a free demo class.
              </p>
            </div>
            <SchoolQuoteForm />
          </div>

          {/* Value Prop Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-border bg-card-bg/60 p-6 sm:p-8 space-y-6 backdrop-blur-md">
              <h3 className="font-heading text-xl font-bold text-text-primary">
                The FitKids School Guarantee
              </h3>
              <div className="space-y-4">
                {benefits.map((b, i) => {
                  const Icon = b.icon
                  return (
                    <div key={i} className="flex items-start space-x-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cerulean/10 text-cerulean border border-cerulean/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-primary">
                          {b.title}
                        </h4>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-6 border-t border-border">
                <div className="rounded-xl border border-border bg-jet/60 p-4">
                  <div className="flex items-center space-x-3 text-emerald-400 text-xs font-semibold">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>Average Deployment Timeline: 3 to 5 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transparent Pricing Model */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
              Clear & Predictable
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-text-primary">
              Transparent Monthly Pricing
            </h2>
            <p className="mt-3 text-text-muted text-sm sm:text-base">
              No hidden agency fees or surprise year-end charges. One predictable monthly invoice per teacher.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-3xl border p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.popular
                    ? 'border-cerulean bg-gradient-to-b from-card to-card-bg shadow-2xl scale-105 z-10'
                    : 'border-border bg-card shadow-sm hover:border-border/80'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-4 py-1 text-xs font-bold text-white shadow-md">
                    Most Chosen by CBSE Schools
                  </span>
                )}

                <div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-cerulean font-medium mt-1 mb-6">
                    {tier.subtitle}
                  </p>

                  <div className="mb-4">
                    <span className="text-3xl font-extrabold text-text-primary font-heading">
                      {tier.price}
                    </span>
                    <span className="block text-xs text-text-muted mt-1">
                      {tier.frequency}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed mb-6">
                    {tier.desc}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-border">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-primary block">
                      Plan Inclusions:
                    </span>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-text-muted">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <a
                    href="#top"
                    className={`block w-full py-3 text-center text-sm font-semibold rounded-xl transition-all ${
                      tier.popular
                        ? 'bg-gradient-brand text-white shadow-lg hover:opacity-90'
                        : 'border border-border bg-muted/60 text-text-primary hover:bg-muted'
                    }`}
                  >
                    Select Plan & Schedule Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
