'use client'

import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'

interface FinancialDataPoint {
  month: string
  revenue: number
  payroll: number
  margin: number
}

interface StatusDataPoint {
  status: string
  count: number
}

interface CityDataPoint {
  name: string
  value: number
}

interface DashboardChartsProps {
  financialData: FinancialDataPoint[]
  enquiryStatusData: StatusDataPoint[]
  cityData: CityDataPoint[]
}

const COLORS = ['#1E9BE8', '#FF2D8A', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1']

export function DashboardCharts({
  financialData,
  enquiryStatusData,
  cityData,
}: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Financial Overview Chart (Line) */}
      <div className="lg:col-span-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading text-base font-bold text-text-primary">
              Financial Overview: Revenue vs Payroll vs Margin
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Monthly billing revenue and instructor stipend disbursals (INR)
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={financialData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2128" />
              <XAxis dataKey="month" stroke="#9AA0AE" fontSize={11} />
              <YAxis
                stroke="#9AA0AE"
                fontSize={11}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#14151A',
                  borderColor: '#1F2128',
                  borderRadius: '12px',
                  color: '#E8EAF0',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Gross Billing"
                stroke="#1E9BE8"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#1E9BE8' }}
              />
              <Line
                type="monotone"
                dataKey="payroll"
                name="PTI Payroll"
                stroke="#FF2D8A"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#FF2D8A' }}
              />
              <Line
                type="monotone"
                dataKey="margin"
                name="Gross Margin"
                stroke="#10B981"
                strokeWidth={2.5}
                strokeDasharray="4 4"
                dot={{ r: 4, fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Placements By City (Pie) */}
      <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-base font-bold text-text-primary">
            Active Placements by City
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Geographic distribution across Rajasthan
          </p>
        </div>

        <div className="h-56 w-full my-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cityData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {cityData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#14151A',
                  borderColor: '#1F2128',
                  borderRadius: '12px',
                  color: '#E8EAF0',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-border">
          {cityData.map((c, i) => (
            <div key={i} className="flex items-center space-x-1.5 text-[11px] text-text-muted">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span>{c.name}: {c.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiries Pipeline Bar Chart */}
      <div className="lg:col-span-12 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading text-base font-bold text-text-primary">
              School Lead Pipeline Stages
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Active school inquiry conversion progression
            </p>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={enquiryStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2128" />
              <XAxis dataKey="status" stroke="#9AA0AE" fontSize={11} />
              <YAxis stroke="#9AA0AE" fontSize={11} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#14151A',
                  borderColor: '#1F2128',
                  borderRadius: '12px',
                  color: '#E8EAF0',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="count" name="Schools" fill="#1E9BE8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
