/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
       "blue-primary": "#92A6B3",
       "blue-secondary":"#7DBCC9",
       "green-primary": "#82A374",
      "green-secondary": "#5F9376"
      }
    },
  },
  plugins: [],
}

