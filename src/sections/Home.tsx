"use client"

import React, { useState } from 'react';
import { Heading1, Heading1_2, SubHeader, Heading4 } from "@/components/typography";
import Typewriter from "typewriter-effect"

import ChatBot from '@/components/chat';

const HomeSection = () => {
  const [showChat, setShowChat] = useState(true);

  return (
    <section className="flex flex-col h-screen text-font w-full px-4">
      <div className='h-full relative'>
        <div className={`
          transition-all duration-700 ease-in-out
          max-w-4xl mx-auto
          ${showChat ? 
            // 'flex flex-col md:flex-row w-full flex-1 min-h-0 h-full pt-24'
            'absolute left-1/2 xl:left-32 top-1/8 -translate-x-1/2'
            :
            // 'pt-[30vh] flex flex-col items-center justify-center text-center'
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100'
          }
          `}>
            <div className={`
              transition-all duration-700 ease-in-out
              ${ showChat ? 
                `text-container shrunk pt-[3vh] md:pt-[6vh] relative pb-2 px-2 md:px-8 md:h-full flex flex-col items-center justify-center text-center`
              :
                // px-8 md:px-24 lg:px-48 pb-2 md:pb-4 lg:pb-4
                `text-container relative flex flex-col items-center justify-center text-center`
              }`}> 
              

              <SubHeader className='pb-2 md:pb-4 tracking-[0.02em] text-nowrap'>Hello there! I'm...</SubHeader>              
              <h1 className={`
                  font-bodoni tracking-wider relative z-10 pb-2
                  transition-all duration-700 ease-in-out
                  ${showChat
                    ? 'text-4xl md:text-5xl lg:text-6xl'
                    : 'text-6xl md:text-7xl lg:text-8xl'
                  }
              `}>
                DION
              </h1>

              <div className={`
                tracking-[0.05em] transition-all duration-500 ease-in-out
                ${showChat ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}
                `}>
                <Heading4 className='pt-2 text-accent'>software engineer</Heading4>
                <Heading4 className='text-accent'>builder of fun & meaningful things</Heading4>
                <div className="min-h-[2rem] flex items-center justify-center">
                  <Heading4 className='text-accent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text pb-4'>
                    <Typewriter 
                      options={{
                        strings: [
                          'basketball enthusiast',
                          'part-time bassist',
                          'taekwondo practioner',
                          'budding triathlete',
                          'allen iverson fanatic'
                        ],
                        autoStart: true,
                        loop: true,
                        cursor: '|',
                        delay: 50,
                        deleteSpeed: 10,
                      }}
                    />
                  </Heading4>
                </div>
              </div>
            </div>
        </div>
        
        <div className={`
            transition-all duration-700 ease-in-out
            ${showChat 
              ?  //'flex-grow min-w-0 flex flex-col h-full opacity-100' 
              'absolute left-1/2 -translate-x-1/2 xl:left-full xl:-translate-x-full bottom-8'
              :  // 'w-full max-w-4xl mx-auto'
              'absolute left-1/2 bottom-8 -translate-x-1/2 -translate-y-1/2'
            }
          `}>
            <ChatBot showChat={showChat} setShowChat={setShowChat} />
          </div>
      </div>  
    </section>
  );
};

export default HomeSection;

      //  { showChat ? 
      //     <div className='flex flex-col md:flex-row w-full flex-1 min-h-0 h-full pt-18 md:pt-24'>
      //       <div className='text-container shrunk pt-[3vh] md:pt-[6vh] flex-shrink-0 relative inline-block pb-2 px-2 md:px-8 md:h-full'>
      //         <SubHeader className='pb-2 md:pb-4 tracking-[0.02em]'>Hello there! I'm...</SubHeader>
      //         <Heading1_2 className="tracking-wider relative z-10 pb-2">DION</Heading1_2>
      //       </div>

      //       {/* Right Side */}
      //       <div className='flex-grow min-w-0 flex flex-col h-full'>
      //           <ChatBot showChat={showChat} setShowChat={setShowChat} />
      //       </div>

      //     </div>
      //   :
      //     <div className="pt-[30vh] flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
      //       <div className='text-container relative inline-block pb-2 px-8 md:pb-4 md:px-24 lg:pb-4 lg:px-48'>
      //         <SubHeader className='pb-4 tracking-[0.02em]'>Hello there! I'm...</SubHeader>
      //         <Heading1 className="tracking-wider relative z-10 pb-2">DION</Heading1>
      //       </div>
      //       <div className='tracking-[0.05em]'>
      //         <Heading4 className='pt-2 text-accent'>software engineer</Heading4>
      //         <Heading4 className='text-accent'>builder of fun & meaningful things</Heading4>
      //         <div className="min-h-[2rem] flex items-center justify-center">
      //           <Heading4 className='text-accent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text pb-4'>
      //             <Typewriter 
      //               options={{
      //                 strings: [
      //                   'basketball enthusiast',
      //                   'part-time bassist',
      //                   'taekwondo practioner',
      //                   'budding triathlete',
      //                   'allen iverson fanatic'
      //                 ],
      //                 autoStart: true,
      //                 loop: true,
      //                 cursor: '|',
      //                 delay: 50,
      //                 deleteSpeed: 10,
      //               }}
      //             />
      //           </Heading4>
      //         </div>
      //       </div>

      //       <ChatBot showChat={showChat} setShowChat={setShowChat} />
      //     </div>
      //   }