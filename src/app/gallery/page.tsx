"use client";

import { VideoSection } from '@/components/VideoSection';
import { ClientOnly } from '@/components/ClientOnly';
import { Button } from '@/components/Button';
import Link from 'next/link';
import BrowseAlbums from '@/components/BrowseAlbums';
import LazySection from '@/components/LazySection';


export default function GalleryPage() {

    return (
        <div className="min-h-screen bg-my-white">
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-16 items-center">
                            {/* Left Column - Text and Buttons */}
                            <div className="text-center lg:text-left order-2 lg:order-1">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-my-black mb-4 sm:mb-5 lg:mb-6 leading-tight">
                                    <span className="text-my-accent relative">Gallery</span> of our events and memorable moments
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
                                        src="/gallery-hero.png"
                                        alt="Gallery and events"
                                        className="max-w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Browse Albums Section */}
            <LazySection delay={0.2}>
                <BrowseAlbums />
            </LazySection>


            {/* Mentors&apos; Videos Section */}
            <ClientOnly>
                <VideoSection />
            </ClientOnly>


        </div>
    );
}
