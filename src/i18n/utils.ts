import { defaultLocale, isLocale, localeCodes, locales, type Locale } from './config';
import { ui, type UIKey } from './ui';

/** The locale a URL belongs to; unprefixed paths are the default locale. */
export function getLocaleFromUrl(url: URL): Locale {
	const [, maybeLocale] = url.pathname.split('/');
	return isLocale(maybeLocale) ? maybeLocale : defaultLocale;
}

/** Strip the locale prefix from a pathname: `/en/blog/x/` -> `/blog/x/`. */
export function getPathFromUrl(url: URL): string {
	const [, maybeLocale, ...rest] = url.pathname.split('/');
	return isLocale(maybeLocale) ? `/${rest.join('/')}` : url.pathname;
}

/**
 * Site-root-relative URL for a path inside a locale. Mirrors
 * `i18n.routing.prefixDefaultLocale: false`.
 */
export function localeUrl(locale: Locale, path = '/'): string {
	const trimmed = path.replace(/^\/+|\/+$/g, '');
	const suffix = trimmed === '' ? '/' : `/${trimmed}/`;
	return locale === defaultLocale ? suffix : `/${locale}${suffix}`;
}

export function useTranslations(locale: Locale) {
	return (key: UIKey): string =>
		(ui[locale] as Record<UIKey, string>)[key] ?? ui[defaultLocale][key];
}

export function localeOptions(): { locale: Locale; label: string }[] {
	return localeCodes.map((locale) => ({ locale, label: locales[locale].label }));
}
