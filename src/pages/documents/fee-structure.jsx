import React, { useEffect, useState, useRef } from 'react';
import { Calendar, CreditCard, Phone, Mail, Download, FileText, Sparkles, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

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

const FeeStructure = () => {
  const [feeData, setFeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  const infoCards = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Payment Schedule",
      description: "Fees can be paid in installments: June, September, and December. Annual payment option available with discount."
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Payment Methods",
      description: "Cash, Cheque, Demand Draft, Online Transfer, and UPI payments accepted at the school office."
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Enquiries",
      description: "For fee-related queries, contact the accounts department during office hours: 9 AM - 4 PM"
    }
  ];

  useEffect(() => {
    const fetchFeeData = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_CMS_URL || process.env.REACT_APP_API_URL || '';
        const response = await fetch(`${apiUrl}/api/fees`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch fee data');
        }
        
        const data = await response.json();
        const activeFee = data.docs?.find(doc => doc.isActive) || data.docs?.[0];
        setFeeData(activeFee);
      } catch (err) {
        console.error('Error fetching fee data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeData();
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
          <Reveal>
            <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
              <FileText className="w-4 h-4 text-[#F4C430] mr-2" />
              <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                Academics
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
              Fee{" "}
              <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                Structure
              </span>{" "}
              {currentYear}
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
              {feeData?.description || "Transparent and affordable education for all students"}
            </p>
          </Reveal>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-20">
          {infoCards.map((card, index) => (
            <Reveal key={index} delay={300 + index * 100}>
              <div className="group bg-white rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20 transform hover:-translate-y-2">
                {/* Top Gradient Line */}
                <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-[#123C73] to-[#F4C430] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {React.cloneElement(card.icon, { className: "w-7 h-7 text-[#123C73]" })}
                  </div>
                  <h3 className="text-lg font-bold text-[#1B1F24] mb-3 group-hover:text-[#123C73] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-[#667085] text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Main Content Card */}
        <Reveal delay={500}>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#123C73]/5 max-w-4xl mx-auto">
            {/* Card Header */}
            <div className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] p-10 lg:p-14 text-center overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#F4C430]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#F4C430] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-[#123C73]" />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                  {feeData?.title || "Fee Structure Details"}
                </h2>
                <p className="text-white/80 text-lg font-light">
                  Download our comprehensive fee structure document
                </p>
              </div>
            </div>
            
            {/* Card Body */}
            <div className="p-8 lg:p-12">
              {loading ? (
                <div className="text-center py-12">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 border-4 border-[#123C73]/10 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#F4C430] rounded-full animate-spin"></div>
                  </div>
                  <p className="text-[#667085] mt-6 font-medium">Loading fee structure...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B1F24] mb-2">Unable to Load</h3>
                  <p className="text-[#667085]">{error}</p>
                </div>
              ) : (
                <>
                  {/* Features List */}
                  <div className="space-y-5 mb-10">
                    {[
                      { title: "Complete Fee Breakdown", description: "Detailed fee structure for all classes from Pre-Primary to Senior Secondary" },
                      { title: "Payment Information", description: "Installment options, payment methods, and discount details" },
                      { title: "Terms & Conditions", description: "Refund policy, concessions, and important notes" }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#F4C430]/10 rounded-xl flex items-center justify-center group-hover:bg-[#F4C430]/20 transition-colors duration-300">
                          <CheckCircle className="w-5 h-5 text-[#123C73]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1B1F24] text-lg mb-1">{feature.title}</h3>
                          <p className="text-[#667085] text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Download Button */}
                  <div className="text-center">
                    {feeData?.file?.url ? (
                      <>
                        <a 
                          href={feeData.file.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center px-10 py-5 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#123C73]/20 hover:-translate-y-1 text-lg"
                        >
                          <Download className="w-6 h-6 mr-3 group-hover:translate-y-0.5 transition-transform duration-300" />
                          Download Fee Structure PDF
                          <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                        <p className="text-[#667085] text-sm mt-4">
                          PDF Document • Updated for Academic Year {currentYear}
                        </p>
                      </>
                    ) : (
                      <div className="bg-[#F7F9FC] rounded-2xl p-8">
                        <FileText className="w-12 h-12 text-[#667085]/30 mx-auto mb-3" />
                        <p className="text-[#667085] font-medium">Fee structure document will be available soon</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </Reveal>

        {/* Contact Section */}
        <Reveal delay={600}>
          <div className="mt-16 lg:mt-20 text-center max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-[#F4C430]/5 to-[#123C73]/5 rounded-3xl p-8 lg:p-10 border border-[#F4C430]/20 shadow-lg">
              <div className="w-12 h-12 bg-[#F4C430] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-[#123C73]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1F24] mb-3">Need Help?</h3>
              <p className="text-[#667085] mb-6">
                For any queries regarding fees, payment schedules, or concessions, please contact our accounts department.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm">
                  <Phone className="w-4 h-4 text-[#123C73]" />
                  <span className="font-semibold text-[#1B1F24]">8891720292</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm">
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

export default FeeStructure;