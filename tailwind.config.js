module.exports = {
  purge: {
    mode: "all",
    content: ["./components/**/*.js", "./components/*.js", "./pages/**/*.js", "./pages/*.js"],
    options: {
      safelist: {
        standard: [/grid-cols-/],
        deep: [/^flat$/],
      },
    },
  },
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
          blue: "#3f81A5",
          lightBlue: "#83b2cb",
          lightest: "#E6F3FA",
        },
        secondary: {
          DEFAULT: "#A4C22C",
        },
        gray: {
          DEFAULT: "#555555",
          light: "#EAEAEA",
          ivory: "#F6F6F5",
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
