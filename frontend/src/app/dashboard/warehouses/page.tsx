'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Warehouse,
  MapPin,
  Package,
  Truck,
  Users,
  Box,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import { motion } from 'framer-motion'

const mockWarehouses = [
  {
    id: 'WH-001',
    name: 'Los Angeles Distribution Center',
    address: '1200 E. Olympic Blvd, Los Angeles, CA 90021',
    capacity: 50000,
    utilized: 42500,
    utilization: 85,
    status: 'operational',
    inboundToday: 24,
    outboundToday: 31,
    staffOnDuty: 48,
    lastActivity: '5 min ago',
  },
  {
    id: 'WH-002',
    name: 'Dallas Freight Hub',
    address: '2800 S. Lancaster Rd, Dallas, TX 75216',
    capacity: 35000,
    utilized: 24500,
    utilization: 70,
    status: 'operational',
    inboundToday: 18,
    outboundToday: 22,
    staffOnDuty: 35,
    lastActivity: '12 min ago',
  },
  {
    id: 'WH-003',
    name: 'Chicago Logistics Center',
    address: '4500 W. 47th St, Chicago, IL 60632',
    capacity: 42000,
    utilized: 39900,
    utilization: 95,
    status: 'near_capacity',
    inboundToday: 28,
    outboundToday: 15,
    staffOnDuty: 52,
    lastActivity: '2 min ago',
  },
  {
    id: 'WH-004',
    name: 'Atlanta Distribution Center',
    address: '1700 Furniture Blvd, Atlanta, GA 30318',
    capacity: 30000,
    utilized: 15000,
    utilization: 50,
    status: 'operational',
    inboundToday: 12,
    outboundToday: 19,
    staffOnDuty: 28,
    lastActivity: '8 min ago',
  },
  {
    id: 'WH-005',
    name: 'Phoenix Cross-Dock Facility',
    address: '3200 E. Washington St, Phoenix, AZ 85034',
    capacity: 25000,
    utilized: 23750,
    utilization: 95,
    status: 'near_capacity',
    inboundToday: 32,
    outboundToday: 28,
    staffOnDuty: 40,
    lastActivity: '1 min ago',
  },
  {
    id: 'WH-006',
    name: 'Seattle Port Warehouse',
    address: '1800 Harbor Ave, Seattle, WA 98119',
    capacity: 28000,
    utilized: 11200,
    utilization: 40,
    status: 'operational',
    inboundToday: 8,
    outboundToday: 14,
    staffOnDuty: 22,
    lastActivity: '15 min ago',
  },
]

export default function WarehousesPage() {
  const totalCapacity = mockWarehouses.reduce((sum, w) => sum + w.capacity, 0)
  const totalUtilized = mockWarehouses.reduce((sum, w) => sum + w.utilized, 0)
  const totalInbound = mockWarehouses.reduce((sum, w) => sum + w.inboundToday, 0)
  const totalOutbound = mockWarehouses.reduce((sum, w) => sum + w.outboundToday, 0)
  const nearCapacity = mockWarehouses.filter((w) => w.utilization >= 90).length

  const getCapacityColor = (utilization: number) => {
    if (utilization >= 90) return 'bg-alert-red'
    if (utilization >= 70) return 'bg-freight-yellow'
    return 'bg-fleet-green'
  }

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
              Warehouse Operations
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Facilities: <span className="text-primary">{mockWarehouses.length}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Inbound Today: <span className="text-fleet-green">{totalInbound}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Outbound Today: <span className="text-primary">{totalOutbound}</span>
          </span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Warehouse Operations
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
              Distribution centers and storage facility management
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-industrial-black uppercase tracking-wider transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
            <Warehouse className="h-4 w-4" />
            Add Facility
          </button>
        </div>

        {/* SUMMARY STATS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            {
              title: 'TOTAL CAPACITY',
              value: `${(totalCapacity / 1000).toFixed(0)}K sq ft`,
              icon: Box,
              accent: 'text-primary',
              bg: 'bg-primary/10',
              border: 'border-primary/30',
            },
            {
              title: 'UTILIZATION',
              value: `${Math.round((totalUtilized / totalCapacity) * 100)}%`,
              icon: TrendingUp,
              accent: totalUtilized / totalCapacity > 0.85 ? 'text-alert-red' : 'text-fleet-green',
              bg: totalUtilized / totalCapacity > 0.85 ? 'bg-alert-red/10' : 'bg-fleet-green/10',
              border:
                totalUtilized / totalCapacity > 0.85 ? 'border-alert-red/30' : 'border-fleet-green/30',
            },
            {
              title: 'INBOUND TODAY',
              value: totalInbound,
              icon: Truck,
              accent: 'text-fleet-green',
              bg: 'bg-fleet-green/10',
              border: 'border-fleet-green/30',
            },
            {
              title: 'NEAR CAPACITY',
              value: nearCapacity,
              icon: AlertTriangle,
              accent: nearCapacity > 0 ? 'text-alert-red' : 'text-fleet-green',
              bg: nearCapacity > 0 ? 'bg-alert-red/10' : 'bg-fleet-green/10',
              border: nearCapacity > 0 ? 'border-alert-red/30' : 'border-fleet-green/30',
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

        {/* WAREHOUSE CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mockWarehouses.map((wh, i) => (
            <motion.div
              key={wh.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <Card className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 h-full">
                <CardContent className="p-5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Warehouse className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-primary">{wh.id}</span>
                        <p className="text-sm font-bold text-foreground">{wh.name}</p>
                      </div>
                    </div>
                    <Badge
                      variant={wh.status === 'near_capacity' ? 'destructive' : 'success'}
                      className="text-[9px] px-2 py-0.5"
                    >
                      {wh.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-xs">{wh.address}</span>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">
                        Capacity Utilization
                      </span>
                      <span
                        className={`text-sm font-black ${
                          wh.utilization >= 90
                            ? 'text-alert-red'
                            : wh.utilization >= 70
                            ? 'text-freight-yellow'
                            : 'text-fleet-green'
                        }`}
                      >
                        {wh.utilization}%
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${wh.utilization}%` }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                        className={`h-full rounded-full ${getCapacityColor(wh.utilization)}`}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-[9px] font-medium text-muted-foreground">
                      <span>{wh.utilized.toLocaleString()} sq ft used</span>
                      <span>{wh.capacity.toLocaleString()} sq ft total</span>
                    </div>
                  </div>

                  {/* Activity Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Truck className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Inbound</span>
                      </div>
                      <span className="text-sm font-bold text-fleet-green">{wh.inboundToday}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Package className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Outbound</span>
                      </div>
                      <span className="text-sm font-bold text-primary">{wh.outboundToday}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Staff</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{wh.staffOnDuty}</span>
                    </div>
                  </div>

                  {/* Last Activity */}
                  <div className="mt-3 flex items-center justify-end gap-1 pt-3 border-t border-border/50">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Last activity: {wh.lastActivity}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
