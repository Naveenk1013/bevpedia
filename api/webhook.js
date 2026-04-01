export const config = {
  api: {
    bodyParser: false, // Required by standardwebhooks to read raw body
  },
};

import { Webhook } from "standardwebhooks";

// Use environment variable in production, fallback to provided secret for testing
const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // standardwebhooks requires the exact raw unparsed text body to verify the cryptographic signature 
  let rawBody = '';
  for await (const chunk of req) {
    rawBody += chunk;
  }

  try {
    const webhookHeaders = {
      "webhook-id": req.headers["webhook-id"] || "",
      "webhook-signature": req.headers["webhook-signature"] || "",
      "webhook-timestamp": req.headers["webhook-timestamp"] || "",
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

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return res.status(400).json({ error: 'Webhook signature verification failed', details: error.message });
  }
}
