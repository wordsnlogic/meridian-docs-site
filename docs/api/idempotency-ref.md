---
id: idempotency-ref
title: Idempotency
sidebar_label: Idempotency
description: Reference for Meridian API idempotency keys.
---

# Idempotency Reference

See the [Idempotency guide](/docs/concepts/idempotency) for a detailed explanation. This page is a quick reference.

## Usage

Pass a unique `Idempotency-Key` header on any `POST` request:

```bash
curl https://api.meridian.dev/v1/payment_intents \
  -u sk_test_4eC39HqL...: \
  -H "Idempotency-Key: a84f2b3e-91d0-4c7a-b1d5-82a3e9f1b4c8" \
  -d amount=2000 \
  -d currency=usd
```

## Key properties

| Property | Value |
|---|---|
| Header name | `Idempotency-Key` |
| Recommended format | UUID v4 |
| Max length | 255 characters |
| Cache duration | 24 hours |
| Applies to | `POST` requests only |

## Error response for key collision

```json
{
  "error": {
    "type": "idempotency_error",
    "message": "Keys must be unique — this key was already used with different request parameters."
  }
}
```
