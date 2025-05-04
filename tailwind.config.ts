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
			danger: '#BB2124',
  			text: 'var(--text)',
  			mtext: 'var(--mtext)',
			unprogress: "#3E9295",
  			border: 'var(--border)',
  			ring: 'var(--ring)',
  			ringOffset: 'var(--ring-offset)',
  			primary: '#53C2C6',
			primaryText: "#3E9295",
  			primaryLight: '#D0FBFD',
			pr10: "#E8FDFE",
  			secondaryBlack: '#212121',
			secondary: "#FFDC58",
			secondaryLight: "#FFFAE6",
			success: '#22BB33',
			textGray: "#666",
  			shiki: {
  				light: 'var(--shiki-light)',
  				'light-bg': 'var(--shiki-light-bg)',
  				dark: 'var(--shiki-dark)',
  				'dark-bg': 'var(--shiki-dark-bg)'
  			},
        // Neobrutalism color palette
        neobrutalism: {
          primary: '#53C2C6',
          secondary: '#FFDC58',
          black: '#000000',
          white: '#FFFFFF',
        }
  		},
  		borderRadius: {
  			base: '10px'
  		},
  		boxShadow: {
  			shadow: 'var(--shadow)',
        neobrutalism: '6px 6px 0 0 rgba(0, 0, 0, 1)',
        'neobrutalism-sm': '4px 4px 0 0 rgba(0, 0, 0, 1)',
        'neobrutalism-lg': '8px 8px 0 0 rgba(0, 0, 0, 1)',
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
  			},
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        'pulse-strong': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '0.4' },
        },
        'fade-in-slide-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'grow-from-bottom': {
          '0%': { height: '0' },
          '100%': { height: '100%' },
        },
        'rotate-y': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        }
  		},
  		animation: {
  			'typing-dot-bounce': 'typing-dot-bounce 1.25s ease-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'pulse-strong': 'pulse-strong 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
        'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 7s ease-in-out infinite',
        'fade-in-slide-up': 'fade-in-slide-up 0.7s ease-out forwards',
        'grow-from-bottom': 'grow-from-bottom 1s ease-out forwards',
        'rotate-y': 'rotate-y 0.7s ease-in-out forwards'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
