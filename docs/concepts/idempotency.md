---
id: idempotency
title: Idempotency
sidebar_label: Idempotency
description: How to use idempotency keys to safely retry API requests without creating duplicates.
---

# Idempotency

The Meridian API supports **idempotent requests** — you can safely retry a `POST` call without worrying about creating duplicate objects, charges, or subscriptions.

## How it works

Include an `Idempotency-Key` header on any `POST` request. Meridian caches the result of that request for 24 hours. If you send the same key again with the same parameters, you get the original cached response instead of creating a new object.

```bash
curl https://api.meridian.dev/v1/payment_intents \
  -u sk_test_4eC39HqL...: \
  -H "Idempotency-Key: a84f2b3e-91d0-4c7a-b1d5-82a3e9f1b4c8" \
  -d amount=2000 \
  -d currency=usd
```

## When to use idempotency keys

Use idempotency keys on **every `POST` request** that creates or modifies a resource:

- Creating a PaymentIntent
- Creating a Customer
- Creating a Subscription
- Issuing a Refund

`GET` and `DELETE` requests are inherently idempotent and don't need keys.

## Generating idempotency keys

A good idempotency key is:

- **Unique per request attempt** — tied to the specific user action (e.g., a user clicking "Pay")
- **Stable across retries** — same key for the same logical operation
- A UUID v4 is a good default

```javascript
import { v4 as uuidv4 } from 'uuid';

// Generate once per user action, store in session/DB
const idempotencyKey = uuidv4();

const paymentIntent = await meridian.paymentIntents.create(
  {
    amount: 2000,
    currency: 'usd',
    customer: customerId,
  },
  {
    idempotencyKey: idempotencyKey,
  }
);
```

## Key collision behavior

If you send the same idempotency key with **different parameters**, Meridian returns a `409 Conflict` error. This prevents accidental changes to existing requests.

```json
{
  "error": {
    "type": "idempotency_error",
    "message": "Keys must be unique — this key was used with different request parameters."
  }
}
```

## Expiration

Idempotency keys are cached for **24 hours**. After that, the same key can be used for a new request.
