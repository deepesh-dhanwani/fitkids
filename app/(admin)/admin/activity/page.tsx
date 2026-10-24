import React from 'react'
import { prisma } from '@/lib/prisma'
import { ActivityLogsManager } from '@/components/admin/ActivityLogsManager'

export const dynamic = 'force-dynamic'

export default async function ActivityPage() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return <ActivityLogsManager initialLogs={logs} />
}
