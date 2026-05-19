import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-card py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="bg-white rounded-lg p-1 shadow-card inline-flex hover:scale-105 transition-transform duration-300">
            <img src={logo} alt="Papelaria Megaprint" className="h-9 w-auto block" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["Início", "Produtos", "Sobre", "Contato"].map((item) => {
            const hash = item === "Início" ? "" : `#${item.toLowerCase()}`;
            const to = isHome ? (hash || "/") : `/${hash}`;
            
            return (
              <Link
                key={item}
                to={to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-card rounded-full shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-fade-in">
                {totalItems}
              </span>
            )}
          </button>
          
          <Link
            to={isHome ? "#produtos" : "/#produtos"}
            className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity duration-300 hidden md:inline-block"
          >
            Fazer pedido
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
