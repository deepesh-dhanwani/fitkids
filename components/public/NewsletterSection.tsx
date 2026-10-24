'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { subscribeNewsletter } from '@/lib/actions/newsletter'
import { useToast } from '@/components/ui/use-toast'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    const res = await subscribeNewsletter(email)
    setLoading(false)

    if (res.success) {
      setSubscribed(true)
      setEmail('')
      toast({
        title: 'Subscribed!',
        description: res.message,
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: res.error,
      })
    }
  }

  return (
    <section className="py-20 bg-card-bg border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cerulean/15 text-cerulean mx-auto mb-4">
          <Mail className="h-6 w-6" />
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Stay Updated on School Sports & PE Regulations
        </h3>
        <p className="mt-2 text-sm text-text-muted max-w-xl mx-auto">
          Get monthly insights on CBSE physical education guidelines, inter-school tournament dates, and fitness pedagogy sent straight to your inbox.
        </p>

        {subscribed ? (
          <div className="mt-8 flex items-center justify-center space-x-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-3 px-6 rounded-xl max-w-md mx-auto">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">You are subscribed! Thank you.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your principal or school email..."
              required
              className="bg-card text-foreground border-border h-11"
            />
            <Button type="submit" variant="brand" disabled={loading} className="h-11 px-6 shrink-0">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
