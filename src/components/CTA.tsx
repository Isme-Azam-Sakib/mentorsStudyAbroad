import React from 'react';
import Image from 'next/image';
import { Button } from './Button';
import Link from 'next/link';

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
    <div className={`relative h-64 md:h-60 lg:h-80 max-w-7xl sm:py-48 md:py-32 lg:py-48  mx-auto rounded-4xl overflow-hidden my-8 px-16 bg-my-accent ${className}`}>
      {/* Background with overlay image */}
      <div className="absolute inset-0">
        <Image
          src="/cta overlay.png"
          alt="CTA Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Main title */}
        <h2 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
          {title}
        </h2>

        {/* Subtitle (optional) */}
        {subtitle && (
          <p className="text-sm md:text-base lg:text-base text-white mb-6 md:mb-8 font-normal">
            {subtitle}
          </p>
        )}

        {/* CTA Button */}
        <Link href="/contact">
          <Button variant="outline" className="text-sm sm:text-base border-solid hover:border-solid hover:border-my-white">
            Book A Free Consultation <i className="fi fi-sr-meeting-alt"></i>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CTA;
