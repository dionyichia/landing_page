import React from 'react';

const HomeSection = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen h-screen text-font w-full px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-wider mb-6">DION</h1>
        <div className="mt-6">
          <p className="text-lg md:text-xl leading-relaxed">
            Building meaningful technology.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;