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
      
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <CloseIcon className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 border-b">
          <div className="relative">
            <Input 
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          <Link href="/">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={onClose}>
              Home
            </a>
          </Link>
          
          <Link href="/products">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={onClose}>
              All Products
            </a>
          </Link>
          
          <div className="py-2">
            <h3 className="px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Categories
            </h3>
            <div className="mt-2 space-y-1">
              {categories.map((category) => (
                <Link key={category.id} href={`/products/category/${category.slug}`}>
                  <a 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                    onClick={onClose}
                  >
                    {category.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          
          <Link href="/products?new=true">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={onClose}>
              New Arrivals
            </a>
          </Link>
          
          <Link href="/products?sale=true">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={onClose}>
              Sale
            </a>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
