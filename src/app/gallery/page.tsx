"use client";

import { VideoSection } from '@/components/VideoSection';

// Event Gallery Data
const eventGalleryData = [
    {
        id: 1,
        title: "BBA Night Event Gallery",
        image: "/service-1.jpg",
        description: "Stage performance with live music and presentations"
    },
    {
        id: 2,
        title: "BBA Night Event Gallery",
        image: "/service-2.jpg",
        description: "Audience engagement and event participation"
    },
    {
        id: 3,
        title: "BBA Night Event Gallery",
        image: "/service-3.jpg",
        description: "Keynote speaker presentation and celebration"
    }
];

export default function GalleryPage() {

    return (
        <div className="min-h-screen bg-my-white">

            {/* Event Gallery Section */}
            <section className="py-16 bg-my-white pt-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-my-black mb-4">
                            Event <span className="text-my-accent relative">Gallery</span>
                        </h2>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {eventGalleryData.map((event, index) => (
                            <div key={event.id} className="group cursor-pointer">
                                {/* Gallery Title - Outside the card */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-my-black">
                                        {event.title}
                                    </h3>
                                </div>

                                {/* Gallery Card Thumbnail */}
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 aspect-square">
                                    <div className="relative h-full">
                                        {/* Gallery Thumbnail */}
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Hover State - Dark Gradient Overlay with Button */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                            <div className="w-full p-6">
                                                <button className="w-full bg-my-accent text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 font-semibold hover:bg-my-accent/90 transition-colors duration-300">
                                                    <span>View Gallery</span>
                                                    <i className="fi fi-sr-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mentors' Videos Section */}
            <VideoSection />


        </div>
    );
}
