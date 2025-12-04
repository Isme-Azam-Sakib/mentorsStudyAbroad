"use client";

import { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { testimonialsData, Testimonial } from '@/lib/testimonials-data';

interface TestimonialsSectionProps {
  className?: string;
}

export default function TestimonialsSection({ className = "" }: TestimonialsSectionProps) {
  const [isClient, setIsClient] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);
  const [baselineCount, setBaselineCount] = useState(3);

  // Ensure component only renders on client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        const count = isExpanded ? testimonialsData.length : 7;
        setVisibleCount(count);
        setBaselineCount(7);
      } else if (window.innerWidth >= 768) {
        const count = isExpanded ? testimonialsData.length : 5;
        setVisibleCount(count);
        setBaselineCount(5);
      } else {
        const count = isExpanded ? testimonialsData.length : 3;
        setVisibleCount(count);
        setBaselineCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, [isClient, isExpanded]);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-my-black mb-3 md:mb-4">
            What <span className="text-my-accent relative">Students</span> Say About Us
          </h2>
          <p className="text-sm md:text-lg text-gray-600 mb-8">
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
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-my-black mb-3 md:mb-4">
            What <span className="text-my-accent relative">Students</span> Say About Us
          </h2>
          <p className="sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Hear from our successful students who have achieved their dreams of studying abroad
          </p>
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {testimonialsData.slice(0, visibleCount).map((testimonial: Testimonial) => (
            <div key={testimonial.id} className="break-inside-avoid mb-4 md:mb-6">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {baselineCount < testimonialsData.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                if (isExpanded) {
                  setVisibleCount(baselineCount);
                } else {
                  setVisibleCount(testimonialsData.length);
                }
                setIsExpanded((prev) => !prev);
              }}
              className="inline-flex items-center px-8 py-3 rounded-full border border-my-black text-my-black text-sm sm:text-base font-medium hover:bg-my-black hover:text-white transition-all duration-300"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
