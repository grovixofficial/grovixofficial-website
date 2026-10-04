/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Force rebuild
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-navy": "#111418",
        "brand-dark": "#0D1117",
        "brand-blue": "#2F4FD2",
        "brand-blue-light": "#EEF2FF",
        "brand-blue-dark": "#233FA8",
        "brand-blue-accent": "#3B66F5",
        "brand-blue-tint": "#F0F4FF",
        "brand-paper": "#F5F4EF",
        "brand-paper-light": "#FAF9F6",
        "brand-taupe": "#A49C8D",
        "brand-taupe-dark": "#6D6B5F",
        "brand-mint": "#2F4FD2", // backward-compat mapped to brand blue
        "brand-mint-light": "#EEF2FF",
        "brand-mint-dark": "#233FA8",
        "brand-cyan": "#3B66F5",
        "brand-cyan-light": "#F0F4FF",
        "primary": "#111418",
        "secondary": "#2F4FD2",
        "accent": "#2F4FD2",
        "accent-light": "#EEF2FF",
        "surface": "#ffffff",
        "surface-muted": "#F5F4EF",
        "surface-dark": "#111418",
        "background": "#F5F4EF",
        "border-light": "#E5E1D8",
        "error": "#dc2626",
        "text-primary": "#111418",
        "text-secondary": "#4A4840",
        "text-muted": "#6D6B5F",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "16px",
        "container-margin": "24px",
        "sm": "8px",
        "xs": "4px",
        "unit": "8px",
        "xl": "32px",
        "2xl": "48px",
        "md": "16px",
        "lg": "24px",
        "3xl": "64px"
      },
      fontFamily: {
        "condensed": ["'Bebas Neue'", "'Anton'", "Impact", "sans-serif"],
        "anton": ["'Anton'", "Impact", "sans-serif"],
        "display": ["Outfit", "Plus Jakarta Sans", "sans-serif"],
        "heading": ["Outfit", "Plus Jakarta Sans", "sans-serif"],
        "sans": ["Plus Jakarta Sans", "Inter", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
        "label-md": ["Plus Jakarta Sans", "Inter", "sans-serif"],
        "label-sm": ["Plus Jakarta Sans", "Inter", "sans-serif"],
        "headline-md": ["Outfit", "sans-serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Outfit", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "Inter", "sans-serif"],
        "display-sm": ["Outfit", "sans-serif"],
        "headline-lg-mobile": ["Outfit", "sans-serif"],
        "body-sm": ["Plus Jakarta Sans", "sans-serif"],
        "display-lg": ["Outfit", "sans-serif"]
      },
      fontSize: {
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "600" }],
        "headline-md": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-lg": ["30px", { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "display-sm": ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }]
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      }
    },
  },
  plugins: [],
}
