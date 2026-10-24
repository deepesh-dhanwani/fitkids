import { prisma } from '@/lib/prisma'
import { Hero } from '@/components/public/Hero'
import { StatsCounter } from '@/components/public/StatsCounter'
import { HowItWorks } from '@/components/public/HowItWorks'
import { ServicesBento } from '@/components/public/ServicesBento'
import { VerificationBadges } from '@/components/public/VerificationBadges'
import { WhyChooseUs } from '@/components/public/WhyChooseUs'
import { TestimonialsSection } from '@/components/public/TestimonialsSection'
import { LogosMarquee } from '@/components/public/LogosMarquee'
import { FaqSection } from '@/components/public/FaqSection'
import { CtaBand } from '@/components/public/CtaBand'
import { NewsletterSection } from '@/components/public/NewsletterSection'

export async function HomePage() {
  const [testimonials, faqs, schoolLogos] = await Promise.all([
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.schoolLogo.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
  ])

  return (
    <div className="flex flex-col">
      <Hero />
      <StatsCounter />
      <HowItWorks />
      <ServicesBento />
      <VerificationBadges />
      <WhyChooseUs />
      <TestimonialsSection testimonials={testimonials} />
      <LogosMarquee logos={schoolLogos} />
      <FaqSection faqs={faqs} />
      <CtaBand />
      <NewsletterSection />
    </div>
  )
}
