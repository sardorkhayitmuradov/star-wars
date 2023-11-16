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
      'shadow-aspect': "box-shadow: 0 0 1px rgba(0,0,0,0.25)"
    },
    extend: {
      colors: {
        grey: "#B5B7B7",
        'dark-grey': "#48494a",
        'white-black': "#1D1E1F",
        light: '#f8f8f8'
      },
    },
  },
  plugins: [],
}

