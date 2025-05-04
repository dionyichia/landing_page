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
  <h2 className={`font-arapey text-3xl md:text-4xl ${className}`}>
    {children}
  </h2>
);

export const Heading3 = ({ children, className = '' }: TextProps) => (
  <h3 className={`font-arapey text-2xl md:text-3xl ${className}`}>
    {children}
  </h3>
);

export const Paragraph = ({ children, className = '' }: TextProps) => (
  <p className={`font-cormorant text-base md:text-lg ${className}`}>
    {children}
  </p>
);

export const SmallText = ({ children, className = '' }: TextProps) => (
  <p className={`font-cormorant text-sm md:text-base ${className}`}>
    {children}
  </p>
);