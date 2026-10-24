'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginAction } from '@/lib/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Activity,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setError(null)
    setLoading(true)

    const res = await loginAction(values)

    if (res.success) {
      router.push('/admin')
      router.refresh()
    } else {
      setError(res.error || 'Invalid email or password')
      setLoading(false)
    }
  }

  const fillDemo = (email: string) => {
    setValue('email', email)
    setValue('password', 'ChangeMe@123')
    setError(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-jet relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cerulean/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-neon-rose/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3 group mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-jet">
                  <Activity className="h-6 w-6 text-cerulean" />
                </div>
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-text-primary">
                Fit<span className="text-cerulean">Kids</span> Staffing
              </span>
            </Link>
            <h1 className="text-xl font-bold font-heading text-text-primary">
              Staff & Admin Portal
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Sign in to manage schools, PTIs, payroll, and placements
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-xl border border-destructive/50 bg-destructive/10 p-3.5 flex items-center space-x-2.5 text-xs text-destructive-foreground">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@fitkidsstaffing.in"
                  className="pl-10 bg-card-bg"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  className="pl-10 pr-10 bg-card-bg"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-400">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="brand"
              size="lg"
              disabled={loading}
              className="w-full mt-2 h-11 text-sm font-semibold shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </Button>
          </form>

          {/* Demo Login Shortcuts */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-[11px] text-text-muted text-center mb-3 font-semibold uppercase tracking-wider">
              Quick Demo Logins (Password: ChangeMe@123)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('admin@fitkidsstaffing.in')}
                className="py-1.5 px-2 rounded-lg border border-border bg-card-bg/60 hover:bg-muted text-[11px] text-text-primary transition-colors text-center"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemo('hr@fitkidsstaffing.in')}
                className="py-1.5 px-2 rounded-lg border border-border bg-card-bg/60 hover:bg-muted text-[11px] text-text-primary transition-colors text-center"
              >
                HR Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemo('accounts@fitkidsstaffing.in')}
                className="py-1.5 px-2 rounded-lg border border-border bg-card-bg/60 hover:bg-muted text-[11px] text-text-primary transition-colors text-center"
              >
                Accounts
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-text-muted hover:text-cerulean transition-colors">
              ← Return to FitKids Staffing Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
