import { Dispatch, SetStateAction } from 'react';
import Products from '@/components/Products';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Header from '@/components/Header';
import QuickNav from '@/components/QuickNav';
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface IndexProps {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

const Index = ({ cartItems, setCartItems }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Products cartItems={cartItems} setCartItems={setCartItems} />
      <About />
      <Contact />
      <QuickNav />
    </div>
  );
};

export default Index;
