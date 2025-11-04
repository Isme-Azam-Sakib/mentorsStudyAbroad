"use client";

import React, { useState } from 'react';
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
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const visibleCourses = courses.slice(0, visibleCount);
  const hasMore = visibleCount < courses.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + itemsPerPage, courses.length));
  };

  return (
    <div className="w-full bg-white py-12 sm:py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-my-black mb-8 md:mb-12 text-center">
          {typeof title === 'string' ? (
            <span>{title}</span>
          ) : (
            title
          )}
        </h2>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-12">
          {visibleCourses.map((course, index) => (
            <div
              key={index}
              className="group relative rounded-[50px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                {/* Image */}
                <img
                  src={course.imageThumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-white text-my-black border-2 border-my-black px-8 py-3 rounded-full hover:bg-my-black hover:text-white hover:border-my-black transition-all duration-300 text-sm sm:text-base font-medium"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
