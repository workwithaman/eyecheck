// Values in [brackets] are placeholders carried over from the wireframes: replace them with real data.
export const site = {
	name: 'EyeCheck',
	reviewer: '[NAME], OD',
	reviewerRole: 'Optometrist',
	peopleScreened: '[N]',
	peopleReferred: '[N]',
	legalEntity: '[Legal entity, country]',
	// YouTube ID of the "How EyeCheck works" video. The player only loads once this is set.
	videoId: '',
	social: {
		youtube: '',
		instagram: '',
		linkedin: '',
	},
};

// Every internal URL lives here. Components and pages link through `routes`, never a literal path.
export const routes = {
	home: '/',
	start: '/screening',
	visualAcuity: '/visual-acuity-test',
	astigmatism: '/astigmatism-test',
	colorBlind: '/color-blind-test',
	colorBlindKids: '/color-blind-test/kids',
	readingGlasses: '/reading-glasses-test',
	lazyEye: '/lazy-eye-test',
	eyeCharts: '/eye-charts',
	chartSnellen: '/eye-charts/snellen',
	chart10Feet: '/eye-charts/10-feet',
	chartPediatric: '/eye-charts/pediatric',
	chartTumblingE: '/eye-charts/tumbling-e',
	schools: '/schools',
	clinics: '/clinics',
	charities: '/charity-support',
	research: '/academic-collaboration',
	donation: '/donation',
	blog: '/blog/',
	about: '/about-us',
	howWeTest: '/how-we-test',
	medicalReview: '/medical-review',
	help: '/help',
	privacy: '/privacy-policy',
	terms: '/tos',
};

export const tests = [
	{
		title: 'Visual acuity test',
		href: routes.visualAcuity,
		img: '/images/test-visual-acuity.svg',
		menu: 'How sharp your vision is',
		desc: 'See how clearly you can make out detail, with a score for each eye.',
	},
	{
		title: 'Astigmatism test',
		href: routes.astigmatism,
		img: '/images/test-astigmatism.svg',
		menu: '1-minute dial test',
		desc: 'A 1-minute dial test that looks for uneven focus.',
	},
	{
		title: 'Color blind test',
		href: routes.colorBlind,
		img: '/images/test-color-blind.svg',
		menu: 'Red-green and blue-yellow',
		desc: 'Ishihara-style plates that check red-green and blue-yellow vision.',
	},
	{
		title: 'Color blind test for kids',
		href: routes.colorBlindKids,
		img: '/images/test-color-blind-kids.svg',
		menu: 'Shapes, from age 3',
		desc: 'Shapes instead of numbers, so children can take part from age 3.',
		kids: true,
		badge: 'Ages 3+',
	},
	{
		title: 'Reading glasses test',
		href: routes.readingGlasses,
		img: '/images/test-reading-glasses.svg',
		menu: 'Find a starting strength',
		desc: 'Find a starting strength for reading glasses.',
	},
	{
		title: 'Lazy eye test',
		href: routes.lazyEye,
		img: '/images/test-lazy-eye.svg',
		menu: 'Signs to check in children',
		desc: 'Signs of lazy eye to look for in children.',
		kids: true,
	},
];

export const charts = [
	{ title: 'Snellen chart', href: routes.chartSnellen },
	{ title: '10-foot chart', href: routes.chart10Feet },
	{ title: 'Pediatric chart', href: routes.chartPediatric },
	{ title: 'Tumbling E chart', href: routes.chartTumblingE },
];

export const orgs = [
	{ title: 'Schools', menuTitle: 'Schools', href: routes.schools, menu: 'Free classroom screening', more: 'Free classroom screening' },
	{ title: 'Clinics', menuTitle: 'Clinics & healthcare', href: routes.clinics, menu: 'Pre-screening and telehealth', more: 'Pre-screening tools' },
	{ title: 'Charities', menuTitle: 'Charities', href: routes.charities, menu: 'Community programmes', more: 'Community programmes' },
	{ title: 'Research', menuTitle: 'Research', href: routes.research, menu: 'Academic collaboration', more: 'Collaborate with us' },
];

export const footerColumns = [
	{
		title: 'Eye tests',
		links: [{ title: 'Online eye test', href: routes.start }, ...tests],
	},
	{
		title: 'Eye charts',
		links: [{ title: 'All printable charts', href: routes.eyeCharts }, ...charts],
	},
	{
		title: 'Organisations',
		links: [...orgs, { title: 'Donate', href: routes.donation }],
	},
	{
		title: 'Company',
		links: [
			{ title: 'About us', href: routes.about },
			{ title: 'How we test', href: routes.howWeTest },
			{ title: 'Medical review', href: routes.medicalReview },
			{ title: 'Blog', href: routes.blog },
			{ title: 'Help & FAQ', href: routes.help },
		],
	},
];

export const legalLinks = [
	{ title: 'Privacy policy', href: routes.privacy },
	{ title: 'Terms of service', href: routes.terms },
];
