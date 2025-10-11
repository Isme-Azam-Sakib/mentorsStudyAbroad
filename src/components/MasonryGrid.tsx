"use client";

import Link from 'next/link';

interface MasonryImage {
    id: number;
    src: string;
    alt: string;
    href?: string;
}

interface MasonryGridProps {
    images: MasonryImage[];
    columns?: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    gap?: string;
    showLinks?: boolean;
    linkHref?: string;
}

export default function MasonryGrid({ 
    images, 
    columns = { mobile: 2, tablet: 3, desktop: 4 },
    gap = "gap-4 md:gap-6",
    showLinks = true,
    linkHref = "/gallery"
}: MasonryGridProps) {
    
    const getColumnsClass = () => {
        const mobileCols = `columns-${columns.mobile}`;
        const tabletCols = `md:columns-${columns.tablet}`;
        const desktopCols = `lg:columns-${columns.desktop}`;
        return `${mobileCols} ${tabletCols} ${desktopCols}`;
    };

    return (
        <div className={`${getColumnsClass()} ${gap} space-y-4 md:space-y-6`}>
            {images.map((image) => (
                <div key={image.id} className="break-inside-avoid mb-4 md:mb-6 group">
                    {showLinks ? (
                        <Link href={image.href || linkHref}>
                            <div className="overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            </div>
                        </Link>
                    ) : (
                        <div className="overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
