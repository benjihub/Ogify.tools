import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--bg) / <alpha-value>)",
        "ink-soft": "rgb(var(--bg-soft) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        paper: "rgb(var(--fg) / <alpha-value>)",
        "paper-dim": "rgb(var(--fg-soft) / <alpha-value>)",
        cinnabar: {
          DEFAULT: "#C73E1D",
          dark: "#9A2E14",
        },
        gold: "rgb(var(--gold) / <alpha-value>)",
        line: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          dim: "rgb(var(--border-soft) / <alpha-value>)",
        },
        muted: "rgb(var(--muted) / <alpha-value>)",
        stampInk: "#14181F",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
