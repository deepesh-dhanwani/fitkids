import React from 'react'
import { prisma } from '@/lib/prisma'
import { ApplicationsManager } from '@/components/admin/ApplicationsManager'

export const dynamic = 'force-dynamic'

export default async function AdminApplicationsPage() {
  const applications = await prisma.pTIApplication.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          PTI Recruitment & Screening Queue
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Review inbound candidate submissions, audit degrees, schedule interviews & school demos, and approve into active teacher roster.
        </p>
      </div>

      <ApplicationsManager initialApplications={applications as any} />
    </div>
  )
}
