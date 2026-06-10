---
id: how-we-built-this
title: How We Built This Docs Site
sidebar_label: How We Built This
description: A step-by-step guide to replicating the Meridian docs site using Docusaurus, GitHub Actions, and Netlify.
---

# How We Built This Docs Site

This page documents the full process for building the Meridian documentation site — from a blank folder to a deployed, versioned, searchable docs site. Everything here is reproducible for any technical writing or developer documentation project.

## What we built

- A Docusaurus v3 site with two sidebars (Docs + API Reference)
- 54 fully-written Markdown content pages
- A Changelog powered by Docusaurus's blog feature
- A custom homepage matching a Stripe-style design
- Algolia search integration
- Dark mode support
- GitHub Actions CI/CD pipeline
- One-command deployment to Netlify with PR preview URLs

---

## What you need first

- [Node.js](https://nodejs.org) version 18 or 20
- A free [GitHub](https://github.com) account
- A free [Netlify](https://netlify.com) account

---

## Step 1 — Scaffold a new Docusaurus site

Open Terminal and run:

```bash
npx create-docusaurus@latest my-docs-site classic --typescript
cd my-docs-site
```

This creates the default starter. You will replace the content in the next steps.

---

## Step 2 — Configure the site

Edit `docusaurus.config.ts` and replace the placeholder values with your own. The key things to set:

```ts
const config: Config = {
  title: 'Your Product Docs',
  tagline: 'Everything you need to integrate our API.',
  url: 'https://your-docs-site.netlify.app',
  baseUrl: '/',

  colorMode: {
    respectPrefersColorScheme: true,   // enables dark mode
  },

  announcementBar: {
    content: '<strong>New in v2.4:</strong> Async webhooks. <a href="/changelog">Read the notes →</a>',
    backgroundColor: '#EEF0FB',
    textColor: '#1A1F36',
    isCloseable: true,
  },
};
```

To turn the blog into a **Changelog**, set `routeBasePath`:

```ts
blog: {
  routeBasePath: 'changelog',
  blogTitle: 'Changelog',
  blogDescription: 'Product updates and release notes.',
},
```

To add **Algolia search**, add the `algolia` block to `themeConfig` and get a free key at [docsearch.algolia.com](https://docsearch.algolia.com):

```ts
algolia: {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'your_docs',
  contextualSearch: true,
},
```

---

## Step 3 — Build your sidebar

Edit `sidebars.ts`. Each string in the `items` array maps to a file path inside the `docs/` folder.

```ts
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'quickstart',
        'authentication',
        'test-mode',
        'go-live-checklist',
      ],
    },
    {
      type: 'category',
      label: 'Payments',
      items: [
        'payments/accept-a-payment',
        'payments/refunds',
        'payments/disputes',
      ],
    },
  ],

  apiSidebar: [
    {
      type: 'category',
      label: 'Core Resources',
      collapsed: false,
      items: [
        'api/customers',
        'api/payment-intents',
      ],
    },
  ],
};
```

To add a second sidebar to the navbar, reference it in `docusaurus.config.ts`:

```ts
navbar: {
  items: [
    { type: 'docSidebar', sidebarId: 'docsSidebar', label: 'Docs' },
    { type: 'docSidebar', sidebarId: 'apiSidebar', label: 'API Reference' },
  ],
},
```

---

## Step 4 — Brand the theme

Edit `src/css/custom.css`. Override the Docusaurus color variables to match your brand:

```css
:root {
  --ifm-color-primary: #5469D4;       /* your main brand color */
  --ifm-color-primary-dark: #4459c9;
  --ifm-color-primary-light: #6478d9;
  --ifm-font-family-monospace: 'Fira Code', monospace;
}

[data-theme='dark'] {
  --ifm-color-primary: #7B91E8;       /* lighter shade for dark mode */
}
```

---

## Step 5 — Build a custom homepage

Replace the default `src/pages/index.tsx` with your own React component. The pattern used here:

1. A dark gradient hero section with a headline and CTA buttons
2. Grid sections of card links pointing to key docs pages
3. A companion `index.module.css` file for scoped styles

The homepage is React — not Markdown — so you have full control over layout.

---

## Step 6 — Write your docs

Create Markdown files in `docs/` organized in subfolders matching your sidebar:

```
docs/
  quickstart.md
  authentication.md
  payments/
    accept-a-payment.md
    refunds.md
  api/
    customers.md
    payment-intents.md
```

Every file starts with frontmatter:

```md
---
id: customers
title: Customers
sidebar_label: Customers
description: One sentence for search engines and link previews.
---
```

### Multi-language code tabs

````md
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="node" label="Node.js" default>

    ```javascript
    const customer = await meridian.customers.create({ email: 'user@example.com' });
    ```

  </TabItem>
  <TabItem value="python" label="Python">

    ```python
    customer = meridian.Customer.create(email="user@example.com")
    ```

  </TabItem>
</Tabs>
````

### Callout boxes

```md
:::tip
This is a tip.
:::

:::warning
This is a warning.
:::

:::danger
This is a danger notice.
:::
```

---

## Step 7 — Set up the Changelog

Name blog files with the date prefix:

```
blog/
  2026-05-15-v2-4-release.md
  2026-03-10-v2-3-release.md
```

Use frontmatter to set metadata:

```md
---
slug: v2-4-release
title: "v2.4 — Async Webhooks and Dead-Letter Queues"
date: 2026-05-15
tags: [release, webhooks]
---

Summary sentence shown on the changelog index.

{/* truncate */}

## Full release notes here...
```

The `{/* truncate */}` marker is where the preview cuts off on the index page.

---

## Step 8 — Add a Netlify config

Create `netlify.toml` at the root of your project:

```toml
[build]
  command   = "npm run build"
  publish   = "build"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from   = "/docs"
  to     = "/docs/quickstart"
  status = 302

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Step 9 — Set up GitHub Actions

Create two workflow files in `.github/workflows/`.

**`ci.yml`** — runs on every pull request:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run build
```

**`deploy.yml`** — deploys to Netlify on push to `main` and posts preview URLs on PRs:

```yaml
name: Deploy to Netlify
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: nwtgck/actions-netlify@v3
        with:
          publish-dir: ./build
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy — ${{ github.sha }}"
          enable-pull-request-comment: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` as secrets in your GitHub repo under **Settings → Secrets and variables → Actions**.

---

## Step 10 — Initialize Git and deploy

```bash
git init
git add .
git commit -m "Initial docs site"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Then in Netlify:
1. Click **Add new site → Import an existing project**
2. Connect your GitHub account and select the repo
3. Netlify detects `netlify.toml` automatically — click **Deploy**

Every push to `main` after this will auto-deploy. Every pull request gets a unique preview URL posted as a comment.

---

## Project structure reference

```
my-docs-site/
├── docs/                        # All Markdown content
│   ├── quickstart.md
│   ├── authentication.md
│   ├── payments/
│   ├── billing/
│   ├── webhooks/
│   ├── compliance/
│   ├── concepts/
│   └── api/
├── blog/                        # Changelog entries
├── src/
│   ├── css/custom.css           # Brand colors and overrides
│   └── pages/index.tsx          # Custom homepage
├── static/                      # Images, favicon
├── .github/workflows/           # CI/CD pipelines
├── docusaurus.config.ts         # Main site config
├── sidebars.ts                  # Sidebar structure
└── netlify.toml                 # Deployment config
```

---

## Tools used

| Tool | Purpose |
|---|---|
| [Docusaurus v3](https://docusaurus.io) | Static site generator for documentation |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [Netlify](https://netlify.com) | Hosting and deployment |
| [Algolia DocSearch](https://docsearch.algolia.com) | Full-text search (free for public docs) |
| [nwtgck/actions-netlify](https://github.com/nwtgck/actions-netlify) | GitHub Action for Netlify deploys |
