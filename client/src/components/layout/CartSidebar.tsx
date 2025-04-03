import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon } from "@/lib/icons";
import { Separator } from "@/components/ui/separator";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, isLoading } = useCart();
  
  useEffect(() => {
    // Add scroll lock to body when cart is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 max-w-md w-full h-full bg-white shadow-xl overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Your Cart ({cartItems.length})</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <CloseIcon className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 mx-auto text-gray-300" 
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
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Looks like you haven't added any products to your cart yet.</p>
              <Button onClick={onClose}>Start Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex py-3 border-b">
                  <div className="flex-shrink-0 w-20 h-20">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <Link href={`/products/${item.product.slug}`}>
                        <a className="text-sm font-medium hover:text-primary">
                          {item.product.name}
                        </a>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 text-gray-400 hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-gray-500 text-sm">
                      ${parseFloat(item.product.price.toString()).toFixed(2)}
                    </div>
                    <div className="flex items-center mt-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6 p-0 rounded-md"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusIcon className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 text-sm">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6 p-0 rounded-md"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Link href="/checkout">
                    <Button className="w-full" onClick={onClose}>
                      Checkout
                    </Button>
                  </Link>
                  <Link href="/cart">
                    <Button variant="outline" className="w-full" onClick={onClose}>
                      View Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
