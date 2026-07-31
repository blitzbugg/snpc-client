import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Scroll-reveal component using IntersectionObserver
function Reveal({ children, className = "", delay = 0, threshold = 0.15, from = "up" }) {
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
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hiddenTransform}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const LeadersMessages = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/leaders`);
        if (!response.ok) {
          throw new Error('Failed to fetch leaders');
        }
        const data = await response.json();
        // Sort to ensure Chairman (Prof. K. Sasikumar) comes first
        const sortedLeaders = data.docs.sort((a, b) => {
          if (a.name === "Prof. K. Sasikumar") return -1;
          if (b.name === "Prof. K. Sasikumar") return 1;
          return 0;
        });
        setLeaders(sortedLeaders);
      } catch (err) {
        setError("Failed to fetch leaders' messages.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  // Skeleton Card Component for Leader Message
  const LeaderSkeleton = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 overflow-hidden">
      <div className="relative mb-6">
        <div className="flex items-start">
          <div className="relative flex-shrink-0">
            {/* Profile Image Skeleton */}
            <Skeleton 
              height={120} 
              width={120} 
              circle 
              className="rounded-full w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-cover object-center z-30 relative"
            />
            
            {/* Badge Skeleton */}
            <div
              style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}
              className="absolute top-0 left-12 sm:left-16 lg:left-16 bg-gray-200 h-8 sm:h-9 w-56 sm:w-64 lg:w-80 flex items-center justify-center text-center z-20"
            >
              <Skeleton height={16} width="90%" />
            </div>
          </div>
          
          <div className="ml-4 sm:ml-6 lg:ml-8 mt-10 sm:mt-8 md:mt-15 flex flex-col justify-center">
            {/* Name Skeleton */}
            <Skeleton height={20} width={160} className="mb-1" />
            {/* Title Skeleton */}
            <Skeleton height={14} width={120} />
          </div>
        </div>
      </div>

      {/* Message Content Skeleton */}
      <div className="space-y-4">
        <Skeleton height={16} width="100%" count={4} containerClassName="space-y-3" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center py-16">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-3 sm:mb-4">
              Words from Our Leaders
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Hear from the visionary leaders who guide our school's mission and
              commitment to excellence in education.
            </p>
          </Reveal>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 sm:gap-8 lg:gap-10 text-justify">
          {loading ? (
            <>
              <LeaderSkeleton />
              <LeaderSkeleton />
            </>
          ) : leaders.length > 0 ? (
            leaders.map((leader, index) => (
              <Reveal 
                key={leader.id} 
                delay={index * 200} 
                from={index % 2 === 0 ? "left" : "right"}
              >
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative mb-6">
                  <div className="flex items-start">
                    <div className="relative flex-shrink-0">
                      <img
                        src={leader.images?.url || "/placeholder.png"}
                        alt={leader.images?.alt || leader.name}
                        className="rounded-full w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-cover object-center z-30 relative transform hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "/placeholder.png";
                        }}
                      />
                      <span
                        style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}
                        className="absolute top-0 left-12 sm:left-16 lg:left-16 bg-primary h-8 sm:h-9 w-56 sm:w-64 lg:w-80 text-white flex items-center justify-center text-center text-sm sm:text-base font-medium z-20 animate-slide-in-right"
                      >
                        {leader.name === "Prof. K. Sasikumar" ? "Chairman's Message" : "Principal's Message"}
                      </span>
                    </div>
                    <div className="ml-4 sm:ml-6 lg:ml-8 mt-10 sm:mt-8 md:mt-15 flex flex-col justify-center">
                      <p className="text-base sm:text-lg font-semibold text-blue-900 animate-fade-in-up animation-delay-300">{leader.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 animate-fade-in-up animation-delay-400">
                        {leader.name === "Prof. K. Sasikumar" ? "Founder Chairman" : "The guiding force behind our success"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-[15px] animate-fade-in-up animation-delay-500">
                  {leader.message.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="animate-fade-in-up" style={{animationDelay: `${600 + index * 100}ms`}}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                </div>
              </Reveal>
            ))
          ) : (
            <Reveal>
              <div className="col-span-full text-center py-16">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4 animate-pulse">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 animate-fade-in-up animation-delay-200">No messages available</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto animate-fade-in-up animation-delay-300">
                    Messages from our leaders will appear here soon. Check back later!
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadersMessages;