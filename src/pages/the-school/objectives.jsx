import React, { useEffect, useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Scroll-reveal component
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

const Objectives = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/objectives`);
        if (!response.ok) {
          throw new Error('Failed to fetch objectives data');
        }
        const result = await response.json();
        setData(result.docs[0]); // Get the first document
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern - Consistent with other sections */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0D47A1] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section - Consistent Design */}
        <div className="text-center mb-16">
          {loading ? (
            <>
              <Skeleton 
                height={8} 
                width={120} 
                className="mx-auto mb-6 rounded-full" 
                baseColor="#f3f4f6" 
                highlightColor="#e5e7eb"
              />
              <Skeleton 
                height={48} 
                width={400} 
                className="mx-auto mb-6" 
                baseColor="#f3f4f6" 
                highlightColor="#e5e7eb"
              />
              <Skeleton 
                height={24} 
                width={600} 
                className="mx-auto" 
                baseColor="#f3f4f6" 
                highlightColor="#e5e7eb"
                count={2}
              />
            </>
          ) : error ? (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full border border-red-200 mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-red-600 font-semibold text-sm tracking-wide">ERROR</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Unable to Load Content
              </h2>
              <p className="text-lg text-red-600">{error}</p>
            </div>
          ) : (
            <>
              <Reveal>
                <div className="inline-flex items-center px-4 py-2 bg-[#0D47A1]/10 rounded-full border border-[#0D47A1]/20 mb-6">
                  <div className="w-2 h-2 bg-[#0D47A1] rounded-full mr-2 animate-pulse"></div>
                  <span className="text-[#0D47A1] font-semibold text-sm tracking-wide">FOUNDATION</span>
                </div>
              </Reveal>
              
              <Reveal delay={100}>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {data?.title ? (
                    <>
                      {data.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">
                        {data.title.split(' ').slice(-1)[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      Aims & <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">Objectives</span>
                    </>
                  )}
                </h2>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {data?.subtitle || 'Discover our vision and mission, clearly outlining our goals and the steps we take to achieve them.'}
                </p>
              </Reveal>
            </>
          )}
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <div className="relative">
            <Reveal delay={300}>
              <div className="relative">
                {loading ? (
                  <div className="aspect-[4/5] w-full">
                    <Skeleton 
                      height="100%" 
                      width="100%"
                      className="rounded-2xl"
                      baseColor="#f3f4f6" 
                      highlightColor="#e5e7eb"
                    />
                  </div>
                ) : error ? (
                  <div className="aspect-[4/5] w-full bg-gray-200 rounded-2xl flex items-center justify-center">
                    <p className="text-gray-500">Image unavailable</p>
                  </div>
                ) : (
                  data?.image && (
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                      <img 
                        src={data.image.url}
                        alt={data.image.alt || 'Buddha statue in peaceful garden setting'}
                        className="w-full h-auto object-cover"
                      />
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                    </div>
                  )
                )}
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <Reveal delay={400} from="right">
              <div className="prose prose-lg max-w-none">
                {loading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="space-y-3">
                        <Skeleton 
                          height={20} 
                          baseColor="#f3f4f6" 
                          highlightColor="#e5e7eb" 
                          count={4} 
                        />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
                    <p className="text-red-600 font-medium">Unable to load content</p>
                    <p className="text-sm text-red-500 mt-2">Please try refreshing the page</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {data?.content?.map((item, index) => (
                      <Reveal key={item.id} delay={500 + index * 100} from="right">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {item.paragraph?.split('\n').map((line, i, arr) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < arr.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      </Reveal>
                    )) || (
                      <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          The Sree Buddha Foundation is committed to providing quality education rooted in Buddhist values and modern pedagogical practices.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          Our objectives encompass fostering academic excellence, character development, and social responsibility among all members of our educational community.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Call to Action Section */}
        {!loading && !error && (
          <Reveal delay={600}>
            <div className="text-center mt-16 pt-12 border-t border-gray-200">
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Learn more about our foundation and the institutions we manage
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/about-foundation/management" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  Our Management
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a 
                  href="/about-foundation/institutions" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-[#0D47A1] font-semibold rounded-xl border-2 border-[#0D47A1] hover:bg-[#0D47A1] hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Our Institutions
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#0D47A1] rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#0D47A1] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

export default Objectives;