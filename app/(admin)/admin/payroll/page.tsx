import React from 'react'
import { prisma } from '@/lib/prisma'
import { PayrollManager } from '@/components/admin/PayrollManager'

export const dynamic = 'force-dynamic'

export default async function AdminPayrollPage() {
  const payrolls = await prisma.payroll.findMany({
    orderBy: [{ year: 'desc' }, { month: 'desc' }],
    include: {
      pti: {
        select: {
          id: true,
          name: true,
          qualification: true,
          bankName: true,
          accountNumber: true,
          ifscCode: true,
          pfNumber: true,
          esiNumber: true,
        },
      },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          PTI Payroll & Stipend Management
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Auto-calculate monthly stipends from verified school attendance, process PF/ESI statutory withholdings, and export NEFT bank files.
        </p>
      </div>

      <PayrollManager initialPayrolls={payrolls as any} />
    </div>
  )
}
