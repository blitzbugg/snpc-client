import React, { useEffect, useState, useRef } from 'react';
import { Shirt, ShoppingBag, CheckCircle, XCircle, Phone, Mail, Sparkles, Info, Store, Clock } from 'lucide-react';

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
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Dos",
      points: [
        "Uniforms must be clean, pressed, and in good condition",
        "Hair should be neatly combed and tied (for girls)",
        "Boys should maintain short, well-groomed hair",
        "School ID card must be worn at all times",
        "Uniforms should be properly labeled with student name and class"
      ],
      color: "green"
    },
    {
      icon: <XCircle className="w-10 h-10" />,
      title: "Don'ts",
      points: [
        "Do not wear torn or faded uniforms",
        "Avoid wearing excessive jewelry or accessories",
        "Do not alter uniform design or color",
        "Colorful hair bands or clips are not permitted",
        "Nail polish and makeup are strictly prohibited"
      ],
      color: "red"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: { border: "border-blue-400", bg: "bg-blue-50", icon: "bg-blue-100", text: "text-blue-700" },
      pink: { border: "border-pink-400", bg: "bg-pink-50", icon: "bg-pink-100", text: "text-pink-700" },
      indigo: { border: "border-indigo-400", bg: "bg-indigo-50", icon: "bg-indigo-100", text: "text-indigo-700" },
      purple: { border: "border-purple-400", bg: "bg-purple-50", icon: "bg-purple-100", text: "text-purple-700" },
      green: { border: "border-green-400", bg: "bg-green-50", icon: "bg-green-100", text: "text-green-700" },
      orange: { border: "border-orange-400", bg: "bg-orange-50", icon: "bg-orange-100", text: "text-orange-700" }
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
              <Shirt className="w-4 h-4 text-[#F4C430] mr-2" />
              <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">School Dress Code</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
              School{" "}
              <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">Uniforms</span>
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
              Maintaining a professional appearance through proper school uniform dress code
            </p>
          </Reveal>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Uniform Categories */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-20">
          {uniformCategories.map((category, index) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <Reveal key={index} delay={300 + index * 100}>
                <div className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-l-4 ${colorClasses.border} border-[#123C73]/5 hover:border-[#F4C430]/20`}>
                  <div className={`${colorClasses.bg} p-6 lg:p-8`}>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{category.icon}</div>
                      <h3 className={`text-xl font-bold ${colorClasses.text} group-hover:text-[#123C73] transition-colors duration-300`}>
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-4 group/item">
                          <div className={`flex-shrink-0 w-8 h-8 ${colorClasses.icon} rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300`}>
                            <CheckCircle className={`w-4 h-4 ${colorClasses.text}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#1B1F24] mb-1">{item.label}</h4>
                            <p className="text-[#667085] text-sm">{item.description}</p>
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
          <div className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] rounded-3xl p-8 lg:p-14 text-white mb-12 lg:mb-20 shadow-2xl shadow-[#123C73]/20 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C430]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-[#F4C430] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shirt className="w-8 h-8 text-[#123C73]" />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-3">Sports Uniform</h2>
                <p className="text-white/80 text-lg font-light">
                  Required for Physical Education classes and sports activities
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {sportsUniform.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors duration-300">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#F4C430]/20 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#F4C430]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.label}</h4>
                      <p className="text-white/70 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Guidelines Section */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-20">
          {uniformGuidelines.map((guideline, index) => (
            <Reveal key={index} delay={1000 + index * 100}>
              <div className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 lg:p-10 border-l-4 ${
                guideline.color === 'green' ? 'border-green-500' : 'border-red-500'
              }`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                  guideline.color === 'green' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {guideline.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#1B1F24] mb-6 text-center">{guideline.title}</h3>
                <ul className="space-y-4">
                  {guideline.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                        guideline.color === 'green' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {pointIndex + 1}
                      </div>
                      <p className="text-[#667085] leading-relaxed pt-0.5">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Purchase Information */}
        <Reveal delay={1200}>
          <div className="bg-gradient-to-br from-[#F4C430]/5 to-[#123C73]/5 rounded-3xl p-8 lg:p-12 border border-[#F4C430]/20 shadow-lg mb-10 lg:mb-14">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 bg-[#F4C430] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Store className="w-8 h-8 text-[#123C73]" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#1B1F24] mb-6">Where to Purchase Uniforms</h3>
                <div className="space-y-4">
                  {[
                    "School uniforms are available at the school uniform store located in the campus.",
                    "Store timings: Monday to Friday, 9:00 AM - 4:00 PM (except lunch break 1:00 PM - 2:00 PM)",
                    "Uniforms can also be purchased from authorized vendors listed on the school website.",
                    "Please ensure correct sizing by visiting the store with your ward before purchasing."
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#F4C430]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-[#123C73]" />
                      </div>
                      <p className="text-[#667085]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Contact Section */}
        <Reveal delay={1300}>
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-[#123C73]/5">
              <div className="w-14 h-14 bg-[#F4C430]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-[#123C73]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1F24] mb-3">Need Assistance?</h3>
              <p className="text-[#667085] mb-6">
                For queries regarding uniforms, sizes, or purchase details, please contact the school office.
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

export default SchoolUniforms;