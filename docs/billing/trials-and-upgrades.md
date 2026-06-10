---
id: trials-and-upgrades
title: Trials and Upgrades
sidebar_label: Trials & Upgrades
description: Add free trials to subscriptions and handle plan upgrades or downgrades in Meridian.
---

# Trials and Upgrades

## Free trials

Add a trial period when creating a subscription. No payment is collected during the trial.

```javascript
const subscription = await meridian.subscriptions.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  items: [{ price: 'price_ProMonthly' }],
  trial_period_days: 14,    // 14-day free trial
});

console.log(subscription.status); // 'trialing'
```

The subscription moves to `active` automatically when the trial ends and the first payment succeeds. If payment fails, it moves to `past_due`.

### Require a card upfront

To prevent abuse, collect a payment method before the trial starts — but don't charge until the trial ends:

```javascript
const subscription = await meridian.subscriptions.create({
  customer: 'cus_Nk3mHXq7ViGwMz',
  items: [{ price: 'price_ProMonthly' }],
  trial_period_days: 14,
  payment_behavior: 'default_incomplete',
  payment_settings: { save_default_payment_method: 'on_subscription' },
  expand: ['latest_invoice.payment_intent'],
});
```

### Notify customers before trial ends

Listen for the `customer.subscription.trial_will_end` webhook event — fired 3 days before the trial expires:

```javascript
case 'customer.subscription.trial_will_end':
  const sub = event.data.object;
  await sendTrialEndingEmail(sub.customer, sub.trial_end);
  break;
```

## Upgrading a plan

To move a customer to a higher-tier plan mid-cycle, update the subscription's items:

```javascript
const subscription = await meridian.subscriptions.retrieve('sub_Xyz123');

await meridian.subscriptions.update('sub_Xyz123', {
  items: [{
    id: subscription.items.data[0].id,   // existing item to replace
    price: 'price_EnterpriseMonthly',    // new price
  }],
  proration_behavior: 'create_prorations',
});
```

Meridian automatically calculates the prorated credit for unused time on the old plan and charges the difference.

## Downgrading a plan

```javascript
await meridian.subscriptions.update('sub_Xyz123', {
  items: [{
    id: subscription.items.data[0].id,
    price: 'price_StarterMonthly',
  }],
  proration_behavior: 'create_prorations',
});
```

A prorated credit is applied to the next invoice.

## Preview a proration

Before applying a change, preview what the customer will owe:

```bash
curl https://api.meridian.dev/v1/invoices/upcoming \
  -u sk_test_4eC39HqL...: \
  -d customer=cus_Nk3mHXq7ViGwMz \
  -d subscription=sub_Xyz123 \
  -d "subscription_items[0][id]"=si_ItemId \
  -d "subscription_items[0][price]"=price_EnterpriseMonthly
```

The response is a preview invoice showing the prorated charge the customer will see.
