import { Webhook } from "standardwebhooks";

// Use environment variable in production
const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET; 

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Netlify functions provide event.body as the raw body string by default
  const rawBody = event.body;

  try {
    const webhookHeaders = {
      "webhook-id": event.headers["webhook-id"] || "",
      "webhook-signature": event.headers["webhook-signature"] || "",
      "webhook-timestamp": event.headers["webhook-timestamp"] || "",
    };

    const webhook = new Webhook(webhookSecret);
    
    // Validate signature and parse body
    const payload = webhook.verify(rawBody, webhookHeaders);

    console.log("\u2705 Valid Dodo Payment Webhook Received!");
    console.log("Event Type:", payload.type);

    // Business Logic
    if (payload.type === 'payment.succeeded') {
      console.log(`Donation transaction successful! ID: ${payload.data?.payment_id}`);
      // TODO: You can integrate Discord/Slack notifications or Database updates here
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook signature verification failed', details: error.message })
    };
  }
};
