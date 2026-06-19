'use client'

import { PublicLayout } from '@/components/layout/public-layout'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft, BookOpen, Tag, Clock, User, Share2, Truck, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'

const posts: Record<string, {
  title: string
  date: string
  category: string
  readTime: string
  author: string
  authorRole: string
  authorImage: string
  heroImage: string
  content: string
  relatedSlugs: string[]
}> = {
  'future-of-freight-technology-2026': {
    title: 'The Future of Freight Technology in 2026',
    date: '2026-01-15',
    category: 'Industry Trends',
    readTime: '8 min read',
    author: 'Marcus Rivera',
    authorRole: 'VP of Operations',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    relatedSlugs: ['optimizing-fleet-management-tips', 'real-time-tracking-logistics'],
    content: `The logistics industry is undergoing a rapid transformation driven by technology. In 2026, we're seeing several key trends reshape how freight moves across the country.\n\n## AI-Powered Dispatching\nArtificial intelligence is revolutionizing dispatch operations. Smart algorithms can now match loads with available drivers in seconds, factoring in location, capacity, experience, and fuel efficiency — cutting empty miles and boosting profitability. FleetFlow's AI dispatch engine has helped carriers reduce empty miles by 34% on average, translating to millions in annual fuel savings across the industry.\n\n## Autonomous Vehicles\nWhile fully autonomous trucks are still in testing, Level 4 autonomous vehicles are beginning to operate on specific highway corridors. Companies like Aurora, Waymo Via, and Kodiak Robotics are running commercial freight routes between Dallas and Houston, and Los Angeles to Phoenix. This technology reduces driver fatigue and enables near-24/7 operations on long-haul routes.\n\n## Real-Time Visibility\nShippers and consignees now expect real-time tracking for all shipments. Advanced GPS and IoT sensors provide minute-by-minute updates on location, temperature, and handling conditions — setting a new standard for freight transparency. FreightFlow's tracking platform processes over 2 million location updates daily across our network.\n\n## Sustainability & Green Fleets\nElectric and hydrogen-powered trucks are becoming more viable each year. Carriers are investing in green fleets to meet EPA emissions regulations and customer demand for sustainable logistics solutions. Tesla Semi, Volvo VNR Electric, and Freightliner eCascadia are now in active production, with ranges exceeding 300 miles per charge.\n\n## The Digital Freight Marketplace\nDigital platforms are connecting shippers directly with carriers, eliminating middlemen and reducing costs. FreightFlow is at the forefront of this transformation, giving American carriers the tools they need to compete and win. Our marketplace has facilitated over $4.2 billion in freight transactions since launch.\n\n## What This Means for Your Fleet\nThe carriers that embrace these technologies now will have a significant competitive advantage in the coming years. Start with the fundamentals — real-time tracking, automated dispatch, and fleet analytics — then build from there. FreightFlow provides all of these capabilities in one integrated platform.`,
  },
  'optimizing-fleet-management-tips': {
    title: '10 Tips for Optimizing Your Fleet Management',
    date: '2026-01-10',
    category: 'Best Practices',
    readTime: '6 min read',
    author: 'Sarah Mitchell',
    authorRole: 'Fleet Manager',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=1200&q=80',
    relatedSlugs: ['future-of-freight-technology-2026', 'reduce-fuel-costs-trucking'],
    content: `Effective fleet management is the backbone of profitability in the trucking industry. Here are 10 proven tips to optimize your operations and cut costs.\n\n## 1. Implement Preventive Maintenance\nRegular maintenance reduces costly breakdowns and extends vehicle life. Use FleetFlow's maintenance scheduling to stay ahead of service intervals. A well-maintained truck lasts 1.5 million miles versus 750,000 for a neglected one — that's double the revenue potential from a single asset.\n\n## 2. Leverage Telematics Data\nGPS tracking and telematics provide valuable insights into driver behavior, fuel consumption, and route efficiency. Use this data to make informed decisions. FleetFlow's telematics integration pulls data from Samsara, Geotab, and platform:1 to give you a unified view of your entire fleet.\n\n## 3. Optimize Routes\nUse route planning software to minimize deadhead miles and fuel consumption while meeting delivery windows. Every mile saved adds to your bottom line. Our route optimization engine has saved carriers an average of 12% on fuel costs annually.\n\n## 4. Monitor Fuel Efficiency\nTrack fuel consumption per vehicle and identify trends. Address aggressive driving habits and idle time that waste fuel across your fleet. The difference between your best and worst fuel performers could be 20% or more — FleetFlow helps you close that gap.\n\n## 5. Right-Size Your Fleet\nAnalyze utilization data to ensure you have the right number and type of vehicles for your freight volumes. Avoid over- or under-investing in equipment. Our fleet analytics dashboard shows utilization rates by truck type, helping you make data-driven decisions.\n\n## 6. Invest in Driver Training\nWell-trained drivers are safer, more fuel-efficient, and have significantly lower turnover rates. Continuous training pays for itself many times over. The average cost of driver turnover is $8,000–$12,000 per driver — investing in retention through training is one of the highest-ROI decisions you can make.\n\n## 7. Automate Administrative Tasks\nUse fleet management software to automate invoicing, IFTA reporting, compliance tracking, and other time-consuming paperwork. FleetFlow's automation features save dispatchers an average of 15 hours per week on administrative tasks.\n\n## 8. Track Key Performance Indicators\nMonitor metrics like on-time delivery rate, cost per mile, revenue per truck, and driver retention. What gets measured gets improved. FleetFlow's reporting dashboard tracks 40+ KPIs in real-time across your entire operation.\n\n## 9. Plan for Scalability\nChoose systems and processes that can grow with your business. FreightFlow's multi-tenant platform scales seamlessly as you add trucks and drivers — from a single owner-operator to a 500-truck fleet.\n\n## 10. Stay DOT Compliant\nKeep up with DOT regulations, hours of service rules, and safety requirements. Non-compliance fines can cripple a trucking operation. FleetFlow's compliance module automatically tracks ELD data, inspection reports, and qualification files to keep you audit-ready.`,
  },
  'real-time-tracking-logistics': {
    title: 'Why Real-Time Tracking is Essential for Modern Logistics',
    date: '2026-01-05',
    category: 'Technology',
    readTime: '5 min read',
    author: 'James Cooper',
    authorRole: 'CTO',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
    relatedSlugs: ['future-of-freight-technology-2026', 'elogs-compliance-dot-regulations'],
    content: `In today's fast-paced logistics environment, real-time tracking is no longer a luxury — it's a necessity for any competitive trucking operation.\n\n## Customer Expectations\nModern shippers expect end-to-end visibility into their shipments. Amazon and other e-commerce giants have set the standard. If you can't provide real-time tracking, you're losing bids. 92% of shippers say tracking capability is a key factor in carrier selection.\n\n## Operational Efficiency\nReal-time data allows dispatchers to make informed decisions, reroute vehicles around traffic and weather, and respond quickly to delays before they become customer complaints. FleetFlow's dispatch dashboard provides live ETAs updated every 30 seconds, giving you and your customers accurate delivery windows.\n\n## Asset Protection\nGPS tracking helps prevent theft and unauthorized use of vehicles and cargo. Geofencing alerts notify you immediately when trucks leave designated areas or deviate from planned routes. The American Trucking Association estimates cargo theft costs the industry $15–35 billion annually — real-time tracking is your first line of defense.\n\n## Proof of Delivery\nDigital proof of delivery with GPS coordinates and timestamps reduces disputes and accelerates invoice processing. Get paid faster with accurate, verified delivery records. FleetFlow's POD system reduces invoice disputes by 89% and cuts average payment time from 45 days to 12 days.\n\n## Data-Driven Decisions\nHistorical tracking data reveals patterns in delivery times, route efficiency, and driver performance that inform strategic decisions about pricing, staffing, and equipment investments. Our analytics engine processes millions of data points to surface actionable insights for your operation.\n\n## Competitive Advantage\nCompanies that offer real-time tracking win more freight bids and retain customers longer. It's the minimum table stakes for modern logistics — and FreightFlow makes it effortless. Our white-label tracking portal lets your customers track shipments directly on your branded website.`,
  },
  'elogs-compliance-dot-regulations': {
    title: 'ELD Mandate & DOT Compliance: What Every Carrier Must Know in 2026',
    date: '2025-12-28',
    category: 'Compliance',
    readTime: '10 min read',
    author: 'Linda Chen',
    authorRole: 'Compliance Director',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=1200&q=80',
    relatedSlugs: ['optimizing-fleet-management-tips', 'freight-broker-vs-carrier'],
    content: `Staying compliant with DOT regulations is critical for any trucking operation. The ELD mandate and hours-of-service rules are complex, but non-compliance can result in fines ranging from $1,000 to $16,000 per violation.\n\n## Understanding the ELD Mandate\nThe Electronic Logging Device (ELD) rule requires most commercial motor vehicle drivers to use ELDs to record hours of service (HOS). As of 2026, the FMCSA has updated several provisions including automated油站 logging and enhanced roadside inspection protocols.\n\n## Hours of Service Rules\nHours of service regulations limit when and how long commercial drivers can operate:\n- 11-hour driving limit after 10 consecutive hours off duty\n- 14-hour window after coming on duty\n- 30-minute break requirement after 8 cumulative hours of driving\n- 60/70-hour limit in 7/8 consecutive days\n\n## Common Violations and How to Avoid Them\nThe top DOT violations include:\n1. **ELD malfunctions** — Keep backup logs and report malfunctions within 8 days\n2. **Falsifying HOS records** — FleetFlow's ELD integration prevents manual manipulation\n3. **Inadequate vehicle maintenance** — Use FleetFlow's preventive maintenance module\n4. **Missing medical certificates** — Track driver qualifications digitally\n5. **Weight violations** — Integrate with scale houses for real-time weight data\n\n## Preparing for a DOT Audit\nFleetFlow maintains a complete digital compliance file for every driver and vehicle in your fleet. When an auditor arrives, you can generate a compliance report in seconds — showing ELD records, maintenance history, driver qualifications, and insurance documentation.\n\n## How FleetFlow Keeps You Compliant\nOur platform automatically:\n- Records and stores ELD data from your existing devices\n- Alerts you to HOS violations before they occur\n- Tracks driver qualification file expiration dates\n- Manages vehicle inspection reports (DVIRs)\n- Generates IFTA fuel tax reports\n- Maintains audit-ready records for 3+ years`,
  },
  'freight-broker-vs-carrier': {
    title: 'Freight Broker vs. Carrier: Understanding the Difference',
    date: '2025-12-20',
    category: 'Industry Basics',
    readTime: '7 min read',
    author: 'Marcus Rivera',
    authorRole: 'VP of Operations',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80',
    relatedSlugs: ['future-of-freight-technology-2026', 'real-time-tracking-logistics'],
    content: `Confused about the difference between freight brokers and carriers? Here's a comprehensive breakdown.\n\n## What is a Carrier?\nA carrier is a company that physically transports freight using its own trucks and drivers. Carriers are registered with the FMCSA and have a USDOT number and MC number. They own or lease their equipment and employ or contract with drivers.\n\n## What is a Freight Broker?\nA freight broker acts as an intermediary between shippers and carriers. Brokers don't own trucks — they leverage relationships with multiple carriers to find the best match for each shipment. They need a broker license (BMC-84 bond of $75,000) and USDOT number.\n\n## Key Differences\n\n### Revenue Model\n- **Carriers**: Earn revenue per mile or per load (typically $2.50–$3.50/mile for dry van)\n- **Brokers**: Earn commission on each load (typically 15–35% margin)\n\n### Regulatory Requirements\n- **Carriers**: DOT authority, MC number, insurance ($750K–$1M), ELD compliance, drug testing\n- **Brokers**: Broker license, BMC-84 bond, trust account, broker process agent\n\n### Risk Profile\n- **Carriers**: Higher capital investment, equipment maintenance, driver management, fuel costs\n- **Brokers**: Lower overhead, but credit risk and carrier vetting responsibilities\n\n## How FreightFlow Supports Both\nFreightFlow is designed for both carriers and brokers. Our platform handles:\n- Load booking and management\n- Real-time tracking and visibility\n- Invoicing and payment processing\n- Compliance documentation\n- Fleet and driver management\n- Customer relationship management\n\nWhether you're a carrier running 5 trucks or a broker managing 500 lanes, FreightFlow scales to fit your operation.`,
  },
  'reduce-fuel-costs-trucking': {
    title: 'How to Cut Fuel Costs by 25% Without Sacrificing Delivery Speed',
    date: '2025-12-15',
    category: 'Cost Reduction',
    readTime: '9 min read',
    author: 'Sarah Mitchell',
    authorRole: 'Fleet Manager',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=1200&q=80',
    relatedSlugs: ['optimizing-fleet-management-tips', 'real-time-tracking-logistics'],
    content: `Fuel is the single largest operating expense for most trucking companies, typically representing 25-40% of total costs. Here's how to dramatically reduce your fuel bill without slowing down deliveries.\n\n## 1. Route Optimization\nThe shortest route isn't always the most fuel-efficient. FleetFlow's route engine considers elevation changes, traffic patterns, speed limits, and weather to find the route that saves the most fuel while meeting delivery windows. Carriers using our optimized routes save an average of 12% on fuel.\n\n## 2. Speed Management\nEvery 1 mph increase in speed above 55 reduces fuel economy by approximately 0.1 mpg. For a fleet of 100 trucks averaging 100,000 miles per year, reducing average speed from 65 to 62 mph saves over $180,000 annually in fuel costs.\n\n## 3. Idle Reduction\nAn idling truck burns about 0.8 gallons per hour. With drivers idling an average of 6 hours per day, that's $4.50/hour or $1,600+ per truck per year in wasted fuel. Auxiliary power units (APUs) and anti-idling policies can cut this by 80%.\n\n## 4. Tire Pressure Management\nUnder-inflated tires increase fuel consumption by 0.2% for every 1 psi drop below optimal. Regular tire pressure monitoring and automatic inflation systems pay for themselves within months.\n\n## 5. Aerodynamic Upgrades\nTrailer side skirts, boat tails, and gap reducers can improve fuel economy by 5-12%. The ROI on aerodynamic packages is typically 12-18 months for long-haul operations.\n\n## 6. Driver Coaching\nAggressive driving — rapid acceleration, hard braking, and excessive speed — wastes 15-30% more fuel than smooth driving. FleetFlow's driver scorecard identifies fuel-wasting behaviors and provides targeted coaching opportunities.\n\n## 7. Fuel Card Integration\nTrack every gallon purchased and identify price variations across fuel stops. FleetFlow integrates with all major fuel cards (Comdata, EFS, WEX) to provide real-time fuel purchase data and alert you to unusual transactions.\n\n## 8. Load Optimization\nMaximize load density to reduce the number of trips needed. FleetFlow's load planner helps you build optimal loads that maximize cube utilization while staying within weight limits.\n\n## Putting It All Together\nA 100-truck fleet implementing these strategies through FleetFlow's integrated platform can save $500,000–$1.2 million annually in fuel costs — without adding a single truck or driver.`,
  },
}

const allPostSlugs = Object.keys(posts)

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = posts[slug]

  if (!post) {
    return (
      <PublicLayout>
        <section className="relative overflow-hidden bg-secondary py-24">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" alt="Freight warehouse" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/80" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 text-center">
            <h1 className="text-2xl font-bold text-white">Post Not Found</h1>
            <p className="mt-2 text-zinc-400">The blog post you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </div>
        </section>
      </PublicLayout>
    )
  }

  const relatedPosts = (post.relatedSlugs || []).map((s) => ({ slug: s, ...posts[s] })).filter(Boolean)

  return (
    <PublicLayout>
      {/* Hero with image */}
      <section className="relative overflow-hidden bg-secondary py-20">
        <div className="absolute inset-0">
          <Image src={post.heroImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
                <Tag className="h-3 w-3" /> {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-400">
                <Clock className="h-3 w-3" /> {post.readTime}
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/30">
                  <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{post.author}</p>
                  <p className="text-xs text-zinc-400">{post.authorRole}</p>
                </div>
              </div>
              <span className="h-8 w-px bg-zinc-700" />
              <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="space-y-6">
              {post.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={i} className="mt-10 text-xl font-bold uppercase tracking-tight text-white">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                return (
                  <p key={i} className="text-[15px] leading-relaxed text-zinc-300">
                    {paragraph}
                  </p>
                )
              })}
            </div>

            {/* Share & Author */}
            <div className="mt-12 flex items-center justify-between rounded-xl border border-zinc-800 bg-secondary p-5">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/30">
                  <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{post.author}</p>
                  <p className="text-xs text-zinc-400">{post.authorRole} at FreightFlow USA</p>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-400 transition-colors hover:border-primary/40 hover:text-primary">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>

            {/* CTA */}
            <div className="mt-10 rounded-xl border border-zinc-800 bg-secondary p-6 text-center">
              <Truck className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 text-sm text-zinc-400">Want to see how FreightFlow can transform your operations?</p>
              <Link href="/register" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-primary/90">
                Get Started Free
              </Link>
            </div>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-14">
              <h3 className="text-lg font-bold uppercase tracking-tight text-white">Related Articles</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group flex overflow-hidden rounded-xl border border-zinc-800 bg-secondary transition-all hover:border-primary/40"
                  >
                    <div className="relative h-32 w-32 shrink-0">
                      <Image src={rp.heroImage} alt={rp.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{rp.category}</span>
                      <h4 className="mt-1 text-sm font-bold text-white line-clamp-2 transition-colors group-hover:text-primary">
                        {rp.title}
                      </h4>
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-zinc-500">
                        <Clock className="h-2.5 w-2.5" /> {rp.readTime}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PublicLayout>
  )
}
