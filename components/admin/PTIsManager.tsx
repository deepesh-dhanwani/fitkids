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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { createPTI, updatePTI, togglePTIVerification } from '@/lib/actions/admin'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  Plus,
  Search,
  ShieldCheck,
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  CreditCard,
  Eye,
  EyeOff,
  Edit,
  Loader2,
} from 'lucide-react'

interface PTIWithRelations {
  id: string
  name: string
  phone: string
  email: string
  dateOfBirth: Date | string | null
  qualification: string
  experience: number
  sportsAchievements: string
  preferredCity: string
  expectedSalary: number
  currentSalary: number
  employmentStatus: string
  address: string
  bankName: string
  accountNumber: string
  ifscCode: string
  pfNumber: string
  esiNumber: string
  policeVerified: boolean
  medicalFitness: boolean
  performanceNotes: string
  aadhaarNumber: string
  panNumber: string
  placements: Array<{
    id: string
    salary: number
    schoolFee: number
    status: string
    startDate: Date | string
    school: { name: string; city: string }
  }>
  attendance: Array<{
    id: string
    month: number
    year: number
    presentDays: number
    absentDays: number
  }>
  payrolls: Array<{
    id: string
    month: number
    year: number
    netSalary: number
    status: string
  }>
}

export function PTIsManager({
  initialPTIs,
}: {
  initialPTIs: PTIWithRelations[]
}) {
  const [ptis, setPtis] = useState<PTIWithRelations[]>(initialPTIs)
  const [search, setSearch] = useState('')
  const [qualificationFilter, setQualificationFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [cityFilter, setCityFilter] = useState('ALL')
  const [selectedPTI, setSelectedPTI] = useState<PTIWithRelations | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [showSensitive, setShowSensitive] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    qualification: 'BPED',
    experience: 3,
    preferredCity: 'Jaipur',
    expectedSalary: 22000,
    currentSalary: 22000,
    address: '',
    sportsAchievements: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    pfNumber: '',
    esiNumber: '',
    aadhaarNumber: '',
    panNumber: '',
    employmentStatus: 'ACTIVE',
  })

  const filtered = ptis.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.preferredCity.toLowerCase().includes(search.toLowerCase()) ||
      p.sportsAchievements.toLowerCase().includes(search.toLowerCase())
    const matchesQual = qualificationFilter === 'ALL' || p.qualification === qualificationFilter
    const matchesStatus = statusFilter === 'ALL' || p.employmentStatus === statusFilter
    const matchesCity = cityFilter === 'ALL' || p.preferredCity === cityFilter
    return matchesSearch && matchesQual && matchesStatus && matchesCity
  })

  const handleToggleVerification = async (
    ptiId: string,
    field: 'policeVerified' | 'medicalFitness',
    val: boolean
  ) => {
    const res = await togglePTIVerification(ptiId, field, val)
    if (res.success) {
      setPtis((prev) =>
        prev.map((p) => (p.id === ptiId ? { ...p, [field]: val } : p))
      )
      if (selectedPTI && selectedPTI.id === ptiId) {
        setSelectedPTI({ ...selectedPTI, [field]: val })
      }
      toast({
        title: 'Verification Updated',
        description: `${field === 'policeVerified' ? 'Police' : 'Medical'} clearance status set to ${val ? 'Verified' : 'Pending'}.`,
      })
    }
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await createPTI(formData)
    setLoading(false)
    if (res.success && res.pti) {
      setPtis([
        { ...(res.pti as any), placements: [], attendance: [], payrolls: [] },
        ...ptis,
      ])
      setCreateOpen(false)
      toast({ title: 'PTI Created', description: `${formData.name} added to roster.` })
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    if (!selectedPTI) return
    e.preventDefault()
    setLoading(true)
    const res = await updatePTI(selectedPTI.id, formData)
    setLoading(false)
    if (res.success && res.pti) {
      setPtis((prev) =>
        prev.map((p) => (p.id === selectedPTI.id ? { ...p, ...(res.pti as any) } : p))
      )
      setSelectedPTI({ ...selectedPTI, ...(res.pti as any) })
      setEditOpen(false)
      toast({ title: 'PTI Updated', description: 'Record updated successfully.' })
    }
  }

  const openEdit = (pti: PTIWithRelations) => {
    setFormData({
      name: pti.name,
      phone: pti.phone,
      email: pti.email,
      qualification: pti.qualification,
      experience: pti.experience,
      preferredCity: pti.preferredCity,
      expectedSalary: pti.expectedSalary,
      currentSalary: pti.currentSalary,
      address: pti.address,
      sportsAchievements: pti.sportsAchievements,
      bankName: pti.bankName,
      accountNumber: pti.accountNumber,
      ifscCode: pti.ifscCode,
      pfNumber: pti.pfNumber,
      esiNumber: pti.esiNumber,
      aadhaarNumber: pti.aadhaarNumber,
      panNumber: pti.panNumber,
      employmentStatus: pti.employmentStatus,
    })
    setEditOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search PTI name, city, sports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>

          <Select value={qualificationFilter} onValueChange={setQualificationFilter}>
            <SelectTrigger className="w-32 bg-card border-border">
              <SelectValue placeholder="Degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Degrees</SelectItem>
              <SelectItem value="BPED">B.P.Ed</SelectItem>
              <SelectItem value="MPED">M.P.Ed</SelectItem>
              <SelectItem value="DPED">D.P.Ed</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-card border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="INACTIVE">INACTIVE</SelectItem>
              <SelectItem value="ON_LEAVE">ON_LEAVE</SelectItem>
              <SelectItem value="TERMINATED">TERMINATED</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => {
            setFormData({
              name: '',
              phone: '',
              email: '',
              qualification: 'BPED',
              experience: 3,
              preferredCity: 'Jaipur',
              expectedSalary: 22000,
              currentSalary: 22000,
              address: '',
              sportsAchievements: '',
              bankName: '',
              accountNumber: '',
              ifscCode: '',
              pfNumber: '',
              esiNumber: '',
              aadhaarNumber: '',
              panNumber: '',
              employmentStatus: 'ACTIVE',
            })
            setCreateOpen(true)
          }}
          variant="brand"
          size="sm"
          className="flex items-center space-x-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Add PTI</span>
        </Button>
      </div>

      {/* PTIs Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-semibold text-xs">Instructor Name</TableHead>
              <TableHead className="font-semibold text-xs">Degree & Exp</TableHead>
              <TableHead className="font-semibold text-xs">City & Sports</TableHead>
              <TableHead className="font-semibold text-xs">Current Stipend</TableHead>
              <TableHead className="font-semibold text-xs">Verification</TableHead>
              <TableHead className="font-semibold text-xs">Status</TableHead>
              <TableHead className="font-semibold text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((pti) => (
              <TableRow key={pti.id} className="hover:bg-muted/40 transition-colors">
                <TableCell className="font-medium text-text-primary">
                  <div className="flex items-center space-x-2.5">
                    <div className="h-8 w-8 rounded-full bg-cerulean/15 text-cerulean flex items-center justify-center font-bold text-xs shrink-0">
                      {pti.name[0]}
                    </div>
                    <div>
                      <span className="block">{pti.name}</span>
                      <span className="text-[11px] text-text-muted">{pti.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs">
                    <span className="font-semibold text-text-primary">{pti.qualification}</span>
                    <span className="text-[11px] text-text-muted">{pti.experience} yrs exp</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs max-w-[200px]">
                    <span className="text-text-primary">{pti.preferredCity}</span>
                    <span className="text-[11px] text-text-muted truncate">
                      {pti.sportsAchievements || 'General PE'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs font-semibold text-text-primary">
                  {pti.currentSalary > 0 ? formatCurrency(pti.currentSalary) : 'Unassigned'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span
                      title={`Police: ${pti.policeVerified ? 'Verified' : 'Pending'}`}
                      className={`p-1 rounded-md border text-[10px] flex items-center space-x-1 ${
                        pti.policeVerified
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-border text-text-muted'
                      }`}
                    >
                      <ShieldCheck className="h-3 w-3" />
                      <span>POLICE</span>
                    </span>
                    <span
                      title={`Medical: ${pti.medicalFitness ? 'Cleared' : 'Pending'}`}
                      className={`p-1 rounded-md border text-[10px] flex items-center space-x-1 ${
                        pti.medicalFitness
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-border text-text-muted'
                      }`}
                    >
                      <HeartPulse className="h-3 w-3" />
                      <span>MED</span>
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      pti.employmentStatus === 'ACTIVE'
                        ? 'success'
                        : pti.employmentStatus === 'ON_LEAVE'
                        ? 'warning'
                        : 'secondary'
                    }
                    className="text-[10px]"
                  >
                    {pti.employmentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPTI(pti)
                      setShowSensitive(false)
                    }}
                    className="h-8 text-xs"
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEdit(pti)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-3.5 w-3.5 text-text-muted" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-text-muted">
            No PTI instructors found.
          </div>
        )}
      </div>

      {/* DETAIL MODAL WITH TABS */}
      <Dialog open={!!selectedPTI} onOpenChange={() => setSelectedPTI(null)}>
        <DialogContent className="max-w-3xl bg-card border-border">
          {selectedPTI && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cerulean">
                    PTI Instructor Dossier
                  </span>
                  <Badge variant="outline" className="text-xs font-bold">
                    {selectedPTI.employmentStatus}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl font-bold font-heading text-text-primary mt-1">
                  {selectedPTI.name}
                </DialogTitle>
                <p className="text-xs text-text-muted">
                  {selectedPTI.qualification} • {selectedPTI.experience} Years Experience • Base: {selectedPTI.preferredCity}
                </p>
              </DialogHeader>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="profile">Profile & Bio</TabsTrigger>
                  <TabsTrigger value="verification">Verification Toggles</TabsTrigger>
                  <TabsTrigger value="placements">
                    Placements ({selectedPTI.placements.length})
                  </TabsTrigger>
                  <TabsTrigger value="bank">Banking & Statutory</TabsTrigger>
                </TabsList>

                {/* Tab 1: Profile */}
                <TabsContent value="profile" className="space-y-4 pt-3 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Phone</span>
                      <span className="font-semibold text-text-primary text-sm mt-0.5 block">
                        {selectedPTI.phone}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Email</span>
                      <span className="font-semibold text-text-primary text-sm mt-0.5 block truncate">
                        {selectedPTI.email}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Monthly Salary</span>
                      <span className="font-bold text-emerald-400 text-sm mt-0.5 block font-mono">
                        {formatCurrency(selectedPTI.currentSalary || selectedPTI.expectedSalary)}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg col-span-2 sm:col-span-3">
                      <span className="text-text-muted block">Permanent Address</span>
                      <span className="font-medium text-text-primary mt-0.5 block">
                        {selectedPTI.address || 'Address on file with central desk'}
                      </span>
                    </div>
                  </div>

                  {selectedPTI.sportsAchievements && (
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted font-semibold block mb-1">
                        Sports Accreditations & Medals:
                      </span>
                      <p className="text-text-primary leading-relaxed">
                        {selectedPTI.sportsAchievements}
                      </p>
                    </div>
                  )}

                  {selectedPTI.performanceNotes && (
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted font-semibold block mb-1">
                        Supervisor Feedback:
                      </span>
                      <p className="text-text-primary leading-relaxed">
                        {selectedPTI.performanceNotes}
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Tab 2: Verification Toggles */}
                <TabsContent value="verification" className="space-y-4 pt-3 text-xs">
                  <div className="rounded-xl border border-border bg-card-bg p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-text-primary flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-2 text-cerulean" />
                        Police Clearance Certificate (PCC)
                      </h4>
                      <p className="text-text-muted mt-1">
                        Verified by district police commissionerate. Zero pending FIRs.
                      </p>
                    </div>
                    <Switch
                      checked={selectedPTI.policeVerified}
                      onCheckedChange={(val) =>
                        handleToggleVerification(selectedPTI.id, 'policeVerified', val)
                      }
                    />
                  </div>

                  <div className="rounded-xl border border-border bg-card-bg p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-text-primary flex items-center">
                        <HeartPulse className="h-4 w-4 mr-2 text-neon-rose" />
                        Medical Fitness & CPR Certification
                      </h4>
                      <p className="text-text-muted mt-1">
                        Cardiovascular physical stress certified, 20/20 vision, drug clearance.
                      </p>
                    </div>
                    <Switch
                      checked={selectedPTI.medicalFitness}
                      onCheckedChange={(val) =>
                        handleToggleVerification(selectedPTI.id, 'medicalFitness', val)
                      }
                    />
                  </div>
                </TabsContent>

                {/* Tab 3: Placements */}
                <TabsContent value="placements" className="space-y-3 pt-3 text-xs">
                  {selectedPTI.placements.map((pl) => (
                    <div
                      key={pl.id}
                      className="p-3 rounded-xl border border-border bg-card-bg flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-text-primary text-sm">
                          {pl.school.name}
                        </h4>
                        <span className="text-[11px] text-text-muted">
                          {pl.school.city} • Since {formatDate(pl.startDate)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-cerulean block">
                          Stipend: {formatCurrency(pl.salary)}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {pl.status}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {selectedPTI.placements.length === 0 && (
                    <div className="py-6 text-center text-text-muted">
                      Candidate is currently on bench and available for school deployment.
                    </div>
                  )}
                </TabsContent>

                {/* Tab 4: Banking & Statutory (Masked by Default) */}
                <TabsContent value="bank" className="space-y-4 pt-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-text-muted font-medium">
                      Confidential Statutory Records
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSensitive(!showSensitive)}
                      className="h-7 text-xs flex items-center space-x-1"
                    >
                      {showSensitive ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      <span>{showSensitive ? 'Hide Details' : 'Reveal Sensitive Details'}</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Bank Name</span>
                      <span className="font-semibold text-text-primary text-sm mt-0.5 block">
                        {selectedPTI.bankName || 'Not recorded'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Account Number</span>
                      <span className="font-mono font-semibold text-text-primary text-sm mt-0.5 block">
                        {showSensitive
                          ? selectedPTI.accountNumber || 'N/A'
                          : selectedPTI.accountNumber
                          ? `••••••••${selectedPTI.accountNumber.slice(-4)}`
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">IFSC Code</span>
                      <span className="font-mono font-semibold text-text-primary text-sm mt-0.5 block">
                        {selectedPTI.ifscCode || 'N/A'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Aadhaar Card</span>
                      <span className="font-mono font-semibold text-text-primary text-sm mt-0.5 block">
                        {showSensitive
                          ? selectedPTI.aadhaarNumber || 'N/A'
                          : 'XXXX-XXXX-••••'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">PF Number</span>
                      <span className="font-mono text-text-primary text-xs mt-0.5 block">
                        {selectedPTI.pfNumber || 'Pending PF registration'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">ESIC Number</span>
                      <span className="font-mono text-text-primary text-xs mt-0.5 block">
                        {selectedPTI.esiNumber || 'Pending ESI registration'}
                      </span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="pt-4 border-t border-border flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(selectedPTI)}
                >
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit PTI Profile
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedPTI(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CREATE / EDIT PTI DIALOG */}
      <Dialog
        open={createOpen || editOpen}
        onOpenChange={(open) => {
          if (!open) {
            setCreateOpen(false)
            setEditOpen(false)
          }
        }}
      >
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading text-text-primary">
              {editOpen ? 'Edit PTI Instructor Profile' : 'Add New PTI Instructor'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={editOpen ? handleEditSubmit : handleCreateSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Full Name *</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-card-bg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Phone *</Label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Email *</Label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Qualification *</Label>
                <Select
                  value={formData.qualification}
                  onValueChange={(val) => setFormData({ ...formData, qualification: val })}
                >
                  <SelectTrigger className="bg-card-bg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BPED">B.P.Ed</SelectItem>
                    <SelectItem value="MPED">M.P.Ed</SelectItem>
                    <SelectItem value="DPED">D.P.Ed</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Years of Experience</Label>
                <Input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Preferred City *</Label>
                <Input
                  required
                  value={formData.preferredCity}
                  onChange={(e) => setFormData({ ...formData, preferredCity: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Expected Salary (INR) *</Label>
                <Input
                  type="number"
                  required
                  value={formData.expectedSalary}
                  onChange={(e) => setFormData({ ...formData, expectedSalary: Number(e.target.value) })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Sports Achievements & Certifications</Label>
              <Input
                value={formData.sportsAchievements}
                onChange={(e) => setFormData({ ...formData, sportsAchievements: e.target.value })}
                className="bg-card-bg"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setCreateOpen(false)
                  setEditOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm" disabled={loading}>
                {loading ? 'Saving...' : editOpen ? 'Update PTI' : 'Create PTI'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
