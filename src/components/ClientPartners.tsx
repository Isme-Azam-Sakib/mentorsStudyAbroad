"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ClientPartnersProps {
  partners: string[]; // Array of image URLs
  title?: React.ReactNode;
  autoScrollInterval?: number; // Auto-scroll interval in milliseconds
  className?: string;
}

export const ClientPartners: React.FC<ClientPartnersProps> = ({
  partners,
  title = (
    <>
      Our <span className="text-my-accent">Partners</span>
    </>
  ),
  autoScrollInterval = 3000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Swipe functionality
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 5;
    if (window.innerWidth >= 768) return 4;
    return 3; 
    };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused || partners.length <= itemsPerView) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = partners.length - itemsPerView;
        return (prev + 1) % (maxIndex + 1);
      });
    }, autoScrollInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, partners.length, itemsPerView, autoScrollInterval]);

  const handleNext = () => {
    const maxIndex = partners.length - itemsPerView;
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume auto-scroll after 5 seconds
  };

  const handlePrev = () => {
    const maxIndex = partners.length - itemsPerView;
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume auto-scroll after 5 seconds
  };

  const canGoNext = partners.length > itemsPerView;
  const canGoPrev = partners.length > itemsPerView;

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || !isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    
    // Only handle horizontal swipes (ignore if vertical movement is greater)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      e.preventDefault(); // Prevent scrolling while swiping horizontally
      
      // Constrain drag offset based on current position
      const maxIndex = partners.length - itemsPerView;
      let constrainedOffset = deltaX;
      
      // Prevent dragging beyond boundaries
      if (currentIndex === 0 && deltaX > 0) {
        constrainedOffset = deltaX * 0.3; // Resistance when at start
      } else if (currentIndex >= maxIndex && deltaX < 0) {
        constrainedOffset = deltaX * 0.3; // Resistance when at end
      }
      
      setDragOffset(constrainedOffset);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    
    const swipeThreshold = 50; // Minimum distance for a swipe
    const currentOffset = dragOffset;
    
    if (Math.abs(currentOffset) > swipeThreshold) {
      if (currentOffset < 0 && canGoNext) {
        // Swipe left - go to next
        handleNext();
      } else if (currentOffset > 0 && canGoPrev) {
        // Swipe right - go to previous
        handlePrev();
      }
    }
    
    // Reset
    touchStartX.current = null;
    touchStartY.current = null;
    setIsDragging(false);
    setDragOffset(0);
    
    // Resume auto-scroll after a delay
    setTimeout(() => setIsPaused(false), 5000);
  };

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 sm:py-16 lg:py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-my-black mb-4">
            {title}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {canGoPrev && (
            <button
              onClick={handlePrev}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 text-my-black hover:text-my-accent transition-colors duration-300"
              aria-label="Previous partners"
            >
              <i className="fi fi-sr-angle-left text-xl"></i>
            </button>
          )}

          {canGoNext && (
            <button
              onClick={handleNext}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 text-my-black hover:text-my-accent transition-colors duration-300"
              aria-label="Next partners"
            >
              <i className="fi fi-sr-angle-right text-xl"></i>
            </button>
          )}

          {/* Carousel */}
          <div
            ref={containerRef}
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
              }}
            >
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 sm:px-3 lg:px-4"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 flex items-center justify-center h-24 sm:h-32 lg:h-40">
                    <Image
                      src={partner}
                      alt={`Partner ${index + 1}`}
                      width={120}
                      height={80}
                      className="w-full h-full object-contain max-w-[120px] sm:max-w-[140px] lg:max-w-[160px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPartners;

