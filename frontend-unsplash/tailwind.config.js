/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      green: '#3DB46D',
      black: '#000',
      white: '#fff',
      red: '#EB5757',
      primary: '#333333',
      secondary: '#4F4F4F',
      tertiary: '#BDBDBD',
      overlay: '#000000'
    },
    backgroundColor: {
      green: '#3DB46D',
      white: '#fff',
      "black-100": '#000',
      red: '#EB5757',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '1/1': '100%',
    }
    },
  },
  plugins: [],
}
