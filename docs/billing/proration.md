---
id: proration
title: Proration
sidebar_label: Proration
description: How Meridian calculates prorated charges and credits when subscriptions change mid-cycle.
---

# Proration

When a subscription changes mid-billing-cycle — a plan upgrade, downgrade, or quantity change — Meridian automatically calculates a **proration**: a partial charge or credit for the remaining time in the period.

## How it works

Suppose a customer is on a $30/month plan and upgrades to $60/month with 15 days left in the month:

- **Credit:** $15 (½ of unused $30 plan)
- **Charge:** $30 (½ of new $60 plan for the remaining 15 days)
- **Net:** +$15 added to the next invoice

## Proration behaviors

Control how prorations are handled with the `proration_behavior` parameter:

| Value | Behavior |
|---|---|
| `create_prorations` | Generate prorated invoice items immediately. Applied to the next invoice. |
| `always_invoice` | Generate and immediately finalize a proration invoice. Charges or credits the customer right away. |
| `none` | No proration. The new price takes effect at the next billing period. |

```javascript
await meridian.subscriptions.update('sub_Xyz123', {
  items: [{ id: 'si_ItemId', price: 'price_NewPlan' }],
  proration_behavior: 'create_prorations',  // default
});
```

## Preview before applying

Use the upcoming invoice endpoint to show customers exactly what they'll be charged before confirming the change:

```javascript
const preview = await meridian.invoices.retrieveUpcoming({
  customer: 'cus_Nk3mHXq7ViGwMz',
  subscription: 'sub_Xyz123',
  subscription_items: [{
    id: 'si_ItemId',
    price: 'price_NewPlan',
  }],
});

console.log(preview.amount_due); // prorated amount in cents
```

## Disable proration

For annual plans where you don't want mid-year adjustments:

```javascript
await meridian.subscriptions.update('sub_Xyz123', {
  items: [{ id: 'si_ItemId', price: 'price_NewPlan' }],
  proration_behavior: 'none',
});
```

The new price takes effect at the start of the next billing cycle with no immediate charge or credit.
