import React from 'react'
import { prisma } from '@/lib/prisma'
import { PlacementsManager } from '@/components/admin/PlacementsManager'

export const dynamic = 'force-dynamic'

export default async function AdminPlacementsPage() {
  const [placements, schools, ptis] = await Promise.all([
    prisma.placement.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        school: {
          select: { id: true, name: true, city: true },
        },
        pti: {
          select: { id: true, name: true, qualification: true, phone: true },
        },
      },
    }),
    prisma.school.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, name: true, city: true, feePerPTI: true },
    }),
    prisma.pTI.findMany({
      select: { id: true, name: true, qualification: true, preferredCity: true },
    }),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          Active Deployments & School Placements
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Live instructor allocations across Rajasthan campuses, gross margins, and 24-hour backup substitute workflow.
        </p>
      </div>

      <PlacementsManager
        initialPlacements={placements as any}
        schools={schools}
        ptis={ptis}
      />
    </div>
  )
}
