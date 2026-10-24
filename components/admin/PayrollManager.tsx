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
import { generateMonthlyPayroll, markPayrollPaid } from '@/lib/actions/admin'
import { formatCurrency, formatDate } from '@/lib/utils'
import * as XLSX from 'xlsx'
import {
  CreditCard,
  Download,
  CheckCircle2,
  Calendar,
  Sparkles,
  FileText,
  Loader2,
  Building,
} from 'lucide-react'

interface PayrollItem {
  id: string
  ptiId: string
  month: number
  year: number
  basicSalary: number
  presentDays: number
  workingDays: number
  absentDeduction: number
  bonus: number
  pfDeduction: number
  esiDeduction: number
  otherDeductions: number
  netSalary: number
  status: string
  transactionRef: string
  paidAt: Date | string | null
  remarks: string
  pti: {
    id: string
    name: string
    qualification: string
    bankName: string
    accountNumber: string
    ifscCode: string
    pfNumber: string
    esiNumber: string
  }
}

export function PayrollManager({
  initialPayrolls,
}: {
  initialPayrolls: PayrollItem[]
}) {
  const [payrolls, setPayrolls] = useState<PayrollItem[]>(initialPayrolls)
  const [month, setMonth] = useState('10')
  const [year, setYear] = useState('2026')
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollItem | null>(null)
  const [payDialogOpen, setPayDialogOpen] = useState(false)
  const [transactionRef, setTransactionRef] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const filtered = payrolls.filter(
    (p) => p.month === Number(month) && p.year === Number(year)
  )

  const handleGenerate = async () => {
    setLoading(true)
    const res = await generateMonthlyPayroll(Number(month), Number(year))
    setLoading(false)
    if (res.success) {
      toast({
        title: 'Payroll Generated',
        description: `Processed payroll records for ${res.count} instructors.`,
      })
      window.location.reload()
    } else {
      toast({ variant: 'destructive', title: 'Error', description: res.error })
    }
  }

  const handleMarkPaid = async (e: React.FormEvent) => {
    if (!selectedPayroll) return
    e.preventDefault()
    setLoading(true)
    const res = await markPayrollPaid(selectedPayroll.id, transactionRef)
    setLoading(false)
    if (res.success) {
      setPayrolls((prev) =>
        prev.map((p) =>
          p.id === selectedPayroll.id
            ? { ...p, status: 'PAID', transactionRef, paidAt: new Date() }
            : p
        )
      )
      setPayDialogOpen(false)
      setSelectedPayroll(null)
      toast({
        title: 'Payment Disbursed',
        description: `Stipend marked PAID with ref ${transactionRef}.`,
      })
    }
  }

  const exportBankExcel = () => {
    const rows = filtered.map((p) => ({
      BeneficiaryName: p.pti.name,
      BankName: p.pti.bankName || 'State Bank of India',
      AccountNumber: p.pti.accountNumber || 'Pending Account',
      IFSC: p.pti.ifscCode || 'SBIN0001234',
      Amount: p.netSalary,
      PaymentRemarks: `FitKids Stipend ${month}/${year}`,
      Status: p.status,
    }))

    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Bank_NEFT_Transfer')
    XLSX.writeFile(wb, `FitKids_Bank_Disbursals_${month}_${year}.xlsx`)
    toast({ title: 'Bank Sheet Downloaded', description: 'Generated NEFT batch file.' })
  }

  const totalGross = filtered.reduce((s, p) => s + p.basicSalary, 0)
  const totalNet = filtered.reduce((s, p) => s + p.netSalary, 0)
  const totalPF = filtered.reduce((s, p) => s + p.pfDeduction, 0)
  const totalESI = filtered.reduce((s, p) => s + p.esiDeduction, 0)

  return (
    <div className="space-y-6">
      {/* Month Selector & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-36 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                { m: '7', n: 'July' },
                { m: '8', n: 'August' },
                { m: '9', n: 'September' },
                { m: '10', n: 'October' },
                { m: '11', n: 'November' },
                { m: '12', n: 'December' },
              ].map((item) => (
                <SelectItem key={item.m} value={item.m}>
                  {item.n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-28 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            variant="brand"
            size="sm"
            className="flex items-center space-x-1.5"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span>Auto-Calculate From Attendance</span>
          </Button>
        </div>

        <Button
          onClick={exportBankExcel}
          variant="outline"
          size="sm"
          className="flex items-center space-x-1.5"
        >
          <Download className="h-4 w-4" />
          <span>Export Bank Batch (NEFT)</span>
        </Button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-border bg-card">
          <span className="text-xs text-text-muted">Total Instructors</span>
          <span className="text-xl font-bold font-heading text-text-primary block mt-1">
            {filtered.length} Teachers
          </span>
        </div>
        <div className="p-4 rounded-2xl border border-border bg-card">
          <span className="text-xs text-text-muted">Total Net Payout</span>
          <span className="text-xl font-bold font-heading text-emerald-400 font-mono block mt-1">
            {formatCurrency(totalNet)}
          </span>
        </div>
        <div className="p-4 rounded-2xl border border-border bg-card">
          <span className="text-xs text-text-muted">PF Remittance (12%)</span>
          <span className="text-xl font-bold font-heading text-cerulean font-mono block mt-1">
            {formatCurrency(totalPF)}
          </span>
        </div>
        <div className="p-4 rounded-2xl border border-border bg-card">
          <span className="text-xs text-text-muted">ESI Contribution</span>
          <span className="text-xl font-bold font-heading text-indigo-400 font-mono block mt-1">
            {formatCurrency(totalESI)}
          </span>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-semibold text-xs">Instructor</TableHead>
              <TableHead className="font-semibold text-xs">Present / Total</TableHead>
              <TableHead className="font-semibold text-xs">Basic Stipend</TableHead>
              <TableHead className="font-semibold text-xs">PF (12%)</TableHead>
              <TableHead className="font-semibold text-xs">ESI (0.75%)</TableHead>
              <TableHead className="font-semibold text-xs">Absence Ded.</TableHead>
              <TableHead className="font-semibold text-xs font-bold text-emerald-400">Net Payable</TableHead>
              <TableHead className="font-semibold text-xs">Status</TableHead>
              <TableHead className="font-semibold text-xs text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} className="hover:bg-muted/40 transition-colors">
                <TableCell className="font-medium text-text-primary text-xs">
                  <div>
                    <span className="font-bold block">{p.pti.name}</span>
                    <span className="text-[11px] text-text-muted">{p.pti.qualification}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-mono">
                  {p.presentDays} / {p.workingDays} days
                </TableCell>
                <TableCell className="font-mono text-xs text-text-primary">
                  {formatCurrency(p.basicSalary)}
                </TableCell>
                <TableCell className="font-mono text-xs text-cerulean">
                  -{formatCurrency(p.pfDeduction)}
                </TableCell>
                <TableCell className="font-mono text-xs text-indigo-400">
                  -{formatCurrency(p.esiDeduction)}
                </TableCell>
                <TableCell className="font-mono text-xs text-rose-400">
                  -{formatCurrency(p.absentDeduction)}
                </TableCell>
                <TableCell className="font-mono text-xs font-extrabold text-emerald-400">
                  {formatCurrency(p.netSalary)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={p.status === 'PAID' ? 'success' : 'warning'}
                    className="text-[10px]"
                  >
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  {p.status !== 'PAID' ? (
                    <Button
                      variant="brand"
                      size="sm"
                      onClick={() => {
                        setSelectedPayroll(p)
                        setTransactionRef(`NEFT/UPI/${new Date().getFullYear()}${Math.floor(100000 + Math.random() * 900000)}`)
                        setPayDialogOpen(true)
                      }}
                      className="h-7 text-xs"
                    >
                      Disburse
                    </Button>
                  ) : (
                    <span className="text-[10px] text-text-muted block">
                      Paid: {p.transactionRef}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-text-muted">
            No payroll calculated for {month}/{year}. Click "Auto-Calculate From Attendance" to compute stipends.
          </div>
        )}
      </div>

      {/* DISBURSE PAYMENT DIALOG */}
      <Dialog open={payDialogOpen} onOpenChange={setPayDialogOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading text-text-primary">
              Record Bank Disbursal
            </DialogTitle>
          </DialogHeader>

          {selectedPayroll && (
            <form onSubmit={handleMarkPaid} className="space-y-4">
              <div className="p-3 rounded-xl border border-border bg-card-bg text-xs space-y-1">
                <p>
                  <strong>Instructor:</strong> {selectedPayroll.pti.name}
                </p>
                <p>
                  <strong>Net Salary:</strong>{' '}
                  <span className="font-mono font-bold text-emerald-400">
                    {formatCurrency(selectedPayroll.netSalary)}
                  </span>
                </p>
                <p>
                  <strong>Bank:</strong> {selectedPayroll.pti.bankName} (
                  {selectedPayroll.pti.accountNumber})
                </p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Bank Transaction / UTR Reference *</Label>
                <Input
                  required
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="bg-card-bg font-mono text-xs"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setPayDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="brand" size="sm" disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm Disbursal'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
