import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { SearchIcon, MenuIcon, CartIcon, ChevronDownIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CartSidebar from "./CartSidebar";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import HollyandLogo from "@/assets/hollyand-logo.png";

const Header = () => {
  const [location] = useLocation();
  const { cartCount } = useCart();
  const { t, isRTL } = useLanguage();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  return (
    <header className="bg-[#f9e8c1] shadow-md sticky top-0 z-50 border-b border-[#c49a6c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src={HollyandLogo} alt="Hollyand Premium Israel Products" className="h-16 w-auto" />
                <span className="sr-only">Hollyand Premium Israel Products</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <span className={`text-[#2c1810] hover:text-[#8B4513] font-serif font-medium cursor-pointer ${location === "/" ? "text-[#8B4513]" : ""}`}>
                {t('home')}
              </span>
            </Link>
            
            {/* Categories dropdown */}
            <div className="relative group">
              <button className="text-[#2c1810] group-hover:text-[#8B4513] font-serif font-medium flex items-center">
                {t('categories')}
                <ChevronDownIcon className={`h-4 w-4 ${isRTL ? 'mr-1' : 'ml-1'}`} />
              </button>
              <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-48 rounded-md shadow-lg bg-[#f9f3e7] border border-[#c49a6c] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 ease-in-out z-50`}>
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {categories?.map((category) => (
                    <Link key={category.id} href={`/products/category/${category.slug}`}>
                      <span className="block px-4 py-2 text-sm text-[#2c1810] hover:bg-[#f0e0c0] hover:text-[#8B4513] cursor-pointer font-serif" role="menuitem">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link href="/products">
              <span className={`text-[#2c1810] hover:text-[#8B4513] font-serif font-medium cursor-pointer ${location === "/products" ? "text-[#8B4513]" : ""}`}>
                {t('products')}
              </span>
            </Link>
            
            <Link href="/products/category/electronics">
              <span className={`text-[#2c1810] hover:text-[#8B4513] font-serif font-medium cursor-pointer ${location.includes("new-arrivals") ? "text-[#8B4513]" : ""}`}>
                {t('new_arrivals')}
              </span>
            </Link>
            
            <Link href="/products?sale=true">
              <span className={`text-[#2c1810] hover:text-[#8B4513] font-serif font-medium cursor-pointer ${location.includes("sale") ? "text-[#8B4513]" : ""}`}>
                {t('sale')}
              </span>
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Search */}
            <div className="hidden md:flex relative">
              <Input 
                type="text"
                placeholder={t('search')}
                className={`vintage-input w-64 pr-4 rounded-md border-[#c49a6c] focus:ring-[#8B4513]/20 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
              />
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <SearchIcon className="h-4 w-4 text-[#8B4513]" />
              </div>
            </div>

            {/* Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full bg-[#f0e0c0] hover:bg-[#e0d0b0] border border-[#c49a6c]"
                onClick={() => setIsCartOpen(true)}
              >
                <span className="sr-only">{t('cart')}</span>
                <CartIcon className="h-6 w-6 text-[#8B4513]" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 p-1 h-5 w-5 flex items-center justify-center bg-[#8B4513] text-[#f9e8c1]"
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
              className="md:hidden bg-[#f0e0c0] hover:bg-[#e0d0b0] border border-[#c49a6c]"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6 text-[#8B4513]" />
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
