import { useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    initials: "JS",
    name: "John Smith",
    feedback:
      "StoryNest has been an amazing resource for me. I’ve discovered countless books.",
  },
  {
    initials: "ML",
    name: "Maria Lee",
    feedback:
      "As a book lover, StoryNest has helped me discover new genres and authors .",
  },
  {
    initials: "AL",
    name: "Alex Lee",
    feedback:
      "The user-friendly interface and vast library of books on StoryNest have made it!",
  },
  {
    initials: "DW",
    name: "David White",
    feedback:
      "Fantastic platform! I found rare books and exclusive collections that I couldn't find elsewhere.",
  },
  {
    initials: "SR",
    name: "Sophia Rodriguez",
    feedback:
      "A must-have for book lovers! StoryNest keeps me engaged with personalized recommendations.",
  },
  {
    initials: "BW",
    name: "Brian Watson",
    feedback:
      "Love how easy it is to find new books here! The reviews and recommendations are super helpful.",
  },
  {
    initials: "EK",
    name: "Emma Knight",
    feedback: "I enjoy the diversity of books here. The collection is amazing!",
  },
  {
    initials: "LH",
    name: "Liam Harrison",
    feedback:
      "StoryNest always has something new for me. I love the seamless experience!",
  },
  {
    initials: "OF",
    name: "Olivia Ford",
    feedback:
      "Great customer service and a vast selection of books to choose from!",
  },
  {
    initials: "NR",
    name: "Noah Roberts",
    feedback: "I have discovered my favorite authors here. Highly recommended!",
  },
  {
    initials: "EC",
    name: "Ethan Carter",
    feedback:
      "A dream for any book lover. The recommendations are always spot on!",
  },
  {
    initials: "CH",
    name: "Charlotte Hayes",
    feedback: "The best online bookshop! I always find what I need.",
  },
  {
    initials: "WB",
    name: "William Brooks",
    feedback: "Superb book selection and great UI. 10/10 experience!",
  },
  {
    initials: "SM",
    name: "Scarlett Mason",
    feedback: "I love the convenience and variety StoryNest offers!",
  },
  {
    initials: "JH",
    name: "James Hunter",
    feedback: "Affordable prices and an amazing collection of books.",
  },
  {
    initials: "AG",
    name: "Amelia Green",
    feedback: "The best book platform out there! Highly recommend!",
  },
  {
    initials: "GD",
    name: "George Daniels",
    feedback: "Fast delivery and a well-organized selection of books.",
  },
  {
    initials: "IS",
    name: "Isabella Scott",
    feedback: "I find rare and unique books here that I can't find elsewhere!",
  },
  {
    initials: "HC",
    name: "Henry Cooper",
    feedback: "An excellent resource for readers of all genres.",
  },
  {
    initials: "EV",
    name: "Eva Vaughn",
    feedback:
      "I love the personalized recommendations and seamless shopping experience!",
  },
];

const TestimonialSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const testimonialsPerPage = 3;

  const nextTestimonials = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length - (testimonialsPerPage - 1)
        ? 0
        : prevIndex + 1
    );
  };

  const prevTestimonials = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0
        ? testimonials.length - testimonialsPerPage
        : prevIndex - 1
    );
  };

  return (
    <div className="w-11/12 max-w-maxContent mx-auto py-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Readers Say</h2>

        <div className="relative flex items-center justify-center">
          {/* Previous Button */}
          <button
            onClick={prevTestimonials}
            className="absolute left-0 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all z-10"
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Testimonials Container */}
          <div className="overflow-hidden w-full max-w-5xl px-5">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  (startIndex * 100) / testimonialsPerPage
                }%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-3 lg:p-6 rounded-lg shadow-md   lg:w-1/3 mx-2 lg:flex-shrink-0"
                  // style={{ minWidth: "33.3333%" }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 border border-gray-400 rounded-full h-12 w-12 flex items-center justify-center">
                      <span className="lg:text-xl text-lg font-bold text-gray-700">
                        {testimonial.initials}
                      </span>
                    </div>
                    <p className="ml-4 text-lg font-semibold text-white">
                      {testimonial.name}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm">
                    <FaQuoteLeft className="inline-block text-gray-400 mr-2" />
                    {testimonial.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextTestimonials}
            className="absolute right-0 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-all z-10"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
