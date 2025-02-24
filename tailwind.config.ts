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
  			sans: [
  				'Outfit',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		colors: {
  			main: 'var(--main)',
  			overlay: 'var(--overlay)',
  			button: 'var(--button)',
  			select: 'var(--select)',
  			bg: {
  				DEFAULT: 'var(--bg)',
  				selected: '#FFFAE6'
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
  			shiki: {
  				light: 'var(--shiki-light)',
  				'light-bg': 'var(--shiki-light-bg)',
  				dark: 'var(--shiki-dark)',
  				'dark-bg': 'var(--shiki-dark-bg)'
  			}
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
  			reverseBoxShadowY: '-4px'
  		},
  		fontWeight: {
  			base: '500',
  			heading: '700'
  		},
  		keyframes: {
  			'typing-dot-bounce': {
  				'0%,40%': {
  					transform: 'translateY(0)'
  				},
  				'20%': {
  					transform: 'translateY(-0.25rem)'
  				}
  			}
  		},
  		animation: {
  			'typing-dot-bounce': 'typing-dot-bounce 1.25s ease-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
