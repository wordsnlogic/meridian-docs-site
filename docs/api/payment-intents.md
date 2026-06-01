---
id: payment-intents
title: Payment Intents
sidebar_label: Payment Intents
description: Create and manage PaymentIntents to accept payments with Meridian.
---

# Payment Intents

A **PaymentIntent** guides you through the process of collecting a payment from your customer. It tracks the lifecycle of every payment attempt, from creation to confirmation to capture, and handles edge cases like authentication, retries, and failures automatically.

## The PaymentIntent object

```json
{
  "id": "pi_3NqX2B4eHqLMHCmD1vC8aKtz",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "customer": "cus_Nk3mHXq7ViGwMz",
  "description": "Pro plan – monthly",
  "client_secret": "pi_3NqX2B4eHqLMHCmD1vC8aKtz_secret_...",
  "payment_method": "pm_1NqX2B4eHqLMHCmD...",
  "livemode": false,
  "metadata": {},
  "created": 1748476800
}
```

### Status values

| Status | Description |
|---|---|
| `requires_payment_method` | Awaiting a payment method. |
| `requires_confirmation` | Ready to be confirmed. |
| `requires_action` | Requires customer action (e.g., 3DS authentication). |
| `processing` | The payment is being processed. |
| `succeeded` | Payment was captured successfully. |
| `canceled` | The PaymentIntent was canceled. |

---

## Create a PaymentIntent

<span className="badge--post">POST</span> `/v1/payment_intents`

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `amount` <span className="param-required">required</span> | integer | Amount in the smallest currency unit (e.g., cents for USD). |
| `currency` <span className="param-required">required</span> | string | Three-letter ISO 4217 currency code (e.g., `usd`). |
| `customer` <span className="param-optional">optional</span> | string | ID of an existing Customer. |
| `description` <span className="param-optional">optional</span> | string | An arbitrary string describing the payment. |
| `payment_method` <span className="param-optional">optional</span> | string | ID of a PaymentMethod to attach to this intent. |
| `confirm` <span className="param-optional">optional</span> | boolean | If `true`, confirm immediately after creation. Default: `false`. |
| `metadata` <span className="param-optional">optional</span> | object | Key-value pairs for storing additional information. |

```bash
curl https://api.meridian.dev/v1/payment_intents \
  -u sk_test_4eC39HqL...: \
  -d amount=2000 \
  -d currency=usd \
  -d customer=cus_Nk3mHXq7ViGwMz \
  -d description="Pro plan – monthly"
```

:::tip
Pass the `client_secret` from the response to your frontend. Use Meridian.js to confirm the payment — this keeps your secret key server-side at all times.
:::

---

## Retrieve a PaymentIntent

<span className="badge--get">GET</span> `/v1/payment_intents/:id`

```bash
curl https://api.meridian.dev/v1/payment_intents/pi_3NqX2B4eHqLMHCmD \
  -u sk_test_4eC39HqL...:
```

---

## Confirm a PaymentIntent

<span className="badge--post">POST</span> `/v1/payment_intents/:id/confirm`

Confirms that your customer intends to pay with the provided payment method.

```bash
curl https://api.meridian.dev/v1/payment_intents/pi_3NqX2B4eHqLMHCmD/confirm \
  -u sk_test_4eC39HqL...: \
  -d payment_method=pm_1NqX2B4eHqLMHCmD
```

---

## Capture a PaymentIntent

<span className="badge--post">POST</span> `/v1/payment_intents/:id/capture`

Captures the funds of an existing uncaptured PaymentIntent (when `capture_method=manual`).

```bash
curl https://api.meridian.dev/v1/payment_intents/pi_3NqX2B4eHqLMHCmD/capture \
  -u sk_test_4eC39HqL...:
```

---

## Cancel a PaymentIntent

<span className="badge--post">POST</span> `/v1/payment_intents/:id/cancel`

Cancels a PaymentIntent. You cannot cancel a PaymentIntent with status `succeeded`.

```bash
curl https://api.meridian.dev/v1/payment_intents/pi_3NqX2B4eHqLMHCmD/cancel \
  -u sk_test_4eC39HqL...:
```

---

## List all PaymentIntents

<span className="badge--get">GET</span> `/v1/payment_intents`

Returns a list of PaymentIntents sorted by creation date. Supports `customer`, `limit`, `starting_after`, and `ending_before` filters.
