"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { universitiesData, type University as UniversityInfo } from "@/lib/universities-data";
import { countriesData } from "@/lib/countries-data";
import { CountrySelectionModal } from "@/components/CountrySelectionModal";

type University = {
  logo: string;
  name: string;
  website?: string;
  partnershipType: string;
};

const CARD_BATCH_SIZE = 8;
const HOME_PAGE_INITIAL = 16;
const HOME_PAGE_INCREMENT = 4;

const HOME_PAGE_UNIVERSITY_ORDER = [
  "Macquarie University",
  "La Trobe University",
  "Deakin University",
  "Curtin University",
  "University of Wollongong",
  "Victoria University",
  "Charles Darwin University",
  "Memorial University of Newfoundland",
  "University Of Manitoba",
  "University Of Windsor",
  "University of Arizona",
  "University Of Northern Iowa",
  "Youngstown State University",
  "Ravensbourne University London",
  "University of the West of England",
  "Taylor's University",
]; 

type PartnerUniversitiesProps = {
  countryKey?: string;
  title?: ReactNode;
  description?: ReactNode;
  asteriskNote?: string; 
};

export function PartnerUniversities({
  countryKey,
  title,
  description,
  asteriskNote,
}: PartnerUniversitiesProps) {
  const isHomePage = !countryKey || countryKey.trim().length === 0;
  
  const universities = useMemo<University[]>(() => {
    const map = new Map<string, University>();
    let selectedUniversities: UniversityInfo[];

    if (countryKey && countryKey.trim().length > 0) {
      // For country pages, show all universities for that country
      selectedUniversities = universitiesData.filter((university) => university.country === countryKey);
    } else {
      // For home page, only show the 16 specified universities
      const homePageUniversityNames = new Set(HOME_PAGE_UNIVERSITY_ORDER.map(name => name.toLowerCase()));
      selectedUniversities = universitiesData.filter((university) => 
        homePageUniversityNames.has(university.name.toLowerCase())
      );
    }

    selectedUniversities.forEach((university) => {
      const key = university.name.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          logo: university.logo,
          name: university.name,
          website: university.website,
          partnershipType: university.partnershipType,
        });
      }
    });

    const universitiesList = Array.from(map.values());

    // For home page, sort by the specified order
    if (isHomePage) {
      return universitiesList.sort((a, b) => {
        const indexA = HOME_PAGE_UNIVERSITY_ORDER.findIndex(
          (name) => name.toLowerCase() === a.name.toLowerCase()
        );
        const indexB = HOME_PAGE_UNIVERSITY_ORDER.findIndex(
          (name) => name.toLowerCase() === b.name.toLowerCase()
        );
        
        // If both are in the order list, sort by their position
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        // If only A is in the list, A comes first
        if (indexA !== -1) return -1;
        // If only B is in the list, B comes first
        if (indexB !== -1) return 1;
        // If neither is in the list, maintain original order
        return 0;
      });
    }

    return universitiesList;
  }, [countryKey, isHomePage]);

  const initialCount = isHomePage ? HOME_PAGE_INITIAL : CARD_BATCH_SIZE;
  const incrementSize = isHomePage ? HOME_PAGE_INCREMENT : CARD_BATCH_SIZE;

  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  useEffect(() => {
    setVisibleCount(initialCount);
  }, [countryKey, initialCount]);

  const visibleUniversities = isHomePage 
    ? universities.slice(0, HOME_PAGE_INITIAL)
    : universities.slice(0, visibleCount);
  const hasMore = !isHomePage && visibleCount < universities.length;

  if (universities.length === 0) {
    return null;
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + incrementSize, universities.length)
    );
  };

  const handleShowLess = () => {
    setVisibleCount((prev) =>
      Math.max(prev - incrementSize, initialCount)
    );
  };

  const heading =
    title ??
    (
      <>
        Our Partner <span className="text-my-accent">Institutions</span>
      </>
    );

  // Get country name from countryKey
  const countryName = countryKey && countryKey.trim().length > 0
    ? countriesData[countryKey as keyof typeof countriesData]?.name
    : null;

  // Replace {country} placeholder with actual country name
  const getSubheading = () => {
    if (description) {
      // If description is a string, replace {country} placeholder
      if (typeof description === 'string') {
        return countryName ? description.replace('{country}', countryName) : description.replace('{country}', '');
      }
      return description;
    }
    // Default description
    const defaultText = "Discover your opportunities in {country}";
    return countryName ? defaultText.replace('{country}', countryName) : "Discover your opportunities";
  };

  const subheading = getSubheading(); 

  return (
    <section className="py-8 sm:py-20 lg:py-8 bg-my-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-my-black mb-4">
            {heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {visibleUniversities.map((university) => (
            <div
              key={university.name}
              className="group relative flex flex-col items-center bg-white rounded-[28px] sm:rounded-[32px] shadow-lg shadow-black/5 border border-gray-100 p-6 sm:p-7 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative w-full max-w-[180px] h-24 sm:h-28 lg:h-32 flex items-center justify-center overflow-hidden"> 
                <Image
                  src={university.logo}
                  alt={university.name}
                  fill
                  sizes="(min-width: 1024px) 180px, (min-width: 640px) 160px, 140px"
                  className="object-contain"
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-base sm:text-lg font-semibold text-my-black leading-tight">
                  {university.name}
                  {university.partnershipType !== "direct" && (
                    <span 
                      className="text-my-accent ml-1 relative group/asterisk inline-block"
                    >
                      <span className={university.partnershipType && university.partnershipType.trim() !== "" ? "cursor-help" : ""}>
                        *
                      </span>
                      {university.partnershipType && university.partnershipType.trim() !== "" && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-my-black text-white text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover/asterisk:opacity-100 group-hover/asterisk:visible transition-all duration-200 pointer-events-none z-10 shadow-lg">
                          Partner through {university.partnershipType}
                          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-my-black"></span>
                        </span>
                      )}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Home page: Show "See More" button that opens modal */}
        {isHomePage ? (
          <div className="flex justify-center mt-10 sm:mt-12">
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="bg-my-white text-black border border-1 border-my-black px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-2 rounded-full flex items-center gap-2 sm:gap-3 font-semibold hover:bg-my-black hover:text-my-white transition-colors duration-300 text-base sm:text-lg lg:text-base"
            >
              See More
            </button>
          </div>
        ) : (
          /* Country pages: Show More/Show Less buttons */
          <div className="flex justify-center mt-10 sm:mt-12 gap-4">
            {hasMore && (
              <button
                onClick={handleLoadMore}
                className="bg-my-white text-black border border-1 border-my-black px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-2 rounded-full flex items-center gap-2 sm:gap-3 font-semibold hover:bg-my-black hover:text-my-white transition-colors duration-300 text-base sm:text-lg lg:text-base"
              >
                Show More
              </button>
            )}
            {visibleCount > initialCount && (
              <button
                onClick={handleShowLess}
                className="bg-my-white text-black border border-1 border-my-black px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-2 rounded-full flex items-center gap-2 sm:gap-3 font-semibold hover:bg-my-black hover:text-my-white transition-colors duration-300 text-base sm:text-lg lg:text-base"
              >
                Show Less
              </button>
            )}
          </div>
        )}

        {universities.some((uni) => uni.partnershipType !== "direct") && (  
          <div className="mt-6 sm:mt-8 text-left">
            <p className="text-sm sm:text-base text-gray-600">
              <span className="text-my-accent">*</span> {asteriskNote || "Denotes partnership via INTO/ECA/Navitas/UP Education"}
            </p>
          </div>
        )}
      </div>

      {/* Country Selection Modal - Only for home page */}
      {isHomePage && (
        <CountrySelectionModal
          isOpen={isCountryModalOpen}
          onClose={() => setIsCountryModalOpen(false)}
          hashTarget="partner-universities"
        />
      )}
    </section>
  );
}

export default PartnerUniversities;


