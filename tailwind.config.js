const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{html,jsx, tsx, js}',
    './src/**/*.{html,jsx,tsx, js}',
  ],
  theme: {
    extend: {
      colors: {
        teal: colors.pink,
        cyan: colors.yellow,
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
