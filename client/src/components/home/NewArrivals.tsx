import { useQuery } from "@tanstack/react-query";
import ProductGrid from "../products/ProductGrid";
import { Product } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

const NewArrivals = () => {
  const { t } = useLanguage();
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products/new-arrivals'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-[#f9e8c1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">{t('new_arrivals')}</h2>
            <div className="vintage-divider w-24 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#f9e8c1] rounded-lg border-2 border-[#c49a6c] p-4 shadow-md h-96 animate-pulse">
                <div className="h-60 bg-[#f0e0c0] rounded-md mb-4 border border-[#c49a6c]"></div>
                <div className="h-5 bg-[#f0e0c0] rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-[#f0e0c0] rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-[#f0e0c0] rounded mt-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !products) {
    return null;
  }

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
        <ProductGrid 
          products={products} 
          viewAllLink="/products?new=true" 
          title={t('new_arrivals')}
        />
      </div>
    </section>
  );
};

export default NewArrivals;
