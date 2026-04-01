export default async function handler(req, res) {
  // Only allow POST requests for creating a checkout session
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { productId, customerEmail, customerName, returnUrl } = JSON.parse(req.body);

    const isTest = process.env.DODO_PAYMENTS_ENVIRONMENT === 'test_mode';
    const baseUrl = isTest ? 'https://test.dodopayments.com' : 'https://api.dodopayments.com';

    if (!process.env.DODO_PAYMENTS_API_KEY) {
      throw new Error("Missing DODO_PAYMENTS_API_KEY on the server.");
    }

    const response = await fetch(`${baseUrl}/checkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
      },
      body: JSON.stringify({
        product_cart: [{ product_id: productId, quantity: 1 }],
        customer: { email: customerEmail || 'guest@example.com', name: customerName || 'Supporter' },
        return_url: returnUrl,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.message || `Dodo API Error: ${response.statusText}`,
        details: data 
      });
    }

    // Return the checkout URL to the frontend
    return res.status(200).json({ checkout_url: data.checkout_url });
  } catch (error) {
    console.error('Checkout creation failed:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
