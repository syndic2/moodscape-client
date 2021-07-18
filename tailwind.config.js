module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        primary: 'var(--ion-color-primary)'
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
        '1': '1px'
      },
      gridTemplateColumns: {
        'auto-fr(1)': 'auto 1fr'
      },
      gridAutoColumns: {
        'fit-content': 'minmax(min-content, max-content)',
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
