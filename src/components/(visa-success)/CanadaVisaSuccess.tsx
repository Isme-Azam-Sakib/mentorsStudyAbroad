"use client";

import VisaSuccessStories from './VisaSuccessStories';

interface CanadaVisaSuccessProps {
  className?: string;
}

export default function CanadaVisaSuccess({ className = "" }: CanadaVisaSuccessProps) {
  return (
    <VisaSuccessStories 
      country="canada" 
      className={className}
    />
  );
}
