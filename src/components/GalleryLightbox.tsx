"use client";

import React, { useState, useEffect } from 'react';

interface GalleryImage {
    id: number;
    src: string;
    alt: string;
}

interface GalleryLightboxProps {
    images: GalleryImage[];
    children: React.ReactNode;
}

export default function GalleryLightbox({ images, children }: GalleryLightboxProps) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const handleImageClick = (imageIndex: number) => {
        setIndex(imageIndex);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!open) return;
        
        switch (e.key) {
            case 'Escape':
                handleClose();
                break;
            case 'ArrowRight':
                handleNext();
                break;
            case 'ArrowLeft':
                handlePrev();
                break;
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    return (
        <>
            {/* Render children with click handlers */}
            <div className="gallery-grid">
                {React.Children.map(children, (child, childIndex) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            onClick: () => handleImageClick(childIndex),
                            style: { cursor: 'pointer' },
                        } as any);
                    }
                    return child;
                })}
            </div>

            {/* Custom Lightbox - Only render when open */}
            {open && (
                <div 
                    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
                    onClick={handleClose}
                >
                    <div className="relative max-w-7xl max-h-full p-4">
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation Buttons */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrev();
                                    }}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Image */}
                        <img
                            src={images[index].src}
                            alt={images[index].alt}
                            className="max-w-full max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Image Counter */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                                {index + 1} / {images.length}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
