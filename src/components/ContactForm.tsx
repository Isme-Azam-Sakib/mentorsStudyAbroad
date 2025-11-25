'use client';

import { useState } from 'react';
import { CustomInput } from './CustomInput';
import { validateFormData, sanitizeInput, secureLog } from '@/lib/security';
import { useBrowserExtensionFix } from '@/hooks/useBrowserExtensionFix';
import { getDhakaBranches } from '@/lib/branches-data';

interface ContactFormProps {
  countryName?: string;
  countryValue?: string;
  showIntro?: boolean;
  showIntroDescription?: boolean;
}

// Countries data matching the navbar
const countries = [
  { value: 'australia', name: 'Australia' },
  { value: 'usa', name: 'USA' },
  { value: 'uk', name: 'UK' },
  { value: 'canada', name: 'Canada' },
  { value: 'ireland', name: 'Ireland' },
  { value: 'malaysia', name: 'Malaysia' },
  { value: 'newzealand', name: 'New Zealand' },
  { value: 'japan', name: 'Japan' },
];

export function ContactForm({
  countryName,
  countryValue,
  showIntro = true,
  showIntroDescription = true,
}: ContactFormProps) {
  // Use the custom hook to handle browser extension attributes
  useBrowserExtensionFix();

  // Form state management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    country: countryValue || '',
    country2: '',
    studyLevel: '',
    consultationMode: '',
    nearestOffice: ''
  });

  const dhakaBranches = getDhakaBranches();

  // Form submission state
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        [field]: value
      };

      if (field === 'country' && value === prev.country2) {
        updated.country2 = '';
      }

      return updated;
    });
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
      country2: '',
      studyLevel: '',
      consultationMode: '',
      nearestOffice: ''
    });
  };

  const handleApiError = (error: unknown) => {
    let errorMessage = 'Failed to submit your request. Please try again.';
    
    if (error instanceof Error) {
      // Extract the actual error message
      const errorMsg = error.message;
      
      // Check if it's a validation error (contains specific field errors)
      if (errorMsg.includes('Form validation failed:') || errorMsg.includes('Please') || errorMsg.match(/^\d+\./)) {
        // Use the actual validation error message
        // Remove "Form validation failed: " prefix if present for cleaner display
        errorMessage = errorMsg.replace(/^Form validation failed:\s*/i, '');
      } else {
        // For other errors, show a more helpful message
        errorMessage = errorMsg || 'Submission failed. Please check your inputs and try again.';
      }
    }

    secureLog('Form submission failed', {
      error: error instanceof Error ? error.message : error,
    }, 'error');
    setSubmitStatus('error');
    setErrorMessage(errorMessage);
    
    // Show error toast with the specific error message
    setToastMessage(errorMessage);
    setToastType('error');
    setShowToast(true);
  };

  const runCustomValidations = () => {
    const validationErrors: string[] = [];

    if (!/^01\d{9}$/.test(formData.mobile)) {
      validationErrors.push('Mobile number must start with 01 and be exactly 11 digits.');
    }

    if (!formData.country) {
      validationErrors.push('Please select a preferred country.');
    }

    if (formData.country && formData.country2 && formData.country === formData.country2) {
      validationErrors.push('Please select two different countries.');
    }

    if (!formData.studyLevel) {
      validationErrors.push('Please select a preferred study level.');
    }

    if (formData.consultationMode === 'branch' && !formData.nearestOffice) {
      validationErrors.push('Please select the nearest Mentors\' office.');
    }

    if (validationErrors.length > 0) {
      // Format errors nicely - use line breaks for multiple errors
      const formattedErrors = validationErrors.length > 1 
        ? validationErrors.map((err, idx) => `${idx + 1}. ${err}`).join('\n')
        : validationErrors[0];
      throw new Error(formattedErrors);
    }
  };

  const getFormPayload = () => {
    // Only validate if we have actual form data and are on client side
    if (typeof window !== 'undefined' && formData.fullName && formData.email && formData.mobile) {
      const validation = validateFormData(formData as unknown as { [key: string]: unknown });
      if (!validation.isValid) {
        console.error('Form validation errors:', validation.errors);
        const errorMessages = Object.values(validation.errors).filter(msg => msg) as string[];
        const formattedErrors = errorMessages.length > 1
          ? errorMessages.map((err, idx) => `${idx + 1}. ${err}`).join('\n')
          : errorMessages[0] || 'Please check your form inputs.';
        throw new Error(formattedErrors);
      }
    }

    runCustomValidations();

    return {
      full_name: sanitizeInput(formData.fullName),
      email: sanitizeInput(formData.email),
      mobile_no: sanitizeInput(formData.mobile),
      country_name: sanitizeInput(formData.country),
      country_name2: sanitizeInput(formData.country2),
      study_level: sanitizeInput(formData.studyLevel),
      consultation_mode: sanitizeInput(formData.consultationMode),
      nearest_office: sanitizeInput(formData.nearestOffice)
    };
  };

  const handleSubmit = () => {
    try {
      const payload = getFormPayload();
      console.log('Form Submission Payload:', JSON.stringify(payload, null, 2));
      
      handleApiSuccess(payload);
    } catch (error) {
      handleApiError(error);
    }
  };

  const secondaryCountryOptions = countries.filter((country) => country.value !== formData.country);

  return (
    <div className="lg:sticky lg:top-0 lg:flex lg:items-center ml-0 sm:ml-8 lg:ml-24 flex justify-center lg:justify-start">
      <div className="bg-my-white min-h-0 lg:min-h-0 lg:my-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-full rounded-2xl sm:rounded-3xl lg:rounded-[40px]" style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.10)" }}>
        <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
          {(showIntro || showIntroDescription) && (
            <div className="mb-4 sm:mb-5 lg:mb-6">
              {showIntro ? (
                <div className="flex items-start gap-2 sm:gap-3">
                  <i className="fi fi-sr-messages-question text-gray-400 text-xl sm:text-2xl mt-0.5 sm:mt-1 flex-shrink-0"></i>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-my-black mb-1 sm:mb-2 leading-tight">
                      Have more questions?
                    </h3>
                    {showIntroDescription && (
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-7 lg:mb-8">
                        Book a free session with our expert counsellors and secure your dream to study abroad.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                showIntroDescription && (
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-7 lg:mb-8">
                    Book a free session with our expert counsellors and secure your dream to study abroad.
                  </p>
                )
              )}
            </div>
          )}

          <form className="space-y-3 sm:space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <CustomInput
              type="text"
              placeholder="Full name"
              label="Full name"
              value={formData.fullName}
              onChange={(value) => handleInputChange('fullName', value)}
              required
            />

            {/* Email */}
            <CustomInput
              type="email"
              placeholder="Email"
              label="Email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              required
            />

            {/* Mobile No. */}
            <CustomInput
              type="tel"
              placeholder="Mobile No."
              label="Mobile No."
              value={formData.mobile}
              onChange={(value) => handleInputChange('mobile', value)}
              required
            />

            {/* Country Dropdown */}
            <div>
              {/* <label className="block text-sm sm:text-base text-gray-700 mb-2">
                Preferred Country <span className="text-my-accent">*</span>
              </label> */}
              <select 
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-gray-500 transition-colors appearance-none bg-white text-sm sm:text-base"
                required
              >
                <option value="">Select a country (required)</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Second Country Dropdown */}
            <div>
              {/* <label className="block text-sm sm:text-base text-gray-700 mb-2">
                Second Preferred Country
              </label> */}
              <select 
                value={formData.country2}
                onChange={(e) => handleInputChange('country2', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-gray-500 transition-colors appearance-none bg-white text-sm sm:text-base"
              >
                <option value="">Select a second country (optional)</option>
                {secondaryCountryOptions.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Study Level Dropdown */}
            <div>
              <select 
                value={formData.studyLevel}
                onChange={(e) => handleInputChange('studyLevel', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-gray-500 transition-colors appearance-none bg-white text-sm sm:text-base"
                required
              >
                <option value="">Select desired study level (required)</option>
                <option value="foundation">Foundation</option>
                <option value="diploma">Diploma</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PhD</option>
                <option value="certificate">Certificate</option>
              </select>
            </div>

            {/* Preferred Mode of Consultation Dropdown */}
            <div>
              {/* <label className="block text-sm sm:text-base text-gray-700 mb-2">
                Preferred mode of consultation <span className="text-my-accent">*</span>
              </label> */}
              <select 
                value={formData.consultationMode}
                onChange={(e) => {
                  handleInputChange('consultationMode', e.target.value);
                  // Clear nearest office when consultation mode changes
                  if (e.target.value !== 'branch') {
                    handleInputChange('nearestOffice', '');
                  }
                }}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-gray-500 transition-colors appearance-none bg-white text-sm sm:text-base"
                required
              >
                <option value="">Select a consultation mode</option>
                <option value="online">Online</option>
                <option value="branch">Office Visit</option>
              </select>
            </div>

            {/* Nearest Mentors' Office Dropdown - Only show when Office Visit is selected */}
            {formData.consultationMode === 'branch' && (
              <div>
                <select 
                  value={formData.nearestOffice}
                  onChange={(e) => handleInputChange('nearestOffice', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-gray-500 transition-colors appearance-none bg-white text-sm sm:text-base"
                  required
                >
                  <option value="">Select nearest Mentors&apos; office (required)</option>
                  {dhakaBranches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl bg-my-black text-white hover:bg-my-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-my-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Free Consultation Now
            </button>

          </form>
        </div>
      </div>
      
      {/* Modern Toast Notification */}
      {showToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className={`rounded-2xl shadow-xl border px-5 py-6 max-w-xl w-full bg-white flex flex-col items-center animate-in fade-in duration-300 ${
            toastType === 'success' ? 'border-green-200' : 'border-red-200'
          }`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
              toastType === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <i className={`fi ${toastType === 'success' ? 'fi-rr-check' : 'fi-rr-cross'} text-xl ${
                toastType === 'success' ? 'text-green-600' : 'text-red-600'
              }`}></i>
            </div>
            <h3 className={`text-lg font-bold mb-2 text-center ${
              toastType === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              {toastType === 'success' ? 'Success!' : 'Submission Failed'}
            </h3>
            <div className="w-full mb-4">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-left text-sm sm:text-base">{toastMessage}</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className={`font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 px-6 py-2.5 text-sm ${
                toastType === 'success' 
                  ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600' 
                  : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600'
              }`}
            >
              {toastType === 'success' ? 'Got it!' : 'Try Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
