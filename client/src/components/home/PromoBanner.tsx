import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  return (
    <section className="py-16 bg-[#2c1810] text-[#f9e8c1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Decorative element */}
          <div className="absolute -top-8 left-0 right-0 flex justify-center">
            <div className="h-1 w-32 bg-[#c49a6c]"></div>
          </div>
          
          <div className="relative vintage-container bg-[#2c1810] border-[#c49a6c] py-10 px-8 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik01NC4wMSA0OS4zNDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVMNi4wMSA0OS4zNDVMMCA0My4zMzVsMTIuMDA1LTEyLjAwNUwwIDE5LjMyNWw2LjAxLTYuMDFsMTIuMDA1IDEyLjAwNUwzMC4wMiAxMy4zMTVsMTIuMDA1IDEyLjAwNUw1NC4wMSAxMy4zMTVsNi4wMSA2LjAxTDQ4LjAxNSAzMS4zM0w2MC4wMiA0My4zMzV6IiBmaWxsPSIjZjllOGMxIiBmaWxsLW9wYWNpdHk9IjAuMiIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPg==')]"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-[#f9e8c1]">Spring Holiday Sale</h2>
                <div className="w-24 h-0.5 bg-[#c49a6c] mx-auto md:mx-0 mb-6"></div>
                <p className="text-lg md:text-xl text-[#f0e0c0] mb-8 font-serif">Celebrate the arrival of spring with our exclusive holiday sale. Enjoy up to 40% off on selected premium Israeli products.</p>
                <Link href="/products?sale=true">
                  <Button 
                    size="lg"
                    className="bg-[#f9e8c1] hover:bg-[#f0e0c0] text-[#2c1810] border border-[#c49a6c] font-serif shadow-md hover:shadow-lg"
                  >
                    Explore Special Offers
                  </Button>
                </Link>
              </div>
              
              <div className="md:w-1/2 flex justify-center md:justify-end">
                <div className="relative">
                  <div className="absolute -inset-1 border-2 border-[#c49a6c] rounded-lg transform rotate-3"></div>
                  <div className="relative overflow-hidden rounded-lg border-2 border-[#c49a6c] transform -rotate-2 transition-transform duration-300 hover:rotate-0">
                    <img 
                      src="https://images.unsplash.com/photo-1596131401214-299576720b1c" 
                      alt="Special Holiday Sale" 
                      className="w-full max-w-md"
                    />
                    <div className="absolute top-0 right-0 bg-[#b54834] text-[#f9e8c1] px-6 py-2 font-serif font-bold transform translate-x-5 -translate-y-1 rotate-12">
                      40% OFF
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
            <div className="h-1 w-32 bg-[#c49a6c]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
