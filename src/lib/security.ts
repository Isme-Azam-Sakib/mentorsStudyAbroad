/**
 * Security utilities for input validation and sanitization
 */

// Input validation rules
export const VALIDATION_RULES = {
  NAME: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s\u00C0-\u017F]+$/, // Letters, spaces, and accented characters
    message: 'Name must be 2-50 characters, letters and spaces only'
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 100,
    message: 'Please enter a valid email address'
  },
  PHONE: {
    pattern: /^[\+]?[0-9\s\-\(\)]{10,15}$/,
    message: 'Please enter a valid phone number'
  },
  SUBJECT: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\u00C0-\u017F\-\.]+$/,
    message: 'Subject must be 2-100 characters, alphanumeric and common punctuation only'
  },
  MESSAGE: {
    minLength: 10,
    maxLength: 1000,
    message: 'Message must be 10-1000 characters'
  },
  COUNTRY: {
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Country must contain only letters and spaces'
  }
} as const;

// Sanitize input to prevent XSS
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 1000); // Limit length
}

// Validate name input
export function validateName(name: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(name);
  
  if (!sanitized) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (sanitized.length < VALIDATION_RULES.NAME.minLength || sanitized.length > VALIDATION_RULES.NAME.maxLength) {
    return { isValid: false, error: `Name must be ${VALIDATION_RULES.NAME.minLength}-${VALIDATION_RULES.NAME.maxLength} characters` };
  }
  
  if (!VALIDATION_RULES.NAME.pattern.test(sanitized)) {
    return { isValid: false, error: VALIDATION_RULES.NAME.message };
  }
  
  return { isValid: true };
}

// Validate email input
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(email);
  
  if (!sanitized) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (sanitized.length > VALIDATION_RULES.EMAIL.maxLength) {
    return { isValid: false, error: 'Email is too long' };
  }
  
  if (!VALIDATION_RULES.EMAIL.pattern.test(sanitized)) {
    return { isValid: false, error: VALIDATION_RULES.EMAIL.message };
  }
  
  return { isValid: true };
}

// Validate phone input
export function validatePhone(phone: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(phone);
  
  if (!sanitized) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  if (!VALIDATION_RULES.PHONE.pattern.test(sanitized)) {
    return { isValid: false, error: VALIDATION_RULES.PHONE.message };
  }
  
  return { isValid: true };
}

// Validate subject input
export function validateSubject(subject: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(subject);
  
  if (!sanitized) {
    return { isValid: false, error: 'Subject is required' };
  }
  
  if (sanitized.length < VALIDATION_RULES.SUBJECT.minLength || sanitized.length > VALIDATION_RULES.SUBJECT.maxLength) {
    return { isValid: false, error: `Subject must be ${VALIDATION_RULES.SUBJECT.minLength}-${VALIDATION_RULES.SUBJECT.maxLength} characters` };
  }
  
  if (!VALIDATION_RULES.SUBJECT.pattern.test(sanitized)) {
    return { isValid: false, error: VALIDATION_RULES.SUBJECT.message };
  }
  
  return { isValid: true };
}

// Validate message input
export function validateMessage(message: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(message);
  
  if (!sanitized) {
    return { isValid: false, error: 'Message is required' };
  }
  
  if (sanitized.length < VALIDATION_RULES.MESSAGE.minLength || sanitized.length > VALIDATION_RULES.MESSAGE.maxLength) {
    return { isValid: false, error: `Message must be ${VALIDATION_RULES.MESSAGE.minLength}-${VALIDATION_RULES.MESSAGE.maxLength} characters` };
  }
  
  return { isValid: true };
}

// Validate country input
export function validateCountry(country: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(country);
  
  if (!sanitized) {
    return { isValid: false, error: 'Country is required' };
  }
  
  if (!VALIDATION_RULES.COUNTRY.pattern.test(sanitized)) {
    return { isValid: false, error: VALIDATION_RULES.COUNTRY.message };
  }
  
  return { isValid: true };
}

// Secure logging - replaces console.log for sensitive data
export function secureLog(message: string, data?: Record<string, unknown>, level: 'info' | 'error' | 'warn' = 'info'): void {
  if (process.env.NODE_ENV === 'development') {
    // Only log in development, and sanitize sensitive data
    const sanitizedData = data ? sanitizeInput(JSON.stringify(data)) : undefined;
    console[level](message, sanitizedData);
  }
  // In production, you would send to a proper logging service
  // Example: sendToLoggingService(message, sanitizedData, level);
}

// Validate form data object
export function validateFormData(data: Record<string, unknown> | { [key: string]: unknown }): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  // Validate each field based on its name
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string') {
      let validation;
      
      switch (key.toLowerCase()) {
        case 'fullname':
        case 'full_name':
        case 'name':
          validation = validateName(value);
          break;
        case 'email':
          validation = validateEmail(value);
          break;
        case 'phone':
        case 'mobile':
        case 'mobile_no':
          validation = validatePhone(value);
          break;
        case 'subject':
          validation = validateSubject(value);
          break;
        case 'message':
          validation = validateMessage(value);
          break;
        case 'country':
        case 'country_name':
          validation = validateCountry(value);
          break;
        default:
          // For unknown fields, just sanitize
          const sanitized = sanitizeInput(value);
          if (sanitized !== value) {
            errors[key] = 'Invalid characters detected';
          }
      }
      
      if (validation && !validation.isValid) {
        errors[key] = validation.error || 'Invalid input';
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
