import braintree from 'braintree';

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export async function generateClientToken() {
  const result = await gateway.clientToken.generate({});
  return result.clientToken;
}

export async function createSubscription(email, nonce) {
  const customerResult = await gateway.customer.create({ email, paymentMethodNonce: nonce });
  if (!customerResult.success) throw new Error(customerResult.message);

  const customer = customerResult.customer;
  const paymentMethodToken = customer.paymentMethods[0].token;

  const subResult = await gateway.subscription.create({
    paymentMethodToken,
    planId: process.env.BRAINTREE_PLAN_ID,
  });
  if (!subResult.success) throw new Error(subResult.message);

  return { customerId: customer.id, subscriptionId: subResult.subscription.id };
}

export async function cancelSubscription(subscriptionId) {
  return gateway.subscription.cancel(subscriptionId);
}

export async function parseWebhook(signature, payload) {
  return gateway.webhookNotification.parse(signature, payload);
}
