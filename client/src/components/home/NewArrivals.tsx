import { useQuery } from "@tanstack/react-query";
import ProductGrid from "../products/ProductGrid";
import { Product } from "@shared/schema";

const NewArrivals = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products/new-arrivals'],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 h-96 animate-pulse border border-gray-200">
                <div className="h-60 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mt-auto"></div>
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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid 
          products={products} 
          title="New Arrivals" 
          viewAllLink="/products?new=true" 
        />
      </div>
    </section>
  );
};

export default NewArrivals;
