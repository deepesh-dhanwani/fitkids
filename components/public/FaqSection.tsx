'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

const defaultFaqs: FAQItem[] = [
  {
    id: '1',
    question: 'What qualifications do your PTI teachers possess?',
    answer:
      'All our Physical Training Instructors hold NCTE-recognized degrees and diplomas including D.P.Ed (Diploma in Physical Education), B.P.Ed (Bachelor of Physical Education), or M.P.Ed (Master of Physical Education), along with verified sports specializations and first-aid certifications.',
  },
  {
    id: '2',
    question: 'How do you verify the background and child-safety of instructors?',
    answer:
      'Every candidate undergoes a mandatory 5-step background verification process: police character clearance, Aadhaar identity authentication, academic degree validation from UGC/NCTE universities, previous employer background check, and medical fitness screening.',
  },
  {
    id: '3',
    question: 'What happens if a PTI teacher falls sick or takes leave?',
    answer:
      'FitKids provides a 100% Replacement Guarantee. If an instructor is absent for more than 2 consecutive days or needs emergency leave, we deploy a pre-screened substitute instructor at zero additional charge to ensure zero disruption to school classes.',
  },
  {
    id: '4',
    question: 'How does the billing and contract model work?',
    answer:
      'We operate on a transparent monthly contract model with a fixed per-PTI-per-month service fee. FitKids handles the instructor stipend, PF, ESI, gratuity, and tax compliances. The school receives a single GST invoice every month with clear credit terms.',
  },
  {
    id: '5',
    question: 'Can we conduct interviews and demo classes before deployment?',
    answer:
      'Yes, absolutely. We present 2 to 3 pre-vetted candidate profiles for each open requirement. The school leadership and sports department can conduct personal interviews and on-ground practical demo sessions before signing the placement agreement.',
  },
  {
    id: '6',
    question: 'Do you provide specialized coaching for sports like Football, Cricket, or Skating?',
    answer:
      'Yes! Beyond general physical training instructors, we provide NIS-certified and state-level coaches specialized in Athletics, Football, Cricket, Basketball, Volleyball, Badminton, Table Tennis, Yoga, and Martial Arts.',
  },
  {
    id: '7',
    question: 'Can FitKids assist with our Annual Sports Day and March Past training?',
    answer:
      'Yes. Our staff are trained in organizing March Past formations, pyramid displays, aerobic drills, torch lighting protocols, track & field events management, and sports day scorekeeping.',
  },
  {
    id: '8',
    question: 'Which cities across Rajasthan do you currently serve?',
    answer:
      'We currently deploy PTI staff across Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bikaner, Alwar, Bhilwara, Sikar, Chittorgarh, and Sri Ganganagar, with rapid expansion into tier-2 & tier-3 educational clusters.',
  },
]

export function FaqSection({ faqs = defaultFaqs }: { faqs?: FAQItem[] }) {
  const items = faqs.length > 0 ? faqs : defaultFaqs

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-text-primary">
            Clear Answers for School Decision-Makers
          </h2>
          <p className="mt-3 text-text-muted text-sm sm:text-base">
            Everything you need to know about our staffing agreements, replacements, and compliance.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left font-heading font-semibold text-base py-5 hover:text-cerulean">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-text-muted leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
