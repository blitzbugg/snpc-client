import React, { useEffect, useState, useRef } from 'react';
import { BookOpen, Download, Store, BookMarked, Phone, Mail, Sparkles, ArrowRight, CheckCircle, AlertCircle, FileText, Info } from 'lucide-react';

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

const TextbooksList = () => {
  const [textbooks, setTextbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const infoCards = [
    {
      icon: <BookMarked className="w-8 h-8" />,
      title: "NCERT & State Board",
      description: "Complete list of prescribed textbooks for all classes following CBSE curriculum and state board guidelines."
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: "School Bookstore",
      description: "Books available at the school bookstore with genuine editions and competitive pricing."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
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

  const getFileUrl = (file) => {
    if (!file) return null;
    
    if (typeof file === 'string') {
      const apiUrl = process.env.NEXT_PUBLIC_CMS_URL || '';
      return `${apiUrl}/api/media/file/${file}`;
    }
    
    if (file.url) {
      const apiUrl = process.env.NEXT_PUBLIC_CMS_URL || '';
      return file.url.startsWith('http') ? file.url : `${apiUrl}${file.url}`;
    }
    
    return null;
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
              <BookOpen className="w-4 h-4 text-[#F4C430] mr-2" />
              <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">Academics</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
              List of{" "}
              <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">Textbooks</span>
              {" "}{currentYear}-{currentYear + 1}
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
              Comprehensive textbook list for all classes and subjects
            </p>
          </Reveal>

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
                <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-[#123C73] to-[#F4C430] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="w-14 h-14 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(card.icon, { className: "w-7 h-7 text-[#123C73]" })}
                </div>
                <h3 className="text-lg font-bold text-[#1B1F24] mb-3 group-hover:text-[#123C73] transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-[#667085] text-sm leading-relaxed">{card.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <Reveal delay={500}>
            <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 max-w-4xl mx-auto p-12 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 border-4 border-[#123C73]/10 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#F4C430] rounded-full animate-spin"></div>
              </div>
              <p className="text-[#667085] font-medium text-lg">Loading textbooks...</p>
            </div>
          </Reveal>
        )}

        {/* Error State */}
        {error && !loading && (
          <Reveal delay={500}>
            <div className="bg-white rounded-3xl shadow-xl border border-red-200 max-w-4xl mx-auto p-10 text-center">
              <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1F24] mb-3">Unable to Load Textbooks</h2>
              <p className="text-[#667085] mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </Reveal>
        )}

        {/* Textbooks List */}
        {!loading && !error && textbooks.length > 0 && (
          <div className="space-y-8">
            {textbooks.map((textbook, index) => (
              <Reveal key={textbook.id} delay={500 + index * 100}>
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#123C73]/5 max-w-4xl mx-auto">
                  <div className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] p-8 lg:p-10 text-center overflow-hidden">
                    <div className="absolute inset-0">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#F4C430]/10 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-[#F4C430] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-[#123C73]" />
                      </div>
                      <h2 className="text-xl md:text-3xl font-bold text-white mb-2">{textbook.title}</h2>
                      {textbook.description && (
                        <p className="text-white/80 text-base">{textbook.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-10 text-center">
                    <a 
                      href={getFileUrl(textbook.file)} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#123C73]/20 hover:-translate-y-1 text-lg"
                    >
                      <Download className="w-6 h-6 group-hover:translate-y-0.5 transition-transform duration-300" />
                      Download PDF
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                    
                    <p className="text-[#667085] text-sm mt-4">
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
            <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 max-w-4xl mx-auto p-12 text-center">
              <div className="w-24 h-24 bg-[#123C73]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-[#667085]/30" />
              </div>
              <h2 className="text-2xl font-bold text-[#1B1F24] mb-3">No Textbooks Available</h2>
              <p className="text-[#667085]">Textbook list will be updated soon. Please check back later.</p>
            </div>
          </Reveal>
        )}

        {/* Important Notes Section */}
        <Reveal delay={600}>
          <div className="mt-16 lg:mt-20 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#F4C430]/5 to-[#123C73]/5 rounded-3xl p-8 lg:p-10 border border-[#F4C430]/20 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                  <Info className="w-5 h-5 text-[#123C73]" />
                </div>
                <h3 className="text-xl font-bold text-[#1B1F24]">Important Notes</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Students are required to purchase textbooks before the commencement of the academic year.",
                  "Books can be purchased from the school bookstore or authorized vendors.",
                  "Please ensure you buy the correct edition as mentioned in the list.",
                  "Notebooks, stationery items, and school uniforms are available at the school store."
                ].map((note, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#F4C430]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#123C73]" />
                    </div>
                    <span className="text-[#667085]">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Contact Section */}
        <Reveal delay={700}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-[#123C73]/5">
              <div className="w-14 h-14 bg-[#F4C430]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-[#123C73]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1F24] mb-3">Need Help?</h3>
              <p className="text-[#667085] mb-6">
                For any queries regarding textbooks, availability, or purchasing options, please contact our academic office.
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

export default TextbooksList;