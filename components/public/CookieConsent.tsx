'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export function CookieConsent() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const consent = localStorage.getItem('fitkids_cookie_consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('fitkids_cookie_consent', 'accepted')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-jet/95 backdrop-blur-xl border-t border-border shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl">
        <div className="flex items-center space-x-3 text-sm text-text-muted">
          <ShieldCheck className="h-6 w-6 text-cerulean shrink-0" />
          <p>
            We use cookies and basic analytics to enhance school staffing consultations and provide optimal browser performance. By continuing, you agree to our{' '}
            <Link href="/privacy" className="text-cerulean underline underline-offset-2 hover:text-cerulean/80">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <Button variant="outline" size="sm" onClick={() => setShow(false)}>
            Decline
          </Button>
          <Button variant="brand" size="sm" onClick={accept}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  )
}
