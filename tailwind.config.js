module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#5b21b6'
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
