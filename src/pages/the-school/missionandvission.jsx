import React, { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Target, Eye, Heart, Award, Users, ArrowRight, Compass, Sparkles } from 'lucide-react';

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
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hiddenTransform}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const MissionAndVision = () => {
  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/mission`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
          setMissionData(data.docs[0]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching mission data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMissionData();
  }, []);

  // Core values data
  const coreValues = [
    {
      icon: Heart,
      title: "Kindness",
      description: "Fostering compassion and empathy in all our interactions and relationships.",
      color: "from-[#123C73] to-[#0A2348]"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Striving for the highest standards in education and personal development.",
      color: "from-[#F4C430] to-[#FFD95A]"
    },
    {
      icon: Users,
      title: "Equality",
      description: "Ensuring equal opportunities and respect for all members of our community.",
      color: "from-[#123C73] to-[#F4C430]"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-[#F7F9FC] via-white to-[#F7F9FC] py-16 lg:py-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#123C73]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F4C430]/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#123C73]/2 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-20">
          {loading ? (
            <>
              <div className="flex justify-center mb-6">
                <Skeleton 
                  height={40} 
                  width={160} 
                  className="rounded-full" 
                  baseColor="#E8EDF5" 
                  highlightColor="#F7F9FC"
                />
              </div>
              <Skeleton 
                height={56} 
                width={500} 
                className="mx-auto mb-6" 
                baseColor="#E8EDF5" 
                highlightColor="#F7F9FC"
              />
              <Skeleton 
                height={24} 
                width={600} 
                className="mx-auto" 
                baseColor="#E8EDF5" 
                highlightColor="#F7F9FC"
                count={2}
              />
            </>
          ) : error ? (
            <div className="text-center">
              <div className="inline-flex items-center px-5 py-2.5 bg-red-50 rounded-full border border-red-200 mb-6">
                <Sparkles className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-red-600 font-semibold text-sm tracking-wider uppercase">Error</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B1F24] mb-6">
                Unable to Load Content
              </h2>
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <Reveal>
                <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
                  <Compass className="w-4 h-4 text-[#F4C430] mr-2" />
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Our School
                  </span>
                </div>
              </Reveal>
              
              <Reveal delay={100}>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
                  {missionData?.title ? (
                    <>
                      {missionData.title}
                    </>
                  ) : (
                    <>
                      Mission &{" "}
                      <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                        Vision
                      </span>
                    </>
                  )}
                </h2>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
                  {missionData?.subtitle || 'Discover our purpose and future goals - learn what drives us and where we\'re headed.'}
                </p>
              </Reveal>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
                <Target className="w-5 h-5 text-[#F4C430]" />
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
              </div>
            </>
          )}
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Image Section */}
          <div className="relative">
            <Reveal delay={300}>
              <div className="relative">
                {loading ? (
                  <div className="aspect-[4/5] w-full">
                    <Skeleton 
                      height="100%" 
                      width="100%"
                      className="rounded-3xl"
                      baseColor="#E8EDF5" 
                      highlightColor="#F7F9FC"
                    />
                  </div>
                ) : error ? (
                  <div className="aspect-[4/5] w-full bg-[#F7F9FC] rounded-3xl flex items-center justify-center border-2 border-dashed border-[#123C73]/10">
                    <div className="text-center">
                      <Eye className="w-16 h-16 text-[#667085]/30 mx-auto mb-4" />
                      <p className="text-[#667085]">Image unavailable</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Main Image Container */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#123C73]/10 group">
                      <img 
                        src={missionData?.image?.url || "/abt 1.png"}
                        alt={missionData?.image?.alt || "School mission and vision"}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/20 via-transparent to-transparent"></div>
                      
                      {/* Image Badge */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-[#123C73]/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                              <Eye className="w-5 h-5 text-[#123C73]" />
                            </div>
                            <div>
                              <p className="font-bold text-[#1B1F24] text-sm">Our Purpose</p>
                              <p className="text-xs text-[#667085]">Mission & Vision</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#F4C430] rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                      <Target className="w-10 h-10 text-[#123C73]" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-[#123C73]/10">
                      <Compass className="w-8 h-8 text-[#123C73]" />
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <Reveal delay={400} from="right">
              <div>
                {loading ? (
                  <div className="space-y-6">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="space-y-3">
                        <Skeleton 
                          height={20} 
                          baseColor="#E8EDF5" 
                          highlightColor="#F7F9FC" 
                          count={4} 
                        />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center p-8 bg-red-50 rounded-3xl border border-red-200">
                    <Sparkles className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-600 font-medium">Unable to load content</p>
                    <p className="text-sm text-red-500 mt-2">Please try refreshing the page</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {missionData?.content?.map((paragraph, index) => (
                      <Reveal key={paragraph.id || index} delay={500 + index * 100} from="right">
                        <div className="flex gap-4 group">
                          {/* Step Number */}
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <span className="text-[#123C73] font-bold">{index + 1}</span>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <p className="text-lg text-[#667085] leading-relaxed group-hover:text-[#1B1F24] transition-colors duration-300 flex-1">
                            {paragraph.paragraph}
                          </p>
                        </div>
                      </Reveal>
                    )) || (
                      <div className="space-y-6">
                        <Reveal delay={500} from="right">
                          <div className="flex gap-4 group">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Target className="w-5 h-5 text-[#123C73]" />
                              </div>
                            </div>
                            <p className="text-lg text-[#667085] leading-relaxed group-hover:text-[#1B1F24] transition-colors duration-300 flex-1">
                              <strong className="text-[#123C73]">Our Mission:</strong> To provide holistic education that nurtures academic excellence, character development, and spiritual growth through the timeless wisdom of Buddhist teachings and modern pedagogical practices.
                            </p>
                          </div>
                        </Reveal>
                        <Reveal delay={600} from="right">
                          <div className="flex gap-4 group">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Eye className="w-5 h-5 text-[#123C73]" />
                              </div>
                            </div>
                            <p className="text-lg text-[#667085] leading-relaxed group-hover:text-[#1B1F24] transition-colors duration-300 flex-1">
                              <strong className="text-[#123C73]">Our Vision:</strong> To be a leading educational institution that creates compassionate, ethical, and globally competent citizens who contribute positively to society while staying rooted in their cultural values.
                            </p>
                          </div>
                        </Reveal>
                        <Reveal delay={700} from="right">
                          <div className="flex gap-4 group">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Compass className="w-5 h-5 text-[#123C73]" />
                              </div>
                            </div>
                            <p className="text-lg text-[#667085] leading-relaxed group-hover:text-[#1B1F24] transition-colors duration-300 flex-1">
                              We strive to create an environment where students develop critical thinking, creativity, and moral values, preparing them to face future challenges with confidence and compassion.
                            </p>
                          </div>
                        </Reveal>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Core Values Section */}
        {!loading && !error && (
          <Reveal delay={600}>
            <div>
              {/* Section Divider */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
                <div className="px-6 py-2 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Our Values
                  </span>
                </div>
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
              </div>

              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1F24] mb-4">
                  Our Core{" "}
                  <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                    Values
                  </span>
                </h3>
                <p className="text-lg text-[#667085] max-w-2xl mx-auto">
                  The principles that guide our educational philosophy and daily practices
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {coreValues.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <Reveal key={index} delay={700 + index * 100}>
                      <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20 text-center">
                        {/* Top Gradient Line */}
                        <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#123C73] to-[#F4C430] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        
                        {/* Icon Container */}
                        <div className="relative inline-flex mb-6">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#F4C430]/20 to-[#123C73]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                          <div className="relative w-20 h-20 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-10 h-10 text-[#123C73]" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <h4 className="text-xl font-bold text-[#1B1F24] mb-3 group-hover:text-[#123C73] transition-colors duration-300">
                          {value.title}
                        </h4>
                        <p className="text-[#667085] leading-relaxed">
                          {value.description}
                        </p>

                        {/* Hover Indicator */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="w-8 h-8 bg-[#F4C430] rounded-xl flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#123C73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}

        {/* Call to Action Section */}
        {!loading && !error && (
          <Reveal delay={1000}>
            <div className="text-center mt-16 lg:mt-24 pt-12">
              {/* Section Divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
                <div className="px-6 py-2 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Explore More
                  </span>
                </div>
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
              </div>

              <p className="text-lg text-[#667085] mb-8 max-w-2xl mx-auto">
                Explore more about our school and the dedicated leaders who guide us
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/about-school/messages" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 hover:shadow-xl hover:shadow-[#123C73]/20 hover:-translate-y-1"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Leadership Messages
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/about-school/associations" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-[#123C73] font-bold rounded-2xl border-2 border-[#123C73] hover:bg-[#123C73] hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Our Associations
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 right-10 w-3 h-3 bg-[#123C73] rounded-full animate-pulse opacity-20"></div>
      <div className="absolute top-32 left-20 w-2 h-2 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 right-20 w-4 h-4 bg-[#123C73] rounded-full animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 right-10 w-3 h-3 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};

export default MissionAndVision;