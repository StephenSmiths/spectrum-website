import type { Config } from 'tailwindcss'

/**
 * Spectrum Total Solutions — Dark Tech / Obsidian design tokens
 * Tailwind v4 loads this via `@config` in `src/styles/tailwind.css`.
 */
export default {
  theme: {
    extend: {
      colors: {
        /* Cosmic navy / space-gray backgrounds (not pure black) */
        background: {
          DEFAULT: '#060C18',
          deep: '#050A14',
          elevated: '#090F1E',
        },
        /* Neon cyan / teal — primary actions & emphasis */
        primary: {
          DEFAULT: '#3DD9C5',
          foreground: '#060C18',
          soft: '#5EEAD4',
          muted: 'rgba(61, 217, 197, 0.15)',
        },
        /* Blast purple / fuchsia — accent & gradients */
        accent: {
          DEFAULT: '#9B8FE4',
          foreground: '#EEF0F8',
          soft: '#C4B5FD',
          muted: 'rgba(155, 143, 228, 0.15)',
          fuchsia: '#D946EF',
        },
        /* Neon green — optional blast highlight */
        neon: {
          DEFAULT: '#7EECC4',
          green: '#39FF14',
        },
        /* Glass / card surface — slightly lighter than background */
        surface: {
          DEFAULT: 'rgba(14, 22, 40, 0.72)',
          solid: '#0E1628',
          elevated: 'rgba(22, 32, 54, 0.82)',
          border: 'rgba(255, 255, 255, 0.10)',
        },
        /* High-quality light text on dark UI */
        foreground: {
          DEFAULT: '#E2E8F0',
          muted: '#94A3B8',
          dim: 'rgba(238, 240, 248, 0.50)',
          ghost: 'rgba(238, 240, 248, 0.28)',
          ivory: '#EEF0F8',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'Plus Jakarta Sans',
          'Noto Sans TC',
          'sans-serif',
        ],
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow:
              '0 0 20px rgba(61, 217, 197, 0.25), 0 0 40px rgba(155, 143, 228, 0.12)',
          },
          '50%': {
            opacity: '0.85',
            boxShadow:
              '0 0 28px rgba(61, 217, 197, 0.45), 0 0 56px rgba(155, 143, 228, 0.22)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(16px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(61, 217, 197, 0.35)',
          },
          '50%': {
            boxShadow: '0 0 24px 4px rgba(61, 217, 197, 0.2)',
          },
        },
      },
      animation: {
        glow: 'glow 2.8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(61, 217, 197, 0.25)',
        'glow-purple': '0 0 24px rgba(155, 143, 228, 0.25)',
        'glow-card':
          '0 0 0 1px rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.35)',
      },
    },
  },
} satisfies Config
