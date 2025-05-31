"use client";

import { useState } from "react";
import { Sun, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-scroll";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="relative flex flex-row flex-nowrap justify-between items-center px-2 md:px-8 lg:px-12 py-4 md:py-6 mx-4 md:mx-8 lg:mx-12 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
      {/* Logo */}
      <div className="text-xl font-bold text-stone-800 dark:text-stone-200">
        Logo
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="absolute text-xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-4 lg:space-x-8 font-medium text-stone-600 dark:text-stone-300">
        {["about", "experience", "contact"].map((section) => (
          <button
            key={section}
            className="px-2 py-1 transition-colors hover:text-stone-900 dark:hover:text-stone-100"
          >
            <Link
              activeClass="active"
              to={section}
              spy={true}
              smooth={true}
              duration={500}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </button>
        ))}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <button className="w-10 h-10 rounded-md flex items-center justify-center bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors">
          <Sun size={20} />
        </button>
        <button className="w-10 h-10 rounded-md flex items-center justify-center bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors">
          <span className="text-lg">中</span>
        </button>
        <button className="w-10 h-10 rounded-md flex items-center justify-center bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors">
          <FileText size={20} />
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 rounded-md flex items-center justify-center bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
        >
          <span className="sr-only">Open menu</span>
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H17M1 6H17M1 11H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Slide-Out Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full flex flex-col bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 md:hidden z-50">
          {["about", "experience", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => {
                setMenuOpen(false);
                const el = document.getElementById(section);
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full text-left px-6 py-4 font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
