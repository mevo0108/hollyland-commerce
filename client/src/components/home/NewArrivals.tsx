import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarFilledIcon, StarHalfIcon, StarOutlineIcon } from "@/lib/icons";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

const NewArrivals = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  // Simple product component - direct render approach
  const SimpleProductCard = ({ 
    id, 
    name, 
    price, 
    originalPrice = null,
    description, 
    image, 
    slug, 
    isSale = false,
    isNew = true,
    isFeatured = false,
    rating = 4.5,
    reviewCount = 20
  }) => {
    const handleAddToCart = (e) => {
      e.preventDefault();
      addToCart({
        id,
        name,
        price,
        description,
        imageUrl: image,
        slug,
        categoryId: 1,
        featured: isFeatured,
        isNewArrival: isNew,
        isSale,
        originalPrice,
        stockQuantity: 10,
        rating: rating.toString(),
        reviewCount
      }, 1);
    };

    // Simple star rating display
    const renderStars = (rating) => {
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
                    <span className="text-xl font-bold text-[#b54834]">${parseFloat(price).toFixed(2)}</span>
                    <span className="text-sm text-[#5c4838] line-through sm:ml-2">${parseFloat(originalPrice).toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-[#2c1810] font-serif">${parseFloat(price).toFixed(2)}</div>
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
        
        {/* Direct rendering of products - simpler approach */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <SimpleProductCard 
            id={5}
            name="Tel Aviv Date Honey"
            price={15.99}
            description="Natural date honey (silan) from Israeli dates"
            image="https://images.unsplash.com/photo-1558642115-85a221daf5ed?q=80&w=500&h=500&fit=crop"
            slug="tel-aviv-date-honey"
            isFeatured={false}
            isNew={true}
            isSale={false}
            rating={4.7}
            reviewCount={28}
          />
          
          <SimpleProductCard 
            id={6}
            name="Golan Heights Wine"
            price={29.99}
            description="Award-winning red wine from the Golan Heights region"
            image="https://images.unsplash.com/photo-1553682544-4ccf2778c93e?q=80&w=500&h=500&fit=crop"
            slug="golan-heights-wine"
            isFeatured={false}
            isNew={true}
            isSale={false}
            rating={4.6}
            reviewCount={12}
          />
          
          <SimpleProductCard 
            id={7}
            name="Jerusalem Za'atar Blend"
            price={7.99}
            description="Traditional za'atar herb mix with sesame and sumac"
            image="https://images.unsplash.com/photo-1526552184243-5e3a6f869a24?q=80&w=500&h=500&fit=crop"
            slug="jerusalem-zaatar-blend"
            isFeatured={false}
            isNew={true}
            isSale={false}
            rating={4.8}
            reviewCount={18}
          />
          
          <SimpleProductCard 
            id={8}
            name="Negev Desert Dates"
            price={11.99}
            originalPrice={14.99}
            description="Premium Medjool dates from the Negev Desert"
            image="https://images.unsplash.com/photo-1586377711939-8f0c20ec7593?q=80&w=500&h=500&fit=crop"
            slug="negev-desert-dates"
            isFeatured={false}
            isNew={true}
            isSale={true}
            rating={4.9}
            reviewCount={22}
          />
        </div>
        
        <div className="text-center mt-10">
          <Link href="/products?new=true">
            <Button className="vintage-button bg-[#8B4513] hover:bg-[#6B3009] text-[#f9e8c1] border border-[#c49a6c] font-serif">
              {t('view_all')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
