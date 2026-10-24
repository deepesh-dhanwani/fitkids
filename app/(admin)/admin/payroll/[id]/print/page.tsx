import React from 'react'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { generatePayslipHTML } from '@/lib/pdf/templates'

interface Props {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function PayslipPrintPage({ params }: Props) {
  const { id } = await params
  const payroll = await prisma.payroll.findUnique({
    where: { id },
    include: {
      pti: {
        include: {
          placements: {
            where: { status: 'ACTIVE' },
            include: { school: true },
          },
        },
      },
    },
  })

  if (!payroll) return notFound()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const assignedSchool = payroll.pti.placements[0]?.school?.name || 'On Standby / Roving'

  const html = generatePayslipHTML({
    ptiName: payroll.pti.name,
    ptiPhone: payroll.pti.phone,
    qualification: payroll.pti.qualification,
    assignedSchool,
    month: months[payroll.month - 1] || 'Current Month',
    year: payroll.year,
    grossPay: payroll.basicSalary,
    absentDays: 0,
    deductions: payroll.absentDeduction,
    pfEmployee: payroll.pfDeduction,
    esiEmployee: payroll.esiDeduction,
    netPay: payroll.netSalary,
    bankAccount: payroll.pti.accountNumber ? `•••• ${payroll.pti.accountNumber.slice(-4)}` : 'N/A',
    bankIfsc: payroll.pti.ifscCode || 'N/A',
    status: payroll.status,
    paidAt: payroll.paidAt ? new Date(payroll.paidAt).toLocaleDateString('en-IN') : undefined,
  })

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="p-4 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between print:hidden">
        <p className="text-sm font-semibold text-zinc-700">Salary Slip Preview • {payroll.pti.name}</p>
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-blue-600 text-white rounded font-medium text-xs hover:bg-blue-700"
          id="print-btn"
        >
          Print Payslip / Save as PDF
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('print-btn')?.addEventListener('click', () => window.print());`,
        }}
      />
    </div>
  )
}
