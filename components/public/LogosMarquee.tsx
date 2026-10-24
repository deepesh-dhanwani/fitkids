import React from 'react'
import Image from 'next/image'

interface SchoolLogoItem {
  id: string
  schoolName: string
  logoUrl: string
}

const defaultLogos: SchoolLogoItem[] = [
  { id: '1', schoolName: 'Delhi Public School', logoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=100&fit=crop' },
  { id: '2', schoolName: "St. Xavier's Senior Secondary", logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=100&fit=crop' },
  { id: '3', schoolName: 'Ryan International School', logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&h=100&fit=crop' },
  { id: '4', schoolName: 'Army Public School', logoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=100&fit=crop' },
  { id: '5', schoolName: 'Neerja Modi School', logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=100&fit=crop' },
  { id: '6', schoolName: 'Mayo College Ajmer', logoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&h=100&fit=crop' },
]

export function LogosMarquee({ logos = defaultLogos }: { logos?: SchoolLogoItem[] }) {
  const items = logos.length > 0 ? logos : defaultLogos

  return (
    <section className="py-14 bg-card-bg/20 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center">
        <span className="text-xs uppercase tracking-widest text-text-muted font-medium">
          Trusted by Rajasthan&apos;s Top School Brands &amp; Trust Boards
        </span>
      </div>

      <div className="relative w-full flex overflow-x-hidden mask-fade">
        <div className="flex animate-marquee whitespace-nowrap space-x-12 items-center">
          {items.concat(items).map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 px-6 py-3 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 shrink-0"
            >
              <div className="relative h-8 w-8 rounded-lg overflow-hidden shrink-0">
                <Image src={logo.logoUrl} alt={logo.schoolName} fill className="object-cover" />
              </div>
              <span className="text-sm font-semibold text-text-primary">
                {logo.schoolName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
