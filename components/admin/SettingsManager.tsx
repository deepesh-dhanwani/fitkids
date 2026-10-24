'use client'

import React, { useState } from 'react'
import {
  Settings,
  Building,
  Mail,
  Phone,
  FileText,
  CreditCard,
  Percent,
  Clock,
  Save,
  CheckCircle,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateSiteSettings } from '@/lib/actions/admin'

interface SettingsProps {
  initialSettings: Record<string, string>
}

export function SettingsManager({ initialSettings }: SettingsProps) {
  const [formData, setFormData] = useState<Record<string, string>>(initialSettings)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setSavedSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await updateSiteSettings(formData)
    setSaving(false)
    if (res.success) {
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 4000)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Settings className="h-6 w-6 text-brand-blue" />
            Platform & Company Settings
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Global company profiles, statutory tax parameters, banking details, and service policies.
          </p>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-brand-blue hover:bg-brand-blue/90 text-white font-medium"
        >
          {saving ? (
            'Saving...'
          ) : savedSuccess ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2 text-emerald-400" />
              Settings Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Identity */}
        <Card className="bg-[#14151A] border-[#1F2128] p-6">
          <div className="flex items-center gap-2 mb-4 text-brand-blue">
            <Building className="h-5 w-5" />
            <h2 className="text-base font-semibold text-white">Company Identity & Registration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-brand-muted">Legal Entity Name</Label>
              <Input
                value={formData.company_name || 'FitKids Staffing Private Limited'}
                onChange={(e) => handleChange('company_name', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs text-brand-muted">Tagline</Label>
              <Input
                value={formData.company_tagline || 'Premier Physical Education & PTI Staffing Across Rajasthan'}
                onChange={(e) => handleChange('company_tagline', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-brand-muted">GST Identification Number (GSTIN)</Label>
              <Input
                value={formData.gst_number || '08AABCF1234M1Z5'}
                onChange={(e) => handleChange('gst_number', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1 font-mono"
                required
              />
            </div>
            <div>
              <Label className="text-xs text-brand-muted">PAN Number</Label>
              <Input
                value={formData.pan_number || 'AABCF1234M'}
                onChange={(e) => handleChange('pan_number', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1 font-mono"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs text-brand-muted">Registered Head Office Address</Label>
              <Textarea
                value={formData.company_address || '402, Signature Tower, Tonk Road, Jaipur, Rajasthan 302015'}
                onChange={(e) => handleChange('company_address', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1"
                rows={2}
                required
              />
            </div>
          </div>
        </Card>

        {/* Contact & Support */}
        <Card className="bg-[#14151A] border-[#1F2128] p-6">
          <div className="flex items-center gap-2 mb-4 text-brand-blue">
            <Phone className="h-5 w-5" />
            <h2 className="text-base font-semibold text-white">Public Contact & Support Channels</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs text-brand-muted">Primary Phone</Label>
              <Input
                value={formData.support_phone || '+91 98290 12345'}
                onChange={(e) => handleChange('support_phone', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs text-brand-muted">WhatsApp Hotline</Label>
              <Input
                value={formData.whatsapp_number || '+91 98290 12345'}
                onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-brand-muted">Support Email</Label>
              <Input
                type="email"
                value={formData.support_email || 'contact@fitkidsstaffing.in'}
                onChange={(e) => handleChange('support_email', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1"
                required
              />
            </div>
          </div>
        </Card>

        {/* Banking & Remittance Details */}
        <Card className="bg-[#14151A] border-[#1F2128] p-6">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <CreditCard className="h-5 w-5" />
            <h2 className="text-base font-semibold text-white">Company Bank Account (Printed on Invoices)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs text-brand-muted">Bank Name</Label>
              <Input
                value={formData.bank_name || 'HDFC Bank Ltd'}
                onChange={(e) => handleChange('bank_name', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs text-brand-muted">Current Account Number</Label>
              <Input
                value={formData.bank_account_no || '50200012345678'}
                onChange={(e) => handleChange('bank_account_no', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1 font-mono"
                required
              />
            </div>
            <div>
              <Label className="text-xs text-brand-muted">IFSC Code</Label>
              <Input
                value={formData.bank_ifsc || 'HDFC0001234'}
                onChange={(e) => handleChange('bank_ifsc', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1 font-mono"
                required
              />
            </div>
          </div>
        </Card>

        {/* Operational & Statutory Rates */}
        <Card className="bg-[#14151A] border-[#1F2128] p-6">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Percent className="h-5 w-5" />
            <h2 className="text-base font-semibold text-white">Commercial Rates & Statutory Deduction Norms</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-xs text-brand-muted">Base School Fee / PTI (₹)</Label>
              <Input
                type="number"
                value={formData.base_fee_per_pti || '30000'}
                onChange={(e) => handleChange('base_fee_per_pti', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1 font-mono"
                required
              />
            </div>
            <div>
              <Label className="text-xs text-brand-muted">Substitute SLA (Hours)</Label>
              <Input
                type="number"
                value={formData.substitute_sla_hours || '24'}
                onChange={(e) => handleChange('substitute_sla_hours', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1 font-mono"
                required
              />
            </div>
            <div>
              <Label className="text-xs text-brand-muted">Employee PF Rate (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.pf_rate_employee || '12'}
                onChange={(e) => handleChange('pf_rate_employee', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1 font-mono"
                required
              />
            </div>
            <div>
              <Label className="text-xs text-brand-muted">Employee ESI Rate (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.esi_rate_employee || '0.75'}
                onChange={(e) => handleChange('esi_rate_employee', e.target.value)}
                className="bg-black/40 border-[#1F2128] mt-1 font-mono"
                required
              />
            </div>
          </div>
        </Card>
      </form>
    </div>
  )
}
