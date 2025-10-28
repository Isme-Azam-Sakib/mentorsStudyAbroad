'use client';

import { useState } from 'react';
import { CustomInput } from './CustomInput';
import { Button } from './Button';
import { getSessionBookingsApiUrl } from '@/lib/config';
import { validateFormData, sanitizeInput, secureLog } from '@/lib/security';
import { useBrowserExtensionFix } from '@/hooks/useBrowserExtensionFix';

interface ContactFormProps {
  countryName?: string;
  countryValue?: string;
}

// Countries data matching the navbar
const countries = [
  { value: 'usa', name: 'USA' },
  { value: 'uk', name: 'UK' },
  { value: 'uae', name: 'UAE' },
  { value: 'australia', name: 'Australia' },
  { value: 'canada', name: 'Canada' },
  { value: 'malaysia', name: 'Malaysia' },
  { value: 'finland', name: 'Finland' }
];

export function ContactForm({ countryName, countryValue }: ContactFormProps) {
  // Use the custom hook to handle browser extension attributes
  useBrowserExtensionFix();

  // Form state management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    country: countryValue || '',
    course: '',
    consultationMode: ''
  });

  // Form submission state
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApiSuccess = (response: unknown) => {
    secureLog('Form submitted successfully', { success: true });
    setSubmitStatus('success');
    setErrorMessage('');
    
    // Show success toast
    setToastMessage('Thank you! Your consultation request has been submitted successfully. We\'ll contact you soon.');
    setToastType('success');
    setShowToast(true);
    
    
    // Reset form after successful submission
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      country: countryValue || '',
      course: '',
      consultationMode: ''
    });
  };

  const handleApiError = (error: unknown) => {
    secureLog('Form submission failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'error');
    setSubmitStatus('error');
    setErrorMessage('Failed to submit your request. Please try again.');
    
    // Show error toast
    setToastMessage('Failed to submit your request. Please try again.');
    setToastType('error');
    setShowToast(true);
    
  };

  const getApiPayload = () => {
    // Only validate if we have actual form data and are on client side
    if (typeof window !== 'undefined' && formData.fullName && formData.email && formData.mobile) {
      const validation = validateFormData(formData as unknown as { [key: string]: unknown });
      if (!validation.isValid) {
        console.error('Form validation errors:', validation.errors);
        throw new Error(`Form validation failed: ${Object.values(validation.errors).join(', ')}`);
      }
    }

    return {
      full_name: sanitizeInput(formData.fullName),
      email: sanitizeInput(formData.email),
      mobile_no: sanitizeInput(formData.mobile),
      country_name: sanitizeInput(formData.country),
      preferred_course: sanitizeInput(formData.course),
      consultation_mode: sanitizeInput(formData.consultationMode)
    };
  };

  // Create a function that returns the API config only when needed
  const getApiConfig = () => {
    // Only validate and get payload when actually submitting
    if (typeof window !== 'undefined' && formData.fullName && formData.email && formData.mobile) {
      const validation = validateFormData(formData as unknown as { [key: string]: unknown });
      if (!validation.isValid) {
        console.error('Form validation errors:', validation.errors);
        throw new Error(`Form validation failed: ${Object.values(validation.errors).join(', ')}`);
      }
    }

    const payload = {
      full_name: sanitizeInput(formData.fullName),
      email: sanitizeInput(formData.email),
      mobile_no: sanitizeInput(formData.mobile),
      country_name: sanitizeInput(formData.country),
      preferred_course: sanitizeInput(formData.course),
      consultation_mode: sanitizeInput(formData.consultationMode)
    };

    return {
      url: getSessionBookingsApiUrl(),
      method: 'POST' as const,
      body: payload
    };
  };

  return (
    <div className="lg:sticky lg:top-0 lg:flex lg:items-center ml-0 sm:ml-8 lg:ml-24 flex justify-center lg:justify-start">
      <div className="bg-my-white min-h-0 lg:min-h-0 lg:my-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-full rounded-2xl sm:rounded-3xl lg:rounded-[40px]" style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.10)" }}>
        <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
          <div className="flex items-start gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6">
            <i className="fi fi-sr-messages-question text-gray-400 text-xl sm:text-2xl mt-0.5 sm:mt-1 flex-shrink-0"></i>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-my-black mb-1 sm:mb-2 leading-tight">Have more questions?</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-7 lg:mb-8">
                Book a free session with our expert counsellors and secure your dream to study abroad.
              </p>
            </div>
          </div>

          <form className="space-y-3 sm:space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <CustomInput
              type="text"
              placeholder="Full name"
              value={formData.fullName}
              onChange={(value) => handleInputChange('fullName', value)}
              required
            />

            {/* Email */}
            <CustomInput
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              required
            />

            {/* Mobile No. */}
            <CustomInput
              type="tel"
              placeholder="Mobile No."
              value={formData.mobile}
              onChange={(value) => handleInputChange('mobile', value)}
              required
            />

            {/* Country Dropdown */}
            <div>
              <select 
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-gray-500 transition-colors appearance-none bg-white text-sm sm:text-base"
                required
              >
                <option value="">Preferred Country</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Course Input */}
            <CustomInput
              type="text"
              value={formData.course}
              onChange={(value) => handleInputChange('course', value)}
              placeholder="Preferred course"
            />

            {/* Preferred Mode of Consultation Dropdown */}
            <div>
              <select 
                value={formData.consultationMode}
                onChange={(e) => handleInputChange('consultationMode', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-gray-500 transition-colors appearance-none bg-white text-sm sm:text-base"
              >
                <option value="">Preferred mode of consultation</option>
                <option value="online">Online</option>
                <option value="branch">Branch Visit</option>
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl"
              apiConfig={getApiConfig}
              onApiSuccess={handleApiSuccess}
              onApiError={handleApiError}
              loadingText="Submitting..."
            >
              Book Free Consultation Now
            </Button>

          </form>
        </div>
      </div>
      
      {/* Modern Toast Notification */}
      {showToast && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full mx-4 animate-in fade-in duration-300">
            <div className="text-center py-8 px-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                toastType === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <i className={`fi ${toastType === 'success' ? 'fi-rr-check' : 'fi-rr-cross'} text-2xl ${
                  toastType === 'success' ? 'text-green-600' : 'text-red-600'
                }`}></i>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${
                toastType === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {toastType === 'success' ? 'Success!' : 'Submission Failed'}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{toastMessage}</p>
              <button
                onClick={() => setShowToast(false)}
                className={`font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 px-6 py-3 text-base ${
                  toastType === 'success' 
                    ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600' 
                    : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600'
                }`}
              >
                {toastType === 'success' ? 'Got it!' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
