"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { universitiesData, type University as UniversityInfo } from "@/lib/universities-data";

type University = {
  logo: string;
  name: string;
  website?: string;
  isDirectPartner?: boolean;
};

const CARD_BATCH_SIZE = 8;

type PartnerUniversitiesProps = {
  countryKey?: string;
  title?: ReactNode;
  description?: ReactNode;
};

export function PartnerUniversities({
  countryKey,
  title,
  description,
}: PartnerUniversitiesProps) {
  const universities = useMemo<University[]>(() => {
    const map = new Map<string, University>();
    const selectedUniversities: UniversityInfo[] =
      countryKey && countryKey.trim().length > 0
        ? universitiesData.filter((university) => university.country === countryKey)
        : universitiesData.filter((university) => university.isDirectPartner);

    selectedUniversities.forEach((university) => {
      const key = university.name.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          logo: university.logo,
          name: university.name,
          website: university.website,
          isDirectPartner: university.isDirectPartner,
        });
      }
    });

    return Array.from(map.values());
  }, [countryKey]);

  const [visibleCount, setVisibleCount] = useState(CARD_BATCH_SIZE);

  useEffect(() => {
    setVisibleCount(CARD_BATCH_SIZE);
  }, [countryKey]);

  const visibleUniversities = universities.slice(0, visibleCount);
  const hasMore = visibleCount < universities.length;

  if (universities.length === 0) {
    return null;
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + CARD_BATCH_SIZE, universities.length)
    );
  };    

  const heading =
    title ??
    (
      <>
        Partner <span className="text-my-accent">Universities</span>
      </>
    );

  const subheading =
    description ?? "Discover our global network of trusted education partners";

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-my-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-my-black">
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
                </p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10 sm:mt-12">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-my-black text-my-black text-sm sm:text-base font-medium hover:bg-my-black hover:text-white transition-colors duration-200"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default PartnerUniversities;


