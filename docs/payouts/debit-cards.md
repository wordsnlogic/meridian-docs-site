---
id: debit-cards
title: Debit Card Payouts
sidebar_label: Debit Cards
description: Use Instant Payouts to send funds to a debit card in minutes.
---

# Debit Card Payouts (Instant Payouts)

**Instant Payouts** let you send funds to a Visa or Mastercard debit card in as little as 30 minutes — any time of day, including weekends and holidays.

## Eligibility

Instant Payouts are available for accounts that:
- Are verified and in good standing
- Have a positive available Meridian balance
- Have a linked and verified debit card

Instant Payouts are currently supported in the US and select other countries. Check availability in the Dashboard.

## Add a debit card

```bash
curl https://api.meridian.dev/v1/accounts/acct_YourAccountId/external_accounts \
  -u sk_test_4eC39HqL...: \
  -d "external_account[object]"=card \
  -d "external_account[number]"=4000056655665556 \
  -d "external_account[exp_month]"=12 \
  -d "external_account[exp_year]"=2027 \
  -d "external_account[cvc]"=123 \
  -d "external_account[name]"="Priya Sharma"
```

## Create an Instant Payout

```javascript
const payout = await meridian.payouts.create({
  amount: 10000,           // $100.00
  currency: 'usd',
  destination: 'card_DebitCardId',
  method: 'instant',
});

console.log(payout.method);        // 'instant'
console.log(payout.arrival_date);  // typically within 30 minutes
```

## Fees

Instant Payouts have a fee of **1% of the payout amount** (minimum $0.50, maximum $10.00 per payout). The fee is deducted from your Meridian balance, not added to the payout amount.

## Limits

| Limit | Amount |
|---|---|
| Minimum payout | $1.00 |
| Maximum per payout | $10,000.00 |
| Daily limit | $100,000.00 |
