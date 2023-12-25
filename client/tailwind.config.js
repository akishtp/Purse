/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
      },
      height: {
        content: "calc(100vh - 16px)",
      },
      colors: {
        "regal-blue": "#00000088",
      },
    },
  },
  plugins: [],
};
