/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4', // cyan-500
        background: '#0f172a', // slate-900
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        pulseSlow: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-out both',
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
