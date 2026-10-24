'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  LayoutDashboard,
  Inbox,
  School,
  Users,
  FileSpreadsheet,
  CalendarCheck,
  CreditCard,
  FileText,
  FileSignature,
  FileEdit,
  Settings,
  ShieldCheck,
  History,
  Download,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    title: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Leads & Schools',
    items: [
      { href: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
      { href: '/admin/schools', label: 'Schools', icon: School },
      { href: '/admin/placements', label: 'Placements', icon: CalendarCheck },
    ],
  },
  {
    title: 'PTI Management',
    items: [
      { href: '/admin/ptis', label: 'PTIs Roster', icon: Users },
      { href: '/admin/applications', label: 'Applications', icon: FileSpreadsheet },
      { href: '/admin/attendance', label: 'Attendance', icon: CalendarCheck },
      { href: '/admin/payroll', label: 'Payroll', icon: CreditCard },
    ],
  },
  {
    title: 'Finance & Legal',
    items: [
      { href: '/admin/invoices', label: 'Invoices & GST', icon: FileText },
      { href: '/admin/documents', label: 'Docs & Agreements', icon: FileSignature },
    ],
  },
  {
    title: 'Content CMS',
    items: [
      { href: '/admin/content', label: 'CMS Management', icon: FileEdit },
    ],
  },
  {
    title: 'Administration',
    items: [
      { href: '/admin/settings', label: 'Site Settings', icon: Settings },
      { href: '/admin/users', label: 'Users & Roles', icon: ShieldCheck },
      { href: '/admin/activity', label: 'Activity Audit', icon: History },
      { href: '/admin/reports', label: 'Export Reports', icon: Download },
    ],
  },
]

export function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean
  setCollapsed: (c: boolean) => void
}) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r border-border bg-card transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[280px]'
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <Link href="/admin" className="flex items-center space-x-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-jet">
              <Activity className="h-5 w-5 text-cerulean" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-heading text-base font-bold text-text-primary tracking-tight truncate">
                Fit<span className="text-cerulean">Kids</span> Admin
              </span>
              <span className="text-[10px] text-text-muted uppercase font-semibold">
                Staffing Portal
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card-bg hover:bg-muted text-text-muted hover:text-text-primary transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-none">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!collapsed && (
              <h4 className="px-3 text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">
                {group.title}
              </h4>
            )}
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center space-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group relative',
                    isActive
                      ? 'bg-gradient-brand text-white font-semibold shadow-md shadow-cerulean/20'
                      : 'text-text-muted hover:bg-white/5 hover:text-text-primary'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors',
                      isActive ? 'text-white' : 'text-text-muted group-hover:text-text-primary'
                    )}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {/* Public Site Link Footer */}
      <div className="p-3 border-t border-border">
        <Link
          href="/"
          target="_blank"
          className={cn(
            'flex items-center space-x-3 rounded-xl px-3 py-2 text-xs font-semibold text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors',
            collapsed ? 'justify-center' : ''
          )}
        >
          <ExternalLink className="h-4 w-4 shrink-0 text-cerulean" />
          {!collapsed && <span>View Public Site</span>}
        </Link>
      </div>
    </aside>
  )
}
