const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    rating: 5,
    text: "I'm absolutely in love with my new headphones! The sound quality is amazing and they're so comfortable to wear for long periods. Customer service was excellent too when I had questions about my order."
  },
  {
    id: 2,
    name: "Michael Thompson",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 4.5,
    text: "Fast shipping and great products! My smart watch arrived earlier than expected and works perfectly. The app integration is seamless and the battery life is impressive. Highly recommend!"
  },
  {
    id: 3,
    name: "Jessica Lee",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 4,
    text: "The sneakers I purchased are even better in person than in photos. Very comfortable and stylish. I've already received several compliments. Will definitely be shopping here again!"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">Don't just take our word for it — read what our customers have to say about our products and service.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img 
                    className="h-12 w-12 rounded-full" 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name} avatar`}
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                  <div className="flex items-center">
                    {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                      <svg key={i} className="text-yellow-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <svg className="text-yellow-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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
                      <svg key={i} className="text-yellow-400 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
