---
id: invoices
title: Invoices
sidebar_label: Invoices
description: API reference for Invoice objects in Meridian.
---

# Invoices API

See the [Invoices guide](/docs/billing/invoices) for a full walkthrough. This page covers the API endpoints.

## Create an Invoice

<span className="badge--post">POST</span> `/v1/invoices`

| Parameter | Type | Description |
|---|---|---|
| `customer` <span className="param-required">required</span> | string | Customer to invoice. |
| `auto_advance` | boolean | If `false`, stays as draft. Default: `true`. |
| `collection_method` | string | `charge_automatically` or `send_invoice`. |
| `days_until_due` | integer | Days until the invoice is due (for `send_invoice`). |
| `description` | string | Description shown on the invoice. |

```bash
curl https://api.meridian.dev/v1/invoices \
  -u sk_test_4eC39HqL...: \
  -d customer=cus_Nk3mHXq7ViGwMz \
  -d auto_advance=false \
  -d collection_method=send_invoice \
  -d days_until_due=30
```

## Finalize an Invoice

<span className="badge--post">POST</span> `/v1/invoices/:id/finalize`

Moves a draft invoice to `open`. No further line items can be added.

```bash
curl -X POST https://api.meridian.dev/v1/invoices/in_InvoiceId/finalize \
  -u sk_test_4eC39HqL...:
```

## Send an Invoice

<span className="badge--post">POST</span> `/v1/invoices/:id/send`

Sends the invoice email to the customer with a hosted payment link.

## Pay an Invoice

<span className="badge--post">POST</span> `/v1/invoices/:id/pay`

Attempts to pay the invoice immediately, or marks it paid out-of-band:

```bash
curl -X POST https://api.meridian.dev/v1/invoices/in_InvoiceId/pay \
  -u sk_test_4eC39HqL...: \
  -d paid_out_of_band=true
```

## Void an Invoice

<span className="badge--post">POST</span> `/v1/invoices/:id/void`

Marks an open invoice as void. Irreversible.

## Retrieve an Invoice

<span className="badge--get">GET</span> `/v1/invoices/:id`

## List all Invoices

<span className="badge--get">GET</span> `/v1/invoices`

Filter by `customer`, `status`, `subscription`, or `created` date range.

## Upcoming Invoice

<span className="badge--get">GET</span> `/v1/invoices/upcoming`

Preview the next invoice for a customer or subscription before it is generated.

```bash
curl "https://api.meridian.dev/v1/invoices/upcoming?customer=cus_Nk3mHXq7ViGwMz" \
  -u sk_test_4eC39HqL...:
```
