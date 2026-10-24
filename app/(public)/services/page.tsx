import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Award,
  Trophy,
  Sparkles,
  Flame,
  Dumbbell,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
} from 'lucide-react'

const services = [
  {
    id: 'pti-supply',
    title: 'Full-Time PTI Teacher Supply',
    tagline: 'Monthly Contract • Fully Managed • Zero Liability',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=500&fit=crop',
    description:
      'We supply certified, police-verified Physical Training Instructors on predictable monthly service contracts. Your school receives dedicated physical education staff handling morning assembly drills, mandatory CBSE/ICSE physical health education periods, and house sports coordination.',
    deliverables: [
      'NCTE-recognized D.P.Ed, B.P.Ed or M.P.Ed qualified teachers',
      'Daily morning prayer drill & march-past assembly leadership',
      'Structured PE curriculum execution aligned with NEP 2020 & CBSE',
      'Daily attendance tracking via mobile geofence app',
      '100% 24-hour backup substitute teacher guarantee for leaves',
      'Complete employer compliance handling (PF, ESI, gratuity, insurance)',
    ],
    pricing: 'Fixed per-PTI-per-month retainer with itemized monthly billing',
  },
  {
    id: 'sports-coaching',
    title: 'Specialized Sports Coaching',
    tagline: 'CBSE Cluster • SGFI • Tournament Preparedness',
    icon: Trophy,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&h=500&fit=crop',
    description:
      'Turn your school into an inter-school sports powerhouse. We place NIS-certified and state-level coaches to manage after-school sports academies in Football, Cricket, Basketball, Volleyball, Badminton, Table Tennis, and Athletics.',
    deliverables: [
      'NIS (National Institute of Sports) certified domain coaches',
      'Custom periodized training schedules (pre-season, competition, recovery)',
      'Tactical video analysis and position-specific agility drills',
      'Selection trials coordination for school team squads',
      'Accompaniment and coaching during CBSE Cluster & SGFI tournaments',
      'Student athletic biometric progress cards and fitness tracking',
    ],
    pricing: 'Full-time or morning/afternoon shift contracts available',
  },
  {
    id: 'yoga-fitness',
    title: 'Yoga & Holistic Student Wellness',
    tagline: 'Postural Health • Exam Focus • Mindfulness',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=500&fit=crop',
    description:
      'Counter the adverse effects of heavy schoolbags, excessive screen time, and academic anxiety. Our Yoga Alliance certified instructors teach age-appropriate asanas, pranayama, and focus techniques.',
    deliverables: [
      'Yoga Alliance 500-hour and QCI certified yoga acharyas',
      'Surya Namaskar & spine flexibility routines for primary/middle wings',
      'Pranayama & deep breathing techniques for board exam classes (10th & 12th)',
      'International Yoga Day mass demonstration coordination',
      'Specialized sessions for school teaching staff wellness',
      'Ergonomic posture correction and core strength conditioning',
    ],
    pricing: 'Full-time PTI or specialized visiting master sessions',
  },
  {
    id: 'annual-day',
    title: 'Annual Sports Day & Drill Support',
    tagline: 'Flawless Field Synchronization • Zero Chaos',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=500&fit=crop',
    description:
      'Our veteran sports coordinators manage your Annual Sports Carnival from beginning to end. We choreograph mass drill displays, human pyramids, aeromodelling marches, track heats, and official prize distributions.',
    deliverables: [
      'March-past battalion synchronization with school band',
      'Primary wing thematic aerobic, dumbbell, and ribbon displays',
      'Senior school human pyramids and martial arts demonstrations',
      'Pre-event preliminary heats management and bib number tracking',
      'Professional field line marking and finish-line scoring management',
      'Chief guest protocol, torch relay, and oath-taking ceremony orchestration',
    ],
    pricing: 'Project-based turnkey package (3 to 6 weeks drill schedule)',
  },
  {
    id: 'equipment-ground',
    title: 'Sports Equipment & Ground Setup',
    tagline: 'Wholesale Procurement • Turf & Court Advisory',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&h=500&fit=crop',
    description:
      'Ensure your sports budget is invested in durable, tournament-certified athletic gear. We advise on institutional wholesale procurement and standard ground dimensions for athletics tracks, football turfs, and basketball acrylic flooring.',
    deliverables: [
      'Procurement advisory for certified balls, nets, mats, and hurdles at wholesale rates',
      'Gymnasium fitness machine inspection and safety audits',
      'Track & field layout dimensioning adhering strictly to IAAF standards',
      'First-aid kiosk equipment checklist and emergency stretcher setups',
      'Playground hazard inspection ensuring child safety compliance',
    ],
    pricing: 'Complimentary advisory included with all active staffing contracts',
  },
]

export default function ServicesPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            Our Solutions
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-text-primary">
            Comprehensive Physical Training & Sports Staffing
          </h1>
          <p className="mt-4 text-text-muted text-base sm:text-lg leading-relaxed">
            From daily physical education classes to gold medals at state championships, explore our specialized services tailored for Rajasthan schools.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 1
            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`space-y-6 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cerulean/15 text-cerulean">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-cerulean">
                        {service.tagline}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                      What Is Included:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-text-muted">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-text-muted">
                      <strong className="text-text-primary">Contract Terms:</strong> {service.pricing}
                    </div>
                    <Button asChild variant="brand" size="sm">
                      <Link href="/for-schools" className="flex items-center space-x-1.5">
                        <span>Book Demo</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className={`relative rounded-2xl overflow-hidden border border-border aspect-[16/10] ${isEven ? 'lg:order-1' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-xs font-medium text-white flex items-center justify-between">
                    <span className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Verified Deployment</span>
                    </span>
                    <span className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <CalendarCheck className="h-3.5 w-3.5 text-cerulean" />
                      <span>Immediate Start Available</span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 rounded-3xl border border-border bg-gradient-to-br from-card to-card-bg p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
            Have a Specific Sports Need or Multiple School Campuses?
          </h3>
          <p className="mt-3 text-sm text-text-muted max-w-xl mx-auto">
            We provide group staffing agreements for school chains and educational trusts across Rajasthan.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild variant="brand" size="lg">
              <Link href="/for-schools">Request Custom Proposal</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Speak with Central Desk</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
