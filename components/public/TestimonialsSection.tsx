'use client'

import React, { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Image from 'next/image'

interface TestimonialItem {
  id: string
  schoolName: string
  contactName: string
  designation: string
  text: string
  rating: number
  photoUrl: string
}

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[]
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: '1',
    schoolName: 'Delhi Public School, Jaipur',
    contactName: 'Dr. Sunita Kothari',
    designation: 'Principal',
    text: 'FitKids Staffing has revolutionized our sports program. Their PTI teachers are punctilious, police-verified, and extremely dedicated. When one teacher took medical leave, a certified replacement arrived within 24 hours!',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop',
  },
  {
    id: '2',
    schoolName: "St. Xavier's Senior Secondary School, Jodhpur",
    contactName: 'Fr. Thomas Anthony',
    designation: 'Principal & Director',
    text: 'Finding certified B.P.Ed instructors in Western Rajasthan used to take months. With FitKids, we contracted 2 top-tier coaches in less than a week. Our basketball and football teams won district gold medals this season.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
  },
  {
    id: '3',
    schoolName: 'Ryan International School, Udaipur',
    contactName: 'Mrs. Rekha Singhal',
    designation: 'Headmistress',
    text: 'The transparency in billing, comprehensive monthly attendance reports, and zero compliance headache makes FitKids our preferred PE partner. Highly recommended for all CBSE and ICSE schools.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop',
  },
]

export function TestimonialsSection({ testimonials = defaultTestimonials }: TestimonialsSectionProps) {
  const items = testimonials.length > 0 ? testimonials : defaultTestimonials
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1))

  const currentItem = items[current]

  return (
    <section className="py-24 bg-jet border-t border-border overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            Endorsements
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-text-primary">
            Trusted by Rajasthan&apos;s Leading Educators
          </h2>
          <p className="mt-3 text-text-muted text-sm sm:text-base">
            Read how school administrators transformed their physical training curriculum.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-2xl relative">
          <Quote className="h-12 w-12 text-cerulean/20 absolute top-8 right-8 pointer-events-none" />

          <div className="flex items-center space-x-1 mb-6">
            {[...Array(currentItem.rating || 5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <p className="text-base sm:text-xl font-medium text-text-primary leading-relaxed mb-8 italic">
            &ldquo;{currentItem.text}&rdquo;
          </p>

          <div className="flex items-center justify-between border-t border-border pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border">
                <Image
                  src={currentItem.photoUrl || '/avatar-placeholder.png'}
                  alt={currentItem.contactName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-heading font-bold text-text-primary text-base">
                  {currentItem.contactName}
                </h4>
                <p className="text-xs text-text-muted">
                  {currentItem.designation}, <span className="text-cerulean">{currentItem.schoolName}</span>
                </p>
              </div>
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center space-x-2">
              <button
                onClick={prev}
                className="h-10 w-10 flex items-center justify-center rounded-lg border border-border bg-card/60 hover:bg-muted text-text-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="h-10 w-10 flex items-center justify-center rounded-lg border border-border bg-card/60 hover:bg-muted text-text-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial counter indicators */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-8 bg-cerulean' : 'w-2 bg-border'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
