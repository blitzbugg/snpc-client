import React, { useState } from "react";
import {
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close all mobile dropdowns when menu is closed
    if (isMenuOpen) {
      setActiveMobileDropdown(null);
    }
  };

  const handleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleMobileDropdown = (menu) => {
    setActiveMobileDropdown(activeMobileDropdown === menu ? null : menu);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setActiveMobileDropdown(null);
  };

  return (
    <div className="w-full">
      {/* Mobile Header */}
      <div className="xl:hidden">
        {/* Top Layer - Logos with accent background */}
        <div className="bg-gray-100 px-4 py-3 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img
                src="/logo.png"
                alt="School Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <img
              src="/excellence.png"
              alt="Sree Buddha Central School"
              className="h-14 w-auto object-contain"
            />
          </div>
        </div>

        {/* Bottom Layer - Contact Info and Menu */}
        <div className="bg-[#0D47A1] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Contact Info - Icons with text */}
            <div className="flex items-center gap-4 text-white text-sm">
              <Link
                href="tel:04762662489"
                className="flex items-center gap-1 hover:underline hover:text-secondary transition-colors"
                aria-label="Call us at 0476-2662489"
                title="Call: 0476-2662489"
              >
                <Phone className="w-4 h-4" />
                <span>0476-2662489</span>
              </Link>
              <Link
                href="mailto:sbcskarunagappally@gmail.com"
                className="flex items-center gap-1 hover:underline hover:text-secondary transition-colors"
                aria-label="Email us at sbcskarunagappally@gmail.com"
                title="Email: sbcskarunagappally@gmail.com"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Link>
            </div>

            {/* Hamburger Menu */}
            <button
              className="text-white p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Main Header */}
      <div className="hidden xl:block bg-gradient-to-r from-white to-[#0D47A1]/5 px-4 lg:px-6 shadow-lg relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10 py-1.5">
          {/* Logo Section */}
          <div className="flex items-center md:gap-2 lg:gap-4">
            <Link href="/">
              <img
                src="/logo.jpg"
                alt="School Logo"
                className="h-12 md:h-14 lg:h-16 xl:h-17 w-auto object-contain"
              />
            </Link>
            {/* Anniversary Badge */}
            <img
              src="/excellence.png"
              alt="Sree Buddha Central School"
              className="h-11 md:h-13 lg:h-15 xl:h-16 w-auto object-contain"
            />
          </div>

          {/* Contact Info (Icon Left, Label Above Value) */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-10 text-[#0D47A1]">
            {/* Phone */}
            <Link
              href="tel:04762662489"
              aria-label="Call us"
              className="flex items-start gap-2 md:gap-3 hover:text-blue-800 transition-colors"
              title="Call: 0476-2662489, 2664989"
            >
              <Phone className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 my-auto" />
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-medium text-dark mb-1">
                  Phone
                </span>
                <span className="text-xs md:text-sm mt-1">
                  0476-2662489, 2664989
                </span>
              </div>
            </Link>

            {/* Email */}
            <Link
              href="mailto:sbcskarunagappally@gmail.com"
              aria-label="Email us"
              className="flex items-start gap-2 md:gap-3 hover:text-blue-800 transition-colors"
              title="Email: sbcskarunagappally@gmail.com"
            >
              <Mail className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 my-auto" />
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-medium text-dark mb-1">
                  Email
                </span>
                <span className="text-xs md:text-sm mt-1 break-all">
                  sbcskarunagappally@gmail.com
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <nav className="hidden xl:block bg-[#0D47A1] shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-1 md:px-2 lg:px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-0.5 md:space-x-1 lg:space-x-2">
              {/* About Foundation Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center px-2 md:px-3 lg:px-4 py-3 text-white hover:bg-[#0D47A1]/80 transition-colors text-xs md:text-sm lg:text-base font-medium whitespace-nowrap"
                  onClick={() => handleDropdown("foundation")}
                >
                  The School
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-3 w-64 z-50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  {/* <div className="grid grid-cols-2 gap-x-4"> */}
                    <Link
                      href="/#about-us"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/the-school/achievements"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      Achievements
                    </Link>
                    <Link
                      href="/the-school/administration"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      Administration
                    </Link>
                    <Link
                      href="/the-school/management"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      SMC
                    </Link>
                    <Link
                      href="/the-school/messages"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      Chairman's and Principal's Messages
                    </Link>
                    {/* <Link
                      href="/documents/disclosure"
                      className="block px-4 py-2.5 text-gray-700 hover:text-[#0D47A1] hover:bg-blue-50 transition-all duration-200 text-sm"
                      onClick={closeDropdown}
                    >
                      Mandatory Disclosure
                    </Link> */}
                    <Link
                      href="/the-school/school-assembly"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      School Assembly
                    </Link>
                    <Link
                      href="/admission"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      Admission
                    </Link>
                    
                    <Link
                      href="/the-school/objectives"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      Objectives
                    </Link>
                    <Link
                      href="/the-school/missionandvission"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      Mission & Vision
                    </Link>
                  </div>
              </div>

              {/* About School Dropdown */}
              {/* <div className="relative group">
                <button
                  className="flex items-center px-4 py-3 text-white hover:bg-[#0D47A1]/80 transition-colors"
                  onClick={() => handleDropdown("school")}
                >
                  About School
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-3 w-64 z-50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <Link
                    href="/about-school/messages"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Chairman's and Principal's Messages
                  </Link>
                  <Link
                    href="/about-school/missionandvission"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Mission & Vision
                  </Link>
                  <Link
                    href="/about-school/departments"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Departments
                  </Link>
                </div>
              </div> */}

              {/* Facilities Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center px-2 md:px-3 lg:px-4 py-3 text-white hover:bg-[#0D47A1]/80 transition-colors text-xs md:text-sm lg:text-base font-medium whitespace-nowrap"
                  onClick={() => handleDropdown("Facilities")}
                >
                  Facilities
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-3 w-48 z-50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  {/* <Link
                    href="/facilities/academics"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Academics
                  </Link>
                  <Link
                    href="/facilities/nonacademics"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Non-Academics
                  </Link> */}
                  <Link
                    href="/facilities/smartclass"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Smart Class
                  </Link>
                  <Link
                    href="/facilities/library"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Library
                  </Link>
                  <Link
                    href="/facilities/labs"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Labs
                  </Link>
                  <Link
                    href="/facilities/atl"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    ATL
                  </Link>
                  <Link
                    href="/facilities/auditorium"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Auditorium
                  </Link>
                  <Link
                    href="/facilities/conferencehall"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Conference Hall
                  </Link>
                  <Link
                    href="/facilities/playground"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Playground
                  </Link>
                  <Link
                    href="/facilities/sportsroom"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Sports Room
                  </Link>
                </div>
              </div>

              {/* academic Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center px-2 md:px-3 lg:px-4 py-3 text-white hover:bg-[#0D47A1]/80 transition-colors text-xs md:text-sm lg:text-base font-medium whitespace-nowrap"
                  onClick={() => handleDropdown("documents")}
                >
                  Academic
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-3 w-56 z-50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <Link
                    href="/academics/preprimary"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Pre-Primary
                  </Link>
                  <Link
                    href="/academics/primary"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Primary
                  </Link>
                  <Link
                    href="/academics/secondary"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Secondary
                  </Link>
                  <Link
                    href="/academics/seniorSecondary"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Senior Secondary
                  </Link>
                  <Link
                    href="/academics/yearPlanAndReport"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Academic Calendar & Year Plan
                  </Link>
                  <Link
                    href="/academics/result"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Result
                  </Link>
                </div>
              </div>
              <Link
                href="/departments"
                className="px-2 md:px-3 lg:px-4 py-3 text-white hover:bg-[#0D47A1]/80 transition-colors text-xs md:text-sm lg:text-base font-medium whitespace-nowrap"
              >
                Departments
              </Link>
              {/* Learning Pathways Dropdown (Academic + Non-Academic) */}
              <div className="relative group">
                <button
                  className="flex items-center px-2 md:px-3 lg:px-4 py-3 text-white hover:bg-[#0D47A1]/80 transition-colors text-xs md:text-sm lg:text-base font-medium whitespace-nowrap"
                  onClick={() => handleDropdown("learning")}
                >
                  Non-Academic
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-3 w-56 z-50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <Link
                    href="/non-academics/events"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Events
                  </Link>
                  <Link
                    href="/non-academics/clubs"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Clubs
                  </Link>
                  <Link
                    href="/non-academics/houses"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Houses
                  </Link>
                </div>
              </div>
              {/* <Link
                href="/documents/disclosure"
                className="px-2 md:px-3 lg:px-4 py-3 text-white hover:bg-[#0D47A1]/80 transition-colors text-xs md:text-sm lg:text-base font-medium whitespace-nowrap"
              >
              Mandatory Disclosure
              </Link> */}
              {/* Documents Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center px-2 md:px-3 lg:px-4 py-3 text-white hover:bg-[#0D47A1]/80 transition-colors text-xs md:text-sm lg:text-base font-medium whitespace-nowrap"
                  onClick={() => handleDropdown("documents")}
                >
                  Mandatory Disclosure
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-3 w-56 z-50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  {/* <Link
                    href="/documents/tc"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    TC Certificate
                  </Link> */}
                  <Link
                    href="/documents/disclosure"
                    className="block px-4 py-2 text-gray-800 hover:text-secondary hover:bg-gray-50 transition-all duration-200"
                    onClick={closeDropdown}
                  >
                    Mandatory Disclosure
                  </Link>
                  <Link
                      href="/documents/fee-structure"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200"
                      onClick={closeDropdown}
                    >
                      Fee Structure
                    </Link>
                    <Link
                      href="/documents/tc"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      TC
                    </Link>
                    <Link
                      href="/documents/newsLetter"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      Annual News Letter
                    </Link>
                    <Link
                      href="/documents/associations"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      PTA
                    </Link>
                    <Link
                      href="/documents/sister-concerns"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      Sister Concerns
                    </Link>
                    <Link
                      href="/documents/textbooks-list"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      List of text books
                    </Link>
                    <Link
                      href="/documents/school-uniforms"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      School Uniforms
                    </Link>
                    <Link
                      href="/documents/bus-information"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      Bus Route
                    </Link>
                    <Link
                      href="/documents/general-rules"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      General Rules
                    </Link>
                    <Link
                      href="/documents/Appendix"
                      className="block px-4 py-2.5 text-gray-700 hover:text-secondary hover:bg-blue-50 transition-all duration-200 "
                      onClick={closeDropdown}
                    >
                      Appendix
                    </Link>

                </div>
              </div>

              <Link
                href="/gallery"
                className="px-2 md:px-3 lg:px-4 py-3 text-white hover:bg-[#0D47A1]/80 transition-colors text-xs md:text-sm lg:text-base font-medium whitespace-nowrap"
              >
                Gallery
              </Link>
              {/* <Link
                href="/contact-us"
                className="px-2 md:px-3 lg:px-4 py-3 text-white hover:bg-[#0D47A1]/80 transition-colors text-xs md:text-sm lg:text-base font-medium whitespace-nowrap"
              >
                Contact Us
              </Link> */}
            </div>

            {/* Admission Form Button */}
            <div className="ml-auto pl-1 md:pl-2">
              <Link
                href="/admission"
                className="bg-gradient-to-r from-white to-white text-[#0D47A1] px-3 md:px-4 lg:px-6 py-1.5 md:py-2 font-bold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 rounded-md lg:rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 text-xs md:text-sm lg:text-base whitespace-nowrap"
              >
                Admission Form
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={closeMobileMenu}
          ></div>

          {/* Side drawer */}
          <div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
            style={{ animation: "slideInRight 0.3s ease-in-out" }}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-[#0D47A1] text-lg font-semibold">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="text-[#0D47A1] p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu content */}
            <div className="py-4">
              <div className="space-y-1 flex flex-col">
                {/* The School Mobile Dropdown */}
                <div className="w-full">
                  <button
                    className="flex items-center justify-between w-full px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                    onClick={() => handleMobileDropdown("foundation")}
                  >
                    The School
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeMobileDropdown === "foundation"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeMobileDropdown === "foundation"
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gray-50 border-l-2 border-[#0D47A1] ml-4">
                      <Link
                        href="/#about-us"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        About Us
                      </Link>
                      <Link
                        href="/the-school/achievements"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Achievements
                      </Link>
                      <Link
                        href="/the-school/administration"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Administration
                      </Link>
                      <Link
                        href="/the-school/management"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        SMC
                      </Link>
                      <Link
                        href="/the-school/messages"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Chairman's and Principal's Messages
                      </Link>
                      <Link
                        href="/the-school/school-assembly"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        School Assembly
                      </Link>
                      <Link
                        href="/admission"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Admission
                      </Link>
                      <Link
                        href="/the-school/objectives"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Objectives
                      </Link>
                      <Link
                        href="/the-school/missionandvission"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Mission & Vision
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Facilities Mobile Dropdown */}
                <div className="w-full">
                  <button
                    className="flex items-center justify-between w-full px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                    onClick={() => handleMobileDropdown("Facilities")}
                  >
                    Facilities
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeMobileDropdown === "Facilities"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeMobileDropdown === "Facilities"
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gray-50 border-l-2 border-[#0D47A1] ml-4">
                      {/* <Link
                        href="/facilities/academics"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Academics
                      </Link>
                      <Link
                        href="/facilities/nonacademics"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Non-Academics
                      </Link> */}
                      <Link
                        href="/facilities/smartclass"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Smart Class
                      </Link>
                      <Link
                        href="/facilities/library"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Library
                      </Link>
                      <Link
                        href="/facilities/labs"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Labs
                      </Link>
                      <Link
                        href="/facilities/atl"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        ATL
                      </Link>
                      <Link
                        href="/facilities/auditorium"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Auditorium
                      </Link>
                      <Link
                        href="/facilities/conferencehall"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Conference Hall
                      </Link>
                      <Link
                        href="/facilities/playground"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Playground
                      </Link>
                      <Link
                        href="/facilities/sportsroom"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Sports Room
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Academic Mobile Dropdown */}
                <div className="w-full">
                  <button
                    className="flex items-center justify-between w-full px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                    onClick={() => handleMobileDropdown("academic")}
                  >
                    Academic
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeMobileDropdown === "academic" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeMobileDropdown === "academic"
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gray-50 border-l-2 border-[#0D47A1] ml-4">
                      <Link
                        href="/academics/preprimary"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Pre-Primary
                      </Link>
                      <Link
                        href="/academics/primary"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Primary
                      </Link>
                      <Link
                        href="/academics/secondary"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Secondary
                      </Link>
                      <Link
                        href="/academics/seniorSecondary"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Senior Secondary
                      </Link>
                      <Link
                        href="/academics/yearPlanAndReport"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Academic Calendar & Year Plan
                      </Link>
                      <Link
                        href="/academics/result"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Result
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Departments - Simple Link */}
                <Link
                  href="/departments"
                  className="block w-full px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Departments
                </Link>

                {/* Non-Academic Mobile Dropdown */}
                <div className="w-full">
                  <button
                    className="flex items-center justify-between w-full px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                    onClick={() => handleMobileDropdown("nonacademic")}
                  >
                    Non-Academic
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeMobileDropdown === "nonacademic"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeMobileDropdown === "nonacademic"
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gray-50 border-l-2 border-[#0D47A1] ml-4">
                      <Link
                        href="/non-academics/events"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Events
                      </Link>
                      <Link
                        href="/non-academics/clubs"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Clubs
                      </Link>
                      <Link
                        href="/non-academics/houses"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Houses
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mandatory Disclosure Mobile Dropdown */}
                <div className="w-full">
                  <button
                    className="flex items-center justify-between w-full px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                    onClick={() => handleMobileDropdown("disclosure")}
                  >
                    Mandatory Disclosure
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeMobileDropdown === "disclosure"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeMobileDropdown === "disclosure"
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gray-50 border-l-2 border-[#0D47A1] ml-4">
                      <Link
                        href="/documents/disclosure"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Mandatory Disclosure
                      </Link>
                      <Link
                        href="/documents/fee-structure"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Fee Structure
                      </Link>
                      <Link
                        href="/documents/tc"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        TC
                      </Link>
                      <Link
                        href="/documents/newsLetter"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Annual News Letter
                      </Link>
                      <Link
                        href="/documents/associations"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        PTA
                      </Link>
                      <Link
                        href="/documents/sister-concerns"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Sister Concerns
                      </Link>
                      <Link
                        href="/documents/textbooks-list"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        List of text books
                      </Link>
                      <Link
                        href="/documents/school-uniforms"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        School Uniforms
                      </Link>
                      <Link
                        href="/documents/bus-information"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Bus Route
                      </Link>
                      <Link
                        href="/documents/general-rules"
                        className="block px-8 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        General Rules
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Gallery - Simple Link */}
                <Link
                  href="/gallery"
                  className="block w-full px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Gallery
                </Link>

                {/* Contact Us - Simple Link */}
                <Link
                  href="/contact-us"
                  className="block w-full px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>

                {/* Admission Form Button */}
                <div className="px-6 pt-4 w-full">
                  <Link
                    href="/admission"
                    className="block w-full bg-[#0D47A1] text-white px-6 py-3 font-semibold rounded-lg hover:bg-[#0D47A1]/90 transition-all duration-200 text-center transform hover:scale-105"
                    onClick={closeMobileMenu}
                  >
                    Admission Form
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
