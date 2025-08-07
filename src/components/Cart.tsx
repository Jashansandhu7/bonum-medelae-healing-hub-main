import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Minus, Plus, X, ShoppingBag, Package2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Product } from "@/data/products";

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const Cart = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart }: CartProps) => {
  const navigate = useNavigate();
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.mrpPerUnit * item.quantity), 0);
  const gst = cartItems.reduce((sum, item) => {
    const gstRate = parseFloat(item.gst.replace('%', '')) / 100;
    return sum + (item.mrpPerUnit * item.quantity * gstRate);
  }, 0);
  const total = subtotal + gst;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {cartItems.length === 0 ? (
              "Your cart is empty"
            ) : (
              `${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in cart`
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {cartItems.length > 0 ? (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-secondary/50 rounded-lg p-4"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-md border bg-muted/50 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate pr-8">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">₹{item.mrpPerUnit} per unit</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        GST {item.gst}
                      </Badge>
                      <span className="text-sm ml-auto font-medium">
                        ₹{(item.mrpPerUnit * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
              <Package2 className="h-12 w-12 text-muted-foreground/50" />
              <div className="text-center">
                <h3 className="font-medium mb-1">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">Add some items to your cart</p>
              </div>
              <Button
                variant="outline"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart; 