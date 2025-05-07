module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['Roboto Flex', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#1D1D1D',
        pinkaccent: '#D45383',
        pinksecondary: '#FCA6C3',
        secondary: '#989898',
        yellowmedium: '#FDCC0D',
      },
      backgroundImage: {
        hero: "url('./img/bg_hero.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
