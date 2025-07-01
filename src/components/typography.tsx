import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className = '' }: TextProps) => (
  <h1 className={`font-bodoni text-4xl md:text-6xl lg:text-8xl ${className}`}>
    {children}
  </h1>
);

export const SubHeader = ({ children, className = '' }: TextProps) => (
  <h2 className={`font-cormorant text-base md:text-lg lg:text-xl leading-relaxed ${className}`}>
    {children}
  </h2>
);

export const Heading2 = ({ children, className = '' }: TextProps) => (
  <h2 className={`font-arapey text-2xl md:text-3xl lg:text-4xl text-font ${className}`}>
    {children}
  </h2>
);

export const Heading3 = ({ children, className = '' }: TextProps) => (
  <h3 className={`font-cormorant text-sm md:text-lg lg:text-2xl text-font ${className}`}>
    {children}
  </h3>
);

export const Heading4 = ({ children, className = '' }: TextProps) => (
  <div className={`font-cormorant text-sm md:text-base lg:text-xl text-font ${className}`}>
    {children}
  </div>
);


export const Paragraph = ({ children, className = '' }: TextProps) => (
    <p className={`font-nunito text-sm md:text-base lg:text-xl pb-2 md:pb-4 text-font text-justify ${className}`}>
        {children}
    </p>
);

export const Text = ({ children, className = '' }: TextProps) => (
    <div className={`font-nunito text-xs md:text-sm lg:text-lg text-font ${className}`}>
        {children}
    </div>
);

export const SmallText = ({ children, className = '' }: TextProps) => (
    <div className={`font-nunito text-xs lg:text-sm text-font ${className}`}>
        {children}
    </div>
);


export const AccentText = ({ children, className = '' }: TextProps) => (
  <div className={`font-cormorant text-sm md:text-base lg:text-lg text-font ${className}`}>
    {children}
  </div>
);