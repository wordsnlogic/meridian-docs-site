---
id: go-live-checklist
title: Go-Live Checklist
sidebar_label: Go-Live Checklist
description: Everything to verify before switching your Meridian integration to live mode.
---

# Go-Live Checklist

Before switching to live mode, work through this checklist to make sure your integration is production-ready.

## API keys & environment

- [ ] Replace all `sk_test_...` keys with `sk_live_...` in production environment variables
- [ ] Replace all `pk_test_...` keys with `pk_live_...` in client-side code
- [ ] Secret keys are stored in a secrets manager (not in source code or `.env` files committed to version control)
- [ ] Test keys are not accessible in the production environment

## Payments

- [ ] PaymentIntents are created server-side
- [ ] `client_secret` is passed to the frontend — never the full PaymentIntent object
- [ ] Payment confirmation uses Meridian.js or the mobile SDK (not the secret key directly)
- [ ] Your integration handles all [error codes](/docs/concepts/error-handling) gracefully
- [ ] Idempotency keys are set on all `POST` requests to prevent duplicate charges

## Webhooks

- [ ] A webhook endpoint is registered in the Dashboard for your production URL
- [ ] Your endpoint verifies webhook signatures before processing events
- [ ] Your endpoint returns a `200` response immediately and processes events asynchronously
- [ ] You handle the `payment_intent.succeeded` and `payment_intent.payment_failed` events
- [ ] Webhook delivery failures are monitored (check the Dashboard logs)

## Refunds & disputes

- [ ] Your integration can create refunds via the API
- [ ] Dispute handling workflow is documented for your support team
- [ ] Evidence submission is automated or tracked in your internal tooling

## Compliance

- [ ] You've read and accepted Meridian's [Terms of Service](https://meridian.dev/legal/terms)
- [ ] Your account is verified and KYB (Know Your Business) is complete
- [ ] You are **not** storing raw card numbers in your database — Meridian tokenizes these for you
- [ ] Your checkout page displays your business name, support email, and refund policy

## Testing

- [ ] Full end-to-end test run using live keys and a real card (charge $1.00, then refund)
- [ ] Subscription lifecycle tested: creation → renewal → cancellation
- [ ] Webhook endpoint tested with a real event in the Dashboard
- [ ] Failed payment path tested and user is shown a clear error message

---

:::tip
Once you go live, set up the [Meridian Dashboard](https://dashboard.meridian.dev) alerts to get notified of failed payments, disputes, and payout failures.
:::
