import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'light' | 'dark'
  _hasHydrated: boolean
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
  setHasHydrated: (v: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      _hasHydrated: false,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme) => set({ theme }),
      setHasHydrated: (v: boolean) => set({ _hasHydrated: v }),
    }),
    {
      name: 'freightflow-theme',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
