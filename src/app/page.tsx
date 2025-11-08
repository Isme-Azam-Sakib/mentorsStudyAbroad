"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LatestEventsSection from '@/components/LatestEventsSection';
import { getEventsApiUrl } from '@/lib/config';
import { ProcessCard } from '@/components/ProcessCard';
import { ContactForm } from '@/components/ContactForm';
import { VideoSection } from '@/components/VideoSection';
import { ClientOnly } from '@/components/ClientOnly';
import FAQSection from '@/components/FAQSection';
import LazySection from '@/components/LazySection';
import LazyImage from '@/components/LazyImage';
import PageLoader from '@/components/PageLoader';
import { Button } from '@/components/Button';
import { StudyAbroadModal } from '@/components/StudyAbroadModal';
import { testimonialsData } from '@/lib/testimonials-data';
import CTA from '@/components/CTA';
import ChooseDestination from '@/components/ChooseDestination';
import FilterableEventsSection from '@/components/FilterableEventsSection';
import { BranchCardsSection } from '@/components/BranchCardsSection';
import UniversitiesSection from '@/components/UniversitiesSection';
import { CountryStats } from '@/components/CountryStats';
import { AccreditationSection } from '@/components/AccreditationSection';
import { PartnerUniversities } from '@/components/PartnerUniversities';

const admissionSteps = [
  {
    title: "Get personalized counselling",
    content: " Meet our expert counsellors to explore your study options, shortlist universities, and understand admission requirements."
  },
  {
    title: "Confirm admission from institute",
    content: " Apply to your chosen institute and receive an official offer letter once your application is successful."
  },
  {
    title: "Pay tuition & OSHC fees",
    content: "Secure your admission by paying the required tuition fees and arranging Overseas Student Health Cover (OSHC)."
  },
  {
    title: "Share updated documents",
    content: "Submit proof of payment and updated academic or financial documents to complete the admission process. Applicants must submit certified copies of academic certificates, mark sheets, professional certificates, and English proficiency test results (IELTS/TOEFL/PTE). A CV, Statement of Purpose (SOP), work experience certificates, and proof of salary or bank statements for the last six months are also required, if applicable. Additionally, provide a copy of your passport, evidence of any education gap (if needed), and details of your immigration history."
  }
];

const whyChooseItems = [
  {
    title: "No File Opening Fee. No Service Charge.",
    content: "Get all the information you need about multiple countries and universities in one place - completely free! Apply with confidence, with accurate knowledge and expert support, without any charge!"
  },
  {
    title: "A-Z Guidelines",
    content: "Starting from admission guidance to visa applications, we're here to walk you through every step. We'll also help you prepare for interviews and apply for scholarships. Your success is our priority!"
  },
  {
    title: "Hassle-free visa processing",
    content: "Submit the required documents after consultation, and enjoy fastest visa processing with our support."
  }
];

// Use testimonials from the imported data - limit to first 4
const testimonials = testimonialsData.slice(0, 4).map(testimonial => ({
  id: testimonial.id,
  text: testimonial.text,
  name: testimonial.name,
  university: testimonial.company,
  image: testimonial.image
}));

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const admissionProcessRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [admissionActiveStep, setAdmissionActiveStep] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking && containerRef.current) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;

          const container = containerRef.current;
          const containerRect = container.getBoundingClientRect();
          const containerTop = containerRect.top;
          const containerHeight = containerRect.height;
          const windowHeight = window.innerHeight;

          // Simple progress calculation
          const progress = Math.max(0, Math.min(1, -containerTop / (containerHeight - windowHeight)));
          const newActiveStep = Math.min(3, Math.floor(progress * 4));

          // Only update if changed to prevent unnecessary re-renders
          setActiveStep(prevStep => prevStep !== newActiveStep ? newActiveStep : prevStep);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Admission process scroll behavior
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleAdmissionScroll = () => {
      if (!admissionProcessRef.current) return;

      const container = admissionProcessRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      // Calculate which step should be active based on scroll position
      const stepHeight = 400; // Approximate height of each step card + spacing
      const scrollProgress = Math.max(0, Math.min(1, -containerTop / (containerHeight - windowHeight)));

      const newActiveStep = Math.min(3, Math.floor(scrollProgress * 4));
      setAdmissionActiveStep(newActiveStep);
    };

    window.addEventListener('scroll', handleAdmissionScroll);
    handleAdmissionScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleAdmissionScroll);
  }, []);

  // Testimonial navigation functions
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
                  Achieve your global dreams with <span className="text-my-accent relative">Mentors’ Study Abroad</span>

                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-7 lg:mb-8 leading-relaxed">
                  Expert guidance, top universities, personalized support
                </p>
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
                    src="/hero-home.png"
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
        <CountryStats isHomepage={true} />
      </LazySection>

      {/* Why Choose us Section */}
      <LazySection delay={0.2}>
        <div className="py-16 bg-my-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Why Choose Content */}
              <div>
                <div className="mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold lg:text-left md:text-center sm:text-center text-my-black mb-4">
                    Why choose <span className="text-my-accent relative">Mentors&apos; Study Abroad?</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {whyChooseItems.map((item, index) => (
                    <ProcessCard
                      key={index}
                      title={item.title}
                      content={item.content}
                      index={index}
                      className="mx-auto lg:mx-0 bg-my-white hover:bg-my-white transition-colors duration-300"
                    />
                  ))}
                </div>
              </div>

              {/* Right Column - Fixed Image */}
              <div className="lg:sticky lg:top-8 lg:translate-y-50">
                <div className="relative flex justify-center">
                  <div className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto overflow-hidden">
                    <img
                      src="/why-choose-us.jpg"
                      alt="Why choose us"
                      className="w-full h-auto object-cover rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* Choose Destination Section */}
      <LazySection delay={0.2}>
        <ChooseDestination maxRows={2} />
      </LazySection>


      {/* Accreditation Section */}
      <LazySection delay={0.2}>
        <AccreditationSection />
      </LazySection>

      {/* Admission Process Section */}
      <LazySection delay={0.2}>
        <div ref={admissionProcessRef} className="w-full bg-white min-h-[120vh] sm:mb-16">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 w-full">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-my-black mb-3 sm:mb-4">
                <span className="text-my-accent relative">Admission</span> Process
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                Follow our simple 4-step process to secure your admission to your dream university
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
              {/* Left Column - Admission Steps (Commented Out Scrolling Behavior) */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {admissionSteps.map((step, index) => (
                  <div
                    key={index}
                  // className={`transition-all duration-500 ${index <= admissionActiveStep
                  //   ? 'opacity-100 transform translate-y-16 sm:translate-y-24 lg:translate-y-32'
                  //   : 'opacity-10 transform translate-y-32 sm:translate-y-48 lg:translate-y-64'
                  //   }`}
                  // style={{
                  //   position: index <= admissionActiveStep ? 'sticky' : 'relative',
                  //   top: index <= admissionActiveStep ? `${index * 60}px` : 'auto',
                  //   zIndex: index + 1
                  // }}
                  >
                    <ProcessCard
                      title={step.title}
                      content={step.content}
                      index={index}
                      className="mx-auto lg:mx-0"
                    />
                  </div>
                ))}
              </div>

              {/* Right Column - Contact Form */}
              <div
                className="lg:sticky lg:top-4 xl:top-8 transition-all duration-500"
                style={{ zIndex: 20 }}
              >
                <div className="relative">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* <LazySection delay={0.2}>
        <UniversitiesSection />
      </LazySection> */}

      {/* Partner Universities Section */}
      <LazySection delay={0.2}>
        <PartnerUniversities />
      </LazySection>

      {/* Testimonials Section */}
      <LazySection delay={0.2}>
        <div className="py-12 sm:py-14 lg:py-16 bg-my-white relative">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              {/* Left Column - Heading and Navigation */}
              <div className="order-1 lg:order-1">
                <div className="mb-6 sm:mb-7 lg:mb-8 text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-my-black mb-3 sm:mb-4">
                    Visa <span className="text-my-accent relative">Success Stories</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    Hear from our students in home page
                  </p>
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full border-2 border-my-black flex items-center justify-center hover:bg-my-black hover:text-my-white transition-all duration-300"
                    aria-label="Previous testimonial"
                  >
                    <span className="flex items-center justify-center w-full h-full">
                      <i className="fi fi-rr-arrow-small-left text-sm sm:text-base"></i>
                    </span>
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full border-2 border-my-black flex items-center justify-center hover:bg-my-black hover:text-my-white transition-all duration-300"
                    aria-label="Next testimonial"
                  >
                    <span className="flex items-center justify-center w-full h-full">
                      <i className="fi fi-rr-arrow-small-right text-sm sm:text-base"></i>
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column - Testimonial Content */}
              <div className="relative order-2 lg:order-2">
                <div className="absolute -top-8 -left-4 sm:-top-12 sm:-left-6 lg:-top-16 lg:-left-8 z-20 pointer-events-none">
                  <LazyImage
                    src="/quotation.png"
                    alt="Quotation mark"
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-full lg:h-full object-contain"
                  />
                </div>

                <div className="relative overflow-hidden min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
                  <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                  >
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="w-full flex-shrink-0 flex items-center">
                        <div className="relative w-full">

                          {/* Testimonial Text */}
                          <blockquote className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-my-black leading-relaxed mb-6 sm:mb-7 lg:mb-8 font-light">
                            {testimonial.text.length > 365
                              ? (
                                <>
                                  {testimonial.text.substring(0, 365)}...
                                  <Link
                                    href="/success-stories"
                                    className="text-my-accent hover:text-my-accent/80 transition-colors duration-300 ml-1"
                                  >
                                    View More
                                  </Link>
                                </>
                              )
                              : testimonial.text
                            }
                          </blockquote>

                          {/* Author Info */}
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                              <LazyImage
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to initials if image fails to load
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.textContent = testimonial.name.split(' ').map(n => n[0]).join('');
                                    parent.className = 'w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-my-accent text-white flex items-center justify-center font-bold text-xs sm:text-sm';
                                  }
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-my-black text-sm sm:text-base truncate">{testimonial.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-600 truncate">{testimonial.university}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazySection>

      {/* CTA Section */}
      <LazySection delay={0.2}>
        <CTA
          title="1 step away from your study abroad dream"
          subtitle="Just click the button below, follow the instruction and we’ll take it from there"
          buttonText="Click to get started"
          buttonOnClick={() => {/* your action */ }}
        />
      </LazySection>

      <LazySection delay={0.2}>
        <FilterableEventsSection />
      </LazySection>


      {/* Video Section */}
      <LazySection delay={0.2}>
        <ClientOnly>
          <VideoSection
            title={
              <>
                Hear From <span className="text-my-accent relative">Our Students</span>
              </>
            }
          />
        </ClientOnly>
      </LazySection>

      {/* Branch Cards Section */}
      <LazySection delay={0.2}>
        <BranchCardsSection />
      </LazySection>

      {/* FAQ Section */}
      <LazySection delay={0.2}>
        <FAQSection />
      </LazySection>

      {/* Study Abroad Modal */}
      <StudyAbroadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}