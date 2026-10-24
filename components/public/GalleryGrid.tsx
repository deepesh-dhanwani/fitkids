'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X, ZoomIn } from 'lucide-react'

interface GalleryItemType {
  id: string
  url: string
  title: string
  category: string
}

const categories = ['All', 'Events', 'Training', 'Schools', 'Sports']

export function GalleryGrid({ items }: { items: GalleryItemType[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeImage, setActiveImage] = useState<GalleryItemType | null>(null)

  const filtered =
    selectedCategory === 'All'
      ? items
      : items.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        )

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-brand text-white shadow-lg'
                : 'bg-card border border-border text-text-muted hover:text-text-primary hover:bg-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative rounded-2xl overflow-hidden border border-border bg-card cursor-pointer shadow-md aspect-[4/3] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-cerulean/50"
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jet/90 via-jet/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-2 text-white backdrop-blur-md">
              <ZoomIn className="h-4 w-4" />
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cerulean bg-cerulean/15 px-2 py-0.5 rounded border border-cerulean/30 inline-block mb-1">
                {item.category}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white font-heading truncate">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-text-muted text-sm">
          No images found in this category.
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={!!activeImage} onOpenChange={() => setActiveImage(null)}>
        <DialogContent className="max-w-4xl p-2 bg-jet/95 border-border overflow-hidden">
          {activeImage && (
            <div className="relative flex flex-col">
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
                <Image
                  src={activeImage.url}
                  alt={activeImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-cerulean font-semibold">
                    {activeImage.category}
                  </span>
                  <h4 className="text-base font-bold text-text-primary">
                    {activeImage.title}
                  </h4>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
