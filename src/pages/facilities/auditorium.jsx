import React, { useEffect, useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Building2, Users, Mic, Music, Video, Palette, Sparkles, Theater } from 'lucide-react';

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

const AuditoriumPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/auditorium`);
        if (!res.ok) throw new Error('Failed to fetch auditorium content');
        const result = await res.json();

        let doc = result?.docs && result.docs.length ? result.docs[0] : result;

        if (doc) {
          if (typeof doc.content === 'string') {
            const paragraphs = doc.content
              .split(/\n\s*\n/)
              .map((p, i) => ({ id: `p-${i}`, paragraph: p }));
            doc.content = paragraphs;
          } else if (!Array.isArray(doc.content)) {
            doc.content = [];
          }

          if (!doc.galleryImages && doc.images && Array.isArray(doc.images)) {
            doc.galleryImages = doc.images;
          }
        }

        setData(doc);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auditorium features
  const auditoriumFeatures = [
    {
      icon: Users,
      title: "Spacious Seating",
      description: "Comfortable seating for large gatherings and events"
    },
    {
      icon: Mic,
      title: "Professional Sound",
      description: "State-of-the-art audio system for clear acoustics"
    },
    {
      icon: Video,
      title: "Projection System",
      description: "High-definition projection for presentations and shows"
    },
    {
      icon: Music,
      title: "Stage Area",
      description: "Well-equipped stage for performances and ceremonies"
    },
    {
      icon: Palette,
      title: "Cultural Events",
      description: "Venue for cultural programs and artistic performances"
    },
    {
      icon: Theater,
      title: "Multipurpose Hall",
      description: "Flexible space for various school activities"
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
                  <Building2 className="w-4 h-4 text-[#F4C430] mr-2" />
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Cultural Center
                  </span>
                </div>
              </Reveal>
              
              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
                  {data?.title ? (
                    <>
                      {data.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                        {data.title.split(' ').slice(-1)[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      School{" "}
                      <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                        Auditorium
                      </span>
                    </>
                  )}
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
                  {data?.subtitle || 'A grand venue for cultural events, assemblies, and celebrations'}
                </p>
              </Reveal>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
                <Theater className="w-5 h-5 text-[#F4C430]" />
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
              </div>
            </>
          )}
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 lg:mb-24">
          {/* Image Section */}
          <div className="relative">
            <Reveal delay={300}>
              <div className="relative">
                {loading ? (
                  <div className="aspect-[16/10] w-full">
                    <Skeleton 
                      height="100%" 
                      width="100%"
                      className="rounded-3xl"
                      baseColor="#E8EDF5" 
                      highlightColor="#F7F9FC"
                    />
                  </div>
                ) : (
                  (data?.mainImage?.url || data?.image?.url) && (
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#123C73]/10 group">
                        <img 
                          src={data?.mainImage?.url || data?.image?.url}
                          alt={data?.mainImage?.alt || data?.image?.alt || 'Auditorium'}
                          className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/30 via-transparent to-transparent"></div>

                        {/* Seating Capacity Badge */}
                        <div className="absolute top-6 right-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl border border-[#123C73]/10">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                                <Users className="w-5 h-5 text-[#123C73]" />
                              </div>
                              <div>
                                <p className="text-2xl md:text-4xl font-extrabold text-[#123C73]">
                                  {data?.['seating capacity'] || data?.seatingCapacity || '500+'}
                                </p>
                                <p className="text-xs text-[#667085] font-semibold uppercase tracking-wider">Seats</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Element */}
                      <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#F4C430] rounded-2xl flex items-center justify-center shadow-xl -rotate-12">
                        <Theater className="w-10 h-10 text-[#123C73]" />
                      </div>
                    </div>
                  )
                )}
              </div>
            </Reveal>

            {/* Gallery Images */}
            {!loading && !error && data?.galleryImages && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {data.galleryImages.map((img, index) => (
                  <Reveal key={img.id} delay={400 + index * 100}>
                    <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                      <img 
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5">
                          <p className="text-xs font-semibold text-[#123C73]">View Image</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
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
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Auditorium Info Card */}
            {!loading && !error && (
              <Reveal delay={800} from="right">
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#123C73]/5 mt-8">
                  <h3 className="text-lg font-bold text-[#1B1F24] mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#F4C430]" />
                    Venue Features
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {auditoriumFeatures.slice(0, 4).map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#F4C430] rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-[#667085] font-medium">{feature.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {/* Features Section */}
        {!loading && !error && (
          <Reveal delay={600}>
            <div>
              {/* Section Divider */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
                <div className="px-6 py-2 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Facilities
                  </span>
                </div>
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
              </div>

              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1F24] mb-4">
                  Auditorium{" "}
                  <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                    Features
                  </span>
                </h3>
                <p className="text-lg text-[#667085] max-w-2xl mx-auto">
                  Our auditorium is equipped with modern amenities for various events
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {auditoriumFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Reveal key={index} delay={700 + index * 100}>
                      <div className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20">
                        {/* Top Gradient Line */}
                        <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-[#123C73] to-[#F4C430] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        
                        {/* Icon */}
                        <div className="relative inline-flex mb-4">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#F4C430]/20 to-[#123C73]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                          <div className="relative w-14 h-14 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-7 h-7 text-[#123C73]" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <h4 className="text-lg font-bold text-[#1B1F24] mb-2 group-hover:text-[#123C73] transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-[#667085] leading-relaxed">
                          {feature.description}
                        </p>

                        {/* Hover Arrow */}
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
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#123C73] rounded-full animate-pulse opacity-20"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#123C73] rounded-full animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-32 w-3 h-3 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};

export default AuditoriumPage;  