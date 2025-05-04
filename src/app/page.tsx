import Image from "next/image";
import NavBar from "@/components/Navbar";
import HomeSection from "@/sections/Home";
import About from "@/sections/About";
import Lifeline from "@/sections/Lifeline";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <div className="relative">
      {/* Fixed navbar at the top */}
      <div className="fixed top-0 right-0 left-0 z-50 bg-stone-50">
        <NavBar />
      </div>

      {/* Full-screen home section */}
      <HomeSection />

      {/* Container for the rest of the sections */}
      <div className="px-8 py-16 flex flex-col gap-[64px] items-center sm:items-start sm:px-20">
        <About />
        <Lifeline />
        <Skills />
        <Experience />
        <Contact />

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </div>

      <footer className="py-8 flex gap-[24px] flex-wrap items-center justify-center">
        {/* Footer content */}
      </footer>
    </div>
  );
}