"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

// API Response Types - Only fields actually used in the component
type ApiEvent = {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    date: string;
    time: string;
};

type ApiResponse = {
    success: boolean;
    message: string;
    data: ApiEvent[];
};

// Component Types
type EventItem = {
    id: number;
    title: string;
    description: string;
    image: string; // large image on the right
    thumb: string; // small image on the left
};

// API Service
const fetchEvents = async (apiUrl: string): Promise<ApiEvent[]> => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const data: ApiResponse = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
};

// Helper function to check if an event is upcoming
const isEventUpcoming = (dateTimeISO: string, currentTime: number): boolean => {
    const eventDate = new Date(dateTimeISO);
    return eventDate.getTime() > currentTime;
};

// Helper function to transform API data to component format
const transformApiEventToEventItem = (apiEvent: ApiEvent): EventItem => {
    return {
        id: apiEvent.id,
        title: apiEvent.title,
        description: apiEvent.description,
        image: apiEvent.image,
        thumb: apiEvent.image
    };
};

interface LatestEventsSectionProps {
    apiUrl: string;
    title?: React.ReactNode;
    maxEvents?: number;
    autoRotateInterval?: number;
    className?: string;
}

export default function LatestEventsSection({
    apiUrl,
    title = "What&apos;s latest right now",
    maxEvents = 5,
    autoRotateInterval = 3000,
    className = ""
}: LatestEventsSectionProps) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [thumbnailStartIdx, setThumbnailStartIdx] = useState(0);
    const hoverRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    // API data state
    const [events, setEvents] = useState<ApiEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());

    // Set current time on client mount to avoid hydration mismatch
    useEffect(() => {
        // Only set time on client side to avoid hydration mismatch
        if (typeof window !== 'undefined') {
            setCurrentTime(Date.now());
        }
    }, []);

    // Screen size detection
    useEffect(() => {
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

    // Fetch events data on component mount
    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const eventsData = await fetchEvents(apiUrl);
                setEvents(eventsData);
            } catch (err) {
                setError('Failed to load events. Please try again later.');
                console.error('Error loading events:', err);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, [apiUrl]);

    // Transform API data to component format
    const latestEventsData: EventItem[] = events
        .slice(0, maxEvents)
        .map(transformApiEventToEventItem);

    // Preload images when events data changes
    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = latestEventsData.flatMap((event) => [
                // Preload main image
                new Promise<void>((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        setImagesLoaded(prev => new Set([...prev, event.image]));
                        resolve();
                    };
                    img.onerror = () => resolve();
                    img.src = event.image;
                }),
                // Preload thumbnail
                new Promise<void>((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        setImagesLoaded(prev => new Set([...prev, event.thumb]));
                        resolve();
                    };
                    img.onerror = () => resolve();
                    img.src = event.thumb;
                })
            ]);

            await Promise.all(imagePromises);
        };

        if (latestEventsData.length > 0) {
            preloadImages();
        }
    }, [latestEventsData]);

    // Auto-rotate every 3 seconds; pause when hovering over the section
    useEffect(() => {
        let isHovered = false;
        const node = hoverRef.current;
        const onEnter = () => (isHovered = true);
        const onLeave = () => (isHovered = false);
        node?.addEventListener('mouseenter', onEnter);
        node?.addEventListener('mouseleave', onLeave);

        const interval = setInterval(() => {
            if (isHovered || latestEventsData.length === 0) return;
            setActiveIdx((prev) => (prev + 1) % latestEventsData.length);
        }, autoRotateInterval);

        return () => {
            clearInterval(interval);
            node?.removeEventListener('mouseenter', onEnter);
            node?.removeEventListener('mouseleave', onLeave);
        };
    }, [latestEventsData, autoRotateInterval]);

    const activeEvent = useMemo(() => latestEventsData[activeIdx] || null, [activeIdx, latestEventsData]);

    // Navigation functions for active event
    const nextEvent = () => {
        setActiveIdx((prev) => (prev + 1) % latestEventsData.length);
    };

    const prevEvent = () => {
        setActiveIdx((prev) => (prev - 1 + latestEventsData.length) % latestEventsData.length);
    };

    // Show different number of thumbnails based on screen size
    const getThumbnailCount = () => {
        switch (screenSize) {
            case 'mobile': return 3;
            case 'tablet': return 4;
            case 'desktop': return 5;
            default: return 5;
        }
    };

    const thumbnailCount = getThumbnailCount();
    const visibleThumbnails = latestEventsData.slice(0, Math.min(thumbnailCount, latestEventsData.length));

    // No transition effects - instant switching

    return (
        <div ref={hoverRef} className={`py-12 sm:py-16 lg:py-20 bg-my-white ${className}`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-my-black mb-3 sm:mb-4">
                        {title}
                    </h2>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-16 sm:py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-my-accent mx-auto mb-3 sm:mb-4"></div>
                            <p className="text-sm sm:text-base text-gray-600">Loading events...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-16 sm:py-20">
                        <div className="text-center">
                            <p className="text-sm sm:text-base text-red-600 mb-3 sm:mb-4 px-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-my-accent text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-my-black transition-colors text-sm sm:text-base"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {!loading && !error && latestEventsData.length === 0 && (
                    <div className="flex justify-center items-center py-16 sm:py-20">
                        <p className="text-sm sm:text-base text-gray-600 px-4">No events available at the moment.</p>
                    </div>
                )}

                {!loading && !error && latestEventsData.length > 0 && activeEvent && (
                    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                        {/* Thumbnail Carousel Section */}
                        <div className="flex flex-col items-center space-y-4">
                            {/* Navigation Arrows + Thumbnails */}
                            <div className="flex items-center gap-4">
                                {/* Left Arrow */}
                                <button
                                    onClick={prevEvent}
                                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-my-black flex items-center justify-center hover:bg-my-black hover:text-my-white transition-all duration-300"
                                    aria-label="Previous event"
                                >
                                    <i className="fi fi-rr-angle-small-left text-sm sm:text-base"></i>
                                </button>

                                {/* Thumbnails */}
                                <div className="flex flex-row gap-3 sm:gap-4 lg:gap-6 justify-center">
                                    {visibleThumbnails.map((evt, idx) => {
                                        const isActive = idx === activeIdx;
                                        // Check if this event is upcoming by finding the corresponding API event
                                        const apiEvent = events.find(e => e.id === evt.id);
                                        const isUpcoming = apiEvent && currentTime ? isEventUpcoming(apiEvent.date, currentTime) : false;

                                        return (
                                            <button
                                                key={evt.id}
                                                onClick={() => {
                                                    if (idx !== activeIdx) {
                                                        setActiveIdx(idx);
                                                    }
                                                }}
                                                className={`relative group rounded-lg sm:rounded-xl overflow-hidden focus:outline-none transition-all duration-500 ease-in-out transform ${isActive ? 'ring-2 sm:ring-3 ring-red-500 -translate-y-1 sm:-translate-y-2 shadow-lg scale-105' : 'ring-1 ring-gray-200 hover:scale-102 hover:-translate-y-1 hover:shadow-md'} `}
                                                aria-label={`Show ${evt.title}`}
                                            >
                                                <img
                                                    src={evt.thumb}
                                                    alt={evt.title}
                                                    className={`h-20 w-24 sm:h-24 sm:w-32 lg:h-28 lg:w-40 object-cover transition-all duration-500 ease-in-out ${isActive ? 'brightness-100' : 'brightness-75 blur-[1px]'} `}
                                                    loading="lazy"
                                                    style={{
                                                        opacity: imagesLoaded.has(evt.thumb) ? 1 : 0.7,
                                                        transition: 'opacity 0.3s ease-in-out'
                                                    }}
                                                />
                                                {!isActive && (
                                                    <span className="absolute inset-0 bg-black/20 transition-all duration-300 ease-in-out" />
                                                )}
                                                {isUpcoming && (
                                                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-my-black group-hover:bg-my-accent transition-all duration-300 ease-in-out text-white text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md">
                                                        Upcoming
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Right Arrow */}
                                <button
                                    onClick={nextEvent}
                                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-my-black flex items-center justify-center hover:bg-my-black hover:text-my-white transition-all duration-300"
                                    aria-label="Next event"
                                >
                                    <i className="fi fi-rr-angle-small-right text-sm sm:text-base"></i>
                                </button>
                            </div>
                        </div>

                        {/* Main Content Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                            {/* Left: Event Details */}
                            <div className="order-2 lg:order-1">
                                <div className="space-y-4 sm:space-y-5">
                                    <h2 className="text-2xl sm:text-2xl lg:text-3xl font-semibold text-my-black leading-tight">
                                        {activeEvent.title}
                                    </h2>

                                    {/* Event Details */}
                                    <div className="space-y-3">
                                        {/* Date */}
                                        {(() => {
                                            const apiEvent = events.find(e => e.id === activeEvent.id);
                                            if (apiEvent) {
                                                const eventDate = new Date(apiEvent.date);
                                                const formattedDate = eventDate.toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                });
                                                return (
                                                    <div className="flex items-center gap-3">
                                                        <i className="fi fi-sr-calendar-clock text-my-accent text-xl"></i>

                                                        <span className="text-sm sm:text-base text-gray-700 font-medium">
                                                            {formattedDate}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })()}

                                        {/* Time */}
                                        {(() => {
                                            const apiEvent = events.find(e => e.id === activeEvent.id);
                                            if (apiEvent && apiEvent.time) {
                                                return (
                                                    <div className="flex items-center gap-3">
                                                        <i className="fi fi-sr-time-quarter-to text-my-accent text-xl"></i>

                                                        <span className="text-sm sm:text-base text-gray-700 font-medium">
                                                            {apiEvent.time}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })()}

                                        {/* Location */}
                                        {(() => {
                                            const apiEvent = events.find(e => e.id === activeEvent.id);
                                            if (apiEvent && apiEvent.location) {
                                                return (
                                                    <div className="flex items-center gap-3">
                                                        <i className="fi fi-ss-marker text-my-accent text-xl"></i>

                                                        <span className="text-sm sm:text-base text-gray-700 font-medium">
                                                            {apiEvent.location}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>

                                    <Link
                                        href={`/events/${activeEvent.id}`}
                                        className="inline-block bg-my-accent text-white px-6 sm:px-8 py-3 sm:py-4 hover:bg-my-accent/90 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base font-semibold"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Large Image */}
                            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[48px] w-full max-w-sm sm:max-w-md lg:max-w-xl aspect-[16/9]">
                                    {latestEventsData.map((event, index) => (
                                        <img
                                            key={event.id}
                                            src={event.image}
                                            alt={event.title}
                                            className={`w-full h-full object-cover absolute inset-0 ${index === activeIdx ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            loading="eager"
                                            style={{ transition: 'opacity 0.2s ease-in-out' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* View All Events Button */}
                        {/* <div className="flex justify-center">
                            <Link 
                                href="/events" 
                                className="inline-block bg-my-white text-my-black border border-my-black px-6 sm:px-8 py-3 sm:py-4 hover:bg-my-black hover:text-my-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base font-medium"
                            >
                                View All Events
                            </Link>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
}
