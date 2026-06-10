---
id: send-an-invoice
title: Send an Invoice
sidebar_label: Send an Invoice
description: Create line items, finalize an invoice, and send it to a customer for payment.
---

# Send an Invoice

This guide walks through creating a one-off invoice, adding line items, finalizing it, and sending it to a customer.

## Step 1 — Create a draft invoice

Create an invoice in `draft` status so you can add line items before sending.

```javascript
const invoice = await meridian.invoices.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  auto_advance: false,          // keep as draft
  collection_method: 'send_invoice',
  days_until_due: 30,           // net-30 payment terms
  description: 'Professional services – May 2026',
});
```

## Step 2 — Add line items

Add one or more items. Each becomes a row on the invoice.

```javascript
// Line item 1
await meridian.invoiceItems.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  invoice: invoice.id,
  amount: 20000,        // $200.00
  currency: 'usd',
  description: 'Technical writing – 4 hours at $50/hr',
});

// Line item 2
await meridian.invoiceItems.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  invoice: invoice.id,
  amount: 5000,         // $50.00
  currency: 'usd',
  description: 'Rush fee',
});
```

## Step 3 — Finalize the invoice

Finalizing locks the invoice — no more changes to line items. The status moves from `draft` to `open`.

```javascript
const finalized = await meridian.invoices.finalizeInvoice(invoice.id);
console.log(finalized.status); // 'open'
console.log(finalized.amount_due); // 25000 ($250.00)
```

## Step 4 — Send the invoice

Meridian sends an email to the customer with a link to a hosted payment page.

```javascript
await meridian.invoices.sendInvoice(invoice.id);
```

The customer receives an email from your business with:
- A summary of line items
- The total amount due
- A "Pay now" button linking to a hosted invoice page
- A PDF attachment

## Step 5 — Handle payment via webhook

Listen for these events to update your records:

```javascript
switch (event.type) {
  case 'invoice.paid':
    // Mark the order as paid in your system
    await markOrderPaid(event.data.object.id);
    break;
  case 'invoice.payment_failed':
    // Send a reminder or escalate
    await notifyOverdueInvoice(event.data.object.id);
    break;
}
```

## Manually mark as paid

If a customer pays outside of Meridian (bank transfer, check), mark the invoice paid manually:

```bash
curl -X POST https://api.meridian.dev/v1/invoices/in_1NqX2B4e/pay \
  -u sk_test_4eC39HqL...: \
  -d paid_out_of_band=true
```
