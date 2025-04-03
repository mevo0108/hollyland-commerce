import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertOrderSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure nodemailer with a testing transport
  // In production, you would use SMTP configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "ethereal.user@ethereal.email",
      pass: process.env.SMTP_PASS || "ethereal_pass",
    },
  });

  // Store manager email address from environment variables
  const storeManagerEmail = process.env.STORE_MANAGER_EMAIL || "manager@example.com";

  // Categories API
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req: Request, res: Response) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Products API
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req: Request, res: Response) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/new-arrivals", async (req: Request, res: Response) => {
    try {
      const newArrivals = await storage.getNewArrivals();
      res.json(newArrivals);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
      res.status(500).json({ message: "Failed to fetch new arrivals" });
    }
  });

  app.get("/api/products/sale", async (req: Request, res: Response) => {
    try {
      const saleProducts = await storage.getSaleProducts();
      res.json(saleProducts);
    } catch (error) {
      console.error("Error fetching sale products:", error);
      res.status(500).json({ message: "Failed to fetch sale products" });
    }
  });

  app.get("/api/products/category/:categoryId", async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const products = await storage.getProductsByCategory(categoryId);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/:slug", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Cart API
  app.get("/api/cart/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      const cartItems = await storage.getCartItemWithProduct(sessionId);
      res.json(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const cartItemData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.createCartItem(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error adding item to cart:", error);
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(id, quantity);
      if (!updatedItem && quantity > 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json({ success: true, item: updatedItem });
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      const success = await storage.deleteCartItem(id);
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting cart item:", error);
      res.status(500).json({ message: "Failed to delete cart item" });
    }
  });

  app.delete("/api/cart/session/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      const success = await storage.clearCart(sessionId);
      res.json({ success });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Orders API
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      
      // Send email notification to store manager
      const cartItems = Array.isArray(order.items) ? order.items : [];
      
      let itemsHtml = '';
      let totalAmount = 0;
      
      cartItems.forEach((item: any) => {
        const itemTotal = parseFloat(item.price) * item.quantity;
        totalAmount += itemTotal;
        
        itemsHtml += `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${parseFloat(item.price).toFixed(2)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${itemTotal.toFixed(2)}</td>
          </tr>
        `;
      });
      
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">New Order Received</h2>
          <p>A new order has been placed with the following details:</p>
          
          <h3>Customer Information:</h3>
          <p>
            <strong>Name:</strong> ${order.customerName}<br>
            <strong>Email:</strong> ${order.email}<br>
            <strong>Phone:</strong> ${order.phone}<br>
            <strong>Address:</strong> ${order.address}, ${order.city}, ${order.state} ${order.postalCode}, ${order.country}
          </p>
          
          <h3>Order Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Product</th>
                <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Price</th>
                <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Quantity</th>
                <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold;">Order Total:</td>
                <td style="padding: 8px; font-weight: bold;">$${parseFloat(order.totalAmount.toString()).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <p style="margin-top: 20px;">Order ID: ${order.id}</p>
          <p>Date: ${order.orderDate.toLocaleString()}</p>
        </div>
      `;
      
      const mailOptions = {
        from: `"ModernShop" <noreply@modernshop.com>`,
        to: storeManagerEmail,
        subject: `New Order #${order.id} - ${order.customerName}`,
        html: emailHtml
      };
      
      await transporter.sendMail(mailOptions);
      
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      
      const order = await storage.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
