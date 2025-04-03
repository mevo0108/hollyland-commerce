import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarFilledIcon, StarHalfIcon, StarOutlineIcon } from "@/lib/icons";
import { useCart } from "@/context/CartContext";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate star rating display
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFilledIcon key={`star-filled-${i}`} className="w-4 h-4 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="star-half" className="w-4 h-4 text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOutlineIcon key={`star-outline-${i}`} className="w-4 h-4 text-yellow-400" />);
    }
    
    return stars;
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onQuickView) {
      onQuickView(product);
    }
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition duration-300 border border-gray-200 h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          <img 
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-60 object-cover object-center transition-opacity duration-300"
          />
          
          {/* Product badges */}
          <div className="absolute top-0 right-0 p-2">
            {product.isNewArrival && (
              <Badge className="bg-amber-500 hover:bg-amber-500">New</Badge>
            )}
            {product.featured && !product.isNewArrival && (
              <Badge className="bg-blue-500 hover:bg-blue-500">Popular</Badge>
            )}
            {product.isSale && (
              <Badge variant="destructive">Sale</Badge>
            )}
          </div>
          
          {/* Quick view overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button 
              variant="secondary"
              className="transform translate-y-2 group-hover:translate-y-0 transition duration-300"
              onClick={handleQuickView}
            >
              Quick View
            </Button>
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.description}</p>
          
          <div className="flex justify-between items-center mt-auto">
            <div>
              {product.isSale && product.originalPrice ? (
                <div>
                  <span className="text-lg font-bold text-gray-900">${parseFloat(product.price.toString()).toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">${parseFloat(product.originalPrice.toString()).toFixed(2)}</span>
                </div>
              ) : (
                <div className="text-lg font-bold text-gray-900">${parseFloat(product.price.toString()).toFixed(2)}</div>
              )}
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center">
                {renderStarRating(product.rating ? parseFloat(product.rating.toString()) : 0)}
              </div>
              <span className="text-gray-500 text-sm ml-1">({product.reviewCount || 0})</span>
            </div>
          </div>
          
          <Button 
            className="mt-4 w-full"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
