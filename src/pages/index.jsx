import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import QuickInformation from "@/components/QuickInformation";
import SchoolEvents from "@/components/SchoolEvents";
import LeadersMessages from "@/components/LeadersMessages";
import Gallery from "@/components/Gallery";
import AnnouncementBoard from "@/components/AnnouncementBoard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Scroll-reveal component using IntersectionObserver
function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  from = "up",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const hiddenTransform =
    from === "left"
      ? "-translate-x-8"
      : from === "right"
        ? "translate-x-8"
        : from === "down"
          ? "-translate-y-8"
          : "translate-y-8";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${hiddenTransform}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sbcs.edu.in";
  const seoDescription =
    "Sree Narayana Public School in Kollam — nurturing minds since 1997. Admissions, academics, facilities and community-focused education.";
  
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Hero section skeleton
  const HeroSkeleton = () => (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Skeleton
          height="100%"
          width="100%"
          containerClassName="h-full"
          baseColor="#0A2348"
          highlightColor="#123C73"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#123C73]/90 via-[#123C73]/60 to-[#123C73]/40" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <Skeleton 
            height={40} 
            width={200} 
            className="mx-auto mb-8 rounded-full" 
            baseColor="#123C73" 
            highlightColor="#1a5099" 
          />
          <Skeleton 
            height={100} 
            width={600} 
            className="mx-auto mb-6" 
            baseColor="#123C73" 
            highlightColor="#1a5099" 
          />
          <Skeleton 
            height={100} 
            width={400} 
            className="mx-auto mb-12" 
            baseColor="#123C73" 
            highlightColor="#1a5099" 
          />
          <div className="flex gap-4 justify-center">
            <Skeleton 
              height={56} 
              width={200} 
              className="rounded-2xl" 
              baseColor="#F4C430" 
              highlightColor="#FFD95A" 
            />
            <Skeleton 
              height={56} 
              width={200} 
              className="rounded-2xl" 
              baseColor="#123C73" 
              highlightColor="#1a5099" 
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <Head>
        <title>Sree Narayana Public School (SNPS) — Kollam</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="Sree Narayana Public School, SNPS, schools in Kollam, Kollam" />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sree Narayana Public School" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.svg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sree Narayana Public School" />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.svg`} />

        <link rel="sitemap" type="application/xml" href={`${siteUrl}/sitemap.xml`} />

        {/* JSON-LD Organization */}
        <script
          key="ldjson"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Sree Narayana Public School",
              alternateName: ["Sree Narayana Public School", "SNPS"],
              url: siteUrl,
              logo: `${siteUrl}/favicon.png`,
              contactPoint: [{
                "@type": "ContactPoint",
                telephone: "",
                contactType: "Admissions",
                areaServed: "IN"
              }],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kizhavoor, Mukhathala",
                addressLocality: "Kollam",
                addressRegion: "Kerala",
                postalCode: "691577",
                addressCountry: "IN",
              },
            }),
          }}
        />
        
        {/* FAQ JSON-LD */}
        <script
          key="faq-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do I apply for admission at Sree Narayana Public School (SNPS)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Visit our Admissions page for the latest admission form, eligibility criteria and application deadlines. You can also contact the school office for assistance."
                  }
                },
                {
                  "@type": "Question",
                  name: "Where is Sree Narayana Public School located?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "SNPS is located in Kizhavoor, Mukhathala, Kollam, Kerala (PIN 691577)."
                  }
                },
                {
                  "@type": "Question",
                  name: "What classes and curriculum does SNPS offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sree Narayana Public School offers pre-primary to senior secondary education following a balanced curriculum focused on academics, co-curricular activities and character development."
                  }
                }
              ]
            }),
          }}
        />
      </Head>

      {/* ============================================ */}
      {/* HERO SECTION WITH VIDEO PLACEHOLDER */}
      {/* ============================================ */}
      <div className="relative h-screen overflow-hidden">
        {isLoading ? (
          <HeroSkeleton />
        ) : (
          <>
            {/* Video Background */}
            <div className="absolute inset-0 bg-[#0A2348]">
              {/* Video Placeholder - Replace src with actual video URL */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover opacity-60"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/hero-poster.jpg" // Add a poster image for loading state
              >
                {/* 
                  PLACEHOLDER: Replace with actual school video
                  <source src="/assets/school-tour.mp4" type="video/mp4" />
                  <source src="/assets/school-tour.webm" type="video/webm" />
                */}
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#123C73]/95 via-[#123C73]/70 to-[#123C73]/40"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/40 via-transparent to-transparent"></div>
              
              {/* Grid Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '60px 60px'
                }}
              ></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-5xl mx-auto">
                {/* Top Badge */}
                <div className="animate-fade-in-up">
                  <div className="inline-flex items-center px-6 py-3 bg-[#F4C430]/10 backdrop-blur-md rounded-full border border-[#F4C430]/20 mb-8">
                    <div className="w-3 h-3 bg-[#F4C430] rounded-full mr-3 animate-pulse"></div>
                    <span className="text-[#F4C430] font-semibold tracking-wider text-sm uppercase">
                      Established 1997
                    </span>
                  </div>
                </div>

                {/* Main Heading */}
                <h1 className="animate-fade-in-up animation-delay-200">
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
                    Sree Narayana
                  </span>
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#F4C430] via-[#FFD95A] to-[#F4C430] bg-clip-text text-transparent mb-6">
                    Public School
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="animate-fade-in-up animation-delay-400 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                  Nurturing minds, building character, and fostering excellence 
                  through values of kindness, humanism, and equality
                </p>

                {/* CTA Buttons */}
                <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="/admission"
                    className="group px-8 py-4 bg-[#F4C430] text-[#123C73] font-bold rounded-2xl hover:bg-[#FFD95A] transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#F4C430]/20 text-lg"
                  >
                    Admissions Open 2025
                    <svg
                      className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                  <a
                    href="/the-school/objectives"
                    className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl hover:bg-white/20 border-2 border-white/30 transition-all duration-300 hover:scale-105 text-lg"
                  >
                    Explore Our School
                  </a>
                </div>
              </div>
            </div>

            {/* Announcement Board - Bottom Left */}
            <div className="absolute bottom-8 left-8 z-30 animate-fade-in-up animation-delay-800">
              <AnnouncementBoard />
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
              <div className="animate-bounce">
                <div className="w-10 h-16 border-2 border-white/30 rounded-full flex justify-center p-2">
                  <div className="w-2 h-2 bg-[#F4C430] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ============================================ */}
      {/* MAIN CONTENT SECTIONS */}
      {/* ============================================ */}
      <div className="bg-[#F7F9FC]">
        {/* Welcome Section */}
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#F7F9FC] to-white py-16 lg:py-24">
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-[#123C73]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F4C430]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Column - Text Content */}
                <div className="text-center lg:text-left space-y-8">
                  <Reveal delay={100}>
                    <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                      <div className="w-2.5 h-2.5 bg-[#F4C430] rounded-full mr-3"></div>
                      <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                        Welcome to SNPS
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={200}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1B1F24]">
                      Shaping Future
                      <br />
                      <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                        Leaders
                      </span>
                      {" "}Today
                    </h2>
                  </Reveal>

                  <Reveal delay={300}>
                    <p className="text-lg md:text-xl text-[#667085] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      At Sree Narayana Public School, we believe in nurturing 
                      young minds with values of{" "}
                      <span className="text-[#123C73] font-semibold">
                        compassion, integrity, and academic excellence
                      </span>
                      .
                    </p>
                  </Reveal>

                  <Reveal delay={400}>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6">
                      <div className="text-center">
                        <div className="text-3xl md:text-5xl font-extrabold text-[#123C73] mb-1">
                          3,500+
                        </div>
                        <div className="text-sm text-[#667085] font-medium uppercase tracking-wider">
                          Students
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl md:text-5xl font-extrabold text-[#123C73] mb-1">
                          140+
                        </div>
                        <div className="text-sm text-[#667085] font-medium uppercase tracking-wider">
                          Teachers
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl md:text-5xl font-extrabold text-[#123C73] mb-1">
                          25+
                        </div>
                        <div className="text-sm text-[#667085] font-medium uppercase tracking-wider">
                          Years
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={500}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                      <a
                        href="/admission"
                        className="group inline-flex items-center justify-center px-8 py-4 bg-[#123C73] text-white font-semibold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 hover:shadow-xl hover:shadow-[#123C73]/20 hover:-translate-y-1"
                      >
                        Apply for Admission
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                      <a
                        href="/the-school/objectives"
                        className="group inline-flex items-center justify-center px-8 py-4 bg-[#FCFCFD] text-[#123C73] font-semibold rounded-2xl border-2 border-[#123C73]/20 hover:border-[#123C73] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        Learn More
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </Reveal>
                </div>

                {/* Right Column - Image */}
                <div className="relative">
                  <Reveal delay={600} from="right">
                    <div className="relative">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#123C73]/10 transform hover:rotate-1 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#123C73]/10 to-[#F4C430]/10"></div>
                        <div
                          className="h-96 lg:h-[550px] bg-cover bg-center"
                          style={{
                            backgroundImage: `url('/guru.png')`,
                          }}
                        />
                        
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#123C73]/10">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#123C73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-bold text-[#1B1F24]">Excellence in Education</h3>
                                <p className="text-sm text-[#667085]">Empowering students since 1997</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#F4C430] rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                        <span className="text-3xl">🎓</span>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Quick Information Section */}
        <Reveal>
          <QuickInformation />
        </Reveal>

        {/* School Events Section */}
        <Reveal>
          <SchoolEvents />
        </Reveal>

        {/* Leaders Messages Section */}
        <Reveal delay={100}>
          <LeadersMessages />
        </Reveal>

        {/* Gallery Section */}
        <Reveal>
          <Gallery />
        </Reveal>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
}