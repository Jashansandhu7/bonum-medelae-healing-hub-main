import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation, Home, Info, Package2, Phone, X } from "lucide-react";

const QuickNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: Info, label: "About", href: "#about" },
    { icon: Package2, label: "Products", href: "#products" },
    { icon: Phone, label: "Contact", href: "#contact" },
  ];

  const handleClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        {/* Main Button */}
        <Button
          size="icon"
          className={`h-12 w-12 rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Navigation className="h-6 w-6" />
          )}
        </Button>

        {/* Navigation Items */}
        <div
          className={`absolute bottom-16 left-0 space-y-2 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="outline"
              className="w-full bg-white hover:bg-secondary border-secondary flex items-center gap-2 shadow-md"
              onClick={() => handleClick(item.href)}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickNav; 