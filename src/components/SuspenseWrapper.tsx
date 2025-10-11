"use client";

import React, { Suspense } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export default function SuspenseWrapper({ 
  children, 
  fallback,
  className = ''
}: SuspenseWrapperProps) {
  const defaultFallback = (
    <div className={`w-full ${className}`}>
      <LoadingSkeleton variant="rectangular" height="200px" />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}
