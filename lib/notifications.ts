import { prisma } from './prisma'

export async function createNotification({
  type,
  title,
  message,
  link = '',
  userId,
}: {
  type: string
  title: string
  message: string
  link?: string
  userId?: string
}) {
  try {
    // If no userId specified, notify all admin users
    if (!userId) {
      const admins = await prisma.user.findMany({
        where: {
          isActive: true,
          role: { in: ['SUPER_ADMIN', 'ADMIN'] },
        },
        select: { id: true },
      })

      if (admins.length > 0) {
        await Promise.all(
          admins.map((admin) =>
            prisma.notification.create({
              data: {
                userId: admin.id,
                type,
                title,
                message,
                link,
              },
            })
          )
        )
      }
      return { success: true }
    }

    await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        link,
      },
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to create notification:', error)
    return { success: false, error }
  }
}

export async function logActivity({
  userId,
  action,
  entity,
  entityId = '',
  before = {},
  after = {},
  ip = '',
}: {
  userId?: string
  action: string
  entity: string
  entityId?: string
  before?: Record<string, any>
  after?: Record<string, any>
  ip?: string
}) {
  try {
    await prisma.activityLog.create({
      data: {
        userId: userId || null,
        action,
        entity,
        entityId,
        before: JSON.stringify(before),
        after: JSON.stringify(after),
        ip,
      },
    })
  } catch (err) {
    console.error('Failed to log activity:', err)
  }
}
