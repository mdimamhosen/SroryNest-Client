import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and navigating to the 'Orders' section.",
    },
    {
      question: "What is the return policy?",
      answer:
        "We accept returns within 30 days of purchase. The product must be in its original condition.",
    },
    {
      question: "How do I become a member?",
      answer:
        "You can become a member by signing up on our website and choosing a membership plan.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Refunds are processed within 5-7 business days if eligible under our return policy.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to most countries. Additional charges may apply.",
    },
  ];

  return (
    <div className="w-11/12 max-w-maxContent mx-auto py-12">
      <div className="mx-auto">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl  font-bold text-center mb-8">
          Contact Us
        </h2>

        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* FAQ Section */}
          <div className="md:w-1/2">
            <p className="text-start text-gray-300 text-2xl font-bold mb-4">
              Have a question or need help? <br /> Send us a message and we'll
              get back to you as soon as possible.
            </p>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-white text-2xl font-bold mb-4">
                Frequently Asked Questions
              </h3>
              <ul className="space-y-4">
                {faqs.map((faq, index) => (
                  <li key={index} className="border-b border-gray-600 pb-2">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex justify-between items-center w-full text-left text-gray-300 hover:text-white"
                    >
                      <span>{faq.question}</span>
                      <span>{openFAQ === index ? "−" : "+"}</span>
                    </button>
                    {openFAQ === index && (
                      <p className="mt-2 text-gray-400 text-sm">{faq.answer}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {/* Name */}
                <div>
                  <label className="text-gray-400 text-sm">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="text-gray-400 text-sm">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter subject"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-gray-400 text-sm">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 h-32 resize-none"
                    placeholder="Type your message..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 text-black font-bold py-3 rounded-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
