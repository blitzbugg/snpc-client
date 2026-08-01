import React, { useEffect, useState, useRef } from 'react';
import { Sun, Mic, Bell, Music, Calendar, Star, BookOpen, Users } from 'lucide-react';

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

const SchoolAssembly = () => {
  const [assemblyData, setAssemblyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static fallback data
  const staticData = {
    title: "School Assembly",
    subtitle: "Building character, discipline, and unity through daily morning assemblies that inspire and motivate our students.",
    image: {
      url: "/og-image.svg",
      alt: "Students during morning assembly"
    },
    content: [
      {
        id: 1,
        paragraph: "The morning assembly at Sree Narayana Public School is a cornerstone of our daily routine, bringing together students and staff to start the day with inspiration, motivation, and a sense of unity. Each assembly begins with a prayer, followed by the national anthem, instilling patriotism and respect for our nation."
      },
      {
        id: 2,
        paragraph: "Our assemblies feature thought-provoking speeches, important announcements, and recognition of student achievements. Students take turns organizing and conducting assemblies, developing their leadership skills, public speaking abilities, and confidence. This platform allows them to showcase their talents through cultural performances, poetry recitations, and presentations on current affairs."
      },
      {
        id: 3,
        paragraph: "The assembly time also serves as an opportunity to reinforce our school values, discuss important social issues, and celebrate special occasions. Through regular assemblies, we foster a strong sense of community, discipline, and shared purpose among all members of our school family."
      }
    ]
  };

  useEffect(() => {
    const fetchAssemblyData = async () => {
      try {
        const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
        if (!cmsUrl) {
          throw new Error('NEXT_PUBLIC_CMS_URL is not defined');
        }

        const response = await fetch(`${cmsUrl}/api/assembly`);
        if (!response.ok) {
          throw new Error('Failed to fetch assembly data');
        }

        const data = await response.json();
        
        // Filter for active assemblies and get the first one
        const activeAssembly = data.docs?.find(doc => doc.isActive) || data.docs?.[0];
        
        if (activeAssembly) {
          setAssemblyData(activeAssembly);
        }
      } catch (err) {
        console.error('Error fetching assembly data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssemblyData();
  }, []);

  // Parse description into paragraphs
  const parseDescription = (description) => {
    if (!description) return staticData.content;
    
    const paragraphs = description.split('\n\n').filter(p => p.trim());
    return paragraphs.map((paragraph, index) => ({
      id: index + 1,
      paragraph: paragraph.trim()
    }));
  };

  // Use CMS data if available, otherwise use static data
  const displayData = assemblyData ? {
    title: staticData.title,
    subtitle: staticData.subtitle,
    image: {
      url: assemblyData.photo?.url || staticData.image.url,
      alt: assemblyData.photo?.alt || "Students during morning assembly"
    },
    content: parseDescription(assemblyData.description)
  } : staticData;

  // Assembly highlights with icons
  const highlights = [
    {
      icon: Sun,
      title: "Prayer & Anthem",
      description: "Daily prayers and national anthem to start the day with positivity and patriotism"
    },
    {
      icon: BookOpen,
      title: "Thought of the Day",
      description: "Inspiring thoughts and motivational messages shared by students"
    },
    {
      icon: Bell,
      title: "Announcements",
      description: "Important updates, achievements, and upcoming events"
    },
    {
      icon: Music,
      title: "Cultural Programs",
      description: "Student performances showcasing talents and creativity"
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
          <Reveal>
            <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
              <Sun className="w-4 h-4 text-[#F4C430] mr-2" />
              <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                Daily Routine
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
              School{" "}
              <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                Assembly
              </span>
            </h2>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
              {displayData.subtitle}
            </p>
          </Reveal>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="relative inline-block">
              <div className="w-16 h-16 border-4 border-[#123C73]/10 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#F4C430] rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-[#667085] font-medium">Loading assembly information...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#123C73]/5 max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#F4C430]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[#123C73]" />
              </div>
              <p className="text-[#667085]">Unable to load assembly data. Showing default content.</p>
            </div>
          </div>
        )}

        {/* Content Section */}
        {!loading && (
          <>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
              {/* Image Section */}
              <div className="relative">
                <Reveal delay={300}>
                  <div className="relative">
                    {/* Main Image Container */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#123C73]/10 group">
                      <img 
                        src={displayData.image.url}
                        alt={displayData.image.alt}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = staticData.image.url;
                        }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/20 via-transparent to-transparent"></div>
                      
                      {/* Image Badge */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-[#123C73]/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                              <Users className="w-5 h-5 text-[#123C73]" />
                            </div>
                            <div>
                              <p className="font-bold text-[#1B1F24] text-sm">Morning Assembly</p>
                              <p className="text-xs text-[#667085]">Building Unity & Discipline</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#F4C430] rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                      <Sun className="w-10 h-10 text-[#123C73]" />
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Text Content */}
              <div className="space-y-8">
                <Reveal delay={400} from="right">
                  <div className="space-y-6">
                    {displayData.content.map((item, index) => (
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
                            {item.paragraph}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Assembly Highlights Section */}
            <Reveal delay={600}>
              <div className="relative">
                {/* Section Divider */}
                <div className="flex items-center justify-center gap-4 mb-12">
                  <div className="h-px flex-1 bg-[#123C73]/10"></div>
                  <div className="px-6 py-2 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                    <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                      Assembly Highlights
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-[#123C73]/10"></div>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1F24] text-center mb-12 lg:mb-16">
                  What Makes Our{" "}
                  <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                    Assembly Special
                  </span>
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {highlights.map((highlight, index) => {
                    const IconComponent = highlight.icon;
                    return (
                      <Reveal key={index} delay={700 + index * 100} from="up">
                        <div className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20">
                          {/* Top Gradient Line */}
                          <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-[#123C73] to-[#F4C430] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                          
                          {/* Icon */}
                          <div className="w-14 h-14 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-7 h-7 text-[#123C73]" />
                          </div>
                          
                          {/* Content */}
                          <h4 className="text-lg font-bold text-[#1B1F24] mb-3 group-hover:text-[#123C73] transition-colors duration-300">
                            {highlight.title}
                          </h4>
                          <p className="text-[#667085] leading-relaxed text-sm">
                            {highlight.description}
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
          </>
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

export default SchoolAssembly;