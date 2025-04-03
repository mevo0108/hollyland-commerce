const testimonials = [
  {
    id: 1,
    name: "Rachel Cohen",
    location: "New York, NY",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    rating: 5,
    text: "These Israeli products bring me back to my childhood visits to Jerusalem. The date honey is exactly like I remember - perfect on challah! The olive oil is exceptional, and the customer service was wonderful when I had questions."
  },
  {
    id: 2,
    name: "David Goldstein",
    location: "Chicago, IL",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 4.5,
    text: "Fast shipping and authentic products! The Israeli spice blend arrived well-packaged and is absolutely delicious. I've been using it on everything from chicken to roasted vegetables. Will definitely order more soon!"
  },
  {
    id: 3,
    name: "Sarah Abramowitz",
    location: "Los Angeles, CA",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    text: "The Dead Sea bath products exceeded my expectations. My skin feels amazing, and the fragrance is so authentic. I've tried many similar products from other stores but nothing compares to these genuine Israeli imports."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik01NC4wMSA0OS4zNDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVMNi4wMSA0OS4zNDVMMCA0My4zMzVsMTIuMDA1LTEyLjAwNUwwIDE5LjMyNWw2LjAxLTYuMDFsMTIuMDA1IDEyLjAwNUwzMC4wMiAxMy4zMTVsMTIuMDA1IDEyLjAwNUw1NC4wMSAxMy4zMTVsNi4wMSA2LjAxTDQ4LjAxNSAzMS4zM0w2MC4wMiA0My4zMzV6IiBmaWxsPSIjYzQ5YTZjIiBmaWxsLW9wYWNpdHk9IjAuMDUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2c1810] mb-3">Customer Stories</h2>
          <div className="vintage-divider w-24 mx-auto"></div>
          <p className="text-[#5c4838] font-serif mt-4">Experience the authentic connection to Israel through the words of our satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative">
              {/* Decorative quote mark */}
              <div className="absolute -top-5 -left-2 text-6xl text-[#c49a6c] opacity-20 font-serif">"</div>
              
              <div className="vintage-card bg-[#f9f3e7] p-6 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#c49a6c]">
                      <img 
                        className="h-full w-full object-cover" 
                        src={testimonial.avatar} 
                        alt={`${testimonial.name} avatar`}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium font-serif text-[#2c1810]">{testimonial.name}</h4>
                    <p className="text-sm text-[#5c4838] font-serif">{testimonial.location}</p>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                        <svg key={i} className="text-[#c49a6c] h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      {testimonial.rating % 1 !== 0 && (
                        <svg className="text-[#c49a6c] h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <defs>
                            <linearGradient id={`half-fill-${testimonial.id}`}>
                              <stop offset="50%" stopColor="currentColor" />
                              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                            </linearGradient>
                          </defs>
                          <path fill={`url(#half-fill-${testimonial.id})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                      {Array.from({ length: Math.floor(5 - testimonial.rating) }).map((_, i) => (
                        <svg key={i} className="text-[#c49a6c] h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <p className="text-[#5c4838] font-serif italic">{testimonial.text}</p>
                  <div className="absolute -bottom-3 -right-1 text-5xl text-[#c49a6c] opacity-20 font-serif rotate-180">"</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="font-serif text-[#8B4513] italic">Join our satisfied customers and experience the taste of authentic Israel</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
