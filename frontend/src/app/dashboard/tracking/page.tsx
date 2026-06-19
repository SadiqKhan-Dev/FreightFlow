'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Map, Truck, Navigation, Clock, MapPin, Signal, Battery, Thermometer, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

const mockVehicles = [
  {
    id: 'FF-142',
    driver: 'Marcus Johnson',
    location: 'I-35 South, Oklahoma City, OK',
    destination: 'Dallas, TX',
    speed: '68 mph',
    heading: 'South',
    eta: '3h 22m',
    status: 'in_transit',
    lastUpdate: '12 sec ago',
    fuel: 72,
    temperature: '74°F',
    cargo: 'Electronics - Fragile',
  },
  {
    id: 'FF-087',
    driver: 'Sarah Chen',
    location: 'I-65 South, Louisville, KY',
    destination: 'Nashville, TN',
    speed: '72 mph',
    heading: 'South',
    eta: '2h 08m',
    status: 'in_transit',
    lastUpdate: '45 sec ago',
    fuel: 58,
    temperature: '68°F',
    cargo: 'Auto Parts',
  },
  {
    id: 'FF-205',
    driver: 'Roberto Davis',
    location: 'I-10 West, El Paso, TX',
    destination: 'Phoenix, AZ',
    speed: '0 mph',
    heading: 'West',
    eta: '8h 45m',
    status: 'rest_stop',
    lastUpdate: '5 min ago',
    fuel: 34,
    temperature: '92°F',
    cargo: 'Industrial Equipment',
  },
  {
    id: 'FF-163',
    driver: 'Thomas Williams',
    location: 'I-95 South, Savannah, GA',
    destination: 'Miami, FL',
    speed: '74 mph',
    heading: 'South',
    eta: '5h 15m',
    status: 'in_transit',
    lastUpdate: '8 sec ago',
    fuel: 85,
    temperature: '82°F',
    cargo: 'Perishable Goods - Reefer',
  },
  {
    id: 'FF-091',
    driver: 'Angela Martinez',
    location: 'I-70 West, Kansas City, MO',
    destination: 'Denver, CO',
    speed: '71 mph',
    heading: 'West',
    eta: '6h 30m',
    status: 'in_transit',
    lastUpdate: '22 sec ago',
    fuel: 61,
    temperature: '45°F',
    cargo: 'Pharmaceutical Supplies',
  },
  {
    id: 'FF-178',
    driver: 'Kevin Brown',
    location: 'I-75 North, Cincinnati, OH',
    destination: 'Detroit, MI',
    speed: '0 mph',
    heading: 'North',
    eta: '4h 12m',
    status: 'maintenance',
    lastUpdate: '2 hr ago',
    fuel: 90,
    temperature: '58°F',
    cargo: 'Steel Coils',
  },
]

export default function TrackingPage() {
  const [search, setSearch] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  const filteredVehicles = mockVehicles.filter(
    (v) =>
      v.id.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
  )

  const inTransit = mockVehicles.filter((v) => v.status === 'in_transit').length
  const stopped = mockVehicles.filter((v) => v.status === 'rest_stop').length
  const maintenance = mockVehicles.filter((v) => v.status === 'maintenance').length

  const statusConfig = (status: string) => {
    switch (status) {
      case 'in_transit':
        return { variant: 'warning' as const, label: 'In Transit', color: 'text-primary' }
      case 'rest_stop':
        return { variant: 'info' as const, label: 'Rest Stop', color: 'text-highway-silver' }
      case 'maintenance':
        return { variant: 'destructive' as const, label: 'Maintenance', color: 'text-alert-red' }
      default:
        return { variant: 'default' as const, label: status, color: 'text-muted-foreground' }
    }
  }

  return (
    <div className="min-h-screen bg-background space-y-0">
      {/* STATUS STRIP */}
      <div className="w-full bg-secondary border-b border-border">
        <div className="flex items-center gap-4 px-6 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fleet-green opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fleet-green" />
            </span>
            <span className="text-xs font-bold tracking-widest text-fleet-green uppercase">
              Live Fleet Tracking
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            In Transit: <span className="text-primary">{inTransit}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Stopped: <span className="text-highway-silver">{stopped}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Maintenance: <span className="text-alert-red">{maintenance}</span>
          </span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Live Fleet Tracking
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
              Real-time GPS monitoring and vehicle telemetry
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vehicles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs bg-secondary border-border"
            />
          </div>
        </div>

        {/* MAP PLACEHOLDER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border relative overflow-hidden">
            <div className="relative h-72 bg-gradient-to-br from-secondary via-secondary/80 to-primary/5 flex items-center justify-center">
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
              {/* Simulated dots for vehicles */}
              {mockVehicles.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                  className={`absolute h-3 w-3 rounded-full ${
                    v.status === 'in_transit'
                      ? 'bg-primary shadow-lg shadow-primary/50'
                      : v.status === 'rest_stop'
                      ? 'bg-highway-silver shadow-lg shadow-highway-silver/50'
                      : 'bg-alert-red shadow-lg shadow-alert-red/50'
                  }`}
                  style={{
                    left: `${15 + i * 14}%`,
                    top: `${25 + (i % 3) * 20}%`,
                  }}
                  title={`${v.id} - ${v.driver}`}
                />
              ))}
              {/* Center content */}
              <div className="relative z-10 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                  <Map className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground uppercase tracking-wider">
                  National Fleet Map
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                  Live GPS tracking with telemetry data. Click vehicle markers for detailed status.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* VEHICLE CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredVehicles.map((vehicle, i) => {
            const config = statusConfig(vehicle.status)
            return (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                onClick={() => setSelectedVehicle(vehicle.id)}
                className={`cursor-pointer transition-all ${
                  selectedVehicle === vehicle.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <Card className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 h-full">
                  <CardContent className="p-5">
                    {/* Vehicle Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Truck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-mono text-sm font-bold text-primary">{vehicle.id}</span>
                          <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
                        </div>
                      </div>
                      <Badge variant={config.variant} className="text-[9px] px-2 py-0.5">
                        {config.label}
                      </Badge>
                    </div>

                    {/* Location */}
                    <div className="mb-3 rounded-lg bg-secondary/50 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-bold text-muted-foreground uppercase">Current Location</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{vehicle.location}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Navigation className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Heading {vehicle.heading} at {vehicle.speed}
                        </span>
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Destination</span>
                        <p className="text-sm font-medium text-foreground">{vehicle.destination}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">ETA</span>
                        <p className="text-sm font-bold text-primary">{vehicle.eta}</p>
                      </div>
                    </div>

                    {/* Telemetry Bar */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Battery className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Fuel</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              vehicle.fuel > 50
                                ? 'bg-fleet-green'
                                : vehicle.fuel > 25
                                ? 'bg-freight-yellow'
                                : 'bg-alert-red'
                            }`}
                            style={{ width: `${vehicle.fuel}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-foreground">{vehicle.fuel}%</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Thermometer className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Temp</span>
                        </div>
                        <span className="text-sm font-bold text-foreground">{vehicle.temperature}</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Signal className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Signal</span>
                        </div>
                        <span className="text-xs font-bold text-fleet-green">Strong</span>
                      </div>
                    </div>

                    {/* Last Update */}
                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">{vehicle.cargo}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {vehicle.lastUpdate}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
