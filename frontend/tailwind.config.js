/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["'Orbitron'", "sans-serif"],
        vt323: ["'VT323'", "monospace"],
        mono: ["'Courier New'", "Courier", "monospace"],
      },
      colors: {
        neon: {
          green: "#00FF88",
          cyan: "#00CCFF",
          lime: "#66FF00",
        },
        brand: {
          dark: "#040d06",
          darker: "#030b04",
        },
      },
      screens: {
        xs: "400px",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "beam": "beam 2s ease-in-out infinite",
        "marquee": "marquee 28s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-4px) rotate(-0.5deg)" },
          "50%": { transform: "translateY(4px) rotate(0.5deg)" },
        },
        beam: {
          "0%": { opacity: "0.6", transform: "scaleX(0.4)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
          "100%": { opacity: "0.6", transform: "scaleX(0.4)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-100% / 3))" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}