import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F1E8",
        "cream-2": "#EFE9DA",
        ink: "#1E2420",
        "ink-soft": "#4B534C",
        teal: "#24594A",
        "teal-soft": "#E7EFE9",
        gold: "#B9922F",
        "gold-soft": "#F3E9CF",
        rule: "#DDD5C4",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(1.06)" },
        },
        sheenSweep: {
          "0%": { left: "-60%" },
          "18%": { left: "130%" },
          "100%": { left: "130%" },
        },
      },
      animation: {
        glowPulse: "glowPulse 6s ease-in-out infinite",
        sheenSweep: "sheenSweep 5.5s ease-in-out infinite 1.2s",
      },
    },
  },
  plugins: [],
};

export default config;
