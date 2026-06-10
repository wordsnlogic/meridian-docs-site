---
id: versioning
title: Versioning
sidebar_label: Versioning
description: How Meridian API versioning works and how to pin your integration to a specific version.
---

# API Versioning

Meridian uses date-based versioning. Each version corresponds to a release date. When you create an API key, it is pinned to the latest API version at the time.

## Specify a version

Override the version for a specific request using the `Meridian-Version` header:

```bash
curl https://api.meridian.dev/v1/customers \
  -u sk_test_4eC39HqL...: \
  -H "Meridian-Version: 2026-01-15"
```

## Current version

The latest stable API version is **2026-05-01**.

## Version changelog

| Version | Notable changes |
|---|---|
| `2026-05-01` | Added `pause_collection` to Subscriptions; `dead_letter` on WebhookEndpoints |
| `2026-01-15` | Invoices `auto_advance` default changed from `true` to `false` for manual invoices |
| `2025-09-01` | PaymentIntent `automatic_payment_methods` enabled by default |
| `2025-04-01` | `Customer.balance` field added; `account_balance` deprecated |

## Upgrading versions

Review the [Changelog](/changelog) before upgrading. Test your integration in test mode against the new version before changing your production API key version.

To update the version pinned to your API key, go to **Dashboard → Developers → API Keys → Edit**.

:::warning
Upgrading your API key version applies to **all requests** using that key. Test thoroughly before upgrading in production.
:::
