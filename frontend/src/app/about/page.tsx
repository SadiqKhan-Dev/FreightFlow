'use client'

import { PublicLayout } from '@/components/layout/public-layout'
import { motion } from 'framer-motion'
import {
  Truck, Target, Eye, Heart, ShieldCheck, ArrowRight,
  Users, MapPin, Calendar, Award, TrendingUp, Globe,
  Building2, Linkedin, Twitter,
} from 'lucide-react'
import Image from 'next/image'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const cards = [
  { icon: Target, title: 'Our Mission', desc: 'To empower American trucking companies with technology that streamlines operations, cuts costs, and drives on-time deliveries across every mile of highway.', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80' },
  { icon: Eye, title: 'Our Vision', desc: 'To become the leading freight operations platform trusted by every carrier, broker, and fleet manager in the United States — from coast to coast.', image: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=600&q=80' },
  { icon: Heart, title: 'Our Values', desc: 'Built on hard work, transparency, and relentless innovation. We believe in American grit applied to modern logistics technology.', image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=600&q=80' },
  { icon: ShieldCheck, title: 'Our Promise', desc: 'Enterprise-grade reliability with small-business dedication. Every customer is a partner, every mile matters, every shipment counts.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80' },
]

const team = [
  {
    name: 'Marcus Caldwell',
    role: 'CEO & Co-Founder',
    bio: '20 years in freight operations. Former VP at a top-50 US carrier. Marcus has dispatched over 500,000 loads in his career and understands every pain point in American trucking.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Sarah Nguyen',
    role: 'CTO & Co-Founder',
    bio: 'Previously led engineering at a leading logistics SaaS platform. Sarah built systems that process $2B+ in freight annually and brings deep expertise in distributed systems.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'James Rivera',
    role: 'Head of Operations',
    bio: 'Former fleet manager with 15 years managing 200+ trucks. James ensures FreightFlow runs with the same precision as a well-oiled fleet operation.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Diana Washington',
    role: 'VP of Product',
    bio: '10 years building enterprise logistics products. Diana translates complex freight workflows into intuitive software experiences that drivers and dispatchers love.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Robert Chen',
    role: 'Head of Engineering',
    bio: 'Former principal engineer at a Fortune 500 tech company. Robert leads our engineering team in building scalable, reliable systems that never sleep.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Lisa Martinez',
    role: 'Head of Customer Success',
    bio: '12 years in freight customer operations. Lisa has helped over 300 trucking companies transform their operations with modern technology.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
    linkedin: '#',
    twitter: '#',
  },
]

const stats = [
  { label: 'Founded', value: '2024', icon: Calendar },
  { label: 'Employees', value: '50+', icon: Users },
  { label: 'Customers', value: '500+', icon: Building2 },
  { label: 'States Covered', value: '48', icon: MapPin },
  { label: 'Loads Managed', value: '1.2M+', icon: Truck },
  { label: 'Fleet Vehicles', value: '2,847+', icon: TrendingUp },
  { label: 'Revenue Processed', value: '$4.2B', icon: Award },
  { label: 'Uptime SLA', value: '99.9%', icon: Globe },
]

const timeline = [
  { year: '2024', title: 'Founded in Dallas, TX', desc: 'FreightFlow was born in a truck yard. Our founders saw the need for modern freight technology.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80' },
  { year: '2024', title: 'Beta Launch', desc: 'Launched beta with 25 trucking companies across Texas. Processed first 10,000 loads.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80' },
  { year: '2025', title: 'National Expansion', desc: 'Expanded to 30 states. Onboarded 200+ carriers. Launched fleet management and dispatch modules.', image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=600&q=80' },
  { year: '2025', title: 'Series A Funding', desc: 'Raised $12M to accelerate product development and expand our customer success team.', image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=600&q=80' },
  { year: '2026', title: 'Coast-to-Coast', desc: 'Now serving 500+ companies across 48 states. Processing $4.2B in annual freight volume.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80' },
]

const offices = [
  { city: 'Dallas, TX', type: 'Headquarters', address: '1200 Freight Way, Suite 800', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80' },
  { city: 'Atlanta, GA', type: 'Operations Hub', address: '3400 Trucking Blvd, Floor 5', image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=600&q=80' },
  { city: 'Chicago, IL', type: 'Engineering Office', address: '500 Logistics Drive, Suite 200', image: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=600&q=80' },
]

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero with truck background */}
      <section className="relative overflow-hidden bg-secondary py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80"
            alt="American freight truck on highway"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
                <Truck className="h-3.5 w-3.5" />
                Since 2024
              </div>
              <h1 className="mt-6 text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
                Built by <span className="text-primary">Trucking</span> Veterans
              </h1>
              <p className="mt-6 max-w-lg text-lg text-zinc-300">
                Built by trucking veterans. Powered by modern technology. Dedicated to the American freight industry.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/register" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-primary/90">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-primary/50 hover:text-primary">
                  Contact Sales
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-xl border border-zinc-700/50">
                    <Image src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=400&q=80" alt="Truck fleet" width={400} height={250} className="h-36 w-full object-cover" />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-zinc-700/50">
                    <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80" alt="Freight warehouse" width={400} height={250} className="h-36 w-full object-cover" />
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="overflow-hidden rounded-xl border border-zinc-700/50">
                    <Image src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&q=80" alt="Freight terminal" width={400} height={250} className="h-36 w-full object-cover" />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-zinc-700/50">
                    <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80" alt="Semi truck" width={400} height={250} className="h-36 w-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Highway lines decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className="highway-lines h-full animate-highway-lines" />
        </div>
      </section>

      {/* Mission/Vision/Values with images */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group overflow-hidden rounded-xl border border-zinc-800 bg-secondary transition-all hover:border-primary/30"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 backdrop-blur-sm group-hover:animate-wheel-spin">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story with side image */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Our Story</h2>
              <div className="mt-2 h-1 w-20 bg-primary" />
              <div className="mt-8 space-y-5">
                <p className="text-[15px] leading-relaxed text-zinc-300">
                  FreightFlow was born in 2024 inside a truck yard in Dallas, Texas. Our founders spent two decades
                  in the American freight industry — dispatching loads, managing fleets, and fighting with outdated
                  software that couldn&apos;t keep up with the pace of modern trucking.
                </p>
                <p className="text-[15px] leading-relaxed text-zinc-300">
                  They knew there had to be a better way. The logistics industry moves trillions of dollars annually,
                  yet most trucking companies still rely on spreadsheets, phone calls, and fragmented systems to
                  manage their operations.
                </p>
                <p className="text-[15px] leading-relaxed text-zinc-300">
                  So they built it. FreightFlow is the freight operations platform designed from the ground up for
                  American carriers, brokers, and fleet managers. From coast to coast — covering 48 states and growing —
                  we help hundreds of trucking companies move freight smarter, faster, and more profitably.
                </p>
                <p className="text-[15px] leading-relaxed text-zinc-300">
                  Today, FreightFlow manages over 1.2 million loads annually, processes $4.2 billion in freight volume,
                  and serves 500+ transportation companies. We&apos;re just getting started.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                  alt="Freight warehouse terminal"
                  width={800}
                  height={500}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-black/60 p-3 text-center backdrop-blur-sm">
                      <div className="text-xl font-bold text-primary">500+</div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400">Companies</div>
                    </div>
                    <div className="rounded-lg bg-black/60 p-3 text-center backdrop-blur-sm">
                      <div className="text-xl font-bold text-primary">48</div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400">States</div>
                    </div>
                    <div className="rounded-lg bg-black/60 p-3 text-center backdrop-blur-sm">
                      <div className="text-xl font-bold text-primary">$4.2B</div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400">Freight</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Timeline with images */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Our Journey</h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              From a truck yard in Dallas to serving 48 states nationwide
            </p>
          </motion.div>
          <div className="relative mt-16">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800 md:left-1/2" />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`relative mb-16 flex items-start gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background md:left-1/2 animate-dispatch-pop" />
                <div className={`ml-12 flex-1 md:ml-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="overflow-hidden rounded-xl border border-zinc-800 bg-secondary">
                    <div className="relative h-40 overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-secondary">{item.year}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with real photos */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">The Team Behind the Freight</h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Industry veterans and technology experts building the future of American trucking
            </p>
          </motion.div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:ring-2 hover:ring-primary/30"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-sm font-semibold text-primary">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-zinc-400">{member.bio}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <a href={member.linkedin} className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-primary/10 hover:text-primary">
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a href={member.twitter} className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-primary/10 hover:text-primary">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden bg-background py-20">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1545156521-77bd85671d30?w=1920&q=80" alt="Freight operations" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">FreightFlow by the Numbers</h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Real results from real freight operations across America
            </p>
          </motion.div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl border border-zinc-700/50 bg-black/40 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/30"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <stat.icon className="h-5 w-5 text-primary group-hover:animate-signal-flash" />
                </div>
                <div className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices with images */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">Our Offices</h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Strategically located to serve the American freight corridor
            </p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group overflow-hidden rounded-xl border border-zinc-800 bg-card transition-all hover:border-primary/30"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image src={office.image} alt={office.city} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <h3 className="text-lg font-bold text-white">{office.city}</h3>
                    </div>
                    <span className="mt-1 inline-block rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                      {office.type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" />
                    <p className="text-sm text-zinc-400">{office.address}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with truck image */}
      <section className="relative overflow-hidden bg-secondary py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
            alt="Semi truck at sunset"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        {/* Highway lines */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <div className="highway-lines h-full animate-highway-lines" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="animate-float inline-block mb-6">
              <Truck className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              Join the FreightFlow Family
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
              Whether you&apos;re a 5-truck operation or a 500-vehicle fleet, we&apos;re ready to help you move freight smarter.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="/register" className="rounded-lg bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
                Start Free Trial
              </a>
              <a href="/contact" className="rounded-lg border border-zinc-600 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-primary/50 hover:text-primary">
                Contact Sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
