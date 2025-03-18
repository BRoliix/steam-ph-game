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
          'water-move': 'water-move 5s infinite alternate',
          'bubble-1': 'bubble 3s infinite ease-in',
          'bubble-2': 'bubble 5s infinite ease-in',
          'bubble-3': 'bubble 4s infinite ease-in',
        },
        keyframes: {
          'water-move': {
            '0%': { transform: 'translateY(2px)' },
            '100%': { transform: 'translateY(-2px)' },
          },
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
  