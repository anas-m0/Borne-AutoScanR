
import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-10 md:h-14',
    md: 'h-12',
    lg: 'h-20',
    xl: 'h-24 md:h-36',
  };

  return (
    <img
      src="/logo.png"
      alt="AutoScanR Logo"
      className={`${sizeClasses[size]} w-auto object-contain`}
    />
  );
};
