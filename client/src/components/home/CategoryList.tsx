import React, { useState, useEffect } from "react";
import CategoryCard from "../products/CategoryCard";
import { Category } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

// Fixed list of categories to prevent flickering
const fixedCategories = [
  { id: 1, name: 'Supermarket Products', slug: 'supermarket', description: 'Essential grocery items from Israeli markets', imageUrl: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=500&h=500&fit=crop' },
  { id: 2, name: 'Dried Fruits', slug: 'dried-fruits', description: 'Premium quality dried fruits from Israel', imageUrl: 'https://images.unsplash.com/photo-1598569304117-624d53fd951f?q=80&w=500&h=500&fit=crop' },
  { id: 3, name: 'Nuts', slug: 'nuts', description: 'Fresh and roasted nuts from Israeli farms', imageUrl: 'https://images.unsplash.com/photo-1563296102-589cc7c2f8f4?q=80&w=500&h=500&fit=crop' },
  { id: 4, name: 'Spices & Blends', slug: 'spices', description: 'Authentic Israeli spices and seasoning blends', imageUrl: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=500&h=500&fit=crop' },
  { id: 5, name: 'Bakery Products', slug: 'bakery', description: 'Traditional Israeli breads and baked goods', imageUrl: 'https://images.unsplash.com/photo-1586444248187-f5fea0e13d09?q=80&w=500&h=500&fit=crop' },
  { id: 6, name: 'Sauces', slug: 'sauces', description: 'Authentic Israeli sauces and dips', imageUrl: 'https://images.unsplash.com/photo-1613991233521-2a65bf16cc88?q=80&w=500&h=500&fit=crop' },
  { id: 7, name: 'Alcohol', slug: 'alcohol', description: 'Israeli wines, beers, and spirits', imageUrl: 'https://images.unsplash.com/photo-1545418776-ad395723b29f?q=80&w=500&h=500&fit=crop' },
  { id: 8, name: 'Tahini & Hummus', slug: 'tahini-hummus', description: 'Premium tahini and authentic Israeli hummus', imageUrl: 'https://images.unsplash.com/photo-1614634424235-1f93d6299f04?q=80&w=500&h=500&fit=crop' },
  { id: 9, name: 'Snacks & Sweets', slug: 'snacks', description: 'Delicious Israeli snacks and confectionery', imageUrl: 'https://images.unsplash.com/photo-1617029566671-5c71fcc915bc?q=80&w=500&h=500&fit=crop' },
  { id: 10, name: 'Coffee', slug: 'coffee', description: 'Premium Israeli coffee beans and blends', imageUrl: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=500&h=500&fit=crop' },
  { id: 11, name: 'Organic Products', slug: 'organic', description: 'Certified organic food products from Israel', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&h=500&fit=crop' }
];

const CategoryList = () => {
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

  // Only render actual content once loaded
  return (
    <section className="py-16 bg-[#f9e8c1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">{t('categories_title')}</h2>
          <div className="vintage-divider w-24 mx-auto"></div>
          <p className="text-[#5c4838] font-serif mt-4 max-w-2xl mx-auto">{t('categories_subtitle')}</p>
        </div>
        
        {/* Simple grid layout with opacity transition to prevent flickering */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {fixedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
