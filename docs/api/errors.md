---
id: errors
title: Errors
sidebar_label: Errors
description: Full reference for Meridian API error types and error codes.
---

# Errors Reference

See the [Error Handling guide](/docs/concepts/error-handling) for code examples and best practices.

## Error object

```json
{
  "error": {
    "type": "card_error",
    "code": "insufficient_funds",
    "message": "Your card has insufficient funds.",
    "param": "payment_method",
    "request_id": "req_8Xn1A4qZpKvTm2",
    "charge": "ch_ChargeId"
  }
}
```

## Error types

| Type | HTTP status | Description |
|---|---|---|
| `api_error` | 500 | Something went wrong on Meridian's servers. Retry with exponential backoff. |
| `authentication_error` | 401 | Invalid, expired, or missing API key. |
| `card_error` | 402 | The card was declined. The `message` is safe to show to the customer. |
| `idempotency_error` | 409 | Idempotency key reused with different parameters. |
| `invalid_request_error` | 400 | Invalid parameters. Fix the request before retrying. |
| `rate_limit_error` | 429 | Too many requests. Back off and retry. |

## Card decline codes

| Code | Description |
|---|---|
| `card_declined` | Generic decline. Check the `decline_code` field for more detail. |
| `insufficient_funds` | The card has insufficient funds. |
| `lost_card` | The card has been reported lost. |
| `stolen_card` | The card has been reported stolen. |
| `expired_card` | The card is expired. |
| `incorrect_cvc` | The CVC is incorrect. |
| `incorrect_number` | The card number is incorrect. |
| `processing_error` | Error during processing. Retry. |
| `do_not_honor` | Generic decline from the issuing bank. |
| `authentication_required` | 3D Secure authentication is required. |

## Rate limits

The API allows **100 requests per second** per secret key. Exceeding this returns a `429` error. Respect the `Retry-After` header in the response.

## Request IDs

Every API response includes a `request-id` header (e.g., `req_8Xn1A4qZpKvTm2`). Include this in any support request to help the Meridian team trace the exact API call.
