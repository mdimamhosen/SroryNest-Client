import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks/hook";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const token = useAppSelector(useCurrentToken);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (screenWidth > 640) {
      setIsOpen(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [screenWidth]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav
      className={`flex h-14 items-center justify-between border-b-[1px] border-b-gray-300 ${
        pathname !== "/" ? "bg-gray-950" : "bg-gray-900"
      } transition-all duration-300`}
    >
      <div className="w-11/12 max-w-maxContent mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center gap-1">
          <div className="bg-gray-200 border border-gray-400 rounded-full h-10 w-10 flex items-center justify-center">
            <span className="text-xl font-extrabold text-gray-700">SN</span>
          </div>
          <p className="text-lg font-extrabold text-gray-200">StoryNest</p>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex space-x-6 text-gray-200 text-lg font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        {/* Desktop Profile / Auth Buttons */}
        <div className="hidden sm:flex space-x-4 relative">
          {!token ? (
            <>
              <Link to="/login">
                <button className="rounded border border-gray-300 bg-gray-700 px-[8px] py-[4px] text-gray-300 hover:bg-gray-800 hover:text-gray-200 hover:scale-95 transition-all duration-300 ease-linear">
                  Log in
                </button>
              </Link>
              <Link to="/register">
                <button className="rounded border border-gray-300 bg-gray-700 px-[8px] py-[4px] text-gray-300 hover:bg-gray-800 hover:text-gray-200 hover:scale-95 transition-all duration-300 ease-linear">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex items-center" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-gray-200 text-2xl" />
          ) : (
            <FaBars className="text-gray-200 text-2xl" />
          )}
        </div>
      </div>

      {/* Full-Screen Blur Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden fixed top-0 left-0 w-64 h-full bg-gray-800 p-4 z-50 transition-transform duration-300 ease-in-out">
          <ul className="flex flex-col space-y-4 text-gray-200 text-lg">
            <li className="flex items-center justify-between">
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
              {token && <ProfileDropdown />}
            </li>
            <li>
              <Link to="/books" onClick={toggleMenu}>
                Books
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu}>
                About
              </Link>
            </li>
          </ul>

          {/* Mobile Profile / Auth Buttons */}
          {!token ? (
            <div className="mt-3   flex gap-7 items-center ">
              <Link to="/login">
                <button className="w-full rounded border border-gray-300 bg-gray-700 px-[8px] py-[4px] text-gray-300 hover:bg-gray-800 hover:text-gray-200 hover:scale-95 transition-all duration-300 ease-linear">
                  Log in
                </button>
              </Link>
              <Link to="/register">
                <button className="w-full rounded border border-gray-300 bg-gray-700 px-[8px] py-[4px] text-gray-300 hover:bg-gray-800 hover:text-gray-200 hover:scale-95 transition-all duration-300 ease-linear">
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <div className="mt-3"></div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
