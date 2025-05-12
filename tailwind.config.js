module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Roboto Flex", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "30px",
        lg: "0",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#1D1D1D",
        pinkaccent: "#D45383",
        pinksecondary: "#FCA6C3",
        secondary: "#989898",
        yellowmedium: "#FDCC0D",
      },
      animation: {
        'slide-in-up': 'slide-in-up 0.3s ease-out',
        "slide-in-right": "slideInRight 0.4s ease-out",
      },
      keyframes: {
        'slide-in-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
