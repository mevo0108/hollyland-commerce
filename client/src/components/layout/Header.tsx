import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { SearchIcon, MenuIcon, CartIcon, ChevronDownIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CartSidebar from "./CartSidebar";
import MobileMenu from "./MobileMenu";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";

const Header = () => {
  const [location] = useLocation();
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-primary font-bold text-xl cursor-pointer">ModernShop</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <span className={`text-gray-700 hover:text-primary font-medium cursor-pointer ${location === "/" ? "text-primary" : ""}`}>
                Home
              </span>
            </Link>
            
            {/* Categories dropdown */}
            <div className="relative group">
              <button className="text-gray-700 group-hover:text-primary font-medium flex items-center">
                Categories
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 ease-in-out z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {categories?.map((category) => (
                    <Link key={category.id} href={`/products/category/${category.slug}`}>
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link href="/products">
              <span className={`text-gray-700 hover:text-primary font-medium cursor-pointer ${location === "/products" ? "text-primary" : ""}`}>
                All Products
              </span>
            </Link>
            
            <Link href="/products/category/electronics">
              <span className={`text-gray-700 hover:text-primary font-medium cursor-pointer ${location.includes("new-arrivals") ? "text-primary" : ""}`}>
                New Arrivals
              </span>
            </Link>
            
            <Link href="/products?sale=true">
              <span className={`text-gray-700 hover:text-primary font-medium cursor-pointer ${location.includes("sale") ? "text-primary" : ""}`}>
                Sale
              </span>
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Input 
                type="text"
                placeholder="Search products..."
                className="w-64 pl-10 pr-4"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
                onClick={() => setIsCartOpen(true)}
              >
                <span className="sr-only">View cart</span>
                <CartIcon className="h-6 w-6" />
                {cartCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 p-1 h-5 w-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
              
              <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} categories={categories || []} />
    </header>
  );
};

export default Header;
