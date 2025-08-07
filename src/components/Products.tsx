import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { products, categories, Product } from "@/data/products";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CartItem extends Product {
  quantity: number;
}

interface ProductsProps {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

const Products = ({ cartItems, setCartItems }: ProductsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { toast } = useToast();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.composition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group products by category
  const groupedProducts = filteredProducts.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {} as Record<string, Product[]>);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} added to cart`,
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCartItems(prevCart => prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartValue = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.tradePrice * item.quantity), 0);
    const gst = cartItems.reduce((total, item) => {
      const gstRate = parseFloat(item.gst.replace('%', '')) / 100;
      return total + (item.tradePrice * item.quantity * gstRate);
    }, 0);
    return subtotal + gst;
  };

  const getCategoryCount = (category: string) => {
    return products.filter(product => product.category === category).length;
  };

  // Handle mobile filter sheet close
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileFilterOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive pharmaceutical solutions for better health outcomes
          </p>
        </div>

        {/* Cart Summary - Floating */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-80 z-50">
            <div className="bg-white/95 rounded-lg shadow-2xl border border-secondary p-4 backdrop-blur-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <ShoppingCart className="h-5 w-5 text-accent" />
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {getTotalCartItems()} items
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsCartOpen(true)}
                  className="bg-accent hover:bg-accent/90 text-white border-0"
                >
                  View Cart
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-secondary"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 hover:text-accent"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Desktop Category Select */}
            <div className="hidden md:block w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="border-secondary">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "All Products" 
                        ? `${category} (${products.length})`
                        : `${category} (${getCategoryCount(category)})`
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden border-secondary">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    {categories.map(category => (
                      <div
                        key={category}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedCategory === category
                            ? 'bg-accent text-white'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsMobileFilterOpen(false);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category}</span>
                          <Badge variant={selectedCategory === category ? "secondary" : "outline"}>
                            {category === "All Products" 
                              ? products.length
                              : getCategoryCount(category)
                            }
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {cartItems.length > 0 && (
              <Button 
                onClick={() => setIsCartOpen(true)}
                className="relative md:w-auto bg-accent hover:bg-accent/90 text-white border-0"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                <Badge 
                  variant="secondary"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-white"
                >
                  {getTotalCartItems()}
                </Badge>
              </Button>
            )}
          </div>

          {/* Desktop Category Quick Filters */}
          <div className="hidden md:block mt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Quick Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs border-secondary ${
                    selectedCategory === category 
                      ? 'bg-accent hover:bg-accent/90 text-white border-0'
                      : 'hover:bg-secondary'
                  }`}
                >
                  {category}
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs ${
                      selectedCategory === category 
                        ? 'bg-white/20 text-white'
                        : 'bg-secondary text-primary'
                    }`}
                  >
                    {category === "All Products" 
                      ? products.length
                      : getCategoryCount(category)
                    }
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results Summary */}
        {searchTerm && (
          <div className="mb-6 p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground">
              Found {filteredProducts.length} products matching "{searchTerm}"
            </p>
          </div>
        )}

        {/* Products by Category */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2 text-primary">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Products");
                }}
                className="border-secondary hover:bg-secondary"
              >
                Clear all filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <div key={category} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">{category}</h3>
                    <p className="text-muted-foreground">
                      {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''} in this category
                    </p>
                  </div>
                  <Badge variant="outline" className="text-sm border-accent text-accent">
                    {categoryProducts.length} items
                  </Badge>
                </div>
                
                <Separator className="bg-secondary" />
                
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          {selectedCategory !== "All Products" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory("All Products")}
              className="mt-2 border-secondary hover:bg-secondary"
            >
              View All Products
            </Button>
          )}
        </div>
      </div>

      {/* Cart Modal */}
      <Cart
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </section>
  );
};

export default Products;