'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Search, Calendar, User, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface BlogPostItem {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  coverUrl: string
  publishedAt: Date | string | null
  author?: { name: string } | null
}

const categories = [
  'All',
  'Physical Education',
  'School Events',
  'Safety & Compliance',
  'Health & Wellness',
  'Yoga & Fitness',
  'Sports Coaching',
]

export function BlogList({ posts }: { posts: BlogPostItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      post.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 max-w-5xl mx-auto">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input
            placeholder="Search sports articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-cerulean text-white shadow-sm'
                  : 'bg-card border border-border text-text-muted hover:text-text-primary hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtered.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:border-cerulean/50 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden bg-card-bg">
                <Image
                  src={post.coverUrl || 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=400&fit=crop'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-jet/80 backdrop-blur-md text-cerulean border border-white/10">
                  {post.category}
                </span>
              </Link>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-xs text-text-muted mb-3">
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-cerulean" />
                    {formatDate(post.publishedAt)}
                  </span>
                  {post.author && (
                    <span className="flex items-center">
                      <User className="h-3.5 w-3.5 mr-1 text-cerulean" />
                      {post.author.name}
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-cerulean transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-text-muted line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-xs font-semibold text-cerulean hover:text-cerulean/80 transition-colors"
              >
                <span>Read Full Article</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-text-muted text-sm">
          No articles found matching your criteria. Try resetting the search or category filter.
        </div>
      )}
    </div>
  )
}
