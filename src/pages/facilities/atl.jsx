import React, { useEffect, useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

const ATLPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/atl`);
        if (!res.ok) throw new Error('Failed to fetch ATL content');
        const result = await res.json();

        // Support both paginated docs shape and direct object
        let doc = result?.docs && result.docs.length ? result.docs[0] : result;

        if (doc) {
          // Normalize content: if API returns a single string, split into paragraph blocks
          if (typeof doc.content === 'string') {
            const paragraphs = doc.content
              .split(/\n\s*\n/) // split on double newlines
              .map((p, i) => ({ id: `p-${i}`, paragraph: p }));
            doc.content = paragraphs;
          } else if (!Array.isArray(doc.content)) {
            doc.content = [];
          }

          // Normalize image field name variations
          if (!doc.image && doc.mainImage) doc.image = doc.mainImage;
        }

        setData(doc);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-sky-400 rounded-full -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {loading ? (
            <>
              <Skeleton 
                height={8} 
                width={120} 
                className="mx-auto mb-6 rounded-full" 
                baseColor="#f3f4f6" 
                highlightColor="#e5e7eb"
              />
              <Skeleton 
                height={48} 
                width={400} 
                className="mx-auto mb-6" 
                baseColor="#f3f4f6" 
                highlightColor="#e5e7eb"
              />
              <Skeleton 
                height={24} 
                width={600} 
                className="mx-auto" 
                baseColor="#f3f4f6" 
                highlightColor="#e5e7eb"
                count={2}
              />
            </>
          ) : error ? (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full border border-red-200 mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-red-600 font-semibold text-sm tracking-wide">ERROR</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Unable to Load Content
              </h2>
              <p className="text-lg text-red-600">{error}</p>
            </div>
          ) : (
            <>
              <Reveal>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-300 mb-6">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-semibold text-sm tracking-wide">INNOVATION HUB</span>
                </div>
              </Reveal>
              
              <Reveal delay={100}>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {data?.title ? (
                    <>
                      {data.title.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                        {data.title.split(' ').slice(-1)[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      Atal Tinkering <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Lab</span>
                    </>
                  )}
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {data?.subtitle}
                </p>
              </Reveal>
            </>
          )}
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Image Section */}
          <div className="relative">
            <Reveal delay={300}>
              <div className="relative">
                {loading ? (
                  <div className="aspect-[4/3] w-full">
                    <Skeleton 
                      height="100%" 
                      width="100%"
                      className="rounded-2xl"
                      baseColor="#f3f4f6" 
                      highlightColor="#e5e7eb"
                    />
                  </div>
                ) : (
                  (data?.image?.url || data?.mainImage?.url) && (
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                      <img 
                        src={data?.image?.url || data?.mainImage?.url}
                        alt={data?.image?.alt || data?.mainImage?.alt || 'Atal Tinkering Lab'}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent"></div>

                      {/* Floating Badge */}
                      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                        <p className="text-sm font-semibold text-gray-900">Powered by NITI Aayog</p>
                        <p className="text-xs text-gray-600">Atal Innovation Mission</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <Reveal delay={400} from="right">
              <div className="prose prose-lg max-w-none">
                {loading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="space-y-3">
                        <Skeleton 
                          height={20} 
                          baseColor="#f3f4f6" 
                          highlightColor="#e5e7eb" 
                          count={4} 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {data?.content?.map((item, index) => (
                      <Reveal key={item.id} delay={500 + index * 100} from="right">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {item.paragraph?.split('\n').map((line, i, arr) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < arr.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Features Grid Section */}
        {/* {!loading && !error && data?.features && (
          <div className="mb-20">
            <Reveal delay={600}>
              <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Facilities</span>
              </h3>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Cutting-edge tools and technologies to bring ideas to life
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.features.map((feature, index) => (
                <Reveal key={feature.id} delay={700 + index * 100}>
                  <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )} */}

        {/* Stats Section */}
        {/* {!loading && !error && (
          <Reveal delay={900}>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 lg:p-12 shadow-2xl mb-20">
              <div className="grid md:grid-cols-3 gap-8 text-center text-white">
                <div className="space-y-2">
                  <div className="text-4xl lg:text-5xl font-bold">500+</div>
                  <div className="text-purple-100">Students Benefited</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl lg:text-5xl font-bold">50+</div>
                  <div className="text-purple-100">Projects Completed</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl lg:text-5xl font-bold">15+</div>
                  <div className="text-purple-100">Awards Won</div>
                </div>
              </div>
            </div>
          </Reveal>
        )} */}

        {/* Call to Action Section */}
        {/* {!loading && !error && (
          <Reveal delay={1000}>
            <div className="text-center pt-12 border-t border-gray-200">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Ready to Innovate?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join us in our journey to nurture the next generation of innovators and problem solvers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  Get in Touch
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a 
                  href="/gallery/atl" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  View Gallery
                </a>
              </div>
            </div>
          </Reveal>
        )} */}
      </div>

        {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-sky-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-32 w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};

export default ATLPage;