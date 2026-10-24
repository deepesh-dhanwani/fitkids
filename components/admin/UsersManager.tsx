'use client'

import React, { useState } from 'react'
import {
  Users,
  UserPlus,
  Shield,
  KeyRound,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  createAdminUser,
  updateUserRole,
  toggleUserStatus,
  resetUserPassword,
} from '@/lib/actions/admin'

interface UsersManagerProps {
  initialUsers: any[]
}

export function UsersManager({ initialUsers }: UsersManagerProps) {
  const [users, setUsers] = useState<any[]>(initialUsers)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tempPasswordModal, setTempPasswordModal] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const res = await createAdminUser({
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      password: fd.get('password') as string,
      role: fd.get('role') as string,
    })
    setLoading(false)
    if (res.success && res.user) {
      setUsers((prev) => [res.user, ...prev])
      setIsCreateOpen(false)
    } else {
      alert(res.error || 'Failed to create user')
    }
  }

  const handleRoleChange = async (userId: string, role: string) => {
    const res = await updateUserRole(userId, role)
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role } : u))
      )
    }
  }

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    const res = await toggleUserStatus(userId, !currentStatus)
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isActive: !currentStatus } : u))
      )
    }
  }

  const handleResetPassword = async (userId: string) => {
    if (confirm('Generate a temporary password for this user?')) {
      const res = await resetUserPassword(userId)
      if (res.success && res.tempPassword) {
        setTempPasswordModal(res.tempPassword)
      } else {
        alert(res.error || 'Failed to reset password')
      }
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Super Admin</Badge>
      case 'HR_OPS':
        return <Badge className="bg-brand-blue/20 text-brand-blue border-brand-blue/30">HR & Ops</Badge>
      case 'ACCOUNTS':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Accounts</Badge>
      default:
        return <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700">Viewer</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-brand-blue" />
            Admin Users & Permissions
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Manage administrative team access, assign organizational roles, and audit security credentials.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-brand-blue hover:bg-brand-blue/90 text-white"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Administrator
        </Button>
      </div>

      {/* Users Table */}
      <Card className="bg-[#14151A] border-[#1F2128] overflow-hidden">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-[#1F2128]">
              <TableHead className="text-brand-muted">User</TableHead>
              <TableHead className="text-brand-muted">Role</TableHead>
              <TableHead className="text-brand-muted">Status</TableHead>
              <TableHead className="text-brand-muted">Added On</TableHead>
              <TableHead className="text-brand-muted text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id} className="border-[#1F2128] hover:bg-white/[0.02]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue font-bold flex items-center justify-center text-sm">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{u.name}</p>
                      <p className="text-xs text-brand-muted">{u.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="bg-black/50 border border-[#1F2128] text-xs text-white rounded px-2 py-1 focus:border-brand-blue"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="HR_OPS">HR_OPS</option>
                    <option value="ACCOUNTS">ACCOUNTS</option>
                    <option value="VIEWER">VIEWER</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      u.isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }
                  >
                    {u.isActive ? 'Active' : 'Disabled'}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-zinc-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleStatus(u.id, u.isActive)}
                    className="h-8 border-[#1F2128] text-xs"
                  >
                    {u.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResetPassword(u.id)}
                    className="h-8 border-[#1F2128] text-xs text-brand-muted hover:text-white"
                  >
                    <KeyRound className="h-3.5 w-3.5 mr-1" />
                    Reset Pass
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <Dialog open onOpenChange={setIsCreateOpen}>
          <DialogContent className="bg-[#14151A] border-[#1F2128] text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Administrator</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input name="name" placeholder="Pooja Sharma" required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div>
                <Label>Work Email</Label>
                <Input type="email" name="email" placeholder="pooja@fitkidsstaffing.in" required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" name="password" placeholder="••••••••" required className="bg-black/40 border-[#1F2128] mt-1" />
              </div>
              <div>
                <Label>System Role</Label>
                <select
                  name="role"
                  defaultValue="HR_OPS"
                  className="w-full h-10 px-3 rounded-md bg-black/40 border border-[#1F2128] text-white text-sm mt-1"
                >
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full platform control)</option>
                  <option value="HR_OPS">HR_OPS (PTIs, schools, placements, attendance)</option>
                  <option value="ACCOUNTS">ACCOUNTS (Invoices, billing, payroll reports)</option>
                  <option value="VIEWER">VIEWER (Read-only access)</option>
                </select>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="border-[#1F2128]">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-brand-blue hover:bg-brand-blue/90 text-white">Create Account</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* PASSWORD RESET MODAL */}
      {tempPasswordModal && (
        <Dialog open onOpenChange={() => setTempPasswordModal(null)}>
          <DialogContent className="bg-[#14151A] border-[#1F2128] text-white max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-brand-blue" />
                Temporary Password Generated
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <p className="text-xs text-brand-muted">
                Please share this temporary password securely with the user. They will be required to change it upon first login.
              </p>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-[#1F2128]">
                <code className="text-sm font-bold text-emerald-400 font-mono">{tempPasswordModal}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(tempPasswordModal)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                  className="h-8 text-xs"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setTempPasswordModal(null)} className="w-full bg-brand-blue text-white">
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
