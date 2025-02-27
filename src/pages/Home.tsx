import Banner from "@/components/home/Banner";
import BlogSection from "@/components/home/BlogSection";
import ContactForm from "@/components/home/ContactUsForm";
import ShowCaseProduct from "@/components/home/ShowCaseProduct";
import TestimonialSection from "@/components/home/Testimonial";

const Home = () => {
  return (
    <div className="bg-[#0A111D]   text-gray-200">
      <Banner />
      <ShowCaseProduct />
      <TestimonialSection />
      <ContactForm />
      <BlogSection />
    </div>
  );
};

export default Home;
