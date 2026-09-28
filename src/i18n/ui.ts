import type { Locale } from './config';

/**
 * UI strings for the site chrome. Post content does not belong here — it lives
 * in the `blog` content collection under `src/content/blog/<locale>/`.
 *
 * `zh-cn` defines the key set; every other locale is checked against it.
 */
const zhCN = {
	'site.description': '关于编程、系统、工具与 Web 的个人笔记。',
	'site.lede':
		'有善始者实繁，能克终者盖寡。',
	'nav.main': '主导航',
	'nav.home': '首页',
	'nav.language': '语言',
	'home.recentPosts': '最新文章',
	'footer.builtWith': '使用 Astro 构建。',
} as const;

export type UIKey = keyof typeof zhCN;

const en = {
	'site.description': 'Personal notes on programming, systems, tools, and the web.',
	'site.lede':
		'Do one thing and do it well.',
	'nav.main': 'Main navigation',
	'nav.home': 'Home',
	'nav.language': 'Language',
	'home.recentPosts': 'Recent posts',
	'footer.builtWith': 'Built with Astro.',
} as const satisfies Record<UIKey, string>;

export const ui = {
	'zh-cn': zhCN,
	en,
} as const satisfies Record<Locale, Record<UIKey, string>>;
