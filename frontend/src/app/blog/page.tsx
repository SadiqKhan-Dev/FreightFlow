'use client'

import { PublicLayout } from '@/components/layout/public-layout'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, BookOpen, Clock, User, Tag, Truck, TrendingUp, Shield, Route, Package, Wrench } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const posts = [
  {
    slug: 'future-of-freight-technology-2026',
    title: 'The Future of Freight Technology in 2026',
    excerpt: 'Explore the emerging trends reshaping American logistics — from AI-powered dispatching to autonomous vehicles, electric fleets, and the digital freight marketplace transforming how carriers operate.',
    date: '2026-01-15',
    category: 'Industry Trends',
    readTime: '8 min read',
    author: 'Marcus Rivera',
    authorRole: 'VP of Operations',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    icon: TrendingUp,
  },
  {
    slug: 'optimizing-fleet-management-tips',
    title: '10 Tips for Optimizing Your Fleet Management',
    excerpt: 'Learn how top-performing trucking companies reduce costs, improve efficiency, and maximize asset utilization with modern fleet tools and data-driven strategies.',
    date: '2026-01-10',
    category: 'Best Practices',
    readTime: '6 min read',
    author: 'Sarah Mitchell',
    authorRole: 'Fleet Manager',
    image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=800&q=80',
    icon: Wrench,
  },
  {
    slug: 'real-time-tracking-logistics',
    title: 'Why Real-Time Tracking is Essential for Modern Logistics',
    excerpt: 'Discover how GPS tracking improves customer satisfaction, reduces cargo losses, and streamlines day-to-day dispatch operations across your entire fleet.',
    date: '2026-01-05',
    category: 'Technology',
    readTime: '5 min read',
    author: 'James Cooper',
    authorRole: 'CTO',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    icon: Route,
  },
  {
    slug: 'elogs-compliance-dot-regulations',
    title: 'ELD Mandate & DOT Compliance: What Every Carrier Must Know in 2026',
    excerpt: 'Stay ahead of evolving ELD regulations, hours-of-service rules, and DOT audit requirements. A complete guide to keeping your fleet compliant and avoiding costly fines.',
    date: '2025-12-28',
    category: 'Compliance',
    readTime: '10 min read',
    author: 'Linda Chen',
    authorRole: 'Compliance Director',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=800&q=80',
    icon: Shield,
  },
  {
    slug: 'freight-broker-vs-carrier',
    title: 'Freight Broker vs. Carrier: Understanding the Difference',
    excerpt: 'Confused about the difference between freight brokers and carriers? We break down roles, responsibilities, licensing requirements, and how FreightFlow supports both.',
    date: '2025-12-20',
    category: 'Industry Basics',
    readTime: '7 min read',
    author: 'Marcus Rivera',
    authorRole: 'VP of Operations',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
    icon: Package,
  },
  {
    slug: 'reduce-fuel-costs-trucking',
    title: 'How to Cut Fuel Costs by 25% Without Sacrificing Delivery Speed',
    excerpt: 'Fuel is your biggest expense. These proven strategies — from route optimization to driver coaching and aerodynamic upgrades — can slash your fuel bill while keeping schedules on track.',
    date: '2025-12-15',
    category: 'Cost Reduction',
    readTime: '9 min read',
    author: 'Sarah Mitchell',
    authorRole: 'Fleet Manager',
    image: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&q=80',
    icon: Truck,
  },
]

const featuredPost = posts[0]
const remainingPosts = posts.slice(1)

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function BlogPage() {
  return (
    <PublicLayout>
      {/* Hero with truck image */}
      <section className="relative overflow-hidden bg-secondary py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
            alt="Freight warehouse terminal"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20 backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="text-primary">FreightFlow</span> Insights
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300">
              Expert insights on freight operations, fleet management, compliance, and the future of American trucking.
            </p>
            <div className="mt-8 flex items-center gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-primary" />
                {posts.length} Articles
              </span>
              <span className="h-1 w-1 rounded-full bg-zinc-600" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                Updated Weekly
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid gap-6 overflow-hidden rounded-2xl border border-zinc-800 bg-secondary transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 lg:grid-cols-2"
            >
              <div className="relative h-64 overflow-hidden lg:h-full">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary">
                    <featuredPost.icon className="h-3 w-3" />
                    Featured
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <span className="inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {featuredPost.category}
                </span>
                <h2 className="mt-4 text-2xl font-bold uppercase tracking-tight text-white transition-colors group-hover:text-primary sm:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{featuredPost.author}</p>
                      <p className="text-[10px] text-zinc-500">{featuredPost.authorRole}</p>
                    </div>
                  </div>
                  <span className="h-1 w-1 rounded-full bg-zinc-600" />
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <span className="h-1 w-1 rounded-full bg-zinc-600" />
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:gap-2.5">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="bg-background pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Latest Articles</h2>
            <div className="flex items-center gap-2">
              {['All', 'Industry Trends', 'Best Practices', 'Technology', 'Compliance'].map((cat) => (
                <button
                  key={cat}
                  className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-400 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-secondary transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
                        <Tag className="h-2.5 w-2.5" />
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-bold text-white transition-colors group-hover:text-primary line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-zinc-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-3 w-3 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-white">{post.author}</p>
                          <p className="text-[9px] text-zinc-500">{post.readTime}</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors group-hover:gap-2">
                        Read
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative overflow-hidden bg-secondary py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80"
            alt="Semi truck on highway"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Truck className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-white">
              Stay Ahead of the Freight Curve
            </h2>
            <p className="mt-3 text-zinc-400">
              Get weekly insights on fleet management, compliance updates, and industry trends delivered to your inbox.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder:text-zinc-500 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-80"
              />
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-primary/90">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}
