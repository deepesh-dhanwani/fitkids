import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck,
  FileCheck2,
  HeartPulse,
  PlayCircle,
  Award,
  Lock,
  ArrowRight,
  UserCheck,
} from 'lucide-react'

const stages = [
  {
    step: '01',
    title: 'Aadhaar & Identity Authentication',
    badge: 'Biometric UIDAI Verification',
    icon: UserCheck,
    desc: 'Eliminates impersonation and ghost profiles. Candidate UIDAI Aadhaar credentials, biometric identity, and permanent home address are cross-validated through government authentication APIs.',
    checkpoint: 'Full residential address & parental contact records preserved in state registry.',
  },
  {
    step: '02',
    title: 'Police Character Verification',
    badge: 'State Police Clearance Certificate',
    icon: ShieldCheck,
    desc: 'Formal verification request submitted to the District Superintendent of Police or Commissionerate. Instructors are confirmed to have zero criminal charges, FIRs, or pending judicial warrants.',
    checkpoint: 'Written Police Clearance Certificate (PCC) issued within the last 6 months.',
  },
  {
    step: '03',
    title: 'NCTE University Degree Validation',
    badge: '100% Verified Physical Education Degree',
    icon: FileCheck2,
    desc: 'We verify transcripts directly with UGC and NCTE-recognized institutions (e.g., University of Rajasthan, LNIPE Gwalior, BHU, Delhi University). Only candidates holding genuine D.P.Ed, B.P.Ed, or M.P.Ed diplomas pass.',
    checkpoint: 'Eliminates non-recognized and fraudulent physical training diplomas.',
  },
  {
    step: '04',
    title: 'Medical Fitness & CPR First-Aid',
    badge: 'Cardiovascular & Emergency Certified',
    icon: HeartPulse,
    desc: 'Every teacher undergoes a thorough medical examination including cardiovascular stress fitness, 20/20 corrected vision, hearing acuity, and drug screening, coupled with Red Cross basic life support (CPR) certification.',
    checkpoint: 'Instructors are equipped to manage on-ground sports fractures, heat strokes, and minor concussions.',
  },
  {
    step: '05',
    title: 'Practical Teaching Demo & POCSO Training',
    badge: 'On-Ground Teaching Test Passed',
    icon: PlayCircle,
    desc: 'Our panel of senior sports directors reviews voice projection, assembly drill command, and age-adapted drill design. Every teacher completes mandatory POCSO (Protection of Children from Sexual Offences) training on safe teacher-student boundaries.',
    checkpoint: 'Demonstration conducted before real student groups with 10-point rubric scoring.',
  },
]

export default function VerificationPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            Child Protection & Standards
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-text-primary">
            The 5-Stage Verification Standard
          </h1>
          <p className="mt-4 text-text-muted text-base sm:text-lg leading-relaxed">
            School principals carry the highest legal and moral duty of care for their students. Here is how FitKids guarantees complete peace of mind.
          </p>
        </div>

        {/* Visual Timeline */}
        <div className="max-w-4xl mx-auto space-y-8 mb-24 relative">
          <div className="hidden sm:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-cerulean via-neon-rose to-emerald-400" />

          {stages.map((stage, idx) => {
            const Icon = stage.icon
            return (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row items-start sm:space-x-8 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl hover:border-cerulean/40 transition-all duration-300"
              >
                {/* Circle Icon Badge */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-card to-jet border border-border text-cerulean shadow-md sm:relative z-10 mb-4 sm:mb-0">
                  <Icon className="h-7 w-7" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-cerulean uppercase tracking-wider">
                      Stage {stage.step}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {stage.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                    {stage.title}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed">
                    {stage.desc}
                  </p>

                  <div className="pt-3 border-t border-border flex items-center space-x-2 text-xs font-medium text-text-primary">
                    <Lock className="h-3.5 w-3.5 text-neon-rose shrink-0" />
                    <span><strong>Verification Requirement:</strong> {stage.checkpoint}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Institutional Verification Dossier */}
        <div className="rounded-3xl border border-border bg-card-bg/60 p-8 sm:p-12 max-w-4xl mx-auto backdrop-blur-xl text-center space-y-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cerulean/15 text-cerulean mx-auto">
            <Award className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
            Full Verification Dossier Delivered to the School
          </h2>
          <p className="text-sm text-text-muted max-w-xl mx-auto leading-relaxed">
            Prior to day one, the school administration receives a verified physical and digital binder containing the instructor's Police Verification Certificate, degree transcripts, Aadhaar authentication, medical fitness card, and signed code of conduct.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Button asChild variant="brand" size="lg">
              <Link href="/for-schools" className="flex items-center space-x-2">
                <span>Request Verified Instructor Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/child-safety">Read Child Safety Policy</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
