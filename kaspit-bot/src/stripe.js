import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function getOrCreateCustomer(uid, email) {
  const existing = await stripe.customers.search({
    query: `metadata['uid']:'${uid}'`,
    limit: 1,
  });
  if (existing.data.length > 0) return existing.data[0];
  return stripe.customers.create({ email, metadata: { uid } });
}

export async function createCheckoutSession(uid, email) {
  const customer = await getOrCreateCustomer(uid, email);
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${process.env.APP_URL}?checkout=success`,
    cancel_url: `${process.env.APP_URL}?checkout=cancelled`,
    metadata: { uid },
  });
  return { url: session.url, customerId: customer.id };
}

export async function createPortalSession(stripeCustomerId) {
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: process.env.APP_URL,
  });
  return session.url;
}

export function constructWebhookEvent(rawBody, sig) {
  return stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
}
