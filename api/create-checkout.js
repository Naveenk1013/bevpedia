export const handler = async (event, context) => {
  // Only allow POST requests for creating a checkout session
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body;
    const { productId, customerEmail, customerName, returnUrl } = JSON.parse(body);

    const isLive = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode';
    const baseUrl = isLive ? 'https://api.dodopayments.com' : 'https://test.dodopayments.com';

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
        customer: { email: customerEmail || null, name: customerName || null },
        return_url: returnUrl,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: data.message || `Dodo API Error: ${response.statusText}`,
          details: data 
        })
      };
    }

    // Return the checkout URL to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ checkout_url: data.checkout_url })
    };
  } catch (error) {
    console.error('Checkout creation failed:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};
