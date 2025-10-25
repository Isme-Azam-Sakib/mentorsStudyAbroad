"use client";

import VisaSuccessStories from './VisaSuccessStories';

interface AustraliaVisaSuccessProps {
  className?: string;
}

export default function AustraliaVisaSuccess({ className = "" }: AustraliaVisaSuccessProps) {
  return (
    <VisaSuccessStories 
      country="australia" 
      className={className}
    />
  );
}
