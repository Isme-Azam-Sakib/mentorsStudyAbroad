"use client";

import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { prospectiveCoursesData } from '@/lib/prospective-courses-data';
import { CourseCard } from './CourseCard';

export function ProspectiveCoursesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sizerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    
    setScrollRange(scrollRef.current.scrollWidth);
    
    const onResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContentWidth(entry.contentRect.width);
        if (scrollRef.current) {
          setScrollRange(scrollRef.current.scrollWidth);
        }
      }
    };
    
    const onStyleChange: MutationCallback = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth);
      }
    };
    
    const resizeObserver = new ResizeObserver(onResize);
    if (sizerRef.current) {
      resizeObserver.observe(sizerRef.current);
    }
    
    const mutationObserver = new MutationObserver(onStyleChange);
    if (scrollRef.current) {
      mutationObserver.observe(scrollRef.current, {
        attributes: true,
        attributeFilter: ["style"]
      });
    }
    
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const transform = useTransform(scrollYProgress, [0, 1], [0, -scrollRange + contentWidth]);
  const physics = { damping: 60, mass: 1, stiffness: 500 };
  const spring = useSpring(transform, physics);

  return (
    <div ref={containerRef} className="py-20 relative overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="lg:pr-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-my-black mb-6">
              Prospective <span className="text-my-accent relative">Courses</span> Offered in Various Countries
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Explore a wide range of academic programs available across different countries. 
              From engineering to medicine, business to arts, discover the perfect course 
              that aligns with your career aspirations and academic goals.
            </p>
            
          </div>

          {/* Right Column - Horizontal Scrolling Cards */}
          <div className="relative">
            <div style={{ position: "sticky", top: 0 }}>
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  ref={scrollRef}
                  style={{ x: spring }}
                  className="flex gap-6"
                >
                  {prospectiveCoursesData.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sizer for scroll calculation */}
      {/* <div 
        ref={sizerRef}
        aria-hidden="true"
        style={{ width: "100%", height: "100vh" }}
      /> */}
      
    </div>
  );
}
