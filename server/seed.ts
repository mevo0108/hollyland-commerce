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
      name: 'Supermarket Products', 
      description: 'Essential grocery items from Israeli markets', 
      imageUrl: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818', 
      slug: 'supermarket' 
    },
    { 
      name: 'Dried Fruits', 
      description: 'Premium quality dried fruits from Israel', 
      imageUrl: 'https://images.unsplash.com/photo-1596073419667-9d77d59f033f', 
      slug: 'dried-fruits' 
    },
    { 
      name: 'Nuts', 
      description: 'Fresh and roasted nuts from Israeli farms', 
      imageUrl: 'https://images.unsplash.com/photo-1563296102-589cc7c2f8f4', 
      slug: 'nuts' 
    },
    { 
      name: 'Spices & Blends', 
      description: 'Authentic Israeli spices and seasoning blends', 
      imageUrl: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757', 
      slug: 'spices' 
    },
    { 
      name: 'Bakery Products', 
      description: 'Traditional Israeli breads and baked goods', 
      imageUrl: 'https://images.unsplash.com/photo-1586444248187-f5fea0e13d09', 
      slug: 'bakery' 
    },
    { 
      name: 'Sauces', 
      description: 'Authentic Israeli sauces and dips', 
      imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc', 
      slug: 'sauces' 
    },
    { 
      name: 'Alcohol', 
      description: 'Israeli wines, beers, and spirits', 
      imageUrl: 'https://images.unsplash.com/photo-1566108254082-92f1ca1a8475', 
      slug: 'alcohol' 
    },
    { 
      name: 'Tahini & Hummus', 
      description: 'Premium tahini and authentic Israeli hummus', 
      imageUrl: 'https://images.unsplash.com/photo-1563546541388-39fbcacf9c86', 
      slug: 'tahini-hummus' 
    },
    { 
      name: 'Snacks & Sweets', 
      description: 'Delicious Israeli snacks and confectionery', 
      imageUrl: 'https://images.unsplash.com/photo-1617029566671-5c71fcc915bc', 
      slug: 'snacks' 
    },
    { 
      name: 'Coffee', 
      description: 'Premium Israeli coffee beans and blends', 
      imageUrl: 'https://images.unsplash.com/photo-1518057111178-44a106bad636', 
      slug: 'coffee' 
    },
    { 
      name: 'Organic Products', 
      description: 'Certified organic food products from Israel', 
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e', 
      slug: 'organic' 
    }
  ];
  
  const insertedCategories = await db.insert(categories).values(categoriesData).returning();
  console.log(`Inserted ${insertedCategories.length} categories.`);
  return insertedCategories;
}

async function seedProducts() {
  const productsData: InsertProduct[] = [
    {
      name: 'Elite Israeli Olive Oil',
      description: 'Premium extra virgin olive oil from Galilee olive groves',
      price: '24.99',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
      categoryId: 1, // Supermarket Products
      featured: true,
      isNewArrival: false,
      isSale: false,
      stockQuantity: 50,
      rating: '4.8',
      reviewCount: 42,
      slug: 'elite-olive-oil'
    },
    {
      name: 'Israeli Date Mix',
      description: 'Assortment of premium Medjool and Deglet Noor dates',
      price: '16.99',
      imageUrl: 'https://images.unsplash.com/photo-1604085792782-8d92f276d7d8',
      categoryId: 2, // Dried Fruits
      featured: true,
      isNewArrival: false,
      isSale: false,
      stockQuantity: 30,
      rating: '5.0',
      reviewCount: 89,
      slug: 'israeli-date-mix'
    },
    {
      name: 'Premium Roasted Pistachios',
      description: 'Fresh roasted pistachios with Mediterranean sea salt',
      price: '12.99',
      imageUrl: 'https://images.unsplash.com/photo-1525706732602-9a8567d73e29',
      categoryId: 3, // Nuts
      featured: true,
      isNewArrival: false,
      isSale: true,
      originalPrice: '15.99',
      stockQuantity: 45,
      rating: '4.7',
      reviewCount: 56,
      slug: 'premium-pistachios'
    },
    {
      name: 'Za\'atar Spice Blend',
      description: 'Authentic Israeli za\'atar with wild thyme, sesame seeds, and sumac',
      price: '8.99',
      imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898',
      categoryId: 4, // Spices & Blends
      featured: true,
      isNewArrival: false,
      isSale: false,
      stockQuantity: 60,
      rating: '4.9',
      reviewCount: 37,
      slug: 'zaatar-spice-blend'
    },
    {
      name: 'Jerusalem Artisan Challah',
      description: 'Traditional braided bread made with organic Israeli flour',
      price: '9.99',
      imageUrl: 'https://images.unsplash.com/photo-1600398138360-73c3eaaa8d03',
      categoryId: 5, // Bakery Products
      featured: false,
      isNewArrival: true,
      isSale: false,
      stockQuantity: 40,
      rating: '4.6',
      reviewCount: 22,
      slug: 'artisan-challah'
    },
    {
      name: 'Premium Tahini Sauce',
      description: 'Creamy tahini made from 100% Ethiopian sesame seeds',
      price: '11.99',
      imageUrl: 'https://images.unsplash.com/photo-1590676681590-59bbf667f8e9',
      categoryId: 8, // Tahini & Hummus
      featured: false,
      isNewArrival: true,
      isSale: false,
      stockQuantity: 35,
      rating: '4.8',
      reviewCount: 24,
      slug: 'premium-tahini'
    },
    {
      name: 'Israeli Wine Selection',
      description: 'Award-winning red wine from the Golan Heights region',
      price: '29.99',
      imageUrl: 'https://images.unsplash.com/photo-1553361371-9513901d383f',
      categoryId: 7, // Alcohol
      featured: false,
      isNewArrival: true,
      isSale: false,
      stockQuantity: 25,
      rating: '5.0',
      reviewCount: 18,
      slug: 'israeli-wine'
    },
    {
      name: 'Organic Bamba Peanut Snacks',
      description: 'Popular Israeli peanut butter puffed corn snack',
      price: '4.99',
      imageUrl: 'https://images.unsplash.com/photo-1584178432809-fb5415b61dc8',
      categoryId: 9, // Snacks & Sweets
      featured: true,
      isNewArrival: true,
      isSale: false,
      stockQuantity: 80,
      rating: '4.7',
      reviewCount: 31,
      slug: 'bamba-snacks'
    },
    {
      name: 'Elite Turkish Coffee',
      description: 'Traditional finely ground dark roast coffee',
      price: '7.99',
      imageUrl: 'https://images.unsplash.com/photo-1506372023823-741c83b836fe',
      categoryId: 10, // Coffee
      featured: true,
      isNewArrival: false,
      isSale: false,
      stockQuantity: 50,
      rating: '4.5',
      reviewCount: 42,
      slug: 'elite-turkish-coffee'
    },
    {
      name: 'Organic Pomegranate Molasses',
      description: 'Sweet and tangy reduction made from organic Israeli pomegranates',
      price: '13.99',
      imageUrl: 'https://images.unsplash.com/photo-1592845598868-1c2b939181a4',
      categoryId: 11, // Organic Products
      featured: false,
      isNewArrival: true,
      isSale: false,
      stockQuantity: 30,
      rating: '4.8',
      reviewCount: 16,
      slug: 'pomegranate-molasses'
    },
    {
      name: 'Israeli Hot Sauce',
      description: 'Spicy schug sauce with fresh herbs and peppers',
      price: '6.99',
      imageUrl: 'https://images.unsplash.com/photo-1581166384010-1a548853cfc5',
      categoryId: 6, // Sauces
      featured: false,
      isNewArrival: true,
      isSale: true,
      originalPrice: '8.99',
      stockQuantity: 45,
      rating: '4.3',
      reviewCount: 28,
      slug: 'israeli-hot-sauce'
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