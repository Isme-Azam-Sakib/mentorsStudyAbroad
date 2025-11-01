import React from 'react';
import Image from 'next/image';

export const AccreditationSection = () => {
    return (
        <section className="w-full bg-my-white py-16 sm:px-4">
            <div className="mx-auto max-w-7xl px-6 border-1 border-my-black/10 py-8 rounded-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Headline */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold text-my-black">
                            Accredited & Trusted
                        </h2>
                    </div>

                    {/* Right Column - Accreditation Images */}
                    <div className="flex justify-center lg:justify-end items-center gap-24">
                        <div className="flex-shrink-0">
                            <Image
                                src="/accreditation/IAS_badge.png"
                                alt="Accreditation 1"
                                width={240}
                                height={240}
                                className="h-[80px] sm:h-[100px] md:h-[120px] lg:h-[180px] w-auto object-contain"
                            />
                        </div>
                        <div className="flex-shrink-0">
                            <Image
                                src="/accreditation/AIRC_LOGO.png"
                                alt="Accreditation 2"
                                width={240}
                                height={240}
                                className="h-[80px] sm:h-[100px] md:h-[120px] lg:h-[180px] w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
