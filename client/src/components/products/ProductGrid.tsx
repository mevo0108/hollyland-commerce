import { useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { Product } from "@shared/schema";

interface ProductGridProps {
  products: Product[];
  title?: string;
  viewAllLink?: string;
}

const ProductGrid = ({ products, title, viewAllLink }: ProductGridProps) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };
  
  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };
  
  return (
    <div>
      {title && (
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-primary hover:text-blue-700 font-medium flex items-center">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={handleOpenQuickView}
          />
        ))}
      </div>
      
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={handleCloseQuickView}
        />
      )}
    </div>
  );
};

export default ProductGrid;
