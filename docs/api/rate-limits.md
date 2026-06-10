---
id: rate-limits
title: Rate Limits
sidebar_label: Rate Limits
description: Meridian API rate limits and how to handle them.
---

# Rate Limits

The Meridian API limits the number of requests your integration can make per unit of time. Rate limiting prevents overload and ensures consistent performance for all users.

## Default limits

| Key type | Requests per second |
|---|---|
| Secret key (`sk_...`) | 100 |
| Restricted key | 25 |
| Publishable key (`pk_...`) | 25 |

## Response headers

Every API response includes rate limit headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 94
X-RateLimit-Reset: 1748476860
```

| Header | Description |
|---|---|
| `X-RateLimit-Limit` | Total requests allowed per second. |
| `X-RateLimit-Remaining` | Requests remaining in the current window. |
| `X-RateLimit-Reset` | Unix timestamp of when the limit resets. |

## Handling rate limit errors

When you exceed the limit, the API returns HTTP `429`:

```json
{
  "error": {
    "type": "rate_limit_error",
    "message": "Too many requests. Please retry after 1 second."
  }
}
```

Implement exponential backoff with jitter:

```javascript
async function withRetry(fn, maxAttempts = 5) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (err.type !== 'MeridianRateLimitError' || attempt === maxAttempts) throw err;
      const delay = Math.min(1000 * 2 ** attempt + Math.random() * 100, 30000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## Bulk operations

For high-volume operations (e.g., migrating thousands of customers), use the **Batch API** or contact support to discuss temporary limit increases.
