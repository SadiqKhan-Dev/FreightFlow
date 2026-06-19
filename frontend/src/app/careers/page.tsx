'use client'

import { PublicLayout } from '@/components/layout/public-layout'
import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, Briefcase, ArrowRight } from 'lucide-react'

const jobs = [
  {
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote (USA)',
    type: 'Full-time',
    salary: '$120K – $160K',
    desc: 'Build and scale our freight operations platform using React, Node.js, and PostgreSQL.',
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'Dallas, TX',
    type: 'Full-time',
    salary: '$100K – $140K',
    desc: 'Define product strategy and work with engineering to deliver features trucking companies love.',
  },
  {
    title: 'Logistics Operations Specialist',
    department: 'Operations',
    location: 'Dallas, TX',
    type: 'Full-time',
    salary: '$60K – $80K',
    desc: 'Leverage your freight industry knowledge to help customers optimize their operations with FreightFlow.',
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote (USA)',
    type: 'Full-time',
    salary: '$90K – $120K',
    desc: 'Design intuitive interfaces for complex freight workflows. Figma expertise required.',
  },
  {
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote (USA)',
    type: 'Full-time',
    salary: '$110K – $150K',
    desc: 'Manage AWS infrastructure, CI/CD pipelines, and ensure 99.99% uptime for our platform.',
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

export default function CareersPage() {
  return (
    <PublicLayout>
      <section className="relative bg-secondary py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              Join the <span className="text-primary">FreightFlow</span> USA Team
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              We&apos;re building the operating system for American freight. Come do the best work of your career.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-xl border border-zinc-800 bg-secondary p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white transition-colors group-hover:text-primary">
                        {job.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">{job.desc}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-primary/60" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary/60" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary/60" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5 text-primary/60" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <button className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-secondary">
                    Apply
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
