import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        freight: {
          yellow: 'hsl(var(--freight-yellow))',
          black: 'hsl(var(--industrial-black))',
          silver: 'hsl(var(--highway-silver))',
        },
        fleet: {
          green: 'hsl(var(--fleet-green))',
        },
        alert: {
          red: 'hsl(var(--alert-red))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Exo', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        exo: ['Exo', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'highway-gradient': 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(0 0% 15%) 50%, hsl(var(--secondary)) 100%)',
        'freight-gradient': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(36 80% 45%) 100%)',
        'industrial-gradient': 'linear-gradient(180deg, hsl(0 0% 7%) 0%, hsl(0 0% 11%) 100%)',
      },
      animation: {
        'fleet-pulse': 'fleetPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'highway': 'highwayMove 20s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
