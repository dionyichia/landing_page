"use client"

import React from 'react';
import { Heading1, SubHeader, Heading3, Heading4 } from "@/components/typography";
import Typewriter from "typewriter-effect"

import Image from "next/image"

import headshot from "@/assets/headshot.png"

const HomeSection = () => {
  return (
    <section className="pt-6 flex flex-col items-center justify-center min-h-screen h-screen text-font w-full px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className='relative inline-block py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-48'>
          <SubHeader className='pb-4'>hello, i am...</SubHeader>
          <Heading1 className="tracking-wider relative z-10 pb-2">DION</Heading1>

          <div className='absolute top-0 left-0'>
            <div className='h-0.5 md:h-0.75 bg-foreground animate-extend-horizontal-tl origin-left'/>
            <div className='w-0.5 md:w-0.75 bg-foreground animate-extend-vertical-tl origin-top'/>
          </div>

          <div className='absolute bottom-0 right-0'>
            <div className='h-0.5 md:h-0.75 bg-foreground animate-extend-horizontal-br origin-right'/>
            <div className='w-0.5 md:w-0.75 bg-foreground animate-extend-vertical-br origin-bottom'/>
          </div>

          <div className='absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 lg:w-48 lg:h-48 bg-accent rounded-full border-0 animate-in 1s ease-in transform translate-x-1/3 -translate-y-1/4'>
            <Image src={headshot} alt="me!" className="w-full h-full object-cover rounded-full"></Image>
          </div>
        </div>
        <div className="mt-6">
          <Heading4 className='pt-6 text-muted-foreground md:pb-1 lg:pb-2'>I love</Heading4>
          <div className="min-h-[2rem] flex items-center justify-center">
            <Heading3 className='font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text'>
              <Typewriter 
                options={{
                  strings: [
                    'building meaningful technology',
                    'exploring the new',
                    'surfing waves',
                    'music',
                    'allen iverson'
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: '|',
                  delay: 50,
                  deleteSpeed: 10,
                }}
              />
            </Heading3>
          </div>
        </div>
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
      `}</style>
    </section>
  );
};

export default HomeSection;