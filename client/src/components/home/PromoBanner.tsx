import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Summer Sale Is Now On!</h2>
            <p className="text-lg text-gray-300 mb-6">Get up to 40% off on selected items. Limited time offer.</p>
            <Link href="/products?sale=true">
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-gray-900 font-medium hover:bg-gray-100"
              >
                Shop the Sale
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2" 
              alt="Summer Sale" 
              className="max-w-xs md:max-w-sm rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
