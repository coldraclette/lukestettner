/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      univers: ['var(--font-univers)', 'serif'],
    },
    colors: {
      black: '#000',
      red: '#FF0000',
      white: '#fcfcfc',
    },
  },
  plugins: [],
};
