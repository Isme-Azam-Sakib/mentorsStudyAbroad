"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getEventsApiUrl, getEventGalleryApiUrl } from '@/lib/config';
import { ApiEvent, ApiResponse, GalleryApiResponse } from '@/lib/events-api-types';
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

const fetchEventGallery = async (eventId: number): Promise<string[]> => {
  try {
    const response = await fetch(getEventGalleryApiUrl(eventId));
    if (!response.ok) {
      throw new Error('Failed to fetch gallery');
    }
    const data: GalleryApiResponse = await response.json();
    return data.data?.images || [];
  } catch (error) {
    console.error('Error fetching gallery:', error);
    // Fallback to static images for now
    return getStaticGalleryImages();
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
  const router = useRouter();
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

        // Fetch event details
        const events = await fetchEvents();
        
        // For now, use static gallery images (will be replaced with API call later)
        const images = getStaticGalleryImages();

        const foundEvent = events.find((e) => e.id === eventId);
        
        // For preview: use a default event if not found, so we can see the gallery
        if (!foundEvent) {
          setEvent({
            id: eventId,
            title: 'Event Gallery',
            description: '',
            image: '',
            location: '',
            date: new Date().toISOString(),
            time: '',
          });
        } else {
          setEvent(foundEvent);
        }
        
        setGalleryImages(images);
      } catch (err) {
        console.error('Error loading gallery:', err);
        setError('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [eventId]);

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

