import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { ShoppingCart, Plus, Minus, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value) || 1;
    setQuantity(Math.max(1, num));
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const totalPrice = (product.tradePrice * quantity).toFixed(2);
  const totalMRP = (product.mrpPerUnit * quantity).toFixed(2);
  const discount = ((product.mrpPerUnit - product.tradePrice) / product.mrpPerUnit * 100).toFixed(0);

  return (
    <Card 
      className="group h-full flex flex-col hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-white border-secondary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Badge variant="secondary" className="bg-secondary/80 backdrop-blur-sm text-primary font-medium">
          {product.category}
        </Badge>
        {parseInt(discount) > 0 && (
          <Badge variant="destructive" className="bg-accent/90 backdrop-blur-sm border-0">
            {discount}% OFF
          </Badge>
        )}
      </div>

      <CardHeader className="pb-4 relative">
        <div 
          className={`aspect-square bg-gradient-to-br from-secondary/50 to-secondary rounded-lg mb-4 overflow-hidden transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain rounded-lg transform transition-transform duration-300 p-4"
            onError={(e) => {
              e.currentTarget.src = `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop`;
            }}
          />
        </div>
        <CardTitle className="text-lg font-semibold text-primary line-clamp-2 min-h-[3rem]">
          {product.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm text-muted-foreground">Composition</h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-accent hover:text-accent/80 transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{product.composition}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm leading-relaxed line-clamp-2 text-muted-foreground">{product.composition}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm bg-secondary/50 p-3 rounded-lg">
          <div>
            <span className="font-medium text-muted-foreground">Pack Size:</span>
            <p className="font-semibold text-foreground">{product.packSize}</p>
          </div>
          <div>
            <span className="font-medium text-muted-foreground">Packing:</span>
            <p className="font-semibold text-foreground">{product.packing}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground line-through">
              MRP: ₹{totalMRP}
            </span>
            <Badge variant="outline" className="text-xs border-accent text-accent">
              GST {product.gst}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-primary flex items-baseline gap-2">
            ₹{totalPrice}
            <span className="text-sm font-normal text-muted-foreground">
              per pack
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 space-y-4">
        <div className="flex items-center space-x-2 w-full">
          <Button
            variant="outline"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="hover:bg-primary hover:text-white transition-colors border-secondary"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-secondary"
            min="1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={incrementQuantity}
            className="hover:bg-primary hover:text-white transition-colors border-secondary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          className="w-full bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all border-0"
          onClick={() => onAddToCart(product, quantity)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;