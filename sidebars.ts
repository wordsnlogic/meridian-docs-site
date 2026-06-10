import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
      label: 'Core Concepts',
      items: [
        'concepts/how-meridian-works',
        'concepts/payment-lifecycle',
        'concepts/idempotency',
        'concepts/error-handling',
        'concepts/pagination',
      ],
    },
    {
      type: 'category',
      label: 'Payments',
      items: [
        'payments/accept-a-payment',
        'payments/save-a-card',
        'payments/refunds',
        'payments/disputes',
      ],
    },
    {
      type: 'category',
      label: 'Subscriptions & Billing',
      items: [
        'billing/subscriptions',
        'billing/trials-and-upgrades',
        'billing/invoices',
        'billing/send-an-invoice',
        'billing/proration',
      ],
    },
    {
      type: 'category',
      label: 'Payouts',
      items: [
        'payouts/overview',
        'payouts/bank-accounts',
        'payouts/debit-cards',
      ],
    },
    {
      type: 'category',
      label: 'Webhooks',
      items: [
        'webhooks/overview',
        'webhooks/register-endpoint',
        'webhooks/verify-signatures',
        'webhooks/event-types',
        'webhooks/retry-logic',
      ],
    },
    {
      type: 'category',
      label: 'Security & Compliance',
      items: [
        'compliance/fraud-and-risk',
        'compliance/pci-dss',
        'compliance/global-compliance',
      ],
    },
    {
      type: 'category',
      label: 'About This Project',
      items: [
        'how-we-built-this',
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
        'api/payment-methods',
        'api/charges',
        'api/refunds',
      ],
    },
    {
      type: 'category',
      label: 'Billing',
      items: [
        'api/subscriptions',
        'api/subscription-items',
        'api/invoices',
        'api/invoice-items',
        'api/products',
        'api/prices',
        'api/coupons',
        'api/tax-rates',
      ],
    },
    {
      type: 'category',
      label: 'Connect',
      items: [
        'api/accounts',
        'api/transfers',
        'api/payouts',
        'api/topups',
      ],
    },
    {
      type: 'category',
      label: 'Webhooks & Events',
      items: [
        'api/webhook-endpoints',
        'api/events',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'api/errors',
        'api/rate-limits',
        'api/pagination-ref',
        'api/idempotency-ref',
        'api/expanding-objects',
        'api/versioning',
      ],
    },
  ],
};

export default sidebars;
