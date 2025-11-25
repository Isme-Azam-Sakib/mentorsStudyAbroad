"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryRequirement {
  icon: string; // Icon class name (e.g., "fi fi-ss-document")
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  tag?: string;
}

interface EntryRequirementsProps {
  requirements: EntryRequirement[];
  progressColor?: string;
  animationSpeed?: number; // in seconds
  loop?: boolean;
  textColor?: string;
  iconColor?: string;
  tagColor?: string;
  imageRadius?: number;
  padding?: number;
  contentImageGap?: number;
}

export const EntryRequirements: React.FC<EntryRequirementsProps> = ({
  requirements,
  progressColor = "#FF0000",
  animationSpeed = 5,
  loop = true,
  textColor = "#000000",
  iconColor = "#CCCCCC",
  tagColor = "#000000",
  imageRadius = 8,
  padding = 40,
  contentImageGap = 16,
}) => {
   // ✅ All hooks at top level
   const [activeIndex, setActiveIndex] = useState(0);
   const [progress, setProgress] = useState(0);
   const [isMobile, setIsMobile] = useState(false);
   const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !requirements || requirements.length === 0) return;

    const interval = 16;
    const increment = (100 / (animationSpeed * 1000)) * interval;

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          const nextIndex = activeIndex + 1;
          if (nextIndex >= requirements.length) {
            if (loop) {
              setActiveIndex(0);
              return 0;
            } else {
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
              }
              return 100;
            }
          } else {
            setActiveIndex(nextIndex);
            return 0;
          }
        }
        return newProgress;
      });
    }, interval);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeIndex, animationSpeed, requirements.length, loop, isMobile]);

  const handleCardClick = (index: number) => {
    if (isMobile) return;
    setActiveIndex(index);
    setProgress(0);
  };

  // ✅ Early return for empty requirements
  if (!requirements || requirements.length === 0) return null;

  // Mobile view - vertical stack
  if (isMobile) {
    return (
      <div className="w-full bg-white py-12 sm:py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-my-black mb-8 md:mb-12 text-center">
            <span className="text-my-accent">Entry</span> Requirements
          </h2>

          <div className="flex flex-col gap-5 min-h-full">
            {requirements.map((requirement, index) => {
              const cardImage = requirement.image || {
                src: `/others/entryRequirements/requirements(${index + 1}).jpg`,
                alt: requirement.title || "Entry requirement image",
              };

              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 h-full bg-white rounded-3xl p-6 border border-my-black/10 shadow-sm"
                >
                  {/* Icon */}
                  <div className="text-4xl sm:text-5xl text-my-accent">
                    <i className={requirement.icon}></i>
                  </div>

                  {/* Title */}
                  <div className="text-xl sm:text-2xl font-semibold leading-tight text-my-black">
                    {requirement.title}
                  </div>

                  {/* Description */}
                  <div className="text-sm sm:text-base leading-relaxed opacity-80 text-my-black whitespace-pre-line">
                    {requirement.description}
                  </div>

                  {/* Image */}
                  <div className="w-full h-48 sm:h-64 overflow-hidden flex flex-1">
                    <img
                      src={cardImage.src}
                      alt={cardImage.alt}
                      className="w-full h-full object-cover"
                      style={{ borderRadius: `${imageRadius}px` }}
                    />
                  </div>

                  {/* Tag */}
                  {requirement.tag && (
                    <div className="text-sm font-medium mt-2 self-start text-my-black">
                      {requirement.tag}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Desktop view - horizontal layout with animations
  return (
    <div className="w-full bg-white lg:py-4 sm:py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-my-black mb-8 md:mb-12 text-center">
          <span className="text-my-accent">Entry</span> Requirements
        </h2>

        <div
          className="flex gap-5 w-full h-auto min-h-[400px] items-stretch overflow-hidden"
          style={{ padding: `${padding}px 0` }}
        >
          {requirements.map((requirement, index) => {
            const isActive = index === activeIndex;
                         const cardImage = requirement.image || {
               src: `/others/entryRequirements/requirements(${index + 1}).jpg`,
               alt: requirement.title || "Entry requirement image",
             };

            return (
              <motion.div
                key={index}
                onClick={() => handleCardClick(index)}
                className="relative overflow-hidden flex flex-col cursor-pointer min-h-0 bg-my-white"
                animate={{
                  flex: isActive ? 2 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                style={{
                  padding: "24px",
                  gap: `${contentImageGap}px`,
                }}
              >
                {/* Progress bar */}
                <div
                  className="absolute bottom-0 left-0 w-1 h-full bg-black/10"
                >
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full bg-my-accent"
                      animate={{
                        height: `${progress}%`,
                      }}
                      transition={{ duration: 0 }}
                    />
                  )}
                </div>

                {/* Icon and Title */}
                <div className="flex flex-col items-start gap-2">
                  <div
                    className={`text-4xl sm:text-5xl transition-opacity duration-300 ${isActive ? 'text-my-accent' : 'text-gray-400'}`}
                    style={{
                      opacity: isActive ? 1 : 0.5,
                    }}
                  >
                    <i className={requirement.icon}></i>
                  </div>
                  <div
                    className={`text-xl sm:text-2xl font-semibold leading-tight transition-opacity duration-300 text-my-black`}
                    style={{
                      opacity: isActive ? 1 : 0.7,
                    }}
                  >
                    {requirement.title}
                  </div>
                </div>

                {/* Description, Image, and Tag - Only shown when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col flex-1 justify-between min-h-0 h-full"
                      style={{ gap: `${contentImageGap}px` }}
                    >
                                             {/* Description */}
                       <div
                         className="text-lg sm:text-base leading-relaxed opacity-80 self-start text-my-black whitespace-pre-line"
                       >
                         {requirement.description}
                       </div>

                      {/* Image */}
                      <div className="flex-1 flex items-center justify-center min-h-0 h-full">
                        <div
                          className="w-full aspect-square overflow-hidden flex items-center justify-center min-h-0 h-full"
                        >
                          <img
                            src={cardImage.src}
                            alt={cardImage.alt}
                            className="w-full h-full object-cover block"
                            style={{ borderRadius: `${imageRadius}px` }}
                          />
                        </div>
                      </div>

                      {/* Tag */}
                      {requirement.tag && (
                        <div
                          className="text-sm font-medium self-start text-my-black"
                          style={{
                            marginTop: `${contentImageGap}px`,
                          }}
                        >
                          {requirement.tag}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
