"use client";

import { useState } from 'react';
import Link from 'next/link';
import { getEventsApiUrl } from '@/lib/config';
import LatestEventsSection from '@/components/LatestEventsSection';
import FilterableEventsSection from '@/components/FilterableEventsSection';
import LazySection from '@/components/LazySection';
import { Button } from '@/components/Button';
import { StudyAbroadModal } from '@/components/StudyAbroadModal';
import FullScreenGallery, { GalleryImage } from '@/components/FullScreenGallery';

// Gallery Images Data
const galleryImages: GalleryImage[] = [
    { id: 1, src: "/gallery/Gallery_1.jpg", alt: "Gallery Image 1" },
    { id: 2, src: "/gallery/Gallery_2.jpg", alt: "Gallery Image 2" },
    { id: 3, src: "/gallery/Gallery_3.jpg", alt: "Gallery Image 3" },
    { id: 4, src: "/gallery/Gallery_4.jpg", alt: "Gallery Image 4" },
    { id: 5, src: "/gallery/Gallery_5.jpg", alt: "Gallery Image 5" },
    { id: 6, src: "/gallery/Gallery_6.jpg", alt: "Gallery Image 6" },
    { id: 7, src: "/gallery/Gallery_7.jpg", alt: "Gallery Image 7" },
    { id: 8, src: "/gallery/Gallery_8.jpg", alt: "Gallery Image 8" },
    { id: 9, src: "/gallery/Gallery_9.jpg", alt: "Gallery Image 9" },
    { id: 10, src: "/gallery/Gallery_10.jpg", alt: "Gallery Image 10" },
    { id: 11, src: "/gallery/Gallery_11.jpg", alt: "Gallery Image 11" },
];

export default function EventsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
        <>
            {/* Hero Section */}
            <div className="relative">
                {/* Hero Background */}
                <div
                    className="absolute inset-0 w-full h-auto bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/hero background.png')"
                    }}
                />

                {/* Hero Content */}
                <div className="relative z-10 flex items-center">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 my-16 sm:my-24 lg:my-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                            {/* Left Column - Text and Buttons */}
                            <div className="text-center lg:text-left order-2 lg:order-1">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-my-black mb-4 sm:mb-5 lg:mb-6 leading-tight">
                                    <span className="text-my-accent relative">Events</span> and Seminars
                                </h1>
                                <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                                    <Link href="/contact">
                                        <Button variant="outline" className="text-sm sm:text-base">
                                            Book A Free Consultation <i className="fi fi-sr-meeting-alt"></i>
                                        </Button>
                                    </Link>

                                    <button className="bg-my-black text-my-white border border-my-white px-4 py-3 hover:bg-my-white hover:text-my-black hover:border-my-black hover:border-1 rounded-full transition-all duration-300 text-sm sm:text-base">
                                        Download Brochure <i className="fi fi-sr-file-pdf"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Hero Image */}
                            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                                <div className="relative">
                                    <img
                                        src="/event_page_hero.png"
                                        alt="Events, workshops and webinars"
                                        className="max-w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LazySection delay={0.2}>
                {/* Latest Events Section */}
                <LatestEventsSection
                    apiUrl={getEventsApiUrl()}
                    title={
                        <>
                            What&apos;s <span className="text-my-accent relative">latest</span> right now
                        </>
                    }
                    maxEvents={5}
                    autoRotateInterval={5000}
                />
            </LazySection>


            <LazySection delay={0.2}>
                <FilterableEventsSection />
            </LazySection>

            <LazySection delay={0.2}>
                {/* Event Gallery - Masonry Grid */}
                <div className="py-12 sm:py-16 lg:py-20 bg-my-white">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-my-black">
                                Mentors&apos; Study Abroad <span className="text-my-accent relative">Gallery</span>
                            </h2>
                        </div>

                        {/* Masonry Grid with FullScreenGallery - 2 columns mobile, 3 columns tablet+ */}
                        <div className="columns-2 md:columns-3 gap-3 sm:gap-4 md:gap-6 space-y-3 sm:space-y-4 md:space-y-6">
                            {/* All Gallery Images */}
                            {galleryImages.map((image, index) => (
                                <div key={image.id} className="break-inside-avoid mb-3 sm:mb-4 md:mb-6">
                                    <div 
                                        className="overflow-hidden rounded-xl sm:rounded-2xl group cursor-pointer"
                                        onClick={() => {
                                            setSelectedImageIndex(index);
                                            setIsGalleryOpen(true);
                                        }}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt || `Gallery ${index + 1}`}
                                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* FullScreenGallery Component */}
                        <FullScreenGallery
                            images={galleryImages}
                            initialIndex={selectedImageIndex}
                            isOpen={isGalleryOpen}
                            onClose={() => setIsGalleryOpen(false)}
                        />

                        <div className="flex justify-center mt-6 sm:mt-8">
                            <Link href="/gallery" className="rounded-full border border-my-black px-4 sm:px-6 py-2 sm:py-3 hover:bg-my-black hover:text-white transition-colors font-semibold text-sm sm:text-base">
                                View Other Galleries
                            </Link>
                        </div>
                    </div>
                </div>
            </LazySection>

            {/* Study Abroad Modal */}
            <StudyAbroadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}


