"use client";

import { useEffect } from 'react';

/**
 * Custom hook to handle browser extension attributes that cause hydration mismatches
 * This specifically targets the 'bis_skin_checked' attribute added by password managers
 * and other browser extensions that can cause hydration errors.
 */
export function useBrowserExtensionFix() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const removeExtensionAttributes = () => {
      // Remove common browser extension attributes
      const attributesToRemove = [
        'bis_skin_checked',
        'data-bis_skin_checked',
        'autofill',
        'data-autofill'
      ];

      attributesToRemove.forEach(attr => {
        const elements = document.querySelectorAll(`[${attr}]`);
        elements.forEach(el => {
          el.removeAttribute(attr);
        });
      });
    };

    // Run immediately
    removeExtensionAttributes();

    // Use MutationObserver to watch for new attributes added by extensions
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element;
          const attributeName = mutation.attributeName;
          
          // Remove problematic attributes as soon as they're added
          if (attributeName === 'bis_skin_checked' || 
              attributeName === 'data-bis_skin_checked' ||
              attributeName === 'autofill' ||
              attributeName === 'data-autofill') {
            target.removeAttribute(attributeName);
          }
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['bis_skin_checked', 'data-bis_skin_checked', 'autofill', 'data-autofill'],
      subtree: true
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);
}
