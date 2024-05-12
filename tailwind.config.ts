import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "hero-image" : "url('https://irp-cdn.multiscreensite.com/20adca72/dms3rep/multi/construccion+de+edificios+en+monterrey.jpg')", 
          "search-image-buttom" : "url('https://e7.pngegg.com/pngimages/876/598/png-clipart-magnifying-glass-computer-icons-magnifier-search-for-glass-magnifier.png')",
      },
    },
  },
  plugins: [
    
  ],
};
export default config;
