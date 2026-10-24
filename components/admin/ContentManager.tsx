'use client'

import React, { useState } from 'react'
import {
  MessageSquareQuote,
  HelpCircle,
  FileText,
  Image as ImageIcon,
  Building,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Star,
  CheckCircle,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  createOrUpdateTestimonial,
  deleteTestimonial,
  createOrUpdateFAQ,
  deleteFAQ,
  createOrUpdateBlogPost,
  deleteBlogPost,
  createGalleryItem,
  deleteGalleryItem,
  createOrUpdateSchoolLogo,
  deleteSchoolLogo,
} from '@/lib/actions/admin'

interface ContentProps {
  initialTestimonials: any[]
  initialFaqs: any[]
  initialBlogs: any[]
  initialGallery: any[]
  initialLogos: any[]
}

export function ContentManager({
  initialTestimonials,
  initialFaqs,
  initialBlogs,
  initialGallery,
  initialLogos,
}: ContentProps) {
  const [activeTab, setActiveTab] = useState('testimonials')
  const [loading, setLoading] = useState(false)

  // Dialog states
  const [testimonialModal, setTestimonialModal] = useState<any | null>(null)
  const [faqModal, setFaqModal] = useState<any | null>(null)
  const [blogModal, setBlogModal] = useState<any | null>(null)
  const [galleryModal, setGalleryModal] = useState<any | null>(null)
  const [logoModal, setLogoModal] = useState<any | null>(null)

  // Testimonial Handler
  const handleSaveTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    await createOrUpdateTestimonial({
      id: testimonialModal?.id,
      schoolName: fd.get('schoolName') as string,
      contactName: fd.get('contactName') as string,
      designation: fd.get('designation') as string,
      rating: Number(fd.get('rating') || 5),
      text: fd.get('text') as string,
      photoUrl: fd.get('photoUrl') as string,
    })
    setLoading(false)
    setTestimonialModal(null)
    window.location.reload()
  }

  // FAQ Handler
  const handleSaveFAQ = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    await createOrUpdateFAQ({
      id: faqModal?.id,
      question: fd.get('question') as string,
      answer: fd.get('answer') as string,
      category: fd.get('category') as string,
      order: Number(fd.get('order') || 0),
    })
    setLoading(false)
    setFaqModal(null)
    window.location.reload()
  }

  // Blog Handler
  const handleSaveBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    await createOrUpdateBlogPost({
      id: blogModal?.id,
      title: fd.get('title') as string,
      slug: (fd.get('slug') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: fd.get('excerpt') as string,
      content: fd.get('content') as string,
      category: fd.get('category') as string,
      coverUrl: fd.get('coverUrl') as string,
      published: fd.get('published') === 'on',
    })
    setLoading(false)
    setBlogModal(null)
    window.location.reload()
  }

  // Gallery Handler
  const handleSaveGallery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    await createGalleryItem({
      title: fd.get('title') as string,
      category: fd.get('category') as string,
      url: fd.get('url') as string,
      type: (fd.get('type') as string) || 'IMAGE',
    })
    setLoading(false)
    setGalleryModal(null)
    window.location.reload()
  }

  // Logo Handler
  const handleSaveLogo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    await createOrUpdateSchoolLogo({
      id: logoModal?.id,
      name: fd.get('name') as string,
      logoUrl: fd.get('logoUrl') as string,
      order: Number(fd.get('order') || 0),
    })
    setLoading(false)
    setLogoModal(null)
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-brand-blue" />
            Website CMS & Content Hub
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Manage public testimonials, FAQ answers, blog articles, school logos, and photo gallery.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="testimonials" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[#14151A] border border-[#1F2128] p-1 grid grid-cols-2 sm:grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="testimonials" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">
            <MessageSquareQuote className="h-4 w-4 mr-1.5" />
            Testimonials ({initialTestimonials.length})
          </TabsTrigger>
          <TabsTrigger value="faqs" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">
            <HelpCircle className="h-4 w-4 mr-1.5" />
            FAQs ({initialFaqs.length})
          </TabsTrigger>
          <TabsTrigger value="blogs" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">
            <FileText className="h-4 w-4 mr-1.5" />
            Blog ({initialBlogs.length})
          </TabsTrigger>
          <TabsTrigger value="gallery" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">
            <ImageIcon className="h-4 w-4 mr-1.5" />
            Gallery ({initialGallery.length})
          </TabsTrigger>
          <TabsTrigger value="logos" className="data-[state=active]:bg-brand-blue data-[state=active]:text-white">
            <Building className="h-4 w-4 mr-1.5" />
            Logos ({initialLogos.length})
          </TabsTrigger>
        </TabsList>

        {/* 1. TESTIMONIALS TAB */}
        <TabsContent value="testimonials" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-brand-muted">
              Display client endorsements and ratings on the home & for-schools pages.
            </p>
            <Button
              onClick={() => setTestimonialModal({ rating: 5 })}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Testimonial
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialTestimonials.map((item) => (
              <Card key={item.id} className="bg-[#14151A] border-[#1F2128] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < item.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-zinc-600'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setTestimonialModal(item)}
                        className="h-8 w-8 p-0 text-brand-muted hover:text-white"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={async () => {
                          if (confirm('Delete testimonial?')) {
                            await deleteTestimonial(item.id)
                            window.location.reload()
                          }
                        }}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-300 italic mb-4">"{item.text}"</p>
                </div>
                <div className="pt-3 border-t border-[#1F2128] flex items-center gap-3">
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.contactName}
                      className="w-9 h-9 rounded-full object-cover border border-[#1F2128]"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center font-bold text-xs">
                      {item.contactName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-tight">{item.contactName}</h4>
                    <p className="text-xs text-brand-muted">{item.designation}, {item.schoolName}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 2. FAQS TAB */}
        <TabsContent value="faqs" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-brand-muted">
              Frequently asked questions grouped into Schools, PTIs, and General topics.
            </p>
            <Button
              onClick={() => setFaqModal({ category: 'General', order: 0 })}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              <Plus className="h-4 w-4 mr-1" /> Add FAQ
            </Button>
          </div>

          <div className="space-y-3">
            {initialFaqs.map((faq) => (
              <Card key={faq.id} className="bg-[#14151A] border-[#1F2128] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs text-brand-blue border-brand-blue/30">
                        {faq.category}
                      </Badge>
                      <span className="text-xs text-brand-muted">Order: {faq.order}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                    <p className="text-sm text-zinc-400 whitespace-pre-line">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFaqModal(faq)}
                      className="h-8 w-8 p-0 text-brand-muted hover:text-white"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={async () => {
                        if (confirm('Delete FAQ?')) {
                          await deleteFAQ(faq.id)
                          window.location.reload()
                        }
                      }}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 3. BLOGS TAB */}
        <TabsContent value="blogs" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-brand-muted">
              Publish sports curriculum, fitness guides, and child wellness articles.
            </p>
            <Button
              onClick={() => setBlogModal({ published: true, category: 'Curriculum' })}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              <Plus className="h-4 w-4 mr-1" /> Create Article
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {initialBlogs.map((blog) => (
              <Card key={blog.id} className="bg-[#14151A] border-[#1F2128] overflow-hidden flex flex-col justify-between">
                <div>
                  {blog.coverUrl && (
                    <div className="h-40 w-full overflow-hidden bg-zinc-900 border-b border-[#1F2128]">
                      <img src={blog.coverUrl} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs text-brand-blue border-brand-blue/30">
                        {blog.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={blog.published ? 'text-emerald-400 border-emerald-500/30' : 'text-zinc-500'}
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-white line-clamp-2">{blog.title}</h3>
                    <p className="text-xs text-brand-muted line-clamp-3">{blog.excerpt}</p>
                  </div>
                </div>
                <div className="p-4 pt-0 border-t border-[#1F2128]/60 flex items-center justify-between mt-3">
                  <a
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-brand-blue hover:underline flex items-center gap-1"
                  >
                    View <ExternalLink className="h-3 w-3" />
                  </a>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setBlogModal(blog)}
                      className="h-8 w-8 p-0 text-brand-muted hover:text-white"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={async () => {
                        if (confirm('Delete blog post?')) {
                          await deleteBlogPost(blog.id)
                          window.location.reload()
                        }
                      }}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 4. GALLERY TAB */}
        <TabsContent value="gallery" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-brand-muted">
              School sports events, PTI coaching camps, and training action photos.
            </p>
            <Button
              onClick={() => setGalleryModal({ type: 'IMAGE', category: 'Athletics' })}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Media
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {initialGallery.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden border border-[#1F2128] bg-[#14151A] aspect-[4/3]"
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                  <Badge variant="outline" className="w-fit text-[10px] bg-black/60 text-brand-blue border-brand-blue/30 mb-1">
                    {item.category}
                  </Badge>
                  <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                </div>
                <button
                  onClick={async () => {
                    if (confirm('Delete media item?')) {
                      await deleteGalleryItem(item.id)
                      window.location.reload()
                    }
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-red-400 hover:bg-black hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* 5. LOGOS TAB */}
        <TabsContent value="logos" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-brand-muted">
              Partner school logos shown on the public animated marquee ticker.
            </p>
            <Button
              onClick={() => setLogoModal({ order: initialLogos.length })}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              <Plus className="h-4 w-4 mr-1" /> Add School Logo
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {initialLogos.map((logo) => (
              <Card key={logo.id} className="bg-[#14151A] border-[#1F2128] p-4 flex flex-col items-center justify-between text-center relative group">
                <div className="h-20 w-full flex items-center justify-center p-2">
                  <img src={logo.logoUrl} alt={logo.schoolName || logo.name} className="max-h-16 max-w-full object-contain filter grayscale contrast-125 group-hover:grayscale-0 transition-all" />
                </div>
                <div className="mt-2 w-full">
                  <p className="text-xs font-semibold text-white truncate">{logo.schoolName || logo.name}</p>
                  <span className="text-[10px] text-brand-muted">Order: {logo.order}</span>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setLogoModal(logo)}
                    className="h-6 w-6 p-0 text-brand-muted hover:text-white bg-black/60"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={async () => {
                      if (confirm('Delete logo?')) {
                        await deleteSchoolLogo(logo.id)
                        window.location.reload()
                      }
                    }}
                    className="h-6 w-6 p-0 text-red-400 hover:text-red-300 bg-black/60"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* MODAL: TESTIMONIAL */}
      {testimonialModal && (
        <Dialog open onOpenChange={() => setTestimonialModal(null)}>
          <DialogContent className="bg-[#14151A] border-[#1F2128] text-white max-w-md">
            <DialogHeader>
              <DialogTitle>{testimonialModal.id ? 'Edit Testimonial' : 'New Testimonial'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div>
                <Label>School Name</Label>
                <Input name="schoolName" defaultValue={testimonialModal.schoolName || ''} required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Contact Person</Label>
                  <Input name="contactName" defaultValue={testimonialModal.contactName || ''} required className="bg-black/40 border-[#1F2128] mt-1" />
                </div>
                <div>
                  <Label>Designation</Label>
                  <Input name="designation" defaultValue={testimonialModal.designation || 'Principal'} required className="bg-black/40 border-[#1F2128] mt-1" />
                </div>
              </div>
              <div>
                <Label>Rating (1-5)</Label>
                <Input type="number" min="1" max="5" name="rating" defaultValue={testimonialModal.rating || 5} required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div>
                <Label>Photo URL (Optional)</Label>
                <Input name="photoUrl" defaultValue={testimonialModal.photoUrl || ''} className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div>
                <Label>Testimonial Quote</Label>
                <Textarea name="text" defaultValue={testimonialModal.text || ''} rows={4} required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setTestimonialModal(null)} className="border-[#1F2128]">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-brand-blue hover:bg-brand-blue/90 text-white">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* MODAL: FAQ */}
      {faqModal && (
        <Dialog open onOpenChange={() => setFaqModal(null)}>
          <DialogContent className="bg-[#14151A] border-[#1F2128] text-white max-w-md">
            <DialogHeader>
              <DialogTitle>{faqModal.id ? 'Edit FAQ' : 'New FAQ'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveFAQ} className="space-y-4">
              <div>
                <Label>Question</Label>
                <Input name="question" defaultValue={faqModal.question || ''} required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Category</Label>
                  <select
                    name="category"
                    defaultValue={faqModal.category || 'General'}
                    className="w-full h-10 px-3 rounded-md bg-black/40 border border-[#1F2128] text-white text-sm mt-1"
                  >
                    <option value="General">General</option>
                    <option value="Schools">Schools</option>
                    <option value="PTIs">PTIs / Careers</option>
                    <option value="Billing">Billing & Safety</option>
                  </select>
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" name="order" defaultValue={faqModal.order || 0} className="bg-black/40 border-[#1F2128] mt-1" />
                </div>
              </div>
              <div>
                <Label>Answer</Label>
                <Textarea name="answer" defaultValue={faqModal.answer || ''} rows={4} required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setFaqModal(null)} className="border-[#1F2128]">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-brand-blue hover:bg-brand-blue/90 text-white">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* MODAL: BLOG */}
      {blogModal && (
        <Dialog open onOpenChange={() => setBlogModal(null)}>
          <DialogContent className="bg-[#14151A] border-[#1F2128] text-white max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{blogModal.id ? 'Edit Blog Article' : 'New Blog Article'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <Label>Article Title</Label>
                <Input name="title" defaultValue={blogModal.title || ''} required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>URL Slug</Label>
                  <Input name="slug" defaultValue={blogModal.slug || ''} placeholder="e.g. importance-of-pe" required className="bg-black/40 border-[#1F2128] mt-1" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input name="category" defaultValue={blogModal.category || 'Fitness'} required className="bg-black/40 border-[#1F2128] mt-1" />
                </div>
              </div>
              <div>
                <Label>Cover Image URL</Label>
                <Input name="coverUrl" defaultValue={blogModal.coverUrl || ''} placeholder="https://images.unsplash.com/..." className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div>
                <Label>Summary / Excerpt</Label>
                <Textarea name="excerpt" defaultValue={blogModal.excerpt || ''} rows={2} required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div>
                <Label>Full Content (Markdown or HTML)</Label>
                <Textarea name="content" defaultValue={blogModal.content || ''} rows={7} required className="bg-black/40 border-[#1F2128] mt-1 font-mono text-xs" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  defaultChecked={blogModal.published ?? true}
                  className="rounded border-[#1F2128] bg-black/40 text-brand-blue"
                />
                <Label htmlFor="published" className="cursor-pointer">Publish immediately</Label>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setBlogModal(null)} className="border-[#1F2128]">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-brand-blue hover:bg-brand-blue/90 text-white">Save Post</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* MODAL: GALLERY */}
      {galleryModal && (
        <Dialog open onOpenChange={() => setGalleryModal(null)}>
          <DialogContent className="bg-[#14151A] border-[#1F2128] text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Add Gallery Media</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveGallery} className="space-y-4">
              <div>
                <Label>Caption / Title</Label>
                <Input name="title" placeholder="Annual Sports Day 2026" required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Category</Label>
                  <select
                    name="category"
                    className="w-full h-10 px-3 rounded-md bg-black/40 border border-[#1F2128] text-white text-sm mt-1"
                  >
                    <option value="Athletics">Athletics</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Events">Events</option>
                    <option value="Sports Day">Sports Day</option>
                    <option value="Training">Training</option>
                  </select>
                </div>
                <div>
                  <Label>Type</Label>
                  <select
                    name="type"
                    className="w-full h-10 px-3 rounded-md bg-black/40 border border-[#1F2128] text-white text-sm mt-1"
                  >
                    <option value="IMAGE">Image</option>
                    <option value="VIDEO">Video</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Image / Media URL</Label>
                <Input name="url" placeholder="https://images.unsplash.com/..." required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setGalleryModal(null)} className="border-[#1F2128]">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-brand-blue hover:bg-brand-blue/90 text-white">Upload Media</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* MODAL: LOGO */}
      {logoModal && (
        <Dialog open onOpenChange={() => setLogoModal(null)}>
          <DialogContent className="bg-[#14151A] border-[#1F2128] text-white max-w-md">
            <DialogHeader>
              <DialogTitle>{logoModal.id ? 'Edit School Logo' : 'Add School Logo'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveLogo} className="space-y-4">
              <div>
                <Label>School Name</Label>
                <Input name="name" defaultValue={logoModal.schoolName || logoModal.name || ''} placeholder="Delhi Public School" required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div>
                <Label>Logo Image URL</Label>
                <Input name="logoUrl" defaultValue={logoModal.logoUrl || ''} placeholder="https://images.unsplash.com/..." required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" name="order" defaultValue={logoModal.order || 0} className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setLogoModal(null)} className="border-[#1F2128]">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-brand-blue hover:bg-brand-blue/90 text-white">Save Logo</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
