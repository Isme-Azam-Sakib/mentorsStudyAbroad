import React from "react";

interface ProcessCardProps {
  title: string;
  content: string;
  className?: string;
  index?: number;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({ 
  title, 
  content, 
  className = "",
  index = 0
}) => {
  // Programmatically generate step number with leading zero
  const stepNumber = String(index + 1).padStart(2, '0');

  // Extract hover classes from className
  const hoverClasses = className.match(/hover:[^\s]+/g) || [];
  const nonHoverClasses = className.replace(/hover:[^\s]+/g, '').trim();

  return (
    <div className={`w-full max-w-sm sm:max-w-md lg:max-w-[616px] h-auto my-6 sm:my-8 lg:my-10 mx-auto ${nonHoverClasses}`}>
      <div className={`w-full h-full bg-white rounded-3xl sm:rounded-[40px] lg:rounded-[50px] border border-solid border-[#f2f2f2] p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${hoverClasses.join(' ')}`}>
        {/* Header with step number and title */}
        <div className="flex items-start sm:items-center mb-4 sm:mb-5 lg:mb-6">
          <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-black rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
            <span className="text-white font-bold text-sm sm:text-base lg:text-lg">{stepNumber}</span>
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black leading-tight">{title}</h3>
        </div>
        
        {/* Content */}
        <div className="text-black text-sm sm:text-base leading-relaxed">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-3 sm:mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
