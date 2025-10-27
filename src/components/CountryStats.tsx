import { countriesData } from '@/lib/countries-data';

interface CountryStatsProps {
  countryKey?: string;
  isHomepage?: boolean;
}

export function CountryStats({ countryKey, isHomepage = false }: CountryStatsProps) {
  // Homepage stats (only 3 items)
  const homepageStats = {
    universities: "200+",
    annualTuitionFees: "19+ Years",
    successfulVisas: "10,000+"
  };

  // Homepage labels (only 3 items)
  const homepageLabels = {
    universities: "Partner Universities",
    annualTuitionFees: "Years of Experience",
    successfulVisas: "Success Stories"
  };

  // Country-specific stats (all 4 items)
  const countryStats = countriesData[countryKey as keyof typeof countriesData]?.stats || countriesData.australia.stats;
  
  // Country-specific labels (all 4 items)
  const countryLabels = {
    universities: "Universities",
    annualTuitionFees: "Annual Tuition Fees",
    successfulVisas: "Successful Visas",
    postStudyWork: "Post study work"
  };

  const stats = isHomepage ? homepageStats : countryStats;
  const labels = isHomepage ? homepageLabels : countryLabels;

  return (
    <div className="mt-5 -mt-16 sm:-mt-8 lg:-mt-32 mb-16 sm:mb-24 lg:mb-32 relative z-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-center">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl sm:rounded-3xl border border-pink-200/50 p-4 sm:p-6 lg:p-8 shadow-xl w-full max-w-5xl">
            {/* Mobile Layout: 2x2 Grid */}
            <div className="block sm:hidden">
              <div className={`grid ${isHomepage ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                {/* Universities */}
                <div className="text-center">
                  <div className="text-gray-500 text-xs font-medium mb-1">
                    {labels.universities}
                  </div>
                  <div className="text-xl font-bold text-black">
                    {stats.universities}
                  </div>
                </div>

                {/* Annual Tuition Fees */}
                <div className="text-center">
                  <div className="text-gray-500 text-xs font-medium mb-1">
                    {labels.annualTuitionFees}
                  </div>
                  <div className="text-xl font-bold text-black">
                    {stats.annualTuitionFees}
                  </div>
                </div>

                {/* Successful Visas */}
                <div className="text-center">
                  <div className="text-gray-500 text-xs font-medium mb-1">
                    {labels.successfulVisas}
                  </div>
                  <div className="text-xl font-bold text-black">
                    {stats.successfulVisas}
                  </div>
                </div>

                {/* Post Study Work - Only for country pages */}
                {!isHomepage && (
                  <div className="text-center">
                    <div className="text-gray-500 text-xs font-medium mb-1">
                      {labels.postStudyWork}
                    </div>
                    <div className="text-xl font-bold text-black">
                      {stats.postStudyWork}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tablet Layout: Responsive based on homepage */}
            <div className="hidden sm:block lg:hidden">
              {isHomepage ? (
                // Homepage: Single row with 3 items
                <div className="flex items-center justify-center gap-6">
                  {/* Universities */}
                  <div className="text-left">
                    <div className="text-gray-500 text-sm font-medium mb-2">
                      {labels.universities}
                    </div>
                    <div className="text-2xl font-bold text-black">
                      {stats.universities}
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-px h-12 bg-gray-300"></div>

                  {/* Annual Tuition Fees */}
                  <div className="text-left">
                    <div className="text-gray-500 text-sm font-medium mb-2">
                      {labels.annualTuitionFees}
                    </div>
                    <div className="text-2xl font-bold text-black">
                      {stats.annualTuitionFees}
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-px h-12 bg-gray-300"></div>

                  {/* Successful Visas */}
                  <div className="text-left">
                    <div className="text-gray-500 text-sm font-medium mb-2">
                      {labels.successfulVisas}
                    </div>
                    <div className="text-2xl font-bold text-black">
                      {stats.successfulVisas}
                    </div>
                  </div>
                </div>
              ) : (
                // Country pages: 2x2 grid
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-center gap-6">
                    {/* Universities */}
                    <div className="text-left">
                      <div className="text-gray-500 text-sm font-medium mb-2">
                        {labels.universities}
                      </div>
                      <div className="text-2xl font-bold text-black">
                        {stats.universities}
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-12 bg-gray-300"></div>

                    {/* Annual Tuition Fees */}
                    <div className="text-left">
                      <div className="text-gray-500 text-sm font-medium mb-2">
                        {labels.annualTuitionFees}
                      </div>
                      <div className="text-2xl font-bold text-black">
                        {stats.annualTuitionFees}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6">
                    {/* Successful Visas */}
                    <div className="text-left">
                      <div className="text-gray-500 text-sm font-medium mb-2">
                        {labels.successfulVisas}
                      </div>
                      <div className="text-2xl font-bold text-black">
                        {stats.successfulVisas}
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-12 bg-gray-300"></div>

                    {/* Post Study Work */}
                    <div className="text-left">
                      <div className="text-gray-500 text-sm font-medium mb-2">
                        {labels.postStudyWork}
                      </div>
                      <div className="text-2xl font-bold text-black">
                        {stats.postStudyWork}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Layout: Single row */}
            <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-16">
              {/* Universities */}
              <div className="text-left">
                <div className="text-gray-500 text-sm font-medium mb-2">
                  {labels.universities}
                </div>
                <div className="text-3xl xl:text-3xl font-bold text-black">
                  {stats.universities}
                </div>
              </div>

              {/* Separator */}
              <div className="w-px h-16 bg-gray-300"></div>

              {/* Annual Tuition Fees */}
              <div className="text-left">
                <div className="text-gray-500 text-sm font-medium mb-2">
                  {labels.annualTuitionFees}
                </div>
                <div className="text-3xl xl:text-3xl font-bold text-black">
                  {stats.annualTuitionFees}
                </div>
              </div>

              {/* Separator */}
              <div className="w-px h-16 bg-gray-300"></div>

              {/* Successful Visas */}
              <div className="text-left">
                <div className="text-gray-500 text-sm font-medium mb-2">
                  {labels.successfulVisas}
                </div>
                <div className="text-3xl xl:text-3xl font-bold text-black">
                  {stats.successfulVisas}
                </div>
              </div>

              {/* Conditional 4th item and separator for country pages */}
              {!isHomepage && (
                <>
                  {/* Separator */}
                  <div className="w-px h-16 bg-gray-300"></div>

                  {/* Post Study Work */}
                  <div className="text-left">
                    <div className="text-gray-500 text-sm font-medium mb-2">
                      {labels.postStudyWork}
                    </div>
                    <div className="text-3xl xl:text-3xl font-bold text-black">
                      {stats.postStudyWork}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

