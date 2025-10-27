"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import { getEventsApiUrl } from '@/lib/config';

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

type FilterableEvent = {
    id: number;
    title: string;
    location: string;
    datetime: string; // human readable date time
    image: string;
    status: 'upcoming' | 'past';
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

// Helper function to transform API data to component format
const transformApiEventToFilterableEvent = (apiEvent: ApiEvent, currentTime: number): FilterableEvent => {
    const eventDate = new Date(apiEvent.date);
    const isUpcoming = currentTime ? eventDate.getTime() >= currentTime : false;

    // Format date consistently (no locale dependencies)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(eventDate.getDate()).padStart(2, '0');
    const month = months[eventDate.getMonth()];
    const year = eventDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = apiEvent.time;
    const datetime = `${formattedDate}, ${formattedTime}`;

    return {
        id: apiEvent.id,
        title: apiEvent.title,
        location: apiEvent.location,
        datetime,
        image: apiEvent.image,
        status: isUpcoming ? 'upcoming' : 'past'
    };
};

interface FilterableEventsSectionProps {
    title?: React.ReactNode;
    className?: string;
}

export default function FilterableEventsSection({ 
    title = (
        <>
            Browse <span className="text-my-accent relative">all events</span>
        </>
    ),
    className = ""
}: FilterableEventsSectionProps) {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [visibleCount, setVisibleCount] = useState(3);
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

    // Transform API data to component formats
    const filterableEventsData: FilterableEvent[] = events
        .map(event => transformApiEventToFilterableEvent(event, currentTime));

    return (
        <div className={`py-12 sm:py-16 lg:py-20 bg-white ${className}`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-my-black mb-2">
                        {title}
                    </h2>
                </div>
                
                {!loading && !error && (
                    <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-10">
                        <button
                            onClick={() => { setActiveTab('upcoming'); setVisibleCount(3); }}
                            className={`relative text-base sm:text-lg font-semibold transition-colors ${activeTab === 'upcoming' ? 'text-my-black' : 'text-gray-400'}`}
                        >
                            Upcoming
                            <span className={`absolute -bottom-2 left-0 right-0 mx-auto h-[2px] w-8 sm:w-10 rounded-full transition-all ${activeTab === 'upcoming' ? 'bg-my-accent' : 'bg-transparent'}`} />
                        </button>
                        <button
                            onClick={() => { setActiveTab('past'); setVisibleCount(3); }}
                            className={`relative text-base sm:text-lg font-semibold transition-colors ${activeTab === 'past' ? 'text-my-black' : 'text-gray-400'}`}
                        >
                            Past Events
                            <span className={`absolute -bottom-2 left-0 right-0 mx-auto h-[2px] w-8 sm:w-10 rounded-full transition-all ${activeTab === 'past' ? 'bg-my-accent' : 'bg-transparent'}`} />
                        </button>
                    </div>
                )}

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

                {!loading && !error && filterableEventsData.length === 0 && (
                    <div className="flex flex-col justify-center items-center py-16 sm:py-20">
                        {calendarAnimation && (
                            <Lottie
                                animationData={calendarAnimation}
                                loop={true}
                                style={{ width: 150, height: 150 }}
                            />
                        )}
                        <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg px-4">No events available at the moment.</p>
                    </div>
                )}

                {!loading && !error && filterableEventsData.length > 0 && (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {filterableEventsData
                                .filter((e) => e.status === activeTab)
                                .slice(0, visibleCount)
                                .map((evt) => (
                                    <div key={evt.id} className="group rounded-2xl sm:rounded-3xl border border-gray-200 hover:bg-my-white2 transition-all duration-300 p-3 sm:p-4 bg-white h-full flex flex-col">
                                        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                                            <div className="aspect-video w-full">
                                                <img 
                                                    src={evt.image} 
                                                    alt={evt.title} 
                                                    className="h-full w-full object-cover hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-[1.03]" 
                                                />
                                            </div>
                                            <span className={`${evt.status === 'upcoming' ? 'bg-my-black text-white' : 'bg-gray-200 text-gray-700'} group-hover:bg-my-accent group-hover:text-white transition-colors absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium`} >
                                                {evt.status === 'upcoming' ? 'Upcoming' : 'Past'}
                                            </span>
                                        </div>
                                        <div className="pt-3 sm:pt-5 space-y-2 sm:space-y-3 flex-1 flex flex-col">
                                            <div className="flex items-start gap-2 sm:gap-3">
                                                <i className="fi fi-ss-marker text-my-accent text-sm sm:text-base mt-0.5"></i>
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-my-black font-semibold leading-snug text-sm sm:text-[12px]">{evt.title}</h4>
                                                    <p className="text-gray-600 text-xs sm:text-sm truncate">{evt.location}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                                                <i className="fi fi-sr-calendar-clock text-my-accent"></i>
                                                <span className="text-my-black font-medium">{evt.datetime}</span>
                                            </div>
                                            <Link href={`/events/${evt.id}`} className="w-full text-center mt-auto rounded-full border border-my-black px-3 sm:px-5 py-2 sm:py-3 font-semibold transition-colors hover:bg-my-black hover:text-white text-xs sm:text-sm">View Details</Link>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {filterableEventsData.filter((e) => e.status === activeTab).length === 0 && activeTab === 'upcoming' && (
                            <div className="flex flex-col justify-center items-center py-16 sm:py-20">
                                {calendarAnimation && (
                                    <Lottie
                                        animationData={calendarAnimation}
                                        loop={true}
                                        style={{ width: 150, height: 150 }}
                                    />
                                )}
                                <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg px-4">No upcoming events at the moment.</p>
                            </div>
                        )}

                        {filterableEventsData.filter((e) => e.status === activeTab).length > visibleCount && (
                            <div className="flex justify-center mt-8 sm:mt-10">
                                <button onClick={() => setVisibleCount((c) => c + 3)} className="rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-my-black hover:bg-my-black hover:text-white transition-colors font-semibold text-sm sm:text-base">Load More</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
