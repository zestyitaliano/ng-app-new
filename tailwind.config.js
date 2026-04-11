/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--ng-primary)",
          500: "var(--ng-primary)",
          600: "var(--ng-primary-strong)",
        },
        secondary1: {
          DEFAULT: "var(--ng-accent-yellow)",
          500: "var(--ng-accent-yellow)",
          600: "var(--ng-accent-yellow-strong)",
        },
        secondary2: {
          DEFAULT: "var(--ng-accent-red)",
          500: "var(--ng-accent-red)",
          600: "var(--ng-accent-red-strong)",
        },
        offwhite: "var(--ng-panel)",
        brand: {
          blue: "var(--ng-primary)",
          yellow: "var(--ng-accent-yellow)",
          red: "var(--ng-accent-red)",
          gray: "var(--ng-panel)",
        },
        "primary-500": "var(--ng-primary)",
        "primary-600": "var(--ng-primary-strong)",
        "secondary-yellow": "var(--ng-accent-yellow)",
        "secondary-red": "var(--ng-accent-red)",
        accent: "var(--ng-primary)",
        "accent-hover": "var(--ng-primary-strong)",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        sans: ["Syne", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
      },
      boxShadow: {
        none: "none",
      },
    },
  },
  plugins: [],
};
