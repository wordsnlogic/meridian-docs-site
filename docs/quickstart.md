---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
description: Make your first API call and accept a test payment in under 5 minutes.
---

# Quickstart

Make your first API call and accept a test payment in under 5 minutes.

:::info
This guide uses **test mode**. No real money is moved. You'll need a free Meridian account to get your test API keys.
:::

## Step 1 — Create an account and get your API keys

Sign up at [dashboard.meridian.dev](https://dashboard.meridian.dev). After verifying your email, navigate to **Developers → API Keys**. You'll see two key pairs:

- `sk_test_...` — Secret key (keep this private; server-side only)
- `pk_test_...` — Publishable key (safe to use client-side)

:::warning
Never expose your secret key in client-side code, public repositories, or logs. Treat it like a password.
:::

## Step 2 — Install the SDK

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="node" label="Node.js" default>

```bash
npm install @meridian/sdk
# or
yarn add @meridian/sdk
```

  </TabItem>
  <TabItem value="python" label="Python">

```bash
pip install meridian
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```bash
gem install meridian
```

  </TabItem>
  <TabItem value="go" label="Go">

```bash
go get github.com/meridian-fintech/meridian-go
```

  </TabItem>
</Tabs>

## Step 3 — Initialize the client

Import the SDK and initialize it with your secret key. Store your key in an environment variable — never hard-code it.

<Tabs>
  <TabItem value="node" label="Node.js" default>

```javascript
import { Meridian } from '@meridian/sdk';

const meridian = new Meridian(process.env.MERIDIAN_SECRET_KEY);
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import meridian

meridian.api_key = os.environ.get("MERIDIAN_SECRET_KEY")
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby
require 'meridian'
Meridian.api_key = ENV['MERIDIAN_SECRET_KEY']
```

  </TabItem>
</Tabs>

## Step 4 — Create a customer

Before accepting a payment, create a [Customer](/docs/api/customers) object to represent the person paying. This lets you associate payments, subscriptions, and invoices with a single user.

<Tabs>
  <TabItem value="node" label="Node.js" default>

```javascript
const customer = await meridian.customers.create({
  email: 'priya@example.com',
  name: 'Priya Sharma',
  metadata: {
    user_id: 'usr_8821'
  }
});

console.log(customer.id); // cus_Nk3mHXq7...
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
customer = meridian.Customer.create(
    email="priya@example.com",
    name="Priya Sharma",
    metadata={"user_id": "usr_8821"}
)

print(customer.id)  # cus_Nk3mHXq7...
```

  </TabItem>
  <TabItem value="curl" label="curl">

```bash
curl https://api.meridian.dev/v1/customers \
  -u sk_test_4eC39HqL...: \
  -d email="priya@example.com" \
  -d name="Priya Sharma" \
  -d "metadata[user_id]"="usr_8821"
```

  </TabItem>
</Tabs>

## Step 5 — Create a PaymentIntent

A **PaymentIntent** tracks a payment from creation through confirmation. Set `amount` in the smallest currency unit (cents for USD).

<Tabs>
  <TabItem value="node" label="Node.js" default>

```javascript
const paymentIntent = await meridian.paymentIntents.create({
  amount: 2000,           // $20.00
  currency: 'usd',
  customer: customer.id,
  description: 'Pro plan – monthly'
});

console.log(paymentIntent.client_secret);
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
payment_intent = meridian.PaymentIntent.create(
    amount=2000,
    currency="usd",
    customer=customer.id,
    description="Pro plan – monthly"
)
```

  </TabItem>
  <TabItem value="curl" label="curl">

```bash
curl https://api.meridian.dev/v1/payment_intents \
  -u sk_test_4eC39HqL...: \
  -d amount=2000 \
  -d currency=usd \
  -d customer=cus_Nk3mHXq7ViGwMz
```

  </TabItem>
</Tabs>

:::tip
Pass the `client_secret` to your frontend to confirm the payment using Meridian.js — this keeps your secret key server-side at all times.
:::

## Step 6 — Test with a test card

Use these test card numbers to simulate different scenarios. Use any future expiry date, any 3-digit CVC, and any billing ZIP code.

| Card number | Scenario | Details |
|---|---|---|
| `4242 4242 4242 4242` | ✅ Success | Standard successful payment |
| `4000 0000 0000 9995` | ❌ Declined | Insufficient funds |
| `4000 0025 0000 3155` | 🔐 3D Secure | Requires authentication |

---

## What's next?

- [Set up webhooks](/docs/webhooks/overview) — listen for events like `payment_intent.succeeded`
- [Build subscriptions](/docs/billing/subscriptions) — create recurring billing
- [Explore the API Reference](/docs/api/customers) — full endpoint documentation
- [Go-live checklist](/docs/go-live-checklist) — before switching to live mode
