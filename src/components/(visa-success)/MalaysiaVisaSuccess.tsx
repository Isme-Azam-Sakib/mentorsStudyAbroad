"use client";

import VisaSuccessStories from './VisaSuccessStories';

interface MalaysiaVisaSuccessProps {
  className?: string;
}

export default function MalaysiaVisaSuccess({ className = "" }: MalaysiaVisaSuccessProps) {
  return (
    <VisaSuccessStories 
      country="malaysia" 
      className={className}
    />
  );
}
