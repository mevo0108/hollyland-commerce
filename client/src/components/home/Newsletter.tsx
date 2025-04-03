import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // This would normally be a server request
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast({
        title: "Thank you for subscribing!",
        description: "You've been added to our newsletter list.",
      });
    }, 1000);
  };
  
  return (
    <section className="py-16 bg-[#2c1810] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik01NC4wMSA0OS4zNDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVMNi4wMSA0OS4zNDVMMCA0My4zMzVsMTIuMDA1LTEyLjAwNUwwIDE5LjMyNWw2LjAxLTYuMDFsMTIuMDA1IDEyLjAwNUwzMC4wMiAxMy4zMTVsMTIuMDA1IDEyLjAwNUw1NC4wMSAxMy4zMTVsNi4wMSA2LjAxTDQ4LjAxNSAzMS4zM0w2MC4wMiA0My4zMzV6IiBmaWxsPSIjZjllOGMxIiBmaWxsLW9wYWNpdHk9IjAuMiIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPg==')]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#c49a6c] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#f9e8c1] mb-3">Join Our Newsletter</h2>
          <div className="vintage-divider w-24 mx-auto bg-gradient-to-r from-transparent via-[#c49a6c] to-transparent"></div>
          <p className="text-[#f0e0c0] font-serif mt-4 mb-8">Subscribe to stay updated on new products, exclusive offers, and the stories behind our authentic Israeli imports</p>
          
          <div className="vintage-container bg-[#2c1810] border-[#c49a6c] max-w-lg mx-auto">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="vintage-input px-4 py-3 flex-grow text-[#2c1810] font-serif"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                className="bg-[#c49a6c] hover:bg-[#b38a5c] text-[#2c1810] font-serif font-bold border border-[#f9e8c1] px-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#2c1810]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
            <p className="text-[#f0e0c0]/70 text-sm font-serif mt-4">We respect your privacy. You can unsubscribe at any time.</p>
          </div>
          
          <div className="flex justify-center mt-6">
            <div className="w-16 h-0.5 bg-[#c49a6c]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
