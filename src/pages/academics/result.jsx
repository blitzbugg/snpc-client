import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Scroll-reveal component for animations
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

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Helper function to format file size
  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return "N/A";
    const thresh = 1024;
    if (Math.abs(bytes) < thresh) return bytes + " B";
    const units = ["KB", "MB", "GB", "TB"];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(u < 1 ? 0 : 1) + " " + units[u];
  };

  // Helper function to open PDF in new tab
  const handleDownload = (pdfUrl, fileName) => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    } else {
      alert(`Download not available for: ${fileName}`);
    }
  };

  // Fetch results from API
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get API URL from environment variable
        const apiUrl = process.env.NEXT_PUBLIC_CMS_URL || process.env.REACT_APP_CMS_URL;
        
        if (!apiUrl) {
          throw new Error("API URL not configured. Please set NEXT_PUBLIC_CMS_URL or REACT_APP_CMS_URL in your environment variables.");
        }

        const response = await fetch(`${apiUrl}/api/result`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch results: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Extract docs array from response
        const docs = Array.isArray(data.docs) ? data.docs : [];
        
        if (docs.length === 0) {
          console.warn("No results found in API response");
        }

        setResults(docs);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-sky-400 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-300 mb-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-semibold text-sm tracking-wide">
                ACADEMIC RESULTS {currentYear}
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Academic{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                Results
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Celebrating Excellence and Achievement in Education
            </p>
          </Reveal>
        </div>

        {/* Hero Image */}
        <Reveal delay={400}>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-20">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
              alt="Students celebrating academic success"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                Outstanding Performance
              </h2>
              <p className="text-lg text-blue-100">
                Our students continue to excel and set new benchmarks
              </p>
            </div>
          </div>
        </Reveal>

        {/* Error State */}
        {error && (
          <div className="mb-20">
            <Reveal>
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full border border-red-200 mb-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-red-600 font-semibold text-sm tracking-wide">
                    ERROR
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Unable to Load Results
                </h3>
                <p className="text-red-600 mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </Reveal>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="mb-20">
            <Reveal delay={400}>
              <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                Download{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Results
                </span>
              </h3>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Access detailed board examination results in PDF format
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Skeleton circle width={64} height={64} />
                    <div className="flex-1">
                      <Skeleton height={24} width="80%" className="mb-2" />
                      <Skeleton height={16} width="60%" />
                    </div>
                  </div>
                  <Skeleton height={16} count={2} className="mb-6" />
                  <Skeleton height={48} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && results.length > 0 && (
          <div className="mb-20">
            <Reveal delay={400}>
              <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                Download{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Results
                </span>
              </h3>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Access detailed board examination results in PDF format
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <Reveal key={result.id} delay={500 + index * 100}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        📄
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {result.title}
                        </h4>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          {result.document?.filename && (
                            <span className="flex items-center gap-1">
                              📎 {result.document.filename}
                            </span>
                          )}
                          {result.document?.filesize && (
                            <span className="flex items-center gap-1">
                              💾 {formatBytes(result.document.filesize)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {result.description}
                    </p>

                    {result.document?.createdAt && (
                      <p className="text-sm text-gray-500 mb-4">
                        📅 Uploaded: {new Date(result.document.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                    
                    <button
                      onClick={() => handleDownload(result.document?.url, result.title)}
                      disabled={!result.document?.url}
                      className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
                        result.document?.url
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg transform hover:-translate-y-1'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {result.document?.url ? 'Download PDF' : 'Not Available'}
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && results.length === 0 && (
          <div className="mb-20">
            <Reveal delay={400}>
              <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Results Available
                </h3>
                <p className="text-gray-600 mb-6">
                  Results will be published here once they are available.
                </p>
                <a
                  href="/contact-us"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Contact Us for More Information
                </a>
              </div>
            </Reveal>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
      <div
        className="absolute top-32 right-20 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-4 h-4 bg-sky-400 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 right-32 w-3 h-3 bg-blue-600 rounded-full animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-1/2 left-32 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>
    </div>
  );
};

export default ResultsPage;