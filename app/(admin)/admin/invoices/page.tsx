import React from 'react'
import { prisma } from '@/lib/prisma'
import { InvoicesManager } from '@/components/admin/InvoicesManager'

export const dynamic = 'force-dynamic'

export default async function AdminInvoicesPage() {
  const [invoices, schools] = await Promise.all([
    prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        school: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
            gstNumber: true,
            feePerPTI: true,
          },
        },
      },
    }),
    prisma.school.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        feePerPTI: true,
      },
    }),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          Invoicing & GST Receivables
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Generate monthly school staffing invoices, compute statutory CGST/SGST/IGST tax breakdowns, record collections, and track aging receivables.
        </p>
      </div>

      <InvoicesManager
        initialInvoices={invoices as any}
        schools={schools}
      />
    </div>
  )
}
