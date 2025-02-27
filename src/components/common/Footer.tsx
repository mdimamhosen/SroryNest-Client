import { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [isLoginOrRegisterPage, setIsLoginOrRegisterPage] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    if (currentUrl.includes("login") || currentUrl.includes("register")) {
      setIsLoginOrRegisterPage(true);
    }
  }, []);

  if (isLoginOrRegisterPage) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col gap-8">
        {/* Company Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:gap-12">
          <div className="flex items-center gap-4 mb-6 lg:mb-0">
            <div className="bg-gray-200 border border-gray-400 rounded-full h-10 w-10 flex items-center justify-center">
              <span className="text-xl font-extrabold text-gray-700">SN</span>
            </div>
            <p className="text-4xl font-semibold text-white">StoryNest</p>
          </div>

          {/* Links */}
          <div className="mb-6 lg:mb-0">
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>
                <a href="/home" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/books" className="hover:text-white">
                  Books
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/become-a-member" className="hover:text-white">
                  Become a Member
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6 lg:mb-0">
            <h3 className="font-semibold text-white mb-3">Contact</h3>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@storynest.com"
                  className="hover:text-white"
                >
                  support@storynest.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:text-white">
                  +1 234 567 890
                </a>
              </li>
              <li>Address: 123 Book St, Knowledge City</li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-6 justify-center">
          <a
            href="https://facebook.com"
            className="text-2xl hover:text-blue-600 transition-colors duration-200"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            className="text-2xl hover:text-blue-400 transition-colors duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            className="text-2xl hover:text-pink-600 transition-colors duration-200"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            className="text-2xl hover:text-blue-800 transition-colors duration-200"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>© 2025 StoryNest. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
