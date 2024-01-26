import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
    tokens: {
      colors: {
        base: { value: "hsl(354, 22%, 91%)" },
        "base-light": { value: "hsl(0, 20%, 96%)" },
        "dark": { value: "hsl(0, 0%, 0%)" },
        "dark-light": { value: "hsl(0, 0%, 4%)" },
        "grey": { value: "hsl(0, 0%, 93%)" },
        "grey-light": { value: "hsla(0, 0%, 93%, 0.3)" },
        "primary-100": { value: "hsl(105, 26%, 61%)" },
        "primary-200": { value: "hsl(104, 26%, 60%)" },
        "primary-300": { value: "hsl(104, 26%, 52%)" },
        "primary-400": { value: "hsl(102, 26%, 40%)" },
        "primary-500": { value: "hsl(102, 26%, 32%)" },
        "error-light": { value: '#feebec' },
        "error": { value: '#fdbdbe' },
        "error-dark": { value: '#ce2c31' },
      }
    },
  },
  // The output directory for your css system
  outdir: "styled-system",
});
