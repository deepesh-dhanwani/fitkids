import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { FloatingWhatsApp } from '@/components/public/FloatingWhatsApp'
import { CookieConsent } from '@/components/public/CookieConsent'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-jet text-text-primary selection:bg-cerulean selection:text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <CookieConsent />
    </div>
  )
}
