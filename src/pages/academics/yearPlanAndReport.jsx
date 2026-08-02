import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Calendar, Download, FileText, Clock, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

// Scroll-reveal component
function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  from = "up",
}) {
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
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${hiddenTransform}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const AcademicCalendarPage = () => {
  const staticData = {
    title: "Academic Calendar",
    subtitle: "Stay Informed with Our Comprehensive Academic Year Plan and Schedule",
    currentYear: "2024-25",
    mainImage: {
      url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
      alt: "Academic calendar and planning",
    },
    documents: [],
  };

  const [data, setData] = useState(staticData);
  const [loading, setLoading] = useState(false);
  const [docsLoading, setDocsLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setDocsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/year-plan-and-calender`);
        if (!res.ok) throw new Error('Failed to fetch documents');
        const result = await res.json();

        const docs = Array.isArray(result.docs) ? result.docs : result.data || [];

        const formatBytes = (bytes) => {
          if (!bytes && bytes !== 0) return null;
          const thresh = 1024;
          if (Math.abs(bytes) < thresh) return bytes + ' B';
          const units = ['KB','MB','GB','TB'];
          let u = -1;
          do { bytes /= thresh; ++u; } while (Math.abs(bytes) >= thresh && u < units.length - 1);
          return bytes.toFixed(u<1?0:1) + ' ' + units[u];
        };

        const mapped = docs.map(d => ({
          id: d.id ?? d._id,
          title: d.title,
          description: d.description,
          icon: '📄',
          fileSize: d.document?.filesize ? formatBytes(d.document.filesize) : null,
          pages: d.pages || null,
          year: d.createdAt ? new Date(d.createdAt).getFullYear().toString() : null,
          pdfUrl: d.document?.url || null,
        }));

        setData(prev => ({ ...prev, documents: mapped }));
        setDocsLoading(false);
      } catch (err) {
        setError(err.message);
        setDocsLoading(false);
      }
    };

    fetchDocs();
  }, []);

  const handleDownload = (pdfUrl, fileName) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Download not available for: ${fileName}`);
    }
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
          {loading ? (
            <>
              <div className="flex justify-center mb-6">
                <Skeleton
                  height={40}
                  width={160}
                  className="rounded-full"
                  baseColor="#E8EDF5"
                  highlightColor="#F7F9FC"
                />
              </div>
              <Skeleton
                height={56}
                width={500}
                className="mx-auto mb-6"
                baseColor="#E8EDF5"
                highlightColor="#F7F9FC"
              />
              <Skeleton
                height={24}
                width={600}
                className="mx-auto"
                baseColor="#E8EDF5"
                highlightColor="#F7F9FC"
                count={2}
              />
            </>
          ) : error ? (
            <div className="text-center">
              <div className="inline-flex items-center px-5 py-2.5 bg-red-50 rounded-full border border-red-200 mb-6">
                <Sparkles className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-red-600 font-semibold text-sm tracking-wider uppercase">
                  Error
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B1F24] mb-6">
                Unable to Load Content
              </h2>
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <Reveal>
                <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
                  <Calendar className="w-4 h-4 text-[#F4C430] mr-2" />
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Academic Year {currentYear}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
                  Academic{" "}
                  <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                    Calendar & Year Plan
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
                  {data?.subtitle}
                </p>
              </Reveal>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
                <BookOpen className="w-5 h-5 text-[#F4C430]" />
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
              </div>
            </>
          )}
        </div>

        {/* Hero Image */}
        <Reveal delay={300}>
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#123C73]/10 mb-16 lg:mb-24 group">
            <img
              src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80"
              alt="Academic calendar and planning"
              className="w-full h-80 lg:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/90 via-[#123C73]/40 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#F4C430] rounded-2xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#123C73]" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-1">
                    Plan Your Academic Year
                  </h2>
                  <p className="text-lg text-white/80">
                    Download detailed schedules, term plans, and important dates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Download Documents Section */}
        {!loading && !error && data?.documents && (
          <div>
            {/* Section Divider */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px flex-1 bg-[#123C73]/10"></div>
              <div className="px-6 py-2 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                  Downloads
                </span>
              </div>
              <div className="h-px flex-1 bg-[#123C73]/10"></div>
            </div>

            <Reveal delay={400}>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1F24] text-center mb-4">
                Download{" "}
                <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                  Documents
                </span>
              </h3>
              <p className="text-lg text-[#667085] text-center mb-12 max-w-2xl mx-auto">
                Access all academic planning documents in PDF format
              </p>
            </Reveal>

            {/* Loading State */}
            {docsLoading ? (
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-3xl p-6 shadow-lg border border-[#123C73]/5 animate-pulse">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-[#E8EDF5] rounded-2xl flex-shrink-0"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-6 bg-[#E8EDF5] rounded-lg w-3/4"></div>
                        <div className="h-4 bg-[#E8EDF5] rounded-lg w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 bg-[#E8EDF5] rounded-lg w-full"></div>
                      <div className="h-4 bg-[#E8EDF5] rounded-lg w-4/5"></div>
                    </div>
                    <div className="h-12 bg-[#E8EDF5] rounded-xl w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {data.documents.map((doc, index) => (
                  <Reveal key={doc.id} delay={500 + index * 100}>
                    <div className="group relative bg-white rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20">
                      {/* Top Gradient Line */}
                      <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-[#123C73] to-[#F4C430] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      
                      <div className="flex items-start gap-4 mb-5">
                        {/* Icon */}
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#F4C430]/20 to-[#123C73]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                            {doc.icon}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-[#1B1F24] mb-2 group-hover:text-[#123C73] transition-colors duration-300">
                            {doc.title}
                          </h4>
                          {doc.fileSize && (
                            <div className="flex items-center gap-2 text-sm text-[#667085]">
                              <FileText className="w-4 h-4" />
                              <span>{doc.fileSize}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-[#667085] mb-6 leading-relaxed">
                        {doc.description}
                      </p>
                      
                      <button
                        onClick={() => handleDownload(doc.pdfUrl, doc.title)}
                        className="group/btn w-full bg-[#123C73] text-white font-bold py-4 px-6 rounded-2xl hover:bg-[#0A2348] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#123C73]/20 hover:-translate-y-1 flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5 group-hover/btn:translate-y-0.5 transition-transform duration-300" />
                        Download PDF
                        <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#123C73] rounded-full animate-pulse opacity-20"></div>
      <div
        className="absolute top-32 right-20 w-2 h-2 bg-[#F4C430] rounded-full animate-pulse opacity-30"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-4 h-4 bg-[#123C73] rounded-full animate-pulse opacity-20"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 right-32 w-3 h-3 bg-[#F4C430] rounded-full animate-pulse opacity-30"
        style={{ animationDelay: "1.5s" }}
      ></div>
    </div>
  );
};

export default AcademicCalendarPage;