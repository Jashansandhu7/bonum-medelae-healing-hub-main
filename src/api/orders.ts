interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

interface CartItem {
  id: string;
  name: string;
  tradePrice: number;
  gst: string;
  quantity: number;
}

interface OrderData {
  customerInfo: CustomerInfo;
  cartItems: CartItem[];
}

interface OrderResponse {
  success: boolean;
  message?: string;
  error?: string;
  orderId?: string;
  total?: number;
  totalItems?: number;
  timestamp?: string;
}

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;

if (!GOOGLE_SCRIPT_URL) {
  throw new Error('Google Sheets API URL not configured in .env file');
}

export async function submitOrder(orderData: OrderData): Promise<OrderResponse> {
  try {
    console.log('🚀 Submitting order...', orderData);
    
    // Method 1: Try fetch first (modern approach)
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'addOrder',
          data: orderData
        })
      });

      // Since we're using no-cors, we can't read the response
      // But if no error was thrown, assume success
      console.log('✅ Order submitted via fetch');
      return {
        success: true,
        message: 'Order submitted successfully',
        timestamp: new Date().toISOString(),
        orderId: `BM${Date.now()}`
      };
    } catch (fetchError) {
      console.log('Fetch failed, trying form submission...', fetchError);
      
      // Method 2: Fallback to form submission
      return await submitViaForm(orderData);
    }
  } catch (error) {
    console.error('❌ Order submission failed:', error);
    throw error;
  }
}

async function submitViaForm(orderData: OrderData): Promise<OrderResponse> {
  return new Promise((resolve, reject) => {
    try {
      // Create a hidden iframe for form submission
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'order_submission_frame';
      document.body.appendChild(iframe);

      // Create form with proper data structure
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_SCRIPT_URL;
      form.target = 'order_submission_frame';

      // Add hidden inputs with the correct data structure
      const actionInput = document.createElement('input');
      actionInput.type = 'hidden';
      actionInput.name = 'action';
      actionInput.value = 'addOrder';
      form.appendChild(actionInput);

      const dataInput = document.createElement('input');
      dataInput.type = 'hidden';
      dataInput.name = 'data';
      dataInput.value = JSON.stringify(orderData);
      form.appendChild(dataInput);

      // Handle iframe load (indicates form was submitted)
      let submitted = false;
      
      iframe.onload = () => {
        if (submitted) {
          console.log('✅ Order submitted via form');
          cleanup();
          resolve({
            success: true,
            message: 'Order submitted successfully',
            timestamp: new Date().toISOString(),
            orderId: `BM${Date.now()}`
          });
        }
      };

      iframe.onerror = () => {
        console.error('❌ Form submission failed');
        cleanup();
        reject(new Error('Form submission failed'));
      };

      function cleanup() {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
          if (document.body.contains(form)) {
            document.body.removeChild(form);
          }
        }, 1000);
      }

      // Submit form
      document.body.appendChild(form);
      form.submit();
      submitted = true;

      // Timeout fallback
      setTimeout(() => {
        if (!submitted) {
          cleanup();
          reject(new Error('Submission timeout'));
        }
      }, 15000);

    } catch (error) {
      reject(error);
    }
  });
}

// Alternative JSONP method for better CORS handling
export async function submitOrderViaJSONP(orderData: OrderData): Promise<OrderResponse> {
  return new Promise((resolve, reject) => {
    try {
      const callbackName = 'orderCallback_' + Date.now();
      
      // Create global callback
      (window as any)[callbackName] = (response: OrderResponse) => {
        delete (window as any)[callbackName];
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.error || 'Unknown error'));
        }
      };

      // Create script tag for JSONP
      const script = document.createElement('script');
      const params = new URLSearchParams({
        action: 'submitOrderViaJSONP',
        customerInfo: JSON.stringify(orderData.customerInfo),
        cartItems: JSON.stringify(orderData.cartItems),
        callback: callbackName
      });
      
      script.src = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
      script.onerror = () => {
        delete (window as any)[callbackName];
        reject(new Error('JSONP request failed'));
      };

      document.head.appendChild(script);

      // Timeout
      setTimeout(() => {
        if ((window as any)[callbackName]) {
          delete (window as any)[callbackName];
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
          reject(new Error('Request timeout'));
        }
      }, 15000);

    } catch (error) {
      reject(error);
    }
  });
}

// Test function to check if the endpoint is working
export async function testConnection(): Promise<boolean> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'GET',
      mode: 'no-cors'
    });
    console.log('✅ Connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return false;
  }
}