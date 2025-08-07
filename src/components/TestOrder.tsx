import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { submitOrder } from '@/api/orders';
import { useToast } from "@/components/ui/use-toast";

export function TestOrder() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleTestOrder = async () => {
    setIsLoading(true);
    try {
      // Create a test order
      const testOrder = {
        customerInfo: {
          name: "Test Customer",
          phone: "9999999999",
          address: "123 Test Street, Test City"
        },
        cartItems: [
          {
            id: "abf-100",
            name: "ABF 100 Tablet",
            tradePrice: 300.00,
            gst: "12%",
            quantity: 2
          },
          {
            id: "apenosa-spas",
            name: "Apenosa-Spas Tablet",
            tradePrice: 102.00,
            gst: "12%",
            quantity: 1
          }
        ]
      };

      // Submit the test order
      const result = await submitOrder(testOrder);

      toast({
        title: "Test Order Successful",
        description: `Order ID: ${result.orderId}`,
        variant: "default"
      });

      console.log('Test order result:', result);
    } catch (error) {
      console.error('Test order failed:', error);
      toast({
        title: "Test Order Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button 
        onClick={handleTestOrder} 
        disabled={isLoading}
        variant="outline"
        className="bg-background"
      >
        {isLoading ? "Testing..." : "Test Order Submission"}
      </Button>
    </div>
  );
} 