<div align="center">

# FreightFlow USA

### American Freight & Trucking Operating System

A premium, production-grade freight operations platform built for American trucking companies, freight brokers, and fleet managers.

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## Overview

FreightFlow USA is a comprehensive freight operations dashboard and public-facing platform designed to look and feel like real American trucking software. It features a complete dark industrial theme, freight-yellow branding, real truck photography from Unsplash, animated SVG freight network maps, and a full suite of dashboard pages for managing shipments, fleet, dispatch, drivers, invoices, routes, tracking, warehouses, reports, and company settings.

## Features

### Public Pages
- **Homepage** — Hero with truck imagery, animated stats bar, 6 freight services with real photos, detailed SVG USA freight network map (60+ cities, 70+ routes, animated corridors), fleet showcase, 6-step process timeline, testimonials, CTA
- **About** — Company story, mission/vision/values cards with truck images, timeline with milestone photos, 6 team members with real portraits, stats section, 3 office locations with images
- **Features** — 6 core features, 12 additional features, use cases, integrations
- **Pricing** — 3-tier pricing plans (Starter, Professional, Enterprise)
- **Blog** — 6 detailed freight industry articles with hero images, author cards, related posts
- **Blog Detail** — Full article pages with hero images, author avatars, share button, related articles
- **Contact** — Hero truck image, 3 support channels, 3 office cards with photos, contact form with carrier/broker/shipper selector
- **Careers** — Job listings
- **Login / Register / Forgot Password** — Dark industrial auth pages

### Dashboard Pages (15)
| Page | Description |
|------|-------------|
| Overview | Operations Command Center with status strip, metrics, live activity feed, shipments table, fleet status, revenue chart |
| Shipments | Shipment control center with filtering, status management |
| Fleet | Fleet command with vehicle management, fuel tracking |
| Dispatch | Kanban board for load management |
| Drivers | Driver roster with qualification tracking |
| Customers | Customer relationship management |
| Invoices | Invoice management and payment tracking |
| Routes | Route planning and optimization |
| Tracking | Real-time GPS vehicle tracking |
| Warehouses | Warehouse and distribution center management |
| Reports | Analytics dashboard with report generation |
| Notifications | Notification center with read/unread management |
| Company | Company profile and settings |
| Settings | Application settings and preferences |

### Design System
- **20 unique freight-themed CSS animations** — truck-drive, highway-lines, convoy, odometer, fuel-gauge, cargo-load, dispatch-pop, gps-ping, wheel-spin, signal-flash, freight-bounce, road-shimmer, glow-pulse, float, scroll-hint, and more
- **Framer Motion** animations on all sections (stagger, fade-up, scale, slide)
- **Real photography** from Unsplash throughout (trucks, highways, warehouses, team portraits)
- **Responsive** design — mobile, tablet, desktop
- **Dark industrial theme** with freight-yellow (`#F5A623`) accents

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS 3.4 |
| State Management | Zustand 5 |
| Animations | Framer Motion 11 |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack React Query 5 |
| Charts | Recharts |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge, class-variance-authority, date-fns |

## Project Structure

```
frontend/
├── public/
│   └── grid.svg                    # Grid pattern SVG
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (Exo font)
│   │   ├── page.tsx                # Homepage
│   │   ├── globals.css             # Theme tokens + 20 animations
│   │   ├── not-found.tsx           # 404 page
│   │   ├── loading.tsx             # Global loading spinner
│   │   ├── about/page.tsx          # About page
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing
│   │   │   └── [slug]/page.tsx     # Blog detail (6 articles)
│   │   ├── careers/page.tsx        # Careers page
│   │   ├── contact/page.tsx        # Contact page
│   │   ├── features/page.tsx       # Features page
│   │   ├── pricing/page.tsx        # Pricing page
│   │   ├── login/page.tsx          # Login
│   │   ├── register/page.tsx       # Register
│   │   ├── forgot-password/page.tsx # Forgot password
│   │   └── dashboard/
│   │       ├── layout.tsx          # Auth guard + hydration
│   │       ├── page.tsx            # Dashboard overview
│   │       ├── shipments/page.tsx
│   │       ├── fleet/page.tsx
│   │       ├── dispatch/page.tsx
│   │       ├── drivers/page.tsx
│   │       ├── customers/page.tsx
│   │       ├── invoices/page.tsx
│   │       ├── routes/page.tsx
│   │       ├── tracking/page.tsx
│   │       ├── warehouses/page.tsx
│   │       ├── reports/page.tsx
│   │       ├── notifications/page.tsx
│   │       ├── company/page.tsx
│   │       └── settings/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── public-layout.tsx   # Public header + footer
│   │   │   ├── dashboard-layout.tsx # Dashboard wrapper
│   │   │   ├── sidebar.tsx         # Dashboard sidebar
│   │   │   └── header.tsx          # Dashboard header
│   │   └── ui/                     # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── avatar.tsx
│   │       ├── dialog.tsx
│   │       └── select.tsx
│   ├── lib/
│   │   ├── api.ts                  # API client + types
│   │   ├── utils.ts                # Utility functions
│   │   └── use-hydration.ts        # Hydration-safe hook
│   └── store/
│       ├── auth-store.ts           # Authentication state
│       └── theme-store.ts          # Theme state
├── next.config.ts                  # Next.js config (remote images)
├── tailwind.config.ts              # Tailwind theme (freight colors)
├── tsconfig.json                   # TypeScript config
├── postcss.config.js               # PostCSS config
└── package.json                    # Dependencies
```

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later (recommended: 20+)
- **npm** 9+ (or yarn/pnpm)
- Windows, macOS, or Linux

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/freightflow.git

# Navigate to the frontend directory
cd freightflow/frontend

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start the production server
npm start
```

### Linting

```bash
npm run lint
```

## Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# Backend API URL (optional — defaults to localhost:8000)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Brand Identity

| Token | Color | Usage |
|-------|-------|-------|
| Freight Yellow | `hsl(36, 95%, 54%)` | Primary actions, accents, CTAs |
| Industrial Black | `hsl(0, 0%, 11%)` | Backgrounds, cards |
| Highway Silver | `hsl(220, 5%, 55%)` | Secondary text, borders |
| Fleet Green | `hsl(142, 71%, 50%)` | Success states, online indicators |
| Alert Red | `hsl(0, 84%, 55%)` | Error states, warnings |

**Font:** Exo (Google Font) — industrial, modern feel

## Animation System

The project includes 20 unique CSS animations designed for freight/trucking UIs:

| Animation | CSS Class | Description |
|-----------|-----------|-------------|
| Truck Drive | `.animate-truck-drive` | Icon slides across the screen |
| Highway Lines | `.animate-highway-lines` | Dashed road markings scroll |
| Convoy | `.animate-convoy` | Items stagger horizontally |
| Odometer | `.animate-odometer` | Numbers roll up like a truck odometer |
| Fuel Gauge | `.animate-fuel-gauge` | Bar fills left to right |
| Cargo Load | `.animate-cargo-load` | Boxes stack upward with bounce |
| Dispatch Pop | `.animate-dispatch-pop` | Notification-style pop in |
| GPS Ping | `.animate-gps-ping` | Location beacon pulse |
| Wheel Spin | `.animate-wheel-spin` | Subtle rotation |
| Signal Flash | `.animate-signal-flash` | CB radio signal blink |
| Freight Bounce | `.animate-freight-bounce` | Cargo settling bounce |
| Road Shimmer | `.animate-road-shimmer` | Heat haze effect |
| Glow Pulse | `.animate-glow-pulse` | Yellow glow pulse |
| Float | `.animate-float` | Floating up/down |
| Scroll Hint | `.animate-scroll-hint` | Scroll indicator bounce |
| Slide In | `.animate-slide-in-left` / `.animate-slide-in-right` | Slide from side |
| Scale In | `.animate-scale-in` | Scale up appearance |
| Tachometer | `.animate-tachometer` | Gauge needle sweep |
| Radar Sweep | `.animate-radar-sweep` | Rotating radar line |
| DOT Check | `.animate-dot-check` | Compliance check bounce |

Plus `highway-lines` and `highway-lines-vertical` CSS background pattern classes.

## Pages Summary

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage with hero, services, map, fleet, timeline, testimonials |
| `/about` | Static | Company story, team, timeline, offices |
| `/features` | Static | Core features, use cases, integrations |
| `/pricing` | Static | 3-tier pricing plans |
| `/blog` | Static | Blog listing with 6 articles |
| `/blog/[slug]` | Dynamic | Blog article detail |
| `/careers` | Static | Job listings |
| `/contact` | Static | Contact form, offices, support channels |
| `/login` | Static | Login page |
| `/register` | Static | Registration page |
| `/forgot-password` | Static | Password recovery |
| `/dashboard` | Static | Operations Command Center |
| `/dashboard/shipments` | Static | Shipment management |
| `/dashboard/fleet` | Static | Fleet management |
| `/dashboard/dispatch` | Static | Dispatch kanban board |
| `/dashboard/drivers` | Static | Driver roster |
| `/dashboard/customers` | Static | Customer management |
| `/dashboard/invoices` | Static | Invoice management |
| `/dashboard/routes` | Static | Route planning |
| `/dashboard/tracking` | Static | GPS tracking |
| `/dashboard/warehouses` | Static | Warehouse management |
| `/dashboard/reports` | Static | Analytics reports |
| `/dashboard/notifications` | Static | Notification center |
| `/dashboard/company` | Static | Company profile |
| `/dashboard/settings` | Static | App settings |

**Total: 27 pages** — all statically generated

## Key Implementation Details

### Hydration Safety
All Zustand stores use a `_hasHydrated` flag pattern with `onRehydrateStorage` to prevent SSR/client mismatch. The dashboard layout waits for hydration before rendering auth-dependent content.

### React 19 Compatibility
Radix UI components use correct `React.forwardRef` generic types (`HTMLDivElement`, `HTMLButtonElement`, etc.) for React 19 compatibility.

### Remote Images
Next.js is configured to accept images from `images.unsplash.com` and `i.pravatar.cc` for team portraits and freight photography.

### Static Export
All 27 pages are pre-rendered as static HTML at build time for optimal performance and CDN deployment.

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built for the American trucking industry**

FreightFlow USA — Move Freight Faster Across America

</div>
