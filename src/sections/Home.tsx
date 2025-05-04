import React from 'react';

const HomeSection = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-gray-800 px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm md:text-base text-gray-600 mb-2">hello i am...</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-wider mb-6">DION</h1>
        <div className="mt-6">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Welcome to my personal website. This is where I share my work, thoughts, and passions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;