'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { logoutAction } from '@/lib/actions/auth'
import { markNotificationAsRead } from '@/lib/actions/admin'
import { Button } from '@/components/ui/button'
import {
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  User,
  Shield,
  CheckCircle2,
  Menu,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface TopbarProps {
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
  onOpenCommand: () => void
  onToggleSidebar?: () => void
}

export function Topbar({
  user,
  notifications = [],
  onOpenCommand,
  onToggleSidebar,
}: TopbarProps) {
  const { theme, setTheme } = useTheme()
  const [notifList, setNotifList] = useState(notifications)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const unreadCount = notifList.filter((n) => !n.read).length

  const handleMarkRead = async (id: string) => {
    await markNotificationAsRead(id)
    setNotifList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const roleColor =
    user?.role === 'SUPER_ADMIN'
      ? 'border-neon-rose text-neon-rose bg-neon-rose/10'
      : user?.role === 'ADMIN'
      ? 'border-cerulean text-cerulean bg-cerulean/10'
      : 'border-emerald-400 text-emerald-400 bg-emerald-400/10'

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/80 px-4 sm:px-6 backdrop-blur-md">
      {/* Search Bar / Command Palette Trigger */}
      <div className="flex items-center space-x-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <button
          onClick={onOpenCommand}
          className="flex items-center space-x-2 rounded-xl border border-border bg-card-bg/60 px-3 py-2 text-xs text-text-muted hover:border-cerulean/40 hover:text-text-primary transition-colors sm:w-64"
        >
          <Search className="h-3.5 w-3.5 text-text-muted" />
          <span className="hidden sm:inline">Quick search modules...</span>
          <span className="sm:hidden">Search...</span>
          <kbd className="hidden sm:inline-block ml-auto rounded bg-card px-1.5 py-0.5 text-[10px] font-mono text-text-muted border border-border">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card-bg hover:bg-muted text-text-muted hover:text-text-primary transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-neon-rose text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 bg-card border-border shadow-2xl" align="end">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="text-sm font-bold font-heading text-text-primary">
                Notifications
              </span>
              <span className="text-xs text-text-muted">
                {unreadCount} unread
              </span>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-border">
              {notifList.length > 0 ? (
                notifList.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 text-xs space-y-1 transition-colors ${
                      notif.read ? 'opacity-60 bg-transparent' : 'bg-cerulean/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-text-primary">
                        {notif.title}
                      </span>
                      {!notif.read && (
                        <button
                          onClick={() => handleMarkRead(notif.id)}
                          className="text-cerulean hover:text-cerulean/80 shrink-0"
                          title="Mark as read"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-text-muted leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-text-muted">
                  No notifications yet.
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card-bg hover:bg-muted text-text-muted hover:text-text-primary transition-colors"
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

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2.5 rounded-xl border border-border bg-card-bg p-1.5 pr-3 hover:bg-muted transition-colors">
              <Avatar className="h-7 w-7 border-0">
                <AvatarFallback className="bg-gradient-brand text-[11px] text-white font-bold">
                  {user?.name ? user.name[0] : 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-text-primary truncate max-w-[120px]">
                  {user?.name || 'Administrator'}
                </span>
                <span className="text-[10px] text-text-muted truncate max-w-[120px]">
                  {user?.email || 'admin@fitkidsstaffing.in'}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-card border-border" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-text-primary">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-xs leading-none text-text-muted">
                  {user?.email || 'admin@fitkidsstaffing.in'}
                </p>
                <div className="pt-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${roleColor}`}
                  >
                    {user?.role || 'SUPER_ADMIN'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
              onClick={async () => {
                await logoutAction()
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
