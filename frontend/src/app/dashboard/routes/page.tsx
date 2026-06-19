'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Route, MapPin, Clock, Truck, ArrowRight, Navigation, Fuel, Wind } from 'lucide-react'
import { motion } from 'framer-motion'

const mockRoutes = [
  {
    id: 'RT-001',
    origin: 'Los Angeles, CA',
    destination: 'Dallas, TX',
    distance: '1,435 mi',
    estimatedTime: '21h 30m',
    status: 'active',
    fuelCost: '$487',
    driver: 'M. Johnson',
    vehicle: 'FF-142',
  },
  {
    id: 'RT-002',
    origin: 'Chicago, IL',
    destination: 'Atlanta, GA',
    distance: '719 mi',
    estimatedTime: '10h 45m',
    status: 'active',
    fuelCost: '$243',
    driver: 'S. Chen',
    vehicle: 'FF-087',
  },
  {
    id: 'RT-003',
    origin: 'Houston, TX',
    destination: 'Phoenix, AZ',
    distance: '1,178 mi',
    estimatedTime: '17h 20m',
    status: 'planned',
    fuelCost: '$398',
    driver: 'R. Davis',
    vehicle: 'FF-205',
  },
  {
    id: 'RT-004',
    origin: 'New York, NY',
    destination: 'Miami, FL',
    distance: '1,280 mi',
    estimatedTime: '19h 10m',
    status: 'completed',
    fuelCost: '$432',
    driver: 'T. Williams',
    vehicle: 'FF-163',
  },
  {
    id: 'RT-005',
    origin: 'Seattle, WA',
    destination: 'Denver, CO',
    distance: '1,328 mi',
    estimatedTime: '19h 50m',
    status: 'planned',
    fuelCost: '$449',
    driver: 'A. Martinez',
    vehicle: 'FF-091',
  },
  {
    id: 'RT-006',
    origin: 'Nashville, TN',
    destination: 'Detroit, MI',
    distance: '532 mi',
    estimatedTime: '8h 15m',
    status: 'active',
    fuelCost: '$180',
    driver: 'K. Brown',
    vehicle: 'FF-178',
  },
]

export default function RoutesPage() {
  const activeRoutes = mockRoutes.filter((r) => r.status === 'active').length
  const plannedRoutes = mockRoutes.filter((r) => r.status === 'planned').length
  const completedRoutes = mockRoutes.filter((r) => r.status === 'completed').length

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
              Route Optimization
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Active: <span className="text-primary">{activeRoutes}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Planned: <span className="text-freight-yellow">{plannedRoutes}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Completed: <span className="text-fleet-green">{completedRoutes}</span>
          </span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Route Optimization
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
              Plan and optimize delivery routes across America
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-industrial-black uppercase tracking-wider transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
            <Navigation className="h-4 w-4" />
            Plan New Route
          </button>
        </div>

        {/* MAP PLACEHOLDER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border relative overflow-hidden">
            <div className="relative h-64 bg-gradient-to-br from-secondary via-secondary/80 to-primary/5 flex items-center justify-center">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,204,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>
              {/* Center content */}
              <div className="relative z-10 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                  <Route className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground uppercase tracking-wider">
                  National Route Network
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                  Interactive route planning and optimization engine. Drag waypoints to adjust routes,
                  optimize for fuel efficiency or delivery time.
                </p>
                <div className="mt-4 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-xs font-bold text-muted-foreground uppercase">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-freight-yellow" />
                    <span className="text-xs font-bold text-muted-foreground uppercase">Planned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-fleet-green" />
                    <span className="text-xs font-bold text-muted-foreground uppercase">Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ROUTE CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mockRoutes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <Card className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-5">
                  {/* Route Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-primary">{route.id}</span>
                    <Badge
                      variant={
                        route.status === 'active'
                          ? 'warning'
                          : route.status === 'completed'
                          ? 'success'
                          : 'info'
                      }
                      className="text-[9px] px-2 py-0.5"
                    >
                      {route.status}
                    </Badge>
                  </div>

                  {/* Route Path */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-bold text-foreground truncate">
                          {route.origin}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <div className="h-px w-8 bg-primary/40" />
                      <ArrowRight className="h-4 w-4" />
                      <div className="h-px w-8 bg-primary/40" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-sm font-bold text-foreground truncate text-right">
                          {route.destination}
                        </span>
                        <MapPin className="h-4 w-4 text-fleet-green flex-shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Route Details */}
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/50">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Navigation className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">
                          Distance
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{route.distance}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">
                          ETA
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{route.estimatedTime}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Fuel className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">
                          Fuel
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{route.fuelCost}</span>
                    </div>
                  </div>

                  {/* Driver & Vehicle */}
                  <div className="mt-3 flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <Truck className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">{route.vehicle}</span>
                    </div>
                    <span className="text-xs font-medium text-foreground/70">{route.driver}</span>
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
