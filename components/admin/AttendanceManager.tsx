'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { saveAttendanceRecord } from '@/lib/actions/admin'
import * as XLSX from 'xlsx'
import {
  Calendar,
  CheckCircle2,
  Download,
  Save,
  Loader2,
  School,
  User,
} from 'lucide-react'

interface SchoolWithPlacements {
  id: string
  name: string
  city: string
  placements: Array<{
    id: string
    ptiId: string
    pti: { id: string; name: string; qualification: string }
    attendance: Array<{
      id: string
      month: number
      year: number
      records: string
      presentDays: number
      absentDays: number
      halfDays: number
      leaveDays: number
    }>
  }>
}

export function AttendanceManager({
  schoolsData,
}: {
  schoolsData: SchoolWithPlacements[]
}) {
  const [selectedMonth, setSelectedMonth] = useState('10')
  const [selectedYear, setSelectedYear] = useState('2026')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Track editable attendance records per PTI
  // Structure: { [ptiId]: { [day]: 'P' | 'A' | 'H' | 'L' } }
  const [attendanceState, setAttendanceState] = useState<Record<string, Record<number, string>>>(() => {
    const initial: Record<string, Record<number, string>> = {}
    schoolsData.forEach((s) => {
      s.placements.forEach((pl) => {
        const att = pl.attendance.find(
          (a) => a.month === Number(selectedMonth) && a.year === Number(selectedYear)
        )
        const daysMap: Record<number, string> = {}
        if (att && att.records) {
          try {
            const parsed = JSON.parse(att.records)
            Object.entries(parsed).forEach(([dateStr, status]) => {
              const dayNum = parseInt(dateStr.split('-')[2], 10)
              daysMap[dayNum] =
                status === 'PRESENT'
                  ? 'P'
                  : status === 'ABSENT'
                  ? 'A'
                  : status === 'HALF_DAY'
                  ? 'H'
                  : 'L'
            })
          } catch (e) {}
        } else {
          // Default: 26 working days Present
          for (let d = 1; d <= 26; d++) {
            daysMap[d] = 'P'
          }
        }
        initial[pl.ptiId] = daysMap
      })
    })
    return initial
  })

  const daysInMonth = 26 // Standard monthly school PE billing days

  const cycleStatus = (ptiId: string, day: number) => {
    const current = attendanceState[ptiId]?.[day] || 'P'
    const next =
      current === 'P' ? 'A' : current === 'A' ? 'H' : current === 'H' ? 'L' : 'P'

    setAttendanceState((prev) => ({
      ...prev,
      [ptiId]: {
        ...(prev[ptiId] || {}),
        [day]: next,
      },
    }))
  }

  const markAllPresent = (ptiId: string) => {
    const updated: Record<number, string> = {}
    for (let d = 1; d <= daysInMonth; d++) {
      updated[d] = 'P'
    }
    setAttendanceState((prev) => ({
      ...prev,
      [ptiId]: updated,
    }))
    toast({ title: 'Marked Present', description: 'All 26 days set to Present.' })
  }

  const handleSave = async (schoolId: string, ptiId: string) => {
    setLoading(true)
    const daysMap = attendanceState[ptiId] || {}
    let presentCount = 0
    let absentCount = 0
    let halfCount = 0
    let leaveCount = 0

    const recordsObj: Record<string, string> = {}
    for (let d = 1; d <= daysInMonth; d++) {
      const val = daysMap[d] || 'P'
      const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      if (val === 'P') {
        presentCount++
        recordsObj[dateStr] = 'PRESENT'
      } else if (val === 'A') {
        absentCount++
        recordsObj[dateStr] = 'ABSENT'
      } else if (val === 'H') {
        halfCount++
        recordsObj[dateStr] = 'HALF_DAY'
      } else {
        leaveCount++
        recordsObj[dateStr] = 'LEAVE'
      }
    }

    const res = await saveAttendanceRecord({
      ptiId,
      schoolId,
      month: Number(selectedMonth),
      year: Number(selectedYear),
      records: recordsObj,
      presentDays: presentCount,
      absentDays: absentCount,
      halfDays: halfCount,
      leaveDays: leaveCount,
    })

    setLoading(false)
    if (res.success) {
      toast({
        title: 'Attendance Saved',
        description: `Logged ${presentCount} present days for billing and payroll.`,
      })
    } else {
      toast({ variant: 'destructive', title: 'Error', description: res.error })
    }
  }

  const exportExcel = () => {
    const exportRows: any[] = []
    schoolsData.forEach((s) => {
      s.placements.forEach((pl) => {
        const days = attendanceState[pl.ptiId] || {}
        let p = 0,
          a = 0,
          h = 0,
          l = 0
        for (let d = 1; d <= daysInMonth; d++) {
          const v = days[d] || 'P'
          if (v === 'P') p++
          if (v === 'A') a++
          if (v === 'H') h++
          if (v === 'L') l++
        }
        exportRows.push({
          School: s.name,
          City: s.city,
          Instructor: pl.pti.name,
          Qualification: pl.pti.qualification,
          Month: `${selectedMonth}/${selectedYear}`,
          PresentDays: p,
          AbsentDays: a,
          HalfDays: h,
          LeaveDays: l,
          EffectivePayDays: p + h * 0.5,
        })
      })
    })

    const ws = XLSX.utils.json_to_sheet(exportRows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance')
    XLSX.writeFile(wb, `FitKids_Attendance_${selectedMonth}_${selectedYear}.xlsx`)
    toast({ title: 'Excel Exported', description: 'Downloaded attendance sheet.' })
  }

  return (
    <div className="space-y-6">
      {/* Top Selectors Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-36 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                { m: '1', n: 'January' },
                { m: '2', n: 'February' },
                { m: '3', n: 'March' },
                { m: '4', n: 'April' },
                { m: '5', n: 'May' },
                { m: '6', n: 'June' },
                { m: '7', n: 'July' },
                { m: '8', n: 'August' },
                { m: '9', n: 'September' },
                { m: '10', n: 'October' },
                { m: '11', n: 'November' },
                { m: '12', n: 'December' },
              ].map((item) => (
                <SelectItem key={item.m} value={item.m}>
                  {item.n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-28 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-3 text-xs text-text-muted pr-2">
            <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-emerald-400 mr-1" /> P = Present</span>
            <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-rose-400 mr-1" /> A = Absent</span>
            <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-amber-400 mr-1" /> H = Half</span>
            <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-sky-400 mr-1" /> L = Leave</span>
          </div>

          <Button
            onClick={exportExcel}
            variant="outline"
            size="sm"
            className="flex items-center space-x-1.5"
          >
            <Download className="h-4 w-4" />
            <span>Export Excel</span>
          </Button>
        </div>
      </div>

      {/* Per School Tables */}
      <div className="space-y-6">
        {schoolsData.map((school) => (
          <div
            key={school.id}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
          >
            {/* School Header */}
            <div className="p-4 bg-muted/40 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <School className="h-5 w-5 text-cerulean" />
                <span className="font-heading font-bold text-sm text-text-primary">
                  {school.name}
                </span>
                <span className="text-xs text-text-muted">({school.city})</span>
              </div>
              <span className="text-xs text-text-muted">
                {school.placements.length} Assigned Instructor(s)
              </span>
            </div>

            {/* Placements Grid for this school */}
            <div className="divide-y divide-border">
              {school.placements.map((pl) => {
                const days = attendanceState[pl.ptiId] || {}
                let p = 0,
                  a = 0,
                  h = 0,
                  l = 0
                for (let d = 1; d <= daysInMonth; d++) {
                  const v = days[d] || 'P'
                  if (v === 'P') p++
                  if (v === 'A') a++
                  if (v === 'H') h++
                  if (v === 'L') l++
                }

                return (
                  <div key={pl.id} className="p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <div className="h-7 w-7 rounded-full bg-cerulean/15 text-cerulean flex items-center justify-center font-bold text-xs">
                          {pl.pti.name[0]}
                        </div>
                        <div>
                          <span className="font-bold text-xs text-text-primary">
                            {pl.pti.name}
                          </span>
                          <span className="text-[11px] text-text-muted ml-2">
                            ({pl.pti.qualification})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-xs font-mono">
                        <span className="text-emerald-400 font-bold">P: {p}</span>
                        <span className="text-rose-400 font-bold">A: {a}</span>
                        <span className="text-amber-400 font-bold">H: {h}</span>
                        <span className="text-sky-400 font-bold">L: {l}</span>
                        <span className="font-sans text-text-muted">
                          (Net: {(p + h * 0.5).toFixed(1)} / 26 days)
                        </span>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAllPresent(pl.ptiId)}
                          className="h-7 text-[11px]"
                        >
                          All Present
                        </Button>
                        <Button
                          variant="brand"
                          size="sm"
                          disabled={loading}
                          onClick={() => handleSave(school.id, pl.ptiId)}
                          className="h-7 text-[11px] flex items-center space-x-1"
                        >
                          <Save className="h-3 w-3" />
                          <span>Save & Approve</span>
                        </Button>
                      </div>
                    </div>

                    {/* 26-Day Clickable Attendance Blocks */}
                    <div className="grid grid-cols-13 sm:grid-cols-26 gap-1 pt-1">
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                        const val = days[day] || 'P'
                        const color =
                          val === 'P'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                            : val === 'A'
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 hover:bg-rose-500/30'
                            : val === 'H'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30'
                            : 'bg-sky-500/20 text-sky-400 border-sky-500/40 hover:bg-sky-500/30'

                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => cycleStatus(pl.ptiId, day)}
                            title={`Day ${day}: Click to cycle status (P/A/H/L)`}
                            className={`flex flex-col items-center justify-center p-1 rounded-md border text-center transition-all ${color}`}
                          >
                            <span className="text-[9px] text-text-muted">{day}</span>
                            <span className="text-[11px] font-bold font-mono">{val}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {schoolsData.length === 0 && (
          <div className="py-12 text-center text-xs text-text-muted">
            No active school placements to record attendance for.
          </div>
        )}
      </div>
    </div>
  )
}
