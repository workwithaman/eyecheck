// Placeholder post list from the wireframes. To be replaced by the CMS feed.
export interface Post {
	slug: string;
	title: string;
	category: string;
	summary?: string;
	toc?: string[];
	sections?: [heading: string, body: string][];
}

export const posts: Post[] = [
	{
		slug: '20-20-20-rule',
		title: 'The 20-20-20 Rule: How to Reduce Eye Strain From Screens',
		category: 'Screen time',
		summary: '[Answer-first summary: every 20 minutes, look 20 feet away for 20 seconds. Why it works, in one line.]',
		toc: [
			'What is the 20-20-20 rule?',
			'Why it helps',
			'Symptoms of digital eye strain',
			'Does it work?',
			'Other ways to reduce strain',
			'When to see an eye doctor',
		],
		sections: [
			['What is the 20-20-20 rule?', '[Body paragraph]'],
			['Why it helps your eyes', '[Body paragraph]'],
			['Symptoms of digital eye strain', '[Bulleted list]'],
			['Does the 20-20-20 rule actually work?', '[Evidence, cited]'],
			['When to see an eye doctor', '[Red flags]'],
		],
	},
	{ slug: 'pediatric-vision-screening', title: 'Pediatric Vision Screening: What Parents Should Know', category: 'Children’s vision' },
	{ slug: 'how-often-eye-exam', title: 'How Often Should You Get an Eye Exam?', category: 'Adult vision' },
	{ slug: 'presbyopia-symptoms', title: 'Presbyopia Symptoms: Signs You Need Reading Glasses', category: 'Adult vision' },
];
