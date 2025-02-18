import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';


export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/services/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
		extend: {
			fontFamily: {
				sans: ['Outfit', ...defaultTheme.fontFamily.sans],
			},
		  colors: {
			main: 'var(--main)',
			overlay: 'var(--overlay)',
			bg: {
				DEFAULT: 'var(--bg)',  // This defines the base bg color
				selected: '#FFFAE6'     // This adds the selected variant
			  },
			bw: 'var(--bw)',
			blank: 'var(--blank)',
			text: 'var(--text)',
			mtext: 'var(--mtext)',
			border: 'var(--border)',
			ring: 'var(--ring)',
			ringOffset: 'var(--ring-offset)',
			primary: '#53C2C6',
			primaryLight: '#D0FBFD',
			secondaryBlack: '#212121', 
		  },
		  borderRadius: {
			base: '10px'
		  },
		  boxShadow: {
			shadow: 'var(--shadow)'
		  },
		  translate: {
			boxShadowX: '4px',
			boxShadowY: '4px',
			reverseBoxShadowX: '-4px',
			reverseBoxShadowY: '-4px',
		  },
		  fontWeight: {
			base: '500',
			heading: '700',
		  },
		},
	  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
