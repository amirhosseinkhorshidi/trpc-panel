/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  safelist: [
    // Dynamic color classes
    "bg-querySolid",
    "bg-mutationSolid",
    "bg-routerSolid",
    "bg-neutralSolid",
    "bg-subscriptionSolid",
    "bg-queryBg",
    "bg-mutationBg",
    "bg-routerBg",
    "bg-neutralBg",
    "bg-subscriptionBg",
    "bg-queryBgDark",
    "bg-mutationBgDark",
    "bg-routerBgDark",
    "bg-neutralBgDark",
    "bg-subscriptionBgDark",
    "border-querySolid",
    "border-mutationSolid",
    "border-routerSolid",
    "border-neutralSolid",
    "border-subscriptionSolid",
    "text-queryText",
    "text-mutationText",
    "text-routerText",
    "text-neutralText",
    "text-subscriptionText",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Menlo", "Monaco", "Courier New", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
      },
      colors: {
        // Query → Green (سبز)
        querySolid: "#22c55e",
        queryBg: "#f0fdf4",
        queryBgDark: "#dcfce7",
        queryText: "#16a34a",
        // Mutation → Blue (آبی)
        mutationSolid: "#3b82f6",
        mutationBg: "#eff6ff",
        mutationText: "#2563eb",
        mutationBgDark: "#dbeafe",
        // Router → Purple (بنفش)
        routerSolid: "#8b5cf6",
        routerBg: "#faf5ffaa",
        routerBgDark: "#f3e8ff",
        routerText: "#9333ea",
        // Subscription → Orange (نارنجی)
        subscriptionSolid: "#f97316",
        subscriptionBg: "#fff7ed",
        subscriptionBgDark: "#ffedd5",
        subscriptionText: "#ea580c",
        neutralSolid: "#52525b",
        neutralSolidTransparent: "#64748b",
        selectedListItem: "#063352",
        neutralBg: "#f1f5f922",
        neutralBgDark: "#e2e8f0",
        neutralBgVeryDark: "#3f3f46",
        neutralText: "#0f172a",
        light: "#f8fafc",
        white: "#fcfcfc", // not actually white btw
        whiteTransparent: "#ffffff77",
        whiteLessTransparent: "#ffffffcc",
        actuallyWhite: "#ffffff",
        error: "#ef4444",
        mainBackground: "#f9fafb",
        panelBorder: "#d4d4d8",
        overlayBackground: "#999a9b88",
        separatorLine: "#d4d4d888",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
