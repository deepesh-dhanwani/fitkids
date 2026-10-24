import React from 'react'
import { prisma } from '@/lib/prisma'
import { UsersManager } from '@/components/admin/UsersManager'

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  })

  return <UsersManager initialUsers={users} />
}
