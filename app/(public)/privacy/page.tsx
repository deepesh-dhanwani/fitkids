import React from 'react'

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-text-primary tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-text-muted mb-8">
          Last updated: October 2026 | FitKids Staffing India Private Limited
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-text-muted text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">1. Overview</h2>
            <p>
              FitKids Staffing India Private Limited ("FitKids", "we", "our", or "us") operates the website fitkidsstaffing.in. This Privacy Policy outlines our standards concerning the collection, storage, verification, and use of personal data provided by educational institutions, job applicants, and general visitors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>School Partner Information:</strong> School name, principal/administrator contact details, official email address, phone number, GST registration, and staffing requirements.</li>
              <li><strong>PTI Job Applicants:</strong> Full name, Aadhaar identification number, contact details, date of birth, academic degrees (D.P.Ed, B.P.Ed, M.P.Ed), previous employment records, police clearance reports, and medical fitness records.</li>
              <li><strong>Usage Analytics:</strong> Standard browser cookies, IP addresses, and interaction timestamps used exclusively for website performance optimization and security logging.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">3. How We Use Collected Data</h2>
            <p>
              Personal data collected through this portal is strictly utilized for:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Matching certified instructors with school recruitment requests.</li>
              <li>Executing mandatory background, police, and university degree verifications.</li>
              <li>Generating itemized GST service invoices and statutory payroll records.</li>
              <li>Delivering transactional updates regarding candidate applications and demo class scheduling.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">4. Data Sharing & Security</h2>
            <p>
              We do not sell, trade, or rent personal information to third-party marketing firms. Information regarding deployed PTI instructors is shared exclusively with the contracting school management for security, POCSO compliance, and administrative record-keeping. All digital data is stored on encrypted, access-restricted databases.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-text-primary">5. Contact Us</h2>
            <p>
              For privacy inquiries or to request data modification, contact our Data Grievance Officer at <strong>info@fitkidsstaffing.in</strong> or write to: FitKids Staffing, 42, Vaishali Nagar, Jaipur, Rajasthan 302021.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
