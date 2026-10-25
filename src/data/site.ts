// Values in [brackets] are placeholders carried over from the wireframes: replace them with real data.
import { liveStats } from './live';
import { liveTests } from './tests';

export const site = {
	name: 'EyeCheck',
	reviewer: '[NAME], OD',
	reviewerRole: 'Optometrist',
	// Read from the backend at build time (see live.ts).
	peopleScreened: liveStats.peopleScreened,
	peopleReferred: liveStats.peopleReferred,
	statsNote: 'Data updated October 2025. Based on anonymised screening results.',
	// The company that runs EyeCheck.app, shown in the footer legal line.
	company: { name: 'Potential Dynamics Pte Ltd', country: 'Singapore', uen: '202516281E', url: 'https://www.potentialdynamics.org' },
	// The home page video. Details match the YouTube listing; they also feed the VideoObject schema.
	video: {
		id: 'fom8Sd_yakE',
		title: 'How to Use EyeCheck.app – Free Online Eye Screening Tool for Kids & Adults',
		channel: 'Potential Dynamics',
		uploadDate: '2025-07-21T09:01:07-07:00',
		duration: 'PT0M53S',
		poster: '/images/video-poster.jpg',
	},
	// Profile URLs for the footer and home page social links. Until one is set, its icon links nowhere.
	social: {
		facebook: '',
		instagram: '',
	},
};

// The build date, for "Last updated" lines on pages without a date of their own.
const buildIso = new Date().toISOString().slice(0, 10);
export const buildDate = {
	iso: buildIso,
	text: new Date(`${buildIso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
};

// Andy Teo's practice. TODO CONFIRM WITH ANDY: practice URL; "#" until he sends it.
export const PRACTICE_URL = '#';

// EyeCheck's creator, shown on the home page and used as the Organization founder in JSON-LD.
export const creator = {
	name: 'Andy Teo',
	title: 'Developmental Optometrist, FCOVD',
	practice: 'Vision and Perception Practice',
	// TODO: replace with Andy's photo when he sends it (square, at least 400×400).
	photo: '/images/andy-teo-placeholder.svg',
};
export const founderSchema = {
	'@type': 'Person',
	name: creator.name,
	jobTitle: 'Developmental Optometrist',
	worksFor: { '@type': 'Organization', name: creator.practice },
};

// Every internal URL lives here. Components and pages link through `routes`, never a literal path.
export const routes = {
	home: '/',
	start: '/screening/',
	// Eye test pages other than this one come from src/data/tests.ts, so they can be switched on and off.
	visualAcuity: '/visual-acuity-test/',
	eyeCharts: '/eye-charts/',
	chartSnellen: '/eye-charts/snellen/',
	chart10Feet: '/eye-charts/10-feet/',
	chartPediatric: '/eye-charts/pediatric/',
	chartTumblingE: '/eye-charts/tumbling-e/',
	schools: '/schools/',
	clinics: '/clinics/',
	charities: '/charity-support/',
	research: '/academic-collaboration/',
	donation: '/donation/',
	blog: '/blog/',
	about: '/about-us/',
	howWeTest: '/how-we-test/',
	medicalReview: '/medical-review/',
	help: '/help/',
	privacy: '/privacy-policy/',
	terms: '/tos/',
	result: '/result/',
	thankYou: '/thank-you/',
	unsubscribe: '/unsubscribe/',
	testimonial: '/testimonial/',
};

// Only the live eye tests (src/data/tests.ts holds the switch). Header menus, the footer and the home grid use this.
export const tests = liveTests;

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
			{ title: 'Contact', href: `${routes.about}#contact` },
			{ title: 'support@eyecheck.app', href: 'mailto:support@eyecheck.app' },
		],
	},
];

export const legalLinks = [
	{ title: 'Privacy policy', href: routes.privacy },
	{ title: 'Terms of service', href: routes.terms },
];
