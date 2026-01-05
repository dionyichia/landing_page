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
      <div className="hidden md:block sidebar text-foreground dark:text-font">
        <SideSocials className=""/> 
      </div>
      <div className="hidden md:block sidebar right-[4.1667vw]">
        <SideEmail className="[writing-mode:vertical-rl] [text-orientation:left] transition-all"/>
      </div>

      {/* Left and Right Bars */}
      <div className='fixed bottom-10 left-0'>
        <div className='h-0.5 md:h-0.75 bg-foreground animate-extend-vertical origin-bottom'/>
        {/* <div className='w-0.5 md:w-0.75 bg-foreground animate-extend-vertical-tl origin-top'/> */}
      </div>

      {/* 
      <div className='absolute top-0 left-0'>
        <div className='h-0.5 md:h-0.75 bg-foreground animate-extend-horizontal-tl origin-left'/>
        <div className='w-0.5 md:w-0.75 bg-foreground animate-extend-vertical-tl origin-top'/>
      </div>

      <div className='absolute bottom-0 right-0'>
        <div className='h-0.5 md:h-0.75 bg-foreground animate-extend-horizontal-br origin-right'/>
        <div className='w-0.5 md:w-0.75 bg-foreground animate-extend-vertical-br origin-bottom'/>
      </div> 

      <style jsx>{`
        @keyframes extend-horizontal-tl {
          0% { width: 0; }
          50% { width: clamp(8rem, 25vw, 25rem); }
          100% { width: clamp(8rem, 25vw, 25rem); }
        }
        
        @keyframes extend-vertical-tl {
          0%, 50% { height: 0; }
          100% { height: clamp(2rem, 15vh, 8rem); }
        }
        
        @keyframes extend-horizontal-br {
          0% { width: 0; }
          50% { width: clamp(8rem, 25vw, 24rem); }
          100% { width: clamp(8rem, 25vw, 24rem); }
        }
        
        @keyframes extend-vertical-br {
          0%, 50% { height: 0; }
          100% { height: clamp(2rem, 15vh, 7rem); }
        }
        
        .animate-extend-horizontal-tl {
          animation: extend-horizontal-tl 2s ease-out forwards;
        }
        
        .animate-extend-vertical-tl {
          animation: extend-vertical-tl 2s ease-out forwards;
        }
        
        .animate-extend-horizontal-br {
          animation: extend-horizontal-br 2s ease-out forwards;
          position: absolute;
          bottom: 0;
          right: 0;
        }
        
        .animate-extend-vertical-br {
          animation: extend-vertical-br 2s ease-out forwards;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      `}</style> */}
      <style jsx>{`
        @keyframes extend-vertical {
          0%, 50% { height: 0; }
          100% { height: clamp(2rem, 15vh, 8rem); }
        }

        @keyframes extend-horizontal-tl {
          0% { width: 0; }
          50% { width: clamp(8rem, 25vw, 25rem); }
          100% { width: clamp(8rem, 25vw, 25rem); }
        }
        
        @keyframes extend-vertical-tl {
          0%, 50% { height: 0; }
          100% { height: clamp(2rem, 15vh, 8rem); }
        }
        
        @keyframes extend-horizontal-br {
          0% { width: 0; }
          50% { width: clamp(8rem, 25vw, 24rem); }
          100% { width: clamp(8rem, 25vw, 24rem); }
        }
        
        @keyframes extend-vertical-br {
          0%, 50% { height: 0; }
          100% { height: clamp(2rem, 15vh, 7rem); }
        }
        
        .animate-extend-horizontal-tl {
          animation: extend-horizontal-tl 2s ease-out forwards;
        }
        
        .animate-extend-vertical-tl {
          animation: extend-vertical-tl 2s ease-out forwards;
        }
        
        .animate-extend-horizontal-br {
          animation: extend-horizontal-br 2s ease-out forwards;
          position: absolute;
          bottom: 0;
          right: 0;
        }
        
        .animate-extend-vertical-br {
          animation: extend-vertical-br 2s ease-out forwards;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      `}</style>

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