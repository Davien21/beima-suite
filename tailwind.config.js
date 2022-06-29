module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          100: "E5ECFF",
          200: "#00bdff",
          300: "#668eff",
          400: "#0043ff",
          450: "#00268F",
          500: "#001e73",
          600: "#11163b",
          800: "#00081f",
        },
        gray: {
          100: "#f8f8f8",
          400: "#cfcfcf",
        },
        green: {
          200: "#00cf8e",
        },
        pink: { 100: "#d0c4c4" },
        orange: "#ff9900",
      },
      fontFamily: {
        coolvetica: ["Coolvetica", "sans-serif"],
        "open-sans": ["Open sans", "helvetica"],
      },
      screens: {
        xmd: "1440px",
        xlg: "1720px",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.20rem",
        sm: "1.20rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "10rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "768px",
          },
          "@screen md": {
            maxWidth: "1024px",
          },
          "@screen xmd": {
            maxWidth: "1440px",
          },
          "@screen lg": {
            maxWidth: "1536px",
          },
          "@screen xlg": {
            maxWidth: "1720px",
          },
          "@screen xl": {
            maxWidth: "1800px",
          },
          "@screen 2xl": {
            maxWidth: "2160px",
          },
        },
      });
    },
  ],
};
