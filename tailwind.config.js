/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#4e1a59',
        customPink: '#c626bf',
        customGreen: '#97a294',
        customDarkPurple: '#5a35a4',
        customDark: '#190f23',
        customBlue: '#1d4ed8',
        customLightGreen: '#22e5c6',
      },
    },
  },
  plugins: [],
}