---
id: charges
title: Charges
sidebar_label: Charges
description: API reference for Charge objects in Meridian.
---

# Charges

A **Charge** represents a single payment attempt against a card or other payment source. In most modern integrations, Charges are created automatically when a PaymentIntent is confirmed — you don't create them directly.

## The Charge object

```json
{
  "id": "ch_3NqX2B4eHqLMHCmD1vC8",
  "object": "charge",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "paid": true,
  "refunded": false,
  "amount_refunded": 0,
  "customer": "cus_Nk3mHXq7ViGwMz",
  "payment_intent": "pi_3NqX2B4eHqLMHCmD",
  "receipt_email": "priya@example.com",
  "description": "Pro plan – monthly",
  "outcome": {
    "risk_level": "normal",
    "risk_score": 14,
    "type": "authorized"
  },
  "created": 1748476800,
  "livemode": false
}
```

## Retrieve a Charge

<span className="badge--get">GET</span> `/v1/charges/:id`

```bash
curl https://api.meridian.dev/v1/charges/ch_3NqX2B4eHqLMHCmD \
  -u sk_test_4eC39HqL...:
```

## List all Charges

<span className="badge--get">GET</span> `/v1/charges`

```bash
curl "https://api.meridian.dev/v1/charges?customer=cus_Nk3mHXq7ViGwMz&limit=10" \
  -u sk_test_4eC39HqL...:
```

| Parameter | Type | Description |
|---|---|---|
| `customer` | string | Filter by customer ID. |
| `payment_intent` | string | Filter by PaymentIntent ID. |
| `limit` | integer | 1–100, default 10. |

## Capture a Charge

<span className="badge--post">POST</span> `/v1/charges/:id/capture`

Captures an uncaptured charge (when `capture_method: 'manual'` was set on the PaymentIntent).

```bash
curl -X POST https://api.meridian.dev/v1/charges/ch_3NqX2B4eHqLMHCmD/capture \
  -u sk_test_4eC39HqL...: \
  -d amount=1500
```
