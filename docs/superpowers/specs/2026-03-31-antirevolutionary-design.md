# antirevolutionary.org — Design Spec

**Date:** 2026-03-31
**Status:** Approved

---

## Overview

Bootstrap a new Nuxt 3 application called `antirevolutionary` to serve as the brand and content site for `antirevolutionary.org`. The site will combine a landing page with editorial content, deployed to Vercel with automatic deploys on push to `main`.

---

## Architecture

- **Framework:** Nuxt 3 with SSR enabled (default)
- **Component Library:** Nuxt UI (Tailwind CSS-based, auto-configures Tailwind — no manual `tailwind.config.ts` needed)
- **Content Layer:** Nuxt Content (MDC/Markdown)
- **Hosting:** Vercel — serverless/edge SSR, deploy on push; Nitro preset: `vercel` (auto-detected)
- **Domain:** antirevolutionary.org (custom domain via Vercel)
- **Repo:** GitHub personal account, repo name `antirevolutionary`
- **Package Manager:** pnpm
- **Node.js Version:** 20 LTS (pinned via `.nvmrc` and `package.json` `engines` field)

---

## Project Structure

```
antirevolutionary/
├── content/
│   ├── index.md              # Landing page content
│   └── articles/             # Editorial content files
├── pages/
│   ├── index.vue             # Landing page
│   └── articles/
│       └── [...slug].vue     # Dynamic article routes
├── components/               # Shared UI components
├── layouts/
│   └── default.vue           # Site shell (nav, footer)
├── public/                   # Static assets
├── app.vue
└── nuxt.config.ts            # SSR on, @nuxt/ui and @nuxt/content declared
```

---

## Key Configuration

**nuxt.config.ts**
- SSR: enabled (default, no override needed)
- Modules: `@nuxt/ui`, `@nuxt/content`
- No `vercel.json` required — Vercel auto-detects Nuxt 3

---

## Content Model

Content lives in `/content` as Markdown/MDC files. Pages retrieve and render content via Nuxt Content's `queryCollection` composable.

- `content/index.md` — drives landing page copy
- `content/articles/*.md` — individual editorial pieces, rendered via `[...slug].vue`

**Article frontmatter schema** (required fields for each article):

```yaml
---
title: string
date: YYYY-MM-DD
description: string
---
```

---

## Environment Variables

- No environment variables required at bootstrap
- Local development uses `.env` (gitignored)
- Production env vars managed via Vercel project dashboard

---

## Vercel & Domain Setup

1. Push repo to GitHub (personal account, `antirevolutionary`)
2. Import project in Vercel — link to GitHub repo
3. Vercel auto-configures Nuxt 3 build (`nuxt build`, output: `.output`)
4. Enable deploy on push to `main`
5. Add `antirevolutionary.org` as custom domain in Vercel project settings
6. Update DNS at registrar: point A record / CNAME to Vercel's provided values

---

## Out of Scope (for now)

- Visual design / branding (to be designed separately)
- Authentication
- CMS integration
- Analytics
