import React, { useMemo } from 'react';
import { Semester } from '@/lib/countries-data';

interface AdmissionIntakeProps {
  title?: string | React.ReactNode;
  // postGraduateSemesters: Semester[];
  underGraduateSemesters: Semester[];
}

export const AdmissionIntake: React.FC<AdmissionIntakeProps> = ({
  title = (
    <>
      Major <span className="text-my-accent">Admission Intakes</span> 
    </>
  ),
  // postGraduateSemesters,
  underGraduateSemesters,
}) => {
  // Combine all semesters and remove duplicates based on period
  const allSemesters = useMemo(() => {
    const semesterMap = new Map<string, Semester>();
    
    [...underGraduateSemesters].forEach((semester) => {
      if (!semesterMap.has(semester.period)) {
        semesterMap.set(semester.period, semester);
      }
    });
    
    return Array.from(semesterMap.values());
  }, [underGraduateSemesters]);

  if (allSemesters.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl sm:rounded-4xl lg:rounded-[50px] p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - Title */}
            <div className="flex items-center justify-center lg:justify-start">
              <h2 className="sm:text-2xl md:text-3xl lg:text-4xl font-bold text-my-black text-center lg:text-left">
                {typeof title === 'string' ? (
                  <span className="text-my-accent">{title}</span>
                ) : (
                  title
                )}
              </h2>
            </div>

            {/* Right Column - Semesters List */}
            <div className="relative">
              {/* Graduation Cap Icon - Top Right */}
              <div className="absolute -top-1 -right-1 sm:-top-4 sm:-right-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-transparent border-2 border-gray-300 flex items-center justify-center">
                  <i className="fi fi-ss-graduation-cap text-gray-400 text-xl sm:text-2xl md:text-3xl"></i>
                </div>
              </div>

              {/* Semesters List */}
              <div className="space-y-3 sm:space-y-4">
                {allSemesters.map((semester, index) => (
                  <div key={index} className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-my-black text-white flex items-center justify-center text-sm sm:text-base font-bold">
                      {index + 1}
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-my-black pt-1 sm:pt-1.5 leading-relaxed font-medium">
                      <span className="font-bold">Semester {index + 1}:</span> {semester.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
