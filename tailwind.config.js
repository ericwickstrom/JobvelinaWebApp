/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jobvelina': {
          blue: '#646cff',
          'blue-hover': '#5a5fcf',
        }
      }
    },
  },
  plugins: [],
}