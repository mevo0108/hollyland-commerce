import { useState } from "react";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloseIcon, StarFilledIcon, StarHalfIcon, StarOutlineIcon, HeartIcon, TruckIcon, RefreshIcon } from "@/lib/icons";
import { useCart } from "@/context/CartContext";
import { Product } from "@shared/schema";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Mock additional product images (in a real app, these would come from the product data)
  const productImages = [
    product.imageUrl,
    product.imageUrl, // Normally these would be different images
    product.imageUrl,
    product.imageUrl
  ];
  
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
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <div className="flex justify-between items-start">
          <DialogTitle>Product Quick View</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <CloseIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={productImages[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden bg-gray-100 cursor-pointer ${index === activeImageIndex ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product details */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {renderStarRating(parseFloat(product.rating.toString()))}
              </div>
              <span className="text-gray-500 text-sm ml-2">({product.reviewCount} reviews)</span>
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-4">
              ${parseFloat(product.price.toString()).toFixed(2)}
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through ml-2">
                  ${parseFloat(product.originalPrice.toString()).toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="prose prose-sm text-gray-500 mb-6">
              <p>{product.description}</p>
              <ul className="list-disc pl-5 mt-2">
                <li>High-quality materials</li>
                <li>Durable construction</li>
                <li>Modern design</li>
                <li>Satisfaction guaranteed</li>
                <li>30-day money-back guarantee</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Color</Label>
              <div className="flex space-x-2">
                <button className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-primary focus:outline-none"></button>
                <button className="w-8 h-8 rounded-full bg-white border border-gray-300 focus:outline-none"></button>
                <button className="w-8 h-8 rounded-full bg-red-500 focus:outline-none"></button>
                <button className="w-8 h-8 rounded-full bg-blue-500 focus:outline-none"></button>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <Label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-4">Quantity</Label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button 
                  variant="ghost" 
                  className="px-2"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </Button>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center border-0"
                />
                <Button 
                  variant="ghost" 
                  className="px-2"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button className="flex-1" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <HeartIcon className="mr-2 h-4 w-4" /> Add to Wishlist
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <TruckIcon className="text-gray-500 mr-2 h-4 w-4" />
                <p className="text-sm text-gray-500">Free shipping on orders over $50</p>
              </div>
              <div className="flex items-center mt-2">
                <RefreshIcon className="text-gray-500 mr-2 h-4 w-4" />
                <p className="text-sm text-gray-500">Free 30-day returns</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Link href={`/products/${product.slug}`}>
                <Button variant="link" className="px-0">View full details</Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
