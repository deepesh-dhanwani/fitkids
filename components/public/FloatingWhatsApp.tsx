'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

export function FloatingWhatsApp() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210'
  const message = encodeURIComponent(
    'Hello FitKids Staffing! I am interested in hiring a qualified PTI teacher for our school in Rajasthan.'
  )
  const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 rounded-full bg-[#25D366] text-white px-4 py-3 shadow-2xl hover:bg-[#20ba5a] hover:scale-105 transition-all duration-300 group"
      aria-label="Chat with FitKids Staffing on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 fill-white text-[#25D366]" />
      <span className="text-sm font-semibold pr-1 hidden sm:inline-block">
        Chat with Us
      </span>
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
      </span>
    </a>
  )
}
