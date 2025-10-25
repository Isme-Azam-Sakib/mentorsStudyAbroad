"use client";

import { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { testimonialsData, Testimonial } from '@/lib/testimonials-data';

interface TestimonialsSectionProps {
  className?: string;
}

export default function TestimonialsSection({ className = "" }: TestimonialsSectionProps) {
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-my-black mb-3 md:mb-4">
            What <span className="text-my-accent relative">Students</span> Say About Us
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8">
            Loading testimonials...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-16 bg-my-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-my-black mb-3 md:mb-4">
            What <span className="text-my-accent relative">Students</span> Say About Us
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Hear from our successful students who have achieved their dreams of studying abroad
          </p>
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {testimonialsData.map((testimonial: Testimonial) => (
            <div key={testimonial.id} className="break-inside-avoid mb-4 md:mb-6">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
