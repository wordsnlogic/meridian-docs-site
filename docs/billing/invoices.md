---
id: invoices
title: Invoices
sidebar_label: Invoices
description: How Meridian generates, finalizes, and collects invoices for subscriptions and one-time billing.
---

# Invoices

Meridian automatically generates an Invoice at the start of every billing period for active subscriptions. You can also create one-off invoices for custom billing scenarios like usage-based charges or professional services.

## The Invoice object

```json
{
  "id": "in_1NqX2B4eHqLMHCmD2Ktz",
  "object": "invoice",
  "customer": "cus_Nk3mHXq7ViGwMz",
  "status": "paid",
  "amount_due": 4900,
  "amount_paid": 4900,
  "currency": "usd",
  "description": "Pro Plan – June 2026",
  "invoice_pdf": "https://pay.meridian.dev/invoice/acct_/in_1NqX2B4e.pdf",
  "hosted_invoice_url": "https://invoice.meridian.dev/...",
  "created": 1748476800,
  "due_date": null,
  "livemode": false
}
```

## Invoice statuses

| Status | Description |
|---|---|
| `draft` | Not yet finalized. Line items can still be added or removed. |
| `open` | Finalized and awaiting payment. |
| `paid` | Payment collected successfully. |
| `void` | Canceled before payment. Cannot be reopened. |
| `uncollectible` | All retries failed. Marked as uncollectible. |

## Automatic invoices (subscriptions)

Subscription invoices are created and finalized automatically. Meridian attempts to charge the customer's default payment method immediately. If payment fails, it retries based on your dunning schedule in the Dashboard.

## Manual one-off invoices

To bill a customer for something outside a subscription:

```javascript
// 1. Create a draft invoice
const invoice = await meridian.invoices.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  auto_advance: false, // stays as draft until you finalize
});

// 2. Add line items
await meridian.invoiceItems.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  invoice: invoice.id,
  amount: 15000,
  currency: 'usd',
  description: 'Consulting – 3 hours at $50/hr',
});

// 3. Finalize and send
await meridian.invoices.finalizeInvoice(invoice.id);
await meridian.invoices.sendInvoice(invoice.id);
```

The customer receives an email with a link to the hosted invoice page where they can pay by card.

## Retrieve and download

```bash
# Retrieve an invoice
curl https://api.meridian.dev/v1/invoices/in_1NqX2B4eHqLMHCmD \
  -u sk_test_4eC39HqL...:

# List invoices for a customer
curl "https://api.meridian.dev/v1/invoices?customer=cus_Nk3mHXq7ViGwMz&limit=10" \
  -u sk_test_4eC39HqL...:
```

The `invoice_pdf` field on every invoice contains a direct link to download the PDF.

## Voiding an invoice

```bash
curl -X POST https://api.meridian.dev/v1/invoices/in_1NqX2B4e/void \
  -u sk_test_4eC39HqL...:
```

:::warning
Voiding is irreversible. If the customer needs to pay, create a new invoice.
:::
