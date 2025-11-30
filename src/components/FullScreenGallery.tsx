"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

// Types for our Gallery Image
export interface GalleryImage {
  id: string | number;
  src: string;
  thumbnailSrc?: string; // Optional: separate low-res thumbnail
  alt?: string;
  title?: string;
  description?: string;
}

interface FullScreenGalleryProps {
  images?: GalleryImage[]; // Made optional to prevent crashes if undefined
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

// Animation Variants
const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const FullScreenGallery: React.FC<FullScreenGalleryProps> = ({
  images = [],
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const safeImages = Array.isArray(images) ? images : [];
  
  // State
  // We track 'page' and 'direction' separate from index to handle animations correctly
  const [[page, direction], setPage] = useState([initialIndex, 0]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  
  // Derived Index (wraps around safely)
  const imageIndex = ((page % safeImages.length) + safeImages.length) % safeImages.length;
  const currentImage = safeImages[imageIndex];
  
  // Sync state when opening
  useEffect(() => {
    if (isOpen) {
      setPage([initialIndex, 0]);
      setIsLoaded(false);
    }
  }, [isOpen, initialIndex]);
  
  // Reset loading spinner on slide change
  useEffect(() => {
    setIsLoaded(false);
  }, [page]);
  
  // ---------------------------------------------------------------------------
  // SCROLL BEHAVIOR LOGIC (Vertical) - Keep active thumbnail centered
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isOpen && thumbnailScrollRef.current) {
      const container = thumbnailScrollRef.current;
      const activeThumb = container.children[imageIndex] as HTMLElement;
      if (activeThumb) {
        // Small delay to ensure DOM is updated
        const timeoutId = setTimeout(() => {
          // Calculate the exact center position (vertical)
          const thumbTop = activeThumb.offsetTop;
          const thumbHeight = activeThumb.offsetHeight;
          const containerHeight = container.offsetHeight;
          
          const scrollPos = thumbTop - (containerHeight / 2) + (thumbHeight / 2);
          const currentScroll = container.scrollTop;
          const scrollDiff = Math.abs(scrollPos - currentScroll);
          
          // Only scroll if the difference is significant (more than 10px)
          if (scrollDiff > 10) {
            isScrollingRef.current = true;
            container.scrollTo({
              top: scrollPos,
              behavior: 'smooth',
            });
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 500);
          }
        }, 50);
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [imageIndex, isOpen, safeImages.length]);
  
  // Detect which thumbnail is centered when user scrolls the thumbnail strip
  useEffect(() => {
    if (!isOpen || !thumbnailScrollRef.current) return;
    
    const container = thumbnailScrollRef.current;
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Skip if we're programmatically scrolling
      if (isScrollingRef.current) return;
      
      // Debounce to avoid too many updates
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;
        
        // Find which thumbnail is closest to center
        let closestIndex = imageIndex;
        let closestDistance = Infinity;
        
        Array.from(container.children).forEach((thumb, idx) => {
          const thumbRect = thumb.getBoundingClientRect();
          const thumbCenter = thumbRect.top + thumbRect.height / 2;
          const distance = Math.abs(thumbCenter - containerCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = idx;
          }
        });
        
        // Update active image if a different thumbnail is centered
        if (closestIndex !== imageIndex && closestDistance < 100) {
          const direction = closestIndex > imageIndex ? 1 : -1;
          // Calculate the new page value based on the difference
          setPage(([currentPage]) => [currentPage + (closestIndex - imageIndex), direction]);
        }
      }, 50); // Small debounce to smooth out scroll detection
    };
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isOpen, imageIndex]);
  
  // ---------------------------------------------------------------------------
  // NAVIGATION HANDLERS
  // ---------------------------------------------------------------------------
  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);
  
  // ---------------------------------------------------------------------------
  // MOUSE WHEEL SCROLL HANDLERS - Synced scrolling
  // ---------------------------------------------------------------------------
  // Handle wheel on main image area
  useEffect(() => {
    if (!isOpen || !mainImageRef.current) return;
    
    const mainImage = mainImageRef.current;
    let wheelTimeout: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      
      // Throttle wheel events to prevent too many rapid updates
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          // Scroll down - next image
          paginate(1);
        } else {
          // Scroll up - previous image
          paginate(-1);
        }
      }, 100); // Throttle to max once per 100ms
    };
    
    mainImage.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      mainImage.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [isOpen, paginate]);
  
  // Note: Thumbnail strip scrolls naturally - we detect scroll position via scroll event
  // and update the active image based on which thumbnail is centered
  
  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipeConfidenceThreshold = 10000;
    const swipePower = Math.abs(offset.y) * velocity.y;
    if (swipePower < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipePower > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };
  
  // Keyboard Support
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') paginate(1);
      if (e.key === 'ArrowUp') paginate(-1);
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, paginate, onClose]);
  
  // Scroll Lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);
  
  // Safety Returns
  if (safeImages.length === 0) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            // Close gallery when clicking on the backdrop (outside the image)
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* --- Close Button (Top Left) --- */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-[100] p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all active:scale-95 shadow-lg"
            aria-label="Close gallery"
          >
            <X size={24} strokeWidth={2} />
          </button>
          
          {/* --- Image Counter (Bottom Left) --- */}
          <div className="absolute bottom-4 left-4 z-50 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm sm:text-base">
            {(imageIndex + 1).toString().padStart(2, '0')} / {safeImages.length.toString().padStart(2, '0')}
          </div>
          
          {/* --- Main Stage (The Slider) --- */}
          <div 
            ref={mainImageRef}
            className="flex-1 relative w-full h-full overflow-hidden flex items-center justify-center"
          >
            
            {/* Prev Button (Desktop) */}
            <button
              className="absolute left-4 z-40 p-4 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all hidden md:flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            >
              <ChevronLeft size={40} strokeWidth={1} />
            </button>
            
            {/* Next Button (Desktop) */}
            <button
              className="absolute right-[calc(6rem+1rem)] md:right-[calc(8rem+1rem)] z-40 p-4 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all hidden md:flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
            >
              <ChevronRight size={40} strokeWidth={1} />
            </button>
            
            {/* Animation Container */}
            <div 
              className="relative w-full h-full flex items-center justify-center px-4 md:px-20 pr-24 pt-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  onClose();
                }
              }}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.4 }
                  }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragEnd={handleDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute max-w-full max-h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                  style={{ width: 'calc(100% - 100px)', height: '100%' }} // Space for thumbnails on right
                >
                  {/* Loading State */}
                  {!isLoaded && (
                     <div className="absolute inset-0 flex items-center justify-center z-0">
                       <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
                     </div>
                  )}
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt || ""}
                    draggable="false"
                    onLoad={() => setIsLoaded(true)}
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-sm select-none pointer-events-none"
                  />
                  
                  {/* Caption */}
                  {(currentImage.title || currentImage.description) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-[-40px] left-0 right-0 text-center pointer-events-none"
                    >
                      {currentImage.title && <h3 className="text-white/90 font-medium tracking-wide">{currentImage.title}</h3>}
                      {currentImage.description && <p className="text-white/50 text-xs mt-1">{currentImage.description}</p>}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* --- Thumbnail Strip (Vertical on Right) --- */}
          <div 
            className="absolute top-0 bottom-0 right-0 z-50 w-24 md:w-32 lg:w-40 bg-gradient-to-l from-black/90 via-black/80 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
             <div 
              ref={thumbnailScrollRef}
              className="flex flex-col items-center h-full overflow-y-auto py-[50vh] gap-3 no-scrollbar snap-y snap-mandatory"
              style={{ 
                scrollBehavior: 'smooth',
                maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' 
              }}
            >
              {safeImages.map((img, idx) => {
                const isActive = imageIndex === idx;
                return (
                  <button
                    key={img.id || idx}
                    onClick={() => setPage([page + (idx - imageIndex), idx - imageIndex])}
                    className="group relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-sm overflow-hidden focus:outline-none transition-all duration-500 ease-out snap-center"
                    style={{
                      opacity: isActive ? 1 : 0.3,
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <img
                      src={img.thumbnailSrc || img.src}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Active Indicator Line */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeThumb"
                        className="absolute top-0 bottom-0 left-0 w-0.5 bg-white"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenGallery;
