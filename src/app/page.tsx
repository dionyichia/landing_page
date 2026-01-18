'use client'

import NavBar from "@/components/Navbar";
import HomeSection from "@/sections/Home";
import About from "@/sections/About";
import Lifeline from "@/sections/Lifeline";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";
import { SmallText } from "@/components/typography";
import SideSocials from "@/components/side_socials";
import SideEmail from "@/components/side_email";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  // Mount animation
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;

      // Ignore tiny scroll jitters
      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;

      if (currentScrollY > lastScrollY.current) {
        // scrolling DOWN
        setShowNav(false);
      } else {
        // scrolling UP
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative mx-auto bg-background w-full md:w-11/12">
      {/* Fixed navbar at the top */}
      <div className={`
        navbar 
        transition-transform ease-in-out
        ${ hasMounted && showNav ? "translate-y-0" : "-translate-y-full"}
      `}>
        {/* Need to reapply width styles because navbar class is fixed (not part of DOM, relative to viewport) */}
        <NavBar className="max-w-11/12 mx-auto animate-grow-down" showNav={showNav}/> 
      </div>

      <div className="hidden md:block">
        <div className="sidebar dark:text-font">
          <SideSocials className="animate-grow-up shrink-0" />
          <div className="side-line" />
        </div>  

        <div className="sidebar md:right-[4.1667vw]">
          <SideEmail className="animate-grow-up shrink-0 [writing-mode:vertical-rl] [text-orientation:left] transition-all"/>
          <div className="side-line" />
        </div>
      </div>

      {/* Container for each sections */}
      <div className="flex flex-col items-center sm:items-start mx-auto w-10/12 md:px-6 lg:px-8 gap-10 md:gap-24">
        <HomeSection/>
        <About />
        <Skills />
        <Experience />
        <Lifeline />
        <Contact />
      </div>

      <footer className="py-8 flex gap-[24px] flex-wrap items-center justify-center">
        {/* Footer content */}
        <SmallText>
          © 2026, Chia Dion Yi. All rights reserved.
        </SmallText>
      </footer>
    </div>
  );
}