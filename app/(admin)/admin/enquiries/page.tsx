import React from 'react'
import { prisma } from '@/lib/prisma'
import { EnquiriesManager } from '@/components/admin/EnquiriesManager'

export const dynamic = 'force-dynamic'

export default async function AdminEnquiriesPage() {
  const [enquiries, adminUsers] = await Promise.all([
    prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        assignedTo: {
          select: { id: true, name: true },
        },
      },
    }),
    prisma.user.findMany({
      where: { isActive: true },
      select: { id: true, name: true },
    }),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          School Inquiries & Staffing Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Track school leads across qualification, on-campus demo scheduling, proposal submission, and conversion.
        </p>
      </div>

      <EnquiriesManager
        initialEnquiries={enquiries}
        adminUsers={adminUsers}
      />
    </div>
  )
}
