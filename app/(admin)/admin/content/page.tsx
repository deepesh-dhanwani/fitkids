import React from 'react'
import { prisma } from '@/lib/prisma'
import { ContentManager } from '@/components/admin/ContentManager'

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  const [testimonials, faqs, blogs, gallery, logos] = await Promise.all([
    prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.fAQ.findMany({ orderBy: { order: 'asc' } }),
    prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.galleryItem.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.schoolLogo.findMany({ orderBy: { order: 'asc' } }),
  ])

  return (
    <ContentManager
      initialTestimonials={testimonials}
      initialFaqs={faqs}
      initialBlogs={blogs}
      initialGallery={gallery}
      initialLogos={logos}
    />
  )
}
