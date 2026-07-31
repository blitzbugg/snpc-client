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

const GeneralRules = () => {
  const rulesCategories = [
    {
      icon: "🎓",
      title: "Academic Discipline",
      color: "blue",
      rules: [
        "Students must attend all classes regularly and punctually.",
        "Homework and assignments must be completed on time.",
        "Students should maintain a minimum of 75% attendance.",
        "All examination rules and regulations must be strictly followed.",
        "Cheating or copying in examinations will result in serious disciplinary action."
      ]
    },
    {
      icon: "👔",
      title: "Dress Code & Appearance",
      color: "indigo",
      rules: [
        "Students must wear the prescribed school uniform on all working days.",
        "Uniform should be neat, clean, and properly ironed.",
        "Hair should be neatly combed and properly maintained.",
        "Girls must tie their hair neatly. Boys should maintain short hair.",
        "Wearing jewelry, makeup, or fashion accessories is not permitted."
      ]
    },
    {
      icon: "🤝",
      title: "Behavior & Conduct",
      color: "purple",
      rules: [
        "Students should be courteous and respectful to teachers and staff.",
        "Fighting, bullying, or using abusive language is strictly prohibited.",
        "Students must maintain discipline in classrooms, corridors, and school premises.",
        "Mobile phones and electronic gadgets are not allowed in school.",
        "Damage to school property will result in financial penalty and disciplinary action."
      ]
    },
    {
      icon: "⏰",
      title: "Attendance & Leave",
      color: "pink",
      rules: [
        "Students must reach school before the assembly time.",
        "Late arrivals must report to the office and obtain a late pass.",
        "Leave applications must be submitted in advance with valid reasons.",
        "Medical certificates are required for leave exceeding three days.",
        "Parents must inform the school in case of emergency absence."
      ]
    },
    {
      icon: "🏫",
      title: "School Premises",
      color: "orange",
      rules: [
        "Students are not permitted to leave the school during school hours without permission.",
        "Playing in classrooms or running in corridors is not allowed.",
        "Littering and spitting in school premises is strictly prohibited.",
        "Students must use the facilities provided responsibly.",
        "Entry to staff rooms and restricted areas is not permitted without permission."
      ]
    },
    {
      icon: "📚",
      title: "Library & Resources",
      color: "green",
      rules: [
        "Maintain complete silence in the library.",
        "Books borrowed must be returned on or before the due date.",
        "Damage or loss of library books will incur a fine.",
        "Reference books should not be taken out of the library.",
        "Students must carry their library cards at all times."
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: { border: "border-blue-500", bg: "bg-blue-50", icon: "bg-blue-100", text: "text-blue-600" },
      indigo: { border: "border-indigo-500", bg: "bg-indigo-50", icon: "bg-indigo-100", text: "text-indigo-600" },
      purple: { border: "border-purple-500", bg: "bg-purple-50", icon: "bg-purple-100", text: "text-purple-600" },
      pink: { border: "border-pink-500", bg: "bg-pink-50", icon: "bg-pink-100", text: "text-pink-600" },
      orange: { border: "border-orange-500", bg: "bg-orange-50", icon: "bg-orange-100", text: "text-orange-600" },
      green: { border: "border-green-500", bg: "bg-green-50", icon: "bg-green-100", text: "text-green-600" }
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
              <span className="text-[#0D47A1] font-semibold text-sm tracking-wide">SCHOOL POLICIES</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              General <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">Rules</span>
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Guidelines and regulations to ensure a disciplined and conducive learning environment for all students
            </p>
          </Reveal>
        </div>

        {/* Introduction Card */}
        <Reveal delay={300}>
          <div className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] rounded-2xl p-8 md:p-12 text-white mb-16 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl md:text-7xl">📋</div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Code of Conduct</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  All students are expected to adhere to these rules and regulations. Violation of any rule may result in disciplinary action including warning, suspension, or expulsion depending on the severity of the offense.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Rules Categories */}
        <div className="space-y-8">
          {rulesCategories.map((category, categoryIndex) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <Reveal key={categoryIndex} delay={400 + categoryIndex * 100}>
                <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 ${colorClasses.border} hover:shadow-xl transition-shadow duration-300`}>
                  <div className={`${colorClasses.bg} p-6 border-b border-gray-200`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${colorClasses.icon} rounded-full flex items-center justify-center text-3xl`}>
                        {category.icon}
                      </div>
                      <h3 className={`text-2xl font-bold ${colorClasses.text}`}>
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <ul className="space-y-4">
                      {category.rules.map((rule, ruleIndex) => (
                        <li key={ruleIndex} className="flex items-start gap-4 group">
                          <div className={`flex-shrink-0 w-8 h-8 ${colorClasses.bg} rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform`}>
                            <span className={`${colorClasses.text} font-bold text-sm`}>
                              {ruleIndex + 1}
                            </span>
                          </div>
                          <p className="text-gray-700 text-lg leading-relaxed flex-1">
                            {rule}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Important Notice */}
        <Reveal delay={1000}>
          <div className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-l-4 border-yellow-500 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚠️</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Important Notice</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Parents and guardians are requested to ensure that their wards understand and follow all school rules. Regular communication with the school regarding your child's conduct and performance is encouraged.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Any grievances or concerns regarding school rules should be addressed to the class teacher or the principal's office during school hours.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Download Section */}
        <Reveal delay={1100}>
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Complete Rules Handbook</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Download the complete student handbook for detailed information on all school rules and regulations
              </p>
              <a 
                href="/path-to-rules-handbook.pdf" 
                download
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Student Handbook
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Contact Section */}
        <Reveal delay={1200}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-l-4 border-[#0D47A1] shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Questions or Concerns?</h3>
              <p className="text-gray-700 mb-4">
                For clarification on any rules or to discuss specific situations, please contact the school office.
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

export default GeneralRules;
