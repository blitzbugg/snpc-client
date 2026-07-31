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

const Administration = () => {
  // Static content data
  const staticData = {
    title: "School Administration",
    subtitle: "Meet our dedicated administrative team committed to excellence in education and student development.",
    image: {
      url: "/pta.png",
      alt: "School administration team"
    },
    content: [
      {
        id: 1,
        paragraph: "The administrative team at Sree Buddha Central School is dedicated to creating a supportive learning environment that fosters academic excellence and character development. Our experienced administrators work tirelessly to ensure that every student receives the guidance and support they need to succeed."
      },
      {
        id: 2,
        paragraph: "Our administration works collaboratively to ensure smooth operations, effective communication, and the implementation of educational best practices throughout the school. We maintain strong relationships with students, parents, and staff to create a cohesive educational community."
      },
      {
        id: 3,
        paragraph: "We are committed to maintaining the highest standards of educational leadership while staying true to our foundational values and mission. Through innovative approaches and continuous improvement, we strive to provide an exceptional educational experience for all our students."
      }
    ]
  };

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
              <span className="text-[#0D47A1] font-semibold text-sm tracking-wide">SCHOOL</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              School <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">Administration</span>
            </h2>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {staticData.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <div className="relative">
            <Reveal delay={300}>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src={staticData.image.url}
                  alt={staticData.image.alt}
                  className="w-full h-auto object-cover"
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
                  {staticData.content.map((item, index) => (
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

        {/* Call to Action Section */}
        {/* <Reveal delay={600}>
          <div className="text-center mt-16 pt-12 border-t border-gray-200">
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Learn more about our school leadership and structure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/about-foundation/management" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                School Management
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a 
                href="/about-school/departments" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-[#0D47A1] font-semibold rounded-xl border-2 border-[#0D47A1] hover:bg-[#0D47A1] hover:text-white transition-all duration-300 hover:scale-105"
              >
                Our Departments
              </a>
            </div>
          </div>
        </Reveal> */}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#0D47A1] rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#0D47A1] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

export default Administration;
