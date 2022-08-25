const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./app/**/*.{html,ejs,js}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    screens: {
      "sm": "576px",
      "md": "768px",
      "lg": "1026px",
      "xl": "1321px"
    },
    container: {
      center: true,
      padding: "12px"
    },
    fontSize: {
      'none':['0'],
      'sm':['0.75rem'], // 14px
      'base':['1rem'],  // 16px
      'lg':['1.125rem'], // 18px
      'xl':['1.25rem'], // 20px
      '2xl':['1.5rem'], // 24px
      '3xl':['2rem'], // 32px
      '4xl':['3rem'], // 48px
      '5xl':['5rem'], // 80px
    },
    extend: {
      fontFamily: {
        'sans': ['Noto Sans TC', ...defaultTheme.fontFamily.sans],
        'squada': ['Squada One', ...defaultTheme.fontFamily.sans],
        'paytone':['Paytone One', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'crimson': '#E6553B',
        'lemon': '#53C139',
        'gray': {
          DEFAULT: '#F0F0F0',
          'dark': '#808080'
        }
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/typography'),
  ],
}