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

const FeeStructure = () => {
  const [feeData, setFeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  const infoCards = [
    {
      icon: "📅",
      title: "Payment Schedule",
      description: "Fees can be paid in installments: June, September, and December. Annual payment option available with discount."
    },
    {
      icon: "💳",
      title: "Payment Methods",
      description: "Cash, Cheque, Demand Draft, Online Transfer, and UPI payments accepted at the school office."
    },
    {
      icon: "📞",
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
        
        // Get the active fee document
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
              <span className="text-[#0D47A1] font-semibold text-sm tracking-wide">ACADEMICS</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Fee <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">Structure</span> {currentYear}
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {feeData?.description || "Transparent and affordable education for all students"}
            </p>
          </Reveal>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {infoCards.map((card, index) => (
            <Reveal key={index} delay={300 + index * 100}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-[#0D47A1]">
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Main Content Card */}
        <Reveal delay={500}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] p-12 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-3xl font-bold text-white mb-3">
                {feeData?.title || "Fee Structure Details"}
              </h2>
              <p className="text-blue-100 text-lg">
                Download our comprehensive fee structure document
              </p>
            </div>
            
            <div className="p-12">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D47A1]"></div>
                  <p className="text-gray-600 mt-4">Loading fee structure...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-500 text-lg mb-4">⚠️ Unable to load fee structure</div>
                  <p className="text-gray-600">{error}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-6 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">Complete Fee Breakdown</h3>
                        <p className="text-gray-600">Detailed fee structure for all classes from Pre-Primary to Senior Secondary</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">Payment Information</h3>
                        <p className="text-gray-600">Installment options, payment methods, and discount details</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">Terms & Conditions</h3>
                        <p className="text-gray-600">Refund policy, concessions, and important notes</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    {feeData?.file?.url ? (
                      <a 
                        href={feeData.file.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-lg"
                      >
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Fee Structure PDF
                        <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ) : (
                      <div className="text-gray-500 py-8">
                        Fee structure document will be available soon
                      </div>
                    )}
                    
                    {feeData?.file?.url && (
                      <p className="text-gray-500 text-sm mt-4">
                        PDF Document • Updated for Academic Year {currentYear}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </Reveal>

        {/* Contact Section */}
        <Reveal delay={600}>
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-l-4 border-yellow-400 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                For any queries regarding fees, payment schedules, or concessions, please contact our accounts department.
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

export default FeeStructure;