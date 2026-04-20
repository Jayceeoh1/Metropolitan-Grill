/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#c0392b',
          'red-dark': '#96251e',
          'red-light': '#e74c3c',
          gold: '#f39c12',
          'gold-light': '#f1c40f',
          orange: '#e67e22',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          2: '#111111',
          3: '#1a1a1a',
          4: '#222222',
        },
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'cursive'],
        barlow: ['Barlow', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(192,57,43,0.18) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 80% 20%, rgba(243,156,18,0.1) 0%, transparent 50%), linear-gradient(135deg, #0a0a0a 0%, #1a0a08 50%, #0a0a0a 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
