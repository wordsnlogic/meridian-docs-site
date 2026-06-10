---
id: payouts
title: Payouts
sidebar_label: Payouts
description: API reference for Payout objects in Meridian.
---

# Payouts API

See the [Payouts guide](/docs/payouts/overview) for a conceptual overview.

## Create a Payout

<span className="badge--post">POST</span> `/v1/payouts`

```bash
curl https://api.meridian.dev/v1/payouts \
  -u sk_test_4eC39HqL...: \
  -d amount=10000 \
  -d currency=usd
```

| Parameter | Type | Description |
|---|---|---|
| `amount` <span className="param-required">required</span> | integer | Amount in cents to pay out. |
| `currency` <span className="param-required">required</span> | string | Must match your default settlement currency. |
| `destination` | string | External account ID. Defaults to your default bank account. |
| `method` | string | `standard` or `instant`. Default: `standard`. |

## Retrieve a Payout

<span className="badge--get">GET</span> `/v1/payouts/:id`

## Cancel a Payout

<span className="badge--post">POST</span> `/v1/payouts/:id/cancel`

Only payouts with `status: pending` can be canceled.

```bash
curl -X POST https://api.meridian.dev/v1/payouts/po_PayoutId/cancel \
  -u sk_test_4eC39HqL...:
```

## List all Payouts

<span className="badge--get">GET</span> `/v1/payouts`

```bash
curl "https://api.meridian.dev/v1/payouts?status=paid&limit=10" \
  -u sk_test_4eC39HqL...:
```
