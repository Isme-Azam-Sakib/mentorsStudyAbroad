'use client';

import React from 'react';
import { ProcessCard } from './ProcessCard';
import { AdmissionStep } from '@/lib/countries-data';

interface AdmissionProcessProps {
  steps: AdmissionStep[];
  imageUrl?: string;
  imageAlt?: string;
}

export const AdmissionProcess: React.FC<AdmissionProcessProps> = ({ 
  steps,
  imageUrl = "/services/hero-service.png",
  imageAlt = "Admission process counseling session"
}) => {
  // Commented out scroll animation behavior
  // const containerRef = useRef<HTMLDivElement>(null);
  // const [activeStep, setActiveStep] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!containerRef.current) return;

  //     const container = containerRef.current;
  //     const containerRect = container.getBoundingClientRect();
  //     const containerTop = containerRect.top;
  //     const containerHeight = containerRect.height;
  //     const windowHeight = window.innerHeight;

  //     // Calculate which step should be active based on scroll position
  //     const stepHeight = 400; // Approximate height of each step card + spacing
  //     const scrollProgress = Math.max(0, Math.min(1, -containerTop / (containerHeight - windowHeight)));

  //     const newActiveStep = Math.min(3, Math.floor(scrollProgress * 4));
  //     setActiveStep(newActiveStep);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   handleScroll(); // Initial call

  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <div className="w-full bg-my-white min-h-screen mb-60">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-my-black mb-4">
            <span className="text-my-accent relative">Admission</span> & Visa Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow our simple {steps.length}-step process to secure your admission to your dream university
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Right Column - Fixed Image (Top on mobile) */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-8  lg:translate-y-50 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-full sm:w-80 md:w-96 lg:w-full h-auto overflow-hidden">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Left Column - Steps (Bottom on mobile) */}
          <div className="order-2 lg:order-1 space-y-8">
            {steps.map((step, index) => (
              <div key={index}>
                <ProcessCard
                  title={step.title}
                  content={step.content}
                  index={index}
                  className="mx-auto lg:mx-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
