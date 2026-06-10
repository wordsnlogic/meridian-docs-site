---
id: event-types
title: Event Types
sidebar_label: Event Types
description: A reference of all Meridian webhook event types.
---

# Event Types

Meridian fires events for every significant state change in your account. Subscribe to the events that matter to your integration.

## Payments

| Event | Description |
|---|---|
| `payment_intent.created` | A PaymentIntent was created. |
| `payment_intent.processing` | A PaymentIntent has entered processing state. |
| `payment_intent.succeeded` | A PaymentIntent was successfully confirmed and captured. |
| `payment_intent.payment_failed` | A PaymentIntent failed (declined, authentication failed, etc). |
| `payment_intent.canceled` | A PaymentIntent was canceled. |
| `payment_intent.amount_capturable_updated` | The capturable amount changed. |
| `charge.succeeded` | A charge succeeded. |
| `charge.failed` | A charge failed. |
| `charge.refunded` | A charge was refunded (fully or partially). |
| `charge.dispute.created` | A dispute was opened on a charge. |
| `charge.dispute.closed` | A dispute was resolved. |

## Customers

| Event | Description |
|---|---|
| `customer.created` | A new customer was created. |
| `customer.updated` | A customer was updated. |
| `customer.deleted` | A customer was deleted. |

## Subscriptions

| Event | Description |
|---|---|
| `customer.subscription.created` | A subscription was created. |
| `customer.subscription.updated` | A subscription was updated (plan change, quantity change, etc). |
| `customer.subscription.deleted` | A subscription was canceled. |
| `customer.subscription.trial_will_end` | A trial will end in 3 days. |
| `customer.subscription.paused` | A subscription was paused. |
| `customer.subscription.resumed` | A paused subscription was resumed. |

## Invoices

| Event | Description |
|---|---|
| `invoice.created` | An invoice was created. |
| `invoice.finalized` | An invoice was finalized (no longer editable). |
| `invoice.paid` | An invoice was paid. |
| `invoice.payment_failed` | An invoice payment attempt failed. |
| `invoice.payment_action_required` | Authentication is required to pay an invoice. |
| `invoice.voided` | An invoice was voided. |
| `invoice.upcoming` | An invoice is coming up for a subscription (sent 1 hour before). |

## Payouts

| Event | Description |
|---|---|
| `payout.created` | A payout was created. |
| `payout.paid` | A payout arrived in the bank account. |
| `payout.failed` | A payout failed. |
| `payout.canceled` | A payout was canceled. |

## Webhook endpoints

| Event | Description |
|---|---|
| `webhook_endpoint.created` | A webhook endpoint was registered. |
| `webhook_endpoint.updated` | A webhook endpoint was updated. |
| `webhook_endpoint.deleted` | A webhook endpoint was deleted. |

## Listening to all events

To subscribe to all events, set `enabled_events` to `["*"]`:

```bash
curl https://api.meridian.dev/v1/webhook_endpoints \
  -u sk_test_4eC39HqL...: \
  -d url="https://yourapp.com/webhooks/meridian" \
  -d "enabled_events[]"="*"
```

:::warning
Subscribing to all events increases traffic to your endpoint. Only do this during development.
:::
