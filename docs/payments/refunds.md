---
id: refunds
title: Refunds
sidebar_label: Refunds
description: Issue full or partial refunds against any captured charge in Meridian.
---

# Refunds

Refunds return funds to a customer's original payment method. You can issue full or partial refunds via the API or the Dashboard.

## Create a refund

```bash
# Full refund
curl https://api.meridian.dev/v1/refunds \
  -u sk_test_4eC39HqL...: \
  -d charge=ch_ChargeId

# Partial refund ($5.00 of a larger charge)
curl https://api.meridian.dev/v1/refunds \
  -u sk_test_4eC39HqL...: \
  -d charge=ch_ChargeId \
  -d amount=500
```

In Node.js:

```javascript
// Full refund
const refund = await meridian.refunds.create({
  charge: 'ch_ChargeId',
});

// Partial refund
const partialRefund = await meridian.refunds.create({
  charge: 'ch_ChargeId',
  amount: 500,   // $5.00
});

console.log(refund.status); // 'succeeded'
```

## Refund a PaymentIntent

If you have the PaymentIntent ID (more common in newer integrations):

```javascript
const refund = await meridian.refunds.create({
  payment_intent: 'pi_PaymentIntentId',
  amount: 1000,  // partial refund of $10.00
});
```

## Refund statuses

| Status | Description |
|---|---|
| `pending` | Submitted but not yet processed. |
| `succeeded` | Funds returned to the customer. |
| `failed` | Refund failed (e.g., card account closed). |
| `canceled` | Refund was canceled before processing. |

## Refund timing

Card refunds typically take **5–10 business days** to appear on a customer's statement, depending on their bank. The funds leave your Meridian balance immediately.

## Refund reasons

Optionally record why you're issuing a refund:

```javascript
const refund = await meridian.refunds.create({
  charge: 'ch_ChargeId',
  reason: 'customer_request',  // or 'duplicate', 'fraudulent'
});
```

## Listen for refund events

```javascript
case 'charge.refunded':
  const charge = event.data.object;
  const refundedAmount = charge.amount_refunded;
  await updateOrderRefundStatus(charge.metadata.order_id, refundedAmount);
  break;
```

:::tip
If you're issuing a refund for a subscription invoice, cancel the subscription first — otherwise the next invoice will still be generated.
:::
