import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarFilledIcon, StarHalfIcon, StarOutlineIcon } from "@/lib/icons";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  // Simplified product card for direct rendering
  interface ProductCardProps {
    id: number;
    name: string;
    price: number | string;
    originalPrice?: number | string | null;
    description: string;
    image: string;
    slug: string;
    isSale?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    rating?: number;
    reviewCount?: number;
  }

  const SimpleProductCard = ({
    id,
    name,
    price,
    originalPrice = null,
    description,
    image,
    slug,
    isSale = false,
    isNew = false,
    isFeatured = true,
    rating = 4.5,
    reviewCount = 20
  }: ProductCardProps) => {
    const handleAddToCart = (e: React.MouseEvent) => {
      e.preventDefault();
      addToCart({
        id,
        name,
        price: typeof price === 'string' ? price : price.toString(),
        description,
        imageUrl: image,
        slug,
        categoryId: 1,
        featured: isFeatured,
        isNewArrival: isNew,
        isSale,
        originalPrice: originalPrice !== null ?
          (typeof originalPrice === 'string' ? originalPrice : originalPrice.toString())
          : null,
        stockQuantity: 10,
        rating: rating.toString(),
        reviewCount
      }, 1);
    };

    // Simple star rating display
    const renderStars = (rating: number) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalf = rating % 1 >= 0.5;

      for (let i = 0; i < fullStars; i++) {
        stars.push(<StarFilledIcon key={`full-${i}`} className="w-4 h-4 text-yellow-400" />);
      }

      if (hasHalf) {
        stars.push(<StarHalfIcon key="half" className="w-4 h-4 text-yellow-400" />);
      }

      const emptyStars = 5 - Math.ceil(rating);
      for (let i = 0; i < emptyStars; i++) {
        stars.push(<StarOutlineIcon key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />);
      }

      return stars;
    };

    return (
      <div className="bg-[#f9e8c1] rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition duration-300 border-2 border-[#c49a6c] h-full flex flex-col">
        <Link href={`/products/${slug}`}>
          <div className="relative">
            <div className="relative overflow-hidden">
              <img
                src={image}
                alt={name}
                loading="eager"
                className="w-full h-60 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/20 to-transparent"></div>
            </div>

            {/* Product badges */}
            <div className="absolute top-3 right-3">
              {isNew && (
                <Badge className="bg-[#8B4513] hover:bg-[#8B4513] text-[#f9e8c1] border border-[#c49a6c] font-serif">{t('new_arrivals')}</Badge>
              )}
              {isFeatured && !isNew && (
                <Badge className="bg-[#2c1810] hover:bg-[#2c1810] text-[#f9e8c1] border border-[#c49a6c] font-serif">{t('featured_products')}</Badge>
              )}
              {isSale && (
                <Badge className="bg-[#b54834] hover:bg-[#b54834] text-[#f9e8c1] border border-[#c49a6c] font-serif">{t('sale')}</Badge>
              )}
            </div>
          </div>

          <div className="p-5 flex-grow flex flex-col">
            <h3 className="text-xl font-serif font-bold text-[#2c1810] group-hover:text-[#8B4513] transition-colors">{name}</h3>
            <div className="w-12 h-0.5 bg-[#c49a6c] my-2"></div>
            <p className="text-[#5c4838] text-sm mb-4 font-serif">{description}</p>

            <div className="flex justify-between items-center mt-auto">
              <div>
                {isSale && originalPrice ? (
                  <div className="flex flex-col sm:flex-row sm:items-center font-serif">
                    <span className="text-xl font-bold text-[#b54834]">
                      ${typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2)}
                    </span>
                    <span className="text-sm text-[#5c4838] line-through sm:ml-2">
                      ${typeof originalPrice === 'number' ? originalPrice.toFixed(2) : parseFloat(String(originalPrice)).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-[#2c1810] font-serif">
                    ${typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2)}
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <div className="flex items-center">
                  {renderStars(rating)}
                </div>
                <span className="text-[#5c4838] text-sm ml-1 font-serif">({reviewCount})</span>
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

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik01NC4wMSA0OS4zNDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVMNi4wMSA0OS4zNDVMMCA0My4zMzVsMTIuMDA1LTEyLjAwNUwwIDE5LjMyNWw2LjAxLTYuMDFsMTIuMDA1IDEyLjAwNUwzMC4wMiAxMy4zMTVsMTIuMDA1IDEyLjAwNUw1NC4wMSAxMy4zMTVsNi4wMSA2LjAxTDQ4LjAxNSAzMS4zM0w2MC4wMiA0My4zMzV6IiBmaWxsPSIjYzQ5YTZjIiBmaWxsLW9wYWNpdHk9IjAuMDUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-30"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">{t('featured_products')}</h2>
          <div className="vintage-divider w-24 mx-auto"></div>
          <p className="text-[#5c4838] font-serif mt-4 max-w-2xl mx-auto">{t('featured_subtitle')}</p>
        </div>

        {/* Direct rendering of products - simpler approach */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <SimpleProductCard
            id={1}
            name="Jerusalem Artisan Tahini"
            price={12.99}
            description="Premium stone-ground tahini made from the finest Ethiopian sesame seeds"
            image="https://images.unsplash.com/photo-1590676681590-59bbf667f8e9?q=80&w=500&h=500&fit=crop"
            slug="jerusalem-artisan-tahini"
            isFeatured={true}
            isNew={false}
            isSale={false}
            rating={4.8}
            reviewCount={124}
          />

          <SimpleProductCard
            id={2}
            name="Galilee Olive Oil"
            price={19.99}
            originalPrice={24.99}
            description="Extra virgin olive oil cold-pressed from Galilee olives"
            image="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500&h=500&fit=crop"
            slug="galilee-olive-oil"
            isFeatured={true}
            isNew={false}
            isSale={true}
            rating={4.9}
            reviewCount={86}
          />

          <SimpleProductCard
            id={3}
            name="Dead Sea Salt Mix"
            price={8.99}
            description="Authentic spice blend with minerals from the Dead Sea"
            image="https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=500&h=500&fit=crop"
            slug="dead-sea-salt-mix"
            isFeatured={true}
            isNew={false}
            isSale={false}
            rating={4.5}
            reviewCount={42}
          />

          <SimpleProductCard
            id={4}
            name="Tel Aviv Date Honey"
            price={15.99}
            description="Natural date honey (silan) from Israeli dates"
            image="https://images.unsplash.com/photo-1558642115-85a221daf5ed?q=80&w=500&h=500&fit=crop"
            slug="tel-aviv-date-honey"
            isFeatured={true}
            isNew={true}
            isSale={false}
            rating={4.7}
            reviewCount={28}
          />
        </div>

        <div className="text-center mt-10">
          <Link href="/products">
            <Button className="vintage-button bg-[#8B4513] hover:bg-[#6B3009] text-[#f9e8c1] border border-[#c49a6c] font-serif">
              {t('view_all')}
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default FeaturedProducts;
