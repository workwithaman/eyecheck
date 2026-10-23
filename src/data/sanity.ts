// Reads published blog posts from Sanity at build time, through the public CDN (no token needed).
// Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET in the build environment (see .env.example).
const projectId: string = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 's5vozrwc';
const dataset: string = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2023-05-03';

export interface SanityImage {
	url: string;
	alt?: string | null;
	width?: number;
	height?: number;
}

export interface SanityPost {
	title: string;
	slug: string;
	publishedAt: string;
	_updatedAt: string;
	author?: string | null;
	categories?: string[] | null;
	mainImage?: SanityImage | null;
	excerpt?: string | null;
	description?: string | null;
	body: any[];
}

const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
	title,
	"slug": slug.current,
	publishedAt,
	_updatedAt,
	"author": author->name,
	"categories": categories[]->title,
	"mainImage": mainImage{ "url": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height },
	excerpt,
	description,
	"body": body[]{
		...,
		_type == "image" => { ..., "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }
	}
}`;

async function query<T>(groq: string): Promise<T> {
	const path = `/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(groq)}`;
	// The CDN first; the live API as a fallback. Each is tried up to 3 times before giving up.
	const hosts = [`https://${projectId}.apicdn.sanity.io`, `https://${projectId}.api.sanity.io`];
	let lastError: unknown;
	for (const host of hosts) {
		for (let attempt = 1; attempt <= 3; attempt++) {
			try {
				const res = await fetch(host + path, { signal: AbortSignal.timeout(20_000) });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return ((await res.json()) as { result: T }).result;
			} catch (err) {
				lastError = err;
				console.warn(`[eyecheck] Sanity query to ${host} failed (attempt ${attempt}): ${err}`);
				await new Promise((r) => setTimeout(r, 1000 * attempt));
			}
		}
	}
	// Fail the build rather than publish an empty blog.
	throw new Error(`[eyecheck] Could not load blog posts from Sanity: ${lastError}`);
}

// Fetched once per build and shared by every page that imports it.
export const sanityPosts: SanityPost[] = await query<SanityPost[]>(POSTS_QUERY);

// Sanity image CDN URL at a given width, converted to WebP or AVIF where the browser supports it.
export const sanityImageUrl = (url: string, width: number) => `${url}?w=${width}&auto=format&fit=max`;
