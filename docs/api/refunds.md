---
id: refunds
title: Refunds
sidebar_label: Refunds
description: API reference for creating and retrieving Refund objects in Meridian.
---

# Refunds API

Refunds return funds to a customer's original payment method. See the [Refunds guide](/docs/payments/refunds) for a full walkthrough.

## The Refund object

```json
{
  "id": "re_3NqX2B4eHqLMHCmD",
  "object": "refund",
  "amount": 2000,
  "currency": "usd",
  "charge": "ch_3NqX2B4eHqLMHCmD",
  "payment_intent": "pi_3NqX2B4eHqLMHCmD",
  "reason": "customer_request",
  "status": "succeeded",
  "created": 1748476800
}
```

## Create a Refund

<span className="badge--post">POST</span> `/v1/refunds`

| Parameter | Type | Description |
|---|---|---|
| `charge` | string | ID of the charge to refund. |
| `payment_intent` | string | ID of the PaymentIntent to refund. |
| `amount` | integer | Amount to refund in cents. Omit for a full refund. |
| `reason` | string | `customer_request`, `duplicate`, or `fraudulent`. |

```bash
curl https://api.meridian.dev/v1/refunds \
  -u sk_test_4eC39HqL...: \
  -d charge=ch_3NqX2B4eHqLMHCmD \
  -d amount=500 \
  -d reason=customer_request
```

## Retrieve a Refund

<span className="badge--get">GET</span> `/v1/refunds/:id`

```bash
curl https://api.meridian.dev/v1/refunds/re_3NqX2B4e \
  -u sk_test_4eC39HqL...:
```

## List all Refunds

<span className="badge--get">GET</span> `/v1/refunds`

```bash
curl "https://api.meridian.dev/v1/refunds?charge=ch_3NqX2B4eHqLMHCmD" \
  -u sk_test_4eC39HqL...:
```
