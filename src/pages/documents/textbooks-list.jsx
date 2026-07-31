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

const TextbooksList = () => {
  const [textbooks, setTextbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const infoCards = [
    {
      icon: "📚",
      title: "NCERT & State Board",
      description: "Complete list of prescribed textbooks for all classes following CBSE curriculum and state board guidelines."
    },
    {
      icon: "🪙",
      title: "School Bookstore",
      description: "Books available at the school bookstore with genuine editions and competitive pricing."
    },
    {
      icon: "📑",
      title: "Reference Materials",
      description: "Recommended reference books and supplementary materials for enhanced learning."
    }
  ];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const fetchTextbooks = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_CMS_URL || '';
        const response = await fetch(`${apiUrl}/api/textbooks`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch textbooks');
        }
        
        const data = await response.json();
        
        // Filter only active textbooks
        const activeTextbooks = data.docs?.filter(book => book.isActive) || [];
        setTextbooks(activeTextbooks);
        setError(null);
      } catch (err) {
        console.error('Error fetching textbooks:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTextbooks();
  }, []);

  // Helper function to get file URL
  const getFileUrl = (file) => {
    if (!file) return null;
    
    // If file is a string (ID), construct the URL
    if (typeof file === 'string') {
      const apiUrl = process.env.NEXT_PUBLIC_CMS_URL || '';
      return `${apiUrl}/api/media/file/${file}`;
    }
    
    // If file is an object with url property
    if (file.url) {
      const apiUrl = process.env.NEXT_PUBLIC_CMS_URL || '';
      return file.url.startsWith('http') ? file.url : `${apiUrl}${file.url}`;
    }
    
    return null;
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
              <span className="text-[#0D47A1] font-semibold text-sm tracking-wide">ACADEMICS</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              List of <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent">Textbooks</span> for Academic Year {currentYear}-{currentYear + 1}
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive textbook list for all classes and subjects
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

        {/* Loading State */}
        {loading && (
          <Reveal delay={500}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto p-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0D47A1] border-t-transparent mb-4"></div>
                <p className="text-gray-600 text-lg">Loading textbooks...</p>
              </div>
            </div>
          </Reveal>
        )}

        {/* Error State */}
        {error && !loading && (
          <Reveal delay={500}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-200 max-w-4xl mx-auto p-12">
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Textbooks</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-[#0D47A1] text-white rounded-lg hover:bg-[#1565C0] transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Textbooks List */}
        {!loading && !error && textbooks.length > 0 && (
          <div className="space-y-6">
            {textbooks.map((textbook, index) => (
              <Reveal key={textbook.id} delay={500 + index * 100}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] p-8 text-center">
                    <div className="text-5xl mb-3">📖</div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {textbook.title}
                    </h2>
                    {textbook.description && (
                      <p className="text-blue-100 text-base">
                        {textbook.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="p-8 text-center">
                    <a 
                      href={getFileUrl(textbook.file)} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-base"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    
                    <p className="text-gray-500 text-sm mt-3">
                      PDF Document • Click to view or download
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* No Textbooks Found */}
        {!loading && !error && textbooks.length === 0 && (
          <Reveal delay={500}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-w-4xl mx-auto p-12">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">No Textbooks Available</h2>
                <p className="text-gray-600">
                  Textbook list will be updated soon. Please check back later.
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* Important Notes Section */}
        <Reveal delay={600}>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-l-4 border-[#0D47A1] shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📌</span>
                Important Notes
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#0D47A1] font-bold mt-1">•</span>
                  <span>Students are required to purchase textbooks before the commencement of the academic year.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0D47A1] font-bold mt-1">•</span>
                  <span>Books can be purchased from the school bookstore or authorized vendors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0D47A1] font-bold mt-1">•</span>
                  <span>Please ensure you buy the correct edition as mentioned in the list.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0D47A1] font-bold mt-1">•</span>
                  <span>Notebooks, stationery items, and school uniforms are available at the school store.</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Contact Section */}
        <Reveal delay={700}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-l-4 border-yellow-400 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                For any queries regarding textbooks, availability, or purchasing options, please contact our academic office.
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

export default TextbooksList;