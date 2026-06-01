---
id: pagination
title: Pagination
sidebar_label: Pagination
description: How to paginate through large lists of Meridian API objects.
---

# Pagination

All top-level API resources that return lists — Customers, Charges, Invoices, etc. — use **cursor-based pagination**.

## Response format

Every list response has this shape:

```json
{
  "object": "list",
  "data": [ /* array of objects */ ],
  "has_more": true,
  "url": "/v1/customers"
}
```

| Field | Description |
|---|---|
| `data` | Array of objects for this page. |
| `has_more` | `true` if there are more objects beyond this page. |
| `url` | The URL for this list endpoint. |

## Fetching pages

Use `limit` to control page size (1–100, default 10) and `starting_after` / `ending_before` to paginate forward or backward.

### Page forward

```bash
# Get the first page
curl "https://api.meridian.dev/v1/customers?limit=10" \
  -u sk_test_4eC39HqL...:

# Get the next page (use the last id from the previous response)
curl "https://api.meridian.dev/v1/customers?limit=10&starting_after=cus_Nk3mHXq7ViGwMz" \
  -u sk_test_4eC39HqL...:
```

### Page backward

```bash
curl "https://api.meridian.dev/v1/customers?limit=10&ending_before=cus_Abc123" \
  -u sk_test_4eC39HqL...:
```

## Iterating all records

The SDK handles pagination automatically with auto-pagination helpers:

```javascript
// Automatically fetches all pages
for await (const customer of meridian.customers.list({ limit: 100 })) {
  console.log(customer.id, customer.email);
}
```

```python
# Python equivalent
for customer in meridian.Customer.auto_paging_iter(limit=100):
    print(customer.id, customer.email)
```

:::tip
When iterating all records, use a high `limit` (e.g., `100`) to minimize the number of API requests.
:::
