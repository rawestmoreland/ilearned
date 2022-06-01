module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'rich-black': '#000814',
				'oxford-blue': '#001D3D',
				'prussian-blue': '#003566',
				'mikado-yellow': '#FFC300',
				'gold-web': '#FFD60A',
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
				'main-background':
					"url('../public/images/main-background.svg')",
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
