import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AdminShell } from '@/components/admin/AdminShell'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Middleware redirects, but we double guard:
  if (!session?.user) {
    redirect('/login')
  }

  // Fetch recent notifications
  const notifications = await prisma.notification.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <AdminShell
      user={{
        name: session.user.name,
        email: session.user.email,
        role: (session.user as any).role || 'ADMIN',
      }}
      notifications={notifications}
    >
      {children}
    </AdminShell>
  )
}
