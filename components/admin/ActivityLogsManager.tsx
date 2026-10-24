'use client'

import React, { useState } from 'react'
import {
  Activity,
  Search,
  Filter,
  User,
  Clock,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface ActivityLogItem {
  id: string
  action: string
  entity: string
  entityId: string
  before: string
  after: string
  ip: string
  createdAt: Date | string
  userId: string | null
  user: {
    name: string
    email: string
  } | null
}

interface ActivityLogsProps {
  initialLogs: ActivityLogItem[]
}

export function ActivityLogsManager({ initialLogs }: ActivityLogsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [entityFilter, setEntityFilter] = useState('ALL')

  const filteredLogs = initialLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.after && log.after.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.user && log.user.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesEntity = entityFilter === 'ALL' || log.entity.toUpperCase() === entityFilter.toUpperCase()

    return matchesSearch && matchesEntity
  })

  const getActionColor = (action: string) => {
    if (action.includes('CREATE') || action.includes('APPROVED')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    if (action.includes('UPDATE') || action.includes('CONVERT')) return 'text-brand-blue bg-brand-blue/10 border-brand-blue/20'
    if (action.includes('DELETE') || action.includes('REJECT')) return 'text-red-400 bg-red-500/10 border-red-500/20'
    return 'text-zinc-400 bg-zinc-800 border-zinc-700'
  }

  const entities = ['ALL', 'PLACEMENT', 'PAYROLL', 'INVOICE', 'ENQUIRY', 'PTI', 'SCHOOL', 'USER']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Activity className="h-6 w-6 text-brand-blue" />
            System Audit & Activity Logs
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Complete tamper-evident event trail for compliance, operations changes, and user activities.
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-[#14151A] border-[#1F2128] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
          <Input
            placeholder="Search action, details, user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-black/40 border-[#1F2128] text-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-brand-muted flex items-center gap-1 shrink-0">
            <Filter className="h-3 w-3" /> Entity:
          </span>
          {entities.map((ent) => (
            <button
              key={ent}
              onClick={() => setEntityFilter(ent)}
              className={`px-2.5 py-1 rounded text-xs transition-colors shrink-0 ${
                entityFilter === ent
                  ? 'bg-brand-blue text-white font-medium'
                  : 'bg-black/40 text-brand-muted hover:text-white border border-[#1F2128]'
              }`}
            >
              {ent}
            </button>
          ))}
        </div>
      </Card>

      {/* Table */}
      <Card className="bg-[#14151A] border-[#1F2128] overflow-hidden">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-[#1F2128]">
              <TableHead className="text-brand-muted">Timestamp</TableHead>
              <TableHead className="text-brand-muted">Action</TableHead>
              <TableHead className="text-brand-muted">Entity</TableHead>
              <TableHead className="text-brand-muted">Actor / User</TableHead>
              <TableHead className="text-brand-muted">Payload / State</TableHead>
              <TableHead className="text-brand-muted">IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-brand-muted">
                  No activity records match the selected filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-[#1F2128] hover:bg-white/[0.02]">
                  <TableCell className="text-xs text-zinc-400 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand-muted" />
                      {new Date(log.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs font-mono font-medium ${getActionColor(log.action)}`}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium text-white px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                      {log.entity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-brand-muted" />
                      <span className="text-xs text-white font-medium">
                        {log.user ? log.user.name : 'System Automation'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-zinc-300 max-w-md truncate">
                    {log.after !== '{}' ? log.after : log.before !== '{}' ? log.before : '—'}
                  </TableCell>
                  <TableCell className="text-xs font-mono text-zinc-500">
                    {log.ip || '127.0.0.1'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
