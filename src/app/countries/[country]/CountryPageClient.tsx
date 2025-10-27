"use client";

import { useState, useEffect } from 'react';
import { AdmissionProcess } from '../../../components/AdmissionProcess';
import { ProcessCard } from '@/components/ProcessCard';
import { ContactForm } from '@/components/ContactForm';
import { CountryStats } from '@/components/CountryStats';
import { UniversitiesSection } from '@/components/UniversitiesSection';
import { VideoSection } from '@/components/VideoSection';
import { ClientOnly } from '@/components/ClientOnly';
import { useBrowserExtensionFix } from '@/hooks/useBrowserExtensionFix';
import LazySection from '@/components/LazySection';
import LazyImage from '@/components/LazyImage';
import PageLoader from '@/components/PageLoader';
import { Button } from '@/components/Button';
import { StudyAbroadModal } from '@/components/StudyAbroadModal';
import {
  AustraliaVisaSuccess,
  USAVisaSuccess,
  UKVisaSuccess,
  CanadaVisaSuccess,
  MalaysiaVisaSuccess
} from '@/components/(visa-success)';

interface Country {
  name: string;
  description: string;
  heroImage: string;
  whyChoose?: Array<{
    title: string;
    content: string;
  }>;
}

interface CountryPageClientProps {
  country: Country;
  countryKey: string;
}

export default function CountryPageClient({ country, countryKey }: CountryPageClientProps) {
  const whyChooseItems = country?.whyChoose || [];
  const [, setIsPageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use the custom hook to handle browser extension attributes
  useBrowserExtensionFix();

  // Helper function to get the appropriate visa success component
  const getVisaSuccessComponent = () => {
    const countryLower = countryKey.toLowerCase();

    switch (countryLower) {
      case 'australia':
        return <AustraliaVisaSuccess />;
      case 'usa':
        return <USAVisaSuccess />;
      case 'uk':
        return <UKVisaSuccess />;
      case 'canada':
        return <CanadaVisaSuccess />;
      case 'malaysia':
        return <MalaysiaVisaSuccess />;
      default:
        return null;
    }
  };

  // Check if visa success component should be rendered
  const shouldRenderVisaSuccess = () => {
    const countryLower = countryKey.toLowerCase();
    return ['australia', 'usa', 'uk', 'canada', 'malaysia'].includes(countryLower);
  };

  // Don't render until mounted to prevent hydration mismatches
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Page Loader */}
      {/* <PageLoader onComplete={() => setIsPageLoaded(true)} /> */}

      {/* Hero Section */}
      <LazySection delay={0.2}>
        <div className="relative">
          {/* Hero Background */}
          <div
            className="absolute inset-0 w-full h-auto bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/hero background.png')"
            }}
          />


          {/* Hero Content */}
          <div className="relative z-10 flex items-center">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 lg:pt-32 my-16 sm:my-24 lg:my-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Left Column - Text and Buttons */}
                <div className="text-center lg:text-left order-2 lg:order-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-my-black mb-4 sm:mb-5 lg:mb-6 leading-tight">
                    <span className="text-my-accent relative">{country.name}</span> : {country.description}
                  </h1>

                  <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <Button variant="outline" onClick={() => setIsModalOpen(true)} className="text-sm sm:text-base">
                      Book A Free Consultation <i className="fi fi-sr-meeting-alt"></i>
                    </Button>

                    <button className="bg-my-black text-my-white border border-my-white px-4 py-3 hover:bg-my-white hover:text-my-black hover:border-my-black hover:border-1 rounded-full transition-all duration-300 text-sm sm:text-base">
                      Download Brochure <i className="fi fi-sr-file-pdf"></i>
                    </button>
                  </div>
                </div>

                {/* Right Column - Hero Image */}
                <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                  <div className="relative">
                    <img
                      src={country.heroImage}
                      alt={country.name}
                      className="max-w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Country Statistics Section */}
      <LazySection delay={0.2}>
        <CountryStats countryKey={countryKey} />
      </LazySection>

      {/* Why Choose Country Section */}
      <LazySection delay={0.2}>
        <div className="py-16 bg-my-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Why Choose Content */}
              <div>
                <div className="mb-12 text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-my-black mb-4">
                    <span className="text-my-accent relative">Why</span> {country.name}?
                  </h2>
                </div>

                <div className="space-y-4">
                  {whyChooseItems.map((item, index) => (
                    <ProcessCard
                      key={index}
                      title={item.title}
                      content={item.content}
                      index={index}
                      className="mx-auto lg:mx-0 bg-my-white hover:bg-my-white transition-colors duration-300"
                    />
                  ))}
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <ContactForm countryName={country.name} countryValue={countryKey} />
            </div>
          </div>
        </div>
      </LazySection>

      {/* Universities Section */}
      {/* <LazySection delay={0.6}>
        <UniversitiesSection />
      </LazySection> */}

      {/* Admission Process Section */}
      <LazySection delay={0.2}>
        <AdmissionProcess />
      </LazySection>



      {/* Videos Section - Country-specific videos */}
      <LazySection delay={0.2}>
        <ClientOnly>
          <VideoSection
            country={countryKey}
            title={
              <>
                <span className="text-my-accent relative">Hear</span> From Our Students
              </>
            }
            subtitle={`Watch videos from students and experts about studying in ${country.name}`}
          />
        </ClientOnly>
      </LazySection>

      {/* Visa Success Stories Section - Conditional Rendering */}
      {shouldRenderVisaSuccess() && (
        <LazySection delay={0.7}>
          {getVisaSuccessComponent()}
        </LazySection>
      )}

      {/* Study Abroad Modal */}
      <StudyAbroadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
