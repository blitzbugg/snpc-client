import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import QuickInformation from "@/components/QuickInformation";
import SchoolEvents from "@/components/SchoolEvents";
import LeadersMessages from "@/components/LeadersMessages";
import Gallery from "@/components/Gallery";
import AnnouncementBoard from "@/components/AnnouncementBoard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch images from Payload CMS
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/image`
        );
        const data = await response.json();

        if (data.docs?.length > 0) {
          const imageUrls = data.docs
            .map((doc) => doc.photo?.url)
            .filter(Boolean);

          setImages(
            imageUrls.length > 0
              ? imageUrls
              : [
                  "/school-front.png",
                  "/biology-lab.png",
                  "/digital-class-room.png",
                ]
          );
        } else {
          setImages([
            "/school-front.png",
            "/biology-lab.png",
            "/digital-class-room.png",
          ]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([
          "/school-front.png",
          "/biology-lab.png",
          "/digital-class-room.png",
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Image carousel effect
  useEffect(() => {
    if (images.length <= 1 || isLoading) return;
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images.length, isLoading]);

  // Shimmer/Skeleton component for hero section
  const HeroSkeleton = () => (
    <div className="relative h-[80vh] md:h-[85vh] overflow-hidden rounded-3xl">
      <div className="absolute inset-0">
        <Skeleton
          height="100%"
          width="100%"
          containerClassName="h-full"
          className="rounded-3xl"
          baseColor="#E8EDF5"
          highlightColor="#F7F9FC"
        />
        <div className="absolute inset-0 bg-[#123C73]/20 pointer-events-none rounded-3xl" />
      </div>

      <div className="relative z-10 h-full flex items-end justify-start p-6 md:p-8 lg:p-10">
        <div className="relative z-30">
          <AnnouncementBoard />
        </div>
      </div>

      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20">
        <Skeleton height={56} width={56} circle baseColor="#E8EDF5" highlightColor="#F7F9FC" />
      </div>
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20">
        <Skeleton height={56} width={56} circle baseColor="#E8EDF5" highlightColor="#F7F9FC" />
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        <Skeleton height={12} width={12} circle baseColor="#E8EDF5" highlightColor="#F7F9FC" />
        <Skeleton height={12} width={12} circle baseColor="#E8EDF5" highlightColor="#F7F9FC" />
        <Skeleton height={12} width={12} circle baseColor="#E8EDF5" highlightColor="#F7F9FC" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <Head>
        <title>Sree Narayana Public School (SNPS) — Kollam</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="Sree Narayana Public School, Sree Narayana Public School, SNPS, SNPS, Sree Narayana, sbcs, sbcs school, central school, schools in Kollam, Kollam" />
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
              alternateName: ["Sree Narayana Public School", "SNPS", "SNPS", "Sree Narayana", "SNPS School", "SNPS School"],
              url: siteUrl,
              logo: `${siteUrl}/favicon.png`,
              sameAs: [],
              contactPoint: [{
                "@type": "ContactPoint",
                telephone: "",
                contactType: "Admissions",
                areaServed: "IN"
              }],
              keywords: ["Sree Narayana Public School", "Sree Narayana Public School", "SNPS", "SNPS", "Sree Narayana", "sbcs", "schools in Kollam"],
              areaServed: {
                "@type": "Place",
                name: "Kollam"
              },
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
                    text: "Visit our Admissions page for the latest admission form, eligibility criteria and application deadlines. You can also contact the school office at 8891720292 for assistance."
                  }
                },
                {
                  "@type": "Question",
                  name: "Where is Sree Narayana Public School located?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "SNPS is located in Kizhavoor, Mukhathala, Kollam, Kerala (PIN 691577). For directions, see the Contact page or use the plus code WGQF+5P."
                  }
                },
                {
                  "@type": "Question",
                  name: "What classes and curriculum does SNPS offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sree Narayana Public School offers pre-primary to senior secondary education following a balanced curriculum focused on academics, co-curricular activities and character development. Check the Academics section for details."
                  }
                }
              ]
            }),
          }}
        />
      </Head>

      {/* Hero Section with Background Video */}
      <div className="relative">
        {isLoading ? (
          <HeroSkeleton />
        ) : (
          <>
            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden rounded-b-[4rem]">
              <video
                src="/assets/herovideo.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#123C73]/90 via-[#123C73]/60 to-[#123C73]/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/20 via-transparent to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 h-[80vh] md:h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-5xl mx-auto">
                {/* Decorative badge */}
                <div className="inline-flex items-center px-6 py-3 bg-[#F4C430]/10 backdrop-blur-md rounded-full border border-[#F4C430]/20 mb-8 animate-fade-in">
                  <div className="w-3 h-3 bg-[#F4C430] rounded-full mr-3 animate-pulse"></div>
                  <span className="text-[#F4C430] font-semibold tracking-wider text-sm uppercase">
                    Established 1997
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="block">Sree Narayana</span>
                  <span className="block mt-4 bg-gradient-to-r from-[#F4C430] via-[#FFD95A] to-[#F4C430] bg-clip-text text-transparent">
                    Public School
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-light">
                  Nurturing minds, building character, and fostering excellence 
                  through values of kindness, humanism, and equality
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            <div className="absolute bottom-8 left-8 z-30">
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

      <div className="bg-[#F7F9FC]">
        {/* Welcome Section */}
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#F7F9FC] to-white py-16 lg:py-24">
            {/* Decorative background elements */}
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
                        Welcome to SNPC
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
                      {/* Main Image with decorative frame */}
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#123C73]/10 transform hover:rotate-1 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#123C73]/10 to-[#F4C430]/10"></div>
                        <div
                          className="h-96 lg:h-[550px] bg-cover bg-center"
                          style={{
                            backgroundImage: `url('/guru.png')`,
                          }}
                        />
                        
                        {/* Floating Card */}
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

                      {/* Decorative Elements */}
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

        <Reveal>
          <QuickInformation />
        </Reveal>

        {/* About Us Section */}
        <div id="about-us" className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] py-16 lg:py-24 overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-64 h-64 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-[#F4C430] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <Reveal>
                <div className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                  <div className="w-2.5 h-2.5 bg-[#F4C430] rounded-full mr-3 animate-pulse"></div>
                  <span className="text-[#F4C430] font-semibold text-sm tracking-wider uppercase">
                    Our Story
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  About{" "}
                  <span className="text-[#F4C430]">Sree Narayana</span>
                  <br />
                  Public School
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Quality education for social justice since 1997
                </p>
              </Reveal>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column */}
              <div className="space-y-8">
                <Reveal delay={300}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#123C73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      Our History
                    </h3>
                    <p className="text-lg text-white/80 leading-relaxed">
                      Sree Narayana Public School, Kollam was established in 1997 
                      under the management of the International Social Cultural and 
                      Educational Society. The school was taken over by Sree Narayana 
                      Educational Society in 2007, continuing the legacy of excellence 
                      in education.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <Reveal delay={400}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#123C73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      Our Campus
                    </h3>
                    <p className="text-lg text-white/80 leading-relaxed mb-6">
                      Located in a beautiful and spacious 3-acre campus just 3km 
                      from Kottiyam and 2km from Mukhathala. From Kollam city, 
                      the distance is approximately 12km.
                    </p>
                    <p className="text-lg text-white/80 leading-relaxed mb-8">
                      The campus features modern buildings, a beautiful garden, 
                      and extensive playgrounds with scenic paddy fields as a backdrop.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white/10 rounded-2xl">
                        <div className="text-2xl md:text-4xl font-extrabold text-[#F4C430] mb-1">
                          1997
                        </div>
                        <div className="text-xs text-white/70 font-medium uppercase tracking-wider">
                          Founded
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-2xl">
                        <div className="text-2xl md:text-4xl font-extrabold text-[#F4C430] mb-1">
                          3
                        </div>
                        <div className="text-xs text-white/70 font-medium uppercase tracking-wider">
                          Acres
                        </div>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-2xl">
                        <div className="text-2xl md:text-4xl font-extrabold text-[#F4C430] mb-1">
                          12km
                        </div>
                        <div className="text-xs text-white/70 font-medium uppercase tracking-wider">
                          From City
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={500}>
                  <a
                    href="/the-school/objectives"
                    className="group inline-flex items-center justify-center w-full px-8 py-4 bg-[#F4C430] text-[#123C73] font-bold rounded-2xl hover:bg-[#FFD95A] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    Discover Our Story
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </div>

        {/* Foundation Section */}
        <Reveal>
          <div className="relative bg-gradient-to-br from-[#F7F9FC] via-white to-[#F7F9FC] py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 right-10 w-64 h-64 bg-[#F4C430]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#123C73]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Column */}
                <div className="text-left space-y-8">
                  <Reveal>
                    <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                      <div className="w-2.5 h-2.5 bg-[#F4C430] rounded-full mr-3"></div>
                      <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                        Our Foundation
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={100}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B1F24] leading-tight">
                      Aims &{" "}
                      <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                        Objectives
                      </span>
                    </h2>
                  </Reveal>

                  <Reveal delay={200}>
                    <p className="text-xl text-[#667085] leading-relaxed">
                      Founded in 1997 with the specific objective of materialising 
                      Sree Narayana Guru's exhortation, 
                      <span className="text-[#123C73] font-semibold italic"> "Educate to Enlightenment"</span>.
                    </p>
                  </Reveal>

                  <Reveal delay={300}>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-[#123C73]/5">
                        <div className="text-2xl md:text-4xl font-extrabold text-[#123C73] mb-2">
                          1997
                        </div>
                        <div className="text-xs text-[#667085] font-medium uppercase tracking-wider">
                          Founded
                        </div>
                      </div>
                      <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-[#123C73]/5">
                        <div className="text-2xl md:text-4xl font-extrabold text-[#123C73] mb-2">
                          CBSE
                        </div>
                        <div className="text-xs text-[#667085] font-medium uppercase tracking-wider">
                          Affiliated
                        </div>
                      </div>
                      <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-[#123C73]/5">
                        <div className="text-2xl md:text-4xl font-extrabold text-[#123C73] mb-2">
                          SNES
                        </div>
                        <div className="text-xs text-[#667085] font-medium uppercase tracking-wider">
                          Management
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Right Column */}
                <Reveal delay={400}>
                  <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-[#123C73]/5 border border-[#123C73]/10">
                    <h3 className="text-2xl font-bold text-[#1B1F24] mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#123C73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      Our Vision
                    </h3>

                    <p className="text-[#667085] leading-relaxed mb-6">
                      Free from discrimination of all sorts- social, cultural, 
                      religious, economic, the non-profit charitable society launched 
                      the school with a commitment to establishing social equality 
                      through quality education.
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#F4C430] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-[#123C73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-[#667085]">
                          <strong className="text-[#1B1F24]">Fraternity:</strong> Making our school an ideal institution where fraternity prevails.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#F4C430] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-[#123C73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-[#667085]">
                          <strong className="text-[#1B1F24]">Integration:</strong> Instilling fundamental human values and national integration.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#F4C430] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-4 h-4 text-[#123C73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-[#667085]">
                          <strong className="text-[#1B1F24]">Preparedness:</strong> Equipping learners with academic preparedness for ambitious careers.
                        </p>
                      </div>
                    </div>

                    <div className="border-t-2 border-[#F7F9FC] pt-6">
                      <p className="text-[#667085] italic text-center">
                        "May the radiance of the Guru guide us to these goals."
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <SchoolEvents />
        </Reveal>

        <Reveal delay={100}>
          <LeadersMessages />
        </Reveal>

        {/* Quote Section */}
        <Reveal>
          <div className="relative bg-gradient-to-r from-[#123C73] to-[#0A2348] py-16 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-48 h-48 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 border-2 border-[#F4C430] rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <figure className="text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-8 text-[#F4C430]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 14"
                >
                  <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                </svg>

                <blockquote>
                  <p className="text-2xl md:text-3xl italic font-light text-white leading-relaxed">
                    "Together, we are building a foundation for excellence that
                    will last generations"
                  </p>
                </blockquote>

                <figcaption className="flex items-center justify-center mt-8 space-x-3">
                  <div className="h-px w-12 bg-[#F4C430]"></div>
                  <div className="flex items-center divide-x-2 divide-[#F4C430]/30">
                    <cite className="px-3 font-medium text-white text-lg">
                      Our Shared Vision
                    </cite>
                    <cite className="px-3 text-[#F4C430]">
                      for Sree Narayana Public School
                    </cite>
                  </div>
                  <div className="h-px w-12 bg-[#F4C430]"></div>
                </figcaption>
              </figure>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <Gallery />
        </Reveal>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
} 