'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Clock,
  Truck,
  MapPin,
  User,
  AlertTriangle,
  ArrowRight,
  Package,
  XCircle,
  CheckCircle2,
  Loader2,
  CircleDot,
  HandMetal,
} from 'lucide-react'

interface Shipment {
  id: string
  shipment_number: string
  shipper: string
  consignee: string
  driver_name?: string
  vehicle?: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled'
  created_at: string
}

const mockShipments: Shipment[] = [
  {
    id: '1',
    shipment_number: 'FF-8A3B2C1D',
    shipper: 'Texas Steel Co.',
    consignee: 'Chicago Manufacturing',
    priority: 'urgent',
    status: 'pending',
    created_at: '2026-06-18T10:30:00Z',
  },
  {
    id: '2',
    shipment_number: 'FF-9F4E5D6A',
    shipper: 'LA Logistics Hub',
    consignee: 'Phoenix Distribution',
    driver_name: 'Mike Johnson',
    vehicle: 'TX-4521',
    priority: 'high',
    status: 'assigned',
    created_at: '2026-06-18T09:00:00Z',
  },
  {
    id: '3',
    shipment_number: 'FF-7B8C9D0E',
    shipper: 'Houston Port Authority',
    consignee: 'Dallas Warehouse',
    driver_name: 'Sarah Williams',
    vehicle: 'FL-8834',
    priority: 'normal',
    status: 'in_transit',
    created_at: '2026-06-18T07:30:00Z',
  },
  {
    id: '4',
    shipment_number: 'FF-1A2B3C4D',
    shipper: 'Nashville Freight',
    consignee: 'Atlanta Terminal',
    driver_name: 'James Brown',
    vehicle: 'GA-2201',
    priority: 'normal',
    status: 'delivered',
    created_at: '2026-06-18T04:30:00Z',
  },
  {
    id: '5',
    shipment_number: 'FF-5E6F7G8H',
    shipper: 'Miami Imports',
    consignee: 'Orlando Distribution',
    priority: 'low',
    status: 'pending',
    created_at: '2026-06-18T09:15:00Z',
  },
  {
    id: '6',
    shipment_number: 'FF-3I4J5K6L',
    shipper: 'Seattle Shipping',
    consignee: 'Portland Hub',
    driver_name: 'Robert Davis',
    vehicle: 'WA-7712',
    priority: 'high',
    status: 'picked_up',
    created_at: '2026-06-18T08:30:00Z',
  },
  {
    id: '7',
    shipment_number: 'FF-2M3N4O5P',
    shipper: 'Denver Cargo',
    consignee: 'Salt Lake Terminal',
    priority: 'normal',
    status: 'cancelled',
    created_at: '2026-06-18T01:30:00Z',
  },
  {
    id: '8',
    shipment_number: 'FF-6Q7R8S9T',
    shipper: 'Boston Logistics',
    consignee: 'New York Hub',
    driver_name: 'Tom Wilson',
    vehicle: 'MA-3345',
    priority: 'normal',
    status: 'in_transit',
    created_at: '2026-06-18T08:00:00Z',
  },
]

const columns = [
  { id: 'pending' as const, label: 'Pending', color: 'border-freight-yellow', icon: Clock, bg: 'bg-freight-yellow/10' },
  { id: 'assigned' as const, label: 'Assigned', color: 'border-blue-500', icon: User, bg: 'bg-blue-500/10' },
  { id: 'picked_up' as const, label: 'Picked Up', color: 'border-purple-500', icon: HandMetal, bg: 'bg-purple-500/10' },
  { id: 'in_transit' as const, label: 'In Transit', color: 'border-orange-500', icon: Truck, bg: 'bg-orange-500/10' },
  { id: 'delivered' as const, label: 'Delivered', color: 'border-fleet-green', icon: CheckCircle2, bg: 'bg-fleet-green/10' },
  { id: 'cancelled' as const, label: 'Cancelled', color: 'border-alert-red', icon: XCircle, bg: 'bg-alert-red/10' },
]

const FIXED_REFERENCE_TIME = new Date('2026-06-18T11:00:00Z').getTime()

function getTimeSince(dateString: string): string {
  const diff = FIXED_REFERENCE_TIME - new Date(dateString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

const priorityStyles: Record<string, string> = {
  low: 'bg-secondary text-secondary-foreground',
  normal: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  high: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  urgent: 'bg-alert-red/20 text-alert-red border border-alert-red/30 animate-fleet-pulse',
}

export default function DispatchPage() {
  const [shipments] = useState<Shipment[]>(mockShipments)

  const getColumnShipments = (status: Shipment['status']) =>
    shipments.filter(s => s.status === status)

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-freight-yellow/20 rounded-lg">
            <Package className="h-6 w-6 text-freight-yellow" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Dispatch Board</h1>
            <p className="text-sm text-muted-foreground">{shipments.length} active shipments</p>
          </div>
        </div>
        <Button className="freight bg-freight-yellow text-industrial-black hover:bg-freight-yellow/90 font-bold shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          New Assignment
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-4 flex-1 min-h-0">
        {columns.map(col => {
          const columnShipments = getColumnShipments(col.id)
          const Icon = col.icon
          return (
            <div key={col.id} className="flex flex-col min-h-0">
              <div className={`flex items-center justify-between mb-3 px-1 pb-2 border-b-2 ${col.color}`}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground uppercase tracking-wider">{col.label}</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {columnShipments.length}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                {columnShipments.map(shipment => (
                  <Card
                    key={shipment.id}
                    className="bg-card/50 border-border/50 hover:border-freight-yellow/50 hover:bg-card transition-all duration-200 cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-freight-yellow tracking-wider">
                          {shipment.shipment_number}
                        </span>
                        <Badge className={`text-[10px] px-1.5 py-0 ${priorityStyles[shipment.priority]}`}>
                          {shipment.priority === 'urgent' && <AlertTriangle className="h-3 w-3 mr-0.5" />}
                          {shipment.priority}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="text-foreground truncate">{shipment.shipper}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm pl-1">
                          <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="text-muted-foreground truncate">{shipment.consignee}</span>
                        </div>
                      </div>

                      {(shipment.driver_name || shipment.vehicle) && (
                        <div className="border-t border-border/50 pt-2 mt-2 space-y-1">
                          {shipment.driver_name && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <User className="h-3 w-3 shrink-0" />
                              <span className="truncate">{shipment.driver_name}</span>
                            </div>
                          )}
                          {shipment.vehicle && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Truck className="h-3 w-3 shrink-0" />
                              <span>{shipment.vehicle}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border/30">
                        <Clock className="h-3 w-3 text-muted-foreground/60" />
                        <span className="text-[10px] text-muted-foreground/60">{getTimeSince(shipment.created_at)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {columnShipments.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className={`p-3 rounded-full ${col.bg} mb-2`}>
                      <Icon className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                    <p className="text-xs text-muted-foreground/60">No shipments</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
