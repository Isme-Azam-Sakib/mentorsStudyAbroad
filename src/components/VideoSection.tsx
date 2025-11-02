"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
};

// Helper function to extract Facebook video ID from URL
const getFacebookVideoId = (url: string): string => {
    // Facebook video URLs can be in various formats:
    // https://www.facebook.com/watch/?v=1234567890123456
    // https://www.facebook.com/videos/1234567890123456/
    // https://fb.watch/abc123def456/
    const patterns = [
        /(?:facebook\.com\/watch\/\?v=|facebook\.com\/videos\/)(\d+)/,
        /fb\.watch\/([a-zA-Z0-9]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return '';
};

// Helper function to detect video platform
const getVideoPlatform = (url: string): 'youtube' | 'facebook' => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        return 'youtube';
    } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
        return 'facebook';
    }
    return 'youtube'; // default fallback
};

// Helper function to get YouTube thumbnail URL
const getYouTubeThumbnail = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Helper function to get Facebook thumbnail URL
const getFacebookThumbnail = (url: string): string => {
    const videoId = getFacebookVideoId(url);
    // Facebook doesn't provide direct thumbnail URLs like YouTube
    // We'll use a placeholder or try to get the video thumbnail via Facebook Graph API
    // For now, we'll use a generic Facebook video thumbnail
    return `https://graph.facebook.com/${videoId}/picture?type=large`;
};

// Universal thumbnail function
const getVideoThumbnail = (url: string): string => {
    const platform = getVideoPlatform(url);
    return platform === 'youtube' ? getYouTubeThumbnail(url) : getFacebookThumbnail(url);
};

// Video Data
const videosData = [
    {
        id: 1,
        youtubeUrl: "https://youtu.be/DT69Aq3pxEw?si=lvAjiJVzWzeQLxGD",
        country: "australia"
    },
    {
        id: 2,
        youtubeUrl: "https://youtu.be/Lmk3xwpJ6CA?si=PMMjILeCVnqNISkB",
        country: "australia"
    },
    {
        id: 3,
        youtubeUrl: "https://youtube.com/shorts/7TylVSDK1z0?si=3Ly8qr81JaF6rtTX",
        country: "australia"
    },
    {
        id: 4,
        youtubeUrl: "https://youtube.com/shorts/W9XlajqLsgg?si=lLNqG8YCG3taf5Sr",
        country: "australia"
    },
    {
        id: 5,
        youtubeUrl: "https://youtube.com/shorts/bLo7eX5WDBM?si=ORJ4_4YJ5iqeZUWn",
        country: "uk"
    },
    {
        id: 6,
        youtubeUrl: "https://youtu.be/lTr9IHK31BY?si=tzenpX9k3-sF5IV7",
        country: "australia"
    },
    {
        id: 7,
        youtubeUrl: "https://youtu.be/XQrwVmu0CVI?si=J5Kypx1w9-RoWePK",
        country: "uk"
    },
    {
        id: 8,
        youtubeUrl: "https://youtube.com/shorts/vwDFpcq8igI?si=98155S8Pn6QvtNe9",
        country: "uk"
    },
    {
        id: 9,
        youtubeUrl: "https://youtu.be/sm-0GREsky4?si=cdehCtpUMVh70TsG",
        country: "uk"
    },
    {
        id: 10,
        youtubeUrl: "https://youtu.be/w5inNvAmGlw?si=WLcayovaEdUEW1ou",
        country: "usa"
    },
    {
        id: 11,
        youtubeUrl: "https://youtube.com/shorts/b2H54mSF6yA?si=O_a2tY11qBE91lUX",
        country: "usa"
    },
    {
        id: 12,
        youtubeUrl: "https://youtube.com/shorts/L2sy8zycpko?si=WcvxbxmumK3oXdhD",
        country: "usa"
    },
    {
        id: 13,
        youtubeUrl: "https://youtube.com/shorts/lijiB75uOD0?si=e8piRoXBdf_bdMJv",
        country: "usa"
    },
    {
        id: 14,
        youtubeUrl: "https://youtube.com/shorts/LvWnSZGOcgs?si=szGUSkBfeGEij6hJ",
        country: "usa"
    },
    {
        id: 15,
        youtubeUrl: "https://youtube.com/shorts/zxjvLaJCfag?si=mG8PCtKnVU2KeNUA",
        country: "canada"
    },
    {
        id: 16,
        youtubeUrl: "https://youtube.com/shorts/zCcraxPNF4Y?si=HlKD3l-sNgJPrSNj",
        country: "canada"
    },
    {
        id: 17,
        youtubeUrl: "https://youtube.com/shorts/fH82R-5B57o?si=4zYr89CO9lEkHROb",
        country: "canada"
    },
    {
        id: 18,
        youtubeUrl: "https://youtube.com/shorts/WExHFMt7jR4?si=7g0XHxRP9ERTtZyd",
        country: "canada"
    },
];

interface VideoSectionProps {
  className?: string;
  title?: React.ReactNode;
  subtitle?: string;
  country?: string; 
}

export function VideoSection({ 
  className = "", 
  title = "Hear From Our Students",
  subtitle = "Get Insights from Our Successful Students",
  country
}: VideoSectionProps) {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
    const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    // Filter videos based on country and limit to first 5 videos
    const filteredVideos = (country 
        ? videosData.filter(video => video.country.toLowerCase() === country.toLowerCase())
        : videosData).slice(0, 5);

    // Reset current video index when country changes
    useEffect(() => {
        setCurrentVideoIndex(0);
    }, [country]);

    useEffect(() => {
        // Only run on client side to avoid hydration mismatch
        if (typeof window === 'undefined') return;

        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setScreenSize('mobile');
            } else if (width < 1024) {
                setScreenSize('tablet');
            } else {
                setScreenSize('desktop');
            }
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Get the number of videos to show per view based on screen size
    const getVideosPerView = () => {
        switch (screenSize) {
            case 'mobile': return 2;
            case 'tablet': return 3;
            case 'desktop': return 4;
            default: return 4;
        }
    };

    const videosPerView = getVideosPerView();
    const maxIndex = Math.max(0, filteredVideos.length - videosPerView);

    const nextVideo = () => {
        setCurrentVideoIndex((prev) => {
            const next = prev + 1;
            // Infinite scroll: if we reach the end, go back to start
            return next > maxIndex ? 0 : next;
        });
    };

    const prevVideo = () => {
        setCurrentVideoIndex((prev) => {
            const prevIndex = prev - 1;
            // Infinite scroll: if we go below 0, go to the last position
            return prevIndex < 0 ? maxIndex : prevIndex;
        });
    };

    // Auto-scroll effect for mobile and tablet
    useEffect(() => {
        if (!isAutoScrolling || screenSize === 'desktop' || filteredVideos.length <= videosPerView) return;

        const interval = setInterval(() => {
            nextVideo();
        }, 3000); // Auto-scroll every 3 seconds

        return () => clearInterval(interval);
    }, [isAutoScrolling, screenSize, filteredVideos.length, videosPerView, nextVideo]);

    // Touch event handlers for swipe functionality
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        // Pause auto-scroll when user starts touching
        setIsAutoScrolling(false);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextVideo();
        } else if (isRightSwipe) {
            prevVideo();
        }

        // Resume auto-scroll after a delay
        setTimeout(() => {
            setIsAutoScrolling(true);
        }, 2000);
    };

    // Don&apos;t render if no videos for the specified country
    if (filteredVideos.length === 0) {
        return null;
    }

    return (
        <section className={`py-12 sm:py-16 ${className}`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-my-black mb-3 sm:mb-4">
                        {title} 
                    </h2>
                    {subtitle && (
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="relative">
                     {/* Navigation Arrows - Only show on desktop */}
                     {maxIndex > 0 && screenSize === 'desktop' && (
                         <>
                             <button
                                 onClick={prevVideo}
                                 className="flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-lg items-center justify-center hover:bg-my-accent hover:text-white hover:scale-110 hover:shadow-xl transition-all duration-300 transform"
                             >
                                 <i className="fi fi-sr-angle-left text-xl transition-transform duration-300 hover:scale-110"></i>
                             </button>
                             <button
                                 onClick={nextVideo}
                                 className="flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-lg items-center justify-center hover:bg-my-accent hover:text-white hover:scale-110 hover:shadow-xl transition-all duration-300 transform"
                             >
                                 <i className="fi fi-sr-angle-right text-xl transition-transform duration-300 hover:scale-110"></i>
                             </button>
                         </>
                     )}

                    {/* Video Cards Container */}
                    <div className="overflow-hidden">
                        {/* Mobile: Show 2 videos, tablet: show 3, desktop: show 4 */}
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ 
                                transform: `translateX(-${currentVideoIndex * (100 / videosPerView)}%)` 
                            }}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                             {filteredVideos.map((video, _index) => (
                                 <div key={video.id} className={`flex-shrink-0 px-2 sm:px-3 group ${
                                     screenSize === 'mobile' ? 'w-1/2' : 
                                     screenSize === 'tablet' ? 'w-1/3' : 
                                     'w-1/4'
                                 }`}>
                                     <div
                                         className="bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg transition-all duration-500 transform cursor-pointer aspect-[9/16] group-hover:scale-95 group-hover:-translate-y-2"
                                         onMouseEnter={() => setHoveredVideo(video.id)}
                                         onMouseLeave={() => setHoveredVideo(null)}
                                     >
                                         <div className="relative h-full">
                                             {/* Video Thumbnail */}
                                             <Image
                                                 src={getVideoThumbnail(video.youtubeUrl)}
                                                 alt={`Video from ${video.country}`}
                                                 width={300}
                                                 height={533}
                                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                 onError={(e) => {
                                                     const target = e.target as HTMLImageElement;
                                                     const platform = getVideoPlatform(video.youtubeUrl);
                                                     if (platform === 'youtube') {
                                                         const videoId = getYouTubeVideoId(video.youtubeUrl);
                                                         target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                                     } else {
                                                         target.src = '/placeholder-video.jpg';
                                                     }
                                                 }}
                                             />

                                             {/* Black Overlay with Play Button (Normal State) */}
                                             {hoveredVideo !== video.id && (
                                                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-500 group-hover:bg-black/40">
                                                     <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 hover:scale-110 group-hover:scale-125">
                                                         <i className="fi fi-sr-play text-white text-2xl sm:text-2xl lg:text-3xl ml-1 transition-transform duration-300 group-hover:scale-110"></i>
                                                     </div>
                                                 </div>
                                             )}

                                             {/* Video (Hover State) - Only on desktop */}
                                             {hoveredVideo === video.id && screenSize === 'desktop' && (
                                                 <div className="absolute inset-0 transition-all duration-500 transform scale-100 opacity-100">
                                                     {getVideoPlatform(video.youtubeUrl) === 'youtube' ? (
                                                         <iframe
                                                             src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.youtubeUrl)}?autoplay=1&mute=1`}
                                                             className="w-full h-full transition-transform duration-500"
                                                             allow="autoplay; encrypted-media"
                                                             allowFullScreen
                                                         />
                                                     ) : (
                                                         <iframe
                                                             src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.youtubeUrl)}&show_text=false&width=560&height=315`}
                                                             className="w-full h-full transition-transform duration-500"
                                                             allow="autoplay; encrypted-media"
                                                             allowFullScreen
                                                         />
                                                     )}
                                                 </div>
                                             )}

                                         </div>
                                     </div>
                                 </div>
                             ))}
                        </div>
                    </div>

                     {/* Dots Indicator - Only show if there are more videos than can be displayed */}
                     {filteredVideos.length > videosPerView && (
                         <div className="flex justify-center mt-6 sm:mt-8 gap-2">
                             {Array.from({ length: maxIndex + 1 }, (_, index) => (
                                 <button
                                     key={index}
                                     onClick={() => {
                                         setCurrentVideoIndex(index);
                                         setIsAutoScrolling(false); // Pause auto-scroll when user clicks
                                         // Resume auto-scroll after a delay
                                         setTimeout(() => {
                                             setIsAutoScrolling(true);
                                         }, 3000);
                                     }}
                                     className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 transform ${
                                         index === currentVideoIndex 
                                             ? 'bg-my-accent scale-125 shadow-lg' 
                                             : 'bg-gray-300 hover:bg-gray-400'
                                     }`}
                                 />
                             ))}
                         </div>
                     )}
                </div>
            </div>
        </section>
    );
}
