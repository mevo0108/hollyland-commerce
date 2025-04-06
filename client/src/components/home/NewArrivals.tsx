import React, { useState, useEffect } from "react";
import ProductGrid from "../products/ProductGrid";
import { Product } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

// Fixed new arrivals data to prevent flickering
const fixedNewArrivals: Product[] = [
  {
    id: 5,
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
  },
  {
    id: 6,
    name: "Golan Heights Wine",
    price: "29.99",
    description: "Award-winning red wine from the Golan Heights region",
    categoryId: 7,
    imageUrl: "https://images.unsplash.com/photo-1553682544-4ccf2778c93e?q=80&w=500&h=500&fit=crop",
    slug: "golan-heights-wine",
    featured: false,
    isNewArrival: true,
    isSale: false,
    originalPrice: null,
    stockQuantity: 15,
    rating: "4.6",
    reviewCount: 12
  },
  {
    id: 7,
    name: "Jerusalem Za'atar Blend",
    price: "7.99",
    description: "Traditional za'atar herb mix with sesame and sumac",
    categoryId: 4,
    imageUrl: "https://images.unsplash.com/photo-1526552184243-5e3a6f869a24?q=80&w=500&h=500&fit=crop",
    slug: "jerusalem-zaatar-blend",
    featured: false,
    isNewArrival: true,
    isSale: false,
    originalPrice: null,
    stockQuantity: 40,
    rating: "4.8",
    reviewCount: 18
  },
  {
    id: 8,
    name: "Negev Desert Dates",
    price: "11.99",
    description: "Premium Medjool dates from the Negev Desert",
    categoryId: 2,
    imageUrl: "https://images.unsplash.com/photo-1586377711939-8f0c20ec7593?q=80&w=500&h=500&fit=crop",
    slug: "negev-desert-dates",
    featured: false,
    isNewArrival: true,
    isSale: true,
    originalPrice: "14.99",
    stockQuantity: 30,
    rating: "4.9",
    reviewCount: 22
  }
];

const NewArrivals = () => {
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
    <section className="py-16 bg-[#f9e8c1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block transform -rotate-2 bg-[#b54834] text-[#f9e8c1] px-6 py-2 font-serif font-bold text-sm mb-3">
            {t('new_arrivals').toUpperCase()}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">{t('new_arrivals')}</h2>
          <div className="vintage-divider w-24 mx-auto"></div>
          <p className="text-[#5c4838] font-serif mt-4 max-w-2xl mx-auto">{t('new_arrivals_subtitle')}</p>
        </div>
        
        {/* Content with opacity transition to prevent flickering */}
        <div className={`transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <ProductGrid 
            products={fixedNewArrivals} 
            viewAllLink="/products?new=true" 
            title={t('new_arrivals')}
          />
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
