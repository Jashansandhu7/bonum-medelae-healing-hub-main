import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, createRoutesFromElements } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Checkout from './pages/Checkout';
import { useState } from 'react';
import { Product } from "./data/products";
import { TestOrder } from "./components/TestOrder";

interface CartItem extends Product {
  quantity: number;
}

const queryClient = new QueryClient();

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router future={{ v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Index cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {process.env.NODE_ENV === 'development' && <TestOrder />}
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
