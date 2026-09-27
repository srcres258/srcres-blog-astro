import { getCollection, type CollectionEntry } from 'astro:content';
import { isLocale, type Locale } from './config';

export type BlogPost = CollectionEntry<'blog'>;

export interface LocalizedPost {
	locale: Locale;
	/** Slug inside the locale folder: `hello` for `en/hello.md`. */
	slug: string;
	post: BlogPost;
}

/** Posts live at `src/content/blog/<locale>/<slug>.md`, so ids look like `en/hello`. */
function parsePostId(id: string): { locale: Locale; slug: string } | undefined {
	const [maybeLocale, ...rest] = id.split('/');
	if (!isLocale(maybeLocale) || rest.length === 0) {
		return undefined;
	}
	return { locale: maybeLocale, slug: rest.join('/') };
}

export function toLocalizedPost(post: BlogPost): LocalizedPost | undefined {
	const parsed = parsePostId(post.id);
	return parsed ? { ...parsed, post } : undefined;
}

function byNewestFirst(a: LocalizedPost, b: LocalizedPost): number {
	return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
}

export async function getLocalizedPosts(locale: Locale): Promise<LocalizedPost[]> {
	const posts = await getCollection('blog');
	return posts
		.map(toLocalizedPost)
		.filter((entry): entry is LocalizedPost => entry?.locale === locale)
		.sort(byNewestFirst);
}

/**
 * Every locale that actually has a post with this slug, so hreflang links and
 * the language switcher never point at a page that does not exist.
 */
export async function getPostTranslations(
	slug: string,
): Promise<Partial<Record<Locale, LocalizedPost>>> {
	const posts = await getCollection('blog');
	const translations: Partial<Record<Locale, LocalizedPost>> = {};

	for (const post of posts) {
		const entry = toLocalizedPost(post);
		if (entry && entry.slug === slug) {
			translations[entry.locale] = entry;
		}
	}

	return translations;
}

/** Locale-relative paths of each existing translation, for `<Layout alternates>`. */
export function postAlternates(
	translations: Partial<Record<Locale, LocalizedPost>>,
): Partial<Record<Locale, string>> {
	const alternates: Partial<Record<Locale, string>> = {};

	for (const [locale, entry] of Object.entries(translations)) {
		if (entry) {
			alternates[locale as Locale] = `blog/${entry.slug}/`;
		}
	}

	return alternates;
}
