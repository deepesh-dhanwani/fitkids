import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, PhoneCall } from 'lucide-react'

export function CtaBand() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-brand">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
          Ready to Elevate Your School’s Physical Education Program?
        </h2>
        <p className="mt-4 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Book a 15-minute consultation with our Rajasthan operations head or schedule a free on-campus PTI demo class this week.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-13 px-8 text-base bg-jet text-white hover:bg-jet/90 shadow-2xl"
          >
            <Link href="/for-schools" className="flex items-center space-x-2">
              <span>Request School Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-13 px-8 text-base bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            <Link href="/careers">Apply as a PTI Coach</Link>
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-6 text-xs text-white/80 font-medium">
          <span>✓ Zero upfront fees</span>
          <span>✓ 24-hour backup substitute</span>
          <span>✓ Month-to-month contracts</span>
        </div>
      </div>
    </section>
  )
}
