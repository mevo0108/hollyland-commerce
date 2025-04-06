import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProductGrid from "../products/ProductGrid";
import { Product } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

// Fixed featured products to prevent flickering
const fixedFeaturedProducts: Product[] = [
  {
    id: 1,
    name: "Jerusalem Artisan Tahini",
    price: "12.99",
    description: "Premium stone-ground tahini made from the finest Ethiopian sesame seeds",
    categoryId: 8,
    imageUrl: "https://images.unsplash.com/photo-1632789395166-c94c99c3229d?q=80&w=500&h=500&fit=crop",
    slug: "jerusalem-artisan-tahini",
    featured: true,
    isNewArrival: false,
    isSale: false,
    originalPrice: null,
    stockQuantity: 45,
    rating: "4.8",
    reviewCount: 124
  },
  {
    id: 2,
    name: "Galilee Olive Oil",
    price: "24.99",
    description: "Extra virgin olive oil cold-pressed from Galilee olives",
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&h=500&fit=crop",
    slug: "galilee-olive-oil",
    featured: true,
    isNewArrival: false,
    isSale: true,
    originalPrice: "29.99",
    stockQuantity: 30,
    rating: "4.9",
    reviewCount: 86
  },
  {
    id: 3,
    name: "Dead Sea Salt Mix",
    price: "8.99",
    description: "Authentic spice blend with minerals from the Dead Sea",
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1599189580324-5bc54f93ead3?q=80&w=500&h=500&fit=crop",
    slug: "dead-sea-salt-mix",
    featured: true,
    isNewArrival: false,
    isSale: false,
    originalPrice: null,
    stockQuantity: 60,
    rating: "4.5",
    reviewCount: 42
  },
  {
    id: 4,
    name: "Tel Aviv Date Honey",
    price: "15.99",
    description: "Natural date honey (silan) from Israeli dates",
    categoryId: 1,
    imageUrl: "https://images.unsplash.com/photo-1558642115-85a221daf5ed?q=80&w=500&h=500&fit=crop",
    slug: "tel-aviv-date-honey",
    featured: true,
    isNewArrival: true,
    isSale: false,
    originalPrice: null,
    stockQuantity: 25,
    rating: "4.7",
    reviewCount: 28
  }
];

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading complete after component mounts
  useEffect(() => {
    // Set a short timeout to ensure all assets are loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik01NC4wMSA0OS4zNDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVMNi4wMSA0OS4zNDVMMCA0My4zMzVsMTIuMDA1LTEyLjAwNUwwIDE5LjMyNWw2LjAxLTYuMDFsMTIuMDA1IDEyLjAwNUwzMC4wMiAxMy4zMTVsMTIuMDA1IDEyLjAwNUw1NC4wMSAxMy4zMTVsNi4wMSA2LjAxTDQ4LjAxNSAzMS4zM0w2MC4wMiA0My4zMzV6IiBmaWxsPSIjYzQ5YTZjIiBmaWxsLW9wYWNpdHk9IjAuMDUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-30"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">{t('featured_products')}</h2>
          <div className="vintage-divider w-24 mx-auto"></div>
          <p className="text-[#5c4838] font-serif mt-4 max-w-2xl mx-auto">{t('featured_subtitle')}</p>
        </div>
        
        {/* Content with opacity transition to prevent flickering */}
        <div className={`transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <ProductGrid products={fixedFeaturedProducts} viewAllLink="/products?featured=true" />
          
          <div className="text-center mt-10">
            <Link href="/products">
              <Button className="vintage-button bg-[#8B4513] hover:bg-[#6B3009] text-[#f9e8c1] border border-[#c49a6c] font-serif">
                {t('view_all')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default FeaturedProducts;
