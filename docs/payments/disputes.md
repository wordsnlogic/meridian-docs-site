---
id: disputes
title: Disputes
sidebar_label: Disputes
description: How to handle payment disputes and chargebacks in Meridian.
---

# Disputes

A **dispute** (also called a chargeback) occurs when a customer contacts their bank to contest a charge. Meridian notifies you immediately via webhook and gives you a window to submit evidence.

## How disputes work

1. Customer disputes a charge with their bank
2. Bank provisionally reverses the funds (held in a dispute reserve)
3. Meridian notifies you via `charge.dispute.created` webhook
4. You have typically **7–10 calendar days** to submit evidence
5. Bank reviews and makes a final decision (can take 60–90 days)
6. If you win, funds are returned. If you lose, they are permanently withheld.

## Respond to a dispute webhook

```javascript
case 'charge.dispute.created':
  const dispute = event.data.object;
  console.log(`Dispute opened: ${dispute.id}`);
  console.log(`Amount: $${dispute.amount / 100} ${dispute.currency.toUpperCase()}`);
  console.log(`Reason: ${dispute.reason}`);
  await alertSupportTeam(dispute);
  break;
```

## Dispute reasons

| Reason | Description |
|---|---|
| `fraudulent` | Customer claims they didn't make the purchase. |
| `duplicate` | Customer claims they were charged twice. |
| `product_not_received` | Customer claims they didn't receive what was ordered. |
| `product_unacceptable` | Customer claims the product was damaged or not as described. |
| `subscription_canceled` | Customer claims they canceled before being charged. |
| `unrecognized` | Customer doesn't recognize the charge. |

## Submit evidence

Submit evidence through the Dashboard (**Payments → Disputes**) or via the API:

```javascript
await meridian.disputes.update('dp_DisputeId', {
  evidence: {
    customer_name: 'Priya Sharma',
    customer_email_address: 'priya@example.com',
    shipping_documentation: 'file_ShippingLabelId',
    service_documentation: 'file_ServiceAgreementId',
    uncategorized_text: 'Customer agreed to our terms of service at checkout on 2026-05-01.',
  },
  submit: true,   // submit immediately; leave false to save as draft
});
```

## Best practices for winning disputes

- **Keep records** — store order confirmations, delivery confirmations, IP addresses, and signed agreements
- **Respond promptly** — don't wait until the deadline; earlier is better
- **Be specific** — upload the most relevant documents (receipts, tracking numbers, communications)
- **For digital goods** — include login timestamps, IP addresses, and usage logs

:::warning
A dispute fee of $15 is charged by Meridian regardless of the outcome. Winning the dispute returns the disputed funds but not the fee.
:::
