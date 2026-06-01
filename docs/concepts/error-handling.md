---
id: error-handling
title: Error Handling
sidebar_label: Error Handling
description: How to handle API errors and edge cases in your Meridian integration.
---

# Error Handling

The Meridian API uses conventional HTTP response codes and returns structured error objects so your application can handle failures gracefully.

## HTTP status codes

| Code | Meaning |
|---|---|
| `200` | Success — the request worked as expected. |
| `400` | Bad Request — invalid parameters or missing required fields. |
| `401` | Unauthorized — no valid API key provided. |
| `402` | Payment Required — the parameters were valid but the payment failed (e.g., card declined). |
| `403` | Forbidden — the API key doesn't have permission for this action. |
| `404` | Not Found — the requested resource doesn't exist. |
| `409` | Conflict — the request conflicts with another request (e.g., idempotency key reuse). |
| `429` | Too Many Requests — rate limit exceeded. Back off and retry. |
| `500` | Server Error — something went wrong on Meridian's end. Retry with exponential backoff. |

## Error object

All errors return a structured JSON body:

```json
{
  "error": {
    "type": "card_error",
    "code": "insufficient_funds",
    "message": "Your card has insufficient funds.",
    "param": "payment_method",
    "request_id": "req_8Xn1A4qZpKvTm2"
  }
}
```

### Error types

| Type | Description |
|---|---|
| `api_error` | An error on Meridian's servers. Retry with backoff. |
| `authentication_error` | Invalid or missing API key. |
| `card_error` | The card was declined. Show the `message` to your customer. |
| `idempotency_error` | An idempotency key was reused with different parameters. |
| `invalid_request_error` | Invalid parameters. Fix the request before retrying. |
| `rate_limit_error` | Too many requests. Back off and retry. |

### Common card error codes

| Code | Customer-facing message suggestion |
|---|---|
| `card_declined` | Your card was declined. Please try a different card. |
| `insufficient_funds` | Your card has insufficient funds. |
| `expired_card` | Your card has expired. |
| `incorrect_cvc` | Your card's security code is incorrect. |
| `processing_error` | An error occurred while processing your card. Please try again. |

## Handling errors in code

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="node" label="Node.js" default>

```javascript
try {
  const paymentIntent = await meridian.paymentIntents.create({
    amount: 2000,
    currency: 'usd',
    payment_method: 'pm_card_visa_debit_insufficient_funds',
    confirm: true,
  });
} catch (err) {
  switch (err.type) {
    case 'MeridianCardError':
      // Declined — show err.message to the customer
      console.error('Card error:', err.message);
      break;
    case 'MeridianRateLimitError':
      // Too many requests — retry with backoff
      break;
    case 'MeridianInvalidRequestError':
      // Invalid parameters — fix the request
      break;
    case 'MeridianAPIError':
      // Server error — retry with backoff
      break;
    default:
      // Unexpected error
      throw err;
  }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import meridian
from meridian.error import CardError, RateLimitError, InvalidRequestError

try:
    payment_intent = meridian.PaymentIntent.create(
        amount=2000,
        currency="usd",
        confirm=True,
    )
except CardError as e:
    print(f"Card error: {e.user_message}")
except RateLimitError:
    print("Rate limit exceeded — retrying...")
except InvalidRequestError as e:
    print(f"Invalid request: {e}")
```

  </TabItem>
</Tabs>

## Retrying requests

For `429` and `5xx` errors, use exponential backoff:

- Wait 1 second, retry
- Wait 2 seconds, retry
- Wait 4 seconds, retry
- Give up after 3–5 attempts and surface an error to the user

Always include [idempotency keys](/docs/concepts/idempotency) on `POST` requests so retries don't create duplicate objects.
