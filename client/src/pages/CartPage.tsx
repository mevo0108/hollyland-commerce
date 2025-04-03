import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusIcon, MinusIcon, TrashIcon } from "@/lib/icons";
import { Input } from "@/components/ui/input";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, isLoading } = useCart();
  const [_, navigate] = useLocation();
  const [couponCode, setCouponCode] = useState("");
  
  const handleQuantityChange = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };
  
  const handleRemove = (id: number) => {
    removeFromCart(id);
  };
  
  // Function to simulate coupon application - would be replaced with a real API call
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally validate the coupon with the server
    alert(`Coupon "${couponCode}" applied!`);
  };
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <Card>
          <CardContent className="p-8 flex flex-col items-center">
            <div className="mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 text-gray-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5}
                  d="M3 3h2l.5 5m0 0H20a2 2 0 0 1 2 2c0 .6-.3 1.2-.7 1.6L17 16h-10c-1 0-1.7-.6-2-1.4L3 4" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5}
                  d="M16 6h-9m6 5.5v-3m-3 3v-3" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6 text-center">Looks like you haven't added any products to your cart yet.</p>
            <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="hidden md:grid md:grid-cols-6 text-sm font-medium text-gray-500 mb-4">
                <div className="md:col-span-3">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>
              
              <Separator className="mb-6 md:hidden" />
              
              {cartItems.map((item) => (
                <div key={item.id}>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 py-4">
                    <div className="md:col-span-3 flex items-center">
                      <div className="flex-shrink-0 w-20 h-20">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="ml-4">
                        <Link href={`/products/${item.product.slug}`}>
                          <span className="font-medium text-gray-900 hover:text-primary cursor-pointer">
                            {item.product.name}
                          </span>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{item.product.description?.substring(0, 50)}...</p>
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col md:items-center md:justify-center">
                      <span className="md:hidden font-medium text-gray-500">Price: </span>
                      <span className="text-gray-900">${parseFloat(item.product.price.toString()).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex md:justify-center items-center">
                      <span className="md:hidden font-medium text-gray-500 mr-2">Quantity: </span>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <MinusIcon className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <PlusIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between md:justify-end items-center">
                      <span className="md:hidden font-medium text-gray-500">Total: </span>
                      <div className="flex items-center">
                        <span className="text-gray-900 font-medium mr-4">
                          ${(parseFloat(item.product.price.toString()) * item.quantity).toFixed(2)}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          onClick={() => handleRemove(item.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
              
              <div className="mt-6 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>
              
              <form onSubmit={handleApplyCoupon} className="mb-6">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Discount code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" variant="outline">Apply</Button>
                </div>
              </form>
              
              <Separator />
              
              <div className="flex justify-between items-center py-4">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full"
                size="lg"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
