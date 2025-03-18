/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        animation: {
          'bubble-1': 'bubble 3s infinite ease-in',
        'bubble-2': 'bubble 5s infinite ease-in',
        'bubble-3': 'bubble 4s infinite ease-in',
        },
        keyframes: {
          'bubble': {
            '0%': { 
              opacity: '0',
              transform: 'translateY(0)'
            },
            '50%': {
              opacity: '1'
            },
            '100%': { 
              opacity: '0',
              transform: 'translateY(-40px)'
            },
          }
        },
      },
    },
    plugins: [],
  }
  