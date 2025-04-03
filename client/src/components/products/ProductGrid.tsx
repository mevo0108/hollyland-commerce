import { useState } from "react";
import { Link } from "wouter";
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2c1810] mb-4 md:mb-0">{title}</h2>
          {viewAllLink && (
            <Link href={viewAllLink}>
              <a className="text-[#8B4513] hover:text-[#6B3009] font-serif flex items-center group">
                <span className="border-b border-[#c49a6c] group-hover:border-[#8B4513]">View all products</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </a>
            </Link>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
