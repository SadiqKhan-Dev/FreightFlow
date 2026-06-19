'use client'

import { PublicLayout } from '@/components/layout/public-layout'
import { motion } from 'framer-motion'
import {
  Package, Truck, UserCheck, MapPin, Route, BarChart3,
  ClipboardList, Warehouse, Receipt, Bell, Shield, Globe,
  Fuel, Clock, FileText, Phone, Headphones, Cpu, Cloud,
  BarChart, MapPinned, TruckIcon, Container, Thermometer,
  Weight, ArrowRight, CheckCircle, Zap, TrendingUp, Star,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: 'easeOut' },
  }),
}

const coreFeatures = [
  {
    icon: Package,
    title: 'Shipment Management',
    desc: 'End-to-end shipment lifecycle management from booking to proof of delivery.',
    details: [
      'Create and manage shipments with full shipper/consignee details',
      'Real-time status tracking across every milestone',
      'Automated shipment number generation (FF-XXXXXXXX)',
      'Support for FTL, LTL, Parcel, and Express shipments',
      'Document attachment and proof of delivery capture',
      'Bulk shipment creation for high-volume operations',
    ],
  },
  {
    icon: Truck,
    title: 'Fleet Management',
    desc: 'Complete fleet visibility with vehicle tracking, maintenance, and utilization metrics.',
    details: [
      'Register and track trucks, vans, trailers, and containers',
      'Monitor vehicle status: Available, In Use, Maintenance, Out of Service',
      'Track mileage, fuel type, and capacity for each vehicle',
      'Maintenance scheduling with automatic alerts',
      'Fuel consumption tracking and cost analysis',
      'Vehicle utilization reports and optimization suggestions',
    ],
  },
  {
    icon: UserCheck,
    title: 'Driver Management',
    desc: 'Comprehensive driver profiles with CDL tracking, compliance, and performance scoring.',
    details: [
      'Complete driver profiles with license and endorsement tracking',
      'CDL expiry alerts and compliance monitoring',
      'Driver availability scheduling and shift management',
      'Performance scorecards based on safety and efficiency',
      'Route history and mileage tracking per driver',
      'Quick driver assignment to shipments and routes',
    ],
  },
  {
    icon: MapPin,
    title: 'Real-Time GPS Tracking',
    desc: 'Live fleet visibility with GPS tracking, geofencing, and historical route playback.',
    details: [
      'Live GPS positioning for every vehicle in your fleet',
      'Geofence alerts when vehicles enter or leave designated zones',
      'Historical route playback for audit and verification',
      'Speed monitoring and harsh braking detection',
      'Estimated time of arrival calculations',
      'Customer-facing tracking link for shipment visibility',
    ],
  },
  {
    icon: Route,
    title: 'Route Optimization',
    desc: 'AI-powered route planning that reduces fuel costs and improves delivery performance.',
    details: [
      'Multi-stop route optimization with traffic awareness',
      'Fuel-efficient routing based on vehicle type and load',
      'Turn-by-turn navigation integration',
      'Route comparison: time, distance, and fuel cost',
      'Driver-friendly routes avoiding restricted roads',
      'Historical route analysis for continuous improvement',
    ],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    desc: 'Deep operational insights with revenue, fleet, driver, and shipment analytics.',
    details: [
      'Revenue tracking: monthly, quarterly, and annual trends',
      'Fleet performance dashboards with key metrics',
      'Driver scorecards and efficiency rankings',
      'Shipment analytics: on-time rates, cost per mile, utilization',
      'Custom report builder with export to PDF, Excel, CSV',
      'Real-time KPI monitoring on the operations dashboard',
    ],
  },
]

const additionalFeatures = [
  {
    icon: ClipboardList,
    title: 'Dispatch Board',
    desc: 'Kanban-style dispatch board for visual load assignment and tracking through every stage.',
  },
  {
    icon: Warehouse,
    title: 'Warehouse Operations',
    desc: 'Track inventory, manage inbound/outbound freight, and monitor facility utilization.',
  },
  {
    icon: Receipt,
    title: 'Invoicing & Billing',
    desc: 'Generate invoices, track payments, manage detention charges, and automate carrier billing.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    desc: 'Real-time alerts for shipments, maintenance, compliance deadlines, and operational exceptions.',
  },
  {
    icon: Fuel,
    title: 'Fuel Management',
    desc: 'Track fuel purchases, consumption rates, and cost-per-mile across your entire fleet.',
  },
  {
    icon: Clock,
    title: 'Hours of Service',
    desc: 'Monitor driver HOS compliance, remaining drive time, and required rest periods.',
  },
  {
    icon: FileText,
    title: 'Document Management',
    desc: 'Store and manage BOLs, PODs, contracts, and compliance documents in one place.',
  },
  {
    icon: Phone,
    title: 'Carrier Communication',
    desc: 'In-platform messaging between dispatchers, drivers, and carrier partners.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    desc: 'JWT authentication, role-based access control, and encrypted data at rest and in transit.',
  },
  {
    icon: Globe,
    title: 'Multi-Tenant SaaS',
    desc: 'Complete data isolation between companies. Your freight data stays private and secure.',
  },
  {
    icon: Cpu,
    title: 'API Access',
    desc: 'RESTful API for custom integrations with TMS, ERP, and accounting systems.',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    desc: '99.9% uptime SLA with auto-scaling infrastructure and daily backups.',
  },
]

const integrations = [
  { name: 'McLeod LoadMaster', category: 'TMS' },
  { name: 'TMW Systems', category: 'TMS' },
  { name: 'Samsara', category: 'Telematics' },
  { name: 'KeepTruckin', category: 'ELD' },
  { name: 'QuickBooks', category: 'Accounting' },
  { name: 'Geotab', category: 'GPS' },
  { name: 'Fleet Complete', category: 'Fleet' },
  { name: 'MercuryGate', category: 'TMS' },
]

const useCases = [
  {
    title: 'For Carriers',
    desc: 'Manage your entire fleet, dispatch loads, track shipments, and optimize routes — all from one platform built for American trucking operations.',
    icon: Truck,
    stats: 'Reduce operational costs by 25%',
  },
  {
    title: 'For Freight Brokers',
    desc: 'Track carrier performance, manage customer shipments, automate billing, and gain real-time visibility into every load in your network.',
    icon: ClipboardList,
    stats: 'Increase broker efficiency by 40%',
  },
  {
    title: 'For Fleet Managers',
    desc: 'Monitor vehicle health, schedule maintenance, track driver performance, and maximize fleet utilization across your entire operation.',
    icon: Gauge,
    stats: 'Improve fleet utilization by 30%',
  },
  {
    title: 'For Dispatch Teams',
    desc: 'Visual dispatch board, automated load matching, real-time driver communication, and optimized scheduling for maximum throughput.',
    icon: MapPinned,
    stats: 'Cut dispatch time by 50%',
  },
]

function Gauge({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  )
}

export default function FeaturesPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-secondary py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              The Complete <span className="text-primary">Freight Operations</span> Platform
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400">
              Everything your trucking company needs to manage shipments, fleets, drivers, dispatch, and billing —
              purpose-built for the American freight industry.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="/register" className="rounded-lg bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
                Start Free Trial
              </a>
              <a href="/pricing" className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-bold uppercase tracking-wider text-zinc-300 transition-all hover:border-primary/50 hover:text-white">
                View Pricing
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-zinc-800 bg-industrial-gradient py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: '12+', label: 'Core Features' },
              { value: '50+', label: 'Integrations' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <motion.div key={stat.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm font-medium uppercase tracking-wider text-zinc-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features - Detailed */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">Core Platform Features</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-500">
              Deep functionality built specifically for freight operations, not generic project management tools
            </p>
          </motion.div>
          <div className="mt-16 space-y-12">
            {coreFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                className="rounded-2xl border border-zinc-800 bg-secondary p-8 transition-all hover:border-primary/30"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    <p className="mt-2 text-zinc-400">{feature.desc}</p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {feature.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-zinc-300">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">More Powerful Features</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Additional tools and capabilities to streamline every aspect of your freight operations
            </p>
          </motion.div>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {additionalFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                className="group rounded-xl border border-zinc-800 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">Built For Every Role</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-500">
              Whether you manage 5 trucks or 5,000, FreightFlow adapts to your operations
            </p>
          </motion.div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border border-zinc-800 bg-secondary p-8 text-center transition-all hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <uc.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{uc.title}</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{uc.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  <TrendingUp className="h-3 w-3" />
                  {uc.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">Integrations</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Connect FreightFlow with your existing TMS, telematics, ELD, and accounting systems
            </p>
          </motion.div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {integrations.map((int, i) => (
              <motion.div
                key={`${int.name}-${i}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-card p-4 transition-all hover:border-primary/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Cpu className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{int.name}</p>
                  <p className="text-xs text-zinc-500">{int.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-secondary py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              Ready to Upgrade Your Freight Operations?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Join 500+ trucking companies already using FreightFlow to move freight smarter.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="/register" className="rounded-lg bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
                Start Free Trial
              </a>
              <a href="/contact" className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-bold uppercase tracking-wider text-zinc-300 transition-all hover:border-primary/50 hover:text-white">
                Schedule Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
