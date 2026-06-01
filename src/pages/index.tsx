import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type CardProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

function Card({icon, title, description, href}: CardProps) {
  return (
    <Link to={href} className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardDesc}>{description}</div>
    </Link>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Build with Meridian"
      description="Everything you need to integrate payments, payouts, and embedded banking into your product.">

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroLabel}>Documentation</div>
        <h1 className={styles.heroTitle}>Build with Meridian</h1>
        <p className={styles.heroSubtitle}>
          Everything you need to integrate payments, payouts, and embedded banking into your product.
        </p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/docs/quickstart">
            Get started →
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/api/customers">
            API Reference
          </Link>
        </div>
      </header>

      <main className={styles.main}>

        {/* Get Started */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Get started</h2>
          <p className={styles.sectionSubtitle}>New to Meridian? Start here.</p>
          <div className={styles.grid3}>
            <Card icon="🚀" title="Quickstart" description="Make your first API call and accept a test payment in under 5 minutes." href="/docs/quickstart" />
            <Card icon="🔑" title="Authentication" description="Learn how API keys work and how to keep your credentials secure." href="/docs/authentication" />
            <Card icon="🧪" title="Test mode" description="Use test API keys and test card numbers to simulate payments safely." href="/docs/test-mode" />
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Core Products */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Core products</h2>
          <p className={styles.sectionSubtitle}>Explore what you can build with Meridian.</p>
          <div className={styles.grid3}>
            <Card icon="💳" title="Payments" description="Accept one-time and recurring payments globally with 135+ currencies." href="/docs/payments/accept-a-payment" />
            <Card icon="📅" title="Subscriptions" description="Build subscription billing with trials, upgrades, and proration." href="/docs/billing/subscriptions" />
            <Card icon="💸" title="Payouts" description="Send money to bank accounts, debit cards, and digital wallets." href="/docs/payouts/overview" />
            <Card icon="🔔" title="Webhooks" description="Receive real-time event notifications when activity occurs in your account." href="/docs/webhooks/overview" />
            <Card icon="🛡️" title="Fraud & risk" description="Machine learning–based fraud detection that adapts to your business." href="/docs/compliance/fraud-and-risk" />
            <Card icon="🌐" title="Global compliance" description="PCI DSS Level 1, SOC 2 Type II, and regional regulatory coverage." href="/docs/compliance/global-compliance" />
          </div>
        </section>

        <hr className={styles.divider} />

        {/* API & SDKs */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>APIs & SDKs</h2>
          <p className={styles.sectionSubtitle}>Meridian offers server-side SDKs in all major languages.</p>
          <div className={styles.grid3}>
            <Card icon="🟨" title="JavaScript / Node.js" description="Official SDK for Node.js and browser environments." href="/docs/quickstart" />
            <Card icon="🐍" title="Python" description="Supports Python 3.8+ with async/await compatibility." href="/docs/quickstart" />
            <Card icon="💎" title="Ruby" description="Full-featured Ruby gem with Rails middleware included." href="/docs/quickstart" />
            <Card icon="🐹" title="Go" description="Idiomatic Go client with context support and retries." href="/docs/quickstart" />
            <Card icon="☕" title="Java" description="Maven and Gradle compatible. Supports Java 8+." href="/docs/quickstart" />
            <Card icon="💡" title="REST API Reference" description="Full reference for every endpoint, parameter, and response object." href="/docs/api/customers" />
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Popular guides */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Popular guides</h2>
          <p className={styles.sectionSubtitle}>Common integration patterns, step by step.</p>
          <div className={styles.grid2}>
            <Card icon="💰" title="Accept a one-time payment" description="Create a PaymentIntent, confirm it, and handle the result on your frontend." href="/docs/payments/accept-a-payment" />
            <Card icon="📆" title="Set up a subscription" description="Create a Product, a Price, and subscribe a Customer — all via the API." href="/docs/billing/subscriptions" />
            <Card icon="🔔" title="Listen to webhook events" description="Register an endpoint, verify signatures, and handle events reliably." href="/docs/webhooks/overview" />
            <Card icon="🧾" title="Send an invoice" description="Create line items, finalize an Invoice, and let Meridian handle collection." href="/docs/billing/send-an-invoice" />
          </div>
        </section>

      </main>
    </Layout>
  );
}
