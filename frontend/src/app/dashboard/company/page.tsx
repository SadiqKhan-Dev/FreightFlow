'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Building2,
  Upload,
  Save,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  CreditCard,
  FileText,
  Shield,
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function CompanyPage() {
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const [company, setCompany] = useState({
    name: 'FreightFlow USA Logistics',
    legal_name: 'FreightFlow USA Inc.',
   ein: '12-3456789',
    phone: '(800) 555-FLOW',
    fax: '(800) 555-FLOX',
    email: 'ops@freightflowusa.com',
    website: 'www.freightflowusa.com',
    address: '1200 Commerce Blvd',
    city: 'Dallas',
    state: 'TX',
    zip_code: '75201',
    country: 'United States',
    mc_number: 'MC-123456',
    dot_number: 'DOT-789012',
    insurance_provider: 'National Freight Insurance Co.',
    insurance_policy: 'NFI-2026-FFLOW-001',
    insurance_expiry: '2027-03-15',
  })

  const [hours, setHours] = useState({
    monday: { open: '06:00', close: '22:00', active: true },
    tuesday: { open: '06:00', close: '22:00', active: true },
    wednesday: { open: '06:00', close: '22:00', active: true },
    thursday: { open: '06:00', close: '22:00', active: true },
    friday: { open: '06:00', close: '22:00', active: true },
    saturday: { open: '08:00', close: '18:00', active: true },
    sunday: { open: '', close: '', active: false },
  })

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSaving(false)
    setMessage('Company profile updated successfully')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="min-h-screen bg-background space-y-0">
      {/* STATUS STRIP */}
      <div className="w-full bg-secondary border-b border-border">
        <div className="flex items-center gap-4 px-6 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Company Profile
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Status: <span className="text-fleet-green">Active</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            MC: <span className="text-primary">MC-123456</span>
          </span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Company Profile
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
              Manage company information, compliance, and operational settings
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-industrial-black uppercase tracking-wider transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-industrial-black border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-fleet-green/10 border border-fleet-green/30 p-3 text-sm font-bold text-fleet-green"
          >
            {message}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* LEFT COLUMN: Company Info + Logo */}
          <div className="xl:col-span-2 space-y-6">
            {/* COMPANY INFORMATION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Company Information
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Basic business details
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        Legal Company Name
                      </label>
                      <Input
                        value={company.legal_name}
                        onChange={(e) => setCompany({ ...company, legal_name: e.target.value })}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        DBA / Trade Name
                      </label>
                      <Input
                        value={company.name}
                        onChange={(e) => setCompany({ ...company, name: e.target.value })}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        EIN / Tax ID
                      </label>
                      <Input
                        value={company.ein}
                        onChange={(e) => setCompany({ ...company, ein: e.target.value })}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        MC Number
                      </label>
                      <Input
                        value={company.mc_number}
                        onChange={(e) => setCompany({ ...company, mc_number: e.target.value })}
                        className="bg-secondary border-border font-mono"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        DOT Number
                      </label>
                      <Input
                        value={company.dot_number}
                        onChange={(e) => setCompany({ ...company, dot_number: e.target.value })}
                        className="bg-secondary border-border font-mono"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CONTACT DETAILS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Contact Details
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Phone, email, and web presence
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        Primary Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={company.phone}
                          onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                          className="bg-secondary border-border pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        Fax
                      </label>
                      <Input
                        value={company.fax}
                        onChange={(e) => setCompany({ ...company, fax: e.target.value })}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={company.email}
                          onChange={(e) => setCompany({ ...company, email: e.target.value })}
                          className="bg-secondary border-border pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        Website
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={company.website}
                          onChange={(e) => setCompany({ ...company, website: e.target.value })}
                          className="bg-secondary border-border pl-9"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ADDRESS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Business Address
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Primary operating location
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        Street Address
                      </label>
                      <Input
                        value={company.address}
                        onChange={(e) => setCompany({ ...company, address: e.target.value })}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        City
                      </label>
                      <Input
                        value={company.city}
                        onChange={(e) => setCompany({ ...company, city: e.target.value })}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                          State
                        </label>
                        <Input
                          value={company.state}
                          onChange={(e) => setCompany({ ...company, state: e.target.value })}
                          className="bg-secondary border-border"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                          ZIP
                        </label>
                        <Input
                          value={company.zip_code}
                          onChange={(e) => setCompany({ ...company, zip_code: e.target.value })}
                          className="bg-secondary border-border"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Logo + Insurance + Hours */}
          <div className="space-y-6">
            {/* LOGO UPLOAD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Upload className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Company Logo
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Brand identity
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/50">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground/50" />
                        <p className="mt-2 text-xs font-medium text-muted-foreground">
                          Drop or click
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Recommended: 200x200px, PNG or SVG
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* INSURANCE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Insurance
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Coverage details
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div>
                    <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                      Provider
                    </label>
                    <Input
                      value={company.insurance_provider}
                      onChange={(e) =>
                        setCompany({ ...company, insurance_provider: e.target.value })
                      }
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                      Policy Number
                    </label>
                    <Input
                      value={company.insurance_policy}
                      onChange={(e) =>
                        setCompany({ ...company, insurance_policy: e.target.value })
                      }
                      className="bg-secondary border-border font-mono"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                      Expiry Date
                    </label>
                    <Input
                      type="date"
                      value={company.insurance_expiry}
                      onChange={(e) =>
                        setCompany({ ...company, insurance_expiry: e.target.value })
                      }
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="pt-2">
                    <Badge variant="success" className="text-[10px]">
                      Coverage Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* BUSINESS HOURS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Business Hours
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Operating schedule
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {Object.entries(hours).map(([day, schedule]) => (
                      <div
                        key={day}
                        className="flex items-center justify-between rounded-lg bg-secondary/30 px-3 py-2"
                      >
                        <span className="text-xs font-bold text-foreground uppercase capitalize w-24">
                          {day}
                        </span>
                        {schedule.active ? (
                          <span className="text-xs font-mono text-foreground/80">
                            {schedule.open} - {schedule.close}
                          </span>
                        ) : (
                          <Badge variant="destructive" className="text-[8px] px-1.5 py-0.5">
                            Closed
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
