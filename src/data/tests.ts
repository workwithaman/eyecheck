// The one switch for which eye tests are live. Menus, cards, link lists and the test pages themselves read from here:
// a test with live: false gets no page (see src/pages/[...test].astro) and no links anywhere on the site.
// To switch a test on, set live: true. Page code lives in src/pages/_tests/ (Astro doesn't route _ folders).

export interface EyeTest {
	// URL path without slashes, e.g. "color-blind-test/kids".
	slug: string;
	live: boolean;
	title: string;
	img: string;
	// Short line under the title in the header menu.
	menu: string;
	// One-line description on cards.
	desc: string;
	kids?: boolean;
	badge?: string;
}

export const allTests: EyeTest[] = [
	{
		slug: 'visual-acuity-test',
		live: true,
		title: 'Visual acuity test',
		img: '/images/test-visual-acuity.svg',
		menu: 'How sharp your vision is',
		desc: 'See how clearly you can make out detail, with a score for each eye.',
	},
	{
		slug: 'astigmatism-test',
		live: false,
		title: 'Astigmatism test',
		img: '/images/test-astigmatism.svg',
		menu: '1-minute dial test',
		desc: 'A 1-minute dial test that looks for uneven focus.',
	},
	{
		slug: 'color-blind-test',
		live: false,
		title: 'Color blind test',
		img: '/images/test-color-blind.svg',
		menu: 'Red-green and blue-yellow',
		desc: 'Ishihara-style plates that check red-green and blue-yellow vision.',
	},
	{
		slug: 'color-blind-test/kids',
		live: false,
		title: 'Color blind test for kids',
		img: '/images/test-color-blind-kids.svg',
		menu: 'Shapes, from age 3',
		desc: 'Shapes instead of numbers, so children can take part from age 3.',
		kids: true,
		badge: 'Ages 3+',
	},
	{
		slug: 'reading-glasses-test',
		live: false,
		title: 'Reading glasses test',
		img: '/images/test-reading-glasses.svg',
		menu: 'Find a starting strength',
		desc: 'Find a starting strength for reading glasses.',
	},
	{
		slug: 'lazy-eye-test',
		live: false,
		title: 'Lazy eye test',
		img: '/images/test-lazy-eye.svg',
		menu: 'Signs to check in children',
		desc: 'Signs of lazy eye to look for in children.',
		kids: true,
	},
];

export const testHref = (slug: string) => `/${slug}/`;

// The live tests, with their URL, for menus and card grids.
export const liveTests = allTests.filter((t) => t.live).map((t) => ({ ...t, href: testHref(t.slug) }));

export const isLive = (slug: string) => allTests.some((t) => t.slug === slug && t.live);

// The visual acuity test is always live; it's the fallback wherever a link would point to a test that isn't.
export const fallbackTest = { title: 'Visual acuity test', href: testHref('visual-acuity-test') };

// A link to a test, or to the fallback test while that test is switched off. `text` is used only when the test is live.
export const testLink = (slug: string, text: string) =>
	isLive(slug) ? { text, href: testHref(slug) } : { text: `Try the ${fallbackTest.title.toLowerCase()}`, href: fallbackTest.href };
