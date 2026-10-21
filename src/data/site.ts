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
	// Profile URLs for the footer and home page social links. Until one is set, its icon links nowhere.
	social: {
		facebook: '',
		instagram: '',
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
	result: '/result',
	thankYou: '/thank-you',
	unsubscribe: '/unsubscribe',
	testimonial: '/testimonial',
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
	{ title: 'Snellen chart', href: routes.chartSnellen, img: '/images/test-visual-acuity.svg', menu: 'Letters, for 20 ft' },
	{ title: '10-foot chart', href: routes.chart10Feet, img: '/images/eye-charts.svg', menu: 'For smaller rooms' },
	{ title: 'Pediatric chart', href: routes.chartPediatric, img: '/images/test-color-blind.svg', menu: 'Picture shapes, ages 3–6', kids: true },
	{ title: 'Tumbling E chart', href: routes.chartTumblingE, img: '/images/eye-charts.svg', menu: 'No reading needed' },
];

// `icon` is the inner markup of a 24×24 stroke icon.
export const orgs = [
	{
		title: 'Schools',
		menuTitle: 'Schools',
		href: routes.schools,
		menu: 'Free classroom vision screening',
		more: 'Free classroom screening',
		icon: '<path d="M2 9l10-5 10 5-10 5z"></path><path d="M6 11v5c3 2 9 2 12 0v-5"></path>',
	},
	{
		title: 'Clinics',
		menuTitle: 'Clinics & healthcare',
		href: routes.clinics,
		menu: 'Pre-screening and telehealth',
		more: 'Pre-screening tools',
		icon: '<path d="M6 3v6a4 4 0 0 0 8 0V3"></path><path d="M10 13v3a4 4 0 0 0 8 0v-2"></path><circle cx="18" cy="12" r="2"></circle>',
	},
	{
		title: 'Charities',
		menuTitle: 'Charities',
		href: routes.charities,
		menu: 'Screening for community programmes',
		more: 'Community programmes',
		icon: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"></path>',
	},
	{
		title: 'Research',
		menuTitle: 'Research',
		href: routes.research,
		menu: 'Academic collaboration and data',
		more: 'Collaborate with us',
		icon: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"></path>',
	},
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
