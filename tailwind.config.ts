import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        WhyteInktrap: ["Whyte Inktrap", "sans-serif"],
      },
      colors: {
        gray: {
          100: "#F4F4F5",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
        },
        primary: "#041F60",
        secondary: "#FFD701",
      },
      content: {
        empty: "''",
      },
      backgroundImage: {
        textDecorator: "url('/public/svg/text-arrow.svg')",
        aboutShadow:
          "linear-gradient(0deg, rgba(46, 46, 46, 0.82) 0%, rgba(81, 81, 81, 0) 100%)",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
export default config;
