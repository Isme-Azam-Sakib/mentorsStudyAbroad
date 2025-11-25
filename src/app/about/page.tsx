"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LazySection from '@/components/LazySection';
import { useBrowserExtensionFix } from '@/hooks/useBrowserExtensionFix';
import PartnerUniversities from '@/components/PartnerUniversities';
import { AccreditationSection } from '@/components/AccreditationSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTA from '@/components/CTA';

// Achievements Data
const achievementsData = [
  {
    id: 1,
    icon: "fi fi-sr-building",
    statistic: "200+",
    category: "University Partners",
    description: "Our mission is to empower Bangladeshi students to achieve their global academic and career aspirations through transparent."
  },
  {
    id: 2,
    icon: "fi fi-sr-calendar",
    statistic: "19+",
    category: "Years of experience",
    description: "Our mission is to empower Bangladeshi students to achieve their global academic and career aspirations through transparent."
  },
  {
    id: 3,
    icon: "fi fi-sr-star",
    statistic: "10,000+",
    category: "Success stories",
    description: "Our mission is to empower Bangladeshi students to achieve their global academic and career aspirations through transparent."
  }
];

// Achievement Card Component
interface AchievementCardProps {
  icon: string;
  statistic: string;
  category: string;
  description: string;
}

function AchievementCard({ icon, statistic, category, description }: AchievementCardProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-[40px] lg:rounded-[50px] p-4 sm:p-6 lg:p-8 shadow-lg transition-all duration-300 relative group border border-my-black/10 hover:border-2 hover:border-my-accent">
      {/* Icon - Top Right */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 group-hover:border-2 group-hover:border-my-accent">
        <i className={`${icon} text-base sm:text-lg lg:text-xl transition-colors duration-300 text-gray-700 group-hover:text-my-accent`}></i>
      </div>

      {/* Content */}
      <div className="flex flex-col pr-8 sm:pr-12 lg:pr-0">
        {/* Statistic */}
        <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-my-black mb-2 sm:mb-3">
          {statistic}
        </div>
        
        {/* Category */}
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-my-black mb-2">
          {category}
        </h3>
        
        {/* Underline */}
        <div className="w-10 sm:w-12 h-0.5 bg-my-black mb-3 sm:mb-4 lg:mb-6"></div>
        
        {/* Description */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// Core Values Data
const coreValuesData = [
  {
    id: 1,
    icon: "fi fi-sr-crown",
    title: "Student First",
    description: "Your success is our only priority. We provide unbiased advice tailored to your goals, not just our partner universities."
  },
  {
    id: 2,
    icon: "fi fi-sr-handshake",
    title: "Total Transparency",
    description: "We believe in complete honesty. No hidden fees, no misleading information—just clear, straightforward guidance every step of the way."
  },
  {
    id: 3,
    icon: "fi fi-sr-headset",
    title: "End-to-End Support",
    description: "From initial consultation to visa approval and beyond, we're with you at every stage of your study abroad journey."
  },
  {
    id: 4,
    icon: "fi fi-sr-star",
    title: "Proven Success",
    description: "With thousands of successful visa applications and satisfied students, our track record speaks for itself."
  }
];

// Core Value Card Component
interface CoreValueCardProps {
  icon: string;
  title: string;
  description: string;
}

function CoreValueCard({ icon, title, description }: CoreValueCardProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-[30px] lg:rounded-[40px] border border-my-black/10 p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center text-center relative pt-12 sm:pt-16 lg:pt-8">
        {/* Icon */}
        <div className="absolute -top-8 sm:-top-12 lg:-top-16 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white shadow-md flex items-center justify-center">
          <i className={`${icon} text-xl sm:text-2xl lg:text-3xl text-gray-700`}></i>
        </div>
        {/* Title */}
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-my-black mb-2 sm:mb-3 lg:mb-4">
          {title}
        </h3>
        {/* Description */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useBrowserExtensionFix();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Hero Section */}
      <LazySection delay={0.2}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 my-16 sm:my-24 lg:my-32 pt-8">
          <div
            className="relative overflow-hidden rounded-[50px]"
            style={{
              backgroundImage: `url(/hero-about.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '400px',
              aspectRatio: 'auto'
            }}
          >
            {/* Hidden image to maintain aspect ratio */}
            <img
              src="/hero-about.png"
              alt="About Us"
              className="w-full h-auto opacity-0 pointer-events-none"
              style={{ display: 'block' }}
              aria-hidden="true"
            />

            {/* Hero Content */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 w-full lg:w-2/3">
                {/* Heading */}
                <h1 className="text-my-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-5 lg:mb-6 leading-tight">
                  Learn <span className="text-my-accent ">About Us</span> , team and achievements
                </h1>

                {/* Buttons - Horizontal Layout */}
                <div className="flex flex-row gap-3 sm:gap-4">
                  <Link href="/contact">
                    <button className="bg-my-white text-my-black border border-my-black px-6 py-2 sm:px-8 sm:py-4 rounded-full hover:bg-my-black hover:text-my-white transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3">
                      <span>Book A Free Consultation</span>
                      <i className="fi fi-sr-meeting-alt"></i>
                    </button>
                  </Link>

                  <button className="bg-my-black text-my-white px-6 py-2 sm:px-8 sm:py-4 rounded-full hover:bg-my-white hover:text-my-black hover:border-my-black hover:border-1 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3">
                    <span>Download Brochure</span>
                    <i className="fi fi-sr-file-pdf"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Our Core Values Section */}
      <LazySection delay={0.2}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-24">
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
              <span className="text-my-black">Our</span>{' '}
              <span className="text-my-accent">Core Values</span>
            </h2>
          </div>

          {/* Core Values Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {coreValuesData.map((value) => (
              <CoreValueCard
                key={value.id}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </LazySection>

      {/* Our Achievements Section */}
      <LazySection delay={0.2}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-24">
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
              <span className="text-my-black">Our</span>{' '}
              <span className="text-my-accent">Achievements</span>
            </h2>
          </div>

          {/* Achievements Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {achievementsData.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                icon={achievement.icon}
                statistic={achievement.statistic}
                category={achievement.category}
                description={achievement.description}
              />
            ))}
          </div>
        </div>
      </LazySection>
      
      {/* Accreditation Section */}
      <LazySection delay={0.2}>
        <AccreditationSection />
      </LazySection>
            
      {/* Meet Our Expert Team Section */}
      <LazySection delay={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Section Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-my-black">Meet Our</span>{' '}
              <span className="text-my-accent">Expert Team</span>
            </h2>
          </div>

          {/* Team Image */}
          <div className="flex justify-center">
            <img
              src="/others/MSA_group.jpg"
              alt="Meet Our Expert Team"
              className="w-full max-w-7xl h-auto lg:rounded-[50px] sm:rounded-[30px] md:rounded-[40px] rounded-[30px] shadow-lg"
            />
          </div>
        </div>
      </LazySection>

      {/* Our Partners Section */}
      <LazySection delay={0.2}>
        <PartnerUniversities />
      </LazySection>

      {/* Testimonials Section */}
      <LazySection delay={0.2}>
        <TestimonialsSection />
      </LazySection>


       {/* CTA Section */}
       <LazySection delay={0.2}>
        <CTA
          title="1 step away from your study abroad dream"
          subtitle="Just click the button below, follow the instruction and we’ll take it from there"
          buttonText="Click to get started"
          buttonOnClick={() => {/* your action */ }}
          buttonHref="/contact"
          className="bg-my-black/95"
        />
      </LazySection>

    </>
  );
}

