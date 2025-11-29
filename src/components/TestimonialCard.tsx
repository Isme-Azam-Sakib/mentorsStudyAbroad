"use client";

import { useState } from 'react';
import LazyImage from '@/components/LazyImage';
import { Testimonial } from '@/lib/testimonials-data';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  // Check if image is empty or invalid initially
  const hasValidImage = testimonial.image && testimonial.image.trim() !== '';
  const [imageError, setImageError] = useState(!hasValidImage);

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name: string) => {
    if (!name || name.trim() === '') return '?';
    const parts = name.trim().split(' ').filter(n => n.length > 0);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-4xl border border-my-black/10 overflow-hidden p-4 md:p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Quotation Mark at Top Left */}
      <div className="mb-3 md:mb-4 overflow-visible">
        <LazyImage
          src="/quotation.png"
          alt="Quotation mark"
          className="w-8 md:w-12 h-auto overflow-visible -mb-2 md:-mb-4"
        />
      </div>

      {/* Testimonial Content */}
      <blockquote className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
        {testimonial.text}
      </blockquote>

      {/* Student Info */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Student Photo */}
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
          {!imageError && hasValidImage ? (
            <LazyImage
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-my-accent text-white flex items-center justify-center font-bold text-sm md:text-base">
              {getInitials(testimonial.name)}
            </div>
          )}
        </div>

        {/* Student Details */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-my-black text-sm md:text-base truncate">
            {testimonial.name}
          </h4>
          <p className="text-gray-600 text-xs md:text-sm truncate">
            {testimonial.university}
          </p>
          {testimonial.country && (
            <p className="text-my-accent text-xs font-medium">
              {testimonial.country}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}