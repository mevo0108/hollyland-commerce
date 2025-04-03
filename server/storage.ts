import { 
  type User, type InsertUser, users,
  type Category, type InsertCategory, categories,
  type Product, type InsertProduct, products,
  type CartItem, type InsertCartItem, cartItems,
  type Order, type InsertOrder, orders
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, inArray } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories);
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return db.select().from(products);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return db.select().from(products).where(eq(products.categoryId, categoryId));
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.featured, true));
  }
  
  async getNewArrivals(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.isNewArrival, true));
  }
  
  async getSaleProducts(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.isSale, true));
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
  
  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
  }
  
  async getCartItemWithProduct(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
    
    if (items.length === 0) {
      return [];
    }
    
    const productIds = items.map(item => item.productId);
    const productsResult = await db.select().from(products).where(inArray(products.id, productIds));
    
    const productsMap = new Map<number, Product>();
    productsResult.forEach(product => {
      productsMap.set(product.id, product);
    });
    
    return items.map(item => {
      const product = productsMap.get(item.productId);
      if (!product) {
        throw new Error(`Product not found for cart item: ${item.id}`);
      }
      return { ...item, product };
    });
  }
  
  async getCartItemById(id: number): Promise<CartItem | undefined> {
    const [item] = await db.select().from(cartItems).where(eq(cartItems.id, id));
    return item;
  }
  
  async createCartItem(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if product exists
    const [product] = await db.select().from(products).where(eq(products.id, cartItem.productId));
    
    if (!product) {
      throw new Error(`Product not found with id: ${cartItem.productId}`);
    }
    
    // Check if item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.sessionId, cartItem.sessionId),
          eq(cartItems.productId, cartItem.productId)
        )
      );
    
    if (existingItem) {
      // Update quantity of existing item
      const updatedItem = await this.updateCartItemQuantity(
        existingItem.id,
        existingItem.quantity + (cartItem.quantity || 1)
      );
      return updatedItem as CartItem;
    }
    
    // Create new cart item
    const [newCartItem] = await db.insert(cartItems).values({
      ...cartItem,
      quantity: cartItem.quantity || 1 // Ensure quantity is never undefined
    }).returning();
    
    return newCartItem;
  }
  
  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    if (quantity <= 0) {
      await db.delete(cartItems).where(eq(cartItems.id, id));
      return undefined;
    }
    
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
      
    return updatedItem;
  }
  
  async deleteCartItem(id: number): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.id, id)).returning();
    return result.length > 0;
  }
  
  async clearCart(sessionId: string): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId)).returning();
    return true;
  }
  
  // Order methods
  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }
}

export const storage = new DatabaseStorage();