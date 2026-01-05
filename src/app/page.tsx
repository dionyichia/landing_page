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

export default function Home() {
  return (
    <div className="relative mx-auto bg-background w-11/12">
      {/* Fixed navbar at the top */}
      <div className="navbar">
        {/* Need to reapply width styles because navbar class is fixed (not part of DOM, relative to viewport) */}
        <NavBar className="max-w-11/12 mx-auto"/> 
      </div>

      {/* Side Bars */}
      {/* <div className="hidden md:block sidebar text-font">
        <SideSocials className=""/> 
      </div> */}

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
      <div className="flex flex-col items-center sm:items-start mx-auto w-10/12 px-2 md:px-6 lg:px-8">
        <HomeSection/>
        <About />
        <Skills />
        <Lifeline />
        <Experience />
        <Contact />
      </div>

      <footer className="py-8 flex gap-[24px] flex-wrap items-center justify-center">
        {/* Footer content */}
        <SmallText>
          © 2025, Chia Dion Yi. All rights reserved.
        </SmallText>
      </footer>
    </div>
  );
}