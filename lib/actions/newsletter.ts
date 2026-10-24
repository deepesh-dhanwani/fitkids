'use server'

import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const NewsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function subscribeNewsletter(email: string) {
  const isAllowed = rateLimit('newsletter_sub', 5, 60000)
  if (!isAllowed) {
    return { success: false, error: 'Too many requests. Please try later.' }
  }

  const result = NewsletterSchema.safeParse({ email })
  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message || 'Invalid email' }
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: result.data.email },
      update: {},
      create: { email: result.data.email },
    })

    return {
      success: true,
      message: 'Thank you for subscribing to FitKids Staffing sports education updates!',
    }
  } catch (error) {
    console.error('Newsletter error:', error)
    return { success: false, error: 'Subscription failed. Please try again.' }
  }
}
