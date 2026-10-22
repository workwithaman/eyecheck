// Figures and testimonials from the EyeCheck backend, read once at build time so they are in the static HTML.
// No client-side fetch: search engines see the same numbers visitors do.
import { BACKEND_URL as API } from './backend';

async function get<T>(path: string): Promise<T | null> {
	try {
		const res = await fetch(API + path, { signal: AbortSignal.timeout(10_000) });
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		return (await res.json()) as T;
	} catch (err) {
		console.warn(`[eyecheck] Could not load ${path} at build time, using fallback: ${err}`);
		return null;
	}
}

// Used only if the backend is unreachable during the build: the last figures published (October 2025).
const FALLBACK = { individuals_screened: 8417, cases_referred: 348 };

const stats = await get<{ id: string; value: number }[]>('/statistics');
const figure = (id: keyof typeof FALLBACK) => {
	const value = Array.isArray(stats) ? stats.find((s) => s.id === id)?.value : undefined;
	return (typeof value === 'number' && value > 0 ? value : FALLBACK[id]).toLocaleString('en-US');
};

export const liveStats = {
	peopleScreened: figure('individuals_screened'),
	peopleReferred: figure('cases_referred'),
};

export interface Testimonial {
	name: string;
	role: string;
	message: string;
	rating: number;
	approved: boolean;
	created_at: string;
}

// Approved testimonials only, newest three. There are no fallback quotes: with none, the section is left out.
const rows = await get<Testimonial[]>('/testimonials');
export const testimonials = (Array.isArray(rows) ? rows : [])
	.filter((t) => t.approved === true && t.message?.trim())
	.sort((a, b) => b.created_at.localeCompare(a.created_at))
	.slice(0, 3);
