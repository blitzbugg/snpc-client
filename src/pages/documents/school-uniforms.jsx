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
      : "translate-y-6";

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

const SchoolUniforms = () => {
  const uniformCategories = [
    {
      title: "Boys - Pre-Primary & Primary (KG - Class V)",
      icon: "👦",
      color: "blue",
      items: [
        { label: "Shirt", description: "White half-sleeve shirt with school logo" },
        { label: "Shorts/Pants", description: "Navy blue shorts (KG-II) / Navy blue pants (III-V)" },
        { label: "Belt", description: "Black belt with simple buckle" },
        { label: "Shoes & Socks", description: "Black leather shoes with navy blue socks" },
        { label: "Tie", description: "School tie (Classes III-V)" }
      ]
    },
    {
      title: "Girls - Pre-Primary & Primary (KG - Class V)",
      icon: "👧",
      color: "pink",
      items: [
        { label: "Shirt", description: "White half-sleeve shirt with school logo" },
        { label: "Skirt/Divided Skirt", description: "Navy blue pleated skirt" },
        { label: "Belt", description: "Black belt with simple buckle" },
        { label: "Shoes & Socks", description: "Black leather shoes with white socks" },
        { label: "Tie", description: "School tie (Classes III-V)" }
      ]
    },
    {
      title: "Boys - Secondary (Classes VI - X)",
      icon: "🎓",
      color: "indigo",
      items: [
        { label: "Shirt", description: "White full-sleeve shirt with school logo" },
        { label: "Pants", description: "Navy blue formal pants" },
        { label: "Belt", description: "Black leather belt" },
        { label: "Shoes & Socks", description: "Black formal leather shoes with navy blue socks" },
        { label: "Tie", description: "School tie (mandatory)" },
        { label: "ID Card", description: "School ID card (to be worn at all times)" }
      ]
    },
    {
      title: "Girls - Secondary (Classes VI - X)",
      icon: "👩‍🎓",
      color: "purple",
      items: [
        { label: "Shirt", description: "White full-sleeve shirt with school logo" },
        { label: "Skirt", description: "Navy blue pleated skirt (knee-length)" },
        { label: "Belt", description: "Black belt" },
        { label: "Shoes & Socks", description: "Black formal shoes with white socks" },
        { label: "Tie", description: "School tie (mandatory)" },
        { label: "ID Card", description: "School ID card (to be worn at all times)" }
      ]
    },
    {
      title: "Boys - Senior Secondary (Classes XI - XII)",
      icon: "🎯",
      color: "green",
      items: [
        { label: "Shirt", description: "White full-sleeve formal shirt with school logo" },
        { label: "Pants", description: "Navy blue formal trousers" },
        { label: "Belt", description: "Black leather belt" },
        { label: "Shoes & Socks", description: "Black formal leather shoes with navy blue socks" },
        { label: "Tie", description: "School tie (mandatory)" },
        { label: "ID Card", description: "School ID card (must be visible)" }
      ]
    },
    {
      title: "Girls - Senior Secondary (Classes XI - XII)",
      icon: "💼",
      color: "orange",
      items: [
        { label: "Shirt", description: "White full-sleeve formal shirt with school logo" },
        { label: "Skirt/Salwar", description: "Navy blue formal skirt or navy blue salwar kameez" },
        { label: "Belt", description: "Black belt (for skirt)" },
        { label: "Shoes & Socks", description: "Black formal shoes with white socks" },
        { label: "Tie", description: "School tie (mandatory with shirt)" },
        { label: "ID Card", description: "School ID card (must be visible)" }
      ]
    }
  ];

  const sportsUniform = [
    { label: "T-Shirt", description: "House color T-shirt with school logo" },
    { label: "Shorts/Track Pants", description: "Navy blue sports shorts or track pants" },
    { label: "Shoes", description: "White sports shoes with white socks" },
    { label: "Cap", description: "School sports cap (optional)" }
  ];

  const uniformGuidelines = [
    {
      icon: "✅",
      title: "Dos",
      points: [
        "Uniforms must be clean, pressed, and in good condition",
        "Hair should be neatly combed and tied (for girls)",
        "Boys should maintain short, well-groomed hair",
        "School ID card must be worn at all times",
        "Uniforms should be properly labeled with student name and class"
      ]
    },
    {
      icon: "❌",
      title: "Don'ts",
      points: [
        "Do not wear torn or faded uniforms",
        "Avoid wearing excessive jewelry or accessories",
        "Do not alter uniform design or color",
        "Colorful hair bands or clips are not permitted",
        "Nail polish and makeup are strictly prohibited"
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: { border: "border-blue-500", bg: "bg-blue-50", icon: "bg-blue-100", text: "text-blue-700" },
      pink: { border: "border-pink-500", bg: "bg-pink-50", icon: "bg-pink-100", text: "text-pink-700" },
      indigo: { border: "border-indigo-500", bg: "bg-indigo-50", icon: "bg-indigo-100", text: "text-indigo-700" },
      purple: { border: "border-purple-500", bg: "bg-purple-50", icon: "bg-purple-100", text: "text-purple-700" },
      green: { border: "border-green-500", bg: "bg-green-50", icon: "bg-green-100", text: "text-green-700" },
      orange: { border: "border-orange-500", bg: "bg-orange-50", icon: "bg-orange-100", text: "text-orange-700" }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0D47A1] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center px-4 py-2 bg-[#0D47A1]/10 rounded-full border border-[#0D47A1]/20 mb-6">
              <div className="w-2 h-2 bg-[#0D47A1] rounded-full mr-2 animate-pulse"></div>
              <span className="text-[#0D47A1] font-semibold text-sm tracking-wide">SCHOOL DRESS CODE</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              School <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">Uniforms</span>
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Maintaining a professional appearance through proper school uniform dress code
            </p>
          </Reveal>
        </div>

        {/* Uniform Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {uniformCategories.map((category, index) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <Reveal key={index} delay={300 + index * 100}>
                <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 ${colorClasses.border} hover:shadow-xl transition-shadow duration-300`}>
                  <div className={`${colorClasses.bg} p-6`}>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{category.icon}</div>
                      <h3 className={`text-xl font-bold ${colorClasses.text}`}>
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-4">
                          <div className={`flex-shrink-0 w-8 h-8 ${colorClasses.icon} rounded-full flex items-center justify-center`}>
                            <svg className={`w-4 h-4 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Sports Uniform Section */}
        <Reveal delay={900}>
          <div className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] rounded-2xl p-8 md:p-12 text-white mb-16 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">⚽</div>
              <h2 className="text-3xl font-bold mb-3">Sports Uniform</h2>
              <p className="text-blue-100 text-lg">
                Required for Physical Education classes and sports activities
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {sportsUniform.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.label}</h4>
                    <p className="text-blue-100 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Guidelines Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {uniformGuidelines.map((guideline, index) => (
            <Reveal key={index} delay={1000 + index * 100}>
              <div className={`bg-white rounded-2xl shadow-lg p-8 border-l-4 ${index === 0 ? 'border-green-500' : 'border-red-500'}`}>
                <div className="text-5xl mb-4 text-center">{guideline.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{guideline.title}</h3>
                <ul className="space-y-3">
                  {guideline.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 ${index === 0 ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center mt-0.5`}>
                        <span className={`${index === 0 ? 'text-green-600' : 'text-red-600'} text-xs font-bold`}>
                          {pointIndex + 1}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Purchase Information */}
        <Reveal delay={1200}>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12 border-l-4 border-yellow-500 shadow-lg mb-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="text-6xl">🏪</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Where to Purchase Uniforms</h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>School uniforms are available at the school uniform store located in the campus.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Store timings: Monday to Friday, 9:00 AM - 4:00 PM (except lunch break 1:00 PM - 2:00 PM)</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Uniforms can also be purchased from authorized vendors listed on the school website.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Please ensure correct sizing by visiting the store with your ward before purchasing.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Contact Section */}
        <Reveal delay={1300}>
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-l-4 border-[#0D47A1] shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Need Assistance?</h3>
              <p className="text-gray-700 mb-4">
                For queries regarding uniforms, sizes, or purchase details, please contact the school office.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📞</span>
                  <span className="font-semibold">0476 2662489, 2664999</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✉️</span>
                  <span className="font-semibold">sbcskarunagappally@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#0D47A1] rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#0D47A1] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

export default SchoolUniforms;
