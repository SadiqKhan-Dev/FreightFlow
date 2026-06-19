'use client'

import Image from 'next/image'
import { PublicLayout } from '@/components/layout/public-layout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Truck, Package, MapPin, BarChart3, Shield, Zap, Globe, Clock, ArrowRight, CheckCircle, Route, Users, Phone, Mail, ChevronRight, ArrowUpRight, Warehouse, ClipboardList, FileText, TrendingUp, Fuel, Map, Navigation, CircleDot, Star, Quote, Calendar, ChevronLeft } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const services = [
  { icon: Truck, title: 'Full Truckload (FTL)', desc: 'Dedicated truck for your freight. Direct shipping with no stops, faster transit times for large shipments.', image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=1200&q=80' },
  { icon: Package, title: 'Less Than Truckload (LTL)', desc: 'Cost-effective shipping for smaller loads. Share truck space with other shippers to reduce costs.', image: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=1200&q=80' },
  { icon: Zap, title: 'Dedicated Freight', desc: 'Exclusive trucks and drivers assigned to your operations. Consistent capacity and reliable service.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80' },
  { icon: Route, title: 'Expedited Freight', desc: 'Time-critical shipments delivered fast. Guaranteed pickup and delivery for urgent freight.', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80' },
  { icon: Warehouse, title: 'Intermodal Services', desc: 'Combine rail and truck transport for cost savings. Flexible shipping solutions across the nation.', image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=800&q=80' },
  { icon: ClipboardList, title: 'Warehousing & Distribution', desc: 'Strategic warehouse locations with cross-docking, fulfillment, and inventory management.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80' }
]

const fleetTypes = [
  { name: 'Dry Van', capacity: '45,000 lbs', range: '1,500 mi', status: 'Available', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80', desc: 'Enclosed trailers for general freight, consumer goods, and non-perishable items.' },
  { name: 'Flatbed', capacity: '48,000 lbs', range: '1,200 mi', status: 'Available', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80', desc: 'Open trailers for oversized loads, construction materials, and heavy equipment.' },
  { name: 'Refrigerated', capacity: '44,000 lbs', range: '1,800 mi', status: 'Available', image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=600&q=80', desc: 'Temperature-controlled trailers for perishable goods, food, and pharmaceuticals.' },
  { name: 'Tanker', capacity: '55,000 gal', range: '1,000 mi', status: 'Available', image: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=600&q=80', desc: 'Liquid transport for fuel, chemicals, and food-grade liquids.' },
  { name: 'Car Hauler', capacity: '8 Vehicles', range: '1,400 mi', status: 'Available', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80', desc: 'Specialized trailers for transporting new and used vehicles.' },
  { name: 'Step Deck', capacity: '48,000 lbs', range: '1,300 mi', status: 'Available', image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=600&q=80', desc: 'Multi-level trailers for tall or heavy cargo that exceeds standard height.' }
]

const processSteps = [
  { number: '01', title: 'Book Freight', desc: 'Submit your shipment details and get instant quotes for available capacity.', icon: ClipboardList },
  { number: '02', title: 'Dispatch', desc: 'Our system assigns the best driver and truck for your route and timeline.', icon: Truck },
  { number: '03', title: 'Pickup', desc: 'Driver arrives at origin with real-time GPS tracking and documentation.', icon: MapPin },
  { number: '04', title: 'In Transit', desc: 'Monitor shipment progress with live updates and ETAs throughout the journey.', icon: Navigation },
  { number: '05', title: 'Delivery', desc: 'Secure delivery confirmation with proof of delivery and signature capture.', icon: Package },
  { number: '06', title: 'Confirmation', desc: 'Complete documentation, invoicing, and performance metrics available instantly.', icon: CheckCircle }
]

const testimonials = [
  {
    quote: "FreightFlow USA cut our dispatch time in half. The real-time tracking and automated routing have transformed how we manage our 200-truck fleet. We've saved over $2M in fuel costs alone.",
    name: "Michael Torres",
    role: "Fleet Operations Director",
    company: "Torres Logistics Group",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
  },
  {
    quote: "As a freight broker, I need instant visibility across all my loads. FreightFlow gives me that and more. My carriers love the driver app, and my shippers love the transparency.",
    name: "Jennifer Walsh",
    role: "Dispatch Manager",
    company: "Pacific Freight Solutions",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
  },
  {
    quote: "We've tried every TMS on the market. FreightFlow is the only one that actually works the way trucking companies operate. The ROI was immediate — 40% reduction in deadhead miles.",
    name: "Robert Chen",
    role: "Freight Broker & Owner",
    company: "National Carrier Network",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
  }
]

const cities = [
  // West Coast
  { name: 'Seattle', x: 14.2, y: 10.8, region: 'West' },
  { name: 'Portland', x: 13.5, y: 16.5, region: 'West' },
  { name: 'San Francisco', x: 10.8, y: 32.5, region: 'West' },
  { name: 'Los Angeles', x: 13.5, y: 44.5, region: 'West' },
  { name: 'San Diego', x: 14.2, y: 47.5, region: 'West' },
  { name: 'Las Vegas', x: 17.5, y: 40.5, region: 'West' },
  { name: 'Phoenix', x: 20.5, y: 44.5, region: 'West' },
  { name: 'Sacramento', x: 11.5, y: 30.5, region: 'West' },
  { name: 'Salt Lake City', x: 22.5, y: 30.5, region: 'West' },
  { name: 'Boise', x: 18.5, y: 20.5, region: 'West' },
  // Mountain / Central
  { name: 'Denver', x: 30.5, y: 32.5, region: 'Mountain' },
  { name: 'Albuquerque', x: 25.5, y: 42.5, region: 'Mountain' },
  { name: 'El Paso', x: 28.5, y: 50.5, region: 'Mountain' },
  { name: 'Omaha', x: 40.5, y: 28.5, region: 'Central' },
  { name: 'Kansas City', x: 42.5, y: 34.5, region: 'Central' },
  { name: 'Oklahoma City', x: 40.5, y: 42.5, region: 'Central' },
  { name: 'Wichita', x: 38.5, y: 37.5, region: 'Central' },
  { name: 'Tucson', x: 19.5, y: 48.5, region: 'West' },
  // Texas / South Central
  { name: 'Dallas', x: 40.5, y: 48.5, region: 'South Central' },
  { name: 'Houston', x: 42.5, y: 53.5, region: 'South Central' },
  { name: 'San Antonio', x: 38.5, y: 52.5, region: 'South Central' },
  { name: 'Austin', x: 39.5, y: 51.5, region: 'South Central' },
  { name: 'Lubbock', x: 34.5, y: 45.5, region: 'South Central' },
  { name: 'Amarillo', x: 34.5, y: 42.5, region: 'South Central' },
  // Midwest
  { name: 'Minneapolis', x: 43.5, y: 17.5, region: 'Midwest' },
  { name: 'Chicago', x: 53.5, y: 24.5, region: 'Midwest' },
  { name: 'Detroit', x: 59.5, y: 22.5, region: 'Midwest' },
  { name: 'Indianapolis', x: 55.5, y: 30.5, region: 'Midwest' },
  { name: 'St. Louis', x: 49.5, y: 34.5, region: 'Midwest' },
  { name: 'Milwaukee', x: 51.5, y: 21.5, region: 'Midwest' },
  { name: 'Columbus', x: 60.5, y: 29.5, region: 'Midwest' },
  { name: 'Cincinnati', x: 58.5, y: 32.5, region: 'Midwest' },
  { name: 'Cleveland', x: 62.5, y: 27.5, region: 'Midwest' },
  { name: 'Pittsburgh', x: 64.5, y: 28.5, region: 'Midwest' },
  { name: 'St. Paul', x: 43.5, y: 16.5, region: 'Midwest' },
  { name: 'Des Moines', x: 44.5, y: 26.5, region: 'Midwest' },
  { name: 'Wichita', x: 38.5, y: 37.5, region: 'Midwest' },
  // South / Southeast
  { name: 'Atlanta', x: 58.5, y: 44.5, region: 'Southeast' },
  { name: 'Nashville', x: 55.5, y: 38.5, region: 'Southeast' },
  { name: 'Memphis', x: 50.5, y: 40.5, region: 'Southeast' },
  { name: 'Jacksonville', x: 65.5, y: 52.5, region: 'Southeast' },
  { name: 'Charlotte', x: 63.5, y: 39.5, region: 'Southeast' },
  { name: 'Raleigh', x: 66.5, y: 37.5, region: 'Southeast' },
  { name: 'Tampa', x: 64.5, y: 57.5, region: 'Southeast' },
  { name: 'Miami', x: 68.5, y: 60.5, region: 'Southeast' },
  { name: 'Orlando', x: 65.5, y: 55.5, region: 'Southeast' },
  { name: 'Savannah', x: 64.5, y: 48.5, region: 'Southeast' },
  { name: 'Charleston', x: 65.5, y: 43.5, region: 'Southeast' },
  { name: 'Birmingham', x: 55.5, y: 43.5, region: 'Southeast' },
  { name: 'New Orleans', x: 50.5, y: 52.5, region: 'Southeast' },
  { name: 'Little Rock', x: 47.5, y: 42.5, region: 'Southeast' },
  { name: 'Baton Rouge', x: 50.5, y: 53.5, region: 'Southeast' },
  { name: 'Mobile', x: 53.5, y: 51.5, region: 'Southeast' },
  // Northeast
  { name: 'New York', x: 72.5, y: 25.5, region: 'Northeast' },
  { name: 'Philadelphia', x: 70.5, y: 28.5, region: 'Northeast' },
  { name: 'Boston', x: 75.5, y: 20.5, region: 'Northeast' },
  { name: 'Baltimore', x: 68.5, y: 30.5, region: 'Northeast' },
  { name: 'Washington DC', x: 67.5, y: 31.5, region: 'Northeast' },
  { name: 'Newark', x: 71.5, y: 26.5, region: 'Northeast' },
  { name: 'Hartford', x: 74.5, y: 22.5, region: 'Northeast' },
  { name: 'Providence', x: 75.5, y: 21.5, region: 'Northeast' },
  { name: 'Buffalo', x: 67.5, y: 22.5, region: 'Northeast' },
  { name: 'Albany', x: 70.5, y: 21.5, region: 'Northeast' },
]

const routes = [
  // Major East-West corridors
  { from: 'Los Angeles', to: 'Phoenix' },
  { from: 'Phoenix', to: 'El Paso' },
  { from: 'El Paso', to: 'San Antonio' },
  { from: 'San Antonio', to: 'Houston' },
  { from: 'Houston', to: 'New Orleans' },
  { from: 'New Orleans', to: 'Mobile' },
  { from: 'Mobile', to: 'Tampa' },
  { from: 'Tampa', to: 'Miami' },
  { from: 'Los Angeles', to: 'Las Vegas' },
  { from: 'Las Vegas', to: 'Salt Lake City' },
  { from: 'Salt Lake City', to: 'Denver' },
  { from: 'Denver', to: 'Kansas City' },
  { from: 'Kansas City', to: 'St. Louis' },
  { from: 'St. Louis', to: 'Indianapolis' },
  { from: 'Indianapolis', to: 'Columbus' },
  { from: 'Columbus', to: 'Pittsburgh' },
  { from: 'Pittsburgh', to: 'New York' },
  { from: 'New York', to: 'Boston' },
  { from: 'Seattle', to: 'Portland' },
  { from: 'Portland', to: 'Boise' },
  { from: 'Boise', to: 'Salt Lake City' },
  { from: 'Sacramento', to: 'San Francisco' },
  { from: 'San Francisco', to: 'Los Angeles' },
  { from: 'San Diego', to: 'Phoenix' },
  { from: 'Tucson', to: 'El Paso' },
  // Major North-South corridors
  { from: 'Seattle', to: 'Minneapolis' },
  { from: 'Minneapolis', to: 'Des Moines' },
  { from: 'Des Moines', to: 'Kansas City' },
  { from: 'Kansas City', to: 'Oklahoma City' },
  { from: 'Oklahoma City', to: 'Dallas' },
  { from: 'Dallas', to: 'Houston' },
  { from: 'Dallas', to: 'San Antonio' },
  { from: 'Dallas', to: 'Austin' },
  { from: 'Amarillo', to: 'Dallas' },
  { from: 'Lubbock', to: 'San Antonio' },
  { from: 'Chicago', to: 'St. Louis' },
  { from: 'St. Louis', to: 'Memphis' },
  { from: 'Memphis', to: 'Jacksonville' },
  { from: 'Memphis', to: 'Birmingham' },
  { from: 'Birmingham', to: 'Atlanta' },
  { from: 'Atlanta', to: 'Savannah' },
  { from: 'Atlanta', to: 'Charlotte' },
  { from: 'Charlotte', to: 'Raleigh' },
  { from: 'Raleigh', to: 'Washington DC' },
  { from: 'Washington DC', to: 'Baltimore' },
  { from: 'Baltimore', to: 'Philadelphia' },
  { from: 'Philadelphia', to: 'Newark' },
  { from: 'Newark', to: 'New York' },
  { from: 'New York', to: 'Hartford' },
  { from: 'Hartford', to: 'Providence' },
  // Cross-country routes
  { from: 'Los Angeles', to: 'Dallas' },
  { from: 'Dallas', to: 'Atlanta' },
  { from: 'Atlanta', to: 'New York' },
  { from: 'Chicago', to: 'New York' },
  { from: 'Chicago', to: 'Detroit' },
  { from: 'Detroit', to: 'Cleveland' },
  { from: 'Cleveland', to: 'Columbus' },
  { from: 'Cincinnati', to: 'Nashville' },
  { from: 'Nashville', to: 'Charlotte' },
  { from: 'Nashville', to: 'Atlanta' },
  { from: 'Jacksonville', to: 'Savannah' },
  { from: 'Tampa', to: 'Orlando' },
  { from: 'Orlando', to: 'Jacksonville' },
  { from: 'New Orleans', to: 'Baton Rouge' },
  { from: 'Little Rock', to: 'Memphis' },
  { from: 'Little Rock', to: 'Dallas' },
  { from: 'Omaha', to: 'Chicago' },
  { from: 'Wichita', to: 'Kansas City' },
  { from: 'Albuquerque', to: 'Tucson' },
  { from: 'Albuquerque', to: 'El Paso' },
  { from: 'Buffalo', to: 'Albany' },
  { from: 'Albany', to: 'Boston' },
]

export default function HomePage() {
  const getCityCoords = (cityName: string) => cities.find(c => c.name === cityName)

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80"
            alt="American freight truck on highway"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Highway road lines animation at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className="highway-lines h-full animate-highway-lines" />
        </div>

        {/* Animated truck driving across hero */}
        <div className="absolute bottom-8 left-0 right-0 overflow-hidden pointer-events-none">
          <div className="animate-truck-drive">
            <Truck className="h-6 w-6 text-primary/40" />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.span 
              variants={fadeUp}
              className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6 border border-primary/30 animate-glow-pulse"
            >
              America&apos;s #1 Freight Operating System
            </motion.span>
            
            <motion.h1 
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-white leading-tight"
            >
              Move Freight Faster{' '}
              <span className="text-primary">Across America</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-300 leading-relaxed"
            >
              The complete freight, dispatch, fleet, and logistics operating system for American trucking companies and freight brokers. From coast to coast.
            </motion.p>
            
            <motion.div 
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-start gap-4"
            >
              <Link 
                href="/register" 
                className="rounded-lg bg-primary px-8 py-4 text-base font-semibold text-secondary hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25 flex items-center gap-2 group"
              >
                Book Freight <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/features" 
                className="rounded-lg border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
              >
                Explore Platform
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 sm:p-8"
          >
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { icon: Truck, value: '2,847+', label: 'Active Trucks' },
                { icon: Package, value: '1.2M+', label: 'Deliveries' },
                { icon: MapPin, value: '48', label: 'States Covered' },
                { icon: TrendingUp, value: '$4.2B+', label: 'Freight Moved' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center animate-cargo-load" style={{ animationDelay: `${0.8 + i * 0.15}s` }}>
                  <div className="flex items-center justify-center gap-2">
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500">Scroll</span>
            <ChevronRight className="h-4 w-4 text-zinc-500 rotate-90" />
          </div>
        </div>
      </section>

      {/* Fleet Statistics Section */}
      <section className="py-16 bg-secondary border-t border-primary/20 relative overflow-hidden">
        {/* Highway lines decoration */}
        <div className="absolute top-0 left-0 right-0 h-px highway-lines animate-highway-lines opacity-30" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Truck, value: '2,847+', label: 'Active Trucks', color: 'text-primary', gauge: 85 },
              { icon: Package, value: '1.2M+', label: 'Deliveries Completed', color: 'text-primary', gauge: 92 },
              { icon: MapPin, value: '48', label: 'States Covered', color: 'text-primary', gauge: 78 },
              { icon: TrendingUp, value: '$4.2B+', label: 'Freight Moved', color: 'text-primary', gauge: 95 }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                variants={fadeUp}
                className="text-center p-6 rounded-xl bg-black/30 border border-white/5 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="animate-cargo-load" style={{ animationDelay: `${i * 0.1}s` }}>
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3 group-hover:animate-wheel-spin`} />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white animate-odometer" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>{stat.value}</div>
                <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
                {/* Fuel gauge bar */}
                <div className="mt-3 h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary animate-fuel-gauge" 
                    style={{ '--gauge-width': `${stat.gauge}%`, animationDelay: `${0.5 + i * 0.2}s` } as React.CSSProperties}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Freight Services Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeUp}
              className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4 border border-primary/30"
            >
              Our Services
            </motion.span>
            <motion.h2 
              variants={fadeUp}
              className="text-3xl font-bold sm:text-4xl lg:text-5xl"
            >
              Complete <span className="text-primary">Freight Solutions</span>
            </motion.h2>
            <motion.p 
              variants={fadeUp}
              className="mt-4 text-lg text-freight-silver max-w-2xl mx-auto"
            >
              From single pallets to full truckloads, we have the capacity and expertise to move your freight anywhere in America.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div 
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative rounded-xl overflow-hidden h-80 cursor-pointer"
              >
                {/* Card Background Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                
                {/* Icon overlay */}
                <div className="absolute top-4 right-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">{service.desc}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* USA Coverage Map Section */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80"
            alt="Freight terminal"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-secondary/90" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeUp}
              className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4 border border-primary/30"
            >
              Nationwide Network
            </motion.span>
            <motion.h2 
              variants={fadeUp}
              className="text-3xl font-bold sm:text-4xl lg:text-5xl text-white"
            >
              Coast-to-Coast <span className="text-primary">Coverage</span>
            </motion.h2>
            <motion.p 
              variants={fadeUp}
              className="mt-4 text-lg text-freight-silver max-w-2xl mx-auto"
            >
              Serving 48 states with real-time tracking and dispatch operations across the nation.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Detailed SVG USA Map */}
            <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto">
              <svg viewBox="0 0 90 70" className="w-full h-full">
                <defs>
                  <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(36, 95%, 54%)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="hsl(36, 95%, 54%)" stopOpacity="0" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(36, 95%, 54%)" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="hsl(36, 95%, 54%)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="hsl(36, 95%, 54%)" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Detailed USA continental outline */}
                <path
                  d="M12,12 L13.5,10.5 L14.5,11 L15,10 L16,11 L17.5,10.5 L18,11.5 L17,13 L16.5,14.5 L15,15 L14,16.5 L13.5,18 L13,20 L12,22 L11,24 L10.5,26 L10,28 L9.5,30 L10,31.5 L10.5,33 L11.5,34.5 L12,36 L13,37 L13.5,38 L14,40 L13.5,42 L13,43 L13.5,44 L14,45 L15,46 L16,47 L17,48 L18.5,48.5 L20,49 L21.5,49.5 L23,50 L24.5,50.5 L26,51 L27.5,51.5 L29,52 L30.5,52.5 L32,53 L33.5,53.5 L35,54 L36.5,54.5 L38,55 L39.5,55.5 L41,56 L42.5,56.5 L44,57 L45.5,57.5 L47,58 L48.5,58.5 L50,59 L51.5,59 L53,58.5 L54.5,58 L56,57 L57,55.5 L58,54 L59,52.5 L60,51 L61,50 L62,48.5 L63,47 L63.5,45.5 L64,44 L64.5,42 L65,40.5 L66,39 L67,37.5 L68,36 L68.5,34.5 L69,33 L69.5,31 L70,29.5 L70.5,28 L71,26.5 L72,25 L73,24 L74,23 L75,22 L75.5,21 L76,20 L76.5,19.5 L75.5,19 L74,18.5 L73,18 L72,17 L71,16.5 L70,17 L69,18 L68,19 L67,19.5 L66,20 L65,21 L64,22 L63,22.5 L62,23 L61,23.5 L60,24 L59,24.5 L58,25 L57,25.5 L56,26 L55,26.5 L54,27 L53,27.5 L52,28 L51,28.5 L50,29 L49,29.5 L48,30 L47,30.5 L46,31 L45,31.5 L44,31 L43,30.5 L42,30 L41,29.5 L40,29 L39,28.5 L38,28 L37,28 L36,28.5 L35,29 L34,29.5 L33,30 L32,30.5 L31,31 L30,31.5 L29,32 L28,32.5 L27,33 L26,33.5 L25,33 L24,32.5 L23,32 L22,31.5 L21,31 L20,31 L19,31.5 L18,32 L17.5,33 L17,34 L16.5,35 L16,36 L15.5,37 L15,38 L14.5,39 L14,40 L13.5,41 L13,42 L12.5,43 L12,44 L11.5,45 L11,46 L10.5,47 L10,48 L9.5,49 L9,50 L8.5,51 L8,52 L8.5,53 L9,54 L10,55 L11,56 L12,56.5 L13,56 L14,55 L15,54 L16,53 L17,52 L18,51 L19,50 L20,49.5 L21,49 L22,48.5 L23,48 L24,47.5 L25,47 L26,46.5 L27,46 L28,45.5 L29,45 L30,44.5 L31,44 L32,43.5 L33,43 L34,42.5 L35,42 L36,41.5 L37,41 L38,40.5 L39,40 L40,39.5 L41,39 L42,38.5 L43,38 L44,37.5 L45,37 L46,36.5 L47,36 L48,35.5 L49,35 L50,34.5 L51,34 L52,33.5 L53,33 L54,32.5 L55,32 L56,31.5 L57,31 L58,30.5 L59,30 L60,29.5 L61,29 L62,28.5 L63,28 L64,27.5 L65,27 L66,26.5 L67,26 L68,25.5 L69,25 L70,24.5 L71,24 L72,23.5 L73,23 L74,22 L75,21 L76,20 L76.5,19.5"
                  fill="none"
                  stroke="hsl(36, 95%, 54%)"
                  strokeWidth="0.4"
                  opacity="0.25"
                />

                {/* State boundary lines (subtle grid) */}
                {[20, 30, 40, 50, 60, 70].map((x) => (
                  <line key={`vl${x}`} x1={x} y1={10} x2={x} y2={60} stroke="hsl(36, 95%, 54%)" strokeWidth="0.05" opacity="0.1" />
                ))}
                {[20, 30, 40, 50].map((y) => (
                  <line key={`hl${y}`} x1={8} y1={y} x2={78} y2={y} stroke="hsl(36, 95%, 54%)" strokeWidth="0.05" opacity="0.1" />
                ))}

                {/* Freight corridor glow paths */}
                {/* I-10 Corridor (LA to Miami) */}
                <motion.path
                  d="M13.5,44.5 Q20,48 28.5,50.5 Q35,52 42.5,53.5 Q50,53 58,52 Q65,52 68.5,60.5"
                  fill="none"
                  stroke="hsl(36, 95%, 54%)"
                  strokeWidth="0.8"
                  opacity="0.15"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                {/* I-95 Corridor (Miami to Boston) */}
                <motion.path
                  d="M68.5,60.5 Q67,52 65.5,43.5 Q66.5,37 67.5,31.5 Q70,29 72.5,25.5 Q74,22 75.5,20.5"
                  fill="none"
                  stroke="hsl(36, 95%, 54%)"
                  strokeWidth="0.8"
                  opacity="0.15"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.8 }}
                />
                {/* I-40 Corridor (LA to NC) */}
                <motion.path
                  d="M13.5,44.5 Q18,42 22,40 Q28,38 34,36 Q40,34 48,36 Q55,38 60,37"
                  fill="none"
                  stroke="hsl(36, 95%, 54%)"
                  strokeWidth="0.8"
                  opacity="0.15"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.0 }}
                />
                {/* I-5 Corridor (Seattle to LA) */}
                <motion.path
                  d="M14.2,10.8 Q13,18 11.5,30.5 Q12,38 13.5,44.5"
                  fill="none"
                  stroke="hsl(36, 95%, 54%)"
                  strokeWidth="0.8"
                  opacity="0.15"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.2 }}
                />
                {/* I-35 Corridor (MN to TX) */}
                <motion.path
                  d="M43.5,17.5 Q42,25 42.5,34.5 Q41,40 40.5,48.5 Q40,51 42.5,53.5"
                  fill="none"
                  stroke="hsl(36, 95%, 54%)"
                  strokeWidth="0.8"
                  opacity="0.15"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.4 }}
                />
                {/* I-10 to I-75 (Houston to Atlanta) */}
                <motion.path
                  d="M42.5,53.5 Q48,50 53,46 Q57,44 58.5,44.5"
                  fill="none"
                  stroke="hsl(36, 95%, 54%)"
                  strokeWidth="0.8"
                  opacity="0.15"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.6 }}
                />

                {/* Route lines */}
                {routes.map((route, i) => {
                  const from = getCityCoords(route.from)
                  const to = getCityCoords(route.to)
                  if (!from || !to) return null
                  const midX = (from.x + to.x) / 2
                  const midY = (from.y + to.y) / 2 - 1.5
                  return (
                    <motion.path
                      key={i}
                      d={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                      fill="none"
                      stroke="hsl(36, 95%, 54%)"
                      strokeWidth="0.2"
                      opacity="0.4"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.04 }}
                    />
                  )
                })}

                {/* City dots with labels */}
                {cities.map((city) => (
                  <g key={city.name}>
                    {/* Outer glow */}
                    <circle cx={city.x} cy={city.y} r="2.5" fill="url(#cityGlow)" opacity="0.4" />
                    {/* Pulse ring */}
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r="1.2"
                      fill="none"
                      stroke="hsl(36, 95%, 54%)"
                      strokeWidth="0.15"
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      whileInView={{ scale: 2, opacity: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 + Math.random() * 2 }}
                    />
                    {/* City dot */}
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={['Dallas', 'Los Angeles', 'Chicago', 'New York', 'Atlanta', 'Houston', 'Miami', 'Seattle', 'Denver', 'Phoenix'].includes(city.name) ? '1' : '0.6'}
                      fill="hsl(36, 95%, 54%)"
                      filter="url(#glow)"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* City label */}
                    <text
                      x={city.x}
                      y={city.y - (['Dallas', 'Los Angeles', 'Chicago', 'New York', 'Atlanta', 'Houston', 'Miami', 'Seattle', 'Denver', 'Phoenix'].includes(city.name) ? 2.5 : 1.8)}
                      textAnchor="middle"
                      fill="white"
                      fontSize={['Dallas', 'Los Angeles', 'Chicago', 'New York', 'Atlanta', 'Houston', 'Miami', 'Seattle', 'Denver', 'Phoenix'].includes(city.name) ? '2' : '1.3'}
                      fontWeight={['Dallas', 'Los Angeles', 'Chicago', 'New York', 'Atlanta', 'Houston', 'Miami', 'Seattle', 'Denver', 'Phoenix'].includes(city.name) ? '700' : '500'}
                      opacity={['Dallas', 'Los Angeles', 'Chicago', 'New York', 'Atlanta', 'Houston', 'Miami', 'Seattle', 'Denver', 'Phoenix'].includes(city.name) ? '1' : '0.7'}
                    >
                      {city.name}
                    </text>
                  </g>
                ))}

                {/* Animated truck icons on major routes */}
                <motion.g
                  initial={{ x: 13.5, y: 44.5 }}
                  animate={{ x: 72.5, y: 25.5 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <circle r="0.8" fill="hsl(36, 95%, 54%)" opacity="0.9" />
                  <circle r="1.5" fill="hsl(36, 95%, 54%)" opacity="0.2" />
                </motion.g>
                <motion.g
                  initial={{ x: 72.5, y: 25.5 }}
                  animate={{ x: 40.5, y: 48.5 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 2 }}
                >
                  <circle r="0.8" fill="hsl(36, 95%, 54%)" opacity="0.9" />
                  <circle r="1.5" fill="hsl(36, 95%, 54%)" opacity="0.2" />
                </motion.g>
                <motion.g
                  initial={{ x: 40.5, y: 48.5 }}
                  animate={{ x: 68.5, y: 60.5 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 4 }}
                >
                  <circle r="0.8" fill="hsl(36, 95%, 54%)" opacity="0.9" />
                  <circle r="1.5" fill="hsl(36, 95%, 54%)" opacity="0.2" />
                </motion.g>
              </svg>

              {/* Map legend */}
              <div className="absolute bottom-4 left-4 rounded-lg border border-zinc-800 bg-black/60 px-4 py-3 backdrop-blur-sm">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Freight Network</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-[10px] text-zinc-400">Active Routes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-0.5 w-4 bg-primary opacity-40" />
                    <span className="text-[10px] text-zinc-400">Freight Corridors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-[10px] text-zinc-400">Major Hub</span>
                  </div>
                </div>
              </div>

              {/* Live activity indicator */}
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-lg border border-zinc-800 bg-black/60 px-3 py-2 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-[10px] font-semibold text-green-400">Live Tracking Active</span>
              </div>
            </div>

            {/* Stats below map */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <motion.div variants={fadeUp} className="text-center">
                <Truck className="h-7 w-7 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2,847+</div>
                <div className="text-xs text-freight-silver uppercase tracking-wider">Active Trucks</div>
              </motion.div>
              <motion.div variants={fadeUp} className="text-center">
                <MapPin className="h-7 w-7 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">60+</div>
                <div className="text-xs text-freight-silver uppercase tracking-wider">Cities Connected</div>
              </motion.div>
              <motion.div variants={fadeUp} className="text-center">
                <Route className="h-7 w-7 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">48</div>
                <div className="text-xs text-freight-silver uppercase tracking-wider">States Covered</div>
              </motion.div>
              <motion.div variants={fadeUp} className="text-center">
                <Warehouse className="h-7 w-7 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-xs text-freight-silver uppercase tracking-wider">Distribution Centers</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-20 bg-background overflow-hidden relative">
        {/* Conveyor belt line at top */}
        <div className="absolute top-0 left-0 right-0 h-px highway-lines animate-highway-lines opacity-20" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeUp}
              className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4 border border-primary/30"
            >
              Our Fleet
            </motion.span>
            <motion.h2 
              variants={fadeUp}
              className="text-3xl font-bold sm:text-4xl lg:text-5xl"
            >
              Modern Fleet, <span className="text-primary">Maximum Efficiency</span>
            </motion.h2>
            <motion.p 
              variants={fadeUp}
              className="mt-4 text-lg text-freight-silver max-w-2xl mx-auto"
            >
              Our diverse fleet of vehicles handles any freight type with precision and reliability.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {fleetTypes.map((truck, i) => (
              <motion.div 
                key={truck.name}
                variants={fadeUp}
                className="flex-none w-80 snap-center"
              >
                <div className="rounded-xl border border-white/10 bg-card overflow-hidden h-full group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  {/* Truck Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={truck.image}
                      alt={truck.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-fleet-green/90 text-white text-xs font-medium flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-signal-flash" />
                      {truck.status}
                    </span>
                    {/* Fleet number badge */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 text-[10px] font-bold text-primary backdrop-blur-sm">
                      FF-{String(i + 1).padStart(3, '0')}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2">{truck.name}</h3>
                    <p className="text-sm text-freight-silver mb-4 leading-relaxed">{truck.desc}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary animate-signal-flash" style={{ animationDelay: `${i * 0.3}s` } as React.CSSProperties} />
                        <span className="text-freight-silver">Capacity:</span>
                        <span className="text-white font-medium">{truck.capacity}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-fleet-green animate-signal-flash" style={{ animationDelay: `${i * 0.3 + 0.15}s` } as React.CSSProperties} />
                        <span className="text-freight-silver">Range:</span>
                        <span className="text-white font-medium">{truck.range}</span>
                      </div>
                    </div>
                    {/* Fuel gauge bar */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500">Availability</span>
                        <span className="text-[10px] text-fleet-green font-bold">ACTIVE</span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-fleet-green/60 to-fleet-green animate-fuel-gauge" style={{ '--gauge-width': '100%', animationDelay: `${0.5 + i * 0.2}s` } as React.CSSProperties} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeUp}
              className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4 border border-primary/30"
            >
              How It Works
            </motion.span>
            <motion.h2 
              variants={fadeUp}
              className="text-3xl font-bold sm:text-4xl lg:text-5xl text-white"
            >
              Streamlined <span className="text-primary">Operations</span>
            </motion.h2>
            <motion.p 
              variants={fadeUp}
              className="mt-4 text-lg text-freight-silver max-w-2xl mx-auto"
            >
              From booking to confirmation, our streamlined process ensures your freight moves efficiently at every step.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Connecting line with highway animation */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 overflow-hidden">
              <div className="h-full bg-primary/30" />
              <div className="absolute inset-0 highway-lines animate-highway-lines opacity-60" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={step.number}
                  variants={fadeUp}
                  className="relative group"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Step number circle with dispatch pop */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center mb-4 animate-dispatch-pop group-hover:animate-glow-pulse transition-all" style={{ animationDelay: `${index * 0.2}s` } as React.CSSProperties}>
                      <step.icon className="h-7 w-7 text-primary" />
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full border border-primary/30 animate-gps-ping" style={{ animationDelay: `${index * 0.5}s` } as React.CSSProperties} />
                    </div>
                    
                    {/* Step number */}
                    <span className="text-primary font-bold text-sm mb-2">Step {step.number}</span>
                    
                    {/* Step title */}
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    
                    {/* Step description */}
                    <p className="text-sm text-freight-silver leading-relaxed">{step.desc}</p>
                  </div>
                  
                  {/* Arrow (hidden on last step) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-8 -right-4 z-20">
                      <ChevronRight className="h-6 w-6 text-primary animate-convoy" style={{ animationDelay: `${index * 0.3}s` } as React.CSSProperties} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeUp}
              className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4 border border-primary/30"
            >
              Testimonials
            </motion.span>
            <motion.h2 
              variants={fadeUp}
              className="text-3xl font-bold sm:text-4xl lg:text-5xl"
            >
              Trusted by <span className="text-primary">America&apos;s Top Carriers</span>
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-3"
          >
            {testimonials.map((testimonial, i) => (
              <motion.div 
                key={testimonial.name}
                variants={fadeUp}
                className="rounded-xl border border-white/10 bg-card p-8 relative group hover:border-primary/30 transition-all duration-300"
              >
                <Quote className="h-10 w-10 text-primary/30 absolute top-6 right-6 group-hover:text-primary/60 transition-colors" />
                
                {/* Signal flash decoration */}
                <div className="absolute top-6 left-6">
                  <div className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-fleet-green animate-signal-flash" />
                    <span className="h-1 w-1 rounded-full bg-fleet-green animate-signal-flash" style={{ animationDelay: '0.2s' }} />
                    <span className="h-1 w-1 rounded-full bg-fleet-green animate-signal-flash" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-4 mt-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-primary fill-primary animate-cargo-load" style={{ animationDelay: `${j * 0.1}s` } as React.CSSProperties} />
                  ))}
                </div>
                
                <p className="text-white leading-relaxed mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                
                <div className="border-t border-white/10 pt-6 flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                    <p className="text-xs text-freight-silver">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
            alt="Semi truck at sunset"
            fill
            className="object-cover"
          />
          {/* Heavy dark overlay */}
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        </div>

        {/* Highway lines at top */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <div className="highway-lines h-full animate-highway-lines" />
        </div>

        {/* Floating truck decoration */}
        <div className="absolute bottom-12 left-0 right-0 overflow-hidden pointer-events-none">
          <div className="animate-truck-drive" style={{ animationDuration: '6s' } as React.CSSProperties}>
            <Truck className="h-5 w-5 text-primary/20" />
          </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="animate-float inline-block mb-6">
              <Truck className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-white mb-6">
              Ready to Revolutionize Your{' '}
              <span className="text-primary">Freight Operations</span>?
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Join 500+ trucking companies already using FreightFlow USA to streamline their operations, reduce costs, and deliver freight faster.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/register" 
                className="rounded-lg bg-primary px-8 py-4 text-base font-semibold text-secondary hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25 flex items-center gap-2 group"
              >
                Start Free Trial <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/contact" 
                className="rounded-lg border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Schedule Demo <Calendar className="h-5 w-5" />
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2 animate-dispatch-pop" style={{ animationDelay: '0.2s' } as React.CSSProperties}>
                <CheckCircle className="h-4 w-4 text-fleet-green" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 animate-dispatch-pop" style={{ animationDelay: '0.4s' } as React.CSSProperties}>
                <CheckCircle className="h-4 w-4 text-fleet-green" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2 animate-dispatch-pop" style={{ animationDelay: '0.6s' } as React.CSSProperties}>
                <CheckCircle className="h-4 w-4 text-fleet-green" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
