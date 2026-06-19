'use client'

import { useEffect, useState } from 'react'
import { api, PaginatedResponse } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Plus,
  Search,
  Receipt,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Filter,
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'

interface Invoice {
  id: string
  invoice_number: string
  total_amount: number
  amount_paid: number
  status: string
  issue_date: string
  due_date: string
  customer_id: string
  customer_name?: string
}

export default function InvoicesPage() {
  const { token } = useAuthStore()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (token) {
      const statusParam = statusFilter !== 'all' ? `&status=${statusFilter}` : ''
      api
        .get<PaginatedResponse<Invoice>>(
          `/api/v1/invoices?page=1&per_page=10&search=${search}${statusParam}`,
          token
        )
        .then((d) => {
          setInvoices(d.items)
          setTotal(d.total)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [token, search, statusFilter])

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total_amount || 0), 0)
  const pendingAmount = invoices
    .filter((inv) => inv.status === 'sent' || inv.status === 'draft')
    .reduce((sum, inv) => sum + (inv.total_amount - inv.amount_paid), 0)
  const paidAmount = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + (inv.amount_paid || 0), 0)
  const overdueAmount = invoices
    .filter((inv) => inv.status === 'overdue')
    .reduce((sum, inv) => sum + (inv.total_amount - inv.amount_paid), 0)

  const statusBadgeVariant = (status: string): 'success' | 'warning' | 'destructive' | 'info' | 'default' => {
    switch (status) {
      case 'paid':
        return 'success'
      case 'sent':
      case 'partially_paid':
        return 'warning'
      case 'overdue':
      case 'cancelled':
        return 'destructive'
      case 'draft':
        return 'info'
      default:
        return 'default'
    }
  }

  const stats = [
    {
      title: 'TOTAL REVENUE',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      accent: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/30',
    },
    {
      title: 'PENDING',
      value: formatCurrency(pendingAmount),
      icon: Clock,
      accent: 'text-freight-yellow',
      bg: 'bg-freight-yellow/10',
      border: 'border-freight-yellow/30',
    },
    {
      title: 'PAID',
      value: formatCurrency(paidAmount),
      icon: CheckCircle2,
      accent: 'text-fleet-green',
      bg: 'bg-fleet-green/10',
      border: 'border-fleet-green/30',
    },
    {
      title: 'OVERDUE',
      value: formatCurrency(overdueAmount),
      icon: AlertTriangle,
      accent: 'text-alert-red',
      bg: 'bg-alert-red/10',
      border: 'border-alert-red/30',
    },
  ]

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
              Invoice Center
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Total: <span className="text-primary">{total}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Revenue: <span className="text-fleet-green">{formatCurrency(totalRevenue)}</span>
          </span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Invoice Center
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
              Billing management and accounts receivable
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-industrial-black uppercase tracking-wider transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
            <Plus className="h-4 w-4" />
            New Invoice
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, i) => (
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
                      <p className="text-2xl font-black tracking-tight text-foreground">
                        {stat.value}
                      </p>
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

        {/* SEARCH & FILTERS + TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Receipt className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                      All Invoices
                    </CardTitle>
                    <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                      {total} invoices in system
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5">
                    <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-transparent text-xs font-bold uppercase tracking-wider text-foreground outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search invoices..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="max-w-xs bg-secondary border-border"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : invoices.length === 0 ? (
                <div className="flex flex-col items-center py-12">
                  <Receipt className="h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-3 text-sm font-medium text-muted-foreground">No invoices found</p>
                  <p className="text-xs text-muted-foreground/70">
                    Create your first invoice to start billing
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Invoice #
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Customer
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Amount
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Paid
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Status
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Issue Date
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Due Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((inv) => (
                      <TableRow key={inv.id} className="border-border/50 hover:bg-muted/30">
                        <TableCell>
                          <span className="font-mono font-bold text-primary">
                            {inv.invoice_number}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-foreground">
                            {inv.customer_name || '—'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono font-bold text-foreground">
                            {formatCurrency(inv.total_amount)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-mono ${
                              inv.amount_paid >= inv.total_amount
                                ? 'text-fleet-green font-bold'
                                : 'text-foreground/70'
                            }`}
                          >
                            {formatCurrency(inv.amount_paid)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusBadgeVariant(inv.status)}
                            className="text-[9px] px-2 py-0.5"
                          >
                            {inv.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-foreground/70">
                          {formatDate(inv.issue_date)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              inv.status === 'overdue' ? 'font-bold text-alert-red' : 'text-foreground/70'
                            }
                          >
                            {formatDate(inv.due_date)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
