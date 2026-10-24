import React from 'react'
import { prisma } from '@/lib/prisma'
import { BlogList } from '@/components/public/BlogList'

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    include: {
      author: {
        select: { name: true },
      },
    },
  })

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cerulean bg-cerulean/10 px-3 py-1 rounded-full border border-cerulean/20">
            Insights & Guides
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-text-primary">
            FitKids Physical Education Journal
          </h1>
          <p className="mt-4 text-text-muted text-base sm:text-lg leading-relaxed">
            Practical strategies, compliance guidelines, and training methodologies for school principals and physical training directors across Rajasthan.
          </p>
        </div>

        <BlogList posts={posts} />
      </div>
    </div>
  )
}
