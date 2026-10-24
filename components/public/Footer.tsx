import Link from 'next/link'
import {
  Activity,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  CheckCircle2,
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-jet text-text-primary">
      {/* Top Banner - Assurance Badges */}
      <div className="border-b border-border/60 bg-card-bg/40 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-8 w-8 text-cerulean mb-2" />
              <h4 className="font-semibold text-sm">100% Police Verified</h4>
              <p className="text-xs text-text-muted mt-1">Full state CID background check</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-neon-rose mb-2" />
              <h4 className="font-semibold text-sm">NCTE Recognized Staff</h4>
              <p className="text-xs text-text-muted mt-1">D.P.Ed, B.P.Ed & M.P.Ed qualified</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mb-2" />
              <h4 className="font-semibold text-sm">24h Replacement Guarantee</h4>
              <p className="text-xs text-text-muted mt-1">Zero disruption to class schedules</p>
            </div>
            <div className="flex flex-col items-center">
              <Activity className="h-8 w-8 text-amber-400 mb-2" />
              <h4 className="font-semibold text-sm">Fully Managed Compliance</h4>
              <p className="text-xs text-text-muted mt-1">PF, ESI, gratuity & GST handled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-jet">
                  <Activity className="h-5 w-5 text-cerulean" />
                </div>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-text-primary">
                Fit<span className="text-cerulean">Kids</span> Staffing
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              Rajasthan&apos;s premier physical education instructor supply agency. Connecting prestigious CBSE, ICSE, and state board institutions with certified, verified, and passionate sports educators.
            </p>
            <div className="pt-2 text-xs text-text-muted space-y-1">
              <div><strong className="text-text-primary">GSTIN:</strong> 08AAACF1234A1Z5</div>
              <div><strong className="text-text-primary">UDYAM:</strong> UDYAM-RJ-14-0098234</div>
              <div><strong className="text-text-primary">Headquarters:</strong> Jaipur, Rajasthan, India</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-text-primary mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li><Link href="/" className="hover:text-cerulean transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-cerulean transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-cerulean transition-colors">Our Services</Link></li>
              <li><Link href="/for-schools" className="hover:text-cerulean transition-colors">School Partnerships</Link></li>
              <li><Link href="/careers" className="hover:text-cerulean transition-colors">PTI Teacher Careers</Link></li>
              <li><Link href="/verification" className="hover:text-cerulean transition-colors">Verification Process</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-text-primary mb-4">
              Resources & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li><Link href="/blog" className="hover:text-cerulean transition-colors">PE & Sports Blog</Link></li>
              <li><Link href="/gallery" className="hover:text-cerulean transition-colors">Event Gallery</Link></li>
              <li><Link href="/child-safety" className="hover:text-cerulean transition-colors">Child Safety Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-cerulean transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cerulean transition-colors">Terms of Service</Link></li>
              <li><Link href="/login" className="hover:text-cerulean transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-text-primary mb-4">
              Contact Desk
            </h4>
            <div className="space-y-3 text-sm text-text-muted">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-cerulean mt-0.5 shrink-0" />
                <span>42, Vaishali Nagar, Jaipur, Rajasthan 302021</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-cerulean shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-cerulean shrink-0" />
                <span>info@fitkidsstaffing.in</span>
              </div>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ● Office Open Mon–Sat 9AM–6PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-border py-6 bg-jet/60">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>© {new Date().getFullYear()} FitKids Staffing India Private Limited. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-text-primary transition-colors">Terms</Link>
            <Link href="/child-safety" className="hover:text-text-primary transition-colors">Child Safety</Link>
            <Link href="/contact" className="hover:text-text-primary transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
