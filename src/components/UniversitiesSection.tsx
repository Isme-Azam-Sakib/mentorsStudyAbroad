"use client";

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { countriesData } from '@/lib/countries-data';

// Logos and stats now live in countriesData

function toTitleCase(slug: string): string {
    if (!slug) return '';
    return slug
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
}

export function UniversitiesSection() {
    const pathname = usePathname();
    const countrySlug = useMemo(() => {
        const match = pathname?.match(/\/countries\/([^/]+)/);
        return match?.[1] ?? 'australia';
    }, [pathname]);

    const logos = countriesData[countrySlug as keyof typeof countriesData]?.universityLogos || countriesData.australia.universityLogos;

    const mid = Math.ceil(logos.length / 2);
    const rowOne = logos.slice(0, mid);
    const rowTwo = logos.slice(mid);

    return (
        <div className="py-12 sm:py-14 lg:py-16 bg-my-white">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="text-center mb-6 sm:mb-7 lg:mb-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-my-black">
                        Universities <span className="text-my-accent">In {toTitleCase(countrySlug)}</span>
                    </h2>
                </div>

                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                    <MarqueeRow logos={rowOne} speedMs={22000} />
                    <MarqueeRow logos={rowTwo.length ? rowTwo : rowOne} speedMs={22000} reverse />
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}

function MarqueeRow({ logos, speedMs, reverse = false }: { logos: string[]; speedMs: number; reverse?: boolean; }) {
    // Duplicate the logos to create a seamless loop
    const items = [...logos, ...logos];
    return (
        <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[24px]">
            <div
                className="flex gap-3 sm:gap-4 lg:gap-6 will-change-transform"
                style={{
                    width: 'max-content',
                    animation: `marquee ${speedMs}ms linear infinite`,
                    animationDirection: reverse ? 'reverse' as const : 'normal' as const
                }}
            >
                {items.map((src, idx) => (
                    <div key={`${src}-${idx}`} className="shrink-0 rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border border-gray-200 px-2 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
                        <img src={src} alt="University logo" className="h-10 sm:h-12 md:h-14 lg:h-20 w-auto object-contain" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UniversitiesSection;


