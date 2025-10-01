/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f9ff",
          100: "#eaf2ff",
          200: "#cfe2ff",
          300: "#a6c6ff",
          400: "#6fa1ff",
          500: "#3a79ff",
          600: "#1f5ff0",
          700: "#184acc",
          800: "#163ea6",
          900: "#132f78",
        },
      },
      borderRadius: { "2xl": "1rem" },
    },
  },
  plugins: [],
};
