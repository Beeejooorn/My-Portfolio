/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#020205",
        surface: "#131319",
        "surface-low": "#0e0e14",
        "surface-mid": "#1f1f25",
        "surface-high": "#35343b",
        "text-main": "#f7f7fb",
        "text-muted": "#c2c6d6",
        primary: "#adc6ff",
        secondary: "#d0bcff",
        tertiary: "#4edea3",
      },
      fontFamily: {
        sans: ["Geist", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        glow: "0 24px 90px rgba(173, 198, 255, 0.12)",
      },
      backgroundImage: {
        "glass-stroke":
          "linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03))",
      },
    },
  },
  plugins: [],
};
