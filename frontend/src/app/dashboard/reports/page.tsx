'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  DollarSign,
  Package,
  Truck,
  Users,
  TrendingUp,
  Download,
  FileText,
  PieChart,
  Activity,
  Calendar,
  ArrowRight,
  Clock,
} from 'lucide-react'
import { motion } from 'framer-motion'

const reportCategories = [
  {
    id: 'revenue',
    title: 'Revenue Reports',
    description: 'Comprehensive financial analysis including revenue trends, outstanding payments, and profit margins across all operations.',
    icon: DollarSign,
    accent: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    reports: ['Monthly Revenue Summary', 'Accounts Receivable Aging', 'Profit & Loss Statement', 'Revenue by Region'],
  },
  {
    id: 'shipments',
    title: 'Shipment Analytics',
    description: 'Detailed shipment performance metrics including delivery times, success rates, and route efficiency data.',
    icon: Package,
    accent: 'text-fleet-green',
    bg: 'bg-fleet-green/10',
    border: 'border-fleet-green/30',
    reports: ['Delivery Performance', 'Shipment Volume Trends', 'Route Efficiency Report', 'Damage & Loss Report'],
  },
  {
    id: 'fleet',
    title: 'Fleet Performance',
    description: 'Vehicle utilization, maintenance costs, fuel consumption, and fleet availability across all units.',
    icon: Truck,
    accent: 'text-freight-yellow',
    bg: 'bg-freight-yellow/10',
    border: 'border-freight-yellow/30',
    reports: ['Vehicle Utilization', 'Fuel Consumption Analysis', 'Maintenance Cost Report', 'Fleet Age Analysis'],
  },
  {
    id: 'drivers',
    title: 'Driver Efficiency',
    description: 'Driver performance scores, hours of service compliance, safety records, and productivity metrics.',
    icon: Users,
    accent: 'text-highway-silver',
    bg: 'bg-highway-silver/10',
    border: 'border-highway-silver/30',
    reports: ['Driver Scorecard', 'HOS Compliance Report', 'Safety Incident Log', 'Productivity Rankings'],
  },
]

const recentReports = [
  { name: 'June 2026 Revenue Summary', type: 'Revenue', date: 'Jun 15, 2026', status: 'ready' },
  { name: 'Q2 Fleet Utilization Report', type: 'Fleet', date: 'Jun 30, 2026', status: 'generating' },
  { name: 'Weekly Shipment Performance', type: 'Shipments', date: 'Jun 14, 2026', status: 'ready' },
  { name: 'Driver Safety Review - May', type: 'Drivers', date: 'May 31, 2026', status: 'ready' },
]

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background space-y-0">
      {/* STATUS STRIP */}
      <div className="w-full bg-secondary border-b border-border">
        <div className="flex items-center gap-4 px-6 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Analytics & Reports
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Categories: <span className="text-primary">{reportCategories.length}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Recent Reports: <span className="text-fleet-green">{recentReports.length}</span>
          </span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Analytics & Reports
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
              Business intelligence and operational performance insights
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground uppercase tracking-wider transition-all hover:border-primary/50 hover:bg-card/80 active:scale-[0.98]">
            <Download className="h-4 w-4" />
            Export All
          </button>
        </div>

        {/* QUICK METRICS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            {
              title: 'REPORTS GENERATED',
              value: '24',
              icon: FileText,
              accent: 'text-primary',
              bg: 'bg-primary/10',
              border: 'border-primary/30',
              sub: 'This month',
            },
            {
              title: 'DATA SOURCES',
              value: '8',
              icon: Activity,
              accent: 'text-fleet-green',
              bg: 'bg-fleet-green/10',
              border: 'border-fleet-green/30',
              sub: 'Connected',
            },
            {
              title: 'LAST UPDATED',
              value: '5m',
              icon: Clock,
              accent: 'text-freight-yellow',
              bg: 'bg-freight-yellow/10',
              border: 'border-freight-yellow/30',
              sub: 'ago',
            },
            {
              title: 'SCHEDULED',
              value: '3',
              icon: Calendar,
              accent: 'text-highway-silver',
              bg: 'bg-highway-silver/10',
              border: 'border-highway-silver/30',
              sub: 'Pending',
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Card className={`bg-card border ${stat.border} relative overflow-hidden`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-black tracking-tight text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.sub}</p>
                    </div>
                    <div className={`rounded-xl ${stat.bg} p-3`}>
                      <stat.icon className={`h-5 w-5 ${stat.accent}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* REPORT CATEGORY CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {reportCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <Card className={`bg-card border ${cat.border} hover:shadow-lg hover:shadow-primary/5 transition-all h-full`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-xl ${cat.bg} p-3 flex-shrink-0`}>
                      <cat.icon className={`h-6 w-6 ${cat.accent}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground uppercase tracking-wider">
                        {cat.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Available Reports */}
                  <div className="mt-4 space-y-2">
                    {cat.reports.map((report) => (
                      <div
                        key={report}
                        className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 transition-colors hover:bg-secondary"
                      >
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{report}</span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>

                  {/* Generate Button */}
                  <div className="mt-4">
                    <Button className="w-full bg-primary text-industrial-black font-bold uppercase tracking-wider hover:bg-primary/90">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* RECENT REPORTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-foreground">
                    Recent Reports
                  </h3>
                  <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                    Previously generated reports
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {recentReports.map((report, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-center justify-between rounded-lg bg-secondary/30 px-4 py-3 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <PieChart className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{report.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.type} &middot; {report.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.status === 'generating' ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          <span className="text-xs font-bold text-primary uppercase">Generating</span>
                        </div>
                      ) : (
                        <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-foreground uppercase tracking-wider hover:border-primary/50 hover:bg-muted transition-all">
                          <Download className="h-3 w-3" />
                          Download
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
