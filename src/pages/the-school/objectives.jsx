import React, { useEffect, useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Target, Eye, Flag, Users, Building, ArrowRight } from 'lucide-react';

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
        setData(result.docs[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                <Target className="w-4 h-4 text-red-500 mr-2" />
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
                  <Target className="w-4 h-4 text-[#F4C430] mr-2" />
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Foundation
                  </span>
                </div>
              </Reveal>
              
              <Reveal delay={100}>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
                  {data?.title ? (
                    <>
                      {data.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                        {data.title.split(' ').slice(-1)[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      Aims &{" "}
                      <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                        Objectives
                      </span>
                    </>
                  )}
                </h2>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
                  {data?.subtitle || 'Discover our vision and mission, clearly outlining our goals and the steps we take to achieve them.'}
                </p>
              </Reveal>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
                <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
              </div>
            </>
          )}
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                  data?.image && (
                    <div className="relative">
                      {/* Main Image Container */}
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#123C73]/10 group">
                        <img 
                          src={data.image.url}
                          alt={data.image.alt || 'School objectives and values'}
                          className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/20 via-transparent to-transparent"></div>
                        
                        {/* Image Badge */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-[#123C73]/10">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                                <Flag className="w-5 h-5 text-[#123C73]" />
                              </div>
                              <div>
                                <p className="font-bold text-[#1B1F24] text-sm">Our Mission</p>
                                <p className="text-xs text-[#667085]">Guiding Principles & Values</p>
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
                        <Eye className="w-8 h-8 text-[#123C73]" />
                      </div>
                    </div>
                  )
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
                    {[...Array(3)].map((_, index) => (
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
                    <Target className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-600 font-medium">Unable to load content</p>
                    <p className="text-sm text-red-500 mt-2">Please try refreshing the page</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {data?.content?.map((item, index) => (
                      <Reveal key={item.id} delay={500 + index * 100} from="right">
                        <div className="flex gap-4 group">
                          {/* Step Number */}
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <span className="text-[#123C73] font-bold">{index + 1}</span>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <p className="text-lg text-[#667085] leading-relaxed group-hover:text-[#1B1F24] transition-colors duration-300 flex-1">
                            {item.paragraph?.split('\n').map((line, i, arr) => (
                              <React.Fragment key={i}>
                                {line}
                                {i < arr.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                      </Reveal>
                    )) || (
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center">
                              <span className="text-[#123C73] font-bold">1</span>
                            </div>
                          </div>
                          <p className="text-lg text-[#667085] leading-relaxed flex-1">
                            The Sree Narayana Foundation is committed to providing quality education rooted in Buddhist values and modern pedagogical practices.
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center">
                              <span className="text-[#123C73] font-bold">2</span>
                            </div>
                          </div>
                          <p className="text-lg text-[#667085] leading-relaxed flex-1">
                            Our objectives encompass fostering academic excellence, character development, and social responsibility among all members of our educational community.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Core Values */}
            {!loading && !error && (
              <Reveal delay={800} from="right">
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#123C73]/5 mt-8">
                  <h3 className="text-lg font-bold text-[#1B1F24] mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#F4C430] rounded-xl flex items-center justify-center">
                      <Eye className="w-4 h-4 text-[#123C73]" />
                    </div>
                    Our Core Focus
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#F4C430] rounded-full"></div>
                      <span className="text-sm text-[#667085] font-medium">Excellence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#F4C430] rounded-full"></div>
                      <span className="text-sm text-[#667085] font-medium">Character</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#F4C430] rounded-full"></div>
                      <span className="text-sm text-[#667085] font-medium">Innovation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#F4C430] rounded-full"></div>
                      <span className="text-sm text-[#667085] font-medium">Community</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {/* Call to Action Section */}
        {!loading && !error && (
          <Reveal delay={600}>
            <div className="text-center mt-16 lg:mt-24 pt-12">
              {/* Section Divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
                <div className="px-6 py-2 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Learn More
                  </span>
                </div>
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
              </div>

              <p className="text-lg text-[#667085] mb-8 max-w-2xl mx-auto">
                Learn more about our foundation and the institutions we manage
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/the-school/management"   
                  className="group inline-flex items-center justify-center px-8 py-4 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 hover:shadow-xl hover:shadow-[#123C73]/20 hover:-translate-y-1"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Our Management
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/documents/sister-concerns" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-[#123C73] font-bold rounded-2xl border-2 border-[#123C73] hover:bg-[#123C73] hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <Building className="w-5 h-5 mr-2" />
                  Our Institutions
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#123C73] rounded-full animate-pulse opacity-20"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#123C73] rounded-full animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 right-10 w-3 h-3 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};

export default Objectives; 