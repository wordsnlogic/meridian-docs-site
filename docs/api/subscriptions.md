---
id: subscriptions
title: Subscriptions
sidebar_label: Subscriptions
description: API reference for Subscription objects in Meridian.
---

# Subscriptions API

See the [Subscriptions guide](/docs/billing/subscriptions) for a conceptual overview and setup walkthrough.

## The Subscription object

```json
{
  "id": "sub_1NqX2B4eHqLMHCmD",
  "object": "subscription",
  "customer": "cus_Nk3mHXq7ViGwMz",
  "status": "active",
  "current_period_start": 1748476800,
  "current_period_end": 1751068800,
  "cancel_at_period_end": false,
  "items": {
    "object": "list",
    "data": [{ "id": "si_ItemId", "price": { "id": "price_ProMonthly", "unit_amount": 4900 } }]
  },
  "latest_invoice": "in_InvoiceId",
  "created": 1748476800,
  "livemode": false
}
```

## Create a Subscription

<span className="badge--post">POST</span> `/v1/subscriptions`

| Parameter | Type | Description |
|---|---|---|
| `customer` <span className="param-required">required</span> | string | ID of the customer. |
| `items` <span className="param-required">required</span> | array | Array of `{ price: 'price_Id' }` objects. |
| `trial_period_days` | integer | Number of days for a free trial. |
| `cancel_at_period_end` | boolean | If `true`, cancels at end of current period. |
| `proration_behavior` | string | `create_prorations`, `always_invoice`, or `none`. |

```bash
curl https://api.meridian.dev/v1/subscriptions \
  -u sk_test_4eC39HqL...: \
  -d customer=cus_Nk3mHXq7ViGwMz \
  -d "items[0][price]"=price_ProMonthly \
  -d trial_period_days=14
```

## Retrieve a Subscription

<span className="badge--get">GET</span> `/v1/subscriptions/:id`

## Update a Subscription

<span className="badge--post">POST</span> `/v1/subscriptions/:id`

```bash
curl https://api.meridian.dev/v1/subscriptions/sub_1NqX2B4e \
  -u sk_test_4eC39HqL...: \
  -d cancel_at_period_end=true
```

## Cancel a Subscription

<span className="badge--post">POST</span> `/v1/subscriptions/:id/cancel`

```bash
curl -X POST https://api.meridian.dev/v1/subscriptions/sub_1NqX2B4e/cancel \
  -u sk_test_4eC39HqL...:
```

## List all Subscriptions

<span className="badge--get">GET</span> `/v1/subscriptions`

Filter by `customer`, `status`, `price`, or `created` date range.
