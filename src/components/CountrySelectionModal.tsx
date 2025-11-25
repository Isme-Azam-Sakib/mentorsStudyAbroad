"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { countriesData } from '@/lib/countries-data';
import { useBrowserExtensionFix } from '@/hooks/useBrowserExtensionFix';

interface CountrySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  hashTarget?: string; // Optional hash target for scrolling (e.g., "admission-process", "partner-universities")
}

export const CountrySelectionModal: React.FC<CountrySelectionModalProps> = ({ isOpen, onClose, hashTarget = "admission-process" }) => {
  const router = useRouter();
  useBrowserExtensionFix();

  // Get all countries from countriesData
  const countries = Object.entries(countriesData).map(([key, country]) => ({
    key,
    name: country.name,
  }));

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCountryClick = (countryKey: string) => {
    onClose();
    // Navigate to country page with hash target
    router.push(`/countries/${countryKey}#${hashTarget}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-my-black">
            Select a <span className="text-my-accent">Country</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <i className="fi fi-sr-cross text-2xl text-gray-600"></i>
          </button>
        </div>

        {/* Countries Grid */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map((country) => (
              <button
                key={country.key}
                onClick={() => handleCountryClick(country.key)}
                className="p-4 rounded-2xl border-2 border-gray-200 hover:border-my-accent hover:bg-my-accent/5 transition-all duration-300 text-center group"
              >
                <span className="text-base sm:text-lg font-semibold text-my-black group-hover:text-my-accent transition-colors">
                  {country.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

