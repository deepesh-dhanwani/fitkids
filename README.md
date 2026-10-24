# FitKids Staffing — Physical Education & PTI Staffing Platform

> **Premier Physical Education & Certified PTI Staffing Infrastructure Across Rajasthan, India**

FitKids Staffing is a full-stack, enterprise-grade web application built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Prisma ORM, and NextAuth. It provides a complete public marketing and candidate-intake portal paired with an administrative operating system covering schools CRM, PTI roster management, daily attendance, automated payroll (with Indian PF & ESI statutory deductions), GST tax invoicing, replacement dispatch workflows, and compliance reporting.

---

## 🌟 Key Features

### 1. Public Marketing & Lead Generation
- **Hero & Bento Grids**: Showcasing sports curriculum, multi-sport training, biometric tracking, and Rajasthan coverage.
- **For Schools (`/for-schools`)**: Interactive pricing tiers, fee estimator, SLA guarantees, and instant quote request form.
- **Careers & PTI Applications (`/careers`)**: 3-step candidate onboarding wizard generating unique `APP-YYYYMMDD-XXXX` tracking IDs.
- **Verification Trust Hub (`/verification`)**: 5-stage verification breakdown (B.P.Ed degree, Police Clearance, POSH certification, First-Aid, Skill Trials).
- **Interactive Photo Gallery (`/gallery`)**: Filterable sports day, gymnastics, yoga, and athletic training gallery with lightbox previews.
- **Knowledge Base & Blog (`/blog`)**: Articles on CBSE sports mandates, physical literacy, and child fitness with slug routing.
- **Compliance & Legal Pages**: Child Safety & POSH Policy (`/child-safety`), Terms of Service (`/terms`), Privacy Policy (`/privacy`), Contact Office (`/contact`).
- **Floating Contact Tools**: Persistent WhatsApp chat hotline, accessible mobile navigation drawer, and cookie consent banner.

### 2. Admin Operational Suite (`/admin`)
- **Executive Dashboard (`/admin`)**: Key business metrics (Active Placements, Monthly Revenue, Pending Applications, Deployment Rate) with Recharts trend visuals.
- **School CRM (`/admin/schools`)**: Complete directory of partner institutions across Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bikaner, and Alwar with detail inspection modals.
- **PTI Instructor Roster (`/admin/ptis`)**: Verified instructor database, qualification badges, police verification toggles, and masked banking credentials.
- **Candidate Application Funnel (`/admin/applications`)**: Review applicant resumes, interview notes, 1-click candidate approval into active PTI, or rejection with reason.
- **Placements & 24h Replacement SLA (`/admin/placements`)**: Deploy PTIs to schools, track contract dates, and trigger 24-hour substitute dispatch workflows.
- **Attendance Register (`/admin/attendance`)**: Monthly 26-day visual grid (Present, Absent, Half-Day, Leave, Holiday) with instant Excel export and payroll sync.
- **Payroll & Statutory Engine (`/admin/payroll`)**: Auto-calculated monthly payouts:
  - Base gross stipend
  - Pro-rata absence deductions
  - Employee Provident Fund (PF @ 12%)
  - Employee State Insurance (ESI @ 0.75%)
  - NEFT / RTGS bank transfer batch export
- **GST Invoices & Billing (`/admin/invoices`)**:
  - Auto-generated Rajasthan Intra-State (CGST 9% + SGST 9%) & Inter-State (IGST 18%) tax invoices.
  - Printable tax invoices with electronic bank remittance box.
- **Agreements & Document Vault (`/admin/documents`)**: Track MOU agreements, police clearance PDFs, B.P.Ed certificates, and compliance validity.
- **Content & CMS Hub (`/admin/content`)**: Manage client testimonials, FAQs, blog articles, photo gallery, and school logo ticker.
- **System Settings (`/admin/settings`)**: Configurable company identity, GSTIN, PAN, bank accounts, base fee rates, and deduction percentages.
- **Audit & Activity Trail (`/admin/activity`)**: Tamper-evident activity logs recording user actions, IP addresses, and timestamps.
- **Compliance & Reports Exporter (`/admin/reports`)**: One-click download of six comprehensive datasets in Excel (`.xlsx`) format.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org) with React 19
- **Language**: TypeScript (Strict typing throughout)
- **Styling**: Tailwind CSS with custom Dark Glassmorphism theme (`#0A0A0B` Jet Black, `#1E9BE8` Cerulean Blue, `#FF2D8A` Neon Rose)
- **Database & ORM**: Prisma ORM with SQLite (Development) / PostgreSQL (Production)
- **Authentication**: NextAuth.js (v5 Beta) with Credentials Provider & Session Guards
- **Form Management**: React Hook Form + Zod schema validation
- **Data Tables & Charts**: TanStack React Table & Recharts
- **Spreadsheets**: XLSX for multi-sheet Excel generation
- **Fonts**: Space Grotesk (Headings) & Inter (Body text)
- **Icons**: Lucide React

---

## 🚀 Quick Start & Setup

### Prerequisites
- Node.js 18.x or 20.x
- npm or pnpm

### 1. Installation
```bash
# Clone or open workspace
cd fitskid

# Install dependencies
npm install
```

### 2. Environment Variables
Create a `.env` file in the project root:
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="fitkids-secret-key-change-in-production-2026"
```

### 3. Database Initialization & Seeding
```bash
# Generate Prisma Client
npx prisma generate

# Apply migrations
npx prisma migrate dev --name init

# Populate database with Rajasthan seed data
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Demo Credentials

Use any of the following accounts to access the Admin Portal (`/login` or `/admin`):

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@fitkidsstaffing.in` | `ChangeMe@123` | Full access across all 15 operational modules & settings |
| **HR & Operations** | `hr@fitkidsstaffing.in` | `ChangeMe@123` | PTIs, candidate applications, schools, placements, attendance |
| **Accounts & Finance** | `accounts@fitkidsstaffing.in` | `ChangeMe@123` | Payroll calculation, GST invoices, financial reports |

---

## 🗄️ Database Switching: SQLite to PostgreSQL

The project is preconfigured with SQLite for quick local development without requiring local database servers. To switch to PostgreSQL (e.g. Supabase, Neon, AWS RDS, Railway):

1. **Update `prisma/schema.prisma`**:
   Change the `datasource db` block:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Update `.env`**:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/fitkids?schema=public"
   ```

3. **Migrate & Seed**:
   ```bash
   npx prisma migrate dev --name init_postgres
   npx prisma db seed
   ```

---

## 📁 Project Structure

```
fitskid/
├── app/
│   ├── (admin)/
│   │   └── admin/
│   │       ├── activity/          # Audit log trail
│   │       ├── applications/      # Candidate applications funnel
│   │       ├── attendance/        # 26-day attendance register
│   │       ├── content/           # CMS for blogs, FAQs, testimonials
│   │       ├── documents/         # MOUs & verification PDFs
│   │       ├── enquiries/         # School leads CRM & Kanban
│   │       ├── invoices/          # GST Invoices & tax print views
│   │       ├── payroll/           # Payroll engine & payslips
│   │       ├── placements/        # Instructor deployments & substitute SLA
│   │       ├── ptis/              # PTI instructor roster
│   │       ├── reports/           # Excel/CSV reports center
│   │       ├── schools/           # School directory & profiles
│   │       ├── settings/          # Global platform settings
│   │       ├── users/             # Admin team & permissions
│   │       ├── layout.tsx         # Admin shell layout
│   │       └── page.tsx           # Dashboard with analytics
│   ├── (public)/
│   │   ├── about/                 # Story & leadership
│   │   ├── blog/                  # Blog listing & slug reader
│   │   ├── careers/               # PTI candidate 3-step application
│   │   ├── child-safety/          # POSH & safety policy
│   │   ├── contact/               # Contact info & map
│   │   ├── for-schools/           # Pricing & quote request form
│   │   ├── gallery/               # Photo/media gallery
│   │   ├── privacy/               # Privacy policy
│   │   ├── services/              # 5 PE service tiers
│   │   ├── terms/                 # Terms of service
│   │   ├── verification/          # 5-stage vetting protocol
│   │   └── layout.tsx             # Public navbar & footer layout
│   ├── api/
│   │   └── auth/[...nextauth]/    # NextAuth API route
│   ├── login/                     # Branded admin sign-in page
│   ├── error.tsx                  # Custom error boundary
│   ├── not-found.tsx              # Custom 404 page
│   ├── manifest.ts                # PWA manifest
│   ├── robots.ts                  # Robots.txt configuration
│   ├── sitemap.ts                 # Dynamic sitemap generator
│   ├── layout.tsx                 # Root layout with fonts & ThemeProvider
│   └── page.tsx                   # Public homepage
├── components/
│   ├── admin/                     # Admin management views & charts
│   ├── public/                    # Public UI sections, forms, navbar
│   ├── shared/                    # ThemeProvider, toaster, utilities
│   └── ui/                        # Reusable shadcn/Radix components
├── lib/
│   ├── actions/                   # Server Actions (auth, admin, enquiries, apps)
│   ├── pdf/                       # Printable Invoice & Payslip templates
│   ├── auth.ts                    # NextAuth configuration
│   ├── gst.ts                     # Rajasthan GST 18% calculation engine
│   ├── payroll.ts                 # Gross pay, PF (12%), ESI (0.75%) engine
│   ├── prisma.ts                  # Prisma client singleton
│   └── types.ts                   # Domain TypeScript definitions
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Comprehensive seed data script
├── tailwind.config.ts             # Brand colors, fonts, animations
└── tsconfig.json                  # Strict TypeScript configuration
```

---

## 📜 Compliance & Statutory Notes

1. **GST Calculation**:
   - Rajasthan Intra-State (State Code 08): CGST 9% + SGST 9% (Total 18%)
   - Inter-State: IGST 18%
   - SAC Code: `998311` (Management Consulting & Staffing Services)
2. **Payroll Deductions**:
   - Employee Provident Fund (PF): 12% of basic stipend
   - Employee State Insurance (ESI): 0.75% of gross earnings (applicable where gross <= ₹21,000/month)
3. **Child Safety**:
   - Mandatory background checks, local police clearance certificates, and POSH Act 2013 training compliance for every deployed PTI instructor.

---

## 📄 License
Commercial proprietary software developed for **FitKids Staffing Private Limited**, Jaipur, Rajasthan. All rights reserved.
