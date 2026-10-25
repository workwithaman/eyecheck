import { testLink } from './tests';

// New SEO slugs for existing Sanity posts. Each mapped post is built at /blog/<newSlug>/.
// NOTE: the article bodies are the old Sanity text for now; full rewrites for these keywords will replace them in Sanity later.
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
		coverAlt: 'Young child lying on a sofa watching a tablet',
		featured: true,
		h1: 'The 20-20-20 Rule: How to Reduce Eye Strain From Screens',
		description:
			'The 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds. How it reduces digital eye strain for adults and children.',
		cta: testLink('astigmatism-test', 'Try the astigmatism test'),
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
