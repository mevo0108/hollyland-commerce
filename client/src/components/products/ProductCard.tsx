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
      className="bg-[#f9e8c1] rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition duration-300 border-2 border-[#c49a6c] h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          <div className="relative overflow-hidden">
            <img 
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-60 object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/20 to-transparent"></div>
          </div>
          
          {/* Product badges */}
          <div className="absolute top-3 right-3">
            {product.isNewArrival && (
              <Badge className="bg-[#8B4513] hover:bg-[#8B4513] text-[#f9e8c1] border border-[#c49a6c] font-serif">New</Badge>
            )}
            {product.featured && !product.isNewArrival && (
              <Badge className="bg-[#2c1810] hover:bg-[#2c1810] text-[#f9e8c1] border border-[#c49a6c] font-serif">Featured</Badge>
            )}
            {product.isSale && (
              <Badge className="bg-[#b54834] hover:bg-[#b54834] text-[#f9e8c1] border border-[#c49a6c] font-serif">Sale</Badge>
            )}
          </div>
          
          {/* Quick view overlay */}
          <div className={`absolute inset-0 bg-[#2c1810] bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button 
              variant="outline"
              className="bg-[#f9e8c1] border border-[#c49a6c] text-[#8B4513] hover:bg-[#f0e0c0] font-serif transform translate-y-2 group-hover:translate-y-0 transition duration-300"
              onClick={handleQuickView}
            >
              Quick View
            </Button>
          </div>
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-serif font-bold text-[#2c1810] group-hover:text-[#8B4513] transition-colors">{product.name}</h3>
          <div className="w-12 h-0.5 bg-[#c49a6c] my-2"></div>
          <p className="text-[#5c4838] text-sm mb-4 font-serif">{product.description}</p>
          
          <div className="flex justify-between items-center mt-auto">
            <div>
              {product.isSale && product.originalPrice ? (
                <div className="flex flex-col sm:flex-row sm:items-center font-serif">
                  <span className="text-xl font-bold text-[#b54834]">${parseFloat(product.price.toString()).toFixed(2)}</span>
                  <span className="text-sm text-[#5c4838] line-through sm:ml-2">${parseFloat(product.originalPrice.toString()).toFixed(2)}</span>
                </div>
              ) : (
                <div className="text-xl font-bold text-[#2c1810] font-serif">${parseFloat(product.price.toString()).toFixed(2)}</div>
              )}
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center">
                {renderStarRating(product.rating ? parseFloat(product.rating.toString()) : 0)}
              </div>
              <span className="text-[#5c4838] text-sm ml-1 font-serif">({product.reviewCount || 0})</span>
            </div>
          </div>
          
          <Button 
            className="mt-5 w-full bg-[#8B4513] hover:bg-[#6B3009] text-[#f9e8c1] border border-[#c49a6c] font-serif"
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
