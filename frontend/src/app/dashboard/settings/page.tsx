'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Lock,
  Bell,
  Save,
  Mail,
  Phone,
  Camera,
  Shield,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const { token, user, updateUser } = useAuthStore()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
  })

  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  })

  const [notifications, setNotifications] = useState({
    email_shipments: true,
    email_deliveries: true,
    email_billing: true,
    email_system: false,
    push_shipments: true,
    push_deliveries: true,
    push_billing: false,
    push_system: true,
  })

  useEffect(() => {
    if (user) {
      setProfile({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone || '',
        email: user.email,
      })
    }
  }, [user])

  const handleProfileSave = async () => {
    if (!token) return
    setSaving(true)
    try {
      const updated = await api.put<any>('/api/v1/settings/profile', profile, token)
      updateUser(updated)
      setMessage('Profile updated successfully')
    } catch (err: any) {
      setMessage(err.message)
    }
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handlePasswordChange = async () => {
    if (passwords.new_password !== passwords.confirm_password) {
      setMessage('Passwords do not match')
      setTimeout(() => setMessage(''), 3000)
      return
    }
    if (!token) return
    setSaving(true)
    try {
      await api.put('/api/v1/settings/password', {
        current_password: passwords.current_password,
        new_password: passwords.new_password,
      }, token)
      setMessage('Password changed successfully')
      setPasswords({ current_password: '', new_password: '', confirm_password: '' })
    } catch (err: any) {
      setMessage(err.message)
    }
    setSaving(false)
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
              Account Settings
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Role: <span className="text-primary">{user?.role || 'Admin'}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Status: <span className="text-fleet-green">Active</span>
          </span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Account Settings
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
              Manage your profile, security, and notification preferences
            </p>
          </div>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-lg p-3 text-sm font-bold ${
              message.includes('successfully')
                ? 'bg-fleet-green/10 border border-fleet-green/30 text-fleet-green'
                : 'bg-alert-red/10 border border-alert-red/30 text-alert-red'
            }`}
          >
            {message}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* LEFT: Profile + Password */}
          <div className="xl:col-span-2 space-y-6">
            {/* PROFILE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Profile Information
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Your personal details
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        First Name
                      </label>
                      <Input
                        value={profile.first_name}
                        onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        Last Name
                      </label>
                      <Input
                        value={profile.last_name}
                        onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
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
                          value={profile.email}
                          disabled
                          className="bg-secondary border-border pl-9 opacity-70"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="bg-secondary border-border pl-9"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={handleProfileSave}
                      disabled={saving}
                      className="bg-primary text-industrial-black font-bold uppercase tracking-wider hover:bg-primary/90"
                    >
                      {saving ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-industrial-black border-t-transparent" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Profile
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* PASSWORD CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Lock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Change Password
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Update your security credentials
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={passwords.current_password}
                          onChange={(e) =>
                            setPasswords({ ...passwords, current_password: e.target.value })
                          }
                          className="bg-secondary border-border pl-9 pr-9"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        New Password
                      </label>
                      <Input
                        type="password"
                        value={passwords.new_password}
                        onChange={(e) =>
                          setPasswords({ ...passwords, new_password: e.target.value })
                        }
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        value={passwords.confirm_password}
                        onChange={(e) =>
                          setPasswords({ ...passwords, confirm_password: e.target.value })
                        }
                        className="bg-secondary border-border"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={handlePasswordChange}
                      disabled={saving || !passwords.current_password || !passwords.new_password}
                      className="bg-primary text-industrial-black font-bold uppercase tracking-wider hover:bg-primary/90"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT: Notifications + Avatar */}
          <div className="space-y-6">
            {/* AVATAR CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Camera className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Profile Photo
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Your avatar
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30">
                      <span className="text-3xl font-black text-primary">
                        {profile.first_name?.charAt(0) || 'U'}
                        {profile.last_name?.charAt(0) || ''}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-bold text-foreground">
                      {profile.first_name} {profile.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">{profile.email}</p>
                    <button className="mt-3 flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-foreground uppercase tracking-wider hover:border-primary/50 hover:bg-muted transition-all">
                      <Camera className="h-3 w-3" />
                      Change Photo
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* NOTIFICATION PREFERENCES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Notification Preferences
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        How you receive alerts
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Email Notifications */}
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase mb-3">
                        Email Notifications
                      </h4>
                      <div className="space-y-2">
                        {[
                          { key: 'email_shipments', label: 'Shipment Updates' },
                          { key: 'email_deliveries', label: 'Delivery Confirmations' },
                          { key: 'email_billing', label: 'Billing & Invoices' },
                          { key: 'email_system', label: 'System Alerts' },
                        ].map((item) => (
                          <label
                            key={item.key}
                            className="flex items-center justify-between rounded-lg bg-secondary/30 px-3 py-2 cursor-pointer hover:bg-secondary/50 transition-colors"
                          >
                            <span className="text-sm font-medium text-foreground">{item.label}</span>
                            <div
                              className={`relative h-5 w-9 rounded-full transition-colors ${
                                notifications[item.key as keyof typeof notifications]
                                  ? 'bg-primary'
                                  : 'bg-muted'
                              }`}
                              onClick={() =>
                                setNotifications({
                                  ...notifications,
                                  [item.key]: !notifications[item.key as keyof typeof notifications],
                                })
                              }
                            >
                              <div
                                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                                  notifications[item.key as keyof typeof notifications]
                                    ? 'translate-x-4'
                                    : 'translate-x-0.5'
                                }`}
                              />
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase mb-3">
                        Push Notifications
                      </h4>
                      <div className="space-y-2">
                        {[
                          { key: 'push_shipments', label: 'Shipment Updates' },
                          { key: 'push_deliveries', label: 'Delivery Confirmations' },
                          { key: 'push_billing', label: 'Billing & Invoices' },
                          { key: 'push_system', label: 'System Alerts' },
                        ].map((item) => (
                          <label
                            key={item.key}
                            className="flex items-center justify-between rounded-lg bg-secondary/30 px-3 py-2 cursor-pointer hover:bg-secondary/50 transition-colors"
                          >
                            <span className="text-sm font-medium text-foreground">{item.label}</span>
                            <div
                              className={`relative h-5 w-9 rounded-full transition-colors ${
                                notifications[item.key as keyof typeof notifications]
                                  ? 'bg-primary'
                                  : 'bg-muted'
                              }`}
                              onClick={() =>
                                setNotifications({
                                  ...notifications,
                                  [item.key]: !notifications[item.key as keyof typeof notifications],
                                })
                              }
                            >
                              <div
                                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                                  notifications[item.key as keyof typeof notifications]
                                    ? 'translate-x-4'
                                    : 'translate-x-0.5'
                                }`}
                              />
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
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
