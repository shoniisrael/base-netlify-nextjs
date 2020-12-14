module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#F8FBFC",
          DEFAULT: "#0C3248",
          dark: "#617A88",
        },
        secondary: {
          DEFAULT: "#A4C22C",
        },
      },
      boxShadow: {
        card: "0 0 34px 0 rgba(0,0,0,.08)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
