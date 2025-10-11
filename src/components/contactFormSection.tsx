"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./Button";
import { getInquiryMessageApiUrl } from "@/lib/config";

interface FormData {
    name: string;
    mobile_no: string;
    message: string;
}

export const ContactFormSection = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        mobile_no: "",
        message: ""
    });
    const [isAnimating, setIsAnimating] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const steps = [
        { key: 'name', label: 'Your name', placeholder: 'Enter your name...' },
        { key: 'mobile_no', label: 'Mobile number', placeholder: 'Enter your mobile number...' },
        { key: 'message', label: 'Your message', placeholder: 'Your message...' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            [steps[currentStep].key]: value
        }));
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                setIsAnimating(false);
            }, 150);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(prev => prev - 1);
                setIsAnimating(false);
            }, 150);
        }
    };

    const handleApiSuccess = (response: any) => {
        console.log("Form submitted successfully:", response);
        setSubmitStatus('success');
        setErrorMessage('');
        
        // Reset form after successful submission
        setFormData({
            name: "",
            mobile_no: "",
            message: ""
        });
        setCurrentStep(0);
    };

    const handleApiError = (error: any) => {
        console.error("Form submission failed:", error);
        setSubmitStatus('error');
        setErrorMessage('Failed to send your message. Please try again.');
    };

    const getApiPayload = () => ({
        name: formData.name,
        mobile_no: formData.mobile_no,
        message: formData.message
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep === steps.length - 1) {
            // Final submission - this will be handled by the Button component
            console.log("Form submitted:", formData);
            return;
        } else {
            handleNext();
        }
    };

    return (
        <section className="w-full bg-white">
            <div className="relative mx-auto max-w-7xl px-6 mt-32">

               <div className="bg-my-accent rounded-4xl p-8 lg:p-12 relative overflow-hidden h-[350px] sm:h-[700px] lg:h-[400px] my-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                        {/* Left side - Text and Form */}
                        <div className="lg:col-span-2 text-my-white h-full flex flex-col justify-center">
                            <h2 className="text-4xl lg:text-4xl font-bold mb-6">
                                Still wondering what to do?
                            </h2>
                            <p className="text-xl mb-8 text-my-black">
                                Send us a message and let our expert counselors help you
                            </p>

                             <form
                                 onSubmit={handleSubmit}
                                 role="form"
                                 aria-label="Contact form"
                                 className="max-w-md"
                             >
                                 <div className="relative overflow-hidden">
                                     {/* Form Input Container with Sliding Animation */}
                                     <div className="relative flex transition-transform duration-300 ease-in-out"
                                          style={{ transform: `translateX(-${currentStep * 100}%)` }}>
                                         {steps.map((step, index) => (
                                             <div key={step.key} className="w-full flex-shrink-0">
                                                 <label htmlFor={`${step.key}-input`} className="sr-only">
                                                     {step.label}
                                                 </label>
                                                 <input
                                                     id={`${step.key}-input`}
                                                     type={step.key === 'mobile_no' ? 'tel' : 'text'}
                                                     value={formData[step.key as keyof FormData]}
                                                     onChange={handleInputChange}
                                                     placeholder={step.placeholder}
                                                     className="w-full px-6 py-4 pr-16 bg-white text-gray-700 placeholder-gray-400 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white text-base"
                                                     aria-describedby={`${step.key}-help`}
                                                 />
                                                 <div id={`${step.key}-help`} className="sr-only">
                                                     {step.key === 'name' && 'Enter your full name'}
                                                     {step.key === 'mobile_no' && 'Enter your mobile number'}
                                                     {step.key === 'message' && 'Enter your message to get help from our expert counselors'}
                                                 </div>
                                             </div>
                                         ))}
                                     </div>

                                     {/* Navigation Buttons */}
                                     <div className="absolute right-2 top-[28px] transform -translate-y-1/2 flex items-center space-x-2">
                                         {/* Previous Button */}
                                         {currentStep > 0 && (
                                             <button
                                                 type="button"
                                                 onClick={handlePrevious}
                                                 className="w-10 h-10 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#d82329] transition-colors duration-200 flex items-center justify-center"
                                                 aria-label="Previous step"
                                             >
                                                 <i className="fi fi-rr-angle-small-left text-[16px]"></i>
                                             </button>
                                         )}

                                         {/* Next/Submit Button */}
                                         {currentStep === steps.length - 1 ? (
                                             <Button
                                                 type="submit"
                                                 className="w-10 h-10 bg-my-accent text-my-white rounded-full hover:bg-[#c01e24] focus:bg-[#c01e24] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#d82329] transition-colors duration-200 flex items-center justify-center"
                                                 aria-label="Submit form"
                                                 apiConfig={{
                                                     url: getInquiryMessageApiUrl(),
                                                     method: 'POST',
                                                     body: getApiPayload()
                                                 }}
                                                 onApiSuccess={handleApiSuccess}
                                                 onApiError={handleApiError}
                                                 loadingText=""
                                             >
                                                 <i className="fi fi-ss-paper-plane text-[16px]"></i>
                                             </Button>
                                         ) : (
                                             <button
                                                 type="button"
                                                 onClick={handleNext}
                                                 className="w-10 h-10 bg-my-accent text-my-white rounded-full hover:bg-[#c01e24] focus:bg-[#c01e24] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#d82329] transition-colors duration-200 flex items-center justify-center"
                                                 aria-label="Next step"
                                             >
                                                 <i className="fi fi-rr-angle-small-right text-[16px]"></i>
                                             </button>
                                         )}
                                     </div>

                                     {/* Step Indicator */}
                                     <div className="flex justify-center mt-4 space-x-2">
                                         {steps.map((_, index) => (
                                             <div
                                                 key={index}
                                                 className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                                     index === currentStep ? 'bg-white' : 'bg-white/50'
                                                 }`}
                                             />
                                         ))}
                                     </div>

                                     {/* Success Message */}
                                     {submitStatus === 'success' && (
                                         <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                                             Thank you! Your message has been sent successfully. We'll get back to you soon.
                                         </div>
                                     )}

                                     {/* Error Message */}
                                     {submitStatus === 'error' && (
                                         <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                             {errorMessage}
                                         </div>
                                     )}
                                 </div>
                             </form>
                        </div>

                        {/* Right side - Social Media Icons */}
                        <div className="flex flex-col items-end justify-center space-y-4 z-10">
                            <a href="#" aria-label="LinkedIn" className="text-white hover:text-white/80 transition-colors">
                                <i className="fi fi-brands-linkedin text-[24px] text-my-white hover:text-my-black transition-all duration-300"></i>
                            </a>
                            <a href="https://www.facebook.com/MentorsSA/" aria-label="Facebook" className="text-white hover:text-white/80 transition-colors">
                                <i className="fi fi-brands-facebook text-[24px] text-my-white hover:text-my-black transition-all duration-300"></i>
                            </a>
                            <a href="#" aria-label="WhatsApp" className="text-white hover:text-white/80 transition-colors">
                                <i className="fi fi-brands-whatsapp text-[24px] text-my-white hover:text-my-black transition-all duration-300"></i>
                            </a>
                            <a href="#" aria-label="X" className="text-white hover:text-white/80 transition-colors">
                                <i className="fi fi-brands-twitter-alt text-[24px] text-my-white hover:text-my-black transition-all duration-300"></i>
                            </a>
                            <a href="https://www.instagram.com/studyabroadwithmentors/?hl=en" aria-label="Instagram" className="text-white hover:text-white/80 transition-colors">
                                <i className="fi fi-brands-instagram text-[24px] text-my-white hover:text-my-black transition-all duration-300"></i>
                            </a>
                        </div>
                    </div>

               </div>

                <div className="absolute -bottom-0 right-8 lg:right-16 sm:mt-48">
                    <Image
                        className="w-[450px] lg:w-[450px] sm:w-[300px] h-auto"
                        alt="Customer support representative"
                        src="/customer-support-1.png"
                        width={320}
                        height={400}
                    />
                </div>

            </div>
        </section>
    );
};
