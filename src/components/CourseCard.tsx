"use client";

import { ProspectiveCourse } from '@/lib/prospective-courses-data';

interface CourseCardProps {
  course: ProspectiveCourse;
  className?: string;
}

export function CourseCard({ course, className = "" }: CourseCardProps) {
  return (
    <div className={`flex-shrink-0 w-80 ${className}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
        {/* Course Thumbnail - 16:9 ratio */}
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback to a gradient background if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.className = 'relative w-full aspect-video bg-gradient-to-br from-my-accent to-my-black flex items-center justify-center';
                parent.innerHTML = `<div class="text-white text-2xl font-bold">${course.title}</div>`;
              }
            }}
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        {/* Course Title */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-my-black group-hover:text-my-accent transition-colors duration-300">
            {course.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
