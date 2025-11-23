"use client";

import { useState } from 'react';
import { StudyAbroadModal } from '@/components/StudyAbroadModal';
import Link from 'next/link';
import LazySection from '@/components/LazySection';

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <LazySection delay={0.2}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 my-16 sm:my-24 lg:my-32 pt-8">
          <div
            className="relative overflow-hidden rounded-[50px]"
            style={{
              backgroundImage: "url('/hero background.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '400px',
              aspectRatio: 'auto'
            }}
          >
            {/* Hidden image to maintain aspect ratio */}
            <img
              src="/hero background.png"
              alt="About Us"
              className="w-full h-auto opacity-0 pointer-events-none"
              style={{ display: 'block' }}
              aria-hidden="true"
            />

            {/* Hero Content */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                  {/* Left Column - Text and Buttons */}
                  <div className="text-center lg:text-left order-2 lg:order-1">
                    {/* Heading */}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-5 lg:mb-6 leading-tight">
                      <span className="text-my-black">
                        Learn <span className="text-my-accent relative inline-block">
                          About
                          <span className="absolute bottom-0 left-0 w-full h-1 bg-my-accent"></span>
                        </span> Us,
                      </span>
                      <br />
                      <span className="text-my-black">team and</span>
                      <br />
                      <span className="text-my-black">achievements</span>
                    </h1>

                    {/* Buttons */}
                    <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                      <Link href="/contact">
                        <button className="bg-my-white text-my-black border border-my-black px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-my-black hover:text-my-white transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3">
                          <span>Free expert consultation</span>
                          <i className="fi fi-sr-meeting-alt"></i>
                        </button>
                      </Link>

                      <button className="bg-my-black text-my-white px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-my-white hover:text-my-black transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3">
                        <span>Download Brochure</span>
                        <i className="fi fi-sr-file-pdf"></i>
                      </button>
                    </div>
                  </div>

                  {/* Right Column - Study Abroad Graphic */}
                  <div className="flex flex-col items-center lg:items-end order-1 lg:order-2">
                    {/* Large Study Abroad Graphic */}
                    <div className="relative mb-4 sm:mb-6">
                      <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-my-accent/80 relative">
                        <span className="relative inline-block">
                          Study Abro
                          <span className="relative inline-block">
                            <span className="relative">
                              a
                              <i className="fi fi-sr-graduation-cap absolute -top-3 sm:-top-4 lg:-top-5 left-1/2 -translate-x-1/2 text-my-accent text-lg sm:text-xl lg:text-2xl"></i>
                            </span>
                            d
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Bottom Navigation Items */}
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm">
                      <span>Admission</span>
                      <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                      <span>Scholarship</span>
                      <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                      <span>Visa</span>
                      <i className="fi fi-sr-paper-plane text-gray-400"></i>
                      <span className="font-semibold text-my-black">
                        MENTORS
                        <span className="text-my-accent">&apos;</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Rest of your about page content */}
      <div>
        <h1>About</h1>
      </div>

      {/* Study Abroad Modal */}
      <StudyAbroadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}