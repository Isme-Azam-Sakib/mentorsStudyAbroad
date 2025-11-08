import React from 'react';
import { Semester } from '@/lib/countries-data';

interface AdmissionIntakeProps {
  title?: string | React.ReactNode;
  postGraduateSemesters: Semester[];
  underGraduateSemesters: Semester[];
}

export const AdmissionIntake: React.FC<AdmissionIntakeProps> = ({
  title = (
    <>
      <span className="text-my-accent">Admission</span> Intake
    </>
  ),
  postGraduateSemesters,
  underGraduateSemesters,
}) => {
  const hasUnderGraduate = underGraduateSemesters && underGraduateSemesters.length > 0;
  const hasPostGraduate = postGraduateSemesters && postGraduateSemesters.length > 0;

  if (!hasUnderGraduate && !hasPostGraduate) {
    return null;
  }

  return (
    <div className="w-full bg-white py-12 sm:py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Left Column - Title (Order 1 on mobile, stays first on desktop) */}
          <div className="order-1 md:order-none md:col-span-1 flex items-center justify-center md:justify-start h-full mb-6 md:mb-0" style={{ minHeight: "100%" }}>
            <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-my-black text-center md:text-left">
              {typeof title === 'string' ? (
                <span className="text-my-accent">{title}</span>
              ) : (
                title
              )}
            </h2>
          </div>

          {/* Middle Column - under-graduate Programs Card (Order 2 on mobile) */}
          {hasUnderGraduate && (
            <div className="order-2 md:order-none md:col-span-1">
            <div className="group bg-white lg:rounded-[50px] rounded-4xl p-4 sm:p-6 md:p-8 border border-my-black/10 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full w-full max-w-sm mx-auto md:max-w-none md:mx-0">
              {/* Icon */}
              <div className="flex justify-start mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-my-white2 group-hover:bg-my-accent/5 transition-all duration-300 flex items-center justify-center">
                  <i className="fi fi-ss-graduation-cap text-my-black group-hover:text-my-accent transition-all duration-300 text-xl sm:text-2xl md:text-3xl"></i>
                </div>
              </div>

              {/* Title */}
              <h3 className="lg:text-4xl sm:text-xl md:text-2xl font-bold text-my-black mb-4 sm:mb-6 md:mb-8 text-left">
                Under-graduate Programs
              </h3>

              {/* Semesters List */}
              <div className="space-y-3 sm:space-y-4">
                {underGraduateSemesters.map((semester, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-my-black text-white flex items-center justify-center text-xs sm:text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-my-black pt-0.5 sm:pt-1 leading-relaxed">
                      Semester {index + 1}: {semester.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          )}

          {/* Right Column - post-graduate Programs Card (Order 3 on mobile) */}
          {hasPostGraduate && (
            <div className="order-3 md:order-none md:col-span-1">
            <div className="group bg-white lg:rounded-[50px] rounded-4xl p-4 sm:p-6 md:p-8 border border-my-black/10 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full w-full max-w-sm mx-auto md:max-w-none md:mx-0">
              {/* Icon */}
              <div className="flex justify-start mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-my-white2 group-hover:bg-my-accent/5 transition-all duration-300 flex items-center justify-center">
                  <i className="fi fi-ss-user-graduate text-my-black group-hover:text-my-accent transition-all duration-300 text-xl sm:text-2xl md:text-3xl"></i>
                </div>
              </div>

              {/* Title */}
              <h3 className="lg:text-4xl sm:text-xl md:text-2xl font-bold text-my-black mb-4 sm:mb-6 md:mb-8 text-left">
                Post-graduate Programs
              </h3>

              {/* Semesters List */}
              <div className="space-y-3 sm:space-y-4">
                {postGraduateSemesters.map((semester, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-my-black text-white flex items-center justify-center text-xs sm:text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-my-black pt-0.5 sm:pt-1 leading-relaxed">
                      Semester {index + 1}: {semester.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
