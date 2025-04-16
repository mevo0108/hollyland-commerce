import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { Product } from '@shared/schema';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  sessionId: string;
  dateAdded: Date;
  product: Product;
}

interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartCount: number;
}

// Create a default context implementation
const defaultContext: CartContextType = {
  cartItems: [],
  isLoading: false,
  addToCart: async () => { },
  updateQuantity: async () => { },
  removeFromCart: async () => { },
  clearCart: async () => { },
  cartTotal: 0,
  cartCount: 0
};

const CartContext = createContext<CartContextType>(defaultContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Generate or retrieve session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem('cartSessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('cartSessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Fetch cart items when session ID is available
  useEffect(() => {
    if (sessionId) {
      fetchCartItems();
    }
  }, [sessionId]);

  const fetchCartItems = async () => {
    if (!sessionId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/cart/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number) => {
    if (!sessionId) return;

    try {
      await apiRequest('POST', '/api/cart', {
        productId: product.id,
        quantity,
        sessionId,
      });

      await fetchCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      await apiRequest('PATCH', `/api/cart/${itemId}`, { quantity });

      if (quantity === 0) {
        setCartItems(cartItems.filter(item => item.id !== itemId));
      } else {
        setCartItems(
          cartItems.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      await apiRequest('DELETE', `/api/cart/${itemId}`, undefined);
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    if (!sessionId) return;

    try {
      await apiRequest('DELETE', `/api/cart/session/${sessionId}`, undefined);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + (parseFloat(item.product.price.toString()) * item.quantity),
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
function useCart(): CartContextType {
  const context = useContext(CartContext);
  return context;
}

export { useCart };
