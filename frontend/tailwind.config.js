module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			container: {
				screens: {
					sm: '960px',
					md: '960px',
					lg: '1024px',
					xl: '1600px',
				},
				center: true,
				padding: {
					DEFAULT: '1rem',
					md: '2rem',
				},
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
