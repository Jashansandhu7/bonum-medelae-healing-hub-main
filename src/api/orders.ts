// Replace this with your new deployment URL from the previous step
const API_URL = 'https://script.google.com/macros/s/AKfycbxCg4-sYs0nQHfpFTeBFrz35l9J6FcGcxH2Fbd2hUT3lmRO_lWWba64WT_ifFdlsyHM_Q/exec';

export interface OrderData {
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  cartItems: Array<{
    id: string;
    name: string;
    tradePrice: number;
    gst: string;
    quantity: number;
  }>;
}

export async function submitOrder(orderData: OrderData) {
  try {
    // First try a GET request to verify the endpoint is accessible
    const testResponse = await fetch(API_URL, {
      method: 'GET',
      mode: 'cors'
    });

    if (!testResponse.ok) {
      console.warn('API endpoint test failed:', await testResponse.text());
    } else {
      console.log('API endpoint test successful');
    }

    // Submit the actual order
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addOrder',
        data: orderData
      })
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to submit order');
    }

    return data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
} 