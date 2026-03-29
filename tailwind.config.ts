import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Primary brand (Forest Teal) — use `brand.*` in new code; `orange` kept for existing classes */
        brand: {
          DEFAULT: '#1A8F7D',
          dark: '#157A6B',
          light: '#2DB5A0',
          mid: '#1d9a88',
          muted: '#4DB8A8',
        },
        orange: {
          DEFAULT: '#1A8F7D',
          dark: '#157A6B',
          light: '#2DB5A0',
          mid: '#1d9a88',
          gold: '#4DB8A8',
        },
        /* Cool slate for secondary text / borders on light backgrounds */
        ink: {
          DEFAULT: '#5C6B7A',
          muted: '#6B7C8F',
          dark: '#4A5D6A',
        },
        /* Teal-tinted neutrals + deep blue-green surfaces */
        surface: {
          light: '#F2F6F5',
          'light-muted': '#F0F5F4',
          deep: '#0e1615',
          'deep-muted': '#0a1211',
        },
        /* Sand / bronze — rare warm accents */
        warm: {
          DEFAULT: '#C4B8A8',
          dark: '#9A7B5C',
        },
        dark: {
          DEFAULT: '#0D0D0D',
          secondary: '#1A1A1A',
          card: '#222222',
          muted: '#2D2D2D',
          deep: '#0e1615',
        },
        light: {
          DEFAULT: '#F2F6F5',
          secondary: '#E8EEEC',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [],
}

export default config
