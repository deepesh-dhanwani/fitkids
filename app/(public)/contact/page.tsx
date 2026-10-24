import React from 'react'
import { ContactForm } from '@/components/public/ContactForm'
import { MapPin, Phone, Mail, Clock, MessageSquare, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210'

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            Get in Touch
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-text-primary">
            Contact FitKids Staffing
          </h1>
          <p className="mt-4 text-text-muted text-base sm:text-lg leading-relaxed">
            Reach out to our central operations desk in Jaipur. We are here to answer questions, discuss custom contracts, and dispatch demo instructors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto mb-20 items-start">
          {/* Form */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl">
            <h2 className="text-2xl font-bold font-heading text-text-primary mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mb-8">
              Fill in your contact coordinates. Our staffing team will respond promptly.
            </p>
            <ContactForm />
          </div>

          {/* Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
              <h3 className="font-heading text-xl font-bold text-text-primary">
                Jaipur Central Office
              </h3>

              <div className="space-y-4 text-sm text-text-muted">
                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cerulean/10 text-cerulean border border-cerulean/20">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-xs uppercase tracking-wider">
                      Address
                    </h4>
                    <p className="mt-0.5 leading-relaxed">
                      42, Vaishali Nagar, Jaipur, Rajasthan 302021, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cerulean/10 text-cerulean border border-cerulean/20">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-xs uppercase tracking-wider">
                      Phone & Support Desk
                    </h4>
                    <p className="mt-0.5 text-text-primary font-medium">
                      +91 98765 43210
                    </p>
                    <p className="text-xs text-text-muted">Mon – Sat: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cerulean/10 text-cerulean border border-cerulean/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-xs uppercase tracking-wider">
                      Email
                    </h4>
                    <p className="mt-0.5 text-text-primary font-medium">
                      info@fitkidsstaffing.in
                    </p>
                    <p className="text-xs text-text-muted">General & Placement Inquiries</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cerulean/10 text-cerulean border border-cerulean/20">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-xs uppercase tracking-wider">
                      Operational Hubs
                    </h4>
                    <p className="mt-0.5 text-xs text-text-muted leading-relaxed">
                      Field coordinators stationed in Jaipur, Jodhpur, Udaipur, Kota, and Ajmer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button asChild variant="outline" className="w-full border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10">
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Instant WhatsApp Chat</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Embedded Map Representation */}
            <div className="rounded-3xl border border-border bg-card p-6 overflow-hidden">
              <div className="flex items-center space-x-2 mb-3 text-xs font-semibold text-text-primary">
                <Building2 className="h-4 w-4 text-cerulean" />
                <span>Jaipur Regional Headquarters Location</span>
              </div>
              <div className="relative aspect-[16/9] w-full rounded-2xl bg-card-bg border border-border flex flex-col items-center justify-center text-center p-4">
                <MapPin className="h-8 w-8 text-cerulean animate-bounce mb-2" />
                <span className="font-heading font-bold text-sm text-text-primary">
                  Vaishali Nagar, Jaipur
                </span>
                <span className="text-xs text-text-muted mt-1">
                  Latitude: 26.9075° N, Longitude: 75.7396° E
                </span>
                <span className="text-[11px] text-cerulean mt-2 font-medium">
                  Easily accessible from Jaipur-Ajmer Expressway
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
