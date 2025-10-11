"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/404 error.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(console.error);
  }, []);
  return (
    <div className="relative">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 w-full h-auto bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero background.png')"
        }}
      />
      
      {/* Hero Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            {/* Lottie Animation */}
            <div className="mb-8 flex justify-center">
              <div className="w-[800px] h-auto max-w-full max-h-[70vh]">
                {animationData && (
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </div>
            </div>
            
            {/* Error Message */}
            <div className="mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-my-black mb-6 leading-tight">
                Oops! Page Not Found
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                The page you&apos;re looking for seems to have wandered off to study abroad! 
                Don&apos;t worry, we&apos;ll help you find your way back to the right destination.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/" className="btn-std">
                🏠 Back to Home
              </Link>
              <Link href="/countries" className="btn-std bg-my-accent text-white border-my-accent hover:bg-my-black hover:border-my-black">
                🌍 Explore Countries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
