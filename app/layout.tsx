import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/shared/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'FitKids Staffing – Qualified PTI Teachers for Your School',
    template: '%s | FitKids Staffing',
  },
  description:
    'FitKids Staffing connects Rajasthan schools with verified, qualified PTI (Physical Training Instructor) teachers on monthly contracts. Police-verified, D.P.Ed/B.P.Ed/M.P.Ed qualified staff.',
  keywords: [
    'PTI teacher',
    'physical training instructor',
    'school staffing',
    'Rajasthan',
    'PE teacher',
    'FitKids',
  ],
  authors: [{ name: 'FitKids Staffing' }],
  creator: 'FitKids Staffing',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'FitKids Staffing',
    title: 'FitKids Staffing – Qualified PTI Teachers for Your School',
    description:
      'Hire verified PTI teachers for your school on a monthly contract. Police-verified, qualified, and replaced at no cost.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitKids Staffing',
    description: 'Qualified PTI Teachers for Your School',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'FitKids Staffing',
              url: process.env.NEXT_PUBLIC_APP_URL || 'https://fitkidsstaffing.in',
              logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://fitkidsstaffing.in'}/logo.png`,
              description:
                'Premium Physical Training Instructor (PTI) staffing solutions for schools in Rajasthan.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '42, Vaishali Nagar',
                addressLocality: 'Jaipur',
                addressRegion: 'Rajasthan',
                postalCode: '302021',
                addressCountry: 'IN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-9876543210',
                contactType: 'customer service',
                areaServed: 'IN',
                availableLanguage: ['en', 'hi'],
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
