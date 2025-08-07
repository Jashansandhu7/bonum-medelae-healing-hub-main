import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Package2, Truck, MapPin, Phone, User, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { submitOrder, submitOrderViaJSONP } from "@/api/orders";

interface CheckoutProps {
  cartItems: any[];
  clearCart: () => void;
}

const Checkout = ({ cartItems, clearCart }: CheckoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.tradePrice * item.quantity), 0);
  const gst = cartItems.reduce((sum, item) => {
    const gstRate = parseFloat(item.gst.replace('%', '')) / 100;
    return sum + (item.tradePrice * item.quantity * gstRate);
  }, 0);
  const total = subtotal + gst;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = () => {
    if (currentStep === 2) {
      // Validate form before proceeding
      if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }

      // Basic phone validation
      if (formData.phone.replace(/\D/g, '').length < 10) {
        toast({
          title: "Invalid Phone Number",
          description: "Please enter a valid phone number.",
          variant: "destructive"
        });
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const generateWhatsAppMessage = (orderId: string) => {
    const orderDetails = cartItems.map(item => 
      `• ${item.name}\n  Quantity: ${item.quantity}\n  Price: ₹${item.tradePrice} each\n`
    ).join("\n");

    return `*NEW ORDER*\n` +
      `━━━━━━━━━━━━━━━━\n\n` +
      
      `*CUSTOMER DETAILS*\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Address: ${formData.address}\n\n` +
      
      `*ORDER ITEMS*\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `${orderDetails}\n` +
      
      `*PRICE DETAILS*\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `Subtotal: ₹${subtotal.toFixed(2)}\n` +
      `GST: ₹${gst.toFixed(2)}\n` +
      `Total: ₹${total.toFixed(2)}\n\n` +
      
      `Order ID: ${orderId}`;
  };

  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);
      
      // Prepare order data with proper structure
      const orderData = {
        customerInfo: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim()
        },
        cartItems: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          tradePrice: parseFloat(item.tradePrice) || 0,
          gst: item.gst || "12%",
          quantity: parseInt(item.quantity) || 1
        }))
      };

      console.log('Submitting order data:', orderData);

      let result;
      let method = 'standard';

      try {
        // Try standard submission first
        result = await submitOrder(orderData);
      } catch (error) {
        console.log('Standard submission failed, trying JSONP...', error);
        method = 'jsonp';
        
        try {
          // Fallback to JSONP
          result = await submitOrderViaJSONP(orderData);
        } catch (jsonpError) {
          console.error('JSONP submission also failed:', jsonpError);
          
          // Last resort - assume success and send to WhatsApp
          result = {
            success: true,
            message: 'Order submitted (method: fallback)',
            orderId: `BM${Date.now()}`,
            timestamp: new Date().toISOString()
          };
        }
      }

      if (result.success) {
        const message = generateWhatsAppMessage(result.orderId || `BM${Date.now()}`);
        const whatsappNumber = "918708885643";
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");

        toast({
          title: "Order Sent Successfully",
          description: `${result.message} (via ${method})`,
        });

        // Clear cart and redirect
        clearCart();
        
        // Show success and redirect after a delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error(result.error || 'Failed to submit order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      
      // Even if backend fails, we can still send to WhatsApp
      const shouldContinueToWhatsApp = window.confirm(
        'There was an issue saving your order, but we can still send it via WhatsApp. Continue?'
      );
      
      if (shouldContinueToWhatsApp) {
        const message = generateWhatsAppMessage(`BM${Date.now()}`);
        const whatsappNumber = "918708885643";
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
        
        toast({
          title: "Sent via WhatsApp",
          description: "Your order has been sent via WhatsApp.",
        });
        
        clearCart();
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to place order. Please try again or contact support.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package2 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">Add some items to your cart first</p>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-accent' : 'text-muted-foreground'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                {currentStep > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
              </div>
              <span className="font-medium">Review Order</span>
            </div>
            <div className={`w-24 h-0.5 ${currentStep >= 2 ? 'bg-accent' : 'bg-muted'}`} />
            <div className={`flex items-center ${currentStep >= 2 ? 'text-accent' : 'text-muted-foreground'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                {currentStep > 2 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
              </div>
              <span className="font-medium">Delivery Details</span>
            </div>
            <div className={`w-24 h-0.5 ${currentStep >= 3 ? 'bg-accent' : 'bg-muted'}`} />
            <div className={`flex items-center ${currentStep >= 3 ? 'text-accent' : 'text-muted-foreground'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2">
                {currentStep > 3 ? <CheckCircle2 className="w-5 h-5" /> : "3"}
              </div>
              <span className="font-medium">Confirm Order</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {currentStep === 1 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 py-4 border-b last:border-0"
                      >
                        <div className="w-20 h-20 rounded-lg border bg-muted/50 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            ₹{item.tradePrice} x {item.quantity}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              GST: {item.gst}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Pack: {item.packSize}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ₹{(item.tradePrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-2 text-base">
                        <User className="w-4 h-4" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2 text-base">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your phone number"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="flex items-center gap-2 text-base">
                        <MapPin className="w-4 h-4" />
                        Delivery Address *
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your complete delivery address including city and pincode"
                        className="mt-1.5"
                        rows={3}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      * Required fields
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-accent mx-auto" />
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">Confirm Your Order</h3>
                      <p className="text-muted-foreground">
                        Please review your order details and click "Place Order" to proceed.
                        You will be redirected to WhatsApp to confirm the order with our team.
                      </p>
                    </div>
                    <div className="mt-8 space-y-4 text-left">
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Customer Details</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Name:</span> {formData.name}</p>
                          <p><span className="text-muted-foreground">Phone:</span> {formData.phone}</p>
                          <p><span className="text-muted-foreground">Address:</span> {formData.address}</p>
                        </div>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Order Summary</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Items:</span> {cartItems.length} products</p>
                          <p><span className="text-muted-foreground">Subtotal:</span> ₹{subtotal.toFixed(2)}</p>
                          <p><span className="text-muted-foreground">GST:</span> ₹{gst.toFixed(2)}</p>
                          <p className="font-medium"><span className="text-muted-foreground">Total:</span> ₹{total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                      </span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">GST</span>
                      <span>₹{gst.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-medium">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {currentStep < 3 && (
                      <Button 
                        className="w-full"
                        onClick={handleContinue}
                      >
                        {currentStep === 1 ? 'Continue to Details' : 'Review Order'}
                      </Button>
                    )}
                    {currentStep === 3 && (
                      <Button 
                        className="w-full bg-accent hover:bg-accent/90 text-white"
                        onClick={handlePlaceOrder}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Placing Order...' : 'Place Order'}
                        <Truck className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                    {currentStep > 1 && (
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                    )}
                  </div>
                  
                  {currentStep === 3 && (
                    <div className="mt-4 text-xs text-muted-foreground text-center">
                      By placing this order, you agree to our terms and conditions.
                      You will be redirected to WhatsApp to confirm your order.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Info Card */}
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Contact us for any assistance with your order.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;