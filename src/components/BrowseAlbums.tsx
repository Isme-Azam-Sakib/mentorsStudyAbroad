"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getEventsApiUrl } from '@/lib/config';
import { ApiEvent, ApiResponse } from '@/lib/events-api-types';

interface Album {
  id: number;
  title: string;
  images: string[]; // Array of at least 3 images for the thumbnail grid
  imageCount?: number;
  date?: string;
  subtitle?: string;
  eventId: number; // For navigation to event gallery
}

interface BrowseAlbumsProps {
  albums?: Album[];
  maxAlbums?: number;
}

const defaultAlbums: Album[] = [
  {
    id: 1,
    title: "Seminar & Spot Assessment: University of Guelph",
    images: ["/gallery/Gallery_1.jpg", "/gallery/Gallery_2.jpg", "/gallery/Gallery_3.jpg"],
    imageCount: 24,
    date: "17th Nov, 2025",
    eventId: 1
  },
  {
    id: 2,
    title: "IELTS Celebration Night",
    images: ["/gallery/Gallery_4.jpg", "/gallery/Gallery_5.jpg", "/gallery/Gallery_6.jpg"],
    imageCount: 18,
    date: "15th Nov, 2025",
    eventId: 2
  },
  {
    id: 3,
    title: "University Fair Event",
    images: ["/gallery/Gallery_7.jpg", "/gallery/Gallery_8.jpg", "/gallery/Gallery_9.jpg"],
    imageCount: 32,
    date: "10th Nov, 2025",
    eventId: 3
  },
  {
    id: 4,
    title: "IELTS Celebration Night",
    images: ["/gallery/Gallery_4.jpg", "/gallery/Gallery_5.jpg", "/gallery/Gallery_6.jpg"],
    imageCount: 18,
    date: "15th Nov, 2025",
    eventId: 4
  },
  {
    id: 5,
    title: "University Fair Event",
    images: ["/gallery/Gallery_7.jpg", "/gallery/Gallery_8.jpg", "/gallery/Gallery_9.jpg"],
    imageCount: 32,
    date: "10th Nov, 2025",
    eventId: 5
  }
];

// Internal Album Card Component
function AlbumCard({ album }: { album: Album }) {
  const [image1, image2, image3] = album.images;

  return (
    <Link href={`/events/${album.eventId}/gallery`} className="group cursor-pointer block w-full max-w-sm mx-auto sm:mb-4 sm:max-w-none sm:mx-0">
      {/* Album Thumbnail Grid */}
      <div className="relative mb-3 sm:mb-4">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {/* Left Column - Two stacked small images */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <div className="relative aspect-square rounded-xl sm:rounded-2xl md:rounded-[30px] overflow-hidden">
              <Image
                src={image1 || "/gallery/Gallery_1.jpg"}
                alt={album.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl sm:rounded-2xl md:rounded-[30px] overflow-hidden">
              <Image
                src={image2 || "/gallery/Gallery_2.jpg"}
                alt={album.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column - Large image with SVG clip */}
          <div className="col-span-2 relative">
            <div
              className="relative w-full"
              style={{
                aspectRatio: '277/277',
                clipPath: `url(#album-clip-${album.id})`
              }}
            >
              <Image
                src={image3 || "/gallery/Gallery_3.jpg"}
                alt={album.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Corner Arrow Icon - Outside clipped container */}
            <div className="absolute top-0 right-0 z-20">
              <div className="flex items-center justify-center">
                <svg
                  viewBox="0 0 63 63"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-my-black group-hover:text-my-accent transition-all duration-300 group-hover:scale-90"
                >
                  <path
                    d="M59.1603 0H2.50114V7.06854H50.632L0 57.6959L4.99635 62.6936L55.6257 12.0728V60.1925H62.6936V3.53328C62.6931 2.59636 62.3206 1.69796 61.6581 1.03545C60.9956 0.372948 60.0972 0.000524544 59.1603 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-1.5 sm:space-y-2">
        <h3 className="text-my-black font-bold text-sm sm:text-base md:text-lg leading-tight">
          {album.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base text-gray-600">
          {album.imageCount && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <i className="fi fi-sr-picture text-my-accent text-xs sm:text-sm"></i>
              <span>{album.imageCount} Photos</span>
            </div>
          )}
          {album.date && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <i className="fi fi-sr-calendar text-my-accent text-xs sm:text-sm"></i>
              <span>{album.date}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

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

// Helper function to format date for album display
const formatAlbumDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNum = date.getDate();
    const day = String(dayNum);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    // Add ordinal suffix
    let suffix = 'th';
    if (dayNum % 10 === 1 && dayNum % 100 !== 11) suffix = 'st';
    else if (dayNum % 10 === 2 && dayNum % 100 !== 12) suffix = 'nd';
    else if (dayNum % 10 === 3 && dayNum % 100 !== 13) suffix = 'rd';
    
    return `${day}${suffix} ${month}, ${year}`;
  } catch {
    return dateString;
  }
};

// Transform API events to albums
const transformEventsToAlbums = (events: ApiEvent[]): Album[] => {
  const currentTime = Date.now();
  
  return events
    .filter(event => {
      // Only past events with galleries
      const eventDate = new Date(event.date);
      const isPast = eventDate.getTime() < currentTime;
      return isPast && event.hasGallery && event.galleryThumbnails && event.galleryThumbnails.length >= 3;
    })
    .map(event => ({
      id: event.id,
      title: event.title,
      images: event.galleryThumbnails!.slice(0, 3), // Use first 3 thumbnails
      imageCount: event.galleryImageCount,
      date: formatAlbumDate(event.date),
      eventId: event.id,
    }))
    .sort((a, b) => {
      // Sort by date (most recent first)
      const dateA = new Date(events.find(e => e.id === a.eventId)?.date || '');
      const dateB = new Date(events.find(e => e.id === b.eventId)?.date || '');
      return dateB.getTime() - dateA.getTime();
    });
};

export default function BrowseAlbums({ albums, maxAlbums = 3 }: BrowseAlbumsProps) {
  const [displayCount, setDisplayCount] = useState(maxAlbums);
  const [apiAlbums, setApiAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events and transform to albums
  useEffect(() => {
    const loadAlbums = async () => {
      try {
        setLoading(true);
        setError(null);
        const events = await fetchEvents();
        const transformedAlbums = transformEventsToAlbums(events);
        setApiAlbums(transformedAlbums);
      } catch (err) {
        console.error('Error loading albums:', err);
        setError('Failed to load albums');
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  // Use provided albums or API albums, fallback to default if both fail
  const allAlbums: Album[] = albums || (apiAlbums.length > 0 ? apiAlbums : defaultAlbums);
  const displayAlbums = allAlbums.slice(0, displayCount);
  const hasMore = displayCount < allAlbums.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + maxAlbums, allAlbums.length));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-my-white">
      {/* SVG Definitions for Clip Paths */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {allAlbums.map((album) => (
            <clipPath key={album.id} id={`album-clip-${album.id}`} clipPathUnits="objectBoundingBox">
              <path d="M0.706 0.183 C0.706 0.243 0.755 0.291 0.815 0.291 L0.890 0.291 C0.950 0.291 0.998 0.340 0.998 0.400 L0.998 0.890 C0.998 0.950 0.950 0.998 0.890 0.998 L0.108 0.998 C0.049 0.998 0.000 0.950 0.000 0.890 L0.000 0.108 C0.000 0.049 0.049 0.000 0.108 0.000 L0.598 0.000 C0.658 0.000 0.706 0.049 0.706 0.108 Z" />
            </clipPath>
          ))}
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header with Title and View All Link */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Browse <span className="text-my-accent">Albums</span>
          </h2>
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-my-black hover:text-my-accent transition-colors duration-300 font-medium text-sm sm:text-base"
          >
            <span>View All</span>
            <i className="fi fi-sr-arrow-right text-xs sm:text-sm"></i>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-my-accent mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Loading albums...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && apiAlbums.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        )}

        {/* Album Cards Grid */}
        {(!loading || displayAlbums.length > 0) && (
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-10 items-center sm:items-stretch">
            {displayAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && displayAlbums.length === 0 && apiAlbums.length === 0 && albums === undefined && (
          <div className="flex justify-center items-center py-12">
            <p className="text-sm text-gray-600">No albums available at the moment.</p>
          </div>
        )}

        {/* Load More Albums Button */}
        {hasMore && (
          <div className="flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="border border-my-black text-my-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-my-black hover:text-my-white transition-all duration-300 text-sm sm:text-base font-medium"
            >
              Load More Albums
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

