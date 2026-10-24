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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { createPlacement, endPlacement, replacePlacement } from '@/lib/actions/admin'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  Plus,
  Search,
  RotateCcw,
  CheckCircle2,
  Calendar,
  School,
  Users,
  AlertCircle,
  Loader2,
} from 'lucide-react'

interface PlacementItem {
  id: string
  ptiId: string
  schoolId: string
  startDate: Date | string
  endDate: Date | string | null
  salary: number
  schoolFee: number
  workingDays: number
  status: string
  replacementForId: string | null
  notes: string
  pti: { id: string; name: string; qualification: string; phone: string }
  school: { id: string; name: string; city: string }
}

export function PlacementsManager({
  initialPlacements,
  schools,
  ptis,
}: {
  initialPlacements: PlacementItem[]
  schools: Array<{ id: string; name: string; city: string; feePerPTI: number }>
  ptis: Array<{ id: string; name: string; qualification: string; preferredCity: string }>
}) {
  const [placements, setPlacements] = useState<PlacementItem[]>(initialPlacements)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [createOpen, setCreateOpen] = useState(false)
  const [replaceOpen, setReplaceOpen] = useState(false)
  const [selectedPlacement, setSelectedPlacement] = useState<PlacementItem | null>(null)
  const [newPtiId, setNewPtiId] = useState('')
  const [replaceReason, setReplaceReason] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [form, setForm] = useState({
    ptiId: ptis[0]?.id || '',
    schoolId: schools[0]?.id || '',
    startDate: new Date().toISOString().split('T')[0],
    salary: 24000,
    schoolFee: 32000,
    workingDays: 26,
    notes: '',
  })

  const filtered = placements.filter((p) => {
    const matchesSearch =
      p.school.name.toLowerCase().includes(search.toLowerCase()) ||
      p.pti.name.toLowerCase().includes(search.toLowerCase()) ||
      p.school.city.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await createPlacement(form)
    setLoading(false)
    if (res.success && res.placement) {
      const selectedSchool = schools.find((s) => s.id === form.schoolId)!
      const selectedPti = ptis.find((p) => p.id === form.ptiId)!
      setPlacements([
        {
          ...(res.placement as any),
          school: selectedSchool,
          pti: selectedPti,
        },
        ...placements,
      ])
      setCreateOpen(false)
      toast({ title: 'Placement Created', description: 'Instructor deployed to school.' })
    } else {
      toast({ variant: 'destructive', title: 'Error', description: res.error })
    }
  }

  const handleEndPlacement = async (placementId: string) => {
    setLoading(true)
    const res = await endPlacement(placementId, 'Contract ended by coordinator.')
    setLoading(false)
    if (res.success) {
      setPlacements((prev) =>
        prev.map((p) => (p.id === placementId ? { ...p, status: 'ENDED', endDate: new Date() } : p))
      )
      toast({ title: 'Placement Ended', description: 'Status marked ENDED.' })
    }
  }

  const handleReplaceSubmit = async (e: React.FormEvent) => {
    if (!selectedPlacement || !newPtiId) return
    e.preventDefault()
    setLoading(true)
    const res = await replacePlacement(selectedPlacement.id, newPtiId, replaceReason)
    setLoading(false)
    if (res.success && res.newPlacement) {
      const replacementPti = ptis.find((p) => p.id === newPtiId)!
      setPlacements((prev) => [
        {
          ...(res.newPlacement as any),
          school: selectedPlacement.school,
          pti: replacementPti,
        },
        ...prev.map((p) =>
          p.id === selectedPlacement.id
            ? { ...p, status: 'ENDED', endDate: new Date() }
            : p
        ),
      ])
      setReplaceOpen(false)
      setSelectedPlacement(null)
      toast({
        title: 'Replacement Dispatched',
        description: 'Previous placement ended; new instructor contract active.',
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search school, teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-card border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="ENDED">ENDED</SelectItem>
              <SelectItem value="ON_HOLD">ON_HOLD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => setCreateOpen(true)}
          variant="brand"
          size="sm"
          className="flex items-center space-x-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>New Placement</span>
        </Button>
      </div>

      {/* Placements Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-semibold text-xs">School Name</TableHead>
              <TableHead className="font-semibold text-xs">Assigned PTI Teacher</TableHead>
              <TableHead className="font-semibold text-xs">Start Date</TableHead>
              <TableHead className="font-semibold text-xs">Teacher Stipend</TableHead>
              <TableHead className="font-semibold text-xs">School Billing Fee</TableHead>
              <TableHead className="font-semibold text-xs">Gross Margin</TableHead>
              <TableHead className="font-semibold text-xs">Status</TableHead>
              <TableHead className="font-semibold text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((pl) => {
              const margin = pl.schoolFee - pl.salary
              return (
                <TableRow key={pl.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-medium text-text-primary text-xs">
                    <div>
                      <span className="block font-bold">{pl.school.name}</span>
                      <span className="text-[11px] text-text-muted">{pl.school.city}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div>
                      <span className="font-bold text-text-primary">{pl.pti.name}</span>
                      <span className="text-[11px] text-text-muted block">{pl.pti.qualification}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-text-muted">
                    {formatDate(pl.startDate)}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-semibold text-rose-400">
                    {formatCurrency(pl.salary)}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-semibold text-cerulean">
                    {formatCurrency(pl.schoolFee)}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-bold text-emerald-400">
                    +{formatCurrency(margin)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={pl.status === 'ACTIVE' ? 'success' : 'secondary'}
                      className="text-[10px]"
                    >
                      {pl.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    {pl.status === 'ACTIVE' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPlacement(pl)
                            setNewPtiId('')
                            setReplaceReason('')
                            setReplaceOpen(true)
                          }}
                          className="h-8 text-xs text-cerulean hover:text-cerulean"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Replace
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEndPlacement(pl.id)}
                          className="h-8 text-xs text-text-muted hover:text-destructive"
                        >
                          End
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-text-muted">
            No placements found.
          </div>
        )}
      </div>

      {/* CREATE PLACEMENT DIALOG */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading text-text-primary">
              Deploy PTI Instructor
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Contracting School *</Label>
              <Select
                value={form.schoolId}
                onValueChange={(val) => {
                  const sc = schools.find((s) => s.id === val)
                  setForm({
                    ...form,
                    schoolId: val,
                    schoolFee: sc ? sc.feePerPTI : form.schoolFee,
                  })
                }}
              >
                <SelectTrigger className="bg-card-bg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} ({s.city})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Assign PTI Teacher *</Label>
              <Select
                value={form.ptiId}
                onValueChange={(val) => setForm({ ...form, ptiId: val })}
              >
                <SelectTrigger className="bg-card-bg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ptis.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.qualification} • {p.preferredCity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Teacher Salary / Month (INR) *</Label>
                <Input
                  type="number"
                  required
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: Number(e.target.value) })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">School Fee / Month (INR) *</Label>
                <Input
                  type="number"
                  required
                  value={form.schoolFee}
                  onChange={(e) => setForm({ ...form, schoolFee: Number(e.target.value) })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Deployment Start Date *</Label>
                <Input
                  type="date"
                  required
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Working Days / Month</Label>
                <Input
                  type="number"
                  value={form.workingDays}
                  onChange={(e) => setForm({ ...form, workingDays: Number(e.target.value) })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm" disabled={loading}>
                {loading ? 'Deploying...' : 'Confirm Deployment'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* REPLACEMENT WORKFLOW DIALOG */}
      <Dialog open={replaceOpen} onOpenChange={setReplaceOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading text-text-primary">
              24-Hour PTI Replacement Guarantee
            </DialogTitle>
          </DialogHeader>

          {selectedPlacement && (
            <form onSubmit={handleReplaceSubmit} className="space-y-4">
              <div className="p-3 rounded-xl border border-border bg-card-bg text-xs space-y-1">
                <p>
                  <strong>School:</strong> {selectedPlacement.school.name}
                </p>
                <p>
                  <strong>Current Instructor:</strong> {selectedPlacement.pti.name}
                </p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Select Substitute / Replacement PTI *</Label>
                <Select value={newPtiId} onValueChange={setNewPtiId}>
                  <SelectTrigger className="bg-card-bg">
                    <SelectValue placeholder="Choose candidate..." />
                  </SelectTrigger>
                  <SelectContent>
                    {ptis
                      .filter((p) => p.id !== selectedPlacement.ptiId)
                      .map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} ({p.qualification} • {p.preferredCity})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Reason for Replacement *</Label>
                <Input
                  required
                  placeholder="e.g. Medical leave, emergency substitute request..."
                  value={replaceReason}
                  onChange={(e) => setReplaceReason(e.target.value)}
                  className="bg-card-bg"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setReplaceOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="brand" size="sm" disabled={loading || !newPtiId}>
                  {loading ? 'Processing...' : 'Deploy Replacement'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
