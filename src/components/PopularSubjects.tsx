"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Course } from '@/lib/course-data';

interface PopularSubjectsProps {
  courses: Course[];
  title?: string | React.ReactNode;
  itemsPerPage?: number;
}

export const PopularSubjects: React.FC<PopularSubjectsProps> = ({
  courses,
  title = (
    <>
      Popular <span className="text-my-accent">Subjects</span> To Study
    </>
  ),
  itemsPerPage = 6,
}) => {
  const [visibleCount, setVisibleCount] = useState(
    Math.min(itemsPerPage, courses.length)
  );

  React.useEffect(() => {
    setVisibleCount(Math.min(itemsPerPage, courses.length));
  }, [courses, itemsPerPage]);

  const handleToggle = () => {
    setVisibleCount((prev) => {
      if (prev >= courses.length) {
        return Math.min(itemsPerPage, courses.length);
      }
      return Math.min(prev + itemsPerPage, courses.length);
    });
  };

  const canToggle = courses.length > itemsPerPage;
  const isExpanded = visibleCount >= courses.length;
  const visibleCourses = courses.slice(0, visibleCount);
  const toggleLabel = isExpanded ? "Show Less" : "Show More";

  return (
    <div className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-my-black mb-4">
          {typeof title === 'string' ? (
            <span>{title}</span>
          ) : (
            title
          )}
        </h2>

        {/* Courses Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-12">
          {visibleCourses.map((course) => (
            <div
              key={course.id}
              className="group relative rounded-3xl lg:rounded-[50px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                {/* Image */}
                <Image
                  src={course.imageThumbnail}
                  alt={course.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                  <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight">
                    {course.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        {canToggle && (
          <div className="flex justify-center">
            <div
              role="button"
              tabIndex={0}
              onClick={handleToggle}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleToggle();
                }
              }}
              className="bg-white text-my-black border-2 border-my-black px-8 py-3 rounded-full hover:bg-my-black hover:text-white hover:border-my-black transition-all duration-300 text-sm sm:text-base font-medium cursor-pointer select-none"
            >
              {toggleLabel}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
