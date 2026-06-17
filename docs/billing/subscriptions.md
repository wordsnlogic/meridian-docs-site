---
id: subscriptions
title: Subscriptions
sidebar_label: Subscriptions
description: Create recurring billing with Products, Prices, and Subscriptions in Meridian.
---

# Subscriptions

Subscriptions let you charge customers on a recurring basis — monthly, annually, or on any custom interval. Meridian handles invoicing, payment retries, dunning, and cancellations automatically.

## How subscriptions work

A subscription ties three objects together:

1. **Product** — what you're selling (e.g., "Pro Plan")
2. **Price** — the cost, currency, and billing interval (e.g., $49/month)
3. **Customer** — who you're charging

When a subscription is active, Meridian automatically generates an Invoice at the start of each billing period and attempts to collect payment.

## Create a subscription

### Step 1 — Create a Product

```bash
curl https://api.meridian.dev/v1/products \
  -u sk_test_4eC39HqL...: \
  -d name="Pro Plan" \
  -d description="Unlimited projects and priority support"
```

### Step 2 — Create a Price

```bash
curl https://api.meridian.dev/v1/prices \
  -u sk_test_4eC39HqL...: \
  -d product=prod_Abc123 \
  -d unit_amount=4900 \
  -d currency=usd \
  -d "recurring[interval]"=month
```

### Step 3 — Subscribe the customer

```javascript
const subscription = await meridian.subscriptions.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  items: [{ price: 'price_XyzAbc456' }],
});

console.log(subscription.status); // 'active'
```

## Subscription statuses

| Status | Description |
|---|---|
| `incomplete` | Initial payment pending. |
| `incomplete_expired` | Initial payment failed; subscription expired. |
| `trialing` | In a free trial period. |
| `active` | Paid and up to date. |
| `past_due` | Latest invoice payment failed; retrying. |
| `canceled` | Subscription was canceled. |
| `unpaid` | All retries exhausted; subscription suspended. |
| `paused` | Billing paused manually. |

## Cancel a subscription

```javascript
// Cancel immediately
await meridian.subscriptions.cancel('sub_Xyz123');

// Cancel at end of current billing period
await meridian.subscriptions.update('sub_Xyz123', {
  cancel_at_period_end: true,
});
```

## Listen for subscription events

Subscribe to these webhook events to keep your app in sync:

| Event | When to act |
|---|---|
| `customer.subscription.created` | Provision access for new subscriber |
| `customer.subscription.updated` | Update access on plan change |
| `customer.subscription.deleted` | Revoke access on cancellation |
| `invoice.paid` | Confirm renewal succeeded |
| `invoice.payment_failed` | Notify customer of failed payment |

:::tip
Always use webhooks to gate access — don't rely solely on polling `subscription.status` at login time.
:::

## Extra Heading

Adding test content.