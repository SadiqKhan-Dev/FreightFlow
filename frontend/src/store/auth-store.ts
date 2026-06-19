import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthResponse } from '@/lib/api'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  _hasHydrated: boolean
  login: (data: AuthResponse) => void
  logout: () => void
  updateUser: (user: User) => void
  setHasHydrated: (v: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      _hasHydrated: false,
      login: (data: AuthResponse) =>
        set({
          user: data.user,
          token: data.access_token,
          refreshToken: data.refresh_token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
      updateUser: (user: User) => set({ user }),
      setHasHydrated: (v: boolean) => set({ _hasHydrated: v }),
    }),
    {
      name: 'freightflow-auth',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
