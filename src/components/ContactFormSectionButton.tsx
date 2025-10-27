"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./Button";

export const ContactFormSectionButton = () => {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleApiSuccess = (response: unknown) => {
        console.log("Form submitted successfully:", response);
        setSubmitStatus('success');
        setErrorMessage('');
    };

    const handleApiError = (error: unknown) => {
        console.error("Form submission failed:", error);
        setSubmitStatus('error');
        setErrorMessage('Failed to send your message. Please try again.');
    };

    const getApiPayload = () => ({
        // Add your API payload here if needed
        action: 'contact_request'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Button clicked - form submitted");
        return;
    };

    return (
        <section className="w-full bg-white">
            <div className="relative mx-auto max-w-7xl px-6 mt-32">

               <div className="bg-my-accent rounded-4xl p-8 lg:p-12 relative overflow-hidden h-[350px] sm:h-[700px] lg:h-[400px] my-16">
                    {/* Mobile/Tablet Layout */}
                    <div className="lg:hidden flex flex-col items-center justify-start h-full text-center">
                        {/* Text Content */}
                        <div className="text-my-white mb-8">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Still wondering what to do?
                            </h2>
                            <p className="text-lg sm:text-xl text-my-black">
                                Send us a message and let our expert counselors help you
                            </p>
                        </div>

                        {/* Button */}
                        <div className="mb-8">
                            <form
                                onSubmit={handleSubmit}
                                role="form"
                                aria-label="Contact form"
                            >
                                <div className="relative overflow-hidden">
                                    <div className="relative flex justify-center">
                                        <Button variant="secondary" onClick={() => {
                                            console.log("Contact button clicked");
                                        }} className="text-sm sm:text-base">
                                            Book A Free Consultation <i className="fi fi-sr-meeting-alt"></i>
                                        </Button>
                                    </div>

                                    {submitStatus === 'success' && (
                                        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                                            Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                            {errorMessage}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Social Media Icons - Horizontal */}
                        <div className="flex items-center justify-center space-x-4 z-10">
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

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid grid-cols-3 gap-8 h-full">
                        {/* Left side - Text and Button */}
                        <div className="col-span-2 text-my-white h-full flex flex-col justify-center">
                            <h2 className="text-4xl font-bold mb-6">
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
                                     <div className="relative flex">
                                         <Button variant="secondary" onClick={() => {
                                             console.log("Contact button clicked");
                                         }} className="text-sm sm:text-base">
                                             Book A Free Consultation <i className="fi fi-sr-meeting-alt"></i>
                                         </Button>
                                     </div>

                                     {submitStatus === 'success' && (
                                         <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                                             Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                                         </div>
                                     )}

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

                {/* Mobile/Tablet Image - Centered and Anchored */}
                <div className="lg:hidden absolute -bottom-0 left-1/2 transform -translate-x-1/2">
                    <Image
                        className="w-[300px] sm:w-[450px] h-auto"
                        alt="Customer support representative"
                        src="/customer-support-1.png"
                        width={320}
                        height={400}
                    />
                </div>

                {/* Desktop Image - Right Anchored */}
                <div className="hidden lg:block absolute -bottom-0 right-8 lg:right-16 sm:mt-48">
                    <Image
                        className="w-[450px] h-auto"
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
