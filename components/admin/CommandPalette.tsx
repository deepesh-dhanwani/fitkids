'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Search,
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
} from 'lucide-react'

const allCommands = [
  { label: 'Admin Dashboard', href: '/admin', group: 'Navigation', icon: LayoutDashboard },
  { label: 'School Inquiries & Leads', href: '/admin/enquiries', group: 'Navigation', icon: Inbox },
  { label: 'School Partners Roster', href: '/admin/schools', group: 'Navigation', icon: School },
  { label: 'PTI Teacher Roster', href: '/admin/ptis', group: 'Navigation', icon: Users },
  { label: 'Job Applications Queue', href: '/admin/applications', group: 'Navigation', icon: FileSpreadsheet },
  { label: 'Active Placements', href: '/admin/placements', group: 'Navigation', icon: CalendarCheck },
  { label: 'Monthly Attendance Tracker', href: '/admin/attendance', group: 'Navigation', icon: CalendarCheck },
  { label: 'Payroll & Stipends', href: '/admin/payroll', group: 'Navigation', icon: CreditCard },
  { label: 'GST Invoices', href: '/admin/invoices', group: 'Navigation', icon: FileText },
  { label: 'Documents & Agreements', href: '/admin/documents', group: 'Navigation', icon: FileSignature },
  { label: 'CMS Content & FAQs', href: '/admin/content', group: 'Navigation', icon: FileEdit },
  { label: 'Site Settings & GSTIN', href: '/admin/settings', group: 'Navigation', icon: Settings },
  { label: 'Users & Roles', href: '/admin/users', group: 'Navigation', icon: ShieldCheck },
  { label: 'Activity Audit Log', href: '/admin/activity', group: 'Navigation', icon: History },
  { label: 'Export Reports (Excel/CSV)', href: '/admin/reports', group: 'Navigation', icon: Download },
]

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (o: boolean) => void
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, setOpen])

  const filtered = query
    ? allCommands.filter((cmd) =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
      )
    : allCommands

  const handleSelect = (href: string) => {
    setOpen(false)
    setQuery('')
    router.push(href)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-lg bg-card border-border overflow-hidden">
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-text-muted mr-3 shrink-0" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search modules, pages, actions... (Esc to close)"
            className="border-0 bg-transparent p-0 focus-visible:ring-0 text-sm placeholder:text-text-muted"
            autoFocus
          />
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map((item, idx) => {
            const Icon = item.icon
            return (
              <button
                key={idx}
                onClick={() => handleSelect(item.href)}
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left text-sm text-text-muted hover:text-text-primary hover:bg-muted transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-card-bg text-cerulean shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 truncate">
                  <span className="font-medium text-text-primary">{item.label}</span>
                </div>
                <span className="text-[10px] font-mono text-text-muted">Jump →</span>
              </button>
            )
          })}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-xs text-text-muted">
              No matching module found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
