import React from 'react';
import Link from 'next/link';
import { getDhakaBranches } from '@/lib/branches-data';
import { Button } from './Button';

export const BranchCardsSection = () => {
    const dhakaBranches = getDhakaBranches();
    // Show only first 6 branches (2 rows of 3)
    const displayedBranches = dhakaBranches.slice(0, 6);

    return (
        <section className="w-full bg-white py-16">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-my-black mb-4">
                        Take your first <span className="text-my-accent">step with us</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Visit your nearest branch today
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {displayedBranches.map((branch) => (
                        <div key={branch.id} className="bg-white rounded-3xl p-6 border border-my-black/10 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-my-black mb-4">{branch.name}</h3>

                            {/* Location */}
                            <div className="flex items-start gap-3 mb-4">
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
                                <div className="flex items-start gap-3">
                                    <i className="fi fi-sr-phone-call text-my-accent text-lg mt-0.5 flex-shrink-0"></i>
                                    <div>
                                        <p className="text-my-black text-sm font-medium mb-1">Study Abroad</p>
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
                        </div>
                    ))}
                </div>

                {/* View Other Branches Button */}
                <div className="text-center mt-12">
                    <Link href="/contact#other-branches">
                        <button className="bg-my-white text-my-black border border-my-black px-6 py-3 hover:bg-my-black hover:text-my-white hover:border-my-white hover:border-1 rounded-full transition-all duration-300 text-sm sm:text-base">
                            View Other Branches
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
