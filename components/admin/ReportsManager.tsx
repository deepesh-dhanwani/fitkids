'use client'

import React, { useState } from 'react'
import {
  FileSpreadsheet,
  Download,
  School,
  Users,
  CalendarCheck,
  CreditCard,
  Receipt,
  TrendingUp,
  Loader2,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import * as XLSX from 'xlsx'

interface ReportsProps {
  schools: any[]
  ptis: any[]
  attendances: any[]
  payrolls: any[]
  invoices: any[]
  enquiries: any[]
}

export function ReportsManager({
  schools,
  ptis,
  attendances,
  payrolls,
  invoices,
  enquiries,
}: ReportsProps) {
  const [downloading, setDownloading] = useState<string | null>(null)

  const exportToExcel = (data: any[], fileName: string, sheetName: string) => {
    setDownloading(fileName)
    setTimeout(() => {
      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, sheetName)
      XLSX.writeFile(wb, `${fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`)
      setDownloading(null)
    }, 400)
  }

  // 1. Schools export
  const handleExportSchools = () => {
    const data = schools.map((s) => ({
      'School Name': s.name,
      'Principal / Contact': s.principalName,
      'Phone': s.phone,
      'Email': s.email,
      'City': s.city,
      'State': s.state,
      'Board': s.board,
      'GST Number': s.gstNumber || 'N/A',
      'Fee Per PTI (INR)': s.feePerPTI,
      'Status': s.status,
      'Active Deployments': s.placements?.length || 0,
      'Contract Start': s.contractStart ? new Date(s.contractStart).toLocaleDateString() : 'N/A',
    }))
    exportToExcel(data, 'FitKids_Schools_Directory', 'Schools')
  }

  // 2. PTIs export
  const handleExportPTIs = () => {
    const data = ptis.map((p) => ({
      'Full Name': p.name,
      'Phone': p.phone,
      'Email': p.email,
      'City': p.preferredCity,
      'Qualification': p.qualification,
      'Sports Specialization': p.sportsAchievements || 'General PE',
      'Experience (Years)': p.experience,
      'Employment Status': p.employmentStatus,
      'Police Verified': p.policeVerified ? 'YES' : 'NO',
      'Medical Fitness': p.medicalFitness ? 'YES' : 'NO',
      'Current Monthly Salary': p.currentSalary || p.expectedSalary,
      'Bank Account': p.accountNumber ? `•••• ${p.accountNumber.slice(-4)}` : 'N/A',
      'Bank IFSC': p.ifscCode || 'N/A',
      'Current School': p.placements?.[0]?.school?.name || 'Unassigned',
    }))
    exportToExcel(data, 'FitKids_PTI_Roster', 'PTIs')
  }

  // 3. Attendance export
  const handleExportAttendance = () => {
    const data = attendances.map((a) => ({
      'Month/Year': `${a.month}/${a.year}`,
      'PTI Name': a.pti?.name || 'N/A',
      'School': a.school?.name || 'N/A',
      'Present Days': a.presentDays,
      'Absent Days': a.absentDays,
      'Half Days': a.halfDays || 0,
      'Leave Days': a.leaveDays || 0,
      'Approved': a.approvedAt ? 'YES' : 'PENDING',
    }))
    exportToExcel(data, 'FitKids_Attendance_Master', 'Attendance')
  }

  // 4. Payroll export
  const handleExportPayroll = () => {
    const data = payrolls.map((p) => ({
      'Month/Year': `${p.month}/${p.year}`,
      'PTI Name': p.pti?.name || 'N/A',
      'Phone': p.pti?.phone || 'N/A',
      'Bank Account': p.pti?.accountNumber || 'N/A',
      'Bank IFSC': p.pti?.ifscCode || 'N/A',
      'Basic Salary': p.basicSalary,
      'Absence Deduction': p.absentDeduction,
      'Bonus': p.bonus,
      'PF Deduction (12%)': p.pfDeduction,
      'ESI Deduction (0.75%)': p.esiDeduction,
      'Net Salary (INR)': p.netSalary,
      'Status': p.status,
      'Payment Ref / UTR': p.transactionRef || 'N/A',
      'Paid On': p.paidAt ? new Date(p.paidAt).toLocaleDateString() : 'Pending',
    }))
    exportToExcel(data, 'FitKids_Payroll_Disbursal_Report', 'Payroll')
  }

  // 5. Invoices export
  const handleExportInvoices = () => {
    const data = invoices.map((inv) => ({
      'Invoice Number': inv.invoiceNumber,
      'School Name': inv.school?.name || 'N/A',
      'School GSTIN': inv.school?.gstNumber || 'N/A',
      'Billing Month/Year': `${inv.month}/${inv.year}`,
      'Subtotal (INR)': inv.subtotal,
      'CGST (9%)': inv.cgst,
      'SGST (9%)': inv.sgst,
      'IGST (18%)': inv.igst,
      'TDS (INR)': inv.tds,
      'Total Amount (INR)': inv.total,
      'Due Date': inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : 'N/A',
      'Payment Status': inv.status,
    }))
    exportToExcel(data, 'FitKids_GST_Invoices_Register', 'Invoices')
  }

  // 6. Enquiries export
  const handleExportEnquiries = () => {
    const data = enquiries.map((e) => ({
      'Lead Date': new Date(e.createdAt).toLocaleDateString(),
      'School Name': e.schoolName,
      'Contact Person': e.contactPerson,
      'Phone': e.phone,
      'Email': e.email,
      'City': e.city,
      'Board': e.board || 'CBSE',
      'Students': e.students || 0,
      'PTIs Required': e.ptisNeeded || 1,
      'Lead Status': e.status,
      'Lead Source': e.source || 'Website',
      'Notes': e.notes || '—',
    }))
    exportToExcel(data, 'FitKids_School_Leads_Register', 'Leads')
  }

  const reportsList = [
    {
      id: 'schools',
      title: 'Schools & Institution Directory',
      desc: 'Partner schools, active contracts, fee tiers, and contact principals.',
      records: schools.length,
      icon: School,
      color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
      action: handleExportSchools,
    },
    {
      id: 'ptis',
      title: 'PTI Staff Roster & Verification',
      desc: 'Full instructor roster, B.P.Ed qualifications, police checks, and bank details.',
      records: ptis.length,
      icon: Users,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      action: handleExportPTIs,
    },
    {
      id: 'attendance',
      title: 'Monthly Attendance Registers',
      desc: 'Biometric / register attendance logs, leave balances, and working days.',
      records: attendances.length,
      icon: CalendarCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      action: handleExportAttendance,
    },
    {
      id: 'payroll',
      title: 'Payroll Disbursal & Statutory Register',
      desc: 'Monthly basic salaries, PF (12%), ESI (0.75%), absence deductions, and net payouts.',
      records: payrolls.length,
      icon: CreditCard,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      action: handleExportPayroll,
    },
    {
      id: 'invoices',
      title: 'GST Tax Invoices & Billing Register',
      desc: 'All raised school invoices, CGST/SGST/IGST tax splits, collection dates, and overdue status.',
      records: invoices.length,
      icon: Receipt,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      action: handleExportInvoices,
    },
    {
      id: 'enquiries',
      title: 'School Enquiries & Lead Pipeline',
      desc: 'Website quote requests, lead status, conversion metrics, and contact details.',
      records: enquiries.length,
      icon: TrendingUp,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      action: handleExportEnquiries,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-brand-blue" />
            Compliance, Finance & Operations Reports
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Export audit-ready Excel (.xlsx) and CSV datasets for tax filing, statutory compliance, and executive reviews.
          </p>
        </div>
      </div>

      {/* Grid of Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reportsList.map((rep) => {
          const Icon = rep.icon
          const isCurrentLoading = downloading?.includes(rep.id)
          return (
            <Card key={rep.id} className="bg-[#14151A] border-[#1F2128] p-5 flex flex-col justify-between hover:border-brand-blue/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${rep.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="text-xs font-mono bg-black/40 text-brand-muted border-[#1F2128]">
                    {rep.records} Records
                  </Badge>
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">{rep.title}</h3>
                <p className="text-xs text-brand-muted leading-relaxed mb-4">{rep.desc}</p>
              </div>

              <div className="pt-4 border-t border-[#1F2128] flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">FORMAT: .XLSX</span>
                <Button
                  size="sm"
                  onClick={rep.action}
                  disabled={downloading !== null}
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white font-medium text-xs h-8"
                >
                  {isCurrentLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5 mr-1.5" />
                      Export Excel
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
