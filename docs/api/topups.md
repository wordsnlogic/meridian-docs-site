---
id: topups
title: Top-ups
sidebar_label: Top-ups
description: API reference for adding funds to your Meridian balance.
---

# Top-ups API

Top-ups let you add funds to your Meridian balance from your bank account — useful when you need to pay out more than you've collected.

## Create a Top-up

<span className="badge--post">POST</span> `/v1/topups`

```bash
curl https://api.meridian.dev/v1/topups \
  -u sk_test_4eC39HqL...: \
  -d amount=50000 \
  -d currency=usd \
  -d description="Adding funds for payout run"
```

Funds are typically available in your balance within 1–2 business days.

## Retrieve a Top-up

<span className="badge--get">GET</span> `/v1/topups/:id`

## Cancel a Top-up

<span className="badge--post">POST</span> `/v1/topups/:id/cancel`

Only cancels top-ups that have not yet been submitted to the bank.

## List all Top-ups

<span className="badge--get">GET</span> `/v1/topups`
