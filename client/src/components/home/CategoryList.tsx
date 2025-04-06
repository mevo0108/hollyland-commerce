import React from "react";
import { Link } from "wouter";
import { Category } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/translations";

// Simplified approach with direct rendering of categories
const CategoryList = () => {
  const { t } = useLanguage();

  // Translation map
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

  // Simplified category rendering
  const SimpleCategory = ({ id, slug, image }: { id: number, slug: string, image: string }) => {
    const translationKey = getCategoryTranslationKey(slug);
    
    return (
      <div className="cursor-pointer h-full">
        <Link href={`/products/category/${slug}`}>
          <div className="group relative h-full">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-[#f0e0c0] relative border-2 border-[#c49a6c] shadow-lg">
              <img 
                src={image}
                loading="eager"
                alt={t(translationKey)} 
                className="w-full h-full object-center object-cover group-hover:scale-105 transition duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/70 to-transparent"></div>
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="text-lg font-serif font-bold text-[#2c1810] group-hover:text-[#8B4513] transition-colors">
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

  return (
    <section className="py-16 bg-[#f9e8c1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">{t('categories_title')}</h2>
          <div className="vintage-divider w-24 mx-auto"></div>
          <p className="text-[#5c4838] font-serif mt-4 max-w-2xl mx-auto">{t('categories_subtitle')}</p>
        </div>
        
        {/* Direct rendering of categories - no state management */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <SimpleCategory 
            id={1} 
            slug="supermarket" 
            image="https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=500&h=500&fit=crop" 
          />
          <SimpleCategory 
            id={2} 
            slug="dried-fruits" 
            image="https://images.unsplash.com/photo-1598569304117-624d53fd951f?q=80&w=500&h=500&fit=crop" 
          />
          <SimpleCategory 
            id={3} 
            slug="nuts" 
            image="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=500&h=500&fit=crop" 
          />
          <SimpleCategory 
            id={4} 
            slug="spices" 
            image="https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=500&h=500&fit=crop" 
          />
          <SimpleCategory 
            id={5} 
            slug="bakery" 
            image="https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?q=80&w=500&h=500&fit=crop" 
          />
          <SimpleCategory 
            id={6} 
            slug="sauces" 
            image="https://images.unsplash.com/photo-1578020190125-f4f7c1c6f9b7?q=80&w=500&h=500&fit=crop" 
          />
          <SimpleCategory 
            id={7} 
            slug="alcohol" 
            image="https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=500&h=500&fit=crop" 
          />
          <SimpleCategory 
            id={8} 
            slug="tahini-hummus" 
            image="https://images.unsplash.com/photo-1590311930826-c6c9e159aaab?q=80&w=500&h=500&fit=crop" 
          />
          <SimpleCategory 
            id={9} 
            slug="snacks" 
            image="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=500&h=500&fit=crop" 
          />
          <SimpleCategory 
            id={10} 
            slug="coffee" 
            image="https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=500&h=500&fit=crop" 
          />
          <SimpleCategory 
            id={11} 
            slug="organic" 
            image="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&h=500&fit=crop" 
          />
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
