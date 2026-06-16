import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const algoliaSearchConfig = {
  // Prefer environment variables and avoid shipping real keys in source.
  appId: process.env.ALGOLIA_APP_ID ?? '',
  apiKey: process.env.ALGOLIA_API_KEY ?? '',
  indexName: process.env.ALGOLIA_INDEX_NAME ?? 'meridian_docs',
  contextualSearch: true,
} as const;

const config: Config = {
  title: 'Meridian Docs',
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: '15B0C32929D983F0',
      },
    },
  ],
  tagline: 'Everything you need to integrate payments, payouts, and embedded banking.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://meridian-docs.netlify.app',
  baseUrl: '/',

  organizationName: 'meridian-fintech',
  projectName: 'meridian-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/meridian-fintech/meridian-docs/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          routeBasePath: 'changelog',
          blogTitle: 'Changelog',
          blogDescription: 'Product updates, API changes, and release notes for Meridian.',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/meridian-social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'v2_4_release',
      content:
        '<strong>New in v2.4:</strong> Async webhook delivery with automatic retry logic and dead-letter queues. <a href="/changelog">Read the release notes →</a>',
      backgroundColor: '#EEF0FB',
      textColor: '#1A1F36',
      isCloseable: true,
    },
    navbar: {
      title: 'Meridian',
      logo: {
        alt: 'Meridian Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
        },
        {
          to: '/changelog',
          label: 'Changelog',
          position: 'left',
        },
        {
          href: 'https://github.com/meridian-fintech/meridian-docs',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://dashboard.meridian.dev',
          label: 'Dashboard →',
          position: 'right',
          className: 'navbar-dashboard-btn',
        },
      ],
    },
    algolia: algoliaSearchConfig,
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Quickstart', to: '/docs/quickstart' },
            { label: 'Authentication', to: '/docs/authentication' },
            { label: 'Test Mode', to: '/docs/test-mode' },
            { label: 'Webhooks', to: '/docs/webhooks/overview' },
          ],
        },
        {
          title: 'API Reference',
          items: [
            { label: 'Customers', to: '/docs/api/customers' },
            { label: 'Payment Intents', to: '/docs/api/payment-intents' },
            { label: 'Subscriptions', to: '/docs/api/subscriptions' },
            { label: 'Invoices', to: '/docs/api/invoices' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Changelog', to: '/changelog' },
            { label: 'Status', href: 'https://status.meridian.dev' },
            { label: 'GitHub', href: 'https://github.com/meridian-fintech/meridian-docs' },
            { label: 'Support', href: 'https://support.meridian.dev' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Meridian Financial Technologies, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'ruby', 'java', 'go', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
