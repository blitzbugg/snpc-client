import React, { useEffect, useState, useRef } from 'react';
import { Shield, BookOpen, Clock, Users, Building2, Library, AlertTriangle, Download, Phone, Mail, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

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

const GeneralRules = () => {
  const rulesCategories = [
    {
      icon: <BookOpen className="w-8 h-8" />,
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
      icon: <Shield className="w-8 h-8" />,
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
      icon: <Users className="w-8 h-8" />,
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
      icon: <Clock className="w-8 h-8" />,
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
      icon: <Building2 className="w-8 h-8" />,
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
      icon: <Library className="w-8 h-8" />,
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
      blue: { border: "border-blue-400", bg: "bg-blue-50", icon: "bg-blue-100", text: "text-blue-600" },
      indigo: { border: "border-indigo-400", bg: "bg-indigo-50", icon: "bg-indigo-100", text: "text-indigo-600" },
      purple: { border: "border-purple-400", bg: "bg-purple-50", icon: "bg-purple-100", text: "text-purple-600" },
      pink: { border: "border-pink-400", bg: "bg-pink-50", icon: "bg-pink-100", text: "text-pink-600" },
      orange: { border: "border-orange-400", bg: "bg-orange-50", icon: "bg-orange-100", text: "text-orange-600" },
      green: { border: "border-green-400", bg: "bg-green-50", icon: "bg-green-100", text: "text-green-600" }
    };
    return colors[color] || colors.blue;
  };

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
              <Shield className="w-4 h-4 text-[#F4C430] mr-2" />
              <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">School Policies</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
              General{" "}
              <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">Rules</span>
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
              Guidelines and regulations to ensure a disciplined and conducive learning environment for all students
            </p>
          </Reveal>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Code of Conduct Card */}
        <Reveal delay={300}>
          <div className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] rounded-3xl p-8 lg:p-14 text-white mb-12 lg:mb-20 shadow-2xl shadow-[#123C73]/20 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C430]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-[#F4C430] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-10 h-10 text-[#123C73]" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-3">Code of Conduct</h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  All students are expected to adhere to these rules and regulations. Violation of any rule may result in disciplinary action including warning, suspension, or expulsion depending on the severity of the offense.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Rules Categories */}
        <div className="space-y-8 lg:space-y-10">
          {rulesCategories.map((category, categoryIndex) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <Reveal key={categoryIndex} delay={400 + categoryIndex * 100}>
                <div className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-l-4 ${colorClasses.border} border-[#123C73]/5`}>
                  <div className={`${colorClasses.bg} p-6 lg:p-8`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${colorClasses.icon} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {React.cloneElement(category.icon, { className: `w-7 h-7 ${colorClasses.text}` })}
                      </div>
                      <h3 className={`text-xl md:text-2xl font-bold ${colorClasses.text} group-hover:text-[#123C73] transition-colors duration-300`}>
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <ul className="space-y-4">
                      {category.rules.map((rule, ruleIndex) => (
                        <li key={ruleIndex} className="flex items-start gap-4 group/item">
                          <div className={`flex-shrink-0 w-8 h-8 ${colorClasses.bg} rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300`}>
                            <span className={`${colorClasses.text} font-bold text-sm`}>
                              {ruleIndex + 1}
                            </span>
                          </div>
                          <p className="text-[#667085] leading-relaxed flex-1 group-hover/item:text-[#1B1F24] transition-colors duration-300">
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
          <div className="mt-16 lg:mt-20 bg-gradient-to-br from-[#F4C430]/5 to-[#123C73]/5 rounded-3xl p-8 lg:p-10 border border-[#F4C430]/20 shadow-lg">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-[#F4C430] rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-[#123C73]" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#1B1F24] mb-4">Important Notice</h3>
                <p className="text-[#667085] leading-relaxed mb-4">
                  Parents and guardians are requested to ensure that their wards understand and follow all school rules. Regular communication with the school regarding your child's conduct and performance is encouraged.
                </p>
                <p className="text-[#667085] leading-relaxed">
                  Any grievances or concerns regarding school rules should be addressed to the class teacher or the principal's office during school hours.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Download Section */}
        <Reveal delay={1100}>
          <div className="mt-12 text-center">
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 max-w-2xl mx-auto border border-[#123C73]/5">
              <div className="w-16 h-16 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-[#123C73]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1B1F24] mb-3">Complete Rules Handbook</h3>
              <p className="text-[#667085] mb-8 leading-relaxed">
                Download the complete student handbook for detailed information on all school rules and regulations
              </p>
              <a 
                href="/path-to-rules-handbook.pdf" 
                download
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#123C73]/20 hover:-translate-y-1"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
                Download Student Handbook
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Contact Section */}
        <Reveal delay={1200}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-[#123C73]/5">
              <div className="w-14 h-14 bg-[#F4C430]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-[#123C73]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1F24] mb-3">Questions or Concerns?</h3>
              <p className="text-[#667085] mb-6">
                For clarification on any rules or to discuss specific situations, please contact the school office.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                <div className="flex items-center gap-2 bg-[#F7F9FC] rounded-xl px-4 py-3">
                  <Phone className="w-4 h-4 text-[#123C73]" />
                  <span className="font-semibold text-[#1B1F24]">8891720292</span>
                </div>
                <div className="flex items-center gap-2 bg-[#F7F9FC] rounded-xl px-4 py-3">
                  <Mail className="w-4 h-4 text-[#123C73]" />
                  <span className="font-semibold text-[#1B1F24] text-sm">indianpublicschoolkollam@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#123C73] rounded-full animate-pulse opacity-20"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#123C73] rounded-full animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

export default GeneralRules;