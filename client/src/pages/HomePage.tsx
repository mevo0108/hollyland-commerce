import Hero from "@/components/home/Hero";
import CategoryList from "@/components/home/CategoryList";
import PromoBanner from "@/components/home/PromoBanner";
import NewArrivals from "@/components/home/NewArrivals";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

const HomePage = () => {
  return (
    <>
      <Hero />
      <CategoryList />
      <PromoBanner />
      <NewArrivals />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default HomePage;
