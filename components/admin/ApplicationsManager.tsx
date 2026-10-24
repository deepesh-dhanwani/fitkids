'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { updateApplicationStatus, approveApplication } from '@/lib/actions/admin'
import { formatDate, formatCurrency } from '@/lib/utils'
import {
  Search,
  CheckCircle2,
  XCircle,
  Calendar,
  ExternalLink,
  Loader2,
  UserCheck,
  PlayCircle,
  User,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'

interface ApplicationItem {
  id: string
  applicationId: string
  name: string
  phone: string
  email: string
  dateOfBirth: Date | string | null
  qualification: string
  experience: number
  sportsAchievements: string
  preferredCity: string
  expectedSalary: number
  address: string
  status: string
  rejectionReason: string
  interviewDate: Date | string | null
  demoDate: Date | string | null
  resumeUrl: string
  certificatesUrl: string
  aadhaarUrl: string
  photoUrl: string
  notes: string
  createdAt: Date | string
}

const statusTabs = [
  'ALL',
  'PENDING',
  'SHORTLISTED',
  'INTERVIEWED',
  'DEMO_SCHEDULED',
  'APPROVED',
  'REJECTED',
]

export function ApplicationsManager({
  initialApplications,
}: {
  initialApplications: ApplicationItem[]
}) {
  const [apps, setApps] = useState<ApplicationItem[]>(initialApplications)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('ALL')
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const filtered = apps.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.applicationId.toLowerCase().includes(search.toLowerCase()) ||
      a.preferredCity.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === 'ALL' || a.status === activeTab
    return matchesSearch && matchesTab
  })

  const handleStatusUpdate = async (id: string, status: string, notes?: string) => {
    setLoading(true)
    const res = await updateApplicationStatus(id, status, notes)
    setLoading(false)
    if (res.success) {
      setApps((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status, notes: notes || a.notes } : a))
      )
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status, notes: notes || selectedApp.notes })
      }
      toast({ title: 'Application Updated', description: `Moved to ${status}.` })
    }
  }

  const handleApprove = async (applicationId: string) => {
    setLoading(true)
    const res = await approveApplication(applicationId)
    setLoading(false)
    if (res.success) {
      setApps((prev) =>
        prev.map((a) => (a.id === applicationId ? { ...a, status: 'APPROVED' } : a))
      )
      setSelectedApp(null)
      toast({
        title: 'Applicant Approved!',
        description: 'New PTI record created and added to active roster.',
      })
    } else {
      toast({ variant: 'destructive', title: 'Error', description: res.error })
    }
  }

  const handleRejectSubmit = async (e: React.FormEvent) => {
    if (!selectedApp) return
    e.preventDefault()
    setLoading(true)
    const res = await updateApplicationStatus(
      selectedApp.id,
      'REJECTED',
      selectedApp.notes,
      rejectionReason
    )
    setLoading(false)
    if (res.success) {
      setApps((prev) =>
        prev.map((a) =>
          a.id === selectedApp.id
            ? { ...a, status: 'REJECTED', rejectionReason }
            : a
        )
      )
      setRejectOpen(false)
      setSelectedApp(null)
      toast({ title: 'Application Rejected', description: 'Status marked REJECTED.' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input
            placeholder="Search candidate name, ID, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border border-border rounded-xl p-1 bg-card">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-cerulean text-white shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-semibold text-xs">App ID</TableHead>
              <TableHead className="font-semibold text-xs">Applicant Name</TableHead>
              <TableHead className="font-semibold text-xs">Qualification</TableHead>
              <TableHead className="font-semibold text-xs">Experience</TableHead>
              <TableHead className="font-semibold text-xs">Preferred City</TableHead>
              <TableHead className="font-semibold text-xs">Expected</TableHead>
              <TableHead className="font-semibold text-xs">Status</TableHead>
              <TableHead className="font-semibold text-xs text-right">Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((app) => (
              <TableRow key={app.id} className="hover:bg-muted/40 transition-colors">
                <TableCell className="font-mono text-xs font-bold text-cerulean">
                  {app.applicationId}
                </TableCell>
                <TableCell className="font-medium text-text-primary text-xs">
                  <div>
                    <span className="block">{app.name}</span>
                    <span className="text-[11px] text-text-muted">{app.phone}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-semibold text-text-primary">
                  {app.qualification}
                </TableCell>
                <TableCell className="text-xs text-text-muted">
                  {app.experience} years
                </TableCell>
                <TableCell className="text-xs text-text-primary">
                  {app.preferredCity}
                </TableCell>
                <TableCell className="font-mono text-xs text-text-muted">
                  {formatCurrency(app.expectedSalary)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      app.status === 'APPROVED'
                        ? 'success'
                        : app.status === 'REJECTED'
                        ? 'destructive'
                        : app.status === 'SHORTLISTED'
                        ? 'info'
                        : 'warning'
                    }
                    className="text-[10px]"
                  >
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedApp(app)}
                    className="h-8 text-xs"
                  >
                    Review Dossier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-text-muted">
            No applications match this filter.
          </div>
        )}
      </div>

      {/* REVIEW DRAWER / DIALOG */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          {selectedApp && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cerulean">
                    {selectedApp.applicationId}
                  </span>
                  <Badge variant="outline" className="text-xs font-bold">
                    {selectedApp.status}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl font-bold font-heading text-text-primary mt-1">
                  {selectedApp.name}
                </DialogTitle>
                <p className="text-xs text-text-muted">
                  Applied on {formatDate(selectedApp.createdAt)} • Preferred Base: {selectedApp.preferredCity}
                </p>
              </DialogHeader>

              {/* Data Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-border bg-card-bg">
                  <span className="text-text-muted block">Phone</span>
                  <span className="font-semibold text-text-primary text-sm mt-0.5 block">
                    {selectedApp.phone}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card-bg">
                  <span className="text-text-muted block">Email</span>
                  <span className="font-semibold text-text-primary text-sm mt-0.5 block truncate">
                    {selectedApp.email}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card-bg">
                  <span className="text-text-muted block">Expected Salary</span>
                  <span className="font-bold text-emerald-400 text-sm mt-0.5 block font-mono">
                    {formatCurrency(selectedApp.expectedSalary)}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card-bg">
                  <span className="text-text-muted block">Qualification</span>
                  <span className="font-semibold text-text-primary text-sm mt-0.5 block">
                    {selectedApp.qualification}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card-bg">
                  <span className="text-text-muted block">Experience</span>
                  <span className="font-semibold text-text-primary text-sm mt-0.5 block">
                    {selectedApp.experience} Years
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card-bg">
                  <span className="text-text-muted block">Residential Address</span>
                  <span className="font-medium text-text-primary mt-0.5 block truncate">
                    {selectedApp.address}
                  </span>
                </div>
              </div>

              {selectedApp.sportsAchievements && (
                <div className="p-3 rounded-xl border border-border bg-card-bg text-xs">
                  <span className="text-text-muted font-semibold block mb-1">
                    Sports Achievements & Certifications:
                  </span>
                  <p className="text-text-primary leading-relaxed">
                    {selectedApp.sportsAchievements}
                  </p>
                </div>
              )}

              {/* Document links */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider block">
                  Uploaded Document Credentials:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl border border-border bg-card-bg flex items-center justify-between">
                    <span className="text-text-muted">Resume / CV:</span>
                    {selectedApp.resumeUrl ? (
                      <a
                        href={selectedApp.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cerulean font-semibold flex items-center hover:underline"
                      >
                        View Link <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    ) : (
                      <span className="text-text-muted italic">Not uploaded</span>
                    )}
                  </div>
                  <div className="p-2.5 rounded-xl border border-border bg-card-bg flex items-center justify-between">
                    <span className="text-text-muted">Degree Certificate:</span>
                    {selectedApp.certificatesUrl ? (
                      <a
                        href={selectedApp.certificatesUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cerulean font-semibold flex items-center hover:underline"
                      >
                        View Link <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    ) : (
                      <span className="text-text-muted italic">Not uploaded</span>
                    )}
                  </div>
                </div>
              </div>

              {selectedApp.rejectionReason && (
                <div className="p-3 rounded-xl border border-destructive/30 bg-destructive/10 text-xs">
                  <span className="text-red-400 font-bold block mb-1">Rejection Reason:</span>
                  <p className="text-text-primary">{selectedApp.rejectionReason}</p>
                </div>
              )}

              {/* Action Buttons Workflow */}
              <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedApp.status !== 'SHORTLISTED' && selectedApp.status !== 'APPROVED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(selectedApp.id, 'SHORTLISTED')}
                    >
                      Shortlist
                    </Button>
                  )}

                  {selectedApp.status !== 'INTERVIEWED' && selectedApp.status !== 'APPROVED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(selectedApp.id, 'INTERVIEWED')}
                    >
                      Schedule Interview
                    </Button>
                  )}

                  {selectedApp.status !== 'DEMO_SCHEDULED' && selectedApp.status !== 'APPROVED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(selectedApp.id, 'DEMO_SCHEDULED')}
                    >
                      Schedule Demo
                    </Button>
                  )}

                  {selectedApp.status !== 'APPROVED' && (
                    <Button
                      variant="brand"
                      size="sm"
                      disabled={loading}
                      onClick={() => handleApprove(selectedApp.id)}
                      className="flex items-center space-x-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Approve & Create PTI</span>
                    </Button>
                  )}

                  {selectedApp.status !== 'REJECTED' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setRejectionReason('')
                        setRejectOpen(true)
                      }}
                    >
                      Reject
                    </Button>
                  )}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedApp(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* REJECT REASON MODAL */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-heading text-text-primary">
              Reject Application
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleRejectSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Reason for Rejection *</Label>
              <Textarea
                required
                rows={3}
                placeholder="e.g. Ineligible degree, failed demo evaluation, salary mismatch..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="bg-card-bg"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setRejectOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive" size="sm" disabled={loading}>
                {loading ? 'Rejecting...' : 'Confirm Rejection'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
