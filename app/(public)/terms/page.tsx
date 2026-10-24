import React from 'react'

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-text-primary tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-text-muted mb-8">
          Effective Date: October 2026 | FitKids Staffing India Private Limited
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-text-muted text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">1. Agreement to Terms</h2>
            <p>
              By accessing fitkidsstaffing.in or entering into a staffing service agreement with FitKids Staffing, school administrations and candidate instructors agree to be bound by these Terms of Service and applicable laws within the State of Rajasthan and the Republic of India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">2. School Staffing Engagements</h2>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Staffing Model:</strong> FitKids supplies qualified physical training instructors as an independent staffing provider. Instructors remain employees/contractors of FitKids Staffing.</li>
              <li><strong>Billing & Payments:</strong> Services are billed on a monthly cycle. Monthly invoices must be settled within the agreed credit window (typically 10 to 15 calendar days from date of presentation).</li>
              <li><strong>Replacement Guarantee:</strong> In the event of instructor non-performance or extended absence, FitKids undertakes to provide a qualified replacement within 24 to 48 business hours without additional sourcing fees.</li>
              <li><strong>Direct Solicitation:</strong> Partner schools agree not to directly hire or solicit deployed FitKids instructors as permanent direct employees during the active contract and for a period of 12 months following contract cessation, unless a standard buyout transition fee is settled.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">3. Instructor Conduct & Compliance</h2>
            <p>
              All placed instructors are bound by strict adherence to institutional campus rules, punctual assembly presence, professional athletic dress codes, and zero tolerance policies regarding student physical corporal punishment or discriminatory conduct.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">4. Jurisdiction</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India. Any legal disputes arising out of service contracts shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
