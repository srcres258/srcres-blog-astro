// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Uncomment and set your deployed origin to emit absolute canonical and
	// hreflang URLs (also required by the @astrojs/sitemap integration).
	site: 'https://blog.srcres258.top',
	i18n: {
		locales: ['zh-cn', 'en'],
		defaultLocale: 'zh-cn',
		routing: {
			// The default locale stays unprefixed (`/blog/hello/`), every other
			// locale is prefixed (`/en/blog/hello/`).
			prefixDefaultLocale: false,
		},
	},
});
