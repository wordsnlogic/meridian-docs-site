---
id: overview
title: Payouts Overview
sidebar_label: Overview
description: How Meridian moves settled funds from your balance to your bank account.
---

# Payouts

Payouts move your settled Meridian balance to your linked bank account or debit card. By default, Meridian sends payouts automatically on a rolling schedule.

## How payouts work

When a payment is captured, the funds enter your **Meridian balance** — not your bank account yet. Once funds clear (typically 2 business days for cards), they become available for payout.

```
Customer pays → Charge captured → Funds settle → Available balance → Payout to bank
```

## Automatic payouts

By default, Meridian sends payouts daily for any available balance. You can change the schedule in the Dashboard under **Settings → Payouts**:

| Schedule | Description |
|---|---|
| Daily | Payout every business day |
| Weekly | Payout every Monday (or chosen day) |
| Monthly | Payout on the 1st of each month |
| Manual | Payout only when you initiate it |

## Manual payouts

To trigger a payout on demand:

```bash
curl https://api.meridian.dev/v1/payouts \
  -u sk_test_4eC39HqL...: \
  -d amount=10000 \
  -d currency=usd
```

```javascript
const payout = await meridian.payouts.create({
  amount: 10000,    // $100.00
  currency: 'usd',
});

console.log(payout.arrival_date); // Unix timestamp of expected bank arrival
```

## Payout statuses

| Status | Description |
|---|---|
| `pending` | Created and queued. |
| `in_transit` | Submitted to the bank; funds are on their way. |
| `paid` | Funds have arrived in your bank account. |
| `failed` | Payout failed (e.g., invalid bank details). |
| `canceled` | Canceled before being sent. |

## Payout timing

| Payment type | Settlement time |
|---|---|
| Card payments | 2 business days |
| ACH bank debits | 4 business days |
| Instant payouts (debit card) | 30 minutes |

## Listen for payout events

```javascript
case 'payout.paid':
  console.log('Funds arrived:', event.data.object.amount);
  break;

case 'payout.failed':
  // Alert your team — check bank account details
  await alertFinanceTeam(event.data.object);
  break;
```

## View payout history

All payouts and their associated charges are visible in the Dashboard under **Balance → Payouts**, or via the API:

```bash
curl "https://api.meridian.dev/v1/payouts?limit=10" \
  -u sk_test_4eC39HqL...:
```
