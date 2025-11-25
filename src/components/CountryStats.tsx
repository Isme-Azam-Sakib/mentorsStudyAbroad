import { countriesData } from '@/lib/countries-data';

interface CountryStatsProps {
  countryKey?: string;
  isHomepage?: boolean;
}

export function CountryStats({ countryKey, isHomepage = false }: CountryStatsProps) {
  // Homepage stats (only 2 items)
  const homepageStats = {
    universities: "200+",
    annualTuitionFees: "19+ Years"
  };

  const homepageLabels = {
    universities: "Partner Universities",
    annualTuitionFees: "Years of Experience"
  };

  const countryStats = countriesData[countryKey as keyof typeof countriesData]?.stats || countriesData.australia.stats;

  const countryLabels = {
    universities: "Universities",
    annualTuitionFees: "Annual Tuition Fees",
    postStudyWork: "Post study work"
  };

  const stats = isHomepage ? homepageStats : countryStats;
  const labels = isHomepage ? homepageLabels : countryLabels;

  return (
    <div className="lg:-mt-[200px] md:-mt-[150px] sm:-mt-[100px] sm:mb-24 relative z-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-center">
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl sm:rounded-3xl border-2 border-pink-200/50 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 shadow-xl w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
            {/* Responsive 3-column layout for all screen sizes */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8">
              {/* Universities */}
              <div className="text-center sm:text-left">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-black">
                  {stats.universities}
                </div>
                <div className="text-my-black/80 text-[10px] sm:text-xs md:text-sm font-medium mt-0.5 sm:mt-1 md:mt-2">
                  {labels.universities}
                </div>
              </div>

              {/* Annual Tuition Fees */}
              <div className="text-center sm:text-left relative">
                {/* Vertical separator for tablet and desktop */}
                <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-px bg-gray-300 -ml-1 sm:-ml-2 md:-ml-2 lg:-ml-3"></div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-black">
                  {stats.annualTuitionFees}
                </div>
                <div className="text-my-black/80 text-[10px] sm:text-xs md:text-sm font-medium mt-0.5 sm:mt-1 md:mt-2">
                  {labels.annualTuitionFees}
                </div>
              </div>

              {/* Post Study Work - Only for country pages */}
              {!isHomepage ? (
                <div className="text-center sm:text-left relative">
                  {/* Vertical separator for tablet and desktop */}
                  <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-px bg-gray-300 -ml-1 sm:-ml-2 md:-ml-2 lg:-ml-3"></div>
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-black">
                    {countryStats.postStudyWork}
                  </div>
                  <div className="text-my-black/80 text-[10px] sm:text-xs md:text-sm font-medium mt-0.5 sm:mt-1 md:mt-2">
                    {countryLabels.postStudyWork}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

