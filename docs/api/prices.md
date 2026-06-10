---
id: prices
title: Prices
sidebar_label: Prices
description: API reference for Price objects in Meridian.
---

# Prices API

A **Price** defines the cost, currency, and billing interval for a Product. Each Product can have multiple Prices.

## The Price object

```json
{
  "id": "price_ProMonthly",
  "object": "price",
  "product": "prod_Abc123",
  "nickname": "Pro – Monthly",
  "unit_amount": 4900,
  "currency": "usd",
  "type": "recurring",
  "recurring": {
    "interval": "month",
    "interval_count": 1,
    "usage_type": "licensed"
  },
  "active": true,
  "created": 1748476800,
  "livemode": false
}
```

## Create a Price

<span className="badge--post">POST</span> `/v1/prices`

| Parameter | Type | Description |
|---|---|---|
| `product` <span className="param-required">required</span> | string | The Product this Price belongs to. |
| `unit_amount` <span className="param-required">required</span> | integer | Price in cents (e.g., `4900` = $49.00). |
| `currency` <span className="param-required">required</span> | string | Three-letter ISO currency code. |
| `recurring.interval` | string | `day`, `week`, `month`, or `year`. Required for recurring prices. |
| `recurring.interval_count` | integer | Number of intervals between billings. Default: `1`. |
| `nickname` | string | Internal label (not shown to customers). |

```bash
# Monthly recurring price
curl https://api.meridian.dev/v1/prices \
  -u sk_test_4eC39HqL...: \
  -d product=prod_Abc123 \
  -d unit_amount=4900 \
  -d currency=usd \
  -d "recurring[interval]"=month \
  -d nickname="Pro – Monthly"

# Annual price (billed every 12 months)
curl https://api.meridian.dev/v1/prices \
  -u sk_test_4eC39HqL...: \
  -d product=prod_Abc123 \
  -d unit_amount=49000 \
  -d currency=usd \
  -d "recurring[interval]"=year \
  -d nickname="Pro – Annual"
```

## Archive a Price

Prices cannot be deleted, but can be archived:

```bash
curl https://api.meridian.dev/v1/prices/price_ProMonthly \
  -u sk_test_4eC39HqL...: \
  -d active=false
```

## List all Prices

<span className="badge--get">GET</span> `/v1/prices`

```bash
curl "https://api.meridian.dev/v1/prices?product=prod_Abc123&active=true" \
  -u sk_test_4eC39HqL...:
```
