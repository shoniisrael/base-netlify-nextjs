module.exports = {
  purge: ["./public/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          lighter: "#F8FBFC",
          light: "",
          DEFAULT: "#617A88",
          dark: "#0C3248",
        },
        secondary: {
          DEFAULT: "#A4C22C",
          gray: "#555555",
          lightGray: "#EAEAEA",
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
