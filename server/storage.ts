import { 
  type User, type InsertUser, users,
  type Category, type InsertCategory, categories,
  type Product, type InsertProduct, products,
  type CartItem, type InsertCartItem, cartItems,
  type Order, type InsertOrder, orders
} from "@shared/schema";

// Modify the interface with any CRUD methods
export interface IStorage {
  // User methods (from the initial template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  getSaleProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<CartItem[]>;
  getCartItemWithProduct(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  getCartItemById(id: number): Promise<CartItem | undefined>;
  createCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  deleteCartItem(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentOrderId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentOrderId = 1;
    
    // Seed initial data
    this.seedCategories();
    this.seedProducts();
  }

  // User methods (from the initial template)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured
    );
  }
  
  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNewArrival
    );
  }
  
  async getSaleProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isSale
    );
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }
  
  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }
  
  async getCartItemWithProduct(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await this.getCartItems(sessionId);
    return items.map((item) => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product not found for cart item: ${item.id}`);
      }
      return { ...item, product };
    });
  }
  
  async getCartItemById(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }
  
  async createCartItem(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if product exists
    const product = await this.getProductById(cartItem.productId);
    if (!product) {
      throw new Error(`Product not found with id: ${cartItem.productId}`);
    }
    
    // Check if item already exists in cart
    const existingItems = await this.getCartItems(cartItem.sessionId);
    const existingItem = existingItems.find(item => item.productId === cartItem.productId);
    
    if (existingItem) {
      // Update quantity of existing item
      return this.updateCartItemQuantity(existingItem.id, existingItem.quantity + cartItem.quantity) as Promise<CartItem>;
    }
    
    // Create new cart item
    const id = this.currentCartItemId++;
    const dateAdded = new Date();
    const newCartItem: CartItem = { ...cartItem, id, dateAdded };
    this.cartItems.set(id, newCartItem);
    return newCartItem;
  }
  
  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) {
      return undefined;
    }
    
    if (quantity <= 0) {
      this.cartItems.delete(id);
      return undefined;
    }
    
    const updatedItem: CartItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async deleteCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
  
  async clearCart(sessionId: string): Promise<boolean> {
    const cartItemsToDelete = await this.getCartItems(sessionId);
    cartItemsToDelete.forEach(item => {
      this.cartItems.delete(item.id);
    });
    return true;
  }
  
  // Order methods
  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const orderDate = new Date();
    const newOrder: Order = { ...order, id, orderDate };
    this.orders.set(id, newOrder);
    return newOrder;
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  // Seed methods
  private seedCategories() {
    const categoriesData: InsertCategory[] = [
      { 
        name: 'Footwear', 
        description: 'Comfortable and stylish footwear for all occasions', 
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12', 
        slug: 'footwear' 
      },
      { 
        name: 'Watches', 
        description: 'Premium watches with advanced features', 
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', 
        slug: 'watches' 
      },
      { 
        name: 'Electronics', 
        description: 'Latest electronic gadgets and accessories', 
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', 
        slug: 'electronics' 
      },
      { 
        name: 'Clothing', 
        description: 'Fashionable clothing for men and women', 
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2', 
        slug: 'clothing' 
      },
      { 
        name: 'Home & Garden', 
        description: 'Decor and essentials for your home', 
        imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e', 
        slug: 'home-garden' 
      }
    ];
    
    categoriesData.forEach(category => {
      const id = this.currentCategoryId++;
      const newCategory: Category = { ...category, id };
      this.categories.set(id, newCategory);
    });
  }
  
  private seedProducts() {
    const productsData: InsertProduct[] = [
      {
        name: 'Wireless Headphones',
        description: 'Premium sound quality with active noise cancellation',
        price: '129.99',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        categoryId: 3, // Electronics
        featured: true,
        isNewArrival: false,
        isSale: false,
        stockQuantity: 50,
        rating: '4.5',
        reviewCount: 42,
        slug: 'wireless-headphones'
      },
      {
        name: 'Smart Watch',
        description: 'Fitness & health tracking with advanced features',
        price: '199.99',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        categoryId: 2, // Watches
        featured: true,
        isNewArrival: false,
        isSale: false,
        stockQuantity: 30,
        rating: '5.0',
        reviewCount: 89,
        slug: 'smart-watch'
      },
      {
        name: 'Running Sneakers',
        description: 'Lightweight & comfortable for optimal performance',
        price: '89.99',
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
        categoryId: 1, // Footwear
        featured: true,
        isNewArrival: false,
        isSale: true,
        originalPrice: '119.99',
        stockQuantity: 45,
        rating: '4.0',
        reviewCount: 56,
        slug: 'running-sneakers'
      },
      {
        name: 'Wireless Earbuds',
        description: 'Superior sound with noise cancellation technology',
        price: '79.99',
        imageUrl: 'https://images.unsplash.com/photo-1560343090-f0409e92791a',
        categoryId: 3, // Electronics
        featured: true,
        isNewArrival: false,
        isSale: false,
        stockQuantity: 60,
        rating: '4.5',
        reviewCount: 37,
        slug: 'wireless-earbuds'
      },
      {
        name: 'Portable Speaker',
        description: 'Waterproof design with powerful sound',
        price: '59.99',
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
        categoryId: 3, // Electronics
        featured: false,
        isNewArrival: true,
        isSale: false,
        stockQuantity: 40,
        rating: '4.0',
        reviewCount: 12,
        slug: 'portable-speaker'
      },
      {
        name: 'Sports Sneakers',
        description: 'Enhanced comfort for all-day wear',
        price: '99.99',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        categoryId: 1, // Footwear
        featured: false,
        isNewArrival: true,
        isSale: false,
        stockQuantity: 35,
        rating: '4.5',
        reviewCount: 24,
        slug: 'sports-sneakers'
      },
      {
        name: 'Designer Sunglasses',
        description: 'Stylish sunglasses with UV protection',
        price: '149.99',
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
        categoryId: 4, // Clothing
        featured: false,
        isNewArrival: true,
        isSale: false,
        stockQuantity: 25,
        rating: '5.0',
        reviewCount: 18,
        slug: 'designer-sunglasses'
      },
      {
        name: 'Smart Home Device',
        description: 'Voice-controlled assistant for your home',
        price: '129.99',
        imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad',
        categoryId: 3, // Electronics
        featured: false,
        isNewArrival: true,
        isSale: false,
        stockQuantity: 20,
        rating: '4.0',
        reviewCount: 31,
        slug: 'smart-home-device'
      }
    ];
    
    productsData.forEach(product => {
      const id = this.currentProductId++;
      const newProduct: Product = { ...product, id };
      this.products.set(id, newProduct);
    });
  }
}

export const storage = new MemStorage();
