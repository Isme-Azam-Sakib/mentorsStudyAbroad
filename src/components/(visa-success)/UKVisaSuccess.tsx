"use client";

import VisaSuccessStories from './VisaSuccessStories';

interface UKVisaSuccessProps {
  className?: string;
}

export default function UKVisaSuccess({ className = "" }: UKVisaSuccessProps) {
  return (
    <VisaSuccessStories 
      country="uk" 
      className={className}
    />
  );
}
