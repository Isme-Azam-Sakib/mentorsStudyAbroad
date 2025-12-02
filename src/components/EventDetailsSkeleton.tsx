"use client";

import { motion } from 'framer-motion';

export default function EventDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-my-white">
      {/* Hero Background Skeleton */}
      <div className="relative">
        <div
          className="absolute inset-0 w-full h-auto bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/hero background.png')" }}
        />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 pt-8 md:pt-4 pb-12">
            {/* Timer Skeleton */}
            <div className="mb-10 mt-32">
              <div className="bg-gray-100 border-2 border-gray-300 border-dashed rounded-2xl px-4 md:px-8 py-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-8 w-48 bg-gray-200 border-2 border-gray-300 border-dashed rounded"
                  />
                  <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full sm:w-auto">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-end gap-2 justify-center">
                        <motion.div
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                          className="h-10 w-10 bg-gray-200 border-2 border-gray-300 border-dashed rounded"
                        />
                        <motion.div
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.05 }}
                          className="h-4 w-12 bg-gray-200 border-2 border-gray-300 border-dashed rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Image and Text Skeleton */}
            <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center py-8 lg:py-16">
              {/* Image Skeleton */}
              <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-full max-w-xl h-64 sm:h-80 lg:h-96 bg-gray-100 border-2 border-gray-300 border-dashed rounded-2xl"
                />
              </div>
              {/* Text Skeleton */}
              <div className="order-2 lg:order-1 space-y-4">
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-8 w-3/4 bg-gray-100 border-2 border-gray-300 border-dashed rounded"
                />
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                  className="h-8 w-1/2 bg-gray-100 border-2 border-gray-300 border-dashed rounded"
                />
                <div className="space-y-2 mt-4">
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="h-4 w-full bg-gray-100 border-2 border-gray-300 border-dashed rounded"
                  />
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="h-4 w-5/6 bg-gray-100 border-2 border-gray-300 border-dashed rounded"
                  />
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    className="h-4 w-4/6 bg-gray-100 border-2 border-gray-300 border-dashed rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Cards Skeleton */}
      <div className="-mt-6 mb-10 relative z-20">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl border-2 border-gray-300 border-dashed p-4 sm:p-6 md:p-8 shadow-xl w-full">
              <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-16 flex-wrap">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 border-2 border-gray-300 border-dashed rounded"
                    />
                    <div className="space-y-2">
                      <motion.div
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.05 }}
                        className="h-3 w-12 bg-gray-100 border-2 border-gray-300 border-dashed rounded"
                      />
                      <motion.div
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.1 }}
                        className="h-6 w-20 sm:h-8 sm:w-24 bg-gray-100 border-2 border-gray-300 border-dashed rounded"
                      />
                    </div>
                    {i < 3 && (
                      <div className="hidden sm:block w-px h-12 sm:h-16 bg-gray-300 flex-shrink-0"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map/Gallery Section Skeleton */}
      <div className="py-16 bg-my-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-10 w-64 bg-gray-100 border-2 border-gray-300 border-dashed rounded mx-auto mb-4"
            />
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
              className="h-6 w-48 bg-gray-100 border-2 border-gray-300 border-dashed rounded mx-auto"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-gray-100 border-2 border-gray-300 border-dashed rounded-3xl h-[400px] sm:h-[600px] md:aspect-video w-full"
          />
        </div>
      </div>
    </div>
  );
}

