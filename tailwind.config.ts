import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Rutas corregidas para que encuentre tus archivos en src
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Conectamos con las fuentes que pusimos en layout.tsx
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      // Animación para el texto con gradiente
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        'gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;