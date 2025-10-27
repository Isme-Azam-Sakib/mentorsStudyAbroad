"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import LazyImage from '@/components/LazyImage';
import { visaSuccessData, VisaSuccessStory } from '@/lib/visa-success-data';

interface VisaSuccessStoriesProps {
  country?: string;
  showFilter?: boolean;
  className?: string;
}

export default function VisaSuccessStories({
  country,
  showFilter = false,
  className = ""
}: VisaSuccessStoriesProps) {
  const [selectedCountry, setSelectedCountry] = useState(country || 'all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Ensure component only renders on client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const countries = ['all', 'australia', 'usa', 'uk', 'canada', 'malaysia'];

  // Filter stories based on selected country
  const filteredStories = selectedCountry === 'all'
    ? visaSuccessData
    : visaSuccessData.filter((story: VisaSuccessStory) => story.country.toLowerCase() === selectedCountry);

  // Auto-rotate stories with proper cleanup
  useEffect(() => {
    if (!isAutoPlaying || filteredStories.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % filteredStories.length;
        return nextIndex;
      });
    }, 5000); // Change every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlaying, filteredStories.length]);

  // Reset currentIndex when filteredStories changes
  useEffect(() => {
    if (currentIndex >= filteredStories.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, filteredStories.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const nextStory = useCallback(() => {
    if (filteredStories.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  }, [filteredStories.length]);

  const prevStory = useCallback(() => {
    if (filteredStories.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  }, [filteredStories.length]);

  const handleCountryChange = useCallback((countryName: string) => {
    setSelectedCountry(countryName);
    setCurrentIndex(0);
  }, []);

  // Helper functions for card component
  const handleImageError = useCallback((storyId: number) => {
    setImageErrors(prev => ({ ...prev, [storyId]: true }));
  }, []);

  const getInitials = useCallback((name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }, []);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-my-black mb-4">
            <span className="text-my-accent relative">Visa Success</span> Stories
          </h2>
          <p className="text-lg text-gray-600">
            Loading success stories...
          </p>
        </div>
      </div>
    );
  }

  if (filteredStories.length === 0) {
    return (
      <div className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-my-black mb-4">
            <span className="text-my-accent relative">Visa Success</span> Stories
          </h2>
          <p className="text-lg text-gray-600">
            No success stories available for the selected country.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-16 bg-my-white ${className}`} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4" suppressHydrationWarning>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-my-black mb-4">
            <span className="text-my-accent relative">Visa Success</span> Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real stories from our successful students who achieved their dreams of studying abroad
          </p>
        </div>

        {/* Country Filter */}
        {showFilter && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {countries.map((countryName) => (
              <button
                key={countryName}
                onClick={() => handleCountryChange(countryName)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCountry === countryName
                  ? 'bg-my-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {countryName === 'all' ? 'All Countries' : countryName.charAt(0).toUpperCase() + countryName.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Stories Carousel */}
        <div className="relative" suppressHydrationWarning>
          {/* Navigation Arrows */}
          {filteredStories.length > 1 && (
            <>
              <button
                onClick={prevStory}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-my-accent hover:text-white transition-all duration-300"
                aria-label="Previous story"
              >
                <i className="fi fi-rr-arrow-small-left text-lg"></i>
              </button>

              <button
                onClick={nextStory}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-my-accent hover:text-white transition-all duration-300"
                aria-label="Next story"
              >
                <i className="fi fi-rr-arrow-small-right text-lg"></i>
              </button>
            </>
          )}

          {/* Story Cards Container */}
          <div className="overflow-hidden" suppressHydrationWarning>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
              suppressHydrationWarning
            >
              {filteredStories.map((story: VisaSuccessStory, index: number) => (
                <div
                  key={`${story.id}-${index}`}
                  className="w-full flex-shrink-0 px-4"
                  style={{ width: '100%' }}
                >
                  <div className="bg-white rounded-4xl border border-my-black/10 shadow-xl max-w-4xl md:max-w-2xl lg:max-w-4xl mx-auto relative">
                    <div className="hidden lg:flex min-h-[400px] relative">
                      <div className="relative w-[400px] flex-shrink-0 -mt-16 -mb-16">
                      </div>
                      <div className="absolute bottom-0 left-0 h-full w-auto overflow-visible">
                        {!imageErrors[story.id] ? (
                          <LazyImage
                            src={story.image}
                            alt={story.name}
                            className="w-full h-full object-cover object-top overflow-visible"
                            onError={() => handleImageError(story.id)}
                          />
                        ) : (
                          <div className="w-full h-full bg-my-accent text-white flex items-center justify-center font-bold text-xl">
                            {getInitials(story.name)}
                          </div>
                        )}
                      </div>

                      {/* Right Column - Content */}
                      <div className="flex-1 p-10">
                        <div className="mb-6">
                          <p className="text-lg text-gray-700 leading-relaxed">
                            Meet <span className="text-red-600 font-semibold">{story.name}</span>, {story.description}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <i className="fi fi-sr-building text-my-accent text-sm"></i>
                            <p className="text-base text-gray-700">
                              <span className="font-semibold">University:</span> {story.university}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <i className="fi fi-ss-flag text-my-accent text-sm"></i>
                            <p className="text-base text-gray-700">
                              <span className="font-semibold">Country:</span> {story.country}
                            </p>
                          </div>

                          {story.scholarship && (
                            <div className="flex items-center gap-2">
                              <i className="fi fi-sr-award text-my-accent text-sm"></i>
                              <p className="text-base text-gray-700">
                                <span className="font-semibold">Scholarship:</span> {story.scholarship}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile Layout */}
                    <div className="lg:hidden flex flex-col">
                      {/* Top Section - Content */}
                      <div className="flex-shrink-0 p-6 sm:p-8">

                        <div className="mb-6">
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            Meet <span className="text-red-600 font-semibold">{story.name}</span>, {story.description}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <i className="fi fi-sr-building text-my-accent text-sm"></i>
                            <p className="text-sm sm:text-base text-gray-700">
                              <span className="font-semibold">University:</span> {story.university}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <i className="fi fi-ss-flag text-my-accent text-sm"></i>
                            <p className="text-sm sm:text-base text-gray-700">
                              <span className="font-semibold">Country:</span> {story.country}
                            </p>
                          </div>

                          {/* 
                          {story.scholarship && (
                            <div className="flex items-center gap-2">
                              <i className="fi fi-sr-award text-my-accent text-sm"></i>
                              <p className="text-sm sm:text-base text-gray-700">
                                <span className="font-semibold">Scholarship:</span> {story.scholarship}
                              </p>
                            </div>
                          )} */}
                        </div>
                      </div>

                      {/* Bottom Section - Student Image with Natural Aspect Ratio */}
                      <div className="relative flex-shrink-0 rounded-b-4xl overflow-hidden">
                        {!imageErrors[story.id] ? (
                          <LazyImage
                            src={story.image}
                            alt={story.name}
                            className="w-full h-auto md:h-[50%] md:w-auto object-contain"
                            onError={() => handleImageError(story.id)}
                          />
                        ) : (
                          <div className="w-full h-[300px] md:h-[50%] bg-my-accent text-white flex items-center justify-center font-bold text-lg">
                            {getInitials(story.name)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {filteredStories.length > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {filteredStories.map((_: VisaSuccessStory, index: number) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-my-accent' : 'bg-gray-300'
                    }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
