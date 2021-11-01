const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    screens: {
      'xs': '400px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: 'var(--ion-color-primary)'
      },
      fontSize: {
        'tiny': '0.675rem',
        'md': '0.9rem',
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
        '13xl': '15rem',
        '14xl': '16rem'
      },
      width: {
        'fit-content': 'fit-content'
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      height: {
        'fit-content': 'fit-content',
        'inherit': 'inherit'
      },
      maxHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      borderWidth: {
        '1': '1px',
        '6': '6px'
      },
      gridTemplateColumns: {
        'auto-fr(1)': 'auto 1fr'
      },
      gridAutoColumns: {
        'fit-content': 'minmax(min-content, max-content)',
      },
      brightness: {
        25: '.25',
        80: '.80',
        85: '.85'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
