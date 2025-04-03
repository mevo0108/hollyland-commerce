import { db } from './db';
import { categories, products, type InsertCategory, type InsertProduct } from '@shared/schema';

async function seed() {
  console.log('🌱 Seeding database...');
  
  // Check if categories already exist
  const existingCategories = await db.select().from(categories);
  if (existingCategories.length === 0) {
    console.log('Seeding categories...');
    await seedCategories();
  } else {
    console.log(`Categories already exist (${existingCategories.length} found). Skipping.`);
  }
  
  // Check if products already exist
  const existingProducts = await db.select().from(products);
  if (existingProducts.length === 0) {
    console.log('Seeding products...');
    await seedProducts();
  } else {
    console.log(`Products already exist (${existingProducts.length} found). Skipping.`);
  }
  
  console.log('✅ Seeding completed!');
}

async function seedCategories() {
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
  
  const insertedCategories = await db.insert(categories).values(categoriesData).returning();
  console.log(`Inserted ${insertedCategories.length} categories.`);
  return insertedCategories;
}

async function seedProducts() {
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
  
  const insertedProducts = await db.insert(products).values(productsData).returning();
  console.log(`Inserted ${insertedProducts.length} products.`);
  return insertedProducts;
}

// Run the seed function
seed().catch(error => {
  console.error('Error seeding database:', error);
  process.exit(1);
});