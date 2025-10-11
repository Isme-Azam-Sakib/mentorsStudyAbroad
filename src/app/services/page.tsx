"use client";

import { Button } from '@/components/Button';
import { useEffect, useRef, useState } from 'react';
import { StudyAbroadModal } from '@/components/StudyAbroadModal';

// Static services data
const servicesData = [
    {
        id: 1,
        title: "Expert Guidance",
        description: "From choosing the appropriate country, university, and program - to complete admission process support, our expert counsellors will closely work with you to ensure you get the program that’s right for you.",
        image: "/services/service- (1).png"
    },
    {
        id: 2,
        title: "Test Prep Support",
        description: "Prefer IELTS or PTE? We offer both. SAT? We have that, too. If spoken and written English is something you need to work on, first, we can offer you that, too. Our reputation of excellence for test prep support has been built over nearly 30 years!",
        image: "/services/service- (2).png"
    },
    {
        id: 3,
        title: "Scholarship Support",
        description: "Our experts help you find which university, in which country, and for which program that suits your profile and ambitions - provide the highest amount of scholarship, so that finances do not remain too much of a headache for you.",
        image: "/services/service- (3).png"
    },
    {
        id: 4,
        title: "Visa Support",
        description: "Our services do not stop at admission. Our experts help you process visas for your journey as well. No service charge for us - pay only what the visa office requires.",
        image: "/services/service- (4).png"
    },
    {
        id: 5,
        title: "Flight and Accommodation Support",
        description: "We offer you ticketing support, as well as accommodation support so that you may know how you will fly and where you will stay as much in advance as possible.",
        image: "/services/service- (5).png"
    },
    {
        id: 6,
        title: "Post-Admission Support",
        description: "We remain connected with our students and offer any support we can to them, long after they have taken our service and fly away to pursue their dream education abroad. We believe not only in providing services, but also in nurturing lifelong friendships with our students.",
        image: "/services/service- (6).png"
    }
];

export default function Services() {
    const [activeService, setActiveService] = useState(1);
    const servicesRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (!servicesRef.current) return;

            const servicesSection = servicesRef.current;
            const rect = servicesSection.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Calculate which service is currently in view
            const serviceElements = servicesSection.querySelectorAll('.service-item');
            let currentActive = 1;

            serviceElements.forEach((element, index) => {
                const elementRect = element.getBoundingClientRect();
                const elementTop = elementRect.top;
                const elementBottom = elementRect.bottom;

                // If element is in the middle portion of the viewport
                if (elementTop <= windowHeight / 2 && elementBottom >= windowHeight / 2) {
                    currentActive = index + 1;
                }
            });

            setActiveService(currentActive);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
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
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 lg:pt-32 my-16 sm:my-24 lg:my-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                            {/* Left Column - Text and Buttons */}
                            <div className="text-center lg:text-left order-2 lg:order-1">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-my-black mb-4 sm:mb-5 lg:mb-6 leading-tight">
                                    Find out <span className="text-my-accent relative">what we do</span>, how we do and how it benefits you
                                </h1>
                                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-7 lg:mb-8 leading-relaxed">
                                    We provide comprehensive study abroad services to help you achieve your international education goals
                                </p>
                                <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                                    <Button variant="outline" onClick={() => setIsModalOpen(true)} className="text-sm sm:text-base">
                                        Free Expert Consultation <i className="fi fi-sr-meeting-alt"></i>
                                    </Button>

                                    <button className="bg-my-black text-my-white border border-my-white px-4 py-3 hover:bg-my-white hover:text-my-black hover:border-my-black hover:border-1 rounded-full transition-all duration-300 text-sm sm:text-base">
                                        Download Brochure <i className="fi fi-sr-file-pdf"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Hero Image */}
                            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                                <div className="relative">
                                    <img
                                        src="/hero-service.png"
                                        alt="Events, workshops and webinars"
                                        className="max-w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div ref={servicesRef} className="py-20 bg-my-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Section Title */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-my-black mb-4">
                            What we <span className="text-my-accent relative">Offer</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We provide comprehensive study abroad services to help you achieve your international education goals
                        </p>
                    </div>

                    {/* Services with Progress Indicator */}
                    <div className="relative mx-8">
                        {/* Progress Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200">
                            <div
                                className="w-full bg-my-black transition-all duration-500 ease-out"
                                style={{
                                    height: `${((activeService - 1) / (servicesData.length - 1)) * 100}%`
                                }}
                            />
                        </div>

                        {/* Progress Numbers */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col justify-between h-full py-8">
                            {servicesData.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${activeService >= service.id
                                        ? 'bg-my-black text-white'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    {String(service.id).padStart(2, '0')}
                                </div>
                            ))}
                        </div>

                        {/* Services Content */}
                        <div className="space-y-32">
                            {servicesData.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`service-item flex items-center gap-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                        }`}
                                >
                                    {/* Service Image */}
                                    <div className="flex-1">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-auto object-cover rounded-3xl"
                                        />
                                    </div>

                                    {/* Service Content */}
                                    <div className="flex-1">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-my-black mb-6">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Study Abroad Modal */}
            <StudyAbroadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}