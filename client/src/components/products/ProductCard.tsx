import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarFilledIcon, StarHalfIcon, StarOutlineIcon } from "@/lib/icons";
import { useCart } from "@/context/CartContext";
import { Product } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { t, isRTL } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  // Define product-specific fallback images by category
  const getProductImage = (): string => {
    // If product has image, use it
    if (product.imageUrl) return product.imageUrl;

    // Default fallback image
    return 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=400&h=600&fit=crop';
  };

  const imageSrc = getProductImage();

  // Image preloading effect
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      setImageLoaded(true);
    };

    img.onerror = () => {
      // If image fails to load, use default image
      setImageLoaded(true);
    };

    // Set as loaded after timeout regardless, to avoid endless loading state
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [imageSrc]);

  return (
    <div
      className={`bg-[#f9e8c1] rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 border-2 border-[#c49a6c] h-full flex flex-col cursor-pointer ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transition: 'opacity 0.5s ease-in-out' }}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          <div className="relative overflow-hidden">
            <img
              src={imageSrc}
              alt={product.name}
              loading="eager"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=400&h=600&fit=crop';
              }}
              className="w-full h-60 object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/20 to-transparent"></div>
          </div>

          {/* Product badges */}
          <div className="absolute top-3 right-3">
            {product.isNewArrival && (
              <Badge className="bg-[#8B4513] hover:bg-[#8B4513] text-[#f9e8c1] border border-[#c49a6c] font-serif">{t('new_arrivals')}</Badge>
            )}
            {product.featured && !product.isNewArrival && (
              <Badge className="bg-[#2c1810] hover:bg-[#2c1810] text-[#f9e8c1] border border-[#c49a6c] font-serif">{t('featured_products')}</Badge>
            )}
            {product.isSale && (
              <Badge className="bg-[#b54834] hover:bg-[#b54834] text-[#f9e8c1] border border-[#c49a6c] font-serif">{t('sale')}</Badge>
            )}
          </div>

          {/* Quick view overlay */}
          <div className={`absolute inset-0 bg-[#2c1810] bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              variant="outline"
              className="bg-[#f9e8c1] border border-[#c49a6c] text-[#8B4513] hover:bg-[#f0e0c0] font-serif transform translate-y-2 group-hover:translate-y-0 transition duration-300"
              onClick={handleQuickView}
            >
              {t('quick_view')}
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
            {t('add_to_cart')}
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
