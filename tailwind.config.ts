
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-left': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'dim': {
					'0%': { backgroundColor: 'rgba(0,0,0,0)' },
					'100%': { backgroundColor: 'rgba(0,0,0,0.5)' }
				},
				'undim': {
					'0%': { backgroundColor: 'rgba(0,0,0,0.5)' },
					'100%': { backgroundColor: 'rgba(0,0,0,0)' }
				},
				'glow': {
					'0%': { boxShadow: '0 0 0 rgba(34, 197, 94, 0)' },
					'50%': { boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' },
					'100%': { boxShadow: '0 0 0 rgba(34, 197, 94, 0)' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'float': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-20px)', opacity: '0' }
				},
				'spin-half': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(180deg)' }
				},
				'heartbeat': {
					'0%': { transform: 'scale(1)' },
					'15%': { transform: 'scale(1.15)' },
					'30%': { transform: 'scale(1)' },
					'45%': { transform: 'scale(1.15)' },
					'60%': { transform: 'scale(1)' }
				},
				'dripping': {
					'0%': { height: '0', opacity: '0' },
					'20%': { height: '0', opacity: '0' },
					'30%': { height: '10px', opacity: '1' },
					'40%': { height: '15px', opacity: '0', bottom: '-30px' },
					'100%': { height: '0', opacity: '0', bottom: '-15px' }
				},
				'rocket-movement': {
					'100%': { transform: 'translate(1200px,-600px)' }
				},
				'spin-earth': {
					'100%': { transform: 'rotate(-360deg)' }
				},
				'move-astronaut': {
					'100%': { transform: 'translate(-160px, -160px)' }
				},
				'rotate-astronaut': {
					'100%': { transform: 'rotate(-720deg)' }
				},
				'glow-star': {
					'40%': { opacity: '0.3' },
					'90%,100%': { opacity: '1', transform: 'scale(1.2)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'slide-out-left': 'slide-out-left 0.3s ease-out',
				'dim': 'dim 0.3s ease-out forwards',
				'undim': 'undim 0.3s ease-out forwards',
				'glow': 'glow 2s infinite',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'float': 'float 2s ease-out forwards',
				'spin-half': 'spin-half 0.5s forwards',
				'heartbeat': 'heartbeat 1.5s infinite',
				'dripping': 'dripping 5s infinite',
				'rocket-movement': 'rocket-movement 200s linear infinite both running',
				'spin-earth': 'spin-earth 100s infinite linear both',
				'move-astronaut': 'move-astronaut 50s infinite linear both alternate',
				'rotate-astronaut': 'rotate-astronaut 200s infinite linear both alternate',
				'glow-star': 'glow-star 2s infinite ease-in-out alternate'
			},
			typography: (theme: any) => ({
				DEFAULT: {
					css: {
						'h1, h2, h3, h4, h5, h6': {
							position: 'relative',
							scrollMarginTop: '100px',
							'&:hover .anchor': {
								opacity: 1,
							},
						},
						a: {
							color: 'hsl(var(--primary))',
							'&:hover': {
								color: 'hsl(var(--primary))',
							},
						},
						'pre code': {
							backgroundColor: 'transparent',
							padding: 0,
							borderRadius: 0,
						},
						code: {
							fontSize: '0.9em',
							padding: '0.2em 0.4em',
							borderRadius: '0.25rem',
							backgroundColor: 'hsl(var(--muted))',
						},
					},
				},
			}),
		}
	},
	plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;
