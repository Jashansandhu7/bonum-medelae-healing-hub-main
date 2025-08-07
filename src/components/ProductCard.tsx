import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/data/products";
import medicineDefault from "@/assets/defaults/medicine-default.jpg";

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

  const totalPrice = (product.mrpPerUnit * quantity).toFixed(2);

  return (
    <Card 
      className="group h-full flex flex-col hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-white border-secondary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="secondary" className="bg-secondary/80 backdrop-blur-sm text-primary font-medium">
          {product.category}
        </Badge>
      </div>

      <CardHeader className="pb-4 relative">
        <div className="relative aspect-square bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = medicineDefault;
              }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div>
          <h3 className="font-semibold truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.composition}</p>
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
          <div className="flex justify-end">
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

      <CardFooter className="pt-4">
        <div className="w-full space-y-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decrementQuantity}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="h-8 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={incrementQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            className="w-full bg-accent hover:bg-accent/90 text-white"
            onClick={() => onAddToCart(product, quantity)}
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;