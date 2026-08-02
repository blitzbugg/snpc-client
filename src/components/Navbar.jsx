import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Youtube,
  GraduationCap,
  School,
  Award,
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [excellenceImage, setExcellenceImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  // Fetch excellence image from backend
  useEffect(() => {
    const fetchExcellenceImage = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/excellence-image`);
        if (!response.ok) throw new Error('Failed to fetch image');
        const data = await response.json();
        
        // Get the active image document
        const activeImage = data.docs?.find(doc => doc.isActive);
        if (activeImage?.photo?.url) {
          setExcellenceImage(activeImage.photo.url);
        }
      } catch (err) {
        console.error('Error fetching excellence image:', err);
        // Fallback to static image if API fails
        setExcellenceImage('/excellence.png');
      } finally {
        setImageLoading(false);
      }
    };

    fetchExcellenceImage();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  // Excellence Image Placeholder Component
  const ExcellenceImagePlaceholder = () => (
    <div className="h-11 md:h-13 lg:h-15 xl:h-18 w-auto aspect-[4/3] bg-[#123C73]/5 rounded-xl flex items-center justify-center animate-pulse">
      <Award className="w-8 h-8 text-[#123C73]/20" />
    </div>
  );

  // Mobile Excellence Image Placeholder
  const MobileExcellenceImagePlaceholder = () => (
    <div className="h-14 w-auto aspect-[4/3] bg-[#123C73]/5 rounded-xl flex items-center justify-center animate-pulse">
      <Award className="w-6 h-6 text-[#123C73]/20" />
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile Header */}
      <div className="xl:hidden">
        {/* Top Layer - Logos */}
        <div className="bg-[#F7F9FC] px-4 py-3 flex items-center justify-center border-b border-[#123C73]/5">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img
                src="/logo.png"
                alt="School Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            {/* Excellence Image - Mobile */}
            {imageLoading ? (
              <MobileExcellenceImagePlaceholder />
            ) : excellenceImage ? (
              <img
                src={excellenceImage}
                alt="Sree Narayana Public School"
                className="h-14 w-auto object-contain"
                onError={(e) => {
                  e.target.src = '/excellence.png';
                }}
              />
            ) : (
              <MobileExcellenceImagePlaceholder />
            )}
          </div>
        </div>

        {/* Bottom Layer - Contact Info and Menu */}
        <div className="bg-[#123C73] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Contact Info */}
            <div className="flex items-center gap-4 text-white text-sm">
              <Link
                href="tel:8891720292"
                className="flex items-center gap-1.5 hover:text-[#F4C430] transition-colors"
                aria-label="Call us at 8891720292"
              >
                <Phone className="w-4 h-4" />
                <span>8891720292</span>
              </Link>
              <Link
                href="mailto:indianpublicschoolkollam@gmail.com"
                className="flex items-center gap-1.5 hover:text-[#F4C430] transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Link>
            </div>

            {/* Hamburger Menu */}
            <button
              className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
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
      <div className="hidden xl:block bg-gradient-to-r from-white to-[#F7F9FC] px-4 lg:px-6 shadow-lg relative overflow-hidden border-b border-[#123C73]/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10 py-2">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <img
                src="/logo.jpg"
                alt="School Logo"
                className="h-12 md:h-14 lg:h-16 xl:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="h-10 w-px bg-[#123C73]/10"></div>
            {/* Excellence Image - Desktop */}
            {imageLoading ? (
              <ExcellenceImagePlaceholder />
            ) : excellenceImage ? (
              <img
                src={excellenceImage}
                alt="Sree Narayana Public School"
                className="h-11 md:h-13 lg:h-15 xl:h-18 w-auto object-contain"
                onError={(e) => {
                  e.target.src = '/excellence.png';
                }}
              />
            ) : (
              <ExcellenceImagePlaceholder />
            )}
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-6 lg:gap-10 text-[#123C73]">
            {/* Phone */}
            <Link
              href="tel:8891720292"
              aria-label="Call us"
              className="group flex items-start gap-3 hover:text-[#0A2348] transition-colors"
            >
              <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center group-hover:bg-[#123C73]/10 transition-colors">
                <Phone className="w-5 h-5 text-[#123C73]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#667085] mb-0.5">Phone</span>
                <span className="text-sm font-semibold">8891720292</span>
              </div>
            </Link>

            {/* Email */}
            <Link
              href="mailto:indianpublicschoolkollam@gmail.com"
              aria-label="Email us"
              className="group flex items-start gap-3 hover:text-[#0A2348] transition-colors"
            >
              <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center group-hover:bg-[#123C73]/10 transition-colors">
                <Mail className="w-5 h-5 text-[#123C73]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#667085] mb-0.5">Email</span>
                <span className="text-sm font-semibold break-all">
                  indianpublicschoolkollam@gmail.com
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <nav className="hidden xl:block bg-[#123C73] shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-1 md:px-2 lg:px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-0.5 md:space-x-1">
              {/* The School Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center px-2 md:px-3 lg:px-4 py-3.5 text-white hover:bg-white/10 transition-all duration-200 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap rounded-lg"
                  onClick={() => handleDropdown("foundation")}
                >
                  <School className="w-4 h-4 mr-1.5 hidden lg:block" />
                  The School
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-2xl rounded-2xl py-4 w-72 z-50 border border-[#123C73]/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <div className="px-4 py-2 border-b border-[#123C73]/5 mb-2">
                    <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">School Info</p>
                  </div>
                  <Link href="/#about-us" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>About Us</Link>
                  <Link href="/the-school/achievements" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Achievements</Link>
                  <Link href="/the-school/administration" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Administration</Link>
                  <Link href="/the-school/management" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>SMC</Link>
                  <Link href="/the-school/messages" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Chairman's & Principal's Messages</Link>
                  <Link href="/the-school/school-assembly" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>School Assembly</Link>
                  <Link href="/admission" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Admission</Link>
                  <Link href="/the-school/objectives" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Objectives</Link>
                  <Link href="/the-school/missionandvission" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Mission & Vision</Link>
                </div>
              </div>

              {/* Facilities Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center px-2 md:px-3 lg:px-4 py-3.5 text-white hover:bg-white/10 transition-all duration-200 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap rounded-lg"
                  onClick={() => handleDropdown("Facilities")}
                >
                  Facilities
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-2xl rounded-2xl py-4 w-56 z-50 border border-[#123C73]/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <div className="px-4 py-2 border-b border-[#123C73]/5 mb-2">
                    <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Campus Facilities</p>
                  </div>
                  <Link href="/facilities/smartclass" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Smart Class</Link>
                  <Link href="/facilities/library" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Library</Link>
                  <Link href="/facilities/labs" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Labs</Link>
                  <Link href="/facilities/atl" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>ATL</Link>
                  <Link href="/facilities/auditorium" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Auditorium</Link>
                  <Link href="/facilities/conferencehall" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Conference Hall</Link>
                  <Link href="/facilities/playground" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Playground</Link>
                  <Link href="/facilities/sportsroom" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Sports Room</Link>
                </div>
              </div>

              {/* Academic Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center px-2 md:px-3 lg:px-4 py-3.5 text-white hover:bg-white/10 transition-all duration-200 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap rounded-lg"
                  onClick={() => handleDropdown("academic")}
                >
                  <GraduationCap className="w-4 h-4 mr-1.5 hidden lg:block" />
                  Academic
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-2xl rounded-2xl py-4 w-64 z-50 border border-[#123C73]/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <div className="px-4 py-2 border-b border-[#123C73]/5 mb-2">
                    <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Academic Sections</p>
                  </div>
                  <Link href="/academics/preprimary" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Pre-Primary</Link>
                  <Link href="/academics/primary" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Primary</Link>
                  <Link href="/academics/secondary" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Secondary</Link>
                  <Link href="/academics/seniorSecondary" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Senior Secondary</Link>
                  <Link href="/academics/yearPlanAndReport" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Academic Calendar</Link>
                  <Link href="/academics/result" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Results</Link>
                </div>
              </div>

              {/* Departments Link */}
              <Link href="/departments" className="px-2 md:px-3 lg:px-4 py-3.5 text-white hover:bg-white/10 transition-all duration-200 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap rounded-lg">
                Departments
              </Link>

              {/* Non-Academic Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center px-2 md:px-3 lg:px-4 py-3.5 text-white hover:bg-white/10 transition-all duration-200 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap rounded-lg"
                  onClick={() => handleDropdown("nonacademic")}
                >
                  Non-Academic
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-2xl rounded-2xl py-4 w-56 z-50 border border-[#123C73]/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <div className="px-4 py-2 border-b border-[#123C73]/5 mb-2">
                    <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Activities</p>
                  </div>
                  <Link href="/non-academics/events" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Events</Link>
                  <Link href="/non-academics/clubs" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Clubs</Link>
                  <Link href="/non-academics/houses" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Houses</Link>
                </div>
              </div>

              {/* Mandatory Disclosure Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center px-2 md:px-3 lg:px-4 py-3.5 text-white hover:bg-white/10 transition-all duration-200 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap rounded-lg"
                  onClick={() => handleDropdown("disclosure")}
                >
                  Disclosure
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 bg-white shadow-2xl rounded-2xl py-4 w-64 z-50 border border-[#123C73]/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <div className="px-4 py-2 border-b border-[#123C73]/5 mb-2">
                    <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Documents</p>
                  </div>
                  <Link href="/documents/disclosure" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Mandatory Disclosure</Link>
                  <Link href="/documents/fee-structure" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Fee Structure</Link>
                  <Link href="/documents/tc" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>TC</Link>
                  <Link href="/documents/newsLetter" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Annual News Letter</Link>
                  <Link href="/documents/associations" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>PTA</Link>
                  <Link href="/documents/sister-concerns" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Sister Concerns</Link>
                  <Link href="/documents/textbooks-list" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Text Books List</Link>
                  <Link href="/documents/school-uniforms" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>School Uniforms</Link>
                  <Link href="/documents/bus-information" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Bus Route</Link>
                  <Link href="/documents/general-rules" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>General Rules</Link>
                  <Link href="/documents/Appendix" className="flex items-center px-4 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-[#F7F9FC] transition-all duration-200 text-sm" onClick={closeDropdown}>Appendix</Link>
                </div>
              </div>

              {/* Gallery Link */}
              <Link href="/gallery" className="px-2 md:px-3 lg:px-4 py-3.5 text-white hover:bg-white/10 transition-all duration-200 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap rounded-lg">
                Gallery
              </Link>
            </div>

            {/* Admission Form Button */}
            <div className="ml-auto pl-2">
              <Link
                href="/admission"
                className="bg-[#F4C430] text-[#123C73] px-4 md:px-5 lg:px-6 py-2 md:py-2.5 font-bold hover:bg-[#FFD95A] transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#F4C430]/20 transform hover:scale-105 text-xs md:text-sm lg:text-base whitespace-nowrap flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Admission Form
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeMobileMenu}
          ></div>
          <div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl overflow-y-auto"
            style={{ animation: "slideInRight 0.3s ease-in-out" }}
          >
            <div className="flex items-center justify-between p-4 border-b border-[#123C73]/10 bg-[#F7F9FC]">
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-[#123C73]" />
                <h2 className="text-[#123C73] text-lg font-bold">Menu</h2>
              </div>
              <button
                onClick={closeMobileMenu}
                className="text-[#123C73] p-2 hover:bg-[#123C73]/5 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-2">
              <div className="space-y-0.5 flex flex-col">
                <MobileDropdown title="The School" icon={<School className="w-4 h-4" />} isOpen={activeMobileDropdown === "foundation"} onClick={() => handleMobileDropdown("foundation")}
                  links={[
                    { href: "/#about-us", label: "About Us" }, { href: "/the-school/achievements", label: "Achievements" },
                    { href: "/the-school/administration", label: "Administration" }, { href: "/the-school/management", label: "SMC" },
                    { href: "/the-school/messages", label: "Messages" }, { href: "/the-school/school-assembly", label: "School Assembly" },
                    { href: "/admission", label: "Admission" }, { href: "/the-school/objectives", label: "Objectives" },
                    { href: "/the-school/missionandvission", label: "Mission & Vision" },
                  ]} onLinkClick={closeMobileMenu} />
                <MobileDropdown title="Facilities" isOpen={activeMobileDropdown === "Facilities"} onClick={() => handleMobileDropdown("Facilities")}
                  links={[
                    { href: "/facilities/smartclass", label: "Smart Class" }, { href: "/facilities/library", label: "Library" },
                    { href: "/facilities/labs", label: "Labs" }, { href: "/facilities/atl", label: "ATL" },
                    { href: "/facilities/auditorium", label: "Auditorium" }, { href: "/facilities/conferencehall", label: "Conference Hall" },
                    { href: "/facilities/playground", label: "Playground" }, { href: "/facilities/sportsroom", label: "Sports Room" },
                  ]} onLinkClick={closeMobileMenu} />
                <MobileDropdown title="Academic" icon={<GraduationCap className="w-4 h-4" />} isOpen={activeMobileDropdown === "academic"} onClick={() => handleMobileDropdown("academic")}
                  links={[
                    { href: "/academics/preprimary", label: "Pre-Primary" }, { href: "/academics/primary", label: "Primary" },
                    { href: "/academics/secondary", label: "Secondary" }, { href: "/academics/seniorSecondary", label: "Senior Secondary" },
                    { href: "/academics/yearPlanAndReport", label: "Academic Calendar" }, { href: "/academics/result", label: "Results" },
                  ]} onLinkClick={closeMobileMenu} />
                <MobileLink href="/departments" label="Departments" onClick={closeMobileMenu} />
                <MobileDropdown title="Non-Academic" isOpen={activeMobileDropdown === "nonacademic"} onClick={() => handleMobileDropdown("nonacademic")}
                  links={[
                    { href: "/non-academics/events", label: "Events" }, { href: "/non-academics/clubs", label: "Clubs" },
                    { href: "/non-academics/houses", label: "Houses" },
                  ]} onLinkClick={closeMobileMenu} />
                <MobileDropdown title="Disclosure" isOpen={activeMobileDropdown === "disclosure"} onClick={() => handleMobileDropdown("disclosure")}
                  links={[
                    { href: "/documents/disclosure", label: "Mandatory Disclosure" }, { href: "/documents/fee-structure", label: "Fee Structure" },
                    { href: "/documents/tc", label: "TC" }, { href: "/documents/newsLetter", label: "Annual News Letter" },
                    { href: "/documents/associations", label: "PTA" }, { href: "/documents/sister-concerns", label: "Sister Concerns" },
                    { href: "/documents/textbooks-list", label: "Text Books List" }, { href: "/documents/school-uniforms", label: "School Uniforms" },
                    { href: "/documents/bus-information", label: "Bus Route" }, { href: "/documents/general-rules", label: "General Rules" },
                  ]} onLinkClick={closeMobileMenu} />
                <MobileLink href="/gallery" label="Gallery" onClick={closeMobileMenu} />
                <MobileLink href="/contact-us" label="Contact Us" onClick={closeMobileMenu} />
                <div className="px-4 pt-4 pb-6">
                  <Link href="/admission" className="flex items-center justify-center gap-2 w-full bg-[#F4C430] text-[#123C73] px-6 py-3.5 font-bold rounded-xl hover:bg-[#FFD95A] transition-all duration-200 text-center shadow-lg" onClick={closeMobileMenu}>
                    <GraduationCap className="w-5 h-5" />
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

// Mobile Dropdown Component
const MobileDropdown = ({ title, icon, isOpen, onClick, links, onLinkClick }) => (
  <div className="w-full">
    <button
      className="flex items-center justify-between w-full px-6 py-3.5 text-[#1B1F24] hover:bg-[#F7F9FC] transition-colors font-medium"
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {icon}
        {title}
      </span>
      <ChevronDown className={`w-4 h-4 text-[#667085] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="bg-[#F7F9FC] border-l-2 border-[#F4C430] ml-6">
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="block px-6 py-2.5 text-[#667085] hover:text-[#123C73] hover:bg-white transition-colors text-sm" onClick={onLinkClick}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

// Mobile Link Component
const MobileLink = ({ href, label, onClick }) => (
  <Link href={href} className="flex items-center w-full px-6 py-3.5 text-[#1B1F24] hover:bg-[#F7F9FC] transition-colors font-medium" onClick={onClick}>
    {label}
  </Link>
);

export default Navbar;