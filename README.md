# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Blog (Sanity)

Blog posts are read from Sanity (project `s5vozrwc`, dataset `production`) through the public CDN **at build time only**; there is no client-side fetching. Set `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` in the build environment (see `.env.example`).

- `src/data/sanity.ts` runs the query; `src/data/posts.ts` turns posts into pages.
- `src/data/blogMap.ts` maps the new SEO slugs to existing Sanity posts and holds the per-post H1, meta description and call to action.
- Old blog URLs are redirected (301) in `public/_redirects`.

### Rebuild when a post is published

Because posts are fetched at build time, publishing in Sanity only shows on the site after a new build. To make that automatic:

1. In Cloudflare: **Workers & Pages → eyecheck → Settings → Builds → Deploy hooks**, create a hook for the `main` branch and copy its URL.
2. In Sanity: **manage.sanity.io → project s5vozrwc → API → Webhooks → Create webhook**.
   - URL: the Cloudflare deploy hook URL
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Filter: `_type == "post"`
   - HTTP method: `POST`, no payload needed
3. Publish a post and check that a new build starts in Cloudflare.

Until the hook is set up, push any commit to `main` (or retry the latest deployment in Cloudflare) to pick up new posts.
