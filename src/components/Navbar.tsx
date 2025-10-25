import Link from "next/link";
import Image from "next/image";
import logo from "../app/public/logo-main.png";

export default function Navbar() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <nav className="rounded-[30px] flex items-center justify-between mt-10 bg-white shadow-md px-8 py-4 h-[85px]">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image src={logo} alt="logo" height={60} priority />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link href="/" className="text-gray-500 hover:text-black text-lg font-medium transition duration-300 ease-in-out">Home</Link>
          
          {/* Countries Dropdown */}
          <div className="relative group">
            <button className="text-gray-500 hover:text-black text-lg font-medium transition duration-300 ease-in-out flex items-center">
              Countries
              <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-white/50 backdrop-blur-lg rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
              <div className="py-2">
                <Link href="/countries/usa" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition duration-200">USA</Link>
                <Link href="/countries/uk" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition duration-200">UK</Link>
                <Link href="/countries/uae" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition duration-200">UAE</Link>
                <Link href="/countries/australia" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition duration-200">Australia</Link>
                <Link href="/countries/canada" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition duration-200">Canada</Link>
                <Link href="/countries/malaysia" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition duration-200">Malaysia</Link>
                <Link href="/countries/finland" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition duration-200">Finland</Link>
              </div>
            </div>
          </div>
          
          <Link href="/success-stories" className="text-gray-500 hover:text-black text-lg font-medium transition duration-300 ease-in-out">Success Stories</Link>
          <Link href="/services" className="text-gray-500 hover:text-black text-lg font-medium transition duration-300 ease-in-out">Services</Link>
          <Link href="/events" className="text-gray-500 hover:text-black text-lg font-medium transition duration-300 ease-in-out">Events</Link>
        </div>

        {/* Consultation Button */}
        <Link
          href="/consultation"
          className="btn-std border border-gray-400 rounded-full px-6 py-2 text-black font-medium hover:bg-gray-100 transition"
        >
          Free Consultation
        </Link>
      </nav>
    </div>
  );
}


