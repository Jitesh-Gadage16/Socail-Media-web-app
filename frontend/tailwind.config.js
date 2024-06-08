// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'custom-width': 'calc(-2px + min(470px, 100vw))',
      },
    },
  },
  variants: {
    extend: {
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),],
};
