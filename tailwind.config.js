/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  safelist: [
    'hover:shadow-theme'
  ],
  variants: {
    extend: {
      boxShadow: ['hover']
    }
  },
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#000000',
          light: '#ffffff',
          accent: '#ff0000',
        },
        secondary: {
          dark: '#1e1b4b',
          light: '#4f46e5',
          accent: '#a78bfa',
        },
        neon: {
          blue: '#3b82f6',
          cyan: '#00ffff',
          red: '#ff0000',
        },
      },
      fontFamily: {
        sans: ['"Rajdhani"', 'sans-serif'],
        mono: ['"Major Mono Display"', 'monospace'],
      },
      boxShadow: {
        'theme': '0 0 15px rgba(var(--color-primary-accent), 0.5)',
      },
    },
  },
  plugins: [],
}