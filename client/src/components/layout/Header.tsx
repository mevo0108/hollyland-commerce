import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { SearchIcon, MenuIcon, CartIcon, ChevronDownIcon, UserIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CartSidebar from "./CartSidebar";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import HollyandLogo from "@/assets/hollyand-logo.png";
import { TranslationKey } from "@/lib/translations";
import styles from './Header.module.css';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [location] = useLocation();
  const { cartCount } = useCart();
  const { t, isRTL } = useLanguage();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Map category slug to translation key
  const getCategoryTranslationKey = (slug: string): TranslationKey => {
    const keyMap: Record<string, TranslationKey> = {
      'supermarket': 'category_supermarket',
      'dried-fruits': 'category_driedfruits',
      'nuts': 'category_nuts',
      'spices': 'category_spices',
      'bakery': 'category_bakery',
      'sauces': 'category_sauces',
      'alcohol': 'category_alcohol',
      'tahini-hummus': 'category_tahini',
      'snacks': 'category_snacks',
      'coffee': 'category_coffee',
      'organic': 'category_organic'
    };

    return keyMap[slug] || 'categories';
  };

  return (
    <header className="bg-[#f9e8c1] shadow-md sticky top-0 z-50 border-b border-[#c49a6c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src={HollyandLogo} alt="Hollyand Premium Israel Products" className="h-16 w-auto" />
                <span className="sr-only">Hollyand Premium Israel Products</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.navigationWrapper}>
            <NavigationMenu>
              <NavigationMenuList dir={isRTL ? "rtl" : "ltr"} className="flex items-center gap-8">
                <NavigationMenuItem>
                  <Link href="/">
                    <NavigationMenuLink className={`text-[#2c1810] hover:text-[#8B4513] font-serif font-medium cursor-pointer ${location === "/" ? styles.activeLink : ""}`}>
                      {t('home')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Categories dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[#2c1810] hover:text-[#8B4513] font-serif font-medium">
                    {t('categories')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className={styles.menuContent}>
                      {categories?.map((category: Category) => (
                        <Link key={category.id} href={`/products/category/${category.slug}`}>
                          <span className={styles.menuItem}>
                            {t(getCategoryTranslationKey(category.slug))}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Products dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[#2c1810] hover:text-[#8B4513] font-serif font-medium">
                    {t('products')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className={styles.menuContent}>
                      <Link href="/products">
                        <span className={styles.menuItem}>
                          {t('all_products')}
                        </span>
                      </Link>
                      <Link href="/products?featured=true">
                        <span className={styles.menuItem}>
                          {t('featured_products')}
                        </span>
                      </Link>
                      <Link href="/products?sale=true">
                        <span className={styles.menuItem}>
                          {t('sale')}
                        </span>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* New Arrivals dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[#2c1810] hover:text-[#8B4513] font-serif font-medium">
                    {t('new_arrivals')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className={styles.menuContent}>
                      <Link href="/products?new=true">
                        <span className={styles.menuItem}>
                          {t('new_arrivals')}
                        </span>
                      </Link>
                      <Link href="/products?new=true&category=supermarket">
                        <span className={styles.menuItem}>
                          {t('category_supermarket')}
                        </span>
                      </Link>
                      <Link href="/products?new=true&category=coffee">
                        <span className={styles.menuItem}>
                          {t('category_coffee')}
                        </span>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            <Link href="/auth">
              <Button
                variant="ghost"
                size="icon"
                className="bg-[#f0e0c0] hover:bg-[#e0d0b0] border border-[#c49a6c]"
              >
                <UserIcon className="h-6 w-6 text-[#8B4513]" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="relative bg-[#f0e0c0] hover:bg-[#e0d0b0] border border-[#c49a6c]"
              onClick={() => setIsCartOpen(true)}
            >
              <span className="sr-only">Open cart</span>
              <CartIcon className="h-6 w-6 text-[#8B4513]" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-[#8B4513] text-white">
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-[#f0e0c0] hover:bg-[#e0d0b0] border border-[#c49a6c]"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6 text-[#8B4513]" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} categories={categories || []} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
