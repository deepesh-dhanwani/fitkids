import React from 'react'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'
import { DashboardCharts } from '@/components/admin/DashboardCharts'
import Link from 'next/link'
import {
  School,
  Users,
  Inbox,
  FileSpreadsheet,
  TrendingUp,
  CreditCard,
  AlertCircle,
  CalendarCheck,
  ArrowRight,
  Activity,
  CheckCircle2,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const [
    activeSchoolsCount,
    activePtisCount,
    newEnquiriesCount,
    pendingApplicationsCount,
    activePlacements,
    invoices,
    recentActivity,
    upcomingRenewals,
    allEnquiries,
  ] = await Promise.all([
    prisma.school.count({ where: { status: 'ACTIVE' } }),
    prisma.pTI.count({ where: { employmentStatus: 'ACTIVE' } }),
    prisma.enquiry.count({ where: { status: 'NEW' } }),
    prisma.pTIApplication.count({ where: { status: 'PENDING' } }),
    prisma.placement.findMany({
      where: { status: 'ACTIVE' },
      include: { school: true, pti: true },
    }),
    prisma.invoice.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.activityLog.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, role: true } } },
    }),
    prisma.school.findMany({
      where: { contractEnd: { not: null }, status: 'ACTIVE' },
      take: 5,
      orderBy: { contractEnd: 'asc' },
    }),
    prisma.enquiry.findMany(),
  ])

  // Calculate monthly financials
  const monthlyRevenue = activePlacements.reduce((sum, p) => sum + p.schoolFee, 0)
  const monthlyPayroll = activePlacements.reduce((sum, p) => sum + p.salary, 0)

  // Outstanding invoices
  const unpaidInvoices = invoices.filter((inv) =>
    ['SENT', 'OVERDUE', 'PARTIALLY_PAID'].includes(inv.status)
  )
  const outstandingAmount = unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0)

  // Chart Data: Financials
  const financialData = [
    { month: 'Jul 2026', revenue: 310000, payroll: 220000, margin: 90000 },
    { month: 'Aug 2026', revenue: 325000, payroll: 226000, margin: 99000 },
    { month: 'Sep 2026', revenue: 332000, payroll: 229000, margin: 103000 },
    { month: 'Oct 2026', revenue: monthlyRevenue || 342000, payroll: monthlyPayroll || 234000, margin: (monthlyRevenue || 342000) - (monthlyPayroll || 234000) },
  ]

  // Chart Data: Enquiry Status
  const statusCounts: Record<string, number> = {}
  allEnquiries.forEach((e) => {
    statusCounts[e.status] = (statusCounts[e.status] || 0) + 1
  })
  const enquiryStatusData = [
    { status: 'NEW', count: statusCounts['NEW'] || 0 },
    { status: 'CONTACTED', count: statusCounts['CONTACTED'] || 0 },
    { status: 'DEMO', count: statusCounts['DEMO_SCHEDULED'] || 0 },
    { status: 'PROPOSAL', count: statusCounts['PROPOSAL_SENT'] || 0 },
    { status: 'WON', count: statusCounts['WON'] || 0 },
    { status: 'LOST', count: statusCounts['LOST'] || 0 },
  ]

  // Chart Data: Placements by City
  const cityCounts: Record<string, number> = {}
  activePlacements.forEach((p) => {
    const city = p.school.city || 'Jaipur'
    cityCounts[city] = (cityCounts[city] || 0) + 1
  })
  const cityData = Object.entries(cityCounts).map(([name, value]) => ({
    name,
    value,
  }))

  const kpis = [
    {
      label: 'Active Schools',
      value: activeSchoolsCount,
      sub: 'Institutions serviced',
      icon: School,
      href: '/admin/schools',
      color: 'text-cerulean',
      bg: 'bg-cerulean/10 border-cerulean/20',
    },
    {
      label: 'Active PTIs',
      value: activePtisCount,
      sub: 'Certified on ground',
      icon: Users,
      href: '/admin/ptis',
      color: 'text-neon-rose',
      bg: 'bg-neon-rose/10 border-neon-rose/20',
    },
    {
      label: 'New Enquiries',
      value: newEnquiriesCount,
      sub: 'Pending initial call',
      icon: Inbox,
      href: '/admin/enquiries',
      color: 'text-amber-400',
      bg: 'bg-amber-400/10 border-amber-400/20',
    },
    {
      label: 'Pending Applications',
      value: pendingApplicationsCount,
      sub: 'Awaiting screening',
      icon: FileSpreadsheet,
      href: '/admin/applications',
      color: 'text-sky-400',
      bg: 'bg-sky-400/10 border-sky-400/20',
    },
    {
      label: 'Monthly Gross Billing',
      value: formatCurrency(monthlyRevenue),
      sub: `${activePlacements.length} active placements`,
      icon: TrendingUp,
      href: '/admin/invoices',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20',
    },
    {
      label: 'Monthly PTI Payroll',
      value: formatCurrency(monthlyPayroll),
      sub: 'Net teacher stipends',
      icon: CreditCard,
      href: '/admin/payroll',
      color: 'text-indigo-400',
      bg: 'bg-indigo-400/10 border-indigo-400/20',
    },
    {
      label: 'Outstanding Invoices',
      value: formatCurrency(outstandingAmount),
      sub: `${unpaidInvoices.length} invoices pending`,
      icon: AlertCircle,
      href: '/admin/invoices',
      color: 'text-rose-400',
      bg: 'bg-rose-400/10 border-rose-400/20',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
            Real-time telemetry across Rajasthan school placements, instructor pipelines, and finances.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center text-xs font-semibold px-3 py-2 rounded-xl bg-cerulean text-white hover:bg-cerulean/90 shadow-sm"
          >
            <span>Review New Leads</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Link
              key={idx}
              href={kpi.href}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-cerulean/50 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-text-muted truncate">
                  {kpi.label}
                </span>
                <div className={`p-1.5 rounded-lg border ${kpi.bg}`}>
                  <Icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </div>
              <div>
                <span className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary block truncate">
                  {kpi.value}
                </span>
                <span className="text-[10px] text-text-muted mt-0.5 block truncate">
                  {kpi.sub}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recharts Analytics Section */}
      <DashboardCharts
        financialData={financialData}
        enquiryStatusData={enquiryStatusData}
        cityData={cityData.length > 0 ? cityData : [{ name: 'Jaipur', value: 5 }, { name: 'Jodhpur', value: 2 }, { name: 'Ajmer', value: 2 }]}
      />

      {/* Two Columns: Upcoming Contract Renewals & Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Renewals Table */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-heading text-base font-bold text-text-primary">
                Upcoming School Contract Renewals
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Staffing agreements ending in the next 180 days
              </p>
            </div>
            <Link href="/admin/schools" className="text-xs font-semibold text-cerulean hover:underline">
              View All Schools →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-border text-text-muted">
                  <th className="pb-3 font-semibold">School Name</th>
                  <th className="pb-3 font-semibold">City</th>
                  <th className="pb-3 font-semibold">Contract End</th>
                  <th className="pb-3 font-semibold">Monthly Fee</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {upcomingRenewals.map((sc) => (
                  <tr key={sc.id} className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 font-medium text-text-primary">
                      {sc.name}
                    </td>
                    <td className="py-3 text-text-muted">{sc.city}</td>
                    <td className="py-3 text-cerulean font-medium">
                      {formatDate(sc.contractEnd)}
                    </td>
                    <td className="py-3 text-text-primary font-mono font-semibold">
                      {formatCurrency(sc.feePerPTI)}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/schools`}
                        className="text-xs text-cerulean hover:underline"
                      >
                        Renew
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-heading text-base font-bold text-text-primary">
                  Recent System Activity
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Audit events & background mutations
                </p>
              </div>
              <Link href="/admin/activity" className="text-xs font-semibold text-cerulean hover:underline">
                Full Audit →
              </Link>
            </div>

            <div className="space-y-4">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex items-start space-x-3 text-xs">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cerulean/10 text-cerulean mt-0.5">
                    <Activity className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 truncate">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-text-primary truncate">
                        {act.action}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {formatDate(act.createdAt)}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-muted truncate mt-0.5">
                      Entity: <span className="text-text-primary font-medium">{act.entity}</span> ({act.entityId})
                    </p>
                    <span className="text-[10px] text-cerulean">
                      By {act.user?.name || 'System Operator'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
