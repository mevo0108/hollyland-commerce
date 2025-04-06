import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  StarFilledIcon,
  StarHalfIcon,
  StarOutlineIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
  RefreshIcon,
} from "@/lib/icons";
import { Product } from "@shared/schema";

const ProductDetailPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const [_, navigate] = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }

  // Generate star rating display
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarFilledIcon
          key={`star-filled-${i}`}
          className="w-5 h-5 text-yellow-400"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalfIcon key="star-half" className="w-5 h-5 text-yellow-400" />,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarOutlineIcon
          key={`star-outline-${i}`}
          className="w-5 h-5 text-yellow-400"
        />,
      );
    }

    return stars;
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden border border-gray-200">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="aspect-w-1 aspect-h-1 rounded-md overflow-hidden bg-white border border-gray-200 ring-2 ring-primary cursor-pointer">
              <img
                src={product.imageUrl}
                alt={`${product.name} thumbnail`}
                className="w-full h-full object-center object-cover"
              />
            </div>
            {/* Additional thumbnails would go here */}
          </div>
        </div>

        {/* Product details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {renderStarRating(parseFloat(product.rating.toString()))}
            </div>
            <span className="text-gray-500 text-sm ml-2">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold text-gray-900 mb-4">
            ${parseFloat(product.price.toString()).toFixed(2)}
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through ml-2">
                ${parseFloat(product.originalPrice.toString()).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Color selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Color</h3>
            <div className="flex space-x-2">
              <button
                className={`w-8 h-8 rounded-full bg-black focus:outline-none ${
                  selectedColor === "black"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                }`}
                onClick={() => setSelectedColor("black")}
                aria-label="Black"
              ></button>
              <button
                className={`w-8 h-8 rounded-full bg-white border border-gray-300 focus:outline-none ${
                  selectedColor === "white"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                }`}
                onClick={() => setSelectedColor("white")}
                aria-label="White"
              ></button>
              <button
                className={`w-8 h-8 rounded-full bg-red-500 focus:outline-none ${
                  selectedColor === "red"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                }`}
                onClick={() => setSelectedColor("red")}
                aria-label="Red"
              ></button>
              <button
                className={`w-8 h-8 rounded-full bg-blue-500 focus:outline-none ${
                  selectedColor === "blue"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                }`}
                onClick={() => setSelectedColor("blue")}
                aria-label="Blue"
              ></button>
            </div>
          </div>

          {/* Quantity selection */}
          <div className="flex items-center mb-6">
            <span className="text-sm font-medium text-gray-700 mr-4">
              Quantity
            </span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="px-2 h-9"
                onClick={handleDecrementQuantity}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center border-0 focus:ring-0"
              />
              <Button
                variant="ghost"
                size="icon"
                className="px-2 h-9"
                onClick={handleIncrementQuantity}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to cart button */}
          <Button
            size="lg"
            className="w-full sm:w-auto mb-4"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <Separator className="my-6" />

          {/* Product info tabs */}
          <Tabs defaultValue="description">
            <TabsList className="w-full">
              <TabsTrigger value="description" className="flex-1">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="flex-1">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                Shipping
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <div className="prose prose-sm max-w-none">
                <p>{product.description}</p>
                <p>
                  Experience premium quality with our {product.name}. Designed
                  for comfort, style, and durability, this product will exceed
                  your expectations.
                </p>
                <ul>
                  <li>High-quality materials</li>
                  <li>Durable construction</li>
                  <li>Modern design</li>
                  <li>Satisfaction guaranteed</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="prose prose-sm max-w-none">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="font-medium">Brand</td>
                      <td>ModernShop</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Model</td>
                      <td>{product.name}</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Warranty</td>
                      <td>1 year limited warranty</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Weight</td>
                      <td>0.5 kg</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Dimensions</td>
                      <td>25 x 15 x 5 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="prose prose-sm max-w-none">
                <div className="flex items-center mb-4">
                  <TruckIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <p className="text-gray-600">
                    Free shipping on orders over $50
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <RefreshIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <p className="text-gray-600">30-day free returns</p>
                </div>
                <p>Standard shipping: 3-5 business days</p>
                <p>Express shipping: 1-2 business days (additional fee)</p>
                <p>International shipping available to select countries.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
