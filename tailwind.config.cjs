/**
 * @format
 * @type {import('tailwindcss').Config}
 */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "corben-regular": ["Corben-Regular", "cursive"],
        "corben-bold": ["Corben-Bold", "cursive"],
        "coustard-regular": ["Coustard-Regular", "cursive"],
        "coustard-black": ["Coustard-Black", "cursive"],
        SawarabiMincho: ["SawarabiMincho", "cursive"],
        "CrimsonText-Bold": ["CrimsonText-Bold", "cursive"],
        "CrimsonText-BoldItalic": ["CrimsonText-BoldItalic", "cursive"],
        "CrimsonText-Italic": ["CrimsonText-Italic", "cursive"],
        "CrimsonText-Regular": ["CrimsonText-Regular", "cursive"],
        "CrimsonText-SemiBold": ["CrimsonText-SemiBold", "cursive"],
        "CrimsonText-SemiBoldItalic": ["CrimsonText-SemiBoldItalic", "cursive"],
        "DancingScript-Bold": ["DancingScript-Bold", "cursive"],
        "DancingScript-Medium": ["DancingScript-Medium", "cursive"],
        "DancingScript-Regular": ["DancingScript-Regular", "cursive"],
        "DancingScript-SemiBold": ["DancingScript-SemiBold", "cursive"],
        "Arvo-Bold": ["Arvo-Bold", "cursive"],
        "Arvo-BoldItalic": ["Arvo-BoldItalic", "cursive"],
        "Arvo-Italic": ["Arvo-Italic", "cursive"],
        "Arvo-Regular": ["Arvo-Regular", "cursive"],
      },
      colors: {
        primary: "#E85A4F",
        secondary: "#D8C3A5",
        thirt: "#E98074",
        "my-gray": "#8E8D8A",
        hijau: "#2eff8b",
        biru: "#2EA2FF",
        merah: "#FF2E3A",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
});
