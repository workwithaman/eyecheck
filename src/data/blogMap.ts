import { testLink } from './tests';

// New SEO slugs for existing Sanity posts. Each mapped post is built at /blog/<newSlug>/.
// A rewritten article in src/content/blog/<newSlug>.md replaces the Sanity text (see posts.ts); the others are still the old Sanity text.
export interface BlogMapEntry {
	newSlug: string;
	// null = no Sanity post yet: the page is not built, listed or added to the sitemap.
	sanitySlug: string | null;
	category: string;
	// Fallback cover in src/assets/blog/, used only when the Sanity post has no main image.
	cover: string | null;
	// Alt text for the cover when Sanity has none.
	coverAlt?: string;
	featured?: boolean;
	// SEO overrides. Without them the Sanity title is used.
	h1?: string;
	description?: string;
	// Second link in the end-of-post call to action. testLink() falls back to the visual acuity test while a test is switched off.
	cta?: { text: string; href: string };
}

export const blogMap: BlogMapEntry[] = [
	{
		newSlug: '20-20-20-rule',
		sanitySlug: 'screen-time-and-eye-health',
		category: 'Screen time',
		cover: 'child-screen-time.jpeg',
		coverAlt: 'Young boy lying on a sofa with his chin in his hands, watching a tablet propped up on a cushion',
		featured: true,
		// Title, description and body come from src/content/blog/20-20-20-rule.md.
		cta: testLink('visual-acuity-test', 'Try the visual acuity test'),
	},
	{
		newSlug: 'pediatric-vision-screening',
		sanitySlug: 'eye-screening',
		category: 'Children’s vision',
		cover: 'child-screening.jpeg',
		coverAlt: 'Toddler in tinted glasses doing a picture eye test on a tablet with an eye care professional',
		h1: 'Pediatric Vision Screening: What Parents Should Know',
		description:
			'What parents should know about pediatric vision screening: when to screen, what tests check, signs of a problem and how to screen at home.',
		cta: testLink('color-blind-test/kids', 'Colour blind test for kids'),
	},
	{
		newSlug: 'how-often-eye-exam',
		sanitySlug: 'vision-care-adults',
		category: 'Adult vision',
		cover: 'tech-eyes.jpeg',
		coverAlt: 'Reading glasses beside leafy greens, omega-3 capsules and a calendar of doctor appointments',
		h1: 'How Often Should You Get an Eye Exam?',
		description:
			'How often you should get an eye exam at every age, from children to adults over 60, and the signs that mean you should go sooner.',
		cta: testLink('reading-glasses-test', 'Reading glasses test'),
	},
	// TODO: no Sanity post yet.
	{ newSlug: 'presbyopia-symptoms', sanitySlug: null, category: 'Adult vision', cover: null },
];

// Old Sanity slugs that now redirect (see public/_redirects), so they are never built under their old URL.
export const redirectedSlugs = ['screen-time-and-eye-health', 'eye-screening', 'vision-care-adults', 'tech-revolution', 'tech-access-eye-care'];
