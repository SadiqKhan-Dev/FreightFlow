'use client'

import { useState } from 'react'
import { PublicLayout } from '@/components/layout/public-layout'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Truck, ArrowRight, MessageSquare, Headphones, Building2 } from 'lucide-react'
import Image from 'next/image'

const offices = [
  {
    city: 'Dallas, TX',
    address: '123 Logistics Ave, Dallas, TX 75201',
    phone: '+1 (800) 555-0199',
    hours: 'Mon – Fri, 8:00 AM – 6:00 PM CST',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80',
    isPrimary: true,
  },
  {
    city: 'Atlanta, GA',
    address: '456 Freight Blvd, Atlanta, GA 30301',
    phone: '+1 (800) 555-0200',
    hours: 'Mon – Fri, 8:00 AM – 6:00 PM EST',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=600&q=80',
    isPrimary: false,
  },
  {
    city: 'Phoenix, AZ',
    address: '789 Carrier St, Phoenix, AZ 85001',
    phone: '+1 (800) 555-0201',
    hours: 'Mon – Fri, 8:00 AM – 6:00 PM MST',
    image: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=600&q=80',
    isPrimary: false,
  },
]

const supportChannels = [
  {
    icon: Headphones,
    title: '24/7 Dispatch Support',
    description: 'Round-the-clock support for urgent freight issues, breakdowns, and emergency shipments.',
    phone: '+1 (800) 555-0199',
    available: 'Always Available',
  },
  {
    icon: MessageSquare,
    title: 'Sales Inquiries',
    description: 'New account setup, pricing questions, enterprise solutions, and partnership opportunities.',
    phone: '+1 (800) 555-0202',
    available: 'Mon – Fri, 8AM – 6PM CST',
  },
  {
    icon: Truck,
    title: 'Carrier Onboarding',
    description: 'Get your fleet set up on FreightFlow. We handle onboarding, training, and migration.',
    phone: '+1 (800) 555-0203',
    available: 'Mon – Fri, 9AM – 5PM CST',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', subject: '', message: '', type: 'general' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', company: '', phone: '', subject: '', message: '', type: 'general' })
  }

  return (
    <PublicLayout>
      {/* Hero with truck image */}
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
                America&apos;s Freight Partner
              </div>
              <h1 className="mt-6 text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
                Let&apos;s Move <span className="text-primary">Freight</span> Together
              </h1>
              <p className="mt-6 max-w-lg text-lg text-zinc-300">
                Whether you&apos;re a carrier, broker, or shipper — our team is ready to help you streamline operations, cut costs, and grow your business.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="tel:+18005550199" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-primary/90">
                  <Phone className="h-4 w-4" />
                  Call (800) 555-0199
                </a>
                <a href="#contact-form" className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-primary/50 hover:text-primary">
                  <MessageSquare className="h-4 w-4" />
                  Send Message
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
        {/* Highway lines */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className="highway-lines h-full animate-highway-lines" />
        </div>
      </section>

      {/* Support Channels */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {supportChannels.map((ch, i) => (
              <motion.div
                key={ch.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl border border-zinc-800 bg-secondary p-6 transition-all hover:border-primary/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <ch.icon className="h-6 w-6 text-primary group-hover:animate-signal-flash" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{ch.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{ch.description}</p>
                <div className="mt-4 border-t border-zinc-800 pt-4">
                  <a href={`tel:${ch.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
                    <Phone className="h-3.5 w-3.5" /> {ch.phone}
                  </a>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                    <Clock className="h-3 w-3" /> {ch.available}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Offices */}
      <section id="contact-form" className="bg-background pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Offices */}
            <div className="space-y-4 lg:col-span-2">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white">Our Offices</h2>
              <p className="text-sm text-zinc-400">Three locations across the country to serve you better.</p>

              {offices.map((office, i) => (
                <motion.div
                  key={office.city}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="overflow-hidden rounded-xl border border-zinc-800 bg-secondary"
                >
                  <div className="relative h-32">
                    <Image src={office.image} alt={office.city} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary animate-dispatch-pop" style={{ animationDelay: `${i * 0.2}s` }} />
                        <h3 className="text-sm font-bold text-white">{office.city}</h3>
                      </div>
                      {office.isPrimary && (
                        <span className="mt-1 inline-block rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                          Headquarters
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" />
                      <p className="text-xs text-zinc-300">{office.address}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                      <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="text-xs text-primary hover:text-primary/80">{office.phone}</a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                      <p className="text-xs text-zinc-500">{office.hours}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-zinc-800 bg-secondary p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white">Send Us a Message</h2>
                <p className="mt-1 text-sm text-zinc-400">We typically respond within 2 business hours.</p>

                {submitted && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    Thank you! Our team will get back to you within 2 business hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">I am a...</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'carrier', label: 'Carrier' },
                        { value: 'broker', label: 'Broker' },
                        { value: 'shipper', label: 'Shipper' },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm({ ...form, type: opt.value })}
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                            form.type === opt.value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Full Name *</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Email *</label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Company</label>
                      <input
                        type="text"
                        placeholder="Acme Trucking Co."
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Phone</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Subject *</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Message *</label>
                    <textarea
                      placeholder="Tell us about your freight operations, fleet size, and how we can help..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-primary/90 animate-glow-pulse sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Truck image banner */}
      <section className="relative overflow-hidden bg-secondary py-16">
        {/* Highway lines at top */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <div className="highway-lines h-full animate-highway-lines" />
        </div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1545156521-77bd85671d30?w=1920&q=80"
            alt="Freight operations"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <Truck className="mx-auto h-10 w-10 text-primary animate-float" />
          <h2 className="mt-4 text-2xl font-bold uppercase tracking-tight text-white">
            Ready to Transform Your Freight Operations?
          </h2>
          <p className="mt-3 text-zinc-400">
            Join 2,800+ carriers and brokers already using FreightFlow to move America&apos;s freight.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href="/register" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-primary/90">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/pricing" className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-primary/50 hover:text-primary">
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
