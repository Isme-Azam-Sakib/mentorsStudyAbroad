"use client";

import { useState, useEffect } from 'react';
import LazySection from '@/components/LazySection';
import { ContactForm } from '@/components/ContactForm';
import { Button } from '@/components/Button';
import { StudyAbroadModal } from '@/components/StudyAbroadModal';
import { branchesData, getDhakaBranches, getOutsideDhakaBranches } from '@/lib/branches-data';

export default function ContactPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Handle scroll to hash when page loads with hash in URL
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const element = document.getElementById(hash);
            if (element) {
                // Small delay to ensure page is fully loaded
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, []);

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
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 sm:my-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                            {/* Left Column - Text and Buttons */}
                            <div className="text-center lg:text-left order-2 lg:order-1">
                                {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-my-black mb-4 sm:mb-5 lg:mb-6 leading-tight">
                                    Get in <span className="text-my-accent relative">Touch</span> with Us
                                </h1>
                                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-7 lg:mb-8 leading-relaxed">
                                    Ready to start your study abroad journey? Contact our expert team for personalized guidance and support.
                                </p>
                                <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                                    <Button variant="outline" onClick={() => setIsModalOpen(true)} className="text-sm sm:text-base">
                                        Book A Free Consultation <i className="fi fi-sr-meeting-alt"></i>
                                    </Button>

                                    <button className="bg-my-black text-my-white border border-my-white px-4 py-3 hover:bg-my-white hover:text-my-black hover:border-my-black hover:border-1 rounded-full transition-all duration-300 text-sm sm:text-base">
                                        Download Brochure <i className="fi fi-sr-file-pdf"></i>
                                    </button>
                                </div> */}
                                <ContactForm />
                            </div>

                            {/* Right Column - Hero Image */}
                            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                                <div className="relative">
                                    <img
                                        src="/customer-support-1.png"
                                        alt="Contact us for study abroad guidance"
                                        className="max-w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Branches Section */}
            <LazySection delay={0.2}>
                <div className="py-16 bg-my-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-my-black mb-4">
                                Our <span className="text-my-accent relative">Branches</span>
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Visit any of our branches across Bangladesh for personalized study abroad guidance.
                            </p>
                        </div>

                        {/* Dhaka Branches */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-my-black mb-8 text-center">Dhaka Branches</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {getDhakaBranches().map((branch) => (
                                    <div key={branch.id} className="bg-white rounded-3xl p-6  border border-my-black/10 hover:shadow-xl transition-shadow duration-300">
                                        <h4 className="text-xl font-bold text-my-black mb-4">{branch.name}</h4>
                                        
                                        {/* Location */}
                                        <div className="flex items-start gap-3 mb-3">
                                            <i className="fi fi-ss-marker text-my-accent text-lg mt-0.5 flex-shrink-0"></i>
                                            <a 
                                                href={branch.googleMapsUrl || `https://www.google.com/maps?q=${branch.coordinates?.lat},${branch.coordinates?.lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-my-black text-sm leading-relaxed hover:text-my-accent transition-colors duration-300 cursor-pointer"
                                            >
                                                {branch.address}
                                            </a>
                                        </div>

                                       {/* Study Abroad Phone */}
                                        {branch.contact.studyAbroad && branch.contact.studyAbroad.length > 0 && (
                                            <div className="flex items-start gap-3 mb-3">
                                                <i className="fi fi-sr-phone-call text-my-accent text-lg mt-0.5 flex-shrink-0"></i>
                                                <div>
                                                    <p className="text-my-black text-sm font-medium">Study Abroad</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {branch.contact.studyAbroad.map((phone, index) => (
                                                            <a 
                                                                key={index}
                                                                href={`tel:${phone}`}
                                                                className="text-my-black text-sm hover:text-my-accent transition-colors duration-300"
                                                            >
                                                                {phone}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Email */}
                                        <div className="flex items-start gap-3">
                                            <i className="fi fi-sr-envelope text-my-accent text-lg mt-0.5 flex-shrink-0"></i>
                                            <a 
                                                href={`mailto:${branch.contact.email}`}
                                                className="text-my-black text-sm hover:text-my-accent transition-colors duration-300"
                                            >
                                                {branch.contact.email}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Other Branches */}
                        <div id="other-branches" className="scroll-mt-32">
                            <h3 className="text-2xl font-bold text-my-black mb-8 text-center">Other Branches</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {getOutsideDhakaBranches().map((branch) => (
                                    <div key={branch.id} className="bg-white rounded-3xl p-6  border border-my-black/10 hover:shadow-xl transition-shadow duration-300">
                                        <h4 className="text-xl font-bold text-my-black mb-4">{branch.name}</h4>
                                        
                                        {/* Location */}
                                        <div className="flex items-start gap-3 mb-3">
                                            <i className="fi fi-ss-marker text-my-accent text-lg mt-0.5 flex-shrink-0"></i>
                                            <a 
                                                href={branch.googleMapsUrl || `https://www.google.com/maps?q=${branch.coordinates?.lat},${branch.coordinates?.lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-my-black text-sm leading-relaxed hover:text-my-accent transition-colors duration-300 cursor-pointer"
                                            >
                                                {branch.address}
                                            </a>
                                        </div>

                                        {/* Education Phone */}
                                        <div className="flex items-start gap-3 mb-3">
                                            <i className="fi fi-sr-phone-call text-my-accent text-lg mt-0.5 flex-shrink-0"></i>
                                            <div>
                                                <p className="text-my-black text-sm font-medium">Education</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {branch.contact.education.map((phone, index) => (
                                                        <a 
                                                            key={index}
                                                            href={`tel:${phone}`}
                                                            className="text-my-black text-sm hover:text-my-accent transition-colors duration-300"
                                                        >
                                                            {phone}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Study Abroad Phone */}
                                        {branch.contact.studyAbroad && branch.contact.studyAbroad.length > 0 && (
                                            <div className="flex items-start gap-3 mb-3">
                                                <i className="fi fi-sr-phone-call text-my-accent text-lg mt-0.5 flex-shrink-0"></i>
                                                <div>
                                                    <p className="text-my-black text-sm font-medium">Study Abroad</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {branch.contact.studyAbroad.map((phone, index) => (
                                                            <a 
                                                                key={index}
                                                                href={`tel:${phone}`}
                                                                className="text-my-black text-sm hover:text-my-accent transition-colors duration-300"
                                                            >
                                                                {phone}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Email */}
                                        <div className="flex items-start gap-3">
                                            <i className="fi fi-sr-envelope text-my-accent text-lg mt-0.5 flex-shrink-0"></i>
                                            <a 
                                                href={`mailto:${branch.contact.email}`}
                                                className="text-my-black text-sm hover:text-my-accent transition-colors duration-300"
                                            >
                                                {branch.contact.email}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </LazySection>

            {/* Contact Form & Map Section
            <LazySection delay={0.3}>
                <div className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-my-black mb-4">
                                Get in <span className="text-my-accent relative">Touch</span> with Us
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Send us a message or visit our office. We&apos;re here to help you every step of the way.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
                            {/* Left Column - Map */}
                            {/* <div className="order-2 lg:order-1 flex flex-col justify-center py-16">
                                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 flex-1">
                                    <div className="h-full w-full">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            allowFullScreen
                                            referrerPolicy="no-referrer-when-downgrade"
                                            src="https://maps.google.com/maps?q=House%20123%2C%20Road%2045%2C%20Block%20D%2C%20Dhanmondi%2C%20Dhaka%201205%2C%20Bangladesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                            title="Mentors Study Abroad Office Location"
                                            className="w-full h-full min-h-[400px] lg:min-h-full"
                                        />
                                    </div>
                                </div>
                            </div> */}

                            {/* Right Column - Contact Form */}
                            {/* <div className="order-1 lg:order-2 flex flex-col">
                                <div className="flex-1">
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </LazySection> */}

            

            {/* Study Abroad Modal */}
            <StudyAbroadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
