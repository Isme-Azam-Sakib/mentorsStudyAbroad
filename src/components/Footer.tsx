"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import logoAlt from "../app/public/logo-alt.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    // Note: Implement newsletter signup API call here
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLinkClick = () => {
    // Scroll to top immediately when clicking footer links
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Footer Section */}
      <section className="-pb-10 z-20">
        <div className="bg-my-white2 mx-auto max-w-7xl rounded-[50px] px-6 sm:px-6 py-8 sm:py-10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            <div>
              <div className="mb-6 sm:mb-[40px] mt-6 sm:mt-[40px]">
                <Image src={logoAlt} alt="Study Abroad Mentors logo" width={150} height={50} className="h-[50px] sm:h-[60px] w-auto object-contain" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-5 sm:leading-6">
                Mentors’ Study Abroad is a leading student consultancy offering comprehensive A-Z guidance and support to help students achieve their dream of studying abroad - all with zero service charges.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-1">Important Links</h3>
              <ul className="space-y-2 text-gray-700">
                <li><Link href="/" onClick={handleLinkClick} className="hover:text-black text-sm sm:text-base">Home</Link></li>
                <li><Link href="/about" onClick={handleLinkClick} className="hover:text-black text-sm sm:text-base">About</Link></li>
                <li><Link href="/success-stories" onClick={handleLinkClick} className="hover:text-black text-sm sm:text-base">Success Stories</Link></li>
                <li><Link href="/countries" onClick={handleLinkClick} className="hover:text-black text-sm sm:text-base">Top Universities</Link></li>
                {/* <li><Link href="/services" onClick={handleLinkClick} className="hover:text-black text-sm sm:text-base">Visa Processing</Link></li>
                <li><Link href="/resources/sop" onClick={handleLinkClick} className="hover:text-black text-sm sm:text-base">How to write SOP</Link></li> */}
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Contact</h3>
              <ul className="space-y-3 text-gray-700">

                <li className="flex items-start gap-3">
                  <i className="fi fi-ss-marker text-[16px] sm:text-[18px] text-gray-700 flex-shrink-0 mt-0.5"></i>
                  <p className="text-xs sm:text-sm leading-5 sm:leading-6">
                    166/1 Mirpur Road<br />
                    (Beside Dolphin Goli), Kalabagan, Dhaka-1205
                  </p>
                </li>

                <li className="flex items-center gap-3">
                  <i className="fi fi-sr-phone-call text-[16px] sm:text-[18px] text-gray-700 flex-shrink-0"></i>
                  <a href="tel:09610883388" className="text-xs sm:text-sm hover:text-black">09610883388</a>
                </li>

                <li className="flex items-center gap-3">
                  <i className="fi fi-rr-envelope text-[16px] sm:text-[18px] text-gray-700 flex-shrink-0"></i>
                  <a href="mailto:info@mentors.com.bd" className="text-xs sm:text-sm hover:text-black break-all">info@mentors.com.bd</a>
                </li>

              </ul>
            </div>
          </div>

          <div className="my-6 sm:my-8 h-px bg-gray-200" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-700 text-center md:text-left">©2025 Mentors&apos; Study Abroad Ltd.</p>
            <div className="flex items-center gap-4 sm:gap-6 text-gray-700">
              <a href="https://www.linkedin.com/company/mentorseducation" aria-label="LinkedIn" className="hover:text-black">
                <i className="fi fi-brands-linkedin text-[16px] sm:text-[18px] text-gray-700"></i>
              </a>
              <a href="https://www.facebook.com/MentorsSA/" aria-label="Facebook" className="hover:text-black">
                <i className="fi fi-brands-facebook text-[16px] sm:text-[18px] text-gray-700"></i>
              </a>
              {/* <a href="#" aria-label="WhatsApp" className="hover:text-black">
                <i className="fi fi-brands-whatsapp text-[16px] sm:text-[18px] text-gray-700"></i>
              </a> */}
              <a href="https://www.youtube.com/@MentorsStudyAbroad" aria-label="Youtube" className="hover:text-black">
                <i className="fi fi-brands-youtube text-[16px] sm:text-[18px] text-gray-700"></i>
              </a>
              <a href="https://www.instagram.com/studyabroadwithmentors/?hl=en" aria-label="Instagram" className="hover:text-black">
                <i className="fi fi-brands-instagram text-[16px] sm:text-[18px] text-gray-700"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section
        className="w-full h-[447px] bg-black flex items-center z-10"
        data-model-id="111:372"
        aria-label="Newsletter signup"
      >
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Newsletter Text */}
      {/* <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                Sign up to our newsletter for news &amp; updates.
              </h2>
            </div>
            
            {/* Newsletter Form */}
      {/* <div className="flex-1 max-w-md lg:max-w-lg">
              <form
                onSubmit={handleSubmit}
                role="form"
                aria-label="Newsletter subscription form"
                className="flex gap-0"
              >
                <div className="flex-1 relative">
                  <label htmlFor="email-input" className="sr-only">
                    Your email address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Your email address:"
                    className="w-full px-6 py-4 bg-white text-gray-700 placeholder-gray-400 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-red-500 text-base"
                    required
                    aria-required="true"
                    aria-describedby="email-description"
                  />
                  <span id="email-description" className="sr-only">
                    Enter your email address to subscribe to our newsletter
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-[#d82329] hover:bg-[#c01e24] focus:bg-[#c01e24] text-white font-bold rounded-r-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#d82329]"
                  aria-label="Submit newsletter subscription"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}


