---
id: products
title: Products
sidebar_label: Products
description: API reference for Product objects in Meridian.
---

# Products API

Products describe what you're selling. Each Product can have multiple Prices (different billing intervals or currencies). A Product might be "Pro Plan" while its Prices are "$49/month" and "$490/year."

## The Product object

```json
{
  "id": "prod_Abc123",
  "object": "product",
  "name": "Pro Plan",
  "description": "Unlimited projects and priority support",
  "active": true,
  "metadata": {},
  "created": 1748476800,
  "livemode": false
}
```

## Create a Product

<span className="badge--post">POST</span> `/v1/products`

```bash
curl https://api.meridian.dev/v1/products \
  -u sk_test_4eC39HqL...: \
  -d name="Pro Plan" \
  -d description="Unlimited projects and priority support"
```

## Retrieve a Product

<span className="badge--get">GET</span> `/v1/products/:id`

## Update a Product

<span className="badge--post">POST</span> `/v1/products/:id`

```bash
curl https://api.meridian.dev/v1/products/prod_Abc123 \
  -u sk_test_4eC39HqL...: \
  -d name="Pro Plan (Renamed)"
```

## Archive a Product

<span className="badge--post">POST</span> `/v1/products/:id`

Set `active: false` to archive a product and hide it from new subscriptions. Existing subscriptions using this product are not affected.

```bash
curl https://api.meridian.dev/v1/products/prod_Abc123 \
  -u sk_test_4eC39HqL...: \
  -d active=false
```

## List all Products

<span className="badge--get">GET</span> `/v1/products`

Filter by `active` to show only active or archived products.
