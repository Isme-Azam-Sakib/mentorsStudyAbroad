// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://cms.mentors.com.bd/api/v1/',
  
  // Events API endpoints
  EVENTS: {
    GET_ACTIVE: process.env.NEXT_PUBLIC_EVENTS_ACTIVE_ENDPOINT || 'get-active-events',
    GET_BY_ID: process.env.NEXT_PUBLIC_EVENTS_BY_ID_ENDPOINT || 'get-event',
  },
  
  // Session Bookings API endpoints
  SESSION_BOOKINGS: { SUBMIT: process.env.NEXT_PUBLIC_SESSION_BOOKINGS_SUBMIT_ENDPOINT || 'session-bookings'},
  INQUIRY_MESSAGE: { SUBMIT: process.env.NEXT_PUBLIC_INQUIRY_MESSAGE_SUBMIT_ENDPOINT || 'inquiry-message'},
  CONSULTATION_REQUEST: { SUBMIT: process.env.NEXT_PUBLIC_CONSULTATION_REQUEST_SUBMIT_ENDPOINT || 'consultation-request'},
} as const;

// Helper functions to get full API URLs
export const getEventsApiUrl = (endpoint: keyof typeof API_CONFIG.EVENTS = 'GET_ACTIVE') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.EVENTS[endpoint]}`;
};

export const getSessionBookingsApiUrl = (endpoint: keyof typeof API_CONFIG.SESSION_BOOKINGS = 'SUBMIT') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.SESSION_BOOKINGS[endpoint]}`;
};

export const getInquiryMessageApiUrl = (endpoint: keyof typeof API_CONFIG.INQUIRY_MESSAGE = 'SUBMIT') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.INQUIRY_MESSAGE[endpoint]}`;
};

export const getConsultationRequestApiUrl = (endpoint: keyof typeof API_CONFIG.CONSULTATION_REQUEST = 'SUBMIT') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.CONSULTATION_REQUEST[endpoint]}`;
};
