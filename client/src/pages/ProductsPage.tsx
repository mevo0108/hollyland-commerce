import { useState, useEffect, useMemo } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Category, Product } from "@shared/schema";
import { SearchIcon } from "@/lib/icons";
import { useCategories } from "@/context/CategoryContext";

// פונקציה לקבלת מוצרים לפי קטגוריה
const getProductsByCategory = async (categoryId: number | null): Promise<Product[]> => {
  if (!categoryId) return [];
  const response = await fetch(`/api/products/category/${categoryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  return response.json();
};

const ProductsPage = () => {
  const [location, setLocation] = useLocation();
  const params = useParams();

  // Parse query params from URL
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const initialFeatured = searchParams.get('featured') === 'true';
  const initialNew = searchParams.get('new') === 'true';
  const initialSale = searchParams.get('sale') === 'true';
  const categoryParam = searchParams.get('category');

  // For debugging - log the params
  console.log("Route params:", params);
  console.log("URL category slug:", categoryParam);

  // Use either route parameter or query parameter
  const categorySlug = params?.slug || categoryParam;

  // Get categories from context
  const { categories, isLoading: categoriesLoading, getCategoryBySlug } = useCategories();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [featured, setFeatured] = useState(initialFeatured);
  const [isNew, setIsNew] = useState(initialNew);
  const [onSale, setOnSale] = useState(initialSale);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Get all products
  const { data: allProducts, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Get products based on category
  const { data: categoryProducts, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['products', 'category', selectedCategory],
    queryFn: () => {
      console.log("Fetching products for category ID:", selectedCategory);
      return getProductsByCategory(selectedCategory);
    },
    enabled: !!selectedCategory,
  });

  // Fetch category ID based on slug using Context
  useEffect(() => {
    if (categorySlug) {
      const category = getCategoryBySlug(categorySlug);
      if (category) {
        setSelectedCategory(category.id);
      }
    } else {
      setSelectedCategory(null);
    }
  }, [categorySlug, getCategoryBySlug]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    if (isNew) params.append('new', 'true');
    if (onSale) params.append('sale', 'true');

    // If there's a selected category, add it to the URL
    if (selectedCategory && categories) {
      const category = categories.find(c => c.id === selectedCategory);
      if (category) {
        params.append('category', category.slug);
      }
    }

    const newUrl = location.split('?')[0] + (params.toString() ? `?${params.toString()}` : '');
    if (newUrl !== location) {
      setLocation(newUrl);
    }
  }, [featured, isNew, onSale, selectedCategory, categories, location, setLocation]);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    const productsToFilter = selectedCategory ? categoryProducts || [] : allProducts || [];

    return productsToFilter.filter((product: Product) => {
      const matchesSearch = searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());

      const matchesFeatured = !featured || product.featured;
      const matchesNew = !isNew || product.isNewArrival;
      const matchesSale = !onSale || product.isSale;
      const matchesPrice = Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1];

      return matchesSearch && matchesFeatured && matchesNew && matchesSale && matchesPrice;
    });
  }, [allProducts, categoryProducts, selectedCategory, searchTerm, featured, isNew, onSale, priceRange]);

  const isLoading = productsLoading || categoriesLoading || (selectedCategory && isLoadingCategory);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFeatured(false);
    setIsNew(false);
    setOnSale(false);
    setPriceRange([0, 200]);
    setSelectedCategory(null);
    // URL will be updated by the useEffect
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-lg font-bold mb-4">Filters</h2>

            <div className="mb-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <Slider
                defaultValue={priceRange}
                max={200}
                step={1}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Product Type</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="featured"
                    checked={featured}
                    onCheckedChange={() => setFeatured(!featured)}
                  />
                  <Label
                    htmlFor="featured"
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Featured
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="new"
                    checked={isNew}
                    onCheckedChange={() => setIsNew(!isNew)}
                  />
                  <Label
                    htmlFor="new"
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    New Arrivals
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="sale"
                    checked={onSale}
                    onCheckedChange={() => setOnSale(!onSale)}
                  />
                  <Label
                    htmlFor="sale"
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    On Sale
                  </Label>
                </div>
              </div>
            </div>

            {categories && categories.length > 0 && (
              <>
                <Separator className="my-4" />

                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategory === category.id}
                          onCheckedChange={() => {
                            console.log("Checkbox clicked for category:", category);
                            if (selectedCategory === category.id) {
                              console.log("Unchecking category");
                              setSelectedCategory(null);
                              // URL will be updated by the useEffect
                            } else {
                              console.log("Checking category:", category.slug);
                              setSelectedCategory(category.id);
                              // URL will be updated by the useEffect
                            }
                          }}
                        />
                        <Label
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Button
              variant="outline"
              className="w-full"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Main content with products */}
        <div className="flex-grow">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {categorySlug ? (
                getCategoryBySlug(categorySlug)?.name || "Products"
              ) : featured ? (
                "Featured Products"
              ) : isNew ? (
                "New Arrivals"
              ) : onSale ? (
                "Sale Products"
              ) : (
                "All Products"
              )}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.071 19.071c3.905-3.905 3.905-10.237 0-14.142-3.905-3.905-10.237-3.905-14.142 0-3.905 3.905-3.905 10.237 0 14.142 3.905 3.905 10.237 3.905 14.142 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h8M12 8v8"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
