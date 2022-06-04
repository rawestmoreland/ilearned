const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		screens: {
			'xs': '475px',
			...defaultTheme.screens,
		},
		extend: {
			colors: {
				'cod-gray': '#111111',
				'rich-black': '#000814',
				'oxford-blue': '#001D3D',
				'prussian-blue': '#003566',
				'mikado-yellow': '#FFC300',
				'gold-web': '#FFD60A',
				'terracotta': '#e46e5e',
				'off-white': '#F5F5F5',
			},
			container: {
				screens: {
					sm: '960px',
					md: '960px',
					lg: '1200px',
					xl: '1600px',
				},
				center: true,
				padding: {
					DEFAULT: '1rem',
					md: '2rem',
				},
			},
			backgroundImage: {
				'main-background': "url('/images/main-background.svg')",
			},
			fontFamily: {
				'big-shoulders': ['"Big Shoulders Display"', 'sans-serif'],
				'rubik': ['Rubik', 'sans-serif'],
				'merriweather': ['Merriweather', 'serif'],
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
