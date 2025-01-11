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
      'gray-200': '#e5e7eb',
      'gray-300': '#d6d3d1',
      'gray-400': '#9ca3af',
      'gray-500': '#78716c',
      'gray-600': '#4b5563',
      'yellow-500': '#eab308',
      'white': '#ffffff',
      'image-background': '#ffffff',
      'green': '#84cc16',
      'red': '#ef4444',
      'blue':'#22d3ee',
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

