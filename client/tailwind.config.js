/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgb(84, 140, 168)', 
        'dark-bluish-gray':'rgb(71, 96, 114)',
        'muted-blue-gray':'rgb(51,66,87)',
        'yellowish-green':'rgb(188, 207, 91)',
        'light-gray':'rgb(238, 238, 238)',
      },
    },
  },
  plugins: [],
}

