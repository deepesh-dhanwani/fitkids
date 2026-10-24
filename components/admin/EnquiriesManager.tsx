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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import {
  updateEnquiryStatus,
  assignEnquiry,
  convertEnquiryToSchool,
  createAdminEnquiry,
} from '@/lib/actions/admin'
import { formatDate } from '@/lib/utils'
import {
  LayoutList,
  Kanban,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  Building,
  User,
  Phone,
  Mail,
  Loader2,
  ArrowRight,
} from 'lucide-react'

interface EnquiryItem {
  id: string
  schoolName: string
  contactPerson: string
  phone: string
  email: string
  city: string
  board: string
  students: number
  ptisNeeded: number
  status: string
  source: string
  notes: string
  createdAt: Date | string
  assignedTo?: { id: string; name: string } | null
}

const statusColumns = [
  { id: 'NEW', label: 'New Lead', color: 'border-amber-400/40 text-amber-400 bg-amber-400/10' },
  { id: 'CONTACTED', label: 'Contacted', color: 'border-sky-400/40 text-sky-400 bg-sky-400/10' },
  { id: 'DEMO_SCHEDULED', label: 'Demo Scheduled', color: 'border-purple-400/40 text-purple-400 bg-purple-400/10' },
  { id: 'PROPOSAL_SENT', label: 'Proposal Sent', color: 'border-blue-400/40 text-blue-400 bg-blue-400/10' },
  { id: 'WON', label: 'Won / Converted', color: 'border-emerald-400/40 text-emerald-400 bg-emerald-400/10' },
  { id: 'LOST', label: 'Lost', color: 'border-rose-400/40 text-rose-400 bg-rose-400/10' },
]

export function EnquiriesManager({
  initialEnquiries,
  adminUsers,
}: {
  initialEnquiries: EnquiryItem[]
  adminUsers: Array<{ id: string; name: string }>
}) {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries)
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // New enquiry form state
  const [newEnquiry, setNewEnquiry] = useState({
    schoolName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: 'Jaipur',
    board: 'CBSE',
    students: 1000,
    ptisNeeded: 1,
    message: '',
  })

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      e.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    const res = await updateEnquiryStatus(enquiryId, newStatus)
    if (res.success) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      )
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus })
      }
      toast({ title: 'Status Updated', description: `Lead moved to ${newStatus}` })
    }
  }

  const handleAssign = async (enquiryId: string, userId: string) => {
    const res = await assignEnquiry(enquiryId, userId === 'none' ? null : userId)
    if (res.success) {
      const assignedUser = adminUsers.find((u) => u.id === userId) || null
      setEnquiries((prev) =>
        prev.map((e) =>
          e.id === enquiryId ? { ...e, assignedTo: assignedUser } : e
        )
      )
      toast({ title: 'Assigned', description: 'Lead assigned successfully.' })
    }
  }

  const handleConvert = async (enquiryId: string) => {
    setLoading(true)
    const res = await convertEnquiryToSchool(enquiryId)
    setLoading(false)
    if (res.success) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: 'WON' } : e))
      )
      setSelectedEnquiry(null)
      toast({
        title: 'Lead Converted!',
        description: 'New School record created in system.',
      })
    } else {
      toast({ variant: 'destructive', title: 'Error', description: res.error })
    }
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await createAdminEnquiry(newEnquiry)
    setLoading(false)
    if (res.success && res.data) {
      setEnquiries([res.data as any, ...enquiries])
      setCreateOpen(false)
      toast({ title: 'Enquiry Created', description: 'New school lead recorded.' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search schools, contact, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 bg-card border-border">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {statusColumns.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <div className="flex items-center border border-border rounded-xl p-1 bg-card">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                viewMode === 'table'
                  ? 'bg-muted text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <LayoutList className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                viewMode === 'kanban'
                  ? 'bg-muted text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Kanban className="h-4 w-4" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
          </div>

          <Button
            onClick={() => setCreateOpen(true)}
            variant="brand"
            size="sm"
            className="flex items-center space-x-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>Add Lead</span>
          </Button>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="font-semibold text-xs">School Name</TableHead>
                <TableHead className="font-semibold text-xs">Contact Person</TableHead>
                <TableHead className="font-semibold text-xs">City & Board</TableHead>
                <TableHead className="font-semibold text-xs">PTIs Needed</TableHead>
                <TableHead className="font-semibold text-xs">Status</TableHead>
                <TableHead className="font-semibold text-xs">Assigned To</TableHead>
                <TableHead className="font-semibold text-xs text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((enq) => {
                const col = statusColumns.find((c) => c.id === enq.status)
                return (
                  <TableRow key={enq.id} className="hover:bg-muted/40 transition-colors">
                    <TableCell className="font-medium text-text-primary">
                      {enq.schoolName}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-text-primary text-xs">{enq.contactPerson}</span>
                        <span className="text-[11px] text-text-muted">{enq.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-text-muted">{enq.city} ({enq.board})</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-xs text-cerulean">{enq.ptisNeeded} PTI</span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          col?.color || 'border-border text-text-muted'
                        }`}
                      >
                        {col?.label || enq.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-text-muted">
                        {enq.assignedTo?.name || 'Unassigned'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEnquiry(enq)}
                        className="h-8 text-xs"
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-xs text-text-muted">
              No inquiries match your criteria.
            </div>
          )}
        </div>
      ) : (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {statusColumns.map((column) => {
            const columnEnquiries = filtered.filter((e) => e.status === column.id)
            return (
              <div
                key={column.id}
                className="rounded-2xl border border-border bg-card/60 p-3 min-w-[220px] flex flex-col h-[640px]"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                  <span className="text-xs font-bold text-text-primary">
                    {column.label}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-border text-text-muted">
                    {columnEnquiries.length}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {columnEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className="rounded-xl border border-border bg-card p-3 shadow-sm hover:border-cerulean/50 transition-all cursor-pointer group space-y-2"
                    >
                      <h4 className="font-heading font-bold text-xs text-text-primary group-hover:text-cerulean transition-colors line-clamp-1">
                        {enq.schoolName}
                      </h4>
                      <div className="text-[11px] text-text-muted space-y-0.5">
                        <p>{enq.contactPerson} • {enq.city}</p>
                        <p className="font-semibold text-cerulean">{enq.ptisNeeded} PTI requested</p>
                      </div>
                      <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] text-text-muted">
                        <span>{formatDate(enq.createdAt)}</span>
                        <span className="text-xs text-cerulean font-semibold">View →</span>
                      </div>
                    </div>
                  ))}

                  {columnEnquiries.length === 0 && (
                    <div className="h-32 flex items-center justify-center text-[11px] text-text-muted border border-dashed border-border rounded-xl">
                      Empty column
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* DETAIL DRAWER / DIALOG */}
      <Dialog
        open={!!selectedEnquiry}
        onOpenChange={() => setSelectedEnquiry(null)}
      >
        <DialogContent className="max-w-xl bg-card border-border">
          {selectedEnquiry && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cerulean">
                    Lead Details
                  </span>
                  <Badge variant="outline" className="text-xs font-bold">
                    {selectedEnquiry.status}
                  </Badge>
                </div>
                <DialogTitle className="text-xl font-bold font-heading text-text-primary mt-1">
                  {selectedEnquiry.schoolName}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl border border-border bg-card-bg space-y-1">
                  <span className="text-text-muted block">Contact Person</span>
                  <span className="font-semibold text-text-primary flex items-center">
                    <User className="h-3.5 w-3.5 mr-1 text-cerulean" />
                    {selectedEnquiry.contactPerson}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card-bg space-y-1">
                  <span className="text-text-muted block">Phone & WhatsApp</span>
                  <span className="font-semibold text-text-primary flex items-center">
                    <Phone className="h-3.5 w-3.5 mr-1 text-cerulean" />
                    {selectedEnquiry.phone}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card-bg space-y-1">
                  <span className="text-text-muted block">City & Curriculum</span>
                  <span className="font-semibold text-text-primary flex items-center">
                    <Building className="h-3.5 w-3.5 mr-1 text-cerulean" />
                    {selectedEnquiry.city} ({selectedEnquiry.board})
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card-bg space-y-1">
                  <span className="text-text-muted block">PTIs Needed</span>
                  <span className="font-bold text-cerulean text-sm">
                    {selectedEnquiry.ptisNeeded} Instructor(s)
                  </span>
                </div>
              </div>

              {selectedEnquiry.notes && (
                <div className="p-3 rounded-xl border border-border bg-card-bg text-xs">
                  <span className="text-text-muted block font-semibold mb-1">
                    Notes / Remarks:
                  </span>
                  <p className="text-text-primary leading-relaxed">
                    {selectedEnquiry.notes}
                  </p>
                </div>
              )}

              {/* Status & Assignment Controls */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Update Status</Label>
                  <Select
                    value={selectedEnquiry.status}
                    onValueChange={(val) => handleStatusChange(selectedEnquiry.id, val)}
                  >
                    <SelectTrigger className="bg-card-bg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusColumns.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Assign Coordinator</Label>
                  <Select
                    value={selectedEnquiry.assignedTo?.id || 'none'}
                    onValueChange={(val) => handleAssign(selectedEnquiry.id, val)}
                  >
                    <SelectTrigger className="bg-card-bg">
                      <SelectValue placeholder="Unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Unassigned</SelectItem>
                      {adminUsers.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions Footer */}
              <DialogFooter className="flex items-center justify-between sm:justify-between pt-4 border-t border-border">
                {selectedEnquiry.status !== 'WON' ? (
                  <Button
                    variant="brand"
                    size="sm"
                    disabled={loading}
                    onClick={() => handleConvert(selectedEnquiry.id)}
                    className="flex items-center space-x-1.5"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Convert to Active School</span>
                      </>
                    )}
                  </Button>
                ) : (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Converted to Partner School
                  </span>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedEnquiry(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CREATE NEW LEAD DIALOG */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading text-text-primary">
              Record New School Inquiry
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">School Name *</Label>
              <Input
                required
                value={newEnquiry.schoolName}
                onChange={(e) => setNewEnquiry({ ...newEnquiry, schoolName: e.target.value })}
                className="bg-card-bg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Contact Person *</Label>
                <Input
                  required
                  value={newEnquiry.contactPerson}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, contactPerson: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Phone *</Label>
                <Input
                  required
                  value={newEnquiry.phone}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, phone: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  value={newEnquiry.email}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, email: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">City *</Label>
                <Input
                  required
                  value={newEnquiry.city}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, city: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Board</Label>
                <Input
                  value={newEnquiry.board}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, board: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">PTIs Needed</Label>
                <Input
                  type="number"
                  min="1"
                  value={newEnquiry.ptisNeeded}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, ptisNeeded: Number(e.target.value) })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm" disabled={loading}>
                {loading ? 'Saving...' : 'Save Lead'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
