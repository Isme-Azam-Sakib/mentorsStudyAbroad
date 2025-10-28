"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../app/public/logo-main.png";
import { useState } from "react";
import { StudyAbroadModal } from "./StudyAbroadModal";
import { Button } from "./Button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCountriesDropdownOpen, setIsCountriesDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* Top Bar Section - Desktop Only */}
      <div className="hidden lg:block bg-my-black py-2 sm:py-1">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-end">
            {/* Right Side - Social Icons and Hotline */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Facebook */}
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 sm:w-7 sm:h-7 bg-my-white text-my-black rounded-full flex items-center justify-center hover:bg-my-white/80 hover:text-my-black transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <i className="fi fi-brands-facebook text-xs sm:text-sm flex items-center justify-center"></i>
                </Link>

                {/* Instagram */}
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 sm:w-7 sm:h-7 bg-my-white text-my-black rounded-full flex items-center justify-center hover:bg-my-white/80 hover:text-my-black transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <i className="fi fi-brands-instagram text-xs sm:text-sm flex items-center justify-center"></i>
                </Link>

                {/* LinkedIn */}
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 sm:w-7 sm:h-7 bg-my-white text-my-black rounded-full flex items-center justify-center hover:bg-my-white/80 hover:text-my-black transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <i className="fi fi-brands-linkedin text-xs sm:text-sm flex items-center justify-center"></i>
                </Link>

                {/* YouTube */}
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 sm:w-7 sm:h-7 bg-my-white text-my-black rounded-full flex items-center justify-center hover:bg-my-white/80 hover:text-my-black transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <i className="fi fi-brands-youtube text-xs sm:text-sm flex items-center justify-center"></i>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <i className="fi fi-sr-phone-call text-my-accent text-sm sm:text-base"></i>
                <a
                  href="tel:09610883388"
                  className="text-xs sm:text-sm font-semibold text-my-white hover:text-my-white/80 transition-colors duration-300"
                >
                  09610883388
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative">
        <nav className="rounded-[20px] sm:rounded-[30px] flex items-center justify-between mt-0 bg-white border border-gray-200 shadow-lg px-4 sm:px-8 py-3 sm:py-4 h-[70px] sm:h-[85px]">
          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Logo Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/">
                <Image src={logo} alt="logo" height={60} width={180} className="h-[40px] w-auto sm:h-[50px] sm:w-auto" priority quality={100} unoptimized={false} />
              </Link>
            </div>

            {/* Right side - Hamburger Menu Only */}
            <div className="flex items-center">
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
              {/* Countries Dropdown */}
              <div className="relative group">
                <div className="flex items-center">
                  <Link href="/countries" className="text-gray-500 hover:text-black text-base xl:text-lg font-medium transition duration-300 ease-in-out">
                    Countries
                  </Link>
                  <svg className="w-3 h-3 xl:w-4 xl:h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

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
              <Link href="/contact" className="text-gray-500 hover:text-black text-base xl:text-lg font-medium transition duration-300 ease-in-out">
                Contact
              </Link>
            </div>

            {/* Desktop Consultation Button */}
            <Link href="/contact">
              <Button variant="secondary" className="text-sm sm:text-base">
                Book A Free Consultation <i className="fi fi-sr-meeting-alt"></i>
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Off-Canvas Menu */}
        <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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

            {/* Top Bar Elements - Mobile/Tablet Only */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              {/* Social Icons */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-sm text-gray-600 font-medium">Follow us:</span>
                <div className="flex items-center gap-2">
                  {/* Facebook */}
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-my-white text-my-black rounded-full flex items-center justify-center hover:bg-my-white/80 hover:text-my-black transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <i className="fi fi-brands-facebook text-sm flex items-center justify-center"></i>
                  </Link>

                  {/* Instagram */}
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-my-white text-my-black rounded-full flex items-center justify-center hover:bg-my-white/80 hover:text-my-black transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <i className="fi fi-brands-instagram text-sm flex items-center justify-center"></i>
                  </Link>

                  {/* LinkedIn */}
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-my-white text-my-black rounded-full flex items-center justify-center hover:bg-my-white/80 hover:text-my-black transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <i className="fi fi-brands-linkedin text-sm flex items-center justify-center"></i>
                  </Link>

                  {/* YouTube */}
                  <Link
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-my-white text-my-black rounded-full flex items-center justify-center hover:bg-my-white/80 hover:text-my-black transition-colors duration-300"
                    aria-label="YouTube"
                  >
                    <i className="fi fi-brands-youtube text-sm flex items-center justify-center"></i>
                  </Link>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <i className="fi fi-sr-phone-call text-my-accent text-base"></i>
                <a
                  href="tel:09610883388"
                  className="text-base font-semibold text-my-black hover:text-my-accent transition-colors duration-300"
                >
                  09610883388
                </a>
              </div>

            </div>

            {/* Free Consultation Button - Top */}
            <div className="p-6 border-b border-gray-200">
              <Link href="/contact">
                <Button variant="secondary" className="text-sm sm:text-base">
                  Book A Free Consultation <i className="fi fi-sr-meeting-alt"></i>
                </Button>
              </Link>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-1">
              {/* Countries Dropdown */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300">
                  <Link
                    href="/countries"
                    className="flex-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Countries
                  </Link>
                  <button
                    onClick={toggleCountriesDropdown}
                    className="ml-2"
                  >
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${isCountriesDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Countries Dropdown Menu */}
                <div className={`overflow-hidden transition-all duration-300 ${isCountriesDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
              <Link
                href="/contact"
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-black rounded-xl transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Study Abroad Modal */}
        <StudyAbroadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}


