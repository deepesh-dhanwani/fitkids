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
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { createSchool, updateSchool } from '@/lib/actions/admin'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  Plus,
  Search,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  FileText,
  FileSignature,
  Edit,
  Loader2,
} from 'lucide-react'

interface SchoolWithRelations {
  id: string
  name: string
  principalName: string
  phone: string
  email: string
  city: string
  state: string
  board: string
  address: string
  gstNumber: string
  feePerPTI: number
  contractStart: Date | string | null
  contractEnd: Date | string | null
  status: string
  notes: string
  placements: Array<{
    id: string
    salary: number
    schoolFee: number
    status: string
    startDate: Date | string
    pti: { id: string; name: string; qualification: string; phone: string }
  }>
  invoices: Array<{
    id: string
    invoiceNumber: string
    month: number
    year: number
    total: number
    status: string
  }>
  documents: Array<{
    id: string
    name: string
    type: string
    url: string
  }>
  agreements: Array<{
    id: string
    templateType: string
    signedAt: Date | string | null
  }>
}

export function SchoolsManager({
  initialSchools,
}: {
  initialSchools: SchoolWithRelations[]
}) {
  const [schools, setSchools] = useState<SchoolWithRelations[]>(initialSchools)
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedSchool, setSelectedSchool] = useState<SchoolWithRelations | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    principalName: '',
    phone: '',
    email: '',
    city: 'Jaipur',
    state: 'Rajasthan',
    board: 'CBSE',
    address: '',
    gstNumber: '',
    feePerPTI: 30000,
    status: 'ACTIVE',
    notes: '',
  })

  const filtered = schools.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.principalName.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase())
    const matchesCity = cityFilter === 'ALL' || s.city === cityFilter
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter
    return matchesSearch && matchesCity && matchesStatus
  })

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await createSchool(formData)
    setLoading(false)
    if (res.success && res.school) {
      setSchools([
        { ...(res.school as any), placements: [], invoices: [], documents: [], agreements: [] },
        ...schools,
      ])
      setCreateOpen(false)
      toast({ title: 'School Added', description: `${formData.name} added to roster.` })
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    if (!selectedSchool) return
    e.preventDefault()
    setLoading(true)
    const res = await updateSchool(selectedSchool.id, formData)
    setLoading(false)
    if (res.success && res.school) {
      setSchools((prev) =>
        prev.map((s) =>
          s.id === selectedSchool.id ? { ...s, ...(res.school as any) } : s
        )
      )
      setSelectedSchool({ ...selectedSchool, ...(res.school as any) })
      setEditOpen(false)
      toast({ title: 'School Updated', description: 'Information updated successfully.' })
    }
  }

  const openEdit = (school: SchoolWithRelations) => {
    setFormData({
      name: school.name,
      principalName: school.principalName,
      phone: school.phone,
      email: school.email,
      city: school.city,
      state: school.state,
      board: school.board,
      address: school.address,
      gstNumber: school.gstNumber,
      feePerPTI: school.feePerPTI,
      status: school.status,
      notes: school.notes,
    })
    setEditOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search school name, principal..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>

          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-32 bg-card border-border">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Cities</SelectItem>
              <SelectItem value="Jaipur">Jaipur</SelectItem>
              <SelectItem value="Jodhpur">Jodhpur</SelectItem>
              <SelectItem value="Udaipur">Udaipur</SelectItem>
              <SelectItem value="Kota">Kota</SelectItem>
              <SelectItem value="Ajmer">Ajmer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-card border-border">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="PROSPECT">PROSPECT</SelectItem>
              <SelectItem value="INACTIVE">INACTIVE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => {
            setFormData({
              name: '',
              principalName: '',
              phone: '',
              email: '',
              city: 'Jaipur',
              state: 'Rajasthan',
              board: 'CBSE',
              address: '',
              gstNumber: '',
              feePerPTI: 30000,
              status: 'ACTIVE',
              notes: '',
            })
            setCreateOpen(true)
          }}
          variant="brand"
          size="sm"
          className="flex items-center space-x-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Add School</span>
        </Button>
      </div>

      {/* Schools Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-semibold text-xs">School Name</TableHead>
              <TableHead className="font-semibold text-xs">Principal / Head</TableHead>
              <TableHead className="font-semibold text-xs">City & Board</TableHead>
              <TableHead className="font-semibold text-xs">Active PTIs</TableHead>
              <TableHead className="font-semibold text-xs">Fee / PTI</TableHead>
              <TableHead className="font-semibold text-xs">Contract Period</TableHead>
              <TableHead className="font-semibold text-xs">Status</TableHead>
              <TableHead className="font-semibold text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((sc) => {
              const activeCount = sc.placements.filter((p) => p.status === 'ACTIVE').length
              return (
                <TableRow key={sc.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-medium text-text-primary">
                    {sc.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs">
                      <span className="text-text-primary">{sc.principalName}</span>
                      <span className="text-text-muted">{sc.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-text-muted">{sc.city} ({sc.board})</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-xs text-cerulean">
                      {activeCount} Deployed
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs font-semibold">
                    {formatCurrency(sc.feePerPTI)}
                  </TableCell>
                  <TableCell className="text-xs text-text-muted">
                    {sc.contractEnd ? formatDate(sc.contractEnd) : 'Ongoing'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        sc.status === 'ACTIVE'
                          ? 'success'
                          : sc.status === 'PROSPECT'
                          ? 'warning'
                          : 'secondary'
                      }
                      className="text-[10px]"
                    >
                      {sc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSchool(sc)}
                      className="h-8 text-xs"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(sc)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3.5 w-3.5 text-text-muted" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-text-muted">
            No partner schools found.
          </div>
        )}
      </div>

      {/* DETAIL MODAL WITH TABS */}
      <Dialog
        open={!!selectedSchool}
        onOpenChange={() => setSelectedSchool(null)}
      >
        <DialogContent className="max-w-3xl bg-card border-border">
          {selectedSchool && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cerulean">
                    Institutional Profile
                  </span>
                  <Badge variant="outline" className="text-xs font-bold">
                    {selectedSchool.status}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl font-bold font-heading text-text-primary mt-1">
                  {selectedSchool.name}
                </DialogTitle>
                <p className="text-xs text-text-muted">
                  {selectedSchool.address}, {selectedSchool.city}, Rajasthan
                </p>
              </DialogHeader>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="profile">Profile & Contacts</TabsTrigger>
                  <TabsTrigger value="placements">
                    Placements ({selectedSchool.placements.length})
                  </TabsTrigger>
                  <TabsTrigger value="invoices">
                    Invoices ({selectedSchool.invoices.length})
                  </TabsTrigger>
                  <TabsTrigger value="docs">Agreements & Docs</TabsTrigger>
                </TabsList>

                {/* Tab 1: Profile */}
                <TabsContent value="profile" className="space-y-4 pt-3 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Principal / Contact</span>
                      <span className="font-semibold text-text-primary text-sm mt-0.5 block">
                        {selectedSchool.principalName}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Phone</span>
                      <span className="font-semibold text-text-primary text-sm mt-0.5 block">
                        {selectedSchool.phone}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Email</span>
                      <span className="font-semibold text-text-primary text-sm mt-0.5 block truncate">
                        {selectedSchool.email}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Board</span>
                      <span className="font-semibold text-text-primary text-sm mt-0.5 block">
                        {selectedSchool.board}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">Monthly Fee / PTI</span>
                      <span className="font-bold text-cerulean text-sm mt-0.5 block font-mono">
                        {formatCurrency(selectedSchool.feePerPTI)}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted block">GST Number</span>
                      <span className="font-semibold text-text-primary text-xs mt-0.5 block">
                        {selectedSchool.gstNumber || 'Unregistered'}
                      </span>
                    </div>
                  </div>

                  {selectedSchool.notes && (
                    <div className="p-3 rounded-xl border border-border bg-card-bg">
                      <span className="text-text-muted font-semibold block mb-1">
                        Operational Notes:
                      </span>
                      <p className="text-text-primary leading-relaxed">
                        {selectedSchool.notes}
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Tab 2: Placements */}
                <TabsContent value="placements" className="space-y-3 pt-3 text-xs">
                  {selectedSchool.placements.map((pl) => (
                    <div
                      key={pl.id}
                      className="p-3 rounded-xl border border-border bg-card-bg flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-cerulean/10 text-cerulean flex items-center justify-center font-bold">
                          {pl.pti.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-text-primary">{pl.pti.name}</h4>
                          <span className="text-[11px] text-text-muted">
                            {pl.pti.qualification} • {pl.pti.phone}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-400 block">
                          Fee: {formatCurrency(pl.schoolFee)}
                        </span>
                        <span className="text-[10px] text-text-muted">
                          Since {formatDate(pl.startDate)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {selectedSchool.placements.length === 0 && (
                    <div className="py-6 text-center text-text-muted">
                      No instructors currently deployed at this school.
                    </div>
                  )}
                </TabsContent>

                {/* Tab 3: Invoices */}
                <TabsContent value="invoices" className="space-y-3 pt-3 text-xs">
                  {selectedSchool.invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-3 rounded-xl border border-border bg-card-bg flex items-center justify-between"
                    >
                      <div>
                        <span className="font-mono font-bold text-text-primary block">
                          {inv.invoiceNumber}
                        </span>
                        <span className="text-[11px] text-text-muted">
                          Period: {inv.month}/{inv.year}
                        </span>
                      </div>
                      <div className="text-right flex items-center space-x-3">
                        <span className="font-mono font-bold text-text-primary">
                          {formatCurrency(inv.total)}
                        </span>
                        <Badge
                          variant={inv.status === 'PAID' ? 'success' : 'warning'}
                          className="text-[10px]"
                        >
                          {inv.status}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {selectedSchool.invoices.length === 0 && (
                    <div className="py-6 text-center text-text-muted">
                      No invoices recorded for this institution yet.
                    </div>
                  )}
                </TabsContent>

                {/* Tab 4: Agreements & Docs */}
                <TabsContent value="docs" className="space-y-3 pt-3 text-xs">
                  {selectedSchool.agreements.map((agr) => (
                    <div
                      key={agr.id}
                      className="p-3 rounded-xl border border-border bg-card-bg flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <FileSignature className="h-4 w-4 text-cerulean" />
                        <span className="font-medium text-text-primary">
                          {agr.templateType === 'service_agreement'
                            ? 'Annual PTI Staffing Agreement'
                            : 'Service Order Contract'}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        Signed: {formatDate(agr.signedAt)}
                      </span>
                    </div>
                  ))}

                  {selectedSchool.agreements.length === 0 && (
                    <div className="py-6 text-center text-text-muted">
                      No agreements archived.
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <DialogFooter className="pt-4 border-t border-border flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(selectedSchool)}
                >
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit School Details
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedSchool(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CREATE / EDIT SCHOOL DIALOG */}
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
              {editOpen ? 'Edit School Details' : 'Add New Partner School'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={editOpen ? handleEditSubmit : handleCreateSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">School Name *</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-card-bg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Principal / Director *</Label>
                <Input
                  required
                  value={formData.principalName}
                  onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Phone *</Label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
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
              <div className="space-y-1.5">
                <Label className="text-xs">City *</Label>
                <Input
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Curriculum Board</Label>
                <Input
                  value={formData.board}
                  onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Monthly Fee / PTI (INR) *</Label>
                <Input
                  type="number"
                  required
                  value={formData.feePerPTI}
                  onChange={(e) => setFormData({ ...formData, feePerPTI: Number(e.target.value) })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Campus Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-card-bg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">GST Number</Label>
                <Input
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val) => setFormData({ ...formData, status: val })}
                >
                  <SelectTrigger className="bg-card-bg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="PROSPECT">PROSPECT</SelectItem>
                    <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                {loading ? 'Saving...' : editOpen ? 'Update School' : 'Create School'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
