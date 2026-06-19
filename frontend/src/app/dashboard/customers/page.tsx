'use client'

import { useEffect, useState } from 'react'
import { api, PaginatedResponse } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Search, Users, Phone, Mail, Building2, DollarSign, FileText } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { motion } from 'framer-motion'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  outstanding_balance: number
  payment_terms: string
  is_active?: boolean
}

export default function CustomersPage() {
  const { token } = useAuthStore()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    contact_person: '',
    payment_terms: 'net_30',
  })

  useEffect(() => {
    if (token) {
      api
        .get<PaginatedResponse<Customer>>(
          `/api/v1/customers?page=1&per_page=10&search=${search}`,
          token
        )
        .then((d) => {
          setCustomers(d.items)
          setTotal(d.total)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [token, search])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    try {
      await api.post('/api/v1/customers', form, token)
      setOpen(false)
      const data = await api.get<PaginatedResponse<Customer>>(
        '/api/v1/customers?page=1&per_page=10',
        token
      )
      setCustomers(data.items)
      setTotal(data.total)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const activeCount = customers.filter((c) => c.is_active !== false).length
  const totalBalance = customers.reduce((sum, c) => sum + (c.outstanding_balance || 0), 0)

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
              Customer Directory
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Total: <span className="text-primary">{total}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Active: <span className="text-fleet-green">{activeCount}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Receivables: <span className="text-primary">{formatCurrency(totalBalance)}</span>
          </span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Customer Directory
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
              Manage client accounts and billing relationships
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-industrial-black uppercase tracking-wider transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
                <Plus className="h-4 w-4" />
                Add Customer
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground uppercase tracking-wider">
                  Add New Customer
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Company Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-secondary border-border"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="bg-secondary border-border"
                />
                <Input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-secondary border-border"
                />
                <Input
                  placeholder="Contact Person"
                  value={form.contact_person}
                  onChange={(e) => setForm({ ...form, contact_person: e.target.value })}
                  className="bg-secondary border-border"
                />
                <Input
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="col-span-2 bg-secondary border-border"
                />
                <Input
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="bg-secondary border-border"
                />
                <Input
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="bg-secondary border-border"
                />
                <div className="col-span-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="border-border"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary text-industrial-black font-bold">
                    Add Customer
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: 'TOTAL CUSTOMERS',
              value: total,
              icon: Users,
              accent: 'text-primary',
              bg: 'bg-primary/10',
              border: 'border-primary/30',
            },
            {
              title: 'ACTIVE ACCOUNTS',
              value: activeCount,
              icon: Building2,
              accent: 'text-fleet-green',
              bg: 'bg-fleet-green/10',
              border: 'border-fleet-green/30',
            },
            {
              title: 'OUTSTANDING RECEIVABLES',
              value: formatCurrency(totalBalance),
              icon: DollarSign,
              accent: 'text-alert-red',
              bg: 'bg-alert-red/10',
              border: 'border-alert-red/30',
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

        {/* SEARCH & TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                      All Customers
                    </CardTitle>
                    <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                      {total} registered accounts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm bg-secondary border-border"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : customers.length === 0 ? (
                <div className="flex flex-col items-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-3 text-sm font-medium text-muted-foreground">No customers found</p>
                  <p className="text-xs text-muted-foreground/70">
                    Add your first customer to get started
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Name
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Email
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Phone
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Balance
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Terms
                      </TableHead>
                      <TableHead className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((c) => (
                      <TableRow key={c.id} className="border-border/50 hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                              {c.name?.charAt(0) || 'C'}
                            </div>
                            <span className="font-bold text-foreground">{c.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-foreground/70">
                            <Mail className="h-3 w-3" />
                            {c.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-foreground/70">
                            <Phone className="h-3 w-3" />
                            {c.phone || '—'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-mono font-bold ${
                              c.outstanding_balance > 0 ? 'text-alert-red' : 'text-fleet-green'
                            }`}
                          >
                            {formatCurrency(c.outstanding_balance)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="info" className="text-[9px] px-2 py-0.5">
                            {c.payment_terms?.replace('_', ' ') || 'NET 30'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={c.is_active !== false ? 'success' : 'destructive'}
                            className="text-[9px] px-2 py-0.5"
                          >
                            {c.is_active !== false ? 'Active' : 'Inactive'}
                          </Badge>
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
