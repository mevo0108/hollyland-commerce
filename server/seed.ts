import { db } from './db';
import { categories, products } from '../shared/schema';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function seed() {
  try {
    console.log('Starting seed...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    // Clear existing data
    console.log('Clearing existing data...');
    await db.delete(products);
    await db.delete(categories);

    // Insert categories
    console.log('Inserting categories...');
    const [supermarket, driedFruits, nuts, spices, bakery, sauces, alcohol, tahiniHummus, snacks, coffee, organic] = await db.insert(categories).values([
      {
        name: 'מוצרי סופר',
        description: 'מוצרי מזון בסיסיים מהסופר הישראלי',
        imageUrl: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818',
        slug: 'supermarket'
      },
      {
        name: 'פירות יבשים',
        description: 'פירות יבשים איכותיים מישראל',
        imageUrl: 'https://images.unsplash.com/photo-1596073419667-9d77d59f033f',
        slug: 'dried-fruits'
      },
      {
        name: 'אגוזים',
        description: 'אגוזים טריים וקלויים מהמשקים הישראלים',
        imageUrl: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e',
        slug: 'nuts'
      },
      {
        name: 'תבלינים ותערובות',
        description: 'תבלינים אותנטיים ותערובות תבלינים',
        imageUrl: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757',
        slug: 'spices'
      },
      {
        name: 'מוצרי מאפה',
        description: 'לחמים ומאפים מסורתיים ישראלים',
        imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c',
        slug: 'bakery'
      },
      {
        name: 'רטבים',
        description: 'רטבים אותנטיים ישראלים',
        imageUrl: 'https://images.unsplash.com/photo-1578020190125-f4f7c1c6f9b7',
        slug: 'sauces'
      },
      {
        name: 'משקאות חריפים',
        description: 'יין, בירה ומשקאות חריפים מישראל',
        imageUrl: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d',
        slug: 'alcohol'
      },
      {
        name: 'טחינה וחומוס',
        description: 'טחינה איכותית וחומוס אותנטי ישראלי',
        imageUrl: 'https://images.unsplash.com/photo-1590311930826-c6c9e159aaab',
        slug: 'tahini-hummus'
      },
      {
        name: 'חטיפים וממרחים',
        description: 'חטיפים וממרחים טעימים מישראל',
        imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60',
        slug: 'snacks'
      },
      {
        name: 'קפה',
        description: 'פולי קפה ותערובות קפה מישראל',
        imageUrl: 'https://images.unsplash.com/photo-1518057111178-44a106bad636',
        slug: 'coffee'
      },
      {
        name: 'מוצרים אורגניים',
        description: 'מוצרי מזון אורגניים מוסמכים מישראל',
        imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
        slug: 'organic'
      }
    ]).returning();

    console.log('Categories inserted:', supermarket.id, driedFruits.id, nuts.id, spices.id, bakery.id, sauces.id, alcohol.id, tahiniHummus.id, snacks.id, coffee.id, organic.id);

    // Insert products
    console.log('Inserting products...');
    const insertedProducts = await db.insert(products).values([
      {
        name: 'שמן זית עלית',
        description: 'שמן זית כתית מעולה מגידולי זיתים בגליל',
        price: '24.99',
        imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
        categoryId: supermarket.id,
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
        categoryId: driedFruits.id,
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
        categoryId: nuts.id,
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
        categoryId: spices.id,
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
        categoryId: bakery.id,
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
        categoryId: tahiniHummus.id,
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
        categoryId: alcohol.id,
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
        categoryId: snacks.id,
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
        categoryId: coffee.id,
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
        categoryId: organic.id,
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
        categoryId: sauces.id,
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