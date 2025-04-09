import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon } from "@/lib/icons";
import { Separator } from "@/components/ui/separator";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, isLoading } = useCart();
  const { t, isRTL } = useLanguage();

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
      <div className={`fixed top-0 ${isRTL ? 'left-0 border-r' : 'right-0 border-l'} max-w-md w-full h-full bg-[#f9e8c1] shadow-xl overflow-y-auto border-[#c49a6c]`}>
        <div className="p-4 flex justify-between items-center border-b border-[#c49a6c]">
          <h2 className="text-lg font-bold font-serif text-[#2c1810]">{t('cart_title')} ({cartItems.length})</h2>
          <Button variant="ghost" size="icon" className="bg-[#f0e0c0] hover:bg-[#e0d0b0] border border-[#c49a6c]" onClick={onClose}>
            <CloseIcon className="h-5 w-5 text-[#8B4513]" />
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
                  className="h-16 w-16 mx-auto text-[#c49a6c]"
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
              <h3 className="text-lg font-bold font-serif text-[#2c1810] mb-2">{t('cart_empty')}</h3>
              <p className="text-[#5c4838] mb-4 font-serif">Looks like you haven't added any products to your cart yet.</p>
              <Button className="vintage-button bg-[#8B4513] hover:bg-[#6B3009] text-[#f9e8c1] border border-[#c49a6c]" onClick={onClose}>
                {t('continue_shopping')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className={`flex py-3 border-b border-[#c49a6c] ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="flex-shrink-0 w-20 h-20">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded border border-[#c49a6c]"
                    />
                  </div>
                  <div className={`${isRTL ? 'mr-3' : 'ml-3'} flex-1`}>
                    <div className="flex justify-between">
                      <Link href={`/products/${item.product.slug}`}>
                        <a className="text-sm font-medium font-serif text-[#2c1810] hover:text-[#8B4513]">
                          {item.product.name}
                        </a>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-[#8B4513] hover:text-[#ff4500]"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-[#5c4838] text-sm font-serif">
                      ${parseFloat(item.product.price.toString()).toFixed(2)}
                    </div>
                    <div className="flex items-center mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 p-0 rounded-md bg-[#f0e0c0] border-[#c49a6c] hover:bg-[#e0d0b0] text-[#8B4513]"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusIcon className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 text-sm font-serif font-medium text-[#2c1810]">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 p-0 rounded-md bg-[#f0e0c0] border-[#c49a6c] hover:bg-[#e0d0b0] text-[#8B4513]"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 space-y-3 bg-[#f0e0c0] p-4 rounded-md border border-[#c49a6c]">
                <div className="flex justify-between">
                  <span className="text-[#5c4838] font-serif">{t('subtotal')}</span>
                  <span className="font-medium font-serif text-[#2c1810]">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5c4838] font-serif">{t('shipping')}</span>
                  <span className="font-medium font-serif text-[#2c1810]">Calculated at checkout</span>
                </div>
                <div className="h-px bg-[#c49a6c] my-2"></div>
                <div className="flex justify-between font-bold text-[#2c1810] font-serif">
                  <span>{t('total')}</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="mt-6 space-y-3">
                  <Link href="/checkout">
                    <Button className="w-full vintage-button bg-[#8B4513] hover:bg-[#6B3009] text-[#f9e8c1] border border-[#c49a6c]" onClick={onClose}>
                      {t('checkout')}
                    </Button>
                  </Link>
                  <Link href="/cart">
                    <Button variant="outline" className="w-full bg-[#f9e8c1] border-[#c49a6c] text-[#8B4513] hover:bg-[#f0e0c0] font-serif" onClick={onClose}>
                      {t('cart_title')}
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
