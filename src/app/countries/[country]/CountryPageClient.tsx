"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
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
import Link from 'next/link';
import { countriesData, AdmissionStep } from '@/lib/countries-data';
import { AdmissionIntake } from '@/components/AdmissionIntake';
import { EntryRequirements } from '@/components/EntryRequirements';
import { PopularSubjects } from '@/components/PopularSubjects';
import { coursesData, Course } from '@/lib/course-data';
import { PartnerUniversities } from '@/components/PartnerUniversities';

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
  const admissionProcessRef = useRef<HTMLDivElement>(null);
  const partnerUniversitiesRef = useRef<HTMLDivElement>(null);
  const isEurope = countryKey.toLowerCase() === 'europe';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll to sections when hash is present
  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;

    const hash = window.location.hash.substring(1);
    
    if (hash === 'admission-process' && admissionProcessRef.current) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        admissionProcessRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else if (hash === 'partner-universities' && partnerUniversitiesRef.current) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        partnerUniversitiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [isMounted]);

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

  const countryPopularSubjects = useMemo(() => {
    const subjectIds = countriesData[countryKey]?.popularSubjects ?? [];
    return subjectIds
      .map((id) => coursesData.find((course) => course.id === id) ?? null)
      .filter((course): course is Course => course !== null);
  }, [countryKey]);

  const admissionSteps: AdmissionStep[] = useMemo(() => {
    if (countryKey.toLowerCase() === 'europe') {
      return [
        {
          title: 'Personalized Guidance for Each Country',
          content: 'Different countries have different processes. Our counselors will guide you accordingly.',
        },
      ];
    }

    return countriesData[countryKey]?.admissionProcess ?? [];
  }, [countryKey]);

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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 mt-16 sm:my-24 lg:my-32 pt-8">
          <div
            className="relative overflow-hidden rounded-[50px]"
            style={{
              backgroundImage: `url(${country.heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '400px',
              aspectRatio: 'auto'
            }}
          >
            {/* Hidden image to maintain aspect ratio */}
            <img
              src={country.heroImage}
              alt={country.name}
              className="w-full h-auto opacity-0 pointer-events-none"
              style={{ display: 'block' }}
              aria-hidden="true"
            />

            {/* Red Gradient Overlay on Left Side */}
            <div 
              className="absolute inset-0 z-10"
              style={{
                background: 'linear-gradient(to right, rgba(220, 38, 38, 0.9) 0%, rgba(220, 38, 38, 0.85) 35%, rgba(220, 38, 38, 0.5) 45%, rgba(220, 38, 38, 0.2) 55%, transparent 65%)'
              }}
            />

            {/* Hero Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 w-full lg:w-3/5">
                {/* Country Name */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 lg:mb-5 leading-none">
                  {country.name}
                </h1>

                {/* Description */}
                <p className="text-white text-[16px] sm:text-base lg:text-lg mb-6 sm:mb-7 lg:mb-8 leading-tight">
                  {country.description}
                </p>

                {/* Buttons - Horizontal Layout */}
                <div className="flex flex-row gap-3 sm:gap-4">
                  <Link href="/contact">
                    <button className="bg-white text-black px-6 py-2 sm:px-8 sm:py-4 rounded-full hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-3">
                      <span>Free expert consultation</span>
                      <i className="fi fi-sr-meeting-alt"></i>
                    </button>
                  </Link>

                  <button className="bg-black text-white px-6 py-2 sm:px-8 sm:py-4 rounded-full hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-3">
                    <span>Download Brochure</span>
                    <i className="fi fi-sr-file-pdf"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Old Hero Section - Commented Out */}
      {/* <LazySection delay={0.2}>
        <div className="relative">
          {/* Hero Background */}
      {/* <div
            className="absolute inset-0 w-full h-auto bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/hero background.png')"
            }}
          /> */}


      {/* Hero Content */}
      {/* <div className="relative z-10 flex items-center">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 my-16 sm:my-24 lg:my-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Left Column - Text and Buttons */}
      {/* <div className="text-center lg:text-left order-2 lg:order-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-my-black mb-4 sm:mb-5 lg:mb-6 leading-tight">
                    <span className="text-my-accent relative">{country.name}</span> : {country.description}
                  </h1>

                  <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <Link href="/contact">
                      <Button variant="outline" className="text-sm sm:text-base">
                        Book A Free Consultation <i className="fi fi-sr-meeting-alt"></i>
                      </Button>
                    </Link>

                    <button className="bg-my-black text-my-white border border-my-white px-4 py-3 hover:bg-my-white hover:text-my-black hover:border-my-black hover:border-1 rounded-full transition-all duration-300 text-sm sm:text-base">
                      Download Brochure <i className="fi fi-sr-file-pdf"></i>
                    </button>
                  </div>
                </div>

                {/* Right Column - Hero Image */}
      {/* <div className="flex justify-center lg:justify-end order-1 lg:order-2">
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
      </LazySection> */}

      {!isEurope && (
        <>
          {/* Country Statistics Section */}
          <LazySection delay={0.2}>
            <CountryStats countryKey={countryKey} />
          </LazySection>

          {/* Why Choose Country Section */}
          <LazySection delay={0.2}>
            <div className="py-8 bg-my-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Why Choose Content */}
                  <div>
                    <div className="mb-12 sm:text-center md:text-center lg:text-left">
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

          <AdmissionIntake
            title={
              <>
                Major <span className="text-my-accent">Admission Intakes</span> in {country.name}
              </>
            }
            // postGraduateSemesters={countriesData[countryKey]?.admissionIntake.postGraduate || []}
            underGraduateSemesters={countriesData[countryKey]?.admissionIntake.underGraduate || []}
          />

          {/* Entry Requirements Section */}
          <LazySection delay={0.2}>
            <EntryRequirements requirements={countriesData[countryKey]?.entryRequirements || []} />
          </LazySection>

          {/* Partner Universities Section */}
          <div id="partner-universities" ref={partnerUniversitiesRef}>
            <LazySection delay={0.2}>
              <PartnerUniversities 
                countryKey={countryKey}
                asteriskNote={countriesData[countryKey]?.partnerUniversitiesNote}
              />
            </LazySection>
          </div>

          {/* Popular Subjects Section */}
          {countryPopularSubjects.length > 0 && (
            <LazySection delay={0.2}>
              <PopularSubjects
                courses={countryPopularSubjects}
                title={
                  <>
                    Popular <span className="text-my-accent">Subjects</span> To Study in {country.name}
                  </>
                }
              />
            </LazySection>
          )}
        </>
      )}

      {/* Popular Subjects Section  */}
      {false && countryPopularSubjects.length > 0 && (
        <LazySection delay={0.2}>
          <PopularSubjects
            courses={countryPopularSubjects}
            title={
              <>
                Popular <span className="text-my-accent">Subjects</span> To Study in {country.name}
              </>
            }
          />
        </LazySection>
      )}

      {/* Europe-specific content */}
      {isEurope && (
        <LazySection delay={0.2}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-20 w-full flex justify-center">
            <div className="w-full lg:w-2/3 text-center">
            <h2 className="text-my-black lg:text-[30px] sm:text-lg lg:text-xl leading-relaxed text-center">
              Different countries have different processes. Our counselors will guide you accordingly.
            </h2>
            </div>
          </div>
        </LazySection>
      )}

      {/* Admission Process Section - Hidden for Europe */}
      {!isEurope && admissionSteps.length > 0 && (
        <div id="admission-process" ref={admissionProcessRef}>
          <LazySection delay={0.2}>
            <AdmissionProcess steps={admissionSteps} />
          </LazySection>
        </div>
      )}

      {/* Videos Section - Country-specific videos */}
      {!isEurope && (
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
      )}

      {/* Visa Success Stories Section - Conditional Rendering */}
      {!isEurope && shouldRenderVisaSuccess() && (
        <LazySection delay={0.2}>
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
