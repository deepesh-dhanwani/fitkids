import React from 'react'
import { prisma } from '@/lib/prisma'
import { SchoolsManager } from '@/components/admin/SchoolsManager'

export const dynamic = 'force-dynamic'

export default async function AdminSchoolsPage() {
  const schools = await prisma.school.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      placements: {
        include: {
          pti: {
            select: { id: true, name: true, qualification: true, phone: true },
          },
        },
      },
      invoices: {
        take: 5,
        orderBy: { createdAt: 'desc' },
      },
      documents: {
        take: 5,
      },
      agreements: {
        take: 5,
      },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          Partner Schools Management
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Directory of contracted educational institutions across Rajasthan, active placements, and monthly billing rates.
        </p>
      </div>

      <SchoolsManager initialSchools={schools as any} />
    </div>
  )
}
