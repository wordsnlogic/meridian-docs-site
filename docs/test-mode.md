---
id: test-mode
title: Test Mode
sidebar_label: Test Mode
description: Use test API keys and test card numbers to simulate payments safely.
---

# Test Mode

Test mode lets you build and test your integration without moving real money. Use test API keys (`sk_test_...`) and the test card numbers below to simulate any payment scenario.

## Test card numbers

### Successful payments

| Card number | Brand | Description |
|---|---|---|
| `4242 4242 4242 4242` | Visa | Standard success |
| `5555 5555 5555 4444` | Mastercard | Standard success |
| `3782 822463 10005` | Amex | Standard success (4-digit CVC) |

### Declined payments

| Card number | Decline reason | Error code |
|---|---|---|
| `4000 0000 0000 9995` | Insufficient funds | `insufficient_funds` |
| `4000 0000 0000 0002` | Generic decline | `card_declined` |
| `4000 0000 0000 0069` | Expired card | `expired_card` |
| `4000 0000 0000 0127` | Incorrect CVC | `incorrect_cvc` |
| `4000 0000 0000 0119` | Processing error | `processing_error` |

### 3D Secure (authentication)

| Card number | Behavior |
|---|---|
| `4000 0025 0000 3155` | Always requires authentication |
| `4000 0027 6000 3184` | Requires authentication only when 3DS is triggered |
| `4000 0082 6000 3178` | Authentication fails |

## Test bank accounts

For ACH and bank transfer testing, use these routing/account number combinations:

| Routing number | Account number | Result |
|---|---|---|
| `110000000` | `000123456789` | Success |
| `110000000` | `000111111113` | Account not found |
| `110000000` | `000111111116` | NSF / failed |

## Test webhook events

Trigger test webhook events directly from the Dashboard (**Developers → Webhooks → Send test event**) or via the API:

```bash
curl https://api.meridian.dev/v1/test/webhook \
  -u sk_test_4eC39HqL...: \
  -d type=payment_intent.succeeded
```

## Test clock (time simulation)

Use **Test Clocks** to simulate the passage of time for subscriptions and billing scenarios — advance a clock by days, months, or years without waiting.

```javascript
const testClock = await meridian.testHelpers.testClocks.create({
  frozen_time: Math.floor(Date.now() / 1000),
});

// Attach customer to clock
const customer = await meridian.customers.create({
  email: 'test@example.com',
  test_clock: testClock.id,
});

// Advance time 30 days to trigger renewal
await meridian.testHelpers.testClocks.advance(testClock.id, {
  frozen_time: testClock.frozen_time + (30 * 24 * 60 * 60),
});
```

## Switching to live mode

When you're ready to accept real payments:

1. Replace `sk_test_...` with `sk_live_...` in your environment variables
2. Replace `pk_test_...` with `pk_live_...` in your frontend
3. Review the [go-live checklist](/docs/go-live-checklist) before deploying

:::warning
Never use live keys in development or staging environments.
:::
