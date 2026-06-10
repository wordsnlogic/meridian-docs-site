---
id: invoice-items
title: Invoice Items
sidebar_label: Invoice Items
description: API reference for adding line items to Meridian invoices.
---

# Invoice Items API

Invoice Items are individual line items that appear on an invoice. You add them to a draft invoice before finalizing.

## Create an Invoice Item

<span className="badge--post">POST</span> `/v1/invoiceItems`

| Parameter | Type | Description |
|---|---|---|
| `customer` <span className="param-required">required</span> | string | Customer to bill. |
| `amount` <span className="param-required">required</span> | integer | Amount in cents. |
| `currency` <span className="param-required">required</span> | string | Three-letter ISO currency code. |
| `invoice` | string | Draft invoice ID to attach this item to. |
| `description` | string | Line item description shown on the invoice. |
| `quantity` | integer | Quantity (amount is per unit). Default: `1`. |

```bash
curl https://api.meridian.dev/v1/invoiceItems \
  -u sk_test_4eC39HqL...: \
  -d customer=cus_Nk3mHXq7ViGwMz \
  -d invoice=in_InvoiceId \
  -d amount=5000 \
  -d currency=usd \
  -d description="Add-on: Analytics dashboard"
```

## Retrieve an Invoice Item

<span className="badge--get">GET</span> `/v1/invoiceItems/:id`

## Update an Invoice Item

<span className="badge--post">POST</span> `/v1/invoiceItems/:id`

Update `amount`, `description`, or `quantity` while the invoice is still in draft.

## Delete an Invoice Item

<span className="badge--delete">DELETE</span> `/v1/invoiceItems/:id`

```bash
curl -X DELETE https://api.meridian.dev/v1/invoiceItems/ii_ItemId \
  -u sk_test_4eC39HqL...:
```

## List Invoice Items

<span className="badge--get">GET</span> `/v1/invoiceItems`

Filter by `customer` or `invoice`.
