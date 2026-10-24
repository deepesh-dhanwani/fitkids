import React from 'react'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Calendar, User, ArrowLeft, Share2, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  })
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | FitKids Staffing Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverUrl ? [{ url: post.coverUrl }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true, role: true },
      },
    },
  })

  if (!post) {
    notFound()
  }

  // Related posts
  const related = await prisma.blogPost.findMany({
    where: {
      published: true,
      id: { not: post.id },
    },
    take: 2,
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-semibold text-text-muted hover:text-cerulean transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          <span>Back to PE Journal</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-cerulean bg-cerulean/15 px-3 py-1 rounded-full border border-cerulean/30 inline-block">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-text-primary tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-text-muted pt-2 border-y border-border py-3">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-cerulean" />
              Published on {formatDate(post.publishedAt)}
            </span>
            {post.author && (
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1.5 text-cerulean" />
                By {post.author.name}
              </span>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {post.coverUrl && (
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-border shadow-2xl mb-12">
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-text-primary text-base sm:text-lg leading-relaxed space-y-6">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3
                  key={index}
                  className="text-2xl font-bold font-heading text-text-primary mt-8 mb-3"
                >
                  {paragraph.replace('### ', '')}
                </h3>
              )
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2
                  key={index}
                  className="text-3xl font-bold font-heading text-text-primary mt-10 mb-4"
                >
                  {paragraph.replace('## ', '')}
                </h2>
              )
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n')
              return (
                <ul key={index} className="list-disc list-inside space-y-2 text-text-muted my-4">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace('- ', '')}</li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index} className="text-text-muted">
                {paragraph}
              </p>
            )
          })}
        </div>

        {/* Author Bio Box */}
        <div className="mt-16 rounded-2xl border border-border bg-card p-6 flex items-center space-x-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cerulean/20 text-cerulean font-bold text-lg font-heading">
            {post.author?.name ? post.author.name[0] : 'F'}
          </div>
          <div>
            <h4 className="font-heading font-bold text-text-primary text-sm">
              Published by {post.author?.name || 'FitKids Staffing Editorial Desk'}
            </h4>
            <p className="text-xs text-text-muted mt-0.5">
              FitKids Staffing Physical Education Research & School Operations Bureau, Jaipur.
            </p>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  className="rounded-2xl border border-border bg-card p-5 hover:border-cerulean/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-cerulean uppercase">
                      {rel.category}
                    </span>
                    <h4 className="font-heading font-bold text-base text-text-primary mt-1 mb-2 line-clamp-2">
                      <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                    <p className="text-xs text-text-muted line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border flex justify-end">
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="text-xs font-semibold text-cerulean flex items-center hover:underline"
                    >
                      Read Article <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
