"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Lottie from 'lottie-react';
import { getEventsApiUrl } from '@/lib/config';

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
        setCurrentTime(Date.now());
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
                    <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-12 ">
                        {/* Timer inside hero */}
                        <div className="mb-10">
                            <div className="bg-my-black text-white rounded-2xl px-4 md:px-8 py-8 mt-10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <h3 className="text-2xl font-semibold">{heading}</h3>
                                    <div className="flex items-center gap-8 md:gap-10">
                                        {timerItems.map((t, idx) => (
                                            <div key={t.label} className="flex items-end gap-2">
                                                <span className="text-4xl font-bold">{String(t.value).padStart(2, '0')}</span>
                                                <span className="opacity-80">{t.label}</span>
                                                {idx < timerItems.length - 1 && <span className="mx-2 opacity-40">|</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">
                            {/* Left: Title and description only */}
                            <div>
                                <h4 className="text-[24px] font-bold text-my-black leading-tight">
                                    {event.title}
                                </h4>
                                <p className="mt-6 text-gray-700">{event.description}</p>
                            </div>
                            {/* Right: Thumbnail image */}
                            <div className="flex justify-center lg:justify-end">
                                <img src={event.image} alt={event.title} className="w-full max-w-xl h-auto object-cover rounded-[32px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Quick Info (Date, Time, Location) */}
            <div className="-mt-6 mb-10 relative z-20">
                <div className="max-w-6xl mx-auto px-3">
                    <div className="flex justify-center">
                        <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-pink-200/50 p-6 md:p-8 shadow-xl w-full">
                            <div className="flex items-center justify-center gap-10 md:gap-16">
                                {/* Date */}
                                <div className="flex items-center gap-4">
                                    <i className="fi fi-sr-calendar-clock text-my-accent text-4xl"></i>
                                    <div className="text-left">
                                        <div className="text-gray-500 text-sm font-medium mb-1">Date</div>
                                        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                                            {formatDate(event.datetimeISO)}
                                        </div>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="hidden md:block w-px h-16 bg-gray-300"></div>

                                {/* Time */}
                                <div className="flex items-center gap-4">
                                    <i className="fi fi-sr-clock-three text-my-accent text-4xl"></i>
                                    <div className="text-left">
                                        <div className="text-gray-500 text-sm font-medium mb-1">Time</div>
                                        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                                            {formatTime(event.datetimeISO)}
                                        </div>
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="hidden md:block w-px h-16 bg-gray-300"></div>

                                {/* Location */}
                                <div className="flex items-center gap-4">
                                    <i className="fi fi-ss-marker text-my-accent text-4xl"></i>
                                    <div className="text-left">
                                        <div className="text-gray-500 text-sm font-medium mb-1">Location</div>
                                        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
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
                        <div className="aspect-video w-full">
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

            {/* Separator and Upcoming Events */}
            <div className="py-10">
                <div className="max-w-7xl mx-auto px-4">                    
                    <div className="my-6 w-full bg-gray-200"></div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl lg:text-4xl font-bold text-my-black">
                            View <span className="text-my-accent relative">Upoming</span> Events
                        </h2>
                    </div>

                    {allEvents.filter(e => currentTime && new Date(e.datetimeISO).getTime() > currentTime).length === 0 ? (
                        <div className="flex flex-col justify-center items-center py-20">
                            {calendarAnimation && (
                                <Lottie 
                                    animationData={calendarAnimation} 
                                    loop={true}
                                    style={{ width: 200, height: 200 }}
                                />
                            )}
                            <p className="text-gray-600 mt-4 text-lg">No upcoming events at the moment.</p>
                        </div>
                    ) : (
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allEvents
                                .filter(e => currentTime && new Date(e.datetimeISO).getTime() > currentTime)
                                .sort((a, b) => new Date(a.datetimeISO).getTime() - new Date(b.datetimeISO).getTime())
                                .slice(0, 3)
                                .map(evt => (
                                <div key={evt.id} className="group rounded-3xl border border-gray-200 hover:bg-my-white2 transition-all duration-300 p-4 bg-white h-full flex flex-col">
                                    <div className="relative overflow-hidden rounded-2xl">
                                        <img src={evt.image} alt={evt.title} className="h-56 w-full object-cover hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-[1.03]" />
                                        <span className="bg-my-black text-white group-hover:bg-my-accent group-hover:text-white transition-colors absolute top-3 right-3 px-4 py-1 rounded-full text-sm font-medium">
                                            Upcoming
                                        </span>
                                    </div>
                                    <div className="pt-5 space-y-3 flex-1 flex flex-col">
                                        <div className="flex items-start gap-3">
                                            <i className="fi fi-ss-marker text-my-accent"></i>
                                            <div>
                                                <h4 className="text-my-black font-semibold leading-snug">{evt.title}</h4>
                                                <p className="text-gray-600 text-sm">{evt.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <i className="fi fi-sr-calendar-clock text-my-accent"></i>
                                            <span className="text-my-black font-medium">{evt.datetimeDisplay}</span>
                                        </div>
                                        <Link href={`/events/${evt.id}`} className="w-full text-center mt-auto rounded-full border border-my-black px-5 py-3 font-semibold transition-colors hover:bg-my-black hover:text-white">Learn More</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>


        </>
    );
}


