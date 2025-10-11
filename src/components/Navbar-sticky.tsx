"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../app/public/logo-main.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCountriesDropdownOpen, setIsCountriesDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingDown = currentScrollPos > prevScrollPos;

      // Show navbar when at top or scrolling up
      // Hide navbar when scrolling down (except at very top)
      setVisible(currentScrollPos < 10 || !scrollingDown);
      setIsScrollingDown(scrollingDown);
      setCurrentScrollY(currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isMounted]);

  // Close mobile menu when clicking outside or on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Reset countries dropdown when toggling main menu
    setIsCountriesDropdownOpen(false);
  };

  const toggleCountriesDropdown = () => {
    setIsCountriesDropdownOpen(!isCountriesDropdownOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative">
        {/* Full Navbar Container - disappears when scrolling down */}
        <nav className={`rounded-[20px] sm:rounded-[30px] flex items-center justify-between mt-4 sm:mt-10 bg-white border border-gray-200 shadow-lg px-4 sm:px-8 py-3 sm:py-4 h-[70px] sm:h-[85px] transition-all duration-300 relative ${!isMounted || visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}>
          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Logo Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/">
                <Image src={logo} alt="logo" height={60} width={180} className="h-[40px] w-auto sm:h-[50px] sm:w-auto" priority quality={100} unoptimized={false} />
              </Link>
            </div>

            {/* Right side - Consultation Button and Hamburger */}
            <div className="flex items-center gap-3">
              {/* Consultation Button - Visible on mobile/tablet */}
              <Link
                href="/consultation"
                className="bg-my-black text-my-white hover:bg-my-gray border border-my-black rounded-full px-3 sm:px-4 py-2 sm:py-2.5 font-medium transition-all duration-300 text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Free Consultation</span>
                <span className="sm:hidden">Consultation</span>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-500 hover:text-black transition duration-300 ease-in-out p-2"
              >
                {isMobileMenuOpen ? (
                  <i className="fi fi-br-cross w-6 h-6 text-xl"></i>
                ) : (
                  <span className="flex items-center justify-center bg-my-black rounded-full w-10 h-10">
                    <i className="fi fi-br-menu-burger text-my-white text-xl flex items-center justify-center h-full"></i>
                  </span>
                )}
              </button> 
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Logo Section */}
            <div className="flex items-center gap-2 sm:gap-3 z-50">
              <Link href="/">
                <Image src={logo} alt="logo" height={60} width={180} className="h-[40px] w-auto sm:h-[60px] sm:w-auto" priority quality={100} unoptimized={false} />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6 xl:space-x-8">
              <Link href="/" className="text-gray-500 hover:text-black text-base xl:text-lg font-medium transition duration-300 ease-in-out">
                Home
              </Link>

              {/* Countries Dropdown */}
              <div className="relative group">
                <button className="text-gray-500 hover:text-black text-base xl:text-lg font-medium transition duration-300 ease-in-out flex items-center">
                  Countries
                  <svg className="w-3 h-3 xl:w-4 xl:h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-44 xl:w-48 bg-white rounded-3xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out z-50 overflow-hidden">
                  {/* Content */}
                  <div className="relative py-2">
                    <Link href="/countries/australia" className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-900 hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium">Australia</Link>
                    <Link href="/countries/usa" className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-900 hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium">USA</Link>
                    <Link href="/countries/uk" className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-900 hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium">UK</Link>
                    <Link href="/countries/canada" className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-900 hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium">Canada</Link>
                    <Link href="/countries/ireland" className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-900 hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium">Ireland</Link>
                    <Link href="/countries/malaysia" className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-900 hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium">Malaysia</Link>
                    <Link href="/countries/newzealand" className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-900 hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium">New Zealand</Link>
                    <Link href="/countries/japan" className="block px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-900 hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium">Japan</Link>
                  </div>
                </div>
              </div>

              <Link href="/success-stories" className="text-gray-500 hover:text-black text-base xl:text-lg font-medium transition duration-300 ease-in-out">
                Success Stories
              </Link>
              <Link href="/services" className="text-gray-500 hover:text-black text-base xl:text-lg font-medium transition duration-300 ease-in-out">
                Services
              </Link>
              <Link href="/events" className="text-gray-500 hover:text-black text-base xl:text-lg font-medium transition duration-300 ease-in-out">
                Events & News
              </Link>
            </div>

            {/* Desktop Consultation Button */}
            <Link
              href="/consultation"
              className="bg-my-black text-my-white hover:bg-my-gray border border-my-black rounded-full px-4 xl:px-6 py-2 xl:py-3 font-medium transition-all duration-300 text-sm xl:text-base"
            >
              Free Consultation
            </Link>
          </div>
        </nav>

        {/* Mobile Off-Canvas Menu */}
        <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Image src={logo} alt="logo" height={40} width={120} className="h-8 w-auto" priority quality={100} unoptimized={false} />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-black transition duration-300 ease-in-out p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-1">
              <Link 
                href="/" 
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-black rounded-xl transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Countries Dropdown */}
              <div className="px-4 py-3">
                <button 
                  onClick={toggleCountriesDropdown}
                  className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300"
                >
                  <span>Countries</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${isCountriesDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Countries Dropdown Menu */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  isCountriesDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-2 pl-4 pt-2">
                    <Link 
                      href="/countries/australia" 
                      className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Australia
                    </Link>
                    <Link 
                      href="/countries/usa" 
                      className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      USA
                    </Link>
                    <Link 
                      href="/countries/uk" 
                      className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      UK
                    </Link>
                    <Link 
                      href="/countries/canada" 
                      className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Canada
                    </Link>
                    <Link 
                      href="/countries/ireland" 
                      className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Ireland
                    </Link>
                    <Link 
                      href="/countries/malaysia" 
                      className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Malaysia
                    </Link>
                    <Link 
                      href="/countries/newzealand" 
                      className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      New Zealand
                    </Link>
                    <Link 
                      href="/countries/japan" 
                      className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Japan
                    </Link>
                  </div>
                </div>
              </div>

              <Link 
                href="/success-stories" 
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-black rounded-xl transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Success Stories
              </Link>
              <Link 
                href="/services" 
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-black rounded-xl transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/events" 
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-black rounded-xl transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events & News
              </Link>
            </div>

            {/* Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
              <Link
                href="/consultation"
                className="block w-full bg-my-black text-my-white hover:bg-my-gray border border-my-black rounded-full px-6 py-3 font-medium transition-all duration-300 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}