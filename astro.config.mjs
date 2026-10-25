// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Utility and noindex pages that must stay out of the sitemap. Everything under /temp/ is excluded too.
const notInSitemap = ['/result/', '/testimonial/', '/testimonial-approve/', '/thank-you/', '/unsubscribe/', '/404/', '/404'];

// https://astro.build/config
export default defineConfig({
	site: 'https://eyecheck.app',
	integrations: [
		sitemap({
			filter: (page) => {
				const path = new URL(page).pathname;
				return !path.startsWith('/temp/') && !notInSitemap.includes(path);
			},
		}),
	],
});
