import React from 'react'
import { prisma } from '@/lib/prisma'
import { GalleryGrid } from '@/components/public/GalleryGrid'

export default async function GalleryPage() {
  const galleryItems = await prisma.galleryItem.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            On the Ground
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-text-primary">
            FitKids Staffing Action Gallery
          </h1>
          <p className="mt-4 text-text-muted text-base sm:text-lg leading-relaxed">
            Moments from annual sports days, morning drills, athletics camps, and fitness workshops across our partner schools in Rajasthan.
          </p>
        </div>

        <GalleryGrid items={galleryItems} />
      </div>
    </div>
  )
}
