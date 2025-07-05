import Image from "next/image";
import NavBar from "@/components/Navbar";
import HomeSection from "@/sections/Home";
import About from "@/sections/About";
import Lifeline from "@/sections/Lifeline";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";
import { SmallText } from "@/components/typography";

export default function Home() {
  return (
    <div className="relative w-9/12 mx-auto bg-background">
      {/* Fixed navbar at the top */}
      <div className="fixed top-0 right-0 left-0 z-50 px-8 md:px-12 lg:px-16">
        <NavBar />
      </div>

      {/* Full-screen home section */}
      <HomeSection />

      {/* Container for the rest of the sections */}
      <div className="py-16 flex flex-col items-center sm:items-start mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
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