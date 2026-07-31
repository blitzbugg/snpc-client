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
      ? "-translate-x-6"
      : from === "right"
        ? "translate-x-6"
        : from === "down"
          ? "-translate-y-6"
          : "translate-y-6"; // default up

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${isVisible
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
    "Sree Buddha Central School in Karunagappally — nurturing minds since 1993. Admissions, academics, facilities and community-focused education.";
  // State for CMS images
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
            .filter(Boolean); // Remove any null/undefined URLs

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
    if (images.length <= 1 || isLoading) return; // Skip rotation if only one image or still loading
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images.length, isLoading]);

  // (Images are fetched for other sections; hero now uses local video only)

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Shimmer/Skeleton component for hero section
  const HeroSkeleton = () => (
    <div className="relative h-[80vh] md:h-[85vh] overflow-hidden rounded-lg animate-pulse">
      {/* Shimmer background */}
      <div className="absolute inset-0">
        <Skeleton
          height="100%"
          width="100%"
          containerClassName="h-full"
          className="rounded-lg"
          style={{
            background:
              "linear-gradient(90deg,#f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "loading 1.5s infinite",
          }}
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* Content overlay with skeleton */}
      <div className="relative z-10 h-full flex items-end justify-start p-4 md:p-6 lg:p-8">
        {/* AnnouncementBoard - will handle its own loading */}
        <div className="relative z-30">
          <AnnouncementBoard />
        </div>

        {/* Skeleton for potential hero content */}
        <div className="flex-1 flex items-end justify-end pr-4">
          <div className="space-y-4">
            <Skeleton height={32} width={300} />
            <Skeleton height={24} width={200} />
          </div>
        </div>
      </div>

      {/* Navigation buttons skeleton */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <Skeleton height={48} width={48} circle />
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <Skeleton height={48} width={48} circle />
      </div>

      {/* Indicators skeleton */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        <Skeleton height={12} width={12} circle />
        <Skeleton height={12} width={12} circle />
        <Skeleton height={12} width={12} circle />
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <Head>
        <title>Sree Buddha Central School (SBSC) — Karunagappally</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="Sree Buddha Central School, Sree Buddha School, SBSC, SBCS, Sree Budha, sbcs, sbcs school, central school, schools in Karunagapally, Karunagappally" />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sree Buddha Central School" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.svg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sree Buddha Central School" />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.svg`} />

        {/* Link to sitemap (ensure NEXT_PUBLIC_SITE_URL is set in production) */}
        <link rel="sitemap" type="application/xml" href={`${siteUrl}/sitemap.xml`} />

        {/* JSON-LD Organization with alternate names, keywords and local coverage */}
        <script
          key="ldjson"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Sree Buddha Central School",
              alternateName: ["Sree Buddha School", "SBSC", "SBCS", "Sree Budha", "SBSC School", "SBCS School"],
              url: siteUrl,
              logo: `${siteUrl}/favicon.png`,
              sameAs: [],
              contactPoint: [{
                "@type": "ContactPoint",
                telephone: "",
                contactType: "Admissions",
                areaServed: "IN"
              }],
              keywords: ["Sree Buddha Central School", "Sree Buddha School", "SBSC", "SBCS", "Sree Budha", "sbcs", "schools in Karunagapally"],
              areaServed: {
                "@type": "Place",
                name: "Karunagappally"
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Edakkulangara",
                addressLocality: "Karunagappally",
                addressRegion: "Kerala",
                postalCode: "690523",
                addressCountry: "IN",
              },
              // plusCode: 3HF4+R7R (Edakkulangara, Karunagappally)
              // If you have coordinates, set geo: {"@type":"GeoCoordinates","latitude":"..","longitude":".."}
            }),
          }}
        />
        {/* FAQ JSON-LD for rich results */}
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
                  name: "How do I apply for admission at Sree Buddha Central School (SBSC)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Visit our Admissions page for the latest admission form, eligibility criteria and application deadlines. You can also contact the school office at 0479-2562489 for assistance."
                  }
                },
                {
                  "@type": "Question",
                  name: "Where is Sree Buddha Central School located?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "SBSC is located in Edakkulangara, Karunagappally, Kerala (PIN 690523). For directions, see the Contact page or use the plus code 3HF4+R7R."
                  }
                },
                {
                  "@type": "Question",
                  name: "What classes and curriculum does SBSC offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sree Buddha Central School offers pre-primary to senior secondary education following a balanced curriculum focused on academics, co-curricular activities and character development. Check the Academics section for details."
                  }
                }
              ]
            }),
          }}
        />
      </Head>
      {/* Hero Section with Background Carousel */}
      <div className="relative animate-slide-up">
        {isLoading ? (
          <HeroSkeleton />
        ) : (
          <>
            {/* Background Video - YouTube Embed (only on larger screens) */}
            <div className="absolute inset-0 overflow-hidden -z-20">
              <video
                src="/assets/herovideo.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>

            {/* Overlay for contrast and readability */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none animate-fade-in animation-delay-200" />
            {/* Subtle overlay for contrast */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none animate-fade-in animation-delay-200" />

            {/* Content overlay */}
            <div className="relative z-10 h-[80vh] md:h-[85vh] flex items-end justify-start p-4 md:p-6 lg:p-8 animate-slide-up animation-delay-300">
              {/* Centered hero title (overlay on video/image) */}
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div className="text-center">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    <span className="inline-block  bg-clip-text text-white uppercase">
                      Sree Buddha
                    </span>
                  </h1>
                  <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-200 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    Central School
                  </h2>
                  {/* Visible subtitle containing keyword variations (keeps language natural) */}
                  <p className="mt-3 text-sm sm:text-base text-white max-w-2xl mx-auto">
                    Sree Buddha Central School in Karunagappally — admissions, academics, facilities and community education.
                  </p>
                </div>
              </div>

              {/* Dropdown Button */}
              <div className="z-50 animate-bounce-in animation-delay-400">
                <AnnouncementBoard />
              </div>
            </div>

            {/* Removed image navigation and indicators — hero now exclusively uses the video */}
          </>
        )}
      </div>



      <div className="min-h-screen bg-white">
        {/* Enhanced Welcome Section */}
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-96 h-96 bg-[#0D47A1] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0D47A1] rounded-full translate-x-1/3 translate-y-1/3"></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:py-24">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text Content */}
                <div className="text-center lg:text-left space-y-8">
                  {/* Badge */}
                  <Reveal delay={100}>
                    <div className="inline-flex items-center px-4 py-2 bg-[#0D47A1]/10 rounded-full border border-[#0D47A1]/20">
                      {/* <div className="w-2 h-2 bg-[#0D47A1] rounded-full mr-2 animate-pulse"></div> */}
                      <span className="text-[#0D47A1] font-semibold text-sm tracking-wide">
                        ESTABLISHED 1993
                      </span>
                    </div>
                  </Reveal>

                  {/* Main Heading */}
                  <Reveal delay={200}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      <span className="text-gray-900">Welcome to</span>
                      <br />
                      <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">
                        Sree Buddha
                      </span>
                      <br />
                      <span className="text-gray-900">Central School</span>
                    </h1>
                  </Reveal>

                  {/* Subtitle */}
                  <Reveal delay={300}>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      Nurturing minds, building character, and fostering
                      excellence through Buddhist values of
                      <span className="text-[#0D47A1] font-semibold">
                        {" "}
                        kindness, humanism, and equality
                      </span>
                    </p>
                  </Reveal>

                  {/* Stats Row */}
                  <Reveal delay={400}>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#0D47A1]">
                          3500+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          Students
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#0D47A1]">
                          140+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          Teachers
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#0D47A1]">
                          30+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          Years
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  {/* Action Buttons */}
                  <Reveal delay={500}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                      <a
                        href="the-school/objectives"
                        className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                      >
                        Learn More
                        <svg
                          className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                      <a
                        href="/admission"
                        className="group inline-flex items-center justify-center px-8 py-4 bg-white text-[#0D47A1] font-semibold rounded-xl border-2 border-[#0D47A1] hover:bg-[#0D47A1] hover:text-white transition-all duration-300 hover:scale-105"
                      >
                        Admissions Open
                        {/* <div className="w-2 h-2 bg-yellow-400 rounded-full ml-2 animate-pulse"></div> */}
                      </a>
                    </div>
                  </Reveal>
                </div>

                {/* Right Column - Enhanced Image */}
                <div className="relative">
                  <Reveal delay={600} from="right">
                    <div className="relative">
                      {/* Main Image Container */}
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div
                          className="h-96 lg:h-[500px] bg-cover bg-center"
                          style={{
                            backgroundImage: `linear-gradient(rgba(13, 71, 161, 0.1), rgba(13, 71, 161, 0.2)), url('/school_sample.png')`,
                          }}
                        />
                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              Excellence in Education
                            </h3>
                            <p className="text-sm text-gray-600">
                              Empowering students since 1993
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Floating Elements */}
                      {/* <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <span className="text-2xl">🏆</span>
                    </div> */}

                      {/* <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#0D47A1]">
                      <span className="text-xl">📚</span>
                    </div> */}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-3 h-3 bg-[#0D47A1] rounded-full animate-pulse"></div>
            <div
              className="absolute top-32 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-20 left-20 w-4 h-4 bg-[#0D47A1] rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </Reveal>

        <Reveal>
          <QuickInformation />
        </Reveal>

        {/* About Us Section - Consistent with Welcome Design */}
        <div id="about-us" className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 overflow-hidden">
          {/* Background Pattern - Consistent with Welcome Section */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#0D47A1] rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Section Header - Consistent Style */}
            <div className="text-center mb-16">
              <Reveal>
                <div className="inline-flex items-center px-4 py-2 bg-[#0D47A1]/10 rounded-full border border-[#0D47A1]/20 mb-6">
                  <div className="w-2 h-2 bg-[#0D47A1] rounded-full mr-2 animate-pulse"></div>
                  <span className="text-[#0D47A1] font-semibold text-sm tracking-wide">
                    ABOUT US
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Our{" "}
                  <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">
                    Journey
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  From 83 students to 3,500+ learners - three decades of
                  nurturing minds through Buddhist values
                </p>
              </Reveal>
            </div>

            {/* Main Content Grid - Simplified */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Story */}
              <div className="space-y-8">
                <Reveal delay={300}>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Our Foundation
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      Established in 1993 under the Sree Buddha Foundation, our
                      school began with just 83 students and 5 teachers. Today,
                      we proudly serve over 3,500 students with 140 dedicated
                      teachers.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Guided by Buddhist teachings of kindness, humanism, and
                      equality, we've grown into a leading educational
                      institution that balances academic excellence with moral
                      values.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Right Column - Values & Stats */}
              <div className="space-y-8">
                <Reveal delay={400} from="right">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Our Commitment
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      We provide holistic education that prepares students for
                      future challenges while nurturing their character and
                      compassion.
                    </p>

                    {/* Stats Row - Consistent with Welcome */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#0D47A1]">
                          1993
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          Founded
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#0D47A1]">
                          3500+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          Students
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#0D47A1]">
                          140+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          Teachers
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Call to Action - Consistent Style */}
                <Reveal delay={500} from="right">
                  <div className="pt-8">
                    <a
                      href="/the-school/objectives"
                      className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    >
                      Learn More About Us
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Decorative Elements - Consistent with Welcome */}
          {/* <div className="absolute top-20 left-10 w-3 h-3 bg-[#0D47A1] rounded-full animate-pulse"></div> */}
          {/* <div className="absolute top-32 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div> */}
          {/* <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#0D47A1] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div> */}
        </div>

        {/* Foundation Section */}
        <Reveal>
          <div className="bg-gradient-to-br from-primary via-primary-dark to-primary text-white py-20 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
              <div className="absolute top-32 right-32 w-16 h-16 border border-white/20 rounded-full"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Header & Mission */}
                <div className="text-left">
                  <Reveal>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-1 bg-secondary mr-4"></div>
                      <span className="text-secondary font-semibold tracking-wider uppercase text-sm">
                        Our Foundation
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={100}>
                    <h2
                      className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Sree Buddha Foundation
                    </h2>
                  </Reveal>

                  <Reveal delay={200}>
                    <p className="text-xl text-white/90 mb-8 font-medium">
                      Nurturing excellence through Buddhist values of kindness,
                      humanism, and equality
                    </p>
                  </Reveal>

                  {/* Core Values */}
                  <Reveal delay={300}>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="text-2xl font-bold text-secondary mb-1">
                          1993
                        </div>
                        <div className="text-sm text-white/80">Established</div>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="text-2xl font-bold text-secondary mb-1">
                          3500+
                        </div>
                        <div className="text-sm text-white/80">Students</div>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="text-2xl font-bold text-secondary mb-1">
                          140+
                        </div>
                        <div className="text-sm text-white/80">Teachers</div>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Right Column - Content */}
                <div className="text-left">
                  <Reveal delay={400}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                      <h3 className="text-xl font-semibold mb-4 text-secondary">
                        Our Mission & Vision
                      </h3>
                      <p className="text-white/90 leading-relaxed mb-6">
                        The Sree Buddha Foundation operates multiple educational
                        institutions, with the Central School in Karunagappally
                        as our flagship project and Sree Buddha College of
                        Engineering, Pattoor as another key venture.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-white/90 text-sm">
                            <strong>Kindness:</strong> Fostering compassion and
                            empathy in every student
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-white/90 text-sm">
                            <strong>Humanism:</strong> Developing well-rounded,
                            ethical individuals
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-white/90 text-sm">
                            <strong>Equality:</strong> Ensuring equal
                            opportunities for all students
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-white/20">
                        <p className="text-white/80 text-sm italic">
                          "The scientific temper of Buddhist teachings and their
                          rationality harmonize perfectly with the modern
                          scientific spirit."
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </div>
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

        <Reveal>
          <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-md mx-auto">
              <figure className="text-center">
                {/* Quote Icon */}
                <svg
                  className="w-10 h-10 mx-auto mb-3 text-blue-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 14"
                >
                  <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                </svg>

                {/* Quote Text */}
                <blockquote>
                  <p className="text-2xl italic font-medium text-gray-900">
                    "Together, we are building a foundation for excellence that
                    will last generations"
                  </p>
                </blockquote>

                {/* Attribution */}
                <figcaption className="flex items-center justify-center mt-6 space-x-3">
                  <div className="flex items-center divide-x-2 divide-gray-500">
                    <cite className="pe-3 font-medium text-gray-900">
                      Our Shared Vision
                    </cite>
                    <cite className="ps-3 text-sm text-gray-500">
                      for Sree Buddha Central School
                    </cite>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <Gallery />
        </Reveal>
      </div>
    </div>
  );
}
