import React from 'react'
import { prisma } from '@/lib/prisma'
import { AttendanceManager } from '@/components/admin/AttendanceManager'

export const dynamic = 'force-dynamic'

export default async function AdminAttendancePage() {
  const schools = await prisma.school.findMany({
    where: { status: 'ACTIVE' },
    include: {
      placements: {
        where: { status: 'ACTIVE' },
        include: {
          pti: {
            select: { id: true, name: true, qualification: true },
          },
          school: {
            include: {
              attendance: true,
            },
          },
        },
      },
    },
  })

  // Format into cleanly queryable structure
  const formattedSchools = schools.map((s) => ({
    id: s.id,
    name: s.name,
    city: s.city,
    placements: s.placements.map((pl) => ({
      id: pl.id,
      ptiId: pl.ptiId,
      pti: pl.pti,
      attendance: pl.school.attendance.filter((a) => a.ptiId === pl.ptiId),
    })),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          Monthly PTI Attendance Tracker
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Mark daily biometric presence (P/A/H/L) for deployed instructors, approve institutional attendance, and export Excel rosters.
        </p>
      </div>

      <AttendanceManager schoolsData={formattedSchools} />
    </div>
  )
}
