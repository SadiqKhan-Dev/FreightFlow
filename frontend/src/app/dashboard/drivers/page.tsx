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
  Plus,
  Search,
  Users,
  Mail,
  Phone,
  Award,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Truck,
  UserCheck,
  UserX,
  Clock,
} from 'lucide-react'

interface Driver {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  license_number: string
  license_state: string
  status: string
  experience_years: string
}

const statusConfig: Record<string, { label: string; color: string; avatarBg: string; icon: typeof Users }> = {
  available: { label: 'Available', color: 'bg-fleet-green/20 text-fleet-green border border-fleet-green/30', avatarBg: 'bg-fleet-green', icon: UserCheck },
  on_trip: { label: 'On Trip', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30', avatarBg: 'bg-blue-500', icon: Truck },
  off_duty: { label: 'Off Duty', color: 'bg-secondary text-muted-foreground border border-border', avatarBg: 'bg-secondary', icon: Clock },
  suspended: { label: 'Suspended', color: 'bg-alert-red/20 text-alert-red border border-alert-red/30', avatarBg: 'bg-alert-red', icon: UserX },
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export default function DriversPage() {
  const { token } = useAuthStore()
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    license_number: '',
    license_state: '',
    license_expiry: '',
    experience_years: '',
  })

  useEffect(() => {
    if (token) {
      api.get<PaginatedResponse<Driver>>(
        `/api/v1/drivers?page=${page}&per_page=12&search=${search}`,
        token
      )
        .then(d => {
          setDrivers(d.items)
          setTotal(d.total)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [token, page, search])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    try {
      await api.post(
        '/api/v1/drivers',
        { ...form, license_expiry: form.license_expiry || '2027-12-31' },
        token
      )
      setOpen(false)
      setForm({
        first_name: '', last_name: '', email: '', phone: '',
        license_number: '', license_state: '', license_expiry: '', experience_years: '',
      })
      const data = await api.get<PaginatedResponse<Driver>>(
        `/api/v1/drivers?page=${page}&per_page=12`,
        token
      )
      setDrivers(data.items)
      setTotal(data.total)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const statusCounts = drivers.reduce(
    (acc, d) => {
      acc[d.status] = (acc[d.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const totalPages = Math.ceil(total / 12)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-freight-yellow/20 rounded-lg">
            <Users className="h-6 w-6 text-freight-yellow" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Driver Roster</h1>
            <p className="text-sm text-muted-foreground">{total} drivers registered</p>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="freight bg-freight-yellow text-industrial-black hover:bg-freight-yellow/90 font-bold shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Driver</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">First Name</label>
                <Input
                  placeholder="e.g. John"
                  value={form.first_name}
                  onChange={e => setForm({ ...form, first_name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Name</label>
                <Input
                  placeholder="e.g. Smith"
                  value={form.last_name}
                  onChange={e => setForm({ ...form, last_name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                <Input
                  type="email"
                  placeholder="driver@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</label>
                <Input
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">License Number</label>
                <Input
                  placeholder="CDL-12345678"
                  value={form.license_number}
                  onChange={e => setForm({ ...form, license_number: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">License State</label>
                <Input
                  placeholder="TX"
                  value={form.license_state}
                  onChange={e => setForm({ ...form, license_state: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">License Expiry</label>
                <Input
                  type="date"
                  value={form.license_expiry}
                  onChange={e => setForm({ ...form, license_expiry: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Years of Experience</label>
                <Input
                  type="number"
                  placeholder="5"
                  value={form.experience_years}
                  onChange={e => setForm({ ...form, experience_years: e.target.value })}
                />
              </div>
              <div className="col-span-2 flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="freight bg-freight-yellow text-industrial-black hover:bg-freight-yellow/90 font-bold">
                  Add Driver
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Drivers', value: total, color: 'text-foreground', bg: 'bg-muted/50', icon: Users },
          { label: 'Available', value: statusCounts.available || 0, color: 'text-fleet-green', bg: 'bg-fleet-green/10', icon: UserCheck },
          { label: 'On Trip', value: statusCounts.on_trip || 0, color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Truck },
          { label: 'Off Duty', value: statusCounts.off_duty || 0, color: 'text-muted-foreground', bg: 'bg-muted/30', icon: Clock },
        ].map(stat => (
          <Card key={stat.label} className="bg-card/50 border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search drivers by name, email, or license..."
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="max-w-md bg-card/50"
        />
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-freight-yellow border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading driver roster...</p>
          </div>
        </div>
      ) : drivers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 bg-muted/50 rounded-full mb-4">
            <Users className="h-12 w-12 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No Drivers Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            {search ? 'Try adjusting your search terms' : "Add your first driver to start building your fleet."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {drivers.map(driver => {
              const status = statusConfig[driver.status] || statusConfig.off_duty
              const StatusIcon = status.icon
              return (
                <Card
                  key={driver.id}
                  className="bg-card/50 border-border/50 hover:border-freight-yellow/50 hover:bg-card transition-all duration-200 group"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-full ${status.avatarBg} flex items-center justify-center text-white font-bold text-lg shrink-0 ring-2 ring-border/50 group-hover:ring-freight-yellow/30 transition-all`}
                      >
                        {getInitials(driver.first_name, driver.last_name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-foreground truncate">
                          {driver.first_name} {driver.last_name}
                        </h3>
                        <Badge className={`mt-1 text-[10px] px-2 py-0 ${status.color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{driver.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        <span>{driver.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BadgeCheck className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-mono text-xs">
                          {driver.license_number} <span className="text-muted-foreground/60">({driver.license_state})</span>
                        </span>
                      </div>
                      {driver.experience_years && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Award className="h-3.5 w-3.5 shrink-0" />
                          <span>{driver.experience_years} years experience</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-border/50">
                      <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                        View Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs h-8 border-freight-yellow/30 text-freight-yellow hover:bg-freight-yellow/10"
                        disabled={driver.status !== 'available'}
                      >
                        <Truck className="h-3 w-3 mr-1" />
                        Assign Trip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                Showing {((page - 1) * 12) + 1}–{Math.min(page * 12, total)} of {total} drivers
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                      variant={pageNum === page ? 'default' : 'outline'}
                      size="sm"
                      className={`w-9 ${pageNum === page ? 'bg-freight-yellow text-industrial-black hover:bg-freight-yellow/90' : ''}`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
