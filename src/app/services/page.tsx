"use client";

import { Button } from '@/components/Button';
import { useEffect, useRef, useState } from 'react';
import { StudyAbroadModal } from '@/components/StudyAbroadModal';
import Link from 'next/link';

// Static services data
const servicesData = [
    {
        id: 1,
        title: "Expert Guidance",
        description: "From choosing the appropriate country, university, and program - to complete admission process support, our expert counsellors will closely work with you to ensure you get the program that’s right for you.",
        image: "/services/service 1.png"
    },
    {
        id: 2,
        title: "Test Prep Support",
        description: "Prefer IELTS or PTE? We offer both. SAT? We have that, too. If spoken and written English is something you need to work on, first, we can offer you that, too. Our reputation of excellence for test prep support has been built over nearly 30 years!",
        image: "/services/service 2.png"
    },
    {
        id: 3,
        title: "Scholarship Support",
        description: "Our experts help you find which university, in which country, and for which program that suits your profile and ambitions - provide the highest amount of scholarship, so that finances do not remain too much of a headache for you.",
        image: "/services/service 3.png"
    },
    {
        id: 4,
        title: "Visa Support",
        description: "Our services do not stop at admission. Our experts help you process visas for your journey as well. No service charge for us - pay only what the visa office requires.",
        image: "/services/service 4.png"
    },
    {
        id: 5,
        title: "Flight and Accommodation Support",
        description: "We offer you ticketing support, as well as accommodation support so that you may know how you will fly and where you will stay as much in advance as possible.",
        image: "/services/service 5.png"
    },
    {
        id: 6,
        title: "Post-Admission Support",
        description: "We remain connected with our students and offer any support we can to them, long after they have taken our service and fly away to pursue their dream education abroad. We believe not only in providing services, but also in nurturing lifelong friendships with our students.",
        image: "/services/service 6.png"
    }
];

export default function Services() {
    const [activeService, setActiveService] = useState(1);
    const [scrollProgress, setScrollProgress] = useState(0);
    const servicesRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const rafRef = useRef<number | null>(null);
    const lastActiveServiceRef = useRef(1);

    useEffect(() => {
        // Only run on desktop/tablet
        if (typeof window === 'undefined' || window.innerWidth < 768) return;

        const handleScroll = () => {
            // Cancel any pending animation frame
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }

                // Use requestAnimationFrame to throttle updates
                rafRef.current = requestAnimationFrame(() => {
                    if (!servicesRef.current || window.innerWidth < 768) return;

                    const servicesSection = servicesRef.current;
                    const windowHeight = window.innerHeight;

                    // Calculate which service is currently in view - only desktop service items
                    const serviceElements = servicesSection.querySelectorAll('.service-item');
                    let currentActive = 1;

                    // Get section position and dimensions
                    const sectionRect = servicesSection.getBoundingClientRect();
                    const sectionTopAbsolute = sectionRect.top + window.scrollY;
                    const sectionHeight = sectionRect.height;
                    const sectionBottomAbsolute = sectionTopAbsolute + sectionHeight;

                    // Calculate scroll progress (0 to 100) based on scroll position
                    let progress = 0;
                    const scrollY = window.scrollY;
                    const viewportCenter = scrollY + (windowHeight / 2);

                    // Calculate progress based on viewport center position
                    if (viewportCenter <= sectionTopAbsolute) {
                        // Viewport center is before section starts
                        progress = 0;
                        currentActive = 1;
                    } else if (viewportCenter >= sectionBottomAbsolute) {
                        // Viewport center is past section end
                        progress = 100;
                        currentActive = servicesData.length;
                    } else {
                        // Viewport center is within section - calculate progress
                        const progressFromTop = (viewportCenter - sectionTopAbsolute) / sectionHeight;
                        progress = Math.min(100, Math.max(0, progressFromTop * 100));

                        // Find which service element is closest to viewport center
                        // Filter to only visible desktop service items
                        const allServiceElements = servicesSection.querySelectorAll('.service-item');
                        const visibleServices: { element: Element; index: number }[] = [];

                        allServiceElements.forEach((element, index) => {
                            const computedStyle = window.getComputedStyle(element);
                            const elementRect = element.getBoundingClientRect();
                            
                            // Only include visible elements (desktop services are visible on md+ screens)
                            if (computedStyle.display !== 'none' && 
                                computedStyle.visibility !== 'hidden' &&
                                elementRect.height > 50 && // Desktop services are tall
                                elementRect.width > 100) { // Desktop services are wide
                                visibleServices.push({ element, index });
                            }
                        });

                        if (visibleServices.length > 0) {
                            let closestIndex = 0;
                            let closestDistance = Infinity;
                            const viewportCenterY = windowHeight / 2;

                            visibleServices.forEach(({ element, index }) => {
                                const elementRect = element.getBoundingClientRect();
                                const elementCenter = elementRect.top + (elementRect.height / 2);
                                const distance = Math.abs(viewportCenterY - elementCenter);

                                if (distance < closestDistance) {
                                    closestDistance = distance;
                                    closestIndex = index;
                                }
                            });

                            currentActive = closestIndex + 1;
                        }
                    }

                    // Always update scroll progress for smooth filling
                    setScrollProgress(progress);

                    // Only update active service if changed to prevent unnecessary re-renders
                    if (currentActive !== lastActiveServiceRef.current) {
                        lastActiveServiceRef.current = currentActive;
                        setActiveService(currentActive);
                    }
                });
        };

        // Throttled resize handler
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                handleScroll();
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
            clearTimeout(resizeTimeout);
        };
    }, []);
    return (
        <>
            {/* Hero Section */}
            <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
                {/* Hero Background */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/hero background.png')"
                    }}
                />


                {/* Hero Content */}
                <div className="relative z-10 flex items-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                            {/* Left Column - Text and Buttons */}
                            <div className="text-center lg:text-left order-2 lg:order-1">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-my-black mb-4 sm:mb-5 lg:mb-6 leading-tight px-2 sm:px-0">
                                    Find out <span className="text-my-accent relative">what we do</span>, how we do and how it benefits you
                                </h1>
                                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-7 lg:mb-8 leading-relaxed px-2 sm:px-0">
                                    We provide comprehensive study abroad services to help you achieve your international education goals
                                </p>
                                <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
                                    <Link href="/contact">
                                        <Button variant="outline" className="text-xs sm:text-sm md:text-base">
                                            Book A Free Consultation <i className="fi fi-sr-meeting-alt"></i>
                                        </Button>
                                    </Link>

                                    <button className="bg-my-black text-my-white border border-my-white px-4 py-3 hover:bg-my-white hover:text-my-black hover:border-my-black hover:border-1 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base">
                                        Download Brochure <i className="fi fi-sr-file-pdf"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Hero Image */}
                            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                                <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                                    <img
                                        src="/services/service-hero.png"
                                        alt="Our services"
                                        className="w-full h-auto max-h-[250px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px] object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div ref={servicesRef} className="py-12 sm:py-16 lg:py-20 bg-my-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Title */}
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-my-black mb-3 sm:mb-4">
                            What we <span className="text-my-accent relative">Offer</span>
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                            We provide comprehensive study abroad services to help you achieve your international education goals
                        </p>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden">
                        <div className="flex flex-col items-center gap-4 sm:gap-6">
                            {servicesData.map((service, index) => (
                                <div
                                    key={service.id}
                                    className="service-item rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 w-full max-w-sm sm:max-w-md"
                                >
                                    {/* Service Image */}
                                    <div className="relative w-full overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-auto object-contain"
                                        />
                                        {/* Service Number Badge */}
                                        <div className="absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-my-black text-white flex items-center justify-center text-sm sm:text-base font-bold">
                                            {String(service.id).padStart(2, '0')}
                                        </div>
                                    </div>

                                    {/* Service Content */}
                                    <div className="p-4 sm:p-5">
                                        <h3 className="text-lg sm:text-xl font-bold text-my-black mb-2 sm:mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tablet & Desktop View - Progress Indicator with Two-Column Layout */}
                    <div className="hidden md:block relative mx-8">
                        {/* Progress Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200">
                            <div
                                className="w-full bg-my-black transition-all duration-100 ease-out will-change-[height]"
                                style={{
                                    height: `${scrollProgress}%`
                                }}
                            />
                        </div>

                        {/* Progress Numbers */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col justify-between h-full py-8">
                            {servicesData.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 will-change-[background-color,color] ${activeService >= service.id
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
                                            className="w-full h-auto object-cover rounded-3xl px-4"
                                        />
                                    </div>

                                    {/* Service Content */}
                                    <div className="flex-1">
                                        <h3 className="text-3xl xl:text-4xl font-bold text-my-black mb-6">
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