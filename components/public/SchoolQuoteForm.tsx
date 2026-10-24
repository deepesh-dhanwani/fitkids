'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { submitEnquiry } from '@/lib/actions/enquiry'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, CheckCircle2, Send } from 'lucide-react'

export function SchoolQuoteForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: 'Jaipur',
    board: 'CBSE',
    students: '1200',
    ptisNeeded: '1',
    preferredStart: '',
    message: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await submitEnquiry({
      ...formData,
      students: Number(formData.students) || 0,
      ptisNeeded: Number(formData.ptisNeeded) || 1,
    })

    setLoading(false)

    if (res.success) {
      setSubmitted(true)
      toast({
        title: 'Inquiry Submitted Successfully!',
        description: res.message,
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: res.error,
      })
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-text-primary">
          Thank You, {formData.contactPerson}!
        </h3>
        <p className="mt-2 text-sm text-text-muted max-w-md mx-auto">
          We have received your request for <strong>{formData.schoolName}</strong> ({formData.city}). Our regional staffing manager will reach out at <strong>{formData.phone}</strong> within 24 business hours to arrange demo classes.
        </p>
        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false)
              setFormData({
                schoolName: '',
                contactPerson: '',
                phone: '',
                email: '',
                city: 'Jaipur',
                board: 'CBSE',
                students: '1000',
                ptisNeeded: '1',
                preferredStart: '',
                message: '',
              })
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="schoolName">School / Institution Name *</Label>
          <Input
            id="schoolName"
            placeholder="e.g. St. Stephen's Academy"
            value={formData.schoolName}
            onChange={(e) => handleChange('schoolName', e.target.value)}
            required
            className="bg-card-bg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPerson">Principal / Sports Director Name *</Label>
          <Input
            id="contactPerson"
            placeholder="e.g. Dr. Rajesh Sharma"
            value={formData.contactPerson}
            onChange={(e) => handleChange('contactPerson', e.target.value)}
            required
            className="bg-card-bg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="phone">Contact Mobile Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98290 12345"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
            className="bg-card-bg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Official Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="principal@school.edu.in"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            className="bg-card-bg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="city">City in Rajasthan *</Label>
          <Select
            value={formData.city}
            onValueChange={(val) => handleChange('city', val)}
          >
            <SelectTrigger className="bg-card-bg">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Jaipur">Jaipur</SelectItem>
              <SelectItem value="Jodhpur">Jodhpur</SelectItem>
              <SelectItem value="Udaipur">Udaipur</SelectItem>
              <SelectItem value="Kota">Kota</SelectItem>
              <SelectItem value="Ajmer">Ajmer</SelectItem>
              <SelectItem value="Bikaner">Bikaner</SelectItem>
              <SelectItem value="Alwar">Alwar</SelectItem>
              <SelectItem value="Bhilwara">Bhilwara</SelectItem>
              <SelectItem value="Sikar">Sikar</SelectItem>
              <SelectItem value="Chittorgarh">Chittorgarh</SelectItem>
              <SelectItem value="Other Rajasthan">Other Rajasthan Location</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="board">Curriculum Board</Label>
          <Select
            value={formData.board}
            onValueChange={(val) => handleChange('board', val)}
          >
            <SelectTrigger className="bg-card-bg">
              <SelectValue placeholder="Select Board" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CBSE">CBSE</SelectItem>
              <SelectItem value="ICSE">ICSE / CISCE</SelectItem>
              <SelectItem value="RBSE">RBSE (Rajasthan Board)</SelectItem>
              <SelectItem value="IB/Cambridge">IB / Cambridge</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="space-y-2">
          <Label htmlFor="ptisNeeded">PTIs Required *</Label>
          <Select
            value={formData.ptisNeeded}
            onValueChange={(val) => handleChange('ptisNeeded', val)}
          >
            <SelectTrigger className="bg-card-bg">
              <SelectValue placeholder="Quantity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Instructor</SelectItem>
              <SelectItem value="2">2 Instructors</SelectItem>
              <SelectItem value="3">3 Instructors</SelectItem>
              <SelectItem value="4">4 Instructors</SelectItem>
              <SelectItem value="5">5+ Instructors</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="students">Approx. Student Strength</Label>
          <Input
            id="students"
            type="number"
            placeholder="e.g. 1500"
            value={formData.students}
            onChange={(e) => handleChange('students', e.target.value)}
            className="bg-card-bg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredStart">Preferred Start Date</Label>
          <Input
            id="preferredStart"
            type="date"
            value={formData.preferredStart}
            onChange={(e) => handleChange('preferredStart', e.target.value)}
            className="bg-card-bg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Sports Specialization / Additional Instructions</Label>
        <Textarea
          id="message"
          rows={3}
          placeholder="e.g. Looking for female instructor with basketball or athletics specialization for senior wing..."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className="bg-card-bg"
        />
      </div>

      <Button
        type="submit"
        variant="brand"
        size="lg"
        disabled={loading}
        className="w-full text-base h-12 shadow-xl shadow-cerulean/20"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Submitting Request...
          </>
        ) : (
          <span className="flex items-center justify-center space-x-2">
            <span>Submit Quotation Request & Schedule Demo</span>
            <Send className="h-4 w-4 ml-1" />
          </span>
        )}
      </Button>

      <p className="text-[11px] text-center text-text-muted">
        🔒 We respect your privacy. No spam. A senior regional coordinator will contact you directly.
      </p>
    </form>
  )
}
