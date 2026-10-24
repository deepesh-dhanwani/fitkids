import React from 'react'
import { prisma } from '@/lib/prisma'
import { ReportsManager } from '@/components/admin/ReportsManager'

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
  const [schools, ptis, attendances, payrolls, invoices, enquiries] = await Promise.all([
    prisma.school.findMany({
      include: { placements: { where: { status: 'ACTIVE' } } },
      orderBy: { name: 'asc' },
    }),
    prisma.pTI.findMany({
      include: { placements: { where: { status: 'ACTIVE' }, include: { school: true } } },
      orderBy: { name: 'asc' },
    }),
    prisma.attendance.findMany({
      include: {
        pti: true,
        school: true,
      },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    }),
    prisma.payroll.findMany({
      include: { pti: true },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    }),
    prisma.invoice.findMany({
      include: { school: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return (
    <ReportsManager
      schools={schools}
      ptis={ptis}
      attendances={attendances}
      payrolls={payrolls}
      invoices={invoices}
      enquiries={enquiries}
    />
  )
}
