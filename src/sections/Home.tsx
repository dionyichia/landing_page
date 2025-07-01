import React from 'react';
import { Heading1, SubHeader } from "@/components/typography";

const HomeSection = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen h-screen text-font w-full px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Heading1 className="tracking-wider mb-6">DION</Heading1>
        <div className="mt-6">
          <SubHeader>
            Building meaningful technology.
          </SubHeader>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;