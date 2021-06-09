module.exports = {
  purge: {
    mode: "all",
    content: [
      "./components/**/*.js",
      "./components/*.js",
      "./pages/**/*.js",
      "./pages/*.js",
      "./node_modules/@brainhubeu/react-carousel/**/*.js",
      "./utils/*.js",
    ],
    options: {
      safelist: {
        standard: [/grid-cols-/, "custom-dot-list", "underline", /w-/],
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
          lightBlue: "#83B2CB",
          lightest: "#E6F3FA",
          aliceBlue: "#F4FAFD",
          paleBlue: "#EFF7FC",
          darkGray: "#41525B",
        },
        secondary: {
          DEFAULT: "#A4C22C",
          dark: "#65800E",
        },
        gray: {
          DEFAULT: "#555555",
          light: "#EAEAEA",
          ivory: "#F6F6F5",
        },
      },
      spacing: {
        26: "6.5rem",
        29: "7.75rem",
        50: "12.5rem",
        105: "26.25rem",
        106: "27.25rem",
        107: "29.125rem",
        108: "34.25rem",
        109: "43.5rem",
      },
      boxShadow: {
        card: "0 0 34px 0 rgba(0,0,0,.08)",
      },
      width: {
        "7/15": "46.66667%",
      },
      inset: {
        "-1.5": "-0.375rem",
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
