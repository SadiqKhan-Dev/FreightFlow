'use client'

import { useEffect, useState } from 'react'
import { api, PaginatedResponse } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Truck, Plus, Search, Fuel, Gauge, Calendar, MapPin,
  ChevronLeft, ChevronRight, Package, Wrench, Filter,
  Activity, CircleDot, AlertTriangle, TruckIcon
} from 'lucide-react'

interface Vehicle {
  id: string
  name: string
  registration_number: string
  vehicle_type: string
  make: string
  model: string
  year: number
  status: string
  current_mileage: number
  fuel_type: string
}

const VEHICLE_TYPES = ['truck', 'van', 'trailer', 'container', 'flatbed']
const FUEL_TYPES = ['diesel', 'gasoline', 'electric', 'hybrid', 'cng']

const vehicleTypeIcons: Record<string, React.ReactNode> = {
  truck: <Truck className="h-5 w-5" />,
  van: <Package className="h-5 w-5" />,
  trailer: <TruckIcon className="h-5 w-5" />,
  container: <Package className="h-5 w-5" />,
  flatbed: <TruckIcon className="h-5 w-5" />,
}

const statusConfig: Record<string, { color: string; barColor: string; badge: 'success' | 'warning' | 'destructive' | 'info'; icon: React.ReactNode }> = {
  available: {
    color: 'text-fleet-green',
    barColor: 'bg-fleet-green',
    badge: 'success',
    icon: <CircleDot className="h-3 w-3" />,
  },
  in_use: {
    color: 'text-freight-yellow',
    barColor: 'bg-freight-yellow',
    badge: 'warning',
    icon: <Activity className="h-3 w-3" />,
  },
  maintenance: {
    color: 'text-alert-red',
    barColor: 'bg-alert-red',
    badge: 'destructive',
    icon: <Wrench className="h-3 w-3" />,
  },
  out_of_service: {
    color: 'text-muted-foreground',
    barColor: 'bg-muted-foreground',
    badge: 'info',
    icon: <AlertTriangle className="h-3 w-3" />,
  },
}

export default function FleetPage() {
  const { token } = useAuthStore()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '', registration_number: '', vehicle_type: 'truck',
    make: '', model: '', year: 2026,
    fuel_type: 'diesel', capacity_weight: '', capacity_volume: '',
  })

  const perPage = 12

  useEffect(() => {
    if (token) {
      setLoading(true)
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
        search,
      })
      if (typeFilter) params.append('vehicle_type', typeFilter)
      if (statusFilter) params.append('status', statusFilter)

      api.get<PaginatedResponse<Vehicle>>(
        `/api/v1/vehicles?${params.toString()}`, token
      ).then((data) => {
        setVehicles(data.items)
        setTotal(data.total)
      }).catch(console.error).finally(() => setLoading(false))
    }
  }, [token, page, search, typeFilter, statusFilter])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    try {
      await api.post('/api/v1/vehicles', {
        ...form,
        capacity_weight: form.capacity_weight ? parseFloat(form.capacity_weight) : null,
        capacity_volume: form.capacity_volume ? parseFloat(form.capacity_volume) : null,
      }, token)
      setOpen(false)
      setForm({
        name: '', registration_number: '', vehicle_type: 'truck',
        make: '', model: '', year: 2026,
        fuel_type: 'diesel', capacity_weight: '', capacity_volume: '',
      })
      const data = await api.get<PaginatedResponse<Vehicle>>(
        `/api/v1/vehicles?page=${page}&per_page=${perPage}`, token
      )
      setVehicles(data.items)
      setTotal(data.total)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const totalPages = Math.ceil(total / perPage)

  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.status === 'available').length,
    inUse: vehicles.filter(v => v.status === 'in_use').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length,
  }

  return (
    <div className="min-h-screen bg-industrial-gradient p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-freight-yellow/10 border border-freight-yellow/30">
            <Truck className="h-6 w-6 text-freight-yellow" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Fleet Command
            </h1>
            <p className="text-sm text-muted-foreground">
              {total} vehicle{total !== 1 ? 's' : ''} registered
            </p>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-freight-yellow text-industrial-black hover:bg-freight-yellow/90 font-bold tracking-wide shadow-lg shadow-freight-yellow/20 transition-all hover:shadow-freight-yellow/40">
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-card border-border/50">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-foreground">
                <Truck className="h-5 w-5 text-freight-yellow" />
                Register New Vehicle
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Vehicle Name</label>
                <Input
                  placeholder="e.g. Highway King 001"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-secondary border-border/50 focus:border-freight-yellow focus:ring-freight-yellow/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Registration #</label>
                <Input
                  placeholder="e.g. TX-FL-4421"
                  value={form.registration_number}
                  onChange={e => setForm({ ...form, registration_number: e.target.value })}
                  required
                  className="bg-secondary border-border/50 focus:border-freight-yellow focus:ring-freight-yellow/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Vehicle Type</label>
                <select
                  value={form.vehicle_type}
                  onChange={e => setForm({ ...form, vehicle_type: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-border/50 bg-secondary px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-freight-yellow"
                >
                  {VEHICLE_TYPES.map(t => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fuel Type</label>
                <select
                  value={form.fuel_type}
                  onChange={e => setForm({ ...form, fuel_type: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-border/50 bg-secondary px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-freight-yellow"
                >
                  {FUEL_TYPES.map(f => (
                    <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Make</label>
                <Input
                  placeholder="e.g. Freightliner"
                  value={form.make}
                  onChange={e => setForm({ ...form, make: e.target.value })}
                  className="bg-secondary border-border/50 focus:border-freight-yellow focus:ring-freight-yellow/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Model</label>
                <Input
                  placeholder="e.g. Cascadia"
                  value={form.model}
                  onChange={e => setForm({ ...form, model: e.target.value })}
                  className="bg-secondary border-border/50 focus:border-freight-yellow focus:ring-freight-yellow/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Year</label>
                <Input
                  type="number"
                  placeholder="2024"
                  value={form.year}
                  onChange={e => setForm({ ...form, year: parseInt(e.target.value) })}
                  className="bg-secondary border-border/50 focus:border-freight-yellow focus:ring-freight-yellow/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Capacity (lbs)</label>
                <Input
                  placeholder="e.g. 40000"
                  value={form.capacity_weight}
                  onChange={e => setForm({ ...form, capacity_weight: e.target.value })}
                  className="bg-secondary border-border/50 focus:border-freight-yellow focus:ring-freight-yellow/20"
                />
              </div>
              <div className="col-span-2 flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="border-border/50 hover:bg-secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-freight-yellow text-industrial-black hover:bg-freight-yellow/90 font-bold"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Register Vehicle
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border/50 hover:border-freight-yellow/30 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Fleet</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-freight-yellow/10">
                <Truck className="h-5 w-5 text-freight-yellow" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border/50 hover:border-fleet-green/30 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-fleet-green mt-1">{stats.available}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fleet-green/10">
                <CircleDot className="h-5 w-5 text-fleet-green" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border/50 hover:border-freight-yellow/30 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">In Use</p>
                <p className="text-2xl font-bold text-freight-yellow mt-1">{stats.inUse}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-freight-yellow/10">
                <Activity className="h-5 w-5 text-freight-yellow" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border/50 hover:border-alert-red/30 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-alert-red mt-1">{stats.maintenance}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-alert-red/10">
                <Wrench className="h-5 w-5 text-alert-red" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="bg-card border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, registration, make, or model..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                className="pl-10 bg-secondary border-border/50 focus:border-freight-yellow focus:ring-freight-yellow/20"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <select
                  value={typeFilter}
                  onChange={e => { setTypeFilter(e.target.value); setPage(1) }}
                  className="h-9 w-[160px] rounded-md border border-border/50 bg-secondary pl-9 pr-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-freight-yellow appearance-none cursor-pointer"
                >
                  <option value="">All Types</option>
                  {VEHICLE_TYPES.map(t => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
                className="h-9 w-[160px] rounded-md border border-border/50 bg-secondary px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-freight-yellow appearance-none cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="in_use">In Use</option>
                <option value="maintenance">Maintenance</option>
                <option value="out_of_service">Out of Service</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-freight-yellow border-t-transparent" />
            <p className="text-sm text-muted-foreground animate-fleet-pulse">Loading fleet data...</p>
          </div>
        </div>
      ) : vehicles.length === 0 ? (
        <Card className="bg-card border-border/50 border-dashed">
          <CardContent className="flex flex-col items-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-freight-yellow/10 mb-4">
              <Truck className="h-8 w-8 text-freight-yellow/50" />
            </div>
            <p className="text-lg font-semibold text-foreground">No vehicles found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {search || typeFilter || statusFilter
                ? 'Try adjusting your filters or search terms.'
                : 'Register your first vehicle to get started.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vehicles.map(v => {
            const status = statusConfig[v.status] || statusConfig.out_of_service
            return (
              <Card
                key={v.id}
                className="bg-card border-border/50 hover:border-freight-yellow/50 transition-all hover:shadow-lg hover:shadow-freight-yellow/5 group"
              >
                <CardContent className="p-0">
                  {/* Status bar */}
                  <div className={`h-1 ${status.barColor} rounded-t-xl`} />

                  <div className="p-4 space-y-3">
                    {/* Header: type icon + status badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-muted-foreground group-hover:text-freight-yellow transition-colors">
                          {vehicleTypeIcons[v.vehicle_type] || <Truck className="h-5 w-5" />}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {v.vehicle_type}
                        </span>
                      </div>
                      <Badge variant={status.badge} className="gap-1">
                        {status.icon}
                        {v.status.replace('_', ' ')}
                      </Badge>
                    </div>

                    {/* Vehicle name + registration */}
                    <div>
                      <h3 className="font-bold text-foreground text-base leading-tight group-hover:text-freight-yellow transition-colors">
                        {v.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 font-mono tracking-wide">
                        {v.registration_number}
                      </p>
                    </div>

                    {/* Make / Model / Year */}
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        {v.make && v.model
                          ? `${v.make} ${v.model}`
                          : v.make || v.model || '—'}
                        {v.year ? ` · ${v.year}` : ''}
                      </span>
                    </div>

                    {/* Mileage */}
                    <div className="flex items-center gap-1.5 text-sm">
                      <Gauge className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="font-semibold text-foreground">
                        {v.current_mileage.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">mi</span>
                    </div>

                    {/* Fuel type */}
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Fuel className="h-3.5 w-3.5 shrink-0" />
                      <span className="capitalize">{v.fuel_type}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{(page - 1) * perPage + 1}</span>
            {' '}-{' '}
            <span className="font-semibold text-foreground">{Math.min(page * perPage, total)}</span>
            {' '}of{' '}
            <span className="font-semibold text-foreground">{total}</span> vehicles
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="border-border/50 hover:bg-secondary"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (page <= 3) {
                  pageNum = i + 1
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = page - 2 + i
                }
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPage(pageNum)}
                    className={
                      page === pageNum
                        ? 'bg-freight-yellow text-industrial-black hover:bg-freight-yellow/90 font-bold'
                        : 'hover:bg-secondary'
                    }
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="border-border/50 hover:bg-secondary"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
