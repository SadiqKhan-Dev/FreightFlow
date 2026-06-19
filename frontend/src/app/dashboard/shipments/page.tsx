'use client'

import { useEffect, useState } from 'react'
import { api, PaginatedResponse } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Plus, Search, Package, Truck, CheckCircle2, Clock, AlertTriangle,
  MapPin, Calendar, Weight, DollarSign, ChevronLeft, ChevronRight,
  ArrowUpDown, Filter, XCircle, BarChart3, Activity, Loader2
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Shipment {
  id: string
  shipment_number: string
  shipper_name: string
  shipper_address?: string
  shipper_city?: string
  shipper_state?: string
  shipper_zip?: string
  consignee_name: string
  consignee_address?: string
  consignee_city?: string
  consignee_state?: string
  consignee_zip?: string
  status: string
  shipment_type: string
  quoted_price: number
  weight?: number
  pieces?: number
  description?: string
  created_at: string
}

const STATUS_CONFIG: Record<string, { variant: 'warning' | 'info' | 'success' | 'destructive' | 'secondary'; icon: React.ReactNode }> = {
  pending: { variant: 'warning', icon: <Clock className="h-3 w-3" /> },
  approved: { variant: 'info', icon: <CheckCircle2 className="h-3 w-3" /> },
  assigned: { variant: 'info', icon: <Truck className="h-3 w-3" /> },
  picked_up: { variant: 'info', icon: <Package className="h-3 w-3" /> },
  in_transit: { variant: 'info', icon: <Truck className="h-3 w-3" /> },
  arrived: { variant: 'success', icon: <MapPin className="h-3 w-3" /> },
  delivered: { variant: 'success', icon: <CheckCircle2 className="h-3 w-3" /> },
  completed: { variant: 'success', icon: <CheckCircle2 className="h-3 w-3" /> },
  cancelled: { variant: 'destructive', icon: <XCircle className="h-3 w-3" /> },
}

const TYPE_LABELS: Record<string, string> = {
  ftl: 'FTL',
  ltl: 'LTL',
  parcel: 'Parcel',
  express: 'Express',
}

export default function ShipmentsPage() {
  const { token } = useAuthStore()
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [open, setOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    shipper_name: '',
    shipper_address: '',
    shipper_city: '',
    shipper_state: '',
    shipper_zip: '',
    consignee_name: '',
    consignee_address: '',
    consignee_city: '',
    consignee_state: '',
    consignee_zip: '',
    description: '',
    weight: '',
    pieces: '',
    shipment_type: 'ftl',
  })

  const fetchShipments = async () => {
    if (!token) return
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        per_page: '10',
        search,
      })
      if (statusFilter) params.set('status_filter', statusFilter)
      if (typeFilter) params.set('type_filter', typeFilter)
      if (dateFrom) params.set('date_from', dateFrom)
      if (dateTo) params.set('date_to', dateTo)

      const data = await api.get<PaginatedResponse<Shipment>>(
        `/api/v1/shipments?${params}`,
        token
      )
      setShipments(data.items)
      setTotal(data.total)
      setPages(data.pages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShipments()
  }, [token, search, statusFilter, typeFilter, dateFrom, dateTo, currentPage])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    setCreating(true)
    try {
      await api.post('/api/v1/shipments', {
        ...form,
        weight: form.weight ? parseFloat(form.weight) : null,
        pieces: form.pieces ? parseInt(form.pieces) : null,
      }, token)
      setOpen(false)
      setForm({
        shipper_name: '', shipper_address: '', shipper_city: '', shipper_state: '', shipper_zip: '',
        consignee_name: '', consignee_address: '', consignee_city: '', consignee_state: '', consignee_zip: '',
        description: '', weight: '', pieces: '', shipment_type: 'ftl',
      })
      setCurrentPage(1)
      fetchShipments()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setCreating(false)
    }
  }

  const statusCounts = shipments.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const inTransitCount = statusCounts['in_transit'] || 0
  const deliveredCount = statusCounts['delivered'] || 0
  const pendingCount = statusCounts['pending'] || 0

  const inputClass = "bg-[hsl(0,0%,13%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,95%)] placeholder:text-[hsl(0,0%,45%)] focus:ring-[hsl(36,95%,54%)] focus:border-[hsl(36,95%,54%)]"
  const selectClass = `${inputClass} appearance-none`

  return (
    <div className="min-h-screen bg-[hsl(0,0%,7%)]">
      <div className="space-y-5 p-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(36,95%,54%)]/10 border border-[hsl(36,95%,54%)]/20">
              <Activity className="h-6 w-6 text-[hsl(36,95%,54%)]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[hsl(0,0%,95%)] tracking-tight font-exo">
                Shipment Control Center
              </h1>
              <p className="text-sm text-[hsl(0,0%,55%)]">
                {total} total shipments • Real-time fleet monitoring
              </p>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[hsl(36,95%,54%)] text-[hsl(0,0%,7%)] hover:bg-[hsl(36,95%,50%)] font-semibold shadow-lg shadow-[hsl(36,95%,54%)]/20 transition-all duration-200 hover:shadow-[hsl(36,95%,54%)]/30">
                <Plus className="mr-2 h-4 w-4" />
                New Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,95%)]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[hsl(36,95%,54%)] flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Create New Shipment
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-5">
                {/* Shipper & Consignee */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3 p-4 rounded-lg bg-[hsl(0,0%,8%)] border border-[hsl(0,0%,15%)]">
                    <div className="flex items-center gap-2 pb-2 border-b border-[hsl(0,0%,15%)]">
                      <div className="h-6 w-6 rounded bg-[hsl(36,95%,54%)]/10 flex items-center justify-center">
                        <Package className="h-3.5 w-3.5 text-[hsl(36,95%,54%)]" />
                      </div>
                      <h4 className="font-semibold text-sm text-[hsl(0,0%,85%)] uppercase tracking-wider">Shipper</h4>
                    </div>
                    <Input placeholder="Company Name" value={form.shipper_name} onChange={e => setForm({...form, shipper_name: e.target.value})} required className={inputClass} />
                    <Input placeholder="Address" value={form.shipper_address} onChange={e => setForm({...form, shipper_address: e.target.value})} required className={inputClass} />
                    <div className="grid grid-cols-3 gap-2">
                      <Input placeholder="City" value={form.shipper_city} onChange={e => setForm({...form, shipper_city: e.target.value})} required className={inputClass} />
                      <Input placeholder="State" value={form.shipper_state} onChange={e => setForm({...form, shipper_state: e.target.value})} required className={inputClass} />
                      <Input placeholder="ZIP" value={form.shipper_zip} onChange={e => setForm({...form, shipper_zip: e.target.value})} required className={inputClass} />
                    </div>
                  </div>
                  <div className="space-y-3 p-4 rounded-lg bg-[hsl(0,0%,8%)] border border-[hsl(0,0%,15%)]">
                    <div className="flex items-center gap-2 pb-2 border-b border-[hsl(0,0%,15%)]">
                      <div className="h-6 w-6 rounded bg-[hsl(36,95%,54%)]/10 flex items-center justify-center">
                        <MapPin className="h-3.5 w-3.5 text-[hsl(36,95%,54%)]" />
                      </div>
                      <h4 className="font-semibold text-sm text-[hsl(0,0%,85%)] uppercase tracking-wider">Consignee</h4>
                    </div>
                    <Input placeholder="Company Name" value={form.consignee_name} onChange={e => setForm({...form, consignee_name: e.target.value})} required className={inputClass} />
                    <Input placeholder="Address" value={form.consignee_address} onChange={e => setForm({...form, consignee_address: e.target.value})} required className={inputClass} />
                    <div className="grid grid-cols-3 gap-2">
                      <Input placeholder="City" value={form.consignee_city} onChange={e => setForm({...form, consignee_city: e.target.value})} required className={inputClass} />
                      <Input placeholder="State" value={form.consignee_state} onChange={e => setForm({...form, consignee_state: e.target.value})} required className={inputClass} />
                      <Input placeholder="ZIP" value={form.consignee_zip} onChange={e => setForm({...form, consignee_zip: e.target.value})} required className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="p-4 rounded-lg bg-[hsl(0,0%,8%)] border border-[hsl(0,0%,15%)] space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-[hsl(0,0%,15%)]">
                    <div className="h-6 w-6 rounded bg-[hsl(36,95%,54%)]/10 flex items-center justify-center">
                      <Truck className="h-3.5 w-3.5 text-[hsl(36,95%,54%)]" />
                    </div>
                    <h4 className="font-semibold text-sm text-[hsl(0,0%,85%)] uppercase tracking-wider">Shipment Details</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[hsl(0,0%,60%)] uppercase tracking-wider">Type</label>
                      <select
                        value={form.shipment_type}
                        onChange={e => setForm({...form, shipment_type: e.target.value})}
                        className={`flex h-9 w-full rounded-md border px-3 text-sm ${selectClass}`}
                      >
                        <option value="ftl">FTL - Full Truckload</option>
                        <option value="ltl">LTL - Less Than Truckload</option>
                        <option value="parcel">Parcel</option>
                        <option value="express">Express</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[hsl(0,0%,60%)] uppercase tracking-wider">Weight (lbs)</label>
                      <Input placeholder="0.00" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} type="number" step="0.01" className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[hsl(0,0%,60%)] uppercase tracking-wider">Pieces</label>
                      <Input placeholder="0" value={form.pieces} onChange={e => setForm({...form, pieces: e.target.value})} type="number" className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[hsl(0,0%,60%)] uppercase tracking-wider">Description</label>
                      <Input placeholder="Cargo description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-[hsl(0,0%,25%)] text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,15%)]">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={creating} className="bg-[hsl(36,95%,54%)] text-[hsl(0,0%,7%)] hover:bg-[hsl(36,95%,50%)] font-semibold min-w-[140px]">
                    {creating ? (
                      <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Creating...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Package className="h-4 w-4" /> Create Shipment</span>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Bar */}
        <Card className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)] shadow-xl">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[250px]">
                <Search className="h-4 w-4 text-[hsl(0,0%,50%)]" />
                <Input
                  placeholder="Search by shipment number, shipper, or consignee..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
                  className={`flex-1 ${inputClass}`}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[hsl(0,0%,50%)]" />
                <select
                  value={statusFilter}
                  onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1) }}
                  className={`flex h-9 rounded-md border px-3 text-sm min-w-[140px] ${selectClass}`}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1) }}
                  className={`flex h-9 rounded-md border px-3 text-sm min-w-[130px] ${selectClass}`}
                >
                  <option value="">All Types</option>
                  <option value="ftl">FTL</option>
                  <option value="ltl">LTL</option>
                  <option value="parcel">Parcel</option>
                  <option value="express">Express</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[hsl(0,0%,50%)]" />
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={e => { setDateFrom(e.target.value); setCurrentPage(1) }}
                  className={`w-[150px] ${inputClass}`}
                />
                <span className="text-[hsl(0,0%,50%)]">to</span>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={e => { setDateTo(e.target.value); setCurrentPage(1) }}
                  className={`w-[150px] ${inputClass}`}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Strip */}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,18%)] hover:border-[hsl(36,95%,54%)]/30 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(0,0%,15%)]">
              <BarChart3 className="h-5 w-5 text-[hsl(0,0%,70%)]" />
            </div>
            <div>
              <p className="text-xs font-medium text-[hsl(0,0%,50%)] uppercase tracking-wider">Total</p>
              <p className="text-2xl font-bold text-[hsl(0,0%,95%)]">{total}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,18%)] hover:border-[hsl(220,5%,55%)]/30 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(220,5%,55%)]/15">
              <Truck className="h-5 w-5 text-[hsl(220,5%,55%)]" />
            </div>
            <div>
              <p className="text-xs font-medium text-[hsl(0,0%,50%)] uppercase tracking-wider">In Transit</p>
              <p className="text-2xl font-bold text-[hsl(220,5%,55%)]">{inTransitCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,18%)] hover:border-[hsl(142,71%,50%)]/30 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(142,71%,50%)]/15">
              <CheckCircle2 className="h-5 w-5 text-[hsl(142,71%,50%)]" />
            </div>
            <div>
              <p className="text-xs font-medium text-[hsl(0,0%,50%)] uppercase tracking-wider">Delivered</p>
              <p className="text-2xl font-bold text-[hsl(142,71%,50%)]">{deliveredCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(0,0%,10%)] border border-[hsl(0,0%,18%)] hover:border-[hsl(36,95%,54%)]/30 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(36,95%,54%)]/15">
              <Clock className="h-5 w-5 text-[hsl(36,95%,54%)]" />
            </div>
            <div>
              <p className="text-xs font-medium text-[hsl(0,0%,50%)] uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-bold text-[hsl(36,95%,54%)]">{pendingCount}</p>
            </div>
          </div>
        </div>

        {/* Shipments Table */}
        <Card className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)] shadow-xl overflow-hidden">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-[hsl(36,95%,54%)] animate-spin" />
                <p className="mt-4 text-sm text-[hsl(0,0%,50%)]">Loading shipments...</p>
              </div>
            ) : shipments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-16 w-16 rounded-full bg-[hsl(0,0%,15%)] flex items-center justify-center">
                  <Package className="h-8 w-8 text-[hsl(0,0%,40%)]" />
                </div>
                <p className="mt-4 text-sm font-medium text-[hsl(0,0%,50%)]">No shipments found</p>
                <p className="text-xs text-[hsl(0,0%,35%)]">Try adjusting your filters or create a new shipment</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[hsl(0,0%,18%)] hover:bg-[hsl(0,0%,12%)]">
                    <TableHead className="text-[hsl(0,0%,55%)] font-semibold text-xs uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><ArrowUpDown className="h-3 w-3" /> Shipment #</span>
                    </TableHead>
                    <TableHead className="text-[hsl(0,0%,55%)] font-semibold text-xs uppercase tracking-wider">Origin</TableHead>
                    <TableHead className="text-[hsl(0,0%,55%)] font-semibold text-xs uppercase tracking-wider">Destination</TableHead>
                    <TableHead className="text-[hsl(0,0%,55%)] font-semibold text-xs uppercase tracking-wider">Type</TableHead>
                    <TableHead className="text-[hsl(0,0%,55%)] font-semibold text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-[hsl(0,0%,55%)] font-semibold text-xs uppercase tracking-wider text-right">Weight</TableHead>
                    <TableHead className="text-[hsl(0,0%,55%)] font-semibold text-xs uppercase tracking-wider text-right">Price</TableHead>
                    <TableHead className="text-[hsl(0,0%,55%)] font-semibold text-xs uppercase tracking-wider">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.map(s => {
                    const statusConfig = STATUS_CONFIG[s.status] || { variant: 'secondary' as const, icon: null }
                    return (
                      <TableRow key={s.id} className="border-b border-[hsl(0,0%,15%)] hover:bg-[hsl(0,0%,12%)] transition-colors">
                        <TableCell className="font-mono font-semibold text-[hsl(36,95%,54%)]">
                          {s.shipment_number}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-[hsl(0,0%,45%)]" />
                            <div>
                              <p className="text-sm text-[hsl(0,0%,90%)]">{s.shipper_name}</p>
                              {s.shipper_city && s.shipper_state && (
                                <p className="text-xs text-[hsl(0,0%,50%)]">{s.shipper_city}, {s.shipper_state}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-[hsl(36,95%,54%)]" />
                            <div>
                              <p className="text-sm text-[hsl(0,0%,90%)]">{s.consignee_name}</p>
                              {s.consignee_city && s.consignee_state && (
                                <p className="text-xs text-[hsl(0,0%,50%)]">{s.consignee_city}, {s.consignee_state}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[hsl(0,0%,18%)] text-[hsl(0,0%,80%)] uppercase tracking-wider">
                            {TYPE_LABELS[s.shipment_type] || s.shipment_type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusConfig.variant} className="gap-1">
                            {statusConfig.icon}
                            {s.status.replace(/_/g, ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {s.weight ? (
                            <span className="flex items-center justify-end gap-1 text-sm text-[hsl(0,0%,80%)]">
                              <Weight className="h-3.5 w-3.5 text-[hsl(0,0%,45%)]" />
                              {s.weight.toLocaleString()} lbs
                            </span>
                          ) : (
                            <span className="text-[hsl(0,0%,35%)]">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {s.quoted_price ? (
                            <span className="flex items-center justify-end gap-1 text-sm font-semibold text-[hsl(142,71%,50%)]">
                              <DollarSign className="h-3.5 w-3.5" />
                              {formatCurrency(s.quoted_price)}
                            </span>
                          ) : (
                            <span className="text-[hsl(0,0%,35%)]">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-[hsl(0,0%,60%)]">
                            {formatDate(s.created_at)}
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-[hsl(0,0%,50%)]">
              Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, total)} of {total} shipments
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="border-[hsl(0,0%,25%)] text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,15%)] disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
                const pageNum = currentPage <= 3
                  ? i + 1
                  : currentPage >= pages - 2
                    ? pages - 4 + i
                    : currentPage - 2 + i
                if (pageNum < 1 || pageNum > pages) return null
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={
                      pageNum === currentPage
                        ? 'bg-[hsl(36,95%,54%)] text-[hsl(0,0%,7%)] hover:bg-[hsl(36,95%,50%)] min-w-[36px]'
                        : 'border-[hsl(0,0%,25%)] text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,15%)] min-w-[36px]'
                    }
                  >
                    {pageNum}
                  </Button>
                )
              })}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === pages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="border-[hsl(0,0%,25%)] text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,15%)] disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
