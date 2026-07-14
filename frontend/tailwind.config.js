/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#FFFFFF',
          section: '#F5F5F7',
          text: '#1D1D1F',
          secondary: '#6E6E73',
          blue: '#0071E3',
          border: '#D2D2D7',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
      },
      borderRadius: {
        'apple': '28px',
        'apple-lg': '32px',
      },
      boxShadow: {
        'apple-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'apple-hover': '0 20px 40px 0 rgba(0, 0, 0, 0.12)',
        'blue-glow': '0 0 20px 0 rgba(0, 113, 227, 0.3)',
      }
    },
  },
  plugins: [],
}
