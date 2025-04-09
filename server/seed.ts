import { db } from './db';
import { categories, products } from '../shared/schema';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const categoryData = [
  {
    name: "Supermarket",
    description: "Essential groceries and daily items",
    imageUrl: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=500&h=500&fit=crop",
    slug: "supermarket"
  },
  {
    name: "Dried Fruits",
    description: "Premium quality dried fruits",
    imageUrl: "https://images.unsplash.com/photo-1598569304117-624d53fd951f?q=80&w=500&h=500&fit=crop",
    slug: "dried-fruits"
  },
  {
    name: "Nuts",
    description: "Fresh and roasted nuts",
    imageUrl: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=500&h=500&fit=crop",
    slug: "nuts"
  },
  {
    name: "Spices",
    description: "Traditional and exotic spices",
    imageUrl: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=500&h=500&fit=crop",
    slug: "spices"
  },
  {
    name: "Bakery",
    description: "Fresh baked goods",
    imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?q=80&w=500&h=500&fit=crop",
    slug: "bakery"
  },
  {
    name: "Sauces",
    description: "Traditional and gourmet sauces",
    imageUrl: "https://images.unsplash.com/photo-1578020190125-f4f7c1c6f9b7?q=80&w=500&h=500&fit=crop",
    slug: "sauces"
  },
  {
    name: "Alcohol",
    description: "Fine wines and spirits",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=500&h=500&fit=crop",
    slug: "alcohol"
  },
  {
    name: "Tahini & Hummus",
    description: "Traditional spreads and dips",
    imageUrl: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=500&h=500&fit=crop",
    slug: "tahini-hummus"
  },
  {
    name: "Snacks",
    description: "Delicious snacks and treats",
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=500&h=500&fit=crop",
    slug: "snacks"
  },
  {
    name: "Coffee",
    description: "Premium coffee and tea",
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=500&h=500&fit=crop",
    slug: "coffee"
  },
  {
    name: "Organic",
    description: "Organic and natural products",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&h=500&fit=crop",
    slug: "organic"
  }
];

async function seed() {
  try {
    console.log('Starting seed...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    // Clear existing data
    console.log('Clearing existing data...');
    await db.delete(products);
    await db.delete(categories);

    // Insert categories and get their IDs
    console.log('Inserting categories...');
    const insertedCategories = await db.insert(categories).values(categoryData).returning();
    console.log('✅ Categories inserted successfully!');

    // Insert products using the returned category IDs
    console.log('Inserting products...');
    const insertedProducts = await db.insert(products).values([
      {
        name: 'שמן זית עלית',
        description: 'שמן זית כתית מעולה מגידולי זיתים בגליל',
        price: '24.99',
        imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
        categoryId: insertedCategories[0].id,
        featured: true,
        isNewArrival: false,
        isSale: false,
        stockQuantity: 50,
        rating: '4.8',
        reviewCount: 42,
        slug: 'elite-olive-oil'
      },
      {
        name: 'תערובת תמרים',
        description: 'תערובת של תמרים מג\'הול ודגלת נור איכותיים',
        price: '16.99',
        imageUrl: 'https://images.unsplash.com/photo-1604085792782-8d92f276d7d8',
        categoryId: insertedCategories[1].id,
        featured: true,
        isNewArrival: false,
        isSale: false,
        stockQuantity: 30,
        rating: '5.0',
        reviewCount: 89,
        slug: 'israeli-date-mix'
      },
      {
        name: 'פיסטוקים קלויים',
        description: 'פיסטוקים קלויים עם מלח ים תיכוני',
        price: '12.99',
        imageUrl: 'https://images.unsplash.com/photo-1525706732602-9a8567d73e29',
        categoryId: insertedCategories[2].id,
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
        name: 'תערובת זעתר',
        description: 'זעתר אותנטי עם זעתר בר, שומשום וסומק',
        price: '8.99',
        imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898',
        categoryId: insertedCategories[3].id,
        featured: true,
        isNewArrival: false,
        isSale: false,
        stockQuantity: 60,
        rating: '4.9',
        reviewCount: 37,
        slug: 'zaatar-spice-blend'
      },
      {
        name: 'חלה ארטיזנלית ירושלמית',
        description: 'חלה מסורתית אפויה מקמח אורגני ישראלי',
        price: '9.99',
        imageUrl: 'https://images.unsplash.com/photo-1600398138360-73c3eaaa8d03',
        categoryId: insertedCategories[4].id,
        featured: false,
        isNewArrival: true,
        isSale: false,
        stockQuantity: 40,
        rating: '4.6',
        reviewCount: 22,
        slug: 'artisan-challah'
      },
      {
        name: 'טחינה גולמית',
        description: 'טחינה גולמית עשויה מ-100% שומשום אתיופי',
        price: '11.99',
        imageUrl: 'https://images.unsplash.com/photo-1590676681590-59bbf667f8e9',
        categoryId: insertedCategories[5].id,
        featured: false,
        isNewArrival: true,
        isSale: false,
        stockQuantity: 35,
        rating: '4.8',
        reviewCount: 24,
        slug: 'premium-tahini'
      },
      {
        name: 'יין ישראלי',
        description: 'יין אדום זוכה פרסים מאזור רמת הגולן',
        price: '29.99',
        imageUrl: 'https://images.unsplash.com/photo-1553361371-9513901d383f',
        categoryId: insertedCategories[6].id,
        featured: false,
        isNewArrival: true,
        isSale: false,
        stockQuantity: 25,
        rating: '5.0',
        reviewCount: 18,
        slug: 'israeli-wine'
      },
      {
        name: 'חטיף במבה',
        description: 'חטיף תירס פריך בטעם חמאת בוטנים',
        price: '4.99',
        imageUrl: 'https://images.unsplash.com/photo-1584178432809-fb5415b61dc8',
        categoryId: insertedCategories[7].id,
        featured: true,
        isNewArrival: true,
        isSale: false,
        stockQuantity: 80,
        rating: '4.7',
        reviewCount: 31,
        slug: 'bamba-snacks'
      },
      {
        name: 'קפה טורקי עלית',
        description: 'קפה טורקי מסורתי טחון דק',
        price: '7.99',
        imageUrl: 'https://images.unsplash.com/photo-1506372023823-741c83b836fe',
        categoryId: insertedCategories[8].id,
        featured: true,
        isNewArrival: false,
        isSale: false,
        stockQuantity: 50,
        rating: '4.5',
        reviewCount: 42,
        slug: 'elite-turkish-coffee'
      },
      {
        name: 'סירופ רימונים אורגני',
        description: 'סירופ רימונים מתוק וחמוץ עשוי מרימונים אורגניים ישראלים',
        price: '13.99',
        imageUrl: 'https://images.unsplash.com/photo-1592845598868-1c2b939181a4',
        categoryId: insertedCategories[9].id,
        featured: false,
        isNewArrival: true,
        isSale: false,
        stockQuantity: 30,
        rating: '4.8',
        reviewCount: 16,
        slug: 'pomegranate-molasses'
      },
      {
        name: 'רוטב חריף ישראלי',
        description: 'רוטב חריף שוג עם עשבי תיבול ופלפל חריף',
        price: '6.99',
        imageUrl: 'https://images.unsplash.com/photo-1581166384010-1a548853cfc5',
        categoryId: insertedCategories[10].id,
        featured: false,
        isNewArrival: true,
        isSale: true,
        originalPrice: '8.99',
        stockQuantity: 45,
        rating: '4.3',
        reviewCount: 28,
        slug: 'israeli-hot-sauce'
      }
    ]).returning();

    console.log('Products inserted:', insertedProducts.length);
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error during seed:', error);
  }
}

// Run the seed function
seed();