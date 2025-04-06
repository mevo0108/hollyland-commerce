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
      'supermarket-products': 'category_supermarket',
      'dried-fruits': 'category_driedfruits',
      'nuts': 'category_nuts',
      'spices-and-blends': 'category_spices',
      'bakery-products': 'category_bakery',
      'sauces': 'category_sauces',
      'alcohol': 'category_alcohol',
      'tahini-and-hummus': 'category_tahini',
      'snacks-and-sweets': 'category_snacks',
      'coffee': 'category_coffee',
      'organic-products': 'category_organic'
    };
    
    return keyMap[slug] || 'categories';
  };
  
  const translationKey = getCategoryTranslationKey(category.slug);
  
  return (
    <div className="cursor-pointer">
      <Link href={`/products/category/${category.slug}`}>
        <div className="group relative">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-[#f0e0c0] relative border-2 border-[#c49a6c] shadow-lg">
            <img 
              src={category.imageUrl || '/placeholder-category.jpg'} 
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
