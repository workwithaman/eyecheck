import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Legal pages (privacy policy, terms of service), written in Markdown and rendered by LegalPage.astro.
const legal = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/legal' }),
	schema: z.object({
		title: z.string(),
		// YYYY-MM-DD.
		effectiveDate: z.string(),
		lastUpdated: z.string(),
		// Plain-language bullets shown in the summary box above the sections.
		summary: z.array(z.string()),
		description: z.string(),
	}),
});

export const collections = { legal };
