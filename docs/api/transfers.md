---
id: transfers
title: Transfers
sidebar_label: Transfers
description: API reference for Transfer objects in Meridian Connect.
---

# Transfers API

Transfers move funds from your Meridian platform balance to a connected account. Use transfers in marketplace and platform scenarios to pay out sellers or service providers.

## Create a Transfer

<span className="badge--post">POST</span> `/v1/transfers`

| Parameter | Type | Description |
|---|---|---|
| `amount` <span className="param-required">required</span> | integer | Amount in cents to transfer. |
| `currency` <span className="param-required">required</span> | string | Three-letter ISO currency code. |
| `destination` <span className="param-required">required</span> | string | ID of the connected account to receive the transfer. |
| `source_transaction` | string | Charge ID. Funds will be drawn from that specific charge's balance. |
| `description` | string | Internal description. |

```bash
curl https://api.meridian.dev/v1/transfers \
  -u sk_test_4eC39HqL...: \
  -d amount=7000 \
  -d currency=usd \
  -d destination=acct_ConnectedAccountId \
  -d source_transaction=ch_ChargeId
```

```javascript
const transfer = await meridian.transfers.create({
  amount: 7000,
  currency: 'usd',
  destination: 'acct_ConnectedAccountId',
  source_transaction: 'ch_ChargeId',
});
```

## Retrieve a Transfer

<span className="badge--get">GET</span> `/v1/transfers/:id`

## List all Transfers

<span className="badge--get">GET</span> `/v1/transfers`

Filter by `destination` account or `created` date range.

## Reverse a Transfer

<span className="badge--post">POST</span> `/v1/transfers/:id/reversals`

Reverses all or part of a transfer:

```bash
curl -X POST https://api.meridian.dev/v1/transfers/tr_TransferId/reversals \
  -u sk_test_4eC39HqL...: \
  -d amount=3500
```
