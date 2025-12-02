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
  meta_title?: string;
  meta_description?: string;
  event_galleries?: string[]; // Array of gallery image URLs from the API
  
  hasGallery?: boolean;           
  galleryThumbnails?: string[];   
  galleryImageCount?: number;      
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

