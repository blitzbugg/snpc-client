import React, { useEffect, useState, useRef } from 'react';
import { Users, Shield, Heart, Target } from 'lucide-react';

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
        paragraph: "The administrative team at Sree Narayana Public School is dedicated to creating a supportive learning environment that fosters academic excellence and character development. Our experienced administrators work tirelessly to ensure that every student receives the guidance and support they need to succeed.",
        icon: Users
      },
      {
        id: 2,
        paragraph: "Our administration works collaboratively to ensure smooth operations, effective communication, and the implementation of educational best practices throughout the school. We maintain strong relationships with students, parents, and staff to create a cohesive educational community.",
        icon: Shield
      },
      {
        id: 3,
        paragraph: "We are committed to maintaining the highest standards of educational leadership while staying true to our foundational values and mission. Through innovative approaches and continuous improvement, we strive to provide an exceptional educational experience for all our students.",
        icon: Target
      }
    ]
  };

  return (
    <div className="relative bg-gradient-to-br from-[#F7F9FC] via-white to-[#F7F9FC] py-16 lg:py-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#123C73]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#F4C430]/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#123C73]/2 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-20">
          <Reveal>
            <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
              <div className="w-2.5 h-2.5 bg-[#F4C430] rounded-full mr-3 animate-pulse"></div>
              <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                Leadership Team
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
              School{" "}
              <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                Administration
              </span>
            </h2>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
              {staticData.subtitle}
            </p>
          </Reveal>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <div className="relative">
            <Reveal delay={300}>
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#123C73]/10 group">
                  <img 
                    src={staticData.image.url}
                    alt={staticData.image.alt}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/20 via-transparent to-transparent"></div>
                  
                  {/* Image Badge */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-[#123C73]/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                          <Heart className="w-5 h-5 text-[#123C73]" />
                        </div>
                        <div>
                          <p className="font-bold text-[#1B1F24] text-sm">Dedicated Team</p>
                          <p className="text-xs text-[#667085]">Committed to Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#F4C430] rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-[#123C73]/10">
                  <Shield className="w-8 h-8 text-[#123C73]" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <Reveal delay={400} from="right">
              <div className="space-y-6">
                {staticData.content.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Reveal key={item.id} delay={500 + index * 100} from="right">
                      <div className="flex gap-4 group">
                        {/* Icon Container */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-6 h-6 text-[#123C73]" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <p className="text-lg text-[#667085] leading-relaxed group-hover:text-[#1B1F24] transition-colors duration-300">
                            {item.paragraph}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </Reveal>

            {/* Key Values */}
            <Reveal delay={800} from="right">
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#123C73]/5 mt-8">
                <h3 className="text-lg font-bold text-[#1B1F24] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#F4C430]" />
                  Our Administrative Values
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F4C430] rounded-full"></div>
                    <span className="text-sm text-[#667085] font-medium">Transparency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F4C430] rounded-full"></div>
                    <span className="text-sm text-[#667085] font-medium">Innovation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F4C430] rounded-full"></div>
                    <span className="text-sm text-[#667085] font-medium">Collaboration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F4C430] rounded-full"></div>
                    <span className="text-sm text-[#667085] font-medium">Excellence</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#123C73] rounded-full animate-pulse opacity-20"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#123C73] rounded-full animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 right-10 w-3 h-3 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};

export default Administration;