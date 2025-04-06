import { Link } from "wouter";
import { Category } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/translations";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { t } = useLanguage();
  
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
      'supermarket': 'https://images.unsplash.com/photo-1579113800032-c38bd7635818',
      'dried-fruits': 'https://images.unsplash.com/photo-1596073419667-9d77d59f033f',
      'nuts': 'https://images.unsplash.com/photo-1563296102-589cc7c2f8f4',
      'spices': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757',
      'bakery': 'https://images.unsplash.com/photo-1586444248187-f5fea0e13d09',
      'sauces': 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc',
      'alcohol': 'https://images.unsplash.com/photo-1566108254082-92f1ca1a8475',
      'tahini-hummus': 'https://images.unsplash.com/photo-1563546541388-39fbcacf9c86',
      'snacks': 'https://images.unsplash.com/photo-1617029566671-5c71fcc915bc',
      'coffee': 'https://images.unsplash.com/photo-1518057111178-44a106bad636',
      'organic': 'https://images.unsplash.com/photo-1542838132-92c53300491e'
    };
    
    return defaultImages[slug] || 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0';
  };

  return (
    <div className="cursor-pointer">
      <Link href={`/products/category/${category.slug}`}>
        <div className="group relative">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-[#f0e0c0] relative border-2 border-[#c49a6c] shadow-lg">
            <img 
              src={getDefaultCategoryImage(category.slug)}
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
