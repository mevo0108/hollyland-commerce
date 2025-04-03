import { useState, useEffect } from "react";
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

const ProductsPage = () => {
  const [location, setLocation] = useLocation();
  const params = useParams();
  const categorySlug = params?.slug;
  
  // Parse query params from URL
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const initialFeatured = searchParams.get('featured') === 'true';
  const initialNew = searchParams.get('new') === 'true';
  const initialSale = searchParams.get('sale') === 'true';
  
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
  
  // Get all categories
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // If category slug is provided, get products for that category
  const { data: categoryProducts, isLoading: categoryProductsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/category', selectedCategory],
    enabled: !!selectedCategory,
  });
  
  // Fetch category ID based on slug
  useEffect(() => {
    if (categorySlug && categories) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.id);
      }
    }
  }, [categorySlug, categories]);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    if (isNew) params.append('new', 'true');
    if (onSale) params.append('sale', 'true');
    
    const newUrl = location.split('?')[0] + (params.toString() ? `?${params.toString()}` : '');
    if (newUrl !== location) {
      setLocation(newUrl);
    }
  }, [featured, isNew, onSale, location, setLocation]);
  
  // Filter products based on criteria
  const filteredProducts = (() => {
    if (!allProducts) return [];
    
    // Start with category products if a category is selected, otherwise use all products
    let filtered = categoryProducts || allProducts;
    
    // Apply filters
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (featured) {
      filtered = filtered.filter(p => p.featured);
    }
    
    if (isNew) {
      filtered = filtered.filter(p => p.isNewArrival);
    }
    
    if (onSale) {
      filtered = filtered.filter(p => p.isSale);
    }
    
    filtered = filtered.filter(p => {
      const price = parseFloat(p.price.toString());
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    return filtered;
  })();
  
  const isLoading = productsLoading || categoriesLoading || (categorySlug && categoryProductsLoading);
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setFeatured(false);
    setIsNew(false);
    setOnSale(false);
    setPriceRange([0, 200]);
    if (categorySlug) {
      setLocation("/products");
    }
  };
  
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
                            if (selectedCategory === category.id) {
                              setLocation("/products");
                            } else {
                              setLocation(`/products/category/${category.slug}`);
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
              {categorySlug && categories ? (
                categories.find(c => c.slug === categorySlug)?.name || "Products"
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
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4 h-96 animate-pulse">
                  <div className="h-60 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded mt-auto"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
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
