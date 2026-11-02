// The blog posts the site builds: Sanity content plus the SEO slugs and overrides from blogMap.ts.
// A local src/content/blog/<newSlug>.md replaces the Sanity post's title, text and fields; the cover and cta still come from blogMap.
import { toHTML } from '@portabletext/to-html';
import type { ImageMetadata } from 'astro';
import { blogMap, redirectedSlugs, type BlogMapEntry } from './blogMap';
import { sanityPosts, sanityImageUrl, type SanityPost } from './sanity';

export interface Post {
	slug: string;
	title: string;
	// The full <title> tag when set, without the " | EyeCheck.app" suffix.
	seoTitle?: string;
	category: string;
	description: string;
	summary: string;
	author: string;
	publishedAt: string;
	updatedAt: string;
	readMinutes: number;
	featured: boolean;
	image: { src: string | ImageMetadata; alt: string; width: number; height: number; remote: boolean } | null;
	html: string;
	toc: { id: string; text: string }[];
	cta?: { text: string; href: string };
}

const covers = import.meta.glob<{ default: ImageMetadata }>('../assets/blog/*', { eager: true });

interface LocalModule {
	frontmatter: {
		title: string;
		seoTitle?: string;
		description: string;
		summary: string;
		author: string;
		category: string;
		publishedAt: string | Date;
		updatedAt: string | Date;
	};
	compiledContent: () => string | Promise<string>;
	getHeadings: () => { depth: number; slug: string; text: string }[];
}

// Top-level files only, so nothing in src/content/blog/_drafts/ is built.
const localModules = import.meta.glob<LocalModule>('../content/blog/*.md', { eager: true });
const dateString = (d: string | Date) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d));

// HTML comments are notes for editors. External links open in a new tab, as in the Sanity renderer. Tables scroll sideways on small screens.
const tidyHtml = (html: string) =>
	html
		.replace(/<!--[\s\S]*?-->\s*/g, '')
		.replace(/<a href="(https?:\/\/[^"]+)"/g, (tag, href: string) => (href.includes('eyecheck.app') ? tag : `${tag} target="_blank" rel="noopener"`))
		.replace(/<table>/g, '<div class="table-wrap"><table>')
		.replace(/<\/table>/g, '</table></div>');

// Keyed by file name, which is the post's newSlug.
const localPosts = new Map(
	await Promise.all(
		Object.entries(localModules).map(async ([file, mod]) => {
			const fm = mod.frontmatter;
			const html = tidyHtml(await mod.compiledContent());
			// Words of text, not Markdown syntax or link URLs.
			const words = html
				.replace(/<[^>]+>/g, ' ')
				.split(/\s+/)
				.filter((w) => /[a-z0-9]/i.test(w)).length;
			const post = {
				title: fm.title,
				seoTitle: fm.seoTitle,
				description: fm.description,
				summary: fm.summary,
				author: fm.author,
				category: fm.category,
				publishedAt: dateString(fm.publishedAt),
				updatedAt: dateString(fm.updatedAt),
				readMinutes: Math.max(1, Math.ceil(words / 200)),
				html,
				// Astro's heading slugs, so the contents links match the h2 ids.
				toc: mod
					.getHeadings()
					.filter((h) => h.depth === 2)
					.map((h) => ({ id: h.slug, text: h.text })),
			};
			return [file.split('/').pop()!.replace(/\.md$/, ''), post] as const;
		}),
	),
);

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const blockText = (block: any) => (block?.children ?? []).map((c: any) => c.text ?? '').join('');
const slugify = (s: string) =>
	s
		.toLowerCase()
		.replace(/[’']/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

// The first ~160 characters, cut at a word.
export const shorten = (text: string, max = 160) => {
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '…';
};

function build(post: SanityPost, entry?: BlogMapEntry): Post {
	const body = post.body ?? [];
	const firstPara = body.findIndex((b) => b._type === 'block' && (!b.style || b.style === 'normal') && blockText(b).trim());
	const ownSummary = (post.excerpt || post.description || '').trim();
	// Without an excerpt, the first paragraph becomes the summary and is not repeated in the article.
	const summary = ownSummary || (firstPara >= 0 ? blockText(body[firstPara]).trim() : '');
	const rendered = ownSummary || firstPara < 0 ? body : body.filter((_, i) => i !== firstPara);

	const toc: Post['toc'] = [];
	const used = new Set<string>();
	const html = toHTML(rendered, {
		components: {
			block: {
				h2: ({ children, value }) => {
					let id = slugify(blockText(value)) || 'section';
					while (used.has(id)) id += '-2';
					used.add(id);
					toc.push({ id, text: blockText(value) });
					return `<h2 id="${id}">${children}</h2>`;
				},
				h3: ({ children }) => `<h3>${children}</h3>`,
			},
			marks: {
				link: ({ children, value }) => {
					const href = String(value?.href ?? '');
					const external = /^https?:\/\//.test(href) && !href.includes('eyecheck.app');
					return `<a href="${escape(href)}"${external ? ' target="_blank" rel="noopener"' : ''}>${children}</a>`;
				},
			},
			types: {
				image: ({ value }) =>
					value?.url
						? `<figure><img src="${sanityImageUrl(value.url, 1200)}" alt="${escape(value.alt ?? '')}" width="${value.width ?? ''}" height="${value.height ?? ''}" loading="lazy" decoding="async" />${value.caption ? `<figcaption>${escape(value.caption)}</figcaption>` : ''}</figure>`
						: '',
			},
		},
	});

	const words = body
		.filter((b) => b._type === 'block')
		.map(blockText)
		.join(' ')
		.split(/\s+/)
		.filter(Boolean).length;

	const slug = entry?.newSlug ?? post.slug;
	const fallbackCover = entry?.cover ? covers[`../assets/blog/${entry.cover}`]?.default : undefined;
	const image: Post['image'] = post.mainImage?.url
		? {
				src: post.mainImage.url,
				alt: post.mainImage.alt || entry?.coverAlt || '',
				width: post.mainImage.width ?? 1200,
				height: post.mainImage.height ?? 800,
				remote: true,
			}
		: fallbackCover
			? { src: fallbackCover, alt: entry?.coverAlt ?? '', width: fallbackCover.width, height: fallbackCover.height, remote: false }
			: null;

	// The local Markdown version, when there is one. Its summary comes from front matter and its body renders in full.
	const local = entry && localPosts.get(entry.newSlug);
	if (local) return { slug, ...local, featured: !!entry.featured, image, cta: entry.cta };

	return {
		slug,
		title: entry?.h1 ?? post.title,
		category: entry?.category ?? post.categories?.[0] ?? 'Eye health',
		description: entry?.description ?? shorten(summary, 155),
		summary,
		author: post.author ?? 'EyeCheck.app',
		publishedAt: post.publishedAt,
		updatedAt: post._updatedAt,
		readMinutes: Math.max(1, Math.ceil(words / 200)),
		featured: !!entry?.featured,
		image,
		html,
		toc,
		cta: entry?.cta,
	};
}

const bySanitySlug = new Map(sanityPosts.map((p) => [p.slug, p]));
const mapped = blogMap
	.filter((e) => e.sanitySlug && bySanitySlug.has(e.sanitySlug))
	.map((e) => build(bySanitySlug.get(e.sanitySlug!)!, e));
const mappedSanity = new Set(blogMap.map((e) => e.sanitySlug));
const others = sanityPosts.filter((p) => !mappedSanity.has(p.slug) && !redirectedSlugs.includes(p.slug)).map((p) => build(p));

// Featured first, then newest first.
export const posts: Post[] = [...mapped, ...others].sort(
	(a, b) => Number(b.featured) - Number(a.featured) || b.publishedAt.localeCompare(a.publishedAt),
);

export const formatDate = (iso: string) =>
	new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const isoDate = (iso: string) => iso.slice(0, 10);
