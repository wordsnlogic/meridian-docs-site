---
id: tax-rates
title: Tax Rates
sidebar_label: Tax Rates
description: API reference for Tax Rate objects in Meridian.
---

# Tax Rates API

Tax Rates define a tax percentage that can be applied to subscription items, invoice items, and one-time payments.

## Create a Tax Rate

<span className="badge--post">POST</span> `/v1/tax_rates`

```bash
curl https://api.meridian.dev/v1/tax_rates \
  -u sk_test_4eC39HqL...: \
  -d display_name="Sales Tax" \
  -d jurisdiction="CA" \
  -d percentage=8.25 \
  -d inclusive=false
```

| Parameter | Type | Description |
|---|---|---|
| `display_name` <span className="param-required">required</span> | string | Label shown on invoices (e.g., "VAT", "Sales Tax"). |
| `percentage` <span className="param-required">required</span> | decimal | Tax rate as a percentage (e.g., `8.25` for 8.25%). |
| `inclusive` | boolean | If `true`, tax is included in the price. If `false`, tax is added on top. |
| `jurisdiction` | string | Jurisdiction (state, country, etc.) for reference. |

## Apply to a Subscription

```javascript
await meridian.subscriptions.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  items: [{
    price: 'price_ProMonthly',
    tax_rates: ['txr_TaxRateId'],
  }],
});
```

## Apply to an Invoice Item

```javascript
await meridian.invoiceItems.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  amount: 5000,
  currency: 'usd',
  description: 'Consulting fee',
  tax_rates: ['txr_TaxRateId'],
});
```

## Retrieve and List

```bash
curl https://api.meridian.dev/v1/tax_rates/txr_TaxRateId \
  -u sk_test_4eC39HqL...:

curl https://api.meridian.dev/v1/tax_rates \
  -u sk_test_4eC39HqL...:
```
