"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, FileText } from "lucide-react";
import { Link } from "react-scroll";
import { useTheme } from 'next-themes'
import { PiMountainsFill } from "react-icons/pi";

interface NavBarProps {
  showNav: boolean;
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ showNav, className = "" }: NavBarProps) => {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a skeleton or neutral state until mounted
  if (!mounted) {
    return (
      <div className={`${className} relative flex flex-row flex-nowrap justify-between items-center py-4 md:py-6 bg-background border-border`}>
        <div className="text-xl font-bold text-foreground"><PiMountainsFill/></div>
        <div className="flex items-center space-x-2">
          {/* Neutral button states */}
          <div className="w-10 h-10 rounded-md bg-secondary"></div>
          <div className="w-10 h-10 rounded-md bg-secondary"></div>
          <div className="w-10 h-10 rounded-md bg-secondary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative flex flex-row flex-nowrap justify-between items-center py-4 md:py-6 border-b`}>
      {/* Logo */}
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold p-2 text-foreground dark:text-font hover:text-accent hover:dark:text-accent hover:scale-105 transition-all">
          <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-arapey"
            >
              <PiMountainsFill />
          </button>
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="absolute text-font text-2xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-4 lg:space-x-8">
        {["about", "experience", "contact"].map((section) => (
          <button
            key={section}
            className="px-2 py-1 transition-all opacity-70 hover:opacity-90 hover:text-accent"
          >
            <Link
              activeClass="active"
              to={section}
              spy={true}
              smooth={true}
              duration={500}
              offset={-48}
              className="font-arapey"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </button>
        ))}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-10 h-10 rounded-md flex items-center justify-center btn transition-colors">
          {theme === "dark" ? <Moon size={20}/> : <Sun size={20} />}
        </button>
        <button disabled className="w-10 h-10 rounded-md flex items-center justify-center btn transition-colors">
          <span className="text-lg">中</span>
        </button>
        <a
          href="/Chia_Dion_Yi_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="w-10 h-10 rounded-md flex items-center justify-center btn transition-colors">
            <FileText size={20} />
          </button>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 rounded-md flex items-center justify-center btn transition-colors"
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
      <div
        className={`absolute top-full right-0 w-full flex flex-col items-center rounded-2xl bg-primary border-t border-stone-200 md:hidden z-50
          transition-all duration-300 ease-in-out
          ${showNav && menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
      >
          {["about", "experience", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => {
                setMenuOpen(false);
                const el = document.getElementById(section);
                if (el) {
                  const yOffset = -48; 
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="w-min text-center rounded-2xl px-6 py-4 transition-colors"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
    </div>
  );
};

export default NavBar;
