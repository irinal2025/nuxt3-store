/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'ns-peach': '#F8B899',
        'ns-dark-teal': '#3C637D',
        'ns-warm-red': '#B95F5F',
        'ns-cool-blue': '#6494B4',
        'ns-deep-teal': '#295955',
      },
    },
  },
  plugins: [],
}

