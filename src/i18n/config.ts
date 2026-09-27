/**
 * Locales the site ships in. Keys are used as URL prefixes and as the folder
 * names under `src/content/blog/`, so they must match
 * `i18n.locales` in `astro.config.mjs` exactly.
 */
export const locales = {
	'zh-cn': {
		label: '简体中文',
		/** Value for the `lang` attribute and for `hreflang`. */
		htmlLang: 'zh-CN',
	},
	en: {
		label: 'English',
		htmlLang: 'en',
	},
} as const;

export type Locale = keyof typeof locales;

/** The default locale is the one served without a URL prefix. */
export const defaultLocale = 'zh-cn' as const satisfies Locale;

export const localeCodes = Object.keys(locales) as Locale[];

export function isLocale(value: string | undefined): value is Locale {
	return value !== undefined && Object.hasOwn(locales, value);
}
