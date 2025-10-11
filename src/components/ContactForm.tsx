'use client';

import { useState } from 'react';
import { CustomInput } from './CustomInput';
import { Button } from './Button';
import { getSessionBookingsApiUrl } from '@/lib/config';

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
  // Form state management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    country: countryValue || '',
    course: '',
    year: ''
  });

  // Form submission state
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApiSuccess = (response: unknown) => {
    console.log('Form submitted successfully:', response);
    setSubmitStatus('success');
    setErrorMessage('');
    
    // Reset form after successful submission
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      country: countryValue || '',
      course: '',
      year: ''
    });
  };

  const handleApiError = (error: unknown) => {
    console.error('Form submission failed:', error);
    setSubmitStatus('error');
    setErrorMessage('Failed to submit your request. Please try again.');
  };

  const getApiPayload = () => ({
    full_name: formData.fullName,
    email: formData.email,
    mobile_no: formData.mobile,
    country_name: formData.country,
    preferred_course: formData.course,
    year: formData.year
  });

  return (
    <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center ml-0 sm:ml-8 lg:ml-24">
      <div className="bg-my-white min-h-0 lg:min-h-0 lg:my-96 w-full rounded-2xl sm:rounded-3xl lg:rounded-[40px]" style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.10)" }}>
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

          <form className="space-y-3 sm:space-y-4">
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
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Course Dropdown */}
            <div>
              <select 
                value={formData.course}
                onChange={(e) => handleInputChange('course', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-gray-500 transition-colors appearance-none bg-white text-sm sm:text-base"
              >
                <option value="">Preferred course</option>
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
                <option value="medicine">Medicine</option>
                <option value="arts">Arts</option>
              </select>
            </div>

            {/* Year Dropdown */}
            <div>
              <select 
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-gray-500 transition-colors appearance-none bg-white text-sm sm:text-base"
              >
                <option value="">Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="secondary"
              size="md"
              className="w-full font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl"
              apiConfig={{
                url: getSessionBookingsApiUrl(),
                method: 'POST',
                body: getApiPayload()
              }}
              onApiSuccess={handleApiSuccess}
              onApiError={handleApiError}
              loadingText="Submitting..."
            >
              Book Now
            </Button>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg sm:rounded-xl text-sm sm:text-base">
                Thank you! Your consultation request has been submitted successfully. We&apos;ll contact you soon.
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg sm:rounded-xl text-sm sm:text-base">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
