module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    maxWidth: {
      xs: "450px",
      xl: "1240px",
    },
    boxShadow: {
      "shadow-navlink": "0px 2px 0px #fff",
    },
    extend: {
      colors: {
        grey: "#B5B7B7",
        'dark-grey': "#48494a"
      },
    },
  },
  plugins: [],
}

