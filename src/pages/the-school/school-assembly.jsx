import React, { useEffect, useState, useRef } from 'react';

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
        paragraph: "The morning assembly at Sree Buddha Central School is a cornerstone of our daily routine, bringing together students and staff to start the day with inspiration, motivation, and a sense of unity. Each assembly begins with a prayer, followed by the national anthem, instilling patriotism and respect for our nation."
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
          <Reveal>
            <div className="inline-flex items-center px-4 py-2 bg-[#0D47A1]/10 rounded-full border border-[#0D47A1]/20 mb-6">
              <div className="w-2 h-2 bg-[#0D47A1] rounded-full mr-2 animate-pulse"></div>
              <span className="text-[#0D47A1] font-semibold text-sm tracking-wide">DAILY ROUTINE</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              School <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">Assembly</span>
            </h2>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {displayData.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D47A1]"></div>
            <p className="mt-4 text-gray-600">Loading assembly information...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">Unable to load assembly data. Showing default content.</p>
            </div>
          </div>
        )}

        {/* Content Section */}
        {!loading && (
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image Section */}
            <div className="relative">
              <Reveal delay={300}>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                  <img 
                    src={displayData.image.url}
                    alt={displayData.image.alt}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      // Fallback to static image if CMS image fails to load
                      e.target.src = staticData.image.url;
                    }}
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                </div>
              </Reveal>
            </div>

            {/* Text Content */}
            <div className="space-y-8">
              <Reveal delay={400} from="right">
                <div className="prose prose-lg max-w-none">
                  <div className="space-y-6">
                    {displayData.content.map((item, index) => (
                      <Reveal key={item.id} delay={500 + index * 100} from="right">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {item.paragraph}
                        </p>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        )}

        {/* Assembly Features Section */}
        {!loading && (
          <Reveal delay={600}>
            <div className="mt-20 pt-12 border-t border-gray-200">
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Assembly <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">Highlights</span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Reveal delay={700} from="up">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-[#0D47A1]/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Prayer & Anthem</h4>
                    <p className="text-gray-600">Daily prayers and national anthem to start the day with positivity</p>
                  </div>
                </Reveal>

                <Reveal delay={800} from="up">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-[#0D47A1]/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Thought of the Day</h4>
                    <p className="text-gray-600">Inspiring thoughts and motivational messages shared by students</p>
                  </div>
                </Reveal>

                <Reveal delay={900} from="up">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-[#0D47A1]/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Announcements</h4>
                    <p className="text-gray-600">Important updates, achievements, and upcoming events</p>
                  </div>
                </Reveal>

                <Reveal delay={1000} from="up">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="w-12 h-12 bg-[#0D47A1]/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Cultural Programs</h4>
                    <p className="text-gray-600">Student performances showcasing talents and creativity</p>
                  </div>
                </Reveal>
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

export default SchoolAssembly;