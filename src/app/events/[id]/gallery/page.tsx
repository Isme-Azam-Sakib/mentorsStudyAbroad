"use client";

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getEventsApiUrl } from '@/lib/config';
import { ApiEvent, ApiResponse } from '@/lib/events-api-types';
import FullScreenGallery from '@/components/FullScreenGallery';
import LazySection from '@/components/LazySection';

// API Service
const fetchEvents = async (): Promise<ApiEvent[]> => {
  try {
    const response = await fetch(getEventsApiUrl());
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// Static gallery images for preview/fallback
const getStaticGalleryImages = (): string[] => {
  return [
    '/gallery/Gallery_1.jpg',
    '/gallery/Gallery_2.jpg',
    '/gallery/Gallery_3.jpg',
    '/gallery/Gallery_4.jpg',
    '/gallery/Gallery_5.jpg',
    '/gallery/Gallery_6.jpg',
    '/gallery/Gallery_7.jpg',
    '/gallery/Gallery_8.jpg',
    '/gallery/Gallery_9.jpg',
    '/gallery/Gallery_10.jpg',
    '/gallery/Gallery_11.jpg',
    '/gallery/Gallery_12.jpg',
    '/gallery/Gallery_13.jpg',
    '/gallery/Gallery_14.jpg',
    '/gallery/Gallery_15.jpg',
    '/gallery/Gallery_16.jpg',
    '/gallery/Gallery_17.jpg',
    '/gallery/Gallery_18.jpg',
    '/gallery/Gallery_19.jpg',
    '/gallery/Gallery_20.jpg',
    '/gallery/Gallery_21.jpg',
    '/gallery/Gallery_22.jpg',
    '/gallery/Gallery_23.jpg',
    '/gallery/Gallery_24.jpg',
    '/gallery/Gallery_25.jpg'
  ];
};

export default function EventGalleryPage() {
  const params = useParams();
  const eventId = params?.id ? parseInt(params.id as string, 10) : null;

  const [event, setEvent] = useState<ApiEvent | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!eventId || isNaN(eventId)) {
      setError('Invalid event ID');
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch events (which includes gallery data)
        const events = await fetchEvents();
        const foundEvent = events.find((e) => e.id === eventId);
        
        if (!foundEvent) {
          setError('Event not found');
          setLoading(false);
          return;
        }

        setEvent(foundEvent);
        
        // Use event_galleries from API, fallback to static images if empty
        const galleryImagesFromApi = foundEvent.event_galleries || [];
        if (galleryImagesFromApi.length > 0) {
          setGalleryImages(galleryImagesFromApi);
        } else {
          // Fallback to static images if no gallery images in API
          setGalleryImages(getStaticGalleryImages());
        }
      } catch (err) {
        console.error('Error loading gallery:', err);
        setError('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [eventId]);

  // Update page metadata dynamically
  useEffect(() => {
    if (event) {
      const metaTitle = event.meta_title || `${event.title} - Gallery`;
      const metaDescription = event.meta_description || `View photos from ${event.title}`;

      // Update document title
      document.title = metaTitle;

      // Update or create meta title tag
      let titleMeta = document.querySelector('meta[property="og:title"]') || document.querySelector('meta[name="title"]');
      if (!titleMeta) {
        titleMeta = document.createElement('meta');
        titleMeta.setAttribute('name', 'title');
        document.head.appendChild(titleMeta);
      }
      titleMeta.setAttribute('content', metaTitle);

      // Update or create Open Graph title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', metaTitle);

      // Update or create meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', metaDescription);

      // Update or create Open Graph description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', metaDescription);

      // Update or create Open Graph image
      if (event.image) {
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (!ogImage) {
          ogImage = document.createElement('meta');
          ogImage.setAttribute('property', 'og:image');
          document.head.appendChild(ogImage);
        }
        ogImage.setAttribute('content', event.image);
      }

      // Update or create Open Graph URL
      if (typeof window !== 'undefined') {
        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (!ogUrl) {
          ogUrl = document.createElement('meta');
          ogUrl.setAttribute('property', 'og:url');
          document.head.appendChild(ogUrl);
        }
        ogUrl.setAttribute('content', window.location.href);
      }
    }

    // Cleanup function to reset title on unmount
    return () => {
      document.title = 'Mentors Study Abroad';
    };
  }, [event]);

  // Transform gallery images to GalleryImage format
  const galleryImageObjects = galleryImages.map((src, index) => ({
    id: index + 1,
    src,
    alt: `${event?.title || 'Event'} - Image ${index + 1}`,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-my-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-my-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-my-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-my-black mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
          <Link
            href="/events"
            className="inline-block bg-my-accent text-white px-6 py-3 rounded-full hover:bg-my-black transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-my-white">
      {/* Header Section */}
      <LazySection delay={0.2}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pt-8 sm:pt-12 lg:pt-32">
          {/* Viewing Album Label */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <i className="fi fi-sr-eye text-gray-400 text-sm sm:text-base"></i>
            <span className="text-gray-400 text-sm sm:text-base font-medium">Viewing Album:</span>
          </div>

          {/* Album Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-my-black mb-8 sm:mb-10 lg:mb-12 leading-tight">
            {event.title}
          </h1>

          {/* All Albums Navigation */}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-my-black hover:text-my-accent transition-colors duration-300 mb-8 sm:mb-10"
          >
            <i className="fi fi-sr-arrow-left text-base sm:text-lg"></i>
            <span className="text-sm sm:text-base font-medium">All Albums</span>
          </Link>
        </div>
      </LazySection>

      {/* Gallery Section */}
      <LazySection delay={0.3}>
        <div className="pb-8 sm:pb-12 lg:pb-16">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            {galleryImages.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No gallery images available for this event.</p>
              </div>
            ) : (
              <>
                {/* 5-Column Masonry Grid with Minimal Gap */}
                <div className="columns-2 sm:columns-3 lg:columns-5 gap-1 sm:gap-2">
                  {galleryImages.map((src, index) => (
                    <div
                      key={index}
                      className="break-inside-avoid mb-1 sm:mb-2 group cursor-pointer"
                      onClick={() => {
                        setLightboxIndex(index);
                        setLightboxOpen(true);
                      }}
                    >
                      <div className="overflow-hidden rounded-lg sm:rounded-xl">
                        <img
                          src={src}
                          alt={`${event.title} - Image ${index + 1}`}
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Full Screen Gallery Overlay */}
                <FullScreenGallery
                  images={galleryImageObjects}
                  initialIndex={lightboxIndex}
                  isOpen={lightboxOpen}
                  onClose={() => setLightboxOpen(false)}
                />
              </>
            )}
          </div>
        </div>
      </LazySection>
    </div>
  );
}

