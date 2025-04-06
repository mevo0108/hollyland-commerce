import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Category } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/translations";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Map category slug to translation key
  const getCategoryTranslationKey = (slug: string): TranslationKey => {
    const keyMap: Record<string, TranslationKey> = {
      'supermarket': 'category_supermarket',
      'dried-fruits': 'category_driedfruits',
      'nuts': 'category_nuts',
      'spices': 'category_spices',
      'bakery': 'category_bakery',
      'sauces': 'category_sauces',
      'alcohol': 'category_alcohol',
      'tahini-hummus': 'category_tahini',
      'snacks': 'category_snacks',
      'coffee': 'category_coffee',
      'organic': 'category_organic'
    };
    
    return keyMap[slug] || 'categories';
  };
  
  const translationKey = getCategoryTranslationKey(category.slug);
  
  // Get default image based on slug
  const getDefaultCategoryImage = (slug: string): string => {
    const defaultImages: Record<string, string> = {
      'supermarket': 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=500&h=500&fit=crop',
      'dried-fruits': 'https://images.unsplash.com/photo-1598569304117-624d53fd951f?q=80&w=500&h=500&fit=crop',
      'nuts': 'https://images.unsplash.com/photo-1563296102-589cc7c2f8f4?q=80&w=500&h=500&fit=crop',
      'spices': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=500&h=500&fit=crop',
      'bakery': 'https://images.unsplash.com/photo-1586444248187-f5fea0e13d09?q=80&w=500&h=500&fit=crop',
      'sauces': 'https://images.unsplash.com/photo-1613991233521-2a65bf16cc88?q=80&w=500&h=500&fit=crop',
      'alcohol': 'https://images.unsplash.com/photo-1545418776-ad395723b29f?q=80&w=500&h=500&fit=crop',
      'tahini-hummus': 'https://images.unsplash.com/photo-1614634424235-1f93d6299f04?q=80&w=500&h=500&fit=crop',
      'snacks': 'https://images.unsplash.com/photo-1617029566671-5c71fcc915bc?q=80&w=500&h=500&fit=crop',
      'coffee': 'https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=500&h=500&fit=crop',
      'organic': 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&h=500&fit=crop'
    };
    
    return defaultImages[slug] || 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=500&h=500&fit=crop';
  };

  // Immediately set image source
  const imageSrc = category.imageUrl || getDefaultCategoryImage(category.slug);
  
  // Image preloading effect
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    // Set as loaded after timeout regardless, to avoid endless loading state
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [imageSrc]);

  return (
    <div className="cursor-pointer h-full">
      <Link href={`/products/category/${category.slug}`}>
        <div className={`group relative h-full transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-[#f0e0c0] relative border-2 border-[#c49a6c] shadow-lg">
            <img 
              src={imageSrc}
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = getDefaultCategoryImage(category.slug);
              }}
              alt={t(translationKey)} 
              className="w-full h-full object-center object-cover group-hover:scale-105 transition duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/70 to-transparent"></div>
          </div>
          
          <div className="mt-4 text-center">
            <h3 className="text-xl font-serif font-bold text-[#2c1810] group-hover:text-[#8B4513] transition-colors">
              {t(translationKey)}
            </h3>
            <div className="mt-1 w-12 h-0.5 bg-[#c49a6c] mx-auto"></div>
          </div>
          
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#f9e8c1] rounded-full border border-[#c49a6c] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[#8B4513] font-serif">→</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
