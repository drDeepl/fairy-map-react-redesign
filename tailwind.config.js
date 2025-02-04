/** @type {import('tailwindcss').Config} */
import tailwindAnimations from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "res-xs": "calc(0.75rem + 0.3vw)",
        "res-sm": "calc(0.875rem + 0.5vw)",
        "res-base": "calc(1rem + 0.7vw)",
        "res-lg": "calc(1.25rem + 1vw)",
        "res-xl": "calc(1.5rem + 1.5vw)",
        "res-2xl": "calc(2rem + 2vw)",
      },
      screens: {
        xsm: "400px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      backgroundImage: {
        "cloud-uplaod": "url('./assets/img/cloud-upload.svg')",
      },
      keyframes: {
        rotate180: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(180deg)",
          },
        },
        rotate270: {
          from: {
            transform: "rotate(180deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
        "zoom-in": {
          "0%": {
            opacity: "0",
            transform: "scale(.5)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "zoom-out": {
          "0%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(.5)",
          },
        },
        ring: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        tada: {
          "0%": {
            transform: "scale3d(1, 1, 1)",
          },
          "10%, 20%": {
            transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
          },
          "40%, 60%, 80%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
          },
          "100%": {
            transform: "scale3d(1, 1, 1)",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        "jump-heart": {
          "0%, 100%": {
            transform: "translateY(-10px)",
          },
          "50%": {
            transform: "translateY(0px)",
          },
        },
        "swapping-middle": {
          "0%": {
            transform: "translateY(-40px)",
          },
          "100%": {
            transform: "translate(40px, 40px)",
          },
        },
        "swapping-left": {
          "0%": {
            transform: "translate(40px, 40px)",
          },
          "100%": {
            transform: "translate(-40px, 40px)",
          },
        },
        "swapping-right": {
          "0%": {
            transform: "translate(-40px, 40px)",
          },
          "100%": {
            transform: "translateY(-40px)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in-left": {
          "0%": {
            opacity: 0,
            transform: "translate3d(-100%, 0, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        "fly-in": {
          "0%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3)",
            transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
          },
        },
        "drop-out": {
          "0%": {
            opacity: "1",
            transform: "scale(1)",
            animationTimingFunction: "cubic-bezier(0.34, 1.61, 0.7, 1)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(0)",
          },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
        spin: {
          "0%": "rotate(0deg)",
          "100%": "rotate(360deg)",
        },
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0.5deg)",
          },
          "75%": {
            transform: "rotate(-0.5deg)",
          },
        },
        glowing: {
          "0%": { "background-position": "0 0" },
          "50%": { "background-position": "400% 0" },
          "100%": { "background-position": "0 0" },
        },
        "flip-in-y": {
          "0%": {
            opacity: "0",
            transform: "rotateX(90deg)",
          },
          "100%": {
            opacity: "1",
            transform: "rotateX(0deg)",
          },
        },
        "slide-up-fade": {
          "0%": {
            opacity: "0",
            transform: "translateY(50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      "fade-in-down": {
        "0%": {
          opacity: 0,
          transform: "translate3d(0, -100%, 0)",
        },
        "100%": {
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
        },
      },
      animation: {
        fadeindown: "fade-in-down 1s ease-in 0.25s 1",
        "slide-up-fade": "slide-up-fade 0.6s ease-out",
        "flip-in-y": "flip-in-y 0.6s ease-out",
        glowing: "glowing 20s linear infinite",
        tilt: "tilt 10s infinite linear",
        spin: "spin 2.5s linear infinite",
        rotate: "rotate 10s linear infinite",
        blob: "blob 1.5s infinite",
        ring: "ring 0.3s",
        "rotate-180": "rotate180 0.3s linear forwards",
        "rotate-270": "rotate270 0.3s linear forwards",
        "zoom-in": "zoom-in 0.3s ease-out",
        "zoom-out": "zoom-out 0.3s ease-out",
        dropout: "drop-out 0.5s ease-in-out 0.25s 1",
        flyin: "fly-in 0.6s ease-in-out 0.25s 1",
        fadeinleft: "fade-in-left 1s ease-in-out 0.25s 1",
        tada: "tada 1s ease-in-out 0.25s 1",
        shimmer: "shimmer 2s linear infinite",
        fadeIn: "fadeIn 0.7s ease-out",
        "jump-heart": "jump-heart 1.5s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        red: {
          50: "#FFF2F1",
          100: "#FFE5E4",
          200: "#FFCBCA",
          300: "#FFA7A4",
          400: "#FF7A75",
          500: "#FF4E45",
          600: "#FF1D12",
          700: "#E60C00",
          800: "#B30900",
          900: "#800700",
        },
        ghost: "#D4E6FA",
        "baby-blue": {
          50: "#F6FAFE",
          100: "#EDF5FD",
          500: "#D4E6FA",
          800: "#A9B8C8",
        },

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
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [tailwindAnimations],
};
