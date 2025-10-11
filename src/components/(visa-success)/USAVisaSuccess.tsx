"use client";

import VisaSuccessStories from './VisaSuccessStories';

interface USAVisaSuccessProps {
  className?: string;
}

export default function USAVisaSuccess({ className = "" }: USAVisaSuccessProps) {
  return (
    <VisaSuccessStories 
      country="usa" 
      className={className}
    />
  );
}
