import Link from 'next/link'
import { ArrowUpRight, Award, Dumbbell, Flame, Trophy, Sparkles } from 'lucide-react'

export function ServicesBento() {
  return (
    <section className="py-24 bg-card-bg/30 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-neon-rose bg-neon-rose/10 px-3 py-1 rounded-full border border-neon-rose/20">
              End-to-End Capabilities
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-text-primary">
              Specialized Physical Education Services
            </h2>
            <p className="mt-3 text-text-muted text-sm sm:text-base">
              Tailored staffing and sports event infrastructure for educational institutions of all scales.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-semibold text-cerulean hover:text-cerulean/80 transition-colors"
          >
            <span>Explore all services in detail</span>
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Bento Item 1: Primary Large Card (PTI Supply) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-2xl border border-border bg-gradient-to-br from-card to-card-bg p-8 shadow-sm hover:border-cerulean/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cerulean/15 text-cerulean mb-6">
                <Award className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold uppercase text-cerulean tracking-wider">
                Flagship Service
              </span>
              <h3 className="font-heading text-2xl font-bold text-text-primary mt-1 mb-3">
                Full-Time PTI Teacher Supply
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                Monthly contract instructors handling daily school assemblies, mass-PT, PE syllabus execution according to CBSE/ICSE physical health education guidelines, and routine playground safety.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-text-muted">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cerulean mr-2" />
                  NCTE Recognized (D.P.Ed/B.P.Ed)
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cerulean mr-2" />
                  Police & Medical Verified
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cerulean mr-2" />
                  24h Emergency Substitute
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cerulean mr-2" />
                  Zero School PF/ESI Liability
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between">
              <span className="text-xs text-text-muted">Available across 15 Rajasthan cities</span>
              <Link href="/for-schools" className="text-xs font-semibold text-cerulean flex items-center hover:underline">
                Request Contract <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Bento Item 2: Sports Coaching */}
          <div className="md:col-span-1 lg:col-span-2 rounded-2xl border border-border bg-card p-8 shadow-sm hover:border-neon-rose/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-rose/15 text-neon-rose mb-6">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                Competitive Sports Coaching
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                State & national-level certified coaches for dedicated afternoon academies in Football, Cricket, Basketball, Volleyball, Badminton, and Table Tennis.
              </p>
            </div>
            <div className="pt-4 border-t border-border/60">
              <span className="text-xs font-medium text-neon-rose">CBSE Cluster & SGFI Tournament Ready</span>
            </div>
          </div>

          {/* Bento Item 3: Yoga & Wellness */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                Yoga & Mindfulness
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Certified yoga acharyas teaching Surya Namaskar, stress pranayama for board exam students, and postural alignment.
              </p>
            </div>
            <span className="text-xs text-emerald-400 mt-4 block font-medium">Yoga Alliance Certified</span>
          </div>

          {/* Bento Item 4: Annual Sports Day Support */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 mb-4">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                Annual Day & Sports Meet
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Turnkey coordination: March-past drills, human pyramid choreographies, track line markings, and score adjudication.
              </p>
            </div>
            <span className="text-xs text-amber-400 mt-4 block font-medium">Complete Event Blueprint</span>
          </div>

          {/* Bento Item 5: Sports Equipment Support */}
          <div className="md:col-span-2 lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400 mb-4">
                <Dumbbell className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                Sports Equipment & Ground Maintenance
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Consultancy on purchasing tournament-standard sports gear at wholesale institutional discounts, turf maintenance, basketball court acrylic coating, and athletics track leveling.
              </p>
            </div>
            <span className="text-xs text-sky-400 mt-4 block font-medium">Verified Equipment Suppliers</span>
          </div>
        </div>
      </div>
    </section>
  )
}
