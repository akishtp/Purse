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
        "black-opaque": "#00000088",
      },
      width: {
        "select-color": "calc(100% - 56px)",
      },
    },
  },
  plugins: [],
};
