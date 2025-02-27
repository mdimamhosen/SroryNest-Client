/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px",
      },
    },
  },
  plugins: [],
};
