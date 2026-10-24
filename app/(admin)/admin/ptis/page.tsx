import React from 'react'
import { prisma } from '@/lib/prisma'
import { PTIsManager } from '@/components/admin/PTIsManager'

export const dynamic = 'force-dynamic'

export default async function AdminPTIsPage() {
  const ptis = await prisma.pTI.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      placements: {
        include: {
          school: {
            select: { name: true, city: true },
          },
        },
      },
      attendance: {
        take: 3,
        orderBy: { month: 'desc' },
      },
      payrolls: {
        take: 3,
        orderBy: { month: 'desc' },
      },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          PTI Teacher & Coach Roster
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Directory of physical education instructors, NCTE degrees, police character clearances, and active school deployments.
        </p>
      </div>

      <PTIsManager initialPTIs={ptis as any} />
    </div>
  )
}
