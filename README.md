# Meridian Docs

A fully-featured developer documentation site built with [Docusaurus v3](https://docusaurus.io), deployed on [Netlify](https://netlify.com). This is the live demo project for the **State of Docs** talk — showing how a technical writer can build, version, and deploy a production-ready docs site without being a software engineer.

**Live site:** [meridian-docs.netlify.app](https://meridian-docs.netlify.app)

---

> **Attendees:** Follow the steps below to download this project and run it on your own computer. No coding experience required — just copy and paste each command.

---

## What's in this repo

- **54 fully-written documentation pages** covering a fictional payments API
- **Custom homepage** styled after Stripe's developer docs
- **Changelog** powered by Docusaurus's built-in blog feature
- **Two-sidebar navigation** — Docs and API Reference
- **GitHub Actions CI/CD** — auto-deploys to Netlify on every push, preview URLs on every pull request
- **Dark mode** support out of the box

---

## Before you start — install the prerequisites

You need two tools installed on your computer. Check whether you already have them.

### Check for Node.js

Open Terminal (Mac: press `Cmd + Space`, type `Terminal`, press Enter) and run:

```bash
node --version
```

If you see something like `v20.11.0`, you already have it. If you see `command not found`, go to [nodejs.org](https://nodejs.org) and download the **LTS** version. Run the installer, then close and reopen Terminal.

### Check for Git

```bash
git --version
```

If you see `command not found`, go to [git-scm.com](https://git-scm.com/downloads) and install it.

---

<!-- SCREENSHOT: Terminal window showing "node --version" and "git --version" returning version numbers -->

---

## Step 1 — Clone the repo

In Terminal, run this command. It downloads the entire project to your computer:

```bash
git clone https://github.com/YOUR-USERNAME/meridian-docs-site.git
```

> Replace `YOUR-USERNAME` with the actual GitHub username where the repo is hosted.

You should see output like this:

```
Cloning into 'meridian-docs-site'...
remote: Enumerating objects: 312, done.
remote: Counting objects: 100%...
Receiving objects: 100%... done.
```

---

<!-- SCREENSHOT: Terminal showing git clone completing successfully -->

---

## Step 2 — Move into the project folder

```bash
cd meridian-docs-site
```

Your Terminal prompt should now show you're inside the `meridian-docs-site` folder.

---

## Step 3 — Install dependencies

```bash
npm install
```

This downloads everything Docusaurus needs to run. It takes about 60 seconds the first time.

> **Important:** You must run this step every time you clone or move the project. Never copy the `node_modules` folder to a new location — the paths break. Always regenerate it with `npm install`.

When it finishes, you'll see something like:

```
added 1,147 packages in 58s
```

No errors = good. A few warnings is normal.

---

<!-- SCREENSHOT: Terminal showing npm install completing with "added X packages" -->

---

## Step 4 — Start the local development server

```bash
npm start
```

Your browser will open automatically at `http://localhost:3000` and you'll see the Meridian docs site running on your computer.

---

<!-- SCREENSHOT: Browser showing the Meridian docs homepage at localhost:3000 -->

---

## Step 5 — Try editing a page

1. Open the project folder in any text editor. [VS Code](https://code.visualstudio.com) is recommended and free.
2. Open the file `docs/quickstart.md`
3. Change any line of text
4. Save the file
5. Look at your browser — it updates **instantly** without restarting anything

This is the core of the docs-as-code workflow: write Markdown, see changes in real time.

---

<!-- SCREENCAST: Screen recording showing a file edited in VS Code and the browser hot-reloading live -->

---

## Folder structure

Here's what each folder and file does:

```
meridian-docs-site/
│
├── docs/                   ← All documentation pages (Markdown files)
│   ├── quickstart.md
│   ├── authentication.md
│   ├── concepts/           ← Conceptual overview pages
│   ├── payments/           ← Payments-specific guides
│   ├── billing/            ← Billing and invoicing guides
│   ├── webhooks/           ← Webhook integration guides
│   ├── compliance/         ← PCI, SCA, fraud docs
│   └── api/                ← Full API reference (25 pages)
│
├── blog/                   ← Changelog entries (named by date)
│   ├── 2026-05-15-v2-4-release.md
│   └── 2026-03-10-v2-3-release.md
│
├── src/
│   ├── css/custom.css      ← Brand colors and style overrides
│   └── pages/index.tsx     ← Custom homepage (React component)
│
├── static/                 ← Images, favicon, downloadable files
│
├── .github/workflows/      ← GitHub Actions CI/CD pipelines
│   ├── ci.yml              ← Runs type check + build on every PR
│   └── deploy.yml          ← Deploys to Netlify on push to main
│
├── docusaurus.config.ts    ← Main site config (title, URL, nav, search)
├── sidebars.ts             ← Sidebar navigation structure
└── netlify.toml            ← Netlify deployment settings
```

---

## Useful commands

Run these inside the `meridian-docs-site` folder.

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (required after cloning) |
| `npm start` | Start local dev server at localhost:3000 |
| `npm run build` | Build the production-ready site into `build/` |
| `npm run clear` | Clear the cache (fixes most weird errors) |

---

## Deploy your own copy to Netlify

## Algolia search

To enable Algolia DocSearch locally, copy the example env file and add your keys:

```bash
cp .env.example .env
# Edit .env and set ALGOLIA_APP_ID and ALGOLIA_API_KEY
```

Restart the dev server after updating the file:

```bash
npm start
```

Follow these steps to put your version of the site live on the internet for free.

### 1 — Push to GitHub

1. Go to [github.com](https://github.com) and sign up for a free account if you don't have one
2. Click **+** → **New repository**
3. Name it `meridian-docs-site`, set it to **Public**, leave it completely empty, click **Create repository**
4. Copy the repo URL it shows you

Then in Terminal:

```bash
git remote add origin https://github.com/YOUR-USERNAME/meridian-docs-site.git
git push -u origin main
```

---

<!-- SCREENSHOT: GitHub showing the new empty repo page with the URL to copy -->

---

### 2 — Create a Netlify account

Go to [netlify.com](https://netlify.com) and click **Sign up with GitHub**. This connects both accounts automatically.

### 3 — Connect the repo and deploy

1. In the Netlify dashboard click **Add new site → Import an existing project**
2. Choose **GitHub** and select `meridian-docs-site`
3. Netlify detects the `netlify.toml` config automatically — don't change any settings
4. Click **Deploy site**

Your site will be live at a `*.netlify.app` URL in about 2 minutes.

---

<!-- SCREENSHOT: Netlify dashboard showing a successful deploy with the live URL -->

---

### 4 — Activate automatic deploys (optional)

To enable auto-deploy on push and preview URLs on pull requests, add two secrets to your GitHub repo.

**Get your Netlify credentials:**
- **Site ID** → Netlify → Site settings → General → Site details
- **Auth token** → Netlify → User settings → Applications → New access token

**Add them to GitHub:**

GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Where to find the value |
|---|---|
| `NETLIFY_SITE_ID` | Netlify → Site settings → General |
| `NETLIFY_AUTH_TOKEN` | Netlify → User settings → Applications |

After this, every push to `main` auto-deploys and every pull request gets a live preview URL posted as a comment automatically.

---

## Troubleshooting

**`npm start` throws errors after you moved or copied the project folder**

The `node_modules` folder breaks when you move it. Fix:

```bash
rm -rf node_modules
npm install
npm start
```

**Browser doesn't open automatically**

Manually go to `http://localhost:3000` in your browser.

**Port 3000 is already in use**

Something else is already running on that port. Either stop it, or Docusaurus will ask if you want to use port 3001 instead — type `Y` and press Enter.

**`npm run build` fails with a red error**

Run `npm run clear` first, then try the build again:

```bash
npm run clear
npm run build
```

---

## Want to build your own docs site from scratch?

See [docs/how-we-built-this.md](docs/how-we-built-this.md) for a full step-by-step guide — from a blank folder to a deployed docs site, covering every config file and design decision.

---

## About this project

Built as a live demo for **State of Docs — May 7, 2026**, a [Write the Docs Bay Area](https://luma.com/l8cr9nhw) event.

Presenter: **Doug Purcell** — Technical Writer, [Words n Logic](https://wordsandlogic.com)
