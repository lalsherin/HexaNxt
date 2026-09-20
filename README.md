# HexaNxt

> Six minds. One future.

## Project overview

HexaNxt is the company's public website: a single-page, server-rendered search
landing page built with TanStack Start. The UI, branding and the geometric
HexaNxt mark were designed in [Lovable](https://lovable.dev); this repository is
the production-ready source, set up to deploy on Vercel.

## Technology stack

| Layer           | Choice                                           |
| --------------- | ------------------------------------------------ |
| Framework       | TanStack Start 1.168 (React 19, SSR)             |
| Router          | TanStack Router — file-based, `src/routes/`      |
| Build tool      | Vite 8 (via `@lovable.dev/vite-tanstack-config`) |
| Server bundler  | Nitro 3 — `vercel` preset, Build Output API v3   |
| Styling         | Tailwind CSS 4 + shadcn/ui (new-york)            |
| Data            | TanStack Query 5                                 |
| Language        | TypeScript 5.8 (strict)                          |
| Package manager | Bun (`bun.lock` is the lockfile)                 |
| Node.js         | >= 22                                            |

There is no backend, database, authentication or third-party API in this
project. The search box is currently client-side only.

## Local development

```sh
bun install            # or: npm install
bun run dev            # dev server with HMR
```

Other scripts:

```sh
bun run lint           # ESLint + Prettier check
bun run format         # Prettier write
npx tsc --noEmit       # type check
```

## Environment variables

Copy `.env.example` to `.env` and fill in as needed. `.env` is git-ignored.

| Name            | Required                             | Purpose                                                                                                                                                                                                        |
| --------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL` | Optional (recommended in production) | Public origin with no trailing slash, e.g. `https://hexanxt.com`. Used to build absolute `canonical`, `og:url` and `og:image` URLs. When unset, those tags are omitted rather than pointing at a wrong domain. |

Only `VITE_`-prefixed variables reach the browser bundle, so **never** put a
secret, API key or token behind a `VITE_` name. This project currently has no
server-side secrets at all.

## Production build

```sh
bun run build
```

This emits a Vercel Build Output API v3 bundle in `.vercel/output`:

- `.vercel/output/static/` — hashed client assets, favicons, `robots.txt`
- `.vercel/output/functions/__server.func/` — the Node 22 SSR function
- `.vercel/output/config.json` — filesystem-first routing, then SSR catch-all

## Vercel deployment

1. **Push the repository to GitHub.**

   ```sh
   git init                       # only if the repo is not initialised yet
   git add .
   git commit -m "Production-ready HexaNxt site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. **Open Vercel** → <https://vercel.com/new>.

3. **Import the GitHub repository.**

4. **Verify the detected settings.** `vercel.json` pins them, so the import
   screen should show:

   - Framework Preset: **Other**
   - Build Command: `bun run build`
   - Install Command: auto-detected (`bun install`, because `bun.lock` exists)
   - Output Directory: leave empty — the build writes `.vercel/output`

5. **Configure environment variables.** Add `VITE_SITE_URL` for the Production
   environment once the final domain is known. Nothing else is required, and the
   first deploy works without it.

6. **Deploy.**

7. **Verify the production URL.** Check that the page renders, the hexagon mark
   and favicon load, `⌘K` / `Ctrl+K` focuses the search box, and that a hard
   refresh on any URL returns the page rather than a 404.

### Custom domain

The domain can be connected at any time after the first deploy:

1. Vercel → your project → **Settings → Domains → Add**.
2. Enter the domain you bought and follow the DNS records Vercel shows — an
   `A` record for the apex (or Vercel's nameservers) and a `CNAME` for `www`.
3. Wait for DNS propagation; Vercel issues the TLS certificate automatically.
4. Set `VITE_SITE_URL` to the new origin (e.g. `https://hexanxt.com`) and
   redeploy, so canonical and Open Graph URLs point at the real domain.

## Project structure

```
public/              Static files served at the site root
  favicon.ico        Multi-size icon built from the HexaNxt mark
  favicon.png        64px PNG icon
  apple-touch-icon.png
  og-image.png       1200x630 social share card
  robots.txt
src/
  assets/            Images imported through Vite (hashed at build time)
  components/ui/     shadcn/ui primitives
  hooks/             Shared React hooks
  lib/               Utilities — error capture/reporting, site URL helper
  routes/            File-based routes; __root.tsx is the app shell
  router.tsx         Router + QueryClient construction
  server.ts          SSR entry with an error-page fallback
  start.ts           Request middleware (error handling + CSRF)
  styles.css         Tailwind theme and design tokens
vercel.json          Pins the Vercel framework preset and build command
vite.config.ts       Vite + TanStack Start + Nitro (vercel preset)
```

`src/routeTree.gen.ts` is generated by the TanStack Router plugin — do not edit
it by hand.
