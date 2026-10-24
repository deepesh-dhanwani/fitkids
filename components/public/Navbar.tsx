'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  Menu,
  X,
  Sun,
  Moon,
  Activity,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/for-schools', label: 'For Schools' },
  { href: '/careers', label: 'Careers' },
  { href: '/verification', label: 'Verification' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'glass bg-background/80 border-b border-border shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand p-0.5 shadow-md shadow-cerulean/20 group-hover:scale-105 transition-transform">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-jet">
              <Activity className="h-6 w-6 text-cerulean animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold tracking-tight text-text-primary">
              Fit<span className="text-cerulean">Kids</span>{' '}
              <span className="text-neon-rose text-xs font-semibold px-2 py-0.5 rounded-full bg-neon-rose/10 border border-neon-rose/20">
                STAFFING
              </span>
            </span>
            <span className="text-[11px] font-medium text-text-muted tracking-wider uppercase">
              Rajasthan PTI Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors relative',
                  isActive
                    ? 'text-cerulean font-semibold'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-cerulean rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-text-muted hover:text-text-primary hover:bg-card transition-colors"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              <span className="h-4 w-4" />
            ) : theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <Button asChild variant="outline" size="sm" className="hidden xl:inline-flex">
            <Link href="/login">Portal Login</Link>
          </Button>

          <Button asChild variant="brand" size="sm">
            <Link href="/for-schools" className="flex items-center space-x-1.5">
              <span>Hire a PTI</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-text-muted"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              <span className="h-4 w-4" />
            ) : theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-text-primary"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-border bg-jet/95 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'px-4 py-3 text-base font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-cerulean/10 text-cerulean font-semibold'
                      : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="mt-5 flex flex-col space-y-2.5 pt-4 border-t border-border">
            <Button asChild variant="brand" className="w-full">
              <Link href="/for-schools" onClick={() => setIsOpen(false)}>
                Hire a PTI Instructor
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/careers" onClick={() => setIsOpen(false)}>
                Apply as a PTI Teacher
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full text-xs text-text-muted">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Staff & Admin Portal Login
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
