import { useState, useEffect } from "react";
import { Link } from "wouter";
import { CloseIcon, SearchIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@shared/schema";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const MobileMenu = ({ isOpen, onClose, categories }: MobileMenuProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Add scroll lock to body when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!mounted) return null;
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#f9e8c1] shadow-lg border-r border-[#c49a6c]">
        <div className="flex items-center justify-between p-4 border-b border-[#c49a6c]">
          <h2 className="text-lg font-bold font-serif text-[#2c1810]">Menu</h2>
          <Button variant="ghost" size="icon" className="bg-[#f0e0c0] hover:bg-[#e0d0b0] border border-[#c49a6c]" onClick={onClose}>
            <CloseIcon className="h-5 w-5 text-[#8B4513]" />
          </Button>
        </div>
        
        <div className="p-4 border-b border-[#c49a6c]">
          <div className="relative">
            <Input 
              type="text"
              placeholder="Search products..."
              className="vintage-input w-full pl-10 pr-4 border-[#c49a6c] bg-[#f9f3e7] focus:ring-[#8B4513]/20"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-[#8B4513]" />
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          <Link href="/">
            <a className="block px-3 py-2 rounded-md text-[#2c1810] font-serif font-medium hover:bg-[#f0e0c0] hover:text-[#8B4513] border border-transparent hover:border-[#c49a6c] transition-all" onClick={onClose}>
              Home
            </a>
          </Link>
          
          <Link href="/products">
            <a className="block px-3 py-2 rounded-md text-[#2c1810] font-serif font-medium hover:bg-[#f0e0c0] hover:text-[#8B4513] border border-transparent hover:border-[#c49a6c] transition-all" onClick={onClose}>
              All Products
            </a>
          </Link>
          
          <div className="py-2">
            <h3 className="px-3 text-sm font-bold font-serif text-[#8B4513] uppercase tracking-wider">
              Categories
            </h3>
            <div className="mt-2 space-y-1">
              {categories.map((category) => (
                <Link key={category.id} href={`/products/category/${category.slug}`}>
                  <a 
                    className="block px-3 py-2 rounded-md text-[#2c1810] font-serif font-medium hover:bg-[#f0e0c0] hover:text-[#8B4513] border border-transparent hover:border-[#c49a6c] transition-all"
                    onClick={onClose}
                  >
                    {category.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          
          <Link href="/products?new=true">
            <a className="block px-3 py-2 rounded-md text-[#2c1810] font-serif font-medium hover:bg-[#f0e0c0] hover:text-[#8B4513] border border-transparent hover:border-[#c49a6c] transition-all" onClick={onClose}>
              New Arrivals
            </a>
          </Link>
          
          <Link href="/products?sale=true">
            <a className="block px-3 py-2 rounded-md text-[#2c1810] font-serif font-medium hover:bg-[#f0e0c0] hover:text-[#8B4513] border border-transparent hover:border-[#c49a6c] transition-all" onClick={onClose}>
              Sale
            </a>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
