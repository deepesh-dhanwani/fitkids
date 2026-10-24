import Link from 'next/link'
import { ShieldCheck, FileCheck, Users, PlayCircle, ArrowRight } from 'lucide-react'

const verificationSteps = [
  {
    step: 1,
    title: 'Police Character Verification',
    badge: 'State CID / Police Clearance',
    icon: ShieldCheck,
    desc: 'Formal background verification submitted to and cleared by the district police superintendent. Zero criminal records guaranteed.',
  },
  {
    step: 2,
    title: 'Academic & NCTE Audit',
    badge: '100% Genuine Degree Authenticated',
    icon: FileCheck,
    desc: 'Degrees verified directly from issuing universities (Rajasthan University, LNIPE, DU, etc.) for authentic NCTE D.P.Ed/B.P.Ed credentials.',
  },
  {
    step: 3,
    title: 'Expert Technical Screening',
    badge: 'Child Psychology & Drill Panel',
    icon: Users,
    desc: 'Conducted by senior sports directors evaluating physical agility, voice command modulation, assembly protocols, and POCSO awareness.',
  },
  {
    step: 4,
    title: 'Live School Ground Demo',
    badge: 'Practical Teaching Test',
    icon: PlayCircle,
    desc: 'Final demo session conducted in front of school principals and student batches to ensure classroom discipline and high engagement.',
  },
]

export function VerificationBadges() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            Uncompromising Safety
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-text-primary">
            Our 4-Stage Verification Protocol
          </h2>
          <p className="mt-3 text-text-muted text-sm sm:text-base">
            Every instructor entering your campus has passed stringent child safety, legal, and academic verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verificationSteps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.step}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-cerulean/40 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cerulean/10 text-cerulean group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-border text-text-muted">
                      Stage 0{step.step}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <div className="mb-3">
                    <span className="inline-block text-[11px] font-semibold text-cerulean bg-cerulean/10 px-2 py-0.5 rounded border border-cerulean/20">
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/verification"
            className="inline-flex items-center text-sm font-semibold text-cerulean hover:underline"
          >
            <span>Learn how we audit child safety and compliance documents</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
