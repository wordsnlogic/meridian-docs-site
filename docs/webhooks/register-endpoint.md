---
id: register-endpoint
title: Register a Webhook Endpoint
sidebar_label: Register Endpoint
description: Register your HTTPS URL in Meridian to start receiving webhook events.
---

# Register a Webhook Endpoint

Before Meridian can send events to your app, you need to register a webhook endpoint — an HTTPS URL on your server that Meridian will POST events to.

## Requirements

- Must be an **HTTPS** URL (HTTP is not accepted)
- Must return HTTP **200** within 5 seconds
- Must be publicly reachable (not localhost — use a tunnel for local development)

## Register via the Dashboard

1. Go to **Developers → Webhooks → Add endpoint**
2. Enter your endpoint URL (e.g., `https://yourapp.com/webhooks/meridian`)
3. Choose which event types to listen for (or select "All events" for development)
4. Click **Add endpoint**
5. Copy the **Signing secret** — you'll need this to verify signatures

## Register via the API

```bash
curl https://api.meridian.dev/v1/webhook_endpoints \
  -u sk_test_4eC39HqL...: \
  -d url="https://yourapp.com/webhooks/meridian" \
  -d "enabled_events[]"=payment_intent.succeeded \
  -d "enabled_events[]"=customer.subscription.updated \
  -d "enabled_events[]"=invoice.paid
```

```javascript
const endpoint = await meridian.webhookEndpoints.create({
  url: 'https://yourapp.com/webhooks/meridian',
  enabled_events: [
    'payment_intent.succeeded',
    'customer.subscription.updated',
    'invoice.paid',
  ],
});

console.log(endpoint.secret); // Save this — shown only once
```

:::warning
The webhook signing secret is only shown once at creation time. Store it in an environment variable immediately (`MERIDIAN_WEBHOOK_SECRET`).
:::

## Local development with a tunnel

For local testing, use a tunnel to expose your localhost to the internet:

```bash
# Using ngrok
ngrok http 3000

# Your public URL will look like:
# https://abc123.ngrok.io → use this as your webhook URL
```

Register the ngrok URL as a webhook endpoint in the Dashboard, and Meridian will forward events to your local server.

## Update an endpoint

```javascript
await meridian.webhookEndpoints.update('we_EndpointId', {
  enabled_events: ['payment_intent.succeeded', 'charge.dispute.created'],
});
```

## Delete an endpoint

```javascript
await meridian.webhookEndpoints.del('we_EndpointId');
```
