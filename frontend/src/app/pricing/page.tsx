'use client'

import { PublicLayout } from '@/components/layout/public-layout'
import { motion } from 'framer-motion'
import { CheckCircle, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    desc: 'For small trucking companies getting started with digital operations.',
    features: [
      'Up to 5 Drivers',
      'Up to 10 Vehicles',
      '100 Shipments / month',
      'Basic Dashboard',
      'Email Support',
      'Standard Reports',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$149',
    period: '/month',
    desc: 'For growing freight companies that need advanced tools and unlimited scale.',
    features: [
      'Up to 50 Drivers',
      'Up to 100 Vehicles',
      'Unlimited Shipments',
      'Advanced Dashboard',
      'Priority Support',
      'Advanced Reports & Analytics',
      'Route Optimization',
      'Real-Time GPS Tracking',
      'Multi-User Access',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large carriers, 3PLs, and enterprises with complex operations.',
    features: [
      'Unlimited Drivers',
      'Unlimited Vehicles',
      'Unlimited Shipments',
      'Custom Dashboard & Branding',
      'Dedicated Account Manager',
      'Custom Reports & BI',
      'Full API Access',
      'White Label Available',
      'Custom Integrations',
      'SLA Guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function PricingPage() {
  return (
    <PublicLayout>
      <section className="relative bg-secondary py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Choose the plan that fits your fleet. All plans include a 14-day free trial. No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                  plan.popular
                    ? 'border-primary bg-secondary shadow-xl shadow-primary/10 scale-[1.03]'
                    : 'border-zinc-800 bg-secondary'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-secondary">
                      <Zap className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{plan.desc}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-zinc-500">{plan.period}</span>}
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.popular ? '/register' : plan.price === 'Custom' ? '/contact' : '/register'}
                  className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-bold uppercase tracking-wider transition-colors ${
                    plan.popular
                      ? 'bg-primary text-secondary hover:bg-primary/90'
                      : 'border border-zinc-700 text-white hover:bg-zinc-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
