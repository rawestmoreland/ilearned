import { en, fr } from 'date-fns/locale';
import { getPosts } from './api';

export const localeMap = {
  en: en,
  'fr-FR': fr,
};

export const flags = {
  en: '🇺🇸',
  'fr-FR': '🇫🇷',
  'es-MX': '🇲🇽',
};

export function localizePath(page) {
  const { locale, defaultLocale, slug, pageName } = page;
  if (locale === defaultLocale) {
    return `/${pageName ? pageName + '/' : ''}${slug}`;
  }

  return `/${locale}${pageName ? '/' + pageName : ''}${slug ? '/' + slug : ''}`;
}

export function getLocalizedPaths(page) {
  const paths = page.locales.map(locale => {
    return {
      locale,
      href: localizePath({ ...page, locale }),
    };
  });

  return paths;
}
