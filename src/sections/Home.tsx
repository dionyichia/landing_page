"use client"

import React, { useState } from 'react';
import { Heading1, Heading1_2, SubHeader, Heading4 } from "@/components/typography";
import Typewriter from "typewriter-effect"

import ChatBot from '@/components/chat';

const HomeSection = () => {
  const [showChat, setShowChat] = useState(true);

  return (
    <section className="flex flex-col h-screen text-font w-full px-4">
      <div className='pt-18 md:pt-24 h-full'>
        { showChat ? 
          <div className='flex flex-col md:flex-row w-full flex-1 min-h-0 h-full'>
            <div className='pt-[3vh] md:pt-[6vh] flex-shrink-0 relative inline-block pb-2 px-2 md:px-8 md:h-full'>
              <SubHeader className='pb-2 md:pb-4 tracking-[0.02em]'>Hello there! I'm...</SubHeader>
              <Heading1_2 className="tracking-wider relative z-10 pb-2">DION</Heading1_2>
            </div>

            {/* Right Side */}
            <div className='flex-grow min-w-0 flex flex-col h-full'>
                <ChatBot showChat={showChat} setShowChat={setShowChat} />
            </div>

          </div>
        :
          <div className="pt-[15vh]">
            <div className="flex-1 flex items-center justify-center">
              <div className="max-w-4xl mx-auto text-center">
                <div className='relative inline-block pb-2 px-8 md:pb-4 md:px-24 lg:pb-4 lg:px-48'>
                  <SubHeader className='pb-4 tracking-[0.02em]'>Hello there! I'm...</SubHeader>
                  <Heading1 className="tracking-wider relative z-10 pb-2">DION</Heading1>

                </div>
                <div className='tracking-[0.05em]'>
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

            <ChatBot showChat={showChat} setShowChat={setShowChat} />
          </div>
        }
      </div>  
    </section>
  );
};

export default HomeSection;