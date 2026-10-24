import { Clock, ShieldAlert, FileSpreadsheet, RotateCcw } from 'lucide-react'

const features = [
  {
    icon: RotateCcw,
    title: '100% Replacement Guarantee',
    desc: 'If a teacher falls ill, takes personal leave, or does not meet expectations, a verified substitute is deployed within 24 hours at zero cost.',
  },
  {
    icon: Clock,
    title: 'Punctual Daily Service',
    desc: 'Instructors report 15 minutes before the first morning bell. Daily biometric & geolocation attendance logged through our mobile system.',
  },
  {
    icon: ShieldAlert,
    title: 'Zero Compliance Burden',
    desc: 'FitKids is the direct employer of record. We manage Provident Fund (PF), Employee State Insurance (ESI), gratuity, and income taxes.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Predictable Monthly Invoicing',
    desc: 'One transparent monthly GST invoice with itemized days worked. No surprise costs, recruitment fees, or bonus liabilities for the school.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-card-bg/40 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-neon-rose bg-neon-rose/10 px-3 py-1 rounded-full border border-neon-rose/20">
            Institutional Advantages
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-text-primary">
            Why Rajasthan Schools Choose FitKids
          </h2>
          <p className="mt-3 text-text-muted text-sm sm:text-base">
            We solve the chronic shortage of qualified PE instructors while insulating schools from compliance liabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-neon-rose/40 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-rose/10 text-neon-rose mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
