import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14181F",
        "ink-soft": "#1D232C",
        paper: "#EFE8D8",
        "paper-dim": "#E2D9C2",
        cinnabar: {
          DEFAULT: "#C73E1D",
          dark: "#9A2E14",
        },
        gold: "#D4A12C",
        line: {
          DEFAULT: "#8B93A1",
          dim: "#3A4150",
        },
        muted: "#A9AFBC",
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
