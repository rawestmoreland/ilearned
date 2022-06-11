/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com'],
	},
	reactStrictMode: true,
	i18n: {
		locales: ['en', 'fr-FR', 'es-MX'],
		defaultLocale: 'en',
	},
}

module.exports = nextConfig
