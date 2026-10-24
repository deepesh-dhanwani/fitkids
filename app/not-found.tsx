import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E8EAF0] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#FF2D8A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#14151A] border border-[#1F2128] text-brand-blue shadow-2xl">
          <span className="text-3xl font-black font-mono">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-brand-muted leading-relaxed">
            The playground or operational link you are looking for has moved, expired, or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button asChild className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue/90 text-white font-medium">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto border-[#1F2128] text-white hover:bg-white/5">
            <Link href="/contact">
              <Search className="h-4 w-4 mr-2" />
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
