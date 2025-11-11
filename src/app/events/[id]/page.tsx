"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Lottie from 'lottie-react';
import { getEventsApiUrl } from '@/lib/config';
import FilterableEventsSection from '@/components/FilterableEventsSection';
import LazySection from '@/components/LazySection';

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
type EventDetails = {
    id: number;
    title: string;
    description: string;
    image: string;
    location: string;
    datetimeISO: string;
    datetimeDisplay: string;
};

// API Service
const fetchEvents = async (): Promise<ApiEvent[]> => {
    try {
        const response = await fetch(getEventsApiUrl());
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

// Helper function to format date consistently (no locale issues)
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// Helper function to format time consistently (no locale issues)
const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

// Helper function to transform API data to component format
const transformApiEventToEventDetails = (apiEvent: ApiEvent): EventDetails => {
    const eventDate = new Date(apiEvent.date);
    const datetimeISO = eventDate.toISOString();
    
    // Format date consistently (no locale dependencies)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(eventDate.getDate()).padStart(2, '0');
    const month = months[eventDate.getMonth()];
    const year = eventDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    const datetimeDisplay = `${formattedDate}, ${apiEvent.time}`;
    
    return {
        id: apiEvent.id,
        title: apiEvent.title,
        description: apiEvent.description,
        image: apiEvent.image,
        location: apiEvent.location,
        datetimeISO,
        datetimeDisplay
    };
};

function useCountdown(targetISO: string) {
    const compute = () => {
        const now = new Date().getTime();
        const target = new Date(targetISO).getTime();
        const diff = target - now;
        const abs = Math.abs(diff);
        const days = Math.floor(abs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((abs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((abs / (1000 * 60)) % 60);
        const seconds = Math.floor((abs / 1000) % 60);
        return { diff, days, hours, minutes, seconds };
    };

    // Initialize with zero values to avoid hydration mismatch
    const [state, setState] = useState({ diff: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setState(compute());
        const t = setInterval(() => setState(compute()), 1000);
        return () => clearInterval(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetISO]);

    // Return zero values on first render (server + initial client)
    if (!mounted) {
        return { diff: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return state;
}

export default function EventDetailsPage() {
    const params = useParams();
    const id = Number(params?.id);
    const [currentTime, setCurrentTime] = useState<number>(0);
    
    // API data state
    const [events, setEvents] = useState<ApiEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [calendarAnimation, setCalendarAnimation] = useState<object | null>(null);

    // Set current time on client mount to avoid hydration mismatch
    useEffect(() => {
        // Only set time on client side to avoid hydration mismatch
        if (typeof window !== 'undefined') {
            setCurrentTime(Date.now());
        }
    }, []);

    // Fetch events data on component mount
    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const eventsData = await fetchEvents();
                setEvents(eventsData);
            } catch (err) {
                setError('Failed to load events. Please try again later.');
                console.error('Error loading events:', err);
            } finally {
                setLoading(false);
            }
        };

        const loadCalendarAnimation = async () => {
            try {
                const response = await fetch('/Calendar.json');
                const animationData = await response.json();
                setCalendarAnimation(animationData);
            } catch (err) {
                console.error('Error loading calendar animation:', err);
            }
        };

        loadEvents();
        loadCalendarAnimation();
    }, []);

    // Find the current event and transform it
    const event = useMemo(() => {
        const apiEvent = events.find(e => e.id === id);
        return apiEvent ? transformApiEventToEventDetails(apiEvent) : null;
    }, [events, id]);

    // Transform all events for upcoming events section
    const allEvents = useMemo(() => 
        events.map(transformApiEventToEventDetails), 
        [events]
    );

    const { diff, days, hours, minutes, seconds } = useCountdown(event?.datetimeISO || new Date().toISOString());
    const heading = diff >= 0 ? 'Event Starts in :' : 'Event Ended :';

    const timerItems = useMemo(
        () => [
            { label: 'Day(s)', value: days },
            { label: 'Hour(s)', value: hours },
            { label: 'Minute(s)', value: minutes },
            { label: 'Second(s)', value: seconds }
        ],
        [days, hours, minutes, seconds]
    );

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-24">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-my-accent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-24">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-my-accent text-white px-6 py-3 rounded-full hover:bg-my-black transition-colors mr-4"
                    >
                        Try Again
                    </button>
                    <Link href="/events" className="rounded-full border border-my-black px-6 py-3 hover:bg-my-black hover:text-white">Back to Events</Link>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-24">
                <p className="text-center text-gray-600">Event not found.</p>
                <div className="text-center mt-6">
                    <Link href="/events" className="rounded-full border border-my-black px-6 py-3 hover:bg-my-black hover:text-white">Back to Events</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Content Section with hero background */}
            <div className="relative">
                <div
                    className="absolute inset-0 w-full h-auto bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/hero background.png')" }}
                />
                <div className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4 pt-8 md:pt-4 pb-12 ">
                        {/* Timer*/}
                        <div className="mb-10">
                            <div className="bg-my-black text-white rounded-2xl px-4 md:px-8 py-8 mt-32">
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                                    <h3 className="text-xl sm:text-2xl font-semibold text-center lg:text-left">{heading}</h3>
                                    <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full sm:w-auto items-center justify-center">
                                        {timerItems.map((t, idx) => (
                                            <div key={t.label} className="flex items-end gap-2 justify-center">
                                                <span className="text-3xl sm:text-4xl font-bold">{String(t.value).padStart(2, '0')}</span>
                                                <span className="opacity-80 text-sm sm:text-base">{t.label}</span>
                                                {idx < timerItems.length - 1 && <span className="mx-2 opacity-40 hidden sm:inline">|</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Mobile/Tablet: Thumbnail first, then Title and Description */}
                        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10 lg:items-center py-8 lg:py-16">
                            {/* Thumbnail image - First on mobile/tablet */}
                            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                                <img src={event.image} alt={event.title} className="w-full max-w-xl h-auto object-cover rounded-2xl sm:rounded-[32px]" />
                            </div>
                            {/* Title and description - Second on mobile/tablet */}
                            <div className="order-2 lg:order-1">
                                <h4 className="text-xl sm:text-2xl lg:text-[24px] font-bold text-my-black leading-tight">
                                    {event.title}
                                </h4>
                                <p className="mt-4 sm:mt-6 text-gray-700 whitespace-pre-line text-sm sm:text-base">{event.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Quick Info (Date, Time, Location) */}
            <div className="-mt-6 mb-10 relative z-20">
                <div className="max-w-6xl mx-auto px-3 sm:px-4">
                    <div className="flex justify-center">
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-pink-200/50 p-4 sm:p-6 md:p-8 shadow-xl w-full">
                            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-16 flex-wrap">
                                {/* Date */}
                                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
                                    <i className="fi fi-sr-calendar-clock text-my-accent text-2xl sm:text-3xl md:text-4xl"></i>
                                    <div className="text-left">
                                        <div className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Date</div>
                                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black">
                                            {formatDate(event.datetimeISO)}
                                        </div>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="hidden sm:block w-px h-12 sm:h-16 bg-gray-300 flex-shrink-0"></div>

                                {/* Time */}
                                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
                                    <i className="fi fi-sr-clock-three text-my-accent text-2xl sm:text-3xl md:text-4xl"></i>
                                    <div className="text-left">
                                        <div className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Time</div>
                                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black">
                                            {formatTime(event.datetimeISO)}
                                        </div>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="hidden sm:block w-px h-12 sm:h-16 bg-gray-300 flex-shrink-0"></div>

                                {/* Location */}
                                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
                                    <i className="fi fi-ss-marker text-my-accent text-2xl sm:text-3xl md:text-4xl"></i>
                                    <div className="text-left min-w-0">
                                        <div className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Location</div>
                                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-black break-words">
                                            {event.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Map Section */}
            <div className="py-16 bg-my-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl lg:text-4xl font-bold text-my-black mb-4">
                            Event <span className="text-my-accent relative">Location</span>
                        </h2>
                        <p className="text-gray-600 text-lg">Find us at the event venue</p>
                    </div>
                    
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                        <div className="h-[400px] sm:h-[600px] md:aspect-video w-full">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                title={`Map showing ${event.location}`}
                                className="w-full h-full"
                            />
                        </div>
                        
                    </div>
                </div>
            </div>

            <LazySection delay={0.2}>
                <FilterableEventsSection title="Browse Other Events" />
            </LazySection>

        </>
    );
}


