import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../products/CategoryCard";
import { Category } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

const CategoryList = () => {
  const { t } = useLanguage();
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-[#f9e8c1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">{t('categories_title')}</h2>
            <div className="vintage-divider w-24 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-w-1 aspect-h-1 rounded-lg bg-[#f0e0c0] border border-[#c49a6c] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !categories) {
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
