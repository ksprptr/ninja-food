import { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#1d1d16', soft: 'var(--ink-soft)' },
        paper: { DEFAULT: '#fbfbf9', muted: '#f4f4f0', raised: '#ffffff' },
        night: { DEFAULT: '#0c0c09', muted: '#1d1d16', raised: '#2b2b22', ink: '#f4f4f0' },
        line: { DEFAULT: '#e8e8e3', night: '#2b2b22' },
        accent: {
          DEFAULT: 'var(--accent)',
          ink: '#1d1d16',
          deep: 'var(--accent-deep)',
          soft: '#ecfcca',
          night: '#192e03',
        },
        blob: 'var(--blob)',
        macro: { carbs: '#fcd34d', fat: '#fb923c' },
        tone: {
          success: 'var(--tone-success)',
          ok: 'var(--tone-ok)',
          warning: 'var(--tone-warning)',
          danger: 'var(--tone-danger)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
      fontSize: {
        caption: ['0.8125rem', { lineHeight: '1.45' }],
        body: ['0.9375rem', { lineHeight: '1.65' }],
        lead: ['1.125rem', { lineHeight: '1.6' }],
        title: ['1.25rem', { lineHeight: '1.3' }],
        section: ['clamp(1.75rem, 3.5vw, 2.375rem)', { lineHeight: '1.15' }],
        display: ['clamp(2.25rem, 5.5vw, 3.5rem)', { lineHeight: '1.05' }],
        hero: ['clamp(2.75rem, 7.5vw, 5.25rem)', { lineHeight: '0.98' }],
      },
      spacing: {
        gutter: '1.25rem',
        block: '2rem',
        section: 'clamp(3.5rem, 8vw, 6rem)',
      },
      borderRadius: {
        box: '0.3rem',
        tile: '1.1rem',
        card: '1.5rem',
        bar: '1.75rem',
        panel: '2.5rem',
        pill: '9999px',
      },
      boxShadow: {
        cozy: '0 22px 45px -24px rgb(29 29 22 / 0.45)',
        float: '0 10px 30px -18px rgb(29 29 22 / 0.35)',
        glow: '0 12px 28px -12px var(--accent)',
      },
      maxWidth: {
        content: '75rem',
        prose: '42rem',
      },
    },
  },
};

export default config;
