// Cloudflare Worker in front of the static build (wrangler.jsonc: "main" + assets.run_worker_first).
// The same Worker serves staging (*.workers.dev) and production. On staging only, it keeps the site out of
// search engines: robots.txt disallows everything and every response gets X-Robots-Tag: noindex, nofollow.
// eyecheck.app is never touched. env.ASSETS.fetch serves ./dist and still applies public/_redirects.
// Not imported by Astro; wrangler bundles it at deploy time.

interface Env {
	ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const isStaging = url.hostname.endsWith('.workers.dev');
		if (isStaging && url.pathname === '/robots.txt') {
			return new Response('User-agent: *\nDisallow: /\n', {
				headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex, nofollow' },
			});
		}
		const res = await env.ASSETS.fetch(request);
		if (!isStaging) return res;
		const out = new Response(res.body, res);
		out.headers.set('x-robots-tag', 'noindex, nofollow');
		return out;
	},
};
