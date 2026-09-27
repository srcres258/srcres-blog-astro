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
		'关于编程、系统、工具与 Web 的个人笔记。这个站点刻意保持朴素：以文字为主、静态页面、速度快，样式只用一个受 Bear Blog 启发的小型 CSS 层。',
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
		'Personal notes on programming, systems, tools, and the web. This site is intentionally plain: mostly text, fast static pages, and a small CSS layer inspired by Bear Blog.',
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
