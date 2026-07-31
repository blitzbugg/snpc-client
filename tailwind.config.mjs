/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#0D47A1',
        'secondary' : '#FBC02D',
        'accent' : '#FFFFFF',
        'neutral' : '#F5F5F5',
        'dark' : '#212121',
        'light-dark' : '#6E6E6E',
      }
    },
  },
  plugins: [],
}
