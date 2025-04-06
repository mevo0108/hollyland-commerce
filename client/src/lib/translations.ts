export type Language = 'en' | 'he';

export type TranslationKey = 
  // Navigation
  | 'home'
  | 'products'
  | 'categories'
  | 'cart'
  | 'checkout'
  | 'search'
  
  // Hero section
  | 'hero_title'
  | 'hero_subtitle'
  | 'hero_button'
  
  // Categories
  | 'categories_title'
  | 'categories_subtitle'
  | 'view_all'
  
  // Category Names
  | 'category_supermarket'
  | 'category_driedfruits'
  | 'category_nuts'
  | 'category_spices'
  | 'category_bakery'
  | 'category_sauces'
  | 'category_alcohol'
  | 'category_tahini'
  | 'category_snacks'
  | 'category_coffee'
  | 'category_organic'
  
  // Products
  | 'featured_products'
  | 'featured_subtitle'
  | 'new_arrivals'
  | 'new_arrivals_subtitle'
  | 'quick_view'
  | 'add_to_cart'
  | 'price'
  | 'sale'
  
  // Testimonials
  | 'testimonials_title'
  | 'testimonials_subtitle'
  | 'testimonials_footer'
  
  // Newsletter
  | 'newsletter_title'
  | 'newsletter_subtitle'
  | 'newsletter_placeholder'
  | 'newsletter_button'
  | 'newsletter_privacy'
  
  // Cart
  | 'cart_title'
  | 'cart_empty'
  | 'cart_total'
  | 'continue_shopping'
  | 'proceed_to_checkout'
  | 'remove'
  | 'quantity'
  
  // Checkout
  | 'checkout_title'
  | 'billing_details'
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone'
  | 'address'
  | 'city'
  | 'postal_code'
  | 'order_summary'
  | 'subtotal'
  | 'shipping'
  | 'total'
  | 'place_order'
  
  // Order confirmation
  | 'order_confirmation_title'
  | 'order_confirmation_message'
  | 'order_number'
  | 'back_to_shopping'
  
  // Footer
  | 'footer_company'
  | 'footer_about'
  | 'footer_contact'
  | 'footer_shipping'
  | 'footer_returns'
  | 'footer_privacy'
  | 'footer_terms'
  | 'footer_copyright';

type TranslationDictionary = {
  [key in TranslationKey]: string;
};

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    categories: 'Categories',
    cart: 'Cart',
    checkout: 'Checkout',
    search: 'Search',
    
    // Hero section
    hero_title: 'Authentic Flavors of Israel',
    hero_subtitle: 'Discover premium products directly imported from the heart of Israel',
    hero_button: 'Shop Now',
    
    // Categories
    categories_title: 'Shop by Category',
    categories_subtitle: 'Explore our curated selection of authentic Israeli products',
    view_all: 'View All',
    
    // Category Names
    category_supermarket: 'Supermarket Products',
    category_driedfruits: 'Dried Fruits',
    category_nuts: 'Nuts',
    category_spices: 'Spices & Blends',
    category_bakery: 'Bakery Products',
    category_sauces: 'Sauces',
    category_alcohol: 'Alcohol',
    category_tahini: 'Tahini & Hummus',
    category_snacks: 'Snacks & Sweets',
    category_coffee: 'Coffee',
    category_organic: 'Organic Products',
    
    // Products
    featured_products: 'Featured Products',
    featured_subtitle: 'Our most popular items from Israel',
    new_arrivals: 'New Arrivals',
    new_arrivals_subtitle: 'Fresh imports just for you',
    quick_view: 'Quick View',
    add_to_cart: 'Add to Cart',
    price: 'Price',
    sale: 'Sale',
    
    // Testimonials
    testimonials_title: 'Customer Stories',
    testimonials_subtitle: 'Experience the authentic connection to Israel through the words of our satisfied customers',
    testimonials_footer: 'Join our satisfied customers and experience the taste of authentic Israel',
    
    // Newsletter
    newsletter_title: 'Join Our Newsletter',
    newsletter_subtitle: 'Subscribe to stay updated on new products, exclusive offers, and the stories behind our authentic Israeli imports',
    newsletter_placeholder: 'Enter your email address',
    newsletter_button: 'Subscribe',
    newsletter_privacy: 'We respect your privacy. You can unsubscribe at any time.',
    
    // Cart
    cart_title: 'Your Cart',
    cart_empty: 'Your cart is empty',
    cart_total: 'Total',
    continue_shopping: 'Continue Shopping',
    proceed_to_checkout: 'Proceed to Checkout',
    remove: 'Remove',
    quantity: 'Quantity',
    
    // Checkout
    checkout_title: 'Checkout',
    billing_details: 'Billing Details',
    first_name: 'First Name',
    last_name: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    postal_code: 'Postal Code',
    order_summary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    place_order: 'Place Order',
    
    // Order confirmation
    order_confirmation_title: 'Order Confirmed',
    order_confirmation_message: 'Thank you for your order! We\'ll ship your authentic Israeli products soon.',
    order_number: 'Order Number',
    back_to_shopping: 'Back to Shopping',
    
    // Footer
    footer_company: 'Company',
    footer_about: 'About Us',
    footer_contact: 'Contact',
    footer_shipping: 'Shipping',
    footer_returns: 'Returns',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_copyright: 'All rights reserved'
  },
  
  he: {
    // Navigation
    home: 'דף הבית',
    products: 'מוצרים',
    categories: 'קטגוריות',
    cart: 'עגלה',
    checkout: 'תשלום',
    search: 'חיפוש',
    
    // Hero section
    hero_title: 'טעמים אותנטיים של ישראל',
    hero_subtitle: 'גלה מוצרים איכותיים המיובאים ישירות מלב ישראל',
    hero_button: 'לקניות',
    
    // Categories
    categories_title: 'קנה לפי קטגוריה',
    categories_subtitle: 'גלה את מבחר המוצרים האותנטיים שלנו מישראל',
    view_all: 'צפה בהכל',
    
    // Category Names
    category_supermarket: 'מוצרי סופר',
    category_driedfruits: 'פירות ייבשים',
    category_nuts: 'אגוזים',
    category_spices: 'תבלינים ותערובות',
    category_bakery: 'מוצרי מאפה',
    category_sauces: 'רטבים',
    category_alcohol: 'אלכוהול',
    category_tahini: 'טחינה וחומוס',
    category_snacks: 'ממתקים וחטיפים',
    category_coffee: 'קפה',
    category_organic: 'מוצרי מזון אורגנים',
    
    // Products
    featured_products: 'מוצרים מובילים',
    featured_subtitle: 'המוצרים הפופולריים ביותר שלנו מישראל',
    new_arrivals: 'מוצרים חדשים',
    new_arrivals_subtitle: 'יבוא טרי במיוחד בשבילך',
    quick_view: 'תצוגה מהירה',
    add_to_cart: 'הוסף לעגלה',
    price: 'מחיר',
    sale: 'מבצע',
    
    // Testimonials
    testimonials_title: 'סיפורי לקוחות',
    testimonials_subtitle: 'חווה את החיבור האותנטי לישראל דרך הסיפורים של לקוחותינו המרוצים',
    testimonials_footer: 'הצטרף ללקוחות המרוצים שלנו וחווה את הטעם האותנטי של ישראל',
    
    // Newsletter
    newsletter_title: 'הצטרף לניוזלטר שלנו',
    newsletter_subtitle: 'הירשם כדי להתעדכן במוצרים חדשים, הצעות בלעדיות והסיפורים מאחורי היבוא האותנטי שלנו מישראל',
    newsletter_placeholder: 'הכנס את כתובת האימייל שלך',
    newsletter_button: 'הרשם',
    newsletter_privacy: 'אנו מכבדים את פרטיותך. תוכל לבטל את המנוי בכל עת.',
    
    // Cart
    cart_title: 'העגלה שלך',
    cart_empty: 'העגלה שלך ריקה',
    cart_total: 'סך הכל',
    continue_shopping: 'המשך לקנות',
    proceed_to_checkout: 'המשך לתשלום',
    remove: 'הסר',
    quantity: 'כמות',
    
    // Checkout
    checkout_title: 'תשלום',
    billing_details: 'פרטי חיוב',
    first_name: 'שם פרטי',
    last_name: 'שם משפחה',
    email: 'אימייל',
    phone: 'טלפון',
    address: 'כתובת',
    city: 'עיר',
    postal_code: 'מיקוד',
    order_summary: 'סיכום הזמנה',
    subtotal: 'סכום ביניים',
    shipping: 'משלוח',
    total: 'סך הכל',
    place_order: 'בצע הזמנה',
    
    // Order confirmation
    order_confirmation_title: 'ההזמנה אושרה',
    order_confirmation_message: 'תודה על הזמנתך! נשלח את המוצרים האותנטיים מישראל בקרוב.',
    order_number: 'מספר הזמנה',
    back_to_shopping: 'חזרה לקניות',
    
    // Footer
    footer_company: 'חברה',
    footer_about: 'אודות',
    footer_contact: 'צור קשר',
    footer_shipping: 'משלוח',
    footer_returns: 'החזרות',
    footer_privacy: 'מדיניות פרטיות',
    footer_terms: 'תנאי שימוש',
    footer_copyright: 'כל הזכויות שמורות'
  }
};

export function getTranslation(language: Language, key: TranslationKey): string {
  return translations[language][key];
}