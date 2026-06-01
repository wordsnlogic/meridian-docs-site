---
id: authentication
title: Authentication
sidebar_label: Authentication
description: How API keys work and how to keep your Meridian credentials secure.
---

# Authentication

Meridian uses API keys to authenticate every request. Your API keys are available in the [Dashboard](https://dashboard.meridian.dev) under **Developers → API Keys**.

## Key types

| Key | Prefix | Use |
|---|---|---|
| Secret key | `sk_live_...` / `sk_test_...` | Server-side only. Never expose publicly. |
| Publishable key | `pk_live_...` / `pk_test_...` | Safe for client-side code (Meridian.js, mobile SDKs). |

## Making authenticated requests

Pass your secret key as the username in HTTP Basic Auth. Leave the password blank.

```bash
curl https://api.meridian.dev/v1/customers \
  -u sk_test_4eC39HqL...:
```

With the SDK, set your key once during initialization — all subsequent calls use it automatically:

```javascript
import { Meridian } from '@meridian/sdk';
const meridian = new Meridian(process.env.MERIDIAN_SECRET_KEY);
```

## Test vs. live mode

Every Meridian account has two separate sets of keys:

- **Test mode** (`sk_test_...`) — No real money moves. Use with test card numbers.
- **Live mode** (`sk_live_...`) — Real transactions. Requires account verification.

The API behaves identically in both modes. Objects created in test mode are invisible in live mode and vice versa.

## Security best practices

:::danger
Your secret key can create charges and access all account data. **Treat it like a password.**
:::

- Store keys in environment variables, not in source code
- Never commit keys to version control — use `.gitignore` and a secrets manager
- Rotate keys immediately if they are ever exposed
- Use restricted keys (available in the Dashboard) to limit scope for specific services

## Restricted API keys

For internal services that only need read access or access to a specific resource, create a **Restricted Key** in the Dashboard. Restricted keys can be scoped to:

- Specific resources (e.g., Customers only)
- Specific permissions (read, write, or both)

This follows the principle of least privilege and limits blast radius if a key is compromised.
