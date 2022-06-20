import { en, fr } from 'date-fns/locale'

export const localeMap = {
	'en': en,
	'fr-FR': fr,
}

export function localizePath(page) {
	const { locale, defaultLocale, slug } = page
	if (locale === defaultLocale) {
		return `/${slug}`
	}

	return `/${locale}${slug ? '/' + slug : ''}`
}

export function getLocalizedPaths(page) {
	const paths = page.locales.map((locale) => {
		return {
			locale,
			href: localizePath({ ...page, locale }),
		}
	})

	return paths
}
