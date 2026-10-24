import React from 'react'
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function ChildSafetyPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cerulean/15 text-cerulean">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-cerulean">
            Zero Tolerance Policy
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-text-primary tracking-tight mb-4">
          Child Safeguarding & Protection Policy
        </h1>
        <p className="text-xs text-text-muted mb-10">
          Statutory Compliance under POCSO Act 2012 & CBSE Child Protection Guidelines
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-text-muted text-sm sm:text-base leading-relaxed">
          <div className="rounded-2xl border border-neon-rose/30 bg-neon-rose/5 p-6 space-y-2">
            <div className="flex items-center space-x-2 text-neon-rose font-bold text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Core Institutional Commitment</span>
            </div>
            <p className="text-xs sm:text-sm text-text-primary leading-relaxed">
              FitKids Staffing maintains an absolute zero-tolerance policy toward any form of physical, psychological, verbal, or sexual abuse of minors. Child safety is the paramount benchmark that precedes all sports training objectives.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">
              1. Statutory POCSO Training & Orientation
            </h2>
            <p>
              Every physical instructor deployed by FitKids completes mandatory training on the Protection of Children from Sexual Offences (POCSO) Act. Training explicitly defines:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Appropriate Demonstration Techniques:</strong> PTIs must demonstrate exercises, gymnastic postures, and athletic forms visually or with inanimate equipment, adhering to non-touching pedagogy.</li>
              <li><strong>Physical Assistance Rules:</strong> In rare cases where spotting is safety-critical (e.g. vaulting gymnastics), verbal consent and open visibility in full view of other staff and students is mandatory.</li>
              <li><strong>One-on-One Interaction Prohibition:</strong> Instructors are strictly forbidden from meeting students alone behind closed doors, equipment storerooms, or isolated campus corners.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">
              2. Police Character & Background Clearances
            </h2>
            <p>
              Under no circumstances is an unverified candidate permitted to step onto a school campus. Our verification team secures:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Formal Police Clearance Certificate (PCC) from District Police Authorities.</li>
              <li>Dual reference cross-examination with past school principals and physical education heads.</li>
              <li>Digital Aadhaar bio-authentication to prevent identity falsification.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">
              3. Reporting & Whistleblower Protocol
            </h2>
            <p>
              FitKids operates an independent Child Safeguarding Helpline. Any student, teacher, or parent can report concerns 24/7 directly to our Internal Child Safety Committee:
            </p>
            <div className="rounded-2xl border border-border bg-card p-4 space-y-1 text-xs">
              <div><strong>Emergency Hotline:</strong> +91 98765 43210 (Ext. 9 - Safeguarding Desk)</div>
              <div><strong>Confidential Email:</strong> safety@fitkidsstaffing.in</div>
              <div><strong>Lead Officer:</strong> Meenakshi Rathore, Head of School Safeguarding</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
