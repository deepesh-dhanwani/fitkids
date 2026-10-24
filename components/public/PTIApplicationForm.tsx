'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { submitApplication } from '@/lib/actions/application'
import { useToast } from '@/components/ui/use-toast'
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Upload,
  ShieldCheck,
  Award,
} from 'lucide-react'

export function PTIApplicationForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [appId, setAppId] = useState<string | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    address: '',
    qualification: 'BPED',
    experience: '3',
    sportsAchievements: '',
    preferredCity: 'Jaipur',
    expectedSalary: '22000',
    resumeUrl: '',
    certificatesUrl: '',
    aadhaarUrl: '',
    photoUrl: '',
    consent: false,
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.email || !formData.address) {
        toast({
          variant: 'destructive',
          title: 'Required Fields Missing',
          description: 'Please fill in your name, phone, email, and address before proceeding.',
        })
        return
      }
    }
    if (step === 2) {
      if (!formData.qualification || !formData.preferredCity || !formData.expectedSalary) {
        toast({
          variant: 'destructive',
          title: 'Required Fields Missing',
          description: 'Please enter your qualification, city preference, and expected salary.',
        })
        return
      }
    }
    setStep((s) => s + 1)
  }

  const handlePrev = () => setStep((s) => Math.max(1, s - 1))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.consent) {
      toast({
        variant: 'destructive',
        title: 'Consent Required',
        description: 'You must consent to background and degree verification.',
      })
      return
    }

    setLoading(true)
    const res = await submitApplication({
      ...formData,
      experience: Number(formData.experience) || 0,
      expectedSalary: Number(formData.expectedSalary) || 20000,
    })
    setLoading(false)

    if (res.success && res.applicationId) {
      setAppId(res.applicationId)
      toast({
        title: 'Application Submitted!',
        description: `Your application ID is ${res.applicationId}`,
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: res.error || 'Failed to submit application',
      })
    }
  }

  if (appId) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Application Received
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-1">
          Welcome to FitKids, {formData.name}!
        </h3>
        <p className="mt-2 text-sm text-text-muted max-w-lg mx-auto">
          Your credentials have been logged in our Rajasthan physical instructor recruitment registry.
        </p>

        <div className="my-8 inline-block rounded-2xl border border-border bg-card p-6 text-left max-w-md w-full">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
            <span className="text-xs text-text-muted">Application ID</span>
            <span className="font-mono font-bold text-cerulean text-sm">{appId}</span>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
            <span className="text-xs text-text-muted">Qualification</span>
            <span className="font-semibold text-text-primary text-sm">{formData.qualification}</span>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
            <span className="text-xs text-text-muted">Preferred City</span>
            <span className="font-semibold text-text-primary text-sm">{formData.preferredCity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Next Step</span>
            <span className="text-xs text-emerald-400 font-medium">Telephonic Screening (2-3 days)</span>
          </div>
        </div>

        <p className="text-xs text-text-muted max-w-sm mx-auto">
          A confirmation email with your application reference has been sent to <strong>{formData.email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Step Progress Indicators */}
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 -z-0" />
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-heading font-bold text-sm transition-all duration-300 ${
              s === step
                ? 'bg-gradient-brand text-white ring-4 ring-cerulean/20 scale-110'
                : s < step
                ? 'bg-emerald-500 text-white'
                : 'bg-card border border-border text-text-muted'
            }`}
          >
            {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xs font-semibold text-text-muted px-1">
        <span className={step === 1 ? 'text-cerulean' : ''}>1. Personal Info</span>
        <span className={step === 2 ? 'text-cerulean' : ''}>2. Qualifications</span>
        <span className={step === 3 ? 'text-cerulean' : ''}>3. Documents & Submit</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name as per Aadhaar *</Label>
              <Input
                id="name"
                placeholder="e.g. Ramesh Singh Rathore"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="bg-card-bg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Phone (WhatsApp enabled) *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98290 00000"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                  className="bg-card-bg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className="bg-card-bg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Permanent / Current Address in Rajasthan *</Label>
                <Input
                  id="address"
                  placeholder="e.g. 15, Shastri Nagar, Jaipur"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  required
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="button" variant="brand" onClick={handleNext}>
                <span>Next: Qualifications</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Qualification & Experience */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="qualification">Highest PE Qualification *</Label>
                <Select
                  value={formData.qualification}
                  onValueChange={(val) => handleChange('qualification', val)}
                >
                  <SelectTrigger className="bg-card-bg">
                    <SelectValue placeholder="Select Qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BPED">B.P.Ed (Bachelor of Physical Education)</SelectItem>
                    <SelectItem value="MPED">M.P.Ed (Master of Physical Education)</SelectItem>
                    <SelectItem value="DPED">D.P.Ed (Diploma in Physical Education)</SelectItem>
                    <SelectItem value="OTHER">Other Certified Sports Coaching Diploma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of School Teaching / Coaching Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g. 4"
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="preferredCity">Preferred Working City in Rajasthan *</Label>
                <Select
                  value={formData.preferredCity}
                  onValueChange={(val) => handleChange('preferredCity', val)}
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
                    <SelectItem value="Anywhere in Rajasthan">Any City in Rajasthan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedSalary">Expected Monthly In-Hand Salary (INR) *</Label>
                <Input
                  id="expectedSalary"
                  type="number"
                  placeholder="e.g. 24000"
                  value={formData.expectedSalary}
                  onChange={(e) => handleChange('expectedSalary', e.target.value)}
                  required
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sportsAchievements">Sports Achievements / Specializations</Label>
              <Textarea
                id="sportsAchievements"
                rows={3}
                placeholder="e.g. State Gold Medal in 400m Athletics, Certified Cricket Umpire, NIS Football..."
                value={formData.sportsAchievements}
                onChange={(e) => handleChange('sportsAchievements', e.target.value)}
                className="bg-card-bg"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrev}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Button>
              <Button type="button" variant="brand" onClick={handleNext}>
                <span>Next: Document Links</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Document Links & Consent */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="rounded-2xl border border-border bg-card-bg/60 p-4 text-xs text-text-muted leading-relaxed">
              <p>
                Provide links to your files (Google Drive, Dropbox, or OneDrive shareable links) or upload credentials below. You can also bring physical originals during the demo interview.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="resumeUrl">Resume / CV Document URL</Label>
                <Input
                  id="resumeUrl"
                  placeholder="https://drive.google.com/..."
                  value={formData.resumeUrl}
                  onChange={(e) => handleChange('resumeUrl', e.target.value)}
                  className="bg-card-bg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificatesUrl">B.P.Ed / D.P.Ed Degree Certificate URL</Label>
                <Input
                  id="certificatesUrl"
                  placeholder="https://drive.google.com/..."
                  value={formData.certificatesUrl}
                  onChange={(e) => handleChange('certificatesUrl', e.target.value)}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="aadhaarUrl">Aadhaar Card Front/Back URL</Label>
                <Input
                  id="aadhaarUrl"
                  placeholder="https://drive.google.com/..."
                  value={formData.aadhaarUrl}
                  onChange={(e) => handleChange('aadhaarUrl', e.target.value)}
                  className="bg-card-bg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photoUrl">Passport Size Photograph URL</Label>
                <Input
                  id="photoUrl"
                  placeholder="https://drive.google.com/..."
                  value={formData.photoUrl}
                  onChange={(e) => handleChange('photoUrl', e.target.value)}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <Checkbox
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleChange('consent', checked === true)}
                  className="mt-1"
                />
                <span className="text-xs text-text-muted leading-relaxed">
                  I hereby declare that all details and degrees provided are authentic. I agree to undergo mandatory police verification, degree verification, and child safety compliance check as per FitKids Staffing norms.
                </span>
              </label>
            </div>

            <div className="pt-4 flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrev}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Button>
              <Button
                type="submit"
                variant="brand"
                size="lg"
                disabled={loading}
                className="px-8"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  'Complete & Submit Application'
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
