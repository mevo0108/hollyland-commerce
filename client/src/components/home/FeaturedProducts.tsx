import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProductGrid from "../products/ProductGrid";
import { Product } from "@shared/schema";

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">Featured Products</h2>
            <div className="vintage-divider w-24 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#f9e8c1] rounded-lg border border-[#c49a6c] p-4 shadow-md h-96 animate-pulse">
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
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik01NC4wMSA0OS4zNDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVMNi4wMSA0OS4zNDVMMCA0My4zMzVsMTIuMDA1LTEyLjAwNUwwIDE5LjMyNWw2LjAxLTYuMDFsMTIuMDA1IDEyLjAwNUwzMC4wMiAxMy4zMTVsMTIuMDA1IDEyLjAwNUw1NC4wMSAxMy4zMTVsNi4wMSA2LjAxTDQ4LjAxNSAzMS4zM0w2MC4wMiA0My4zMzV6IiBmaWxsPSIjYzQ5YTZjIiBmaWxsLW9wYWNpdHk9IjAuMDUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-30"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">Featured Products</h2>
          <div className="vintage-divider w-24 mx-auto"></div>
          <p className="text-[#5c4838] font-serif mt-4 max-w-2xl mx-auto">Our handpicked selection of premium Israeli products that our customers love</p>
        </div>
        <ProductGrid 
          products={products} 
          viewAllLink="/products?featured=true" 
        />
        <div className="text-center mt-10">
          <Link href="/products">
            <Button className="vintage-button bg-[#8B4513] hover:bg-[#6B3009] text-[#f9e8c1] border border-[#c49a6c] font-serif">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default FeaturedProducts;
