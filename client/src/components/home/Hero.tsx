import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da" 
          alt="Hero background" 
          className="w-full h-full object-cover object-center opacity-50"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Collection 2023</h1>
          <p className="text-lg md:text-xl mb-8">Discover our newest products with incredible discounts up to 40% off.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button size="lg" className="font-medium text-center">
                Shop Now
              </Button>
            </Link>
            <Link href="/products?sale=true">
              <Button variant="secondary" size="lg" className="bg-white text-gray-900 font-medium text-center">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
