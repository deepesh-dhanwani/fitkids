'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { submitEnquiry } from '@/lib/actions/enquiry'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Send, CheckCircle2 } from 'lucide-react'

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  })

  const handleChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await submitEnquiry({
      schoolName: formData.subject || 'Contact Inquiry',
      contactPerson: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: 'Jaipur',
      board: 'CBSE',
      students: 0,
      ptisNeeded: 1,
      message: `${formData.subject}: ${formData.message}`,
    })

    setLoading(false)

    if (res.success) {
      setSubmitted(true)
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting FitKids Staffing. We will reply shortly.',
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: res.error || 'Failed to send message',
      })
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
        <h3 className="font-heading text-xl font-bold text-text-primary">
          Message Delivered!
        </h3>
        <p className="mt-1 text-xs text-text-muted">
          Our team in Vaishali Nagar, Jaipur has received your message and will respond within 24 hours.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
          }}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="c-name">Your Full Name *</Label>
          <Input
            id="c-name"
            placeholder="e.g. Dr. Alok Mathur"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            className="bg-card-bg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-phone">Phone Number *</Label>
          <Input
            id="c-phone"
            type="tel"
            placeholder="+91 98290 00000"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
            className="bg-card-bg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="c-email">Email Address *</Label>
          <Input
            id="c-email"
            type="email"
            placeholder="alok@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            className="bg-card-bg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-subject">Subject *</Label>
          <Input
            id="c-subject"
            placeholder="e.g. PTI Staffing Inquiry / Partnership"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            required
            className="bg-card-bg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="c-message">How can we help your institution? *</Label>
        <Textarea
          id="c-message"
          rows={4}
          placeholder="Describe your requirements, school details, or questions..."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          required
          className="bg-card-bg"
        />
      </div>

      <Button type="submit" variant="brand" size="lg" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending Message...
          </>
        ) : (
          <span className="flex items-center space-x-2">
            <span>Send Direct Message</span>
            <Send className="h-4 w-4 ml-1" />
          </span>
        )}
      </Button>
    </form>
  )
}
