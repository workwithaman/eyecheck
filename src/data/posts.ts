// The blog posts the site builds: Sanity content plus the SEO slugs and overrides from blogMap.ts.
import { toHTML } from '@portabletext/to-html';
import type { ImageMetadata } from 'astro';
import { blogMap, redirectedSlugs, type BlogMapEntry } from './blogMap';
import { sanityPosts, sanityImageUrl, type SanityPost } from './sanity';

export interface Post {
	slug: string;
	title: string;
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
	const local = entry?.cover ? covers[`../assets/blog/${entry.cover}`]?.default : undefined;
	const image: Post['image'] = post.mainImage?.url
		? {
				src: post.mainImage.url,
				alt: post.mainImage.alt || entry?.coverAlt || '',
				width: post.mainImage.width ?? 1200,
				height: post.mainImage.height ?? 800,
				remote: true,
			}
		: local
			? { src: local, alt: entry?.coverAlt ?? '', width: local.width, height: local.height, remote: false }
			: null;

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
