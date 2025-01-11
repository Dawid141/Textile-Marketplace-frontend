/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,html}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'header': '#f1d1c2',
      'container': '#fbfbf7',
      'side-container': '#faf3d6',
      'background': '#FFF8E3',
      'footer': '#E6A4B4',
      'gray-400': '#9ca3af',
      'gray-600': '#4b5563',
      'gray-200': '#e5e7eb',
      'image-background': '#ffffff',
      'green': '#84cc16',
      'red': '#ef4444',
      'blue':'#CAF4FF',
      'yellow-50': '#fefce8'

    },
    extend: {
      height: {
        custom: '34rem',
      }
    },
  },
  plugins: [],
}

