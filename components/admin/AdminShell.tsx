'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/admin/Sidebar'
import { Topbar } from '@/components/admin/Topbar'
import { CommandPalette } from '@/components/admin/CommandPalette'
import { cn } from '@/lib/utils'

interface AdminShellProps {
  user?: {
    name?: string | null
    email?: string | null
    role?: string | null
  }
  notifications?: Array<{
    id: string
    title: string
    message: string
    read: boolean
    createdAt: Date | string
    link?: string
  }>
  children: React.ReactNode
}

export function AdminShell({ user, notifications, children }: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300 min-w-0',
          collapsed ? 'pl-[72px]' : 'pl-0 md:pl-[280px]'
        )}
      >
        <Topbar
          user={user}
          notifications={notifications}
          onOpenCommand={() => setCommandOpen(true)}
          onToggleSidebar={() => setCollapsed(!collapsed)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
    </div>
  )
}
