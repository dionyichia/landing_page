import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className = '' }: TextProps) => (
  <h1 className={`font-arapey text-4xl md:text-5xl lg:text-6xl ${className}`}>
    {children}
  </h1>
);

export const Heading2 = ({ children, className = '' }: TextProps) => (
  <h2 className={`font-arapey text-2xl md:text-3xl lg:text-4xl ${className}`}>
    {children}
  </h2>
);

export const Heading3 = ({ children, className = '' }: TextProps) => (
  <h3 className={`font-arapey text-sm md:text-base lg:text-xl ${className}`}>
    {children}
  </h3>
);

export const Heading4 = ({ children, className = '' }: TextProps) => (
  <div className={`font-arapey text-sm md:text-lg lg:text-2xl ${className}`}>
    {children}
  </div>
);


export const Paragraph = ({ children, className = '' }: TextProps) => (
    <p className={`font-cormorant text-sm md:text-base lg:text-lg pb-2 md:pb-4${className}`}>
        {children}
    </p>
);

export const Text = ({ children, className = '' }: TextProps) => (
    <div className={`font-cormorant text-xs md:text-sm lg:text-lg  ${className}`}>
        {children}
    </div>
);

export const SmallText = ({ children, className = '' }: TextProps) => (
  <p className={`font-cormorant text-sm md:text-base ${className}`}>
    {children}
  </p>
);