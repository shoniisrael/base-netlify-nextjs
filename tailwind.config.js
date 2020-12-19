module.exports = {
  purge: ["./components/**/*.js", "./components/*.js", "./pages/**/*.js", "./pages/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          lighter: "#F8FBFC",
          light: "#E7F0F3",
          DEFAULT: "#617A88",
          dark: "#0C3248",
        },
        secondary: {
          DEFAULT: "#A4C22C",
        },
        gray: {
          DEFAULT: "#555555",
          light: "#EAEAEA",
        },
      },
      boxShadow: {
        card: "0 0 34px 0 rgba(0,0,0,.08)",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["last"],
      scale: ["group-hover"],
    },
  },
  plugins: [],
};
