// Default Tailwind colors
import colors from 'tailwindcss/colors'

// Helper function to generate color patterns
const generateColorPatterns = (prefix) => {
  return Object.keys(colors)
    .filter(color => typeof colors[color] === 'object')
    .map(color =>
      Object.keys(colors[color]).map(shade => `${prefix}-${color}-${shade}`)
    ).flat();
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: "#00B8A9",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        inter: ["Inter", "serif"],
        manrope: ["Manrope", "serif"],
        jakarta: ["Plus Jakarta Sans", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  important: true,
  safelist: [
    // Pattern approach (recommended for production)
    {
      pattern: /^(bg|text)-(transparent|current|black|white|rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|gray|slate|zinc|neutral|stone|primary|secondary)(-\d+)?$/,
    },

    // Alternative: Explicit patterns for more control
    {
      pattern: /^bg-(red|yellow|green|blue|indigo|purple|pink|gray|white|black)(-[1-9]00)?$/,
    },
    {
      pattern: /^text-(red|yellow|green|blue|indigo|purple|pink|gray|white|black)(-[1-9]00)?$/,
    },

    // Or use the helper function to generate all possible combinations
    ...generateColorPatterns('bg'),
    ...generateColorPatterns('text'),

    // Don't forget opacity modifiers if needed
    {
      pattern: /^(bg|text)-opacity-/,
    }
  ],
};
