import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        aceh: {
          green:        '#00703C',
          'green-dark': '#004D2A',
          'green-light':'#e8f5ee',
          red:          '#C8102E',
          gold:         '#C9941A',
          'gold-light': '#fff8e6',
        },
        ink: {
          DEFAULT: '#111827',
          mid:     '#374151',
          soft:    '#6B7280',
        },
        border:  '#E5E7EB',
        surface: '#F9FAFB',
      },
      fontFamily: {
        head:  ['var(--font-head)', 'Georgia', 'serif'],
        label: ['var(--font-label)', 'sans-serif'],
        body:  ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '480px',
      },
      maxWidth: {
        portal: '1280px',
      },
      gridTemplateColumns: {
        hero:    '2fr 1fr',
        content: '1fr 320px',
        'feat-3': 'repeat(3, 1fr)',
        'feat-4': 'repeat(4, 1fr)',
      },
    },
  },
  plugins: [],
}

export default config
