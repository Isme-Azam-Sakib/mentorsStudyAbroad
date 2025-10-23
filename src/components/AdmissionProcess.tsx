'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ProcessCard } from './ProcessCard';

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

export const AdmissionProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      // Calculate which step should be active based on scroll position
      const stepHeight = 400; // Approximate height of each step card + spacing
      const scrollProgress = Math.max(0, Math.min(1, -containerTop / (containerHeight - windowHeight)));

      const newActiveStep = Math.min(3, Math.floor(scrollProgress * 4));
      setActiveStep(newActiveStep);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white min-h-screen mb-60">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-my-black mb-4">
            <span className="text-my-accent relative">Admission</span> Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow our simple 4-step process to secure your admission to your dream university
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Steps */}
          <div className="space-y-1">
            {admissionSteps.map((step, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${index <= activeStep
                    ? 'opacity-100 transform translate-y-32'
                    : 'opacity-10 transform translate-y-64'
                  }`}
                style={{
                  position: index <= activeStep ? 'sticky' : 'relative',
                  top: index <= activeStep ? `${index * 100}px` : 'auto',
                  zIndex: index + 1
                }}
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

          {/* Right Column - Fixed Image */}
          <div className="lg:sticky lg:top-8 translate-y-50">
            <div className="relative">
              <div className="w-full h-auto  overflow-hidden">
                <img
                  src="/services/hero-service.png"
                  alt="Admission process counseling session"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
