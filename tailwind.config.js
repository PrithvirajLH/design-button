/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#0f172a',
        'primary-foreground': '#f8fafc',
        accent: '#e2e8f0',
        'accent-foreground': '#0f172a',
        input: 'rgba(148, 163, 184, 0.55)',
        destructive: '#ef4444',
      },
      boxShadow: {
        'soft-xl': '0 24px 60px -30px rgba(15, 23, 42, 0.45)',
        'soft-lg': '0 18px 40px -24px rgba(15, 23, 42, 0.35)',
        glow: '0 0 25px rgba(16, 185, 129, 0.45)',
        'glow-amber': '0 0 24px rgba(249, 115, 22, 0.45)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-60%)' },
          '100%': { transform: 'translateX(60%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sweep: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.6)', opacity: '0.5' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        rainbow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.6s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        sweep: 'sweep 5s ease infinite',
        spinSlow: 'spinSlow 7s linear infinite',
        ripple: 'ripple 0.7s ease-out',
        rainbow: 'rainbow 6s linear infinite',
      },
    },
  },
  plugins: [],
}
