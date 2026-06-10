---
id: pagination-ref
title: Pagination
sidebar_label: Pagination
description: Reference for Meridian API cursor-based pagination.
---

# Pagination Reference

All list endpoints use **cursor-based pagination**. See the [Pagination guide](/docs/concepts/pagination) for detailed examples.

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `limit` | integer | Number of objects to return (1–100). Default: `10`. |
| `starting_after` | string | Return objects after this ID (page forward). |
| `ending_before` | string | Return objects before this ID (page backward). |

## Response format

```json
{
  "object": "list",
  "data": [...],
  "has_more": true,
  "url": "/v1/customers"
}
```

## Example

```bash
# Page 1
curl "https://api.meridian.dev/v1/customers?limit=10" \
  -u sk_test_4eC39HqL...:

# Page 2 (use last id from page 1)
curl "https://api.meridian.dev/v1/customers?limit=10&starting_after=cus_LastIdFromPage1" \
  -u sk_test_4eC39HqL...:
```
