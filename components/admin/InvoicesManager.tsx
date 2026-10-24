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
import { createInvoice, updateInvoiceStatus } from '@/lib/actions/admin'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  Plus,
  Search,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  Download,
  Mail,
  Loader2,
  Building,
} from 'lucide-react'

interface InvoiceItem {
  id: string
  invoiceNumber: string
  schoolId: string
  month: number
  year: number
  lineItems: string
  subtotal: number
  cgst: number
  sgst: number
  igst: number
  tds: number
  total: number
  status: string
  pdfUrl: string
  dueDate: Date | string | null
  payments: string
  notes: string
  createdAt: Date | string
  school: { id: string; name: string; city: string; state: string; gstNumber: string; feePerPTI: number }
}

export function InvoicesManager({
  initialInvoices,
  schools,
}: {
  initialInvoices: InvoiceItem[]
  schools: Array<{ id: string; name: string; city: string; state: string; feePerPTI: number }>
}) {
  const [invoices, setInvoices] = useState<InvoiceItem[]>(initialInvoices)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [form, setForm] = useState({
    schoolId: schools[0]?.id || '',
    month: 10,
    year: 2026,
    fee: schools[0]?.feePerPTI || 30000,
    tdsRate: 0,
    notes: 'Professional physical training instructor services.',
  })

  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.school.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.school.city.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (id: string, status: string) => {
    setLoading(true)
    const res = await updateInvoiceStatus(id, status)
    setLoading(false)
    if (res.success) {
      setInvoices((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i))
      )
      if (selectedInvoice && selectedInvoice.id === id) {
        setSelectedInvoice({ ...selectedInvoice, status })
      }
      toast({ title: 'Invoice Updated', description: `Status changed to ${status}.` })
    }
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await createInvoice({
      schoolId: form.schoolId,
      month: form.month,
      year: form.year,
      tdsRate: form.tdsRate,
      notes: form.notes,
      lineItems: [
        {
          description: `PTI Staffing Services - ${form.month}/${form.year}`,
          quantity: 1,
          rate: form.fee,
          amount: form.fee,
        },
      ],
    })
    setLoading(false)
    if (res.success && res.invoice) {
      const school = schools.find((s) => s.id === form.schoolId)!
      setInvoices([
        {
          ...(res.invoice as any),
          school,
        },
        ...invoices,
      ])
      setCreateOpen(false)
      toast({
        title: 'Invoice Generated',
        description: `Invoice ${res.invoice.invoiceNumber} created.`,
      })
    }
  }

  // Summary Metrics
  const totalBilled = invoices.reduce((s, i) => s + i.total, 0)
  const totalPaid = invoices
    .filter((i) => i.status === 'PAID')
    .reduce((s, i) => s + i.total, 0)
  const totalOutstanding = invoices
    .filter((i) => ['SENT', 'OVERDUE', 'PARTIALLY_PAID'].includes(i.status))
    .reduce((s, i) => s + i.total, 0)

  return (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card">
          <span className="text-xs text-text-muted">Total Invoiced (All Time)</span>
          <span className="text-2xl font-bold font-heading text-text-primary font-mono block mt-1">
            {formatCurrency(totalBilled)}
          </span>
          <span className="text-[11px] text-text-muted mt-1 block">
            {invoices.length} invoices generated
          </span>
        </div>
        <div className="p-5 rounded-2xl border border-border bg-card">
          <span className="text-xs text-text-muted">Total Collections Received</span>
          <span className="text-2xl font-bold font-heading text-emerald-400 font-mono block mt-1">
            {formatCurrency(totalPaid)}
          </span>
          <span className="text-[11px] text-emerald-400/80 mt-1 block">
            Cleared in company bank account
          </span>
        </div>
        <div className="p-5 rounded-2xl border border-border bg-card">
          <span className="text-xs text-text-muted">Outstanding Aging Balance</span>
          <span className="text-2xl font-bold font-heading text-rose-400 font-mono block mt-1">
            {formatCurrency(totalOutstanding)}
          </span>
          <span className="text-[11px] text-rose-400/80 mt-1 block">
            Pending collection from school trusts
          </span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search invoice #, school..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PAID">PAID</SelectItem>
              <SelectItem value="SENT">SENT</SelectItem>
              <SelectItem value="PARTIALLY_PAID">PARTIALLY_PAID</SelectItem>
              <SelectItem value="OVERDUE">OVERDUE</SelectItem>
              <SelectItem value="DRAFT">DRAFT</SelectItem>
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
          <span>Generate Invoice</span>
        </Button>
      </div>

      {/* Invoices Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-semibold text-xs">Invoice Number</TableHead>
              <TableHead className="font-semibold text-xs">School & City</TableHead>
              <TableHead className="font-semibold text-xs">Billing Period</TableHead>
              <TableHead className="font-semibold text-xs">Taxable Base</TableHead>
              <TableHead className="font-semibold text-xs">GST (18%)</TableHead>
              <TableHead className="font-semibold text-xs font-bold text-text-primary">Total Amount</TableHead>
              <TableHead className="font-semibold text-xs">Status</TableHead>
              <TableHead className="font-semibold text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((inv) => (
              <TableRow key={inv.id} className="hover:bg-muted/40 transition-colors">
                <TableCell className="font-mono text-xs font-bold text-cerulean">
                  {inv.invoiceNumber}
                </TableCell>
                <TableCell className="text-xs font-medium text-text-primary">
                  <div>
                    <span className="block font-bold">{inv.school.name}</span>
                    <span className="text-[11px] text-text-muted">{inv.school.city}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-text-muted font-mono">
                  {inv.month}/{inv.year}
                </TableCell>
                <TableCell className="font-mono text-xs text-text-primary">
                  {formatCurrency(inv.subtotal)}
                </TableCell>
                <TableCell className="font-mono text-xs text-text-muted">
                  {formatCurrency(inv.cgst + inv.sgst + inv.igst)}
                </TableCell>
                <TableCell className="font-mono text-xs font-extrabold text-emerald-400">
                  {formatCurrency(inv.total)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      inv.status === 'PAID'
                        ? 'success'
                        : inv.status === 'OVERDUE'
                        ? 'destructive'
                        : inv.status === 'PARTIALLY_PAID'
                        ? 'warning'
                        : 'secondary'
                    }
                    className="text-[10px]"
                  >
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedInvoice(inv)}
                    className="h-8 text-xs"
                  >
                    View Invoice
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-text-muted">
            No invoices found.
          </div>
        )}
      </div>

      {/* INVOICE PREVIEW & ACTIONS MODAL */}
      <Dialog
        open={!!selectedInvoice}
        onOpenChange={() => setSelectedInvoice(null)}
      >
        <DialogContent className="max-w-2xl bg-card border-border">
          {selectedInvoice && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-text-primary">
                    TAX INVOICE
                  </h3>
                  <span className="font-mono text-xs text-cerulean font-bold block mt-0.5">
                    {selectedInvoice.invoiceNumber}
                  </span>
                  <span className="text-xs text-text-muted">
                    FitKids Staffing India Pvt Ltd • GSTIN: 08AAACF1234A1Z5
                  </span>
                </div>
                <Badge variant={selectedInvoice.status === 'PAID' ? 'success' : 'warning'}>
                  {selectedInvoice.status}
                </Badge>
              </div>

              {/* Billed To */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl border border-border bg-card-bg space-y-1">
                  <span className="text-text-muted block font-semibold">Billed To (Client):</span>
                  <p className="font-bold text-text-primary text-sm">{selectedInvoice.school.name}</p>
                  <p className="text-text-muted">{selectedInvoice.school.city}, {selectedInvoice.school.state}</p>
                  <p className="text-text-muted">GST: {selectedInvoice.school.gstNumber || 'Unregistered'}</p>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card-bg space-y-1">
                  <span className="text-text-muted block font-semibold">Payment Details:</span>
                  <p>Bank: <strong>HDFC Bank</strong></p>
                  <p>A/C: <strong>50200088991234</strong></p>
                  <p>IFSC: <strong>HDFC0000456</strong></p>
                  <p>Branch: <strong>Vaishali Nagar, Jaipur</strong></p>
                </div>
              </div>

              {/* Line Items Breakdown */}
              <div className="rounded-xl border border-border bg-card-bg overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="p-2.5 font-semibold text-text-muted">Description</th>
                      <th className="p-2.5 font-semibold text-text-muted text-right">Taxable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-2.5">
                        Physical Training Instructor Supply ({selectedInvoice.month}/{selectedInvoice.year})
                      </td>
                      <td className="p-2.5 text-right font-mono">
                        {formatCurrency(selectedInvoice.subtotal)}
                      </td>
                    </tr>
                    {selectedInvoice.cgst > 0 && (
                      <tr className="text-text-muted">
                        <td className="p-2.5 pl-6">CGST @ 9%</td>
                        <td className="p-2.5 text-right font-mono">
                          +{formatCurrency(selectedInvoice.cgst)}
                        </td>
                      </tr>
                    )}
                    {selectedInvoice.sgst > 0 && (
                      <tr className="text-text-muted">
                        <td className="p-2.5 pl-6">SGST @ 9%</td>
                        <td className="p-2.5 text-right font-mono">
                          +{formatCurrency(selectedInvoice.sgst)}
                        </td>
                      </tr>
                    )}
                    {selectedInvoice.igst > 0 && (
                      <tr className="text-text-muted">
                        <td className="p-2.5 pl-6">IGST @ 18%</td>
                        <td className="p-2.5 text-right font-mono">
                          +{formatCurrency(selectedInvoice.igst)}
                        </td>
                      </tr>
                    )}
                    <tr className="font-bold text-sm bg-muted/40 border-t border-border">
                      <td className="p-2.5 text-text-primary">Total Amount Due</td>
                      <td className="p-2.5 text-right font-mono text-emerald-400">
                        {formatCurrency(selectedInvoice.total)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Quick Status Changers */}
              <div className="flex items-center space-x-2 pt-2">
                <span className="text-xs text-text-muted font-semibold">Change Status:</span>
                {['PAID', 'SENT', 'PARTIALLY_PAID', 'OVERDUE'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInvoice.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      selectedInvoice.status === st
                        ? 'bg-cerulean text-white border-cerulean'
                        : 'border-border text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <DialogFooter className="pt-4 border-t border-border flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="flex items-center space-x-1"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print / Save PDF</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedInvoice(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* GENERATE NEW INVOICE DIALOG */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading text-text-primary">
              Generate School GST Invoice
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Client School *</Label>
              <Select
                value={form.schoolId}
                onValueChange={(val) => {
                  const sc = schools.find((s) => s.id === val)
                  setForm({
                    ...form,
                    schoolId: val,
                    fee: sc ? sc.feePerPTI : form.fee,
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

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Month (1-12) *</Label>
                <Input
                  type="number"
                  min="1"
                  max="12"
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: Number(e.target.value) })}
                  className="bg-card-bg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Year *</Label>
                <Input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                  className="bg-card-bg"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Base Staffing Fee (INR) *</Label>
              <Input
                type="number"
                required
                value={form.fee}
                onChange={(e) => setForm({ ...form, fee: Number(e.target.value) })}
                className="bg-card-bg font-mono"
              />
              <span className="text-[11px] text-text-muted">
                18% GST (CGST 9% + SGST 9%) will be calculated automatically.
              </span>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm" disabled={loading}>
                {loading ? 'Generating...' : 'Issue Invoice'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
