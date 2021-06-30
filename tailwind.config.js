module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      width: {
        'fit-content': 'fit-content'
      },
      maxWidth: {
        'fit-content': 'fit-content',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      height: {
        'fit-content': 'fit-content'
      },
      maxHeight: {
        'fit-content': 'fit-content',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      borderWidth: {
        '1': '1px'
      },
      colors: {
        primary: '#5b21b6'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
