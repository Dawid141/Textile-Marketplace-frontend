/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,html}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'header': '#8d72e1',
      'container': '#fbfbf7',
      'side-container': '#e0ebff',
      'background': '#FFF8E3',
      'footer': '#6c4ab6',
      'gray-200': '#e5e7eb',
      'gray-300': '#d6d3d1',
      'gray-400': '#9ca3af',
      'gray-500': '#78716c',
      'gray-600': '#4b5563',
      'yellow-500': '#eab308',
      'white': '#ffffff',
      'image-background': '#ffffff',
      'green': '#84cc16',
      'red': '#f43f5e',
      'blue':'#38bdf8',
      'blue-200':'#cffafe',
      'yellow-50': '#fefce8',
      'button-color': '#6983ea',

    },
    extend: {
      height: {
        custom: '34rem',
      }
    },
  },
  plugins: [],
}

