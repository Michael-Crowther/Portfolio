import type { Config } from "tailwindcss";

const config: Config = {
  //   darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#048AC4",
          50: "#F4FBFF",
          100: "#D3F1FE",
          200: "#92DDFD",
          300: "#51C8FB",
          400: "#10B3FA",
          500: "#048AC4",
          600: "#0375A6",
          700: "#036088",
          800: "#024B6A",
          900: "#02364C",
          950: "#012B3D",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        bgsecondary: {
          DEFAULT: "hsl(var(--background-secondary))",
        },
        bgnav: {
          DEFAULT: "hsl(var(--background-nav))",
        },
        bgprofilenav: {
          DEFAULT: "hsl(var(--background-profile-nav))",
        },
        page: {
          DEFAULT: "hsl(var(--page))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
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
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "spin-slow": "spin 1s ease-in-out 0.1s",
      },
    },
  },
  //   plugins: [require("tailwindcss-animate")],
};
export default config;
