---
id: expanding-objects
title: Expanding Objects
sidebar_label: Expanding Objects
description: How to expand nested objects in Meridian API responses.
---

# Expanding Objects

By default, nested objects in API responses are returned as just their ID. Use the `expand[]` parameter to inline the full object in a single request.

## Example: expand a Customer on a Subscription

Without expansion:

```json
{
  "id": "sub_1NqX2B4e",
  "customer": "cus_Nk3mHXq7ViGwMz"
}
```

With `expand[]=customer`:

```json
{
  "id": "sub_1NqX2B4e",
  "customer": {
    "id": "cus_Nk3mHXq7ViGwMz",
    "email": "priya@example.com",
    "name": "Priya Sharma"
  }
}
```

## Usage

```bash
curl "https://api.meridian.dev/v1/subscriptions/sub_1NqX2B4e?expand[]=customer&expand[]=latest_invoice" \
  -u sk_test_4eC39HqL...:
```

```javascript
const subscription = await meridian.subscriptions.retrieve('sub_1NqX2B4e', {
  expand: ['customer', 'latest_invoice.payment_intent'],
});
```

## Nested expansion

Use dot notation to expand objects nested inside other objects:

```
expand[]=latest_invoice.payment_intent
expand[]=latest_invoice.payment_intent.payment_method
```

## Limits

- Maximum 4 levels of nesting
- Maximum 10 expansions per request
