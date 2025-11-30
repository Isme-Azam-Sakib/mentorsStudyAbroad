// Shared API Types for Events
// These types are used across multiple components to ensure consistency

export type ApiEvent = {
  id: number;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  time: string;
  // Optional gallery fields (for hybrid approach)
  hasGallery?: boolean;           // Quick check if gallery exists
  galleryThumbnails?: string[];     // Exactly 3 images for album card
  galleryImageCount?: number;       // Total count for display
};

export type ApiResponse = {
  success: boolean;
  message: string;
  data: ApiEvent[];
};

// Gallery API Types
export type GalleryApiResponse = {
  success: boolean;
  message: string;
  data: {
    eventId: number;
    eventTitle: string;
    images: string[];
    totalCount: number;
  };
};

