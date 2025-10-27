import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CountryCard {
  id: string;
  name: string;
  displayName: string;
  image: string;
  href: string;
}

const countries: CountryCard[] = [
  {
    id: 'australia',
    name: 'Australia',
    displayName: 'Australia',
    image: '/countries/australia.png',
    href: '/countries/australia'
  },
  {
    id: 'usa',
    name: 'United States',
    displayName: 'USA',
    image: '/countries/usa.png',
    href: '/countries/usa'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    displayName: 'UK',
    image: '/countries/uk.png',
    href: '/countries/uk'
  },
  {
    id: 'canada',
    name: 'Canada',
    displayName: 'Canada',
    image: '/countries/canada.png',
    href: '/countries/canada'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    displayName: 'Ireland',
    image: '/countries/ireland.png',
    href: '/countries/ireland'
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    displayName: 'Malaysia',
    image: '/countries/malaysia.png',
    href: '/countries/malaysia'
  },
  {
    id: 'new_zealand',
    name: 'New Zealand',
    displayName: 'New Zealand',
    image: '/countries/new_zealand.png',
    href: '/countries/newzealand'
  },
  {
    id: 'japan',
    name: 'Japan',
    displayName: 'Japan',
    image: '/countries/japan.png',
    href: '/countries/japan'
  }
];

const ChooseDestination: React.FC = () => {
  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-white mb-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Mobile Hero Image */}
        <div className="block md:hidden mb-8">
          <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-my-black text-center px-4 mb-4">
                Choose your dream <span className="text-my-accent">destination</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Section Title - Desktop */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 hidden md:block">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-my-black">
            Choose your dream <span className="text-my-accent relative">destination</span>
          </h2>
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {countries.map((country) => (
            <div key={country.id} className="group cursor-pointer">
              {/* Country Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 aspect-square">
                <div className="relative h-full">
                  {/* Country Image */}
                  <Image
                    src={country.image}
                    alt={country.name}
                    fill
                    className="object-cover"
                    priority
                  />

                  <div className="absolute inset-0 bg-my-black/40"></div>

                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center px-2">
                      {country.displayName}
                    </h3>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end z-20">
                    <div className="w-full p-3 sm:p-4 lg:p-6">
                      <Link 
                        href={country.href}
                        className="w-full bg-my-accent text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full flex items-center justify-center gap-1 sm:gap-2 font-semibold hover:bg-my-accent/90 transition-colors duration-300 text-sm sm:text-base"
                      >
                        <span className="hidden sm:inline">Study in {country.name}</span>
                        <span className="sm:hidden">Study</span>
                        <i className="fi fi-sr-arrow-right text-xs sm:text-sm"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseDestination;
