import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../products/CategoryCard";
import { Category } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

// Define preloaded categories to prevent flickering
const preloadedCategories = [
  { id: 1, name: 'Supermarket Products', slug: 'supermarket' },
  { id: 2, name: 'Dried Fruits', slug: 'dried-fruits' },
  { id: 3, name: 'Nuts', slug: 'nuts' },
  { id: 4, name: 'Spices & Blends', slug: 'spices' },
  { id: 5, name: 'Bakery Products', slug: 'bakery' },
  { id: 6, name: 'Sauces', slug: 'sauces' },
  { id: 7, name: 'Alcohol', slug: 'alcohol' },
  { id: 8, name: 'Tahini & Hummus', slug: 'tahini-hummus' },
  { id: 9, name: 'Snacks & Sweets', slug: 'snacks' },
  { id: 10, name: 'Coffee', slug: 'coffee' },
  { id: 11, name: 'Organic Products', slug: 'organic' }
];

const CategoryList = () => {
  const { t } = useLanguage();
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
    placeholderData: preloadedCategories as any,
    staleTime: 300000 // 5 minutes
  });

  if (error) {
    return null;
  }

  return (
    <section className="py-16 bg-[#f9e8c1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">{t('categories_title')}</h2>
          <div className="vintage-divider w-24 mx-auto"></div>
          <p className="text-[#5c4838] font-serif mt-4 max-w-2xl mx-auto">{t('categories_subtitle')}</p>
        </div>
        
        {/* Responsive grid with specific layout for different categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First row with 3 featured categories side by side */}
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 2 && (
              <CategoryCard key={categories[2].id} category={categories[2]} />
            )}
          </div>
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 1 && (
              <CategoryCard key={categories[1].id} category={categories[1]} />
            )}
          </div>
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 0 && (
              <CategoryCard key={categories[0].id} category={categories[0]} />
            )}
          </div>
          
          {/* Second row with 2 categories */}
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 3 && (
              <CategoryCard key={categories[3].id} category={categories[3]} />
            )}
          </div>
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 4 && (
              <CategoryCard key={categories[4].id} category={categories[4]} />
            )}
          </div>
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 6 && (
              <CategoryCard key={categories[6].id} category={categories[6]} />
            )}
          </div>
          
          {/* Third row with 3 categories */}
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 7 && (
              <CategoryCard key={categories[7].id} category={categories[7]} />
            )}
          </div>
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 5 && (
              <CategoryCard key={categories[5].id} category={categories[5]} />
            )}
          </div>
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 8 && (
              <CategoryCard key={categories[8].id} category={categories[8]} />
            )}
          </div>
          
          {/* Last row with remaining categories */}
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 9 && (
              <CategoryCard key={categories[9].id} category={categories[9]} />
            )}
          </div>
          <div className="md:col-span-1 lg:col-span-1 h-full">
            {categories && categories.length > 10 && (
              <CategoryCard key={categories[10].id} category={categories[10]} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
