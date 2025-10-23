import React from 'react';
import Image from 'next/image';

interface CTAProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonOnClick?: () => void;
  buttonHref?: string;
  className?: string;
}

const CTA: React.FC<CTAProps> = ({
  title,
  subtitle,
  buttonText,
  buttonOnClick,
  buttonHref,
  className = ''
}) => {
  const handleClick = () => {
    if (buttonOnClick) {
      buttonOnClick();
    } else if (buttonHref) {
      window.location.href = buttonHref;
    }
  };

  return (
    <div className={`relative h-64 md:h-60 lg:h-80 max-w-7xl mx-auto rounded-3xl overflow-hidden my-8 ${className}`}>
      {/* Background with overlay image */}
      <div className="absolute inset-0">
        <Image
          src="/cta overlay.png"
          alt="CTA Background"
          fill
          className="object-cover"
          priority
        />
        {/* Red overlay */}
        <div className="absolute inset-0 bg-red-600 bg-opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Main title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
          {title}
        </h2>
        
        {/* Subtitle (optional) */}
        {subtitle && (
          <p className="text-lg md:text-xl lg:text-xl text-white mb-6 md:mb-8 font-normal">
            {subtitle}
          </p>
        )}
        
        {/* CTA Button */}
        <button
          onClick={handleClick}
          className="px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-my-black transition-all duration-300 ease-in-out text-base md:text-lg"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CTA;
