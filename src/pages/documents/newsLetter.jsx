import React, { useEffect, useState, useRef } from 'react';
import { Newspaper, Download, Calendar, Mail, Phone, Sparkles, ArrowRight, CheckCircle, BookOpen, Trophy, Star, Users } from 'lucide-react';

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

const AnnualNewsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const highlightCards = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Achievements",
      description: "Academic excellence, sports victories, and competition wins"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Events & Activities",
      description: "Cultural programs, celebrations, and special occasions"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student Stories",
      description: "Inspiring tales of student success and leadership"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Faculty Features",
      description: "Dedicated teachers and their innovative approaches"
    }
  ];

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000';
        const response = await fetch(`${apiUrl}/api/newsletter`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch newsletters');
        }
        
        const data = await response.json();
        
        const activeNewsletters = data.docs
          .filter(newsletter => newsletter.isActive)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setNewsletters(activeNewsletters);
        setError(null);
      } catch (err) {
        console.error('Error fetching newsletters:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const getYear = (newsletter) => {
    const yearMatch = newsletter.title.match(/(\d{4}(?:-\d{2,4})?)/);
    if (yearMatch) return yearMatch[1];
    return new Date(newsletter.createdAt).getFullYear().toString();
  };

  const getFileUrl = (newsletter) => {
    if (newsletter.file && typeof newsletter.file === 'object') {
      return newsletter.file.url;
    }
    return null;
  };

  const getIcon = (index) => {
    const icons = ["📰", "📚", "📄", "📖", "📋", "📑", "📜"];
    return icons[index % icons.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#123C73]/10 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-[#F4C430] rounded-3xl animate-spin"></div>
            </div>
            <p className="text-[#667085] mt-6 font-medium text-lg">Loading newsletters...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-red-500" />
            </div>
            <p className="text-[#1B1F24] text-xl font-bold mb-2">Unable to load newsletters</p>
            <p className="text-[#667085]">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (newsletters.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Reveal>
            <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
              <Newspaper className="w-4 h-4 text-[#F4C430] mr-2" />
              <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">Publications</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6">
              Annual{" "}
              <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">Newsletter</span>
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="w-24 h-24 bg-[#123C73]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-12 h-12 text-[#667085]/30" />
            </div>
            <p className="text-lg md:text-xl text-[#667085] max-w-xl mx-auto">
              No newsletters available at the moment. Check back soon!
            </p>
          </Reveal>
        </div>
      </div>
    );
  }

  const featuredNewsletter = newsletters[0];
  const previousNewsletters = newsletters.slice(1);

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
              <Newspaper className="w-4 h-4 text-[#F4C430] mr-2" />
              <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">Publications</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
              Annual{" "}
              <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">Newsletter</span>
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-[#667085] max-w-3xl mx-auto leading-relaxed font-light">
              Celebrating our journey, achievements, and memories from each academic year
            </p>
          </Reveal>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* What's Inside Cards */}
        <div className="mb-12 lg:mb-20">
          <Reveal delay={300}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B1F24] mb-8 text-center">
              What's Inside Our Newsletter
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {highlightCards.map((card, index) => (
              <Reveal key={index} delay={400 + index * 100}>
                <div className="group bg-white rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20 text-center transform hover:-translate-y-2">
                  <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-[#123C73] to-[#F4C430] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {React.cloneElement(card.icon, { className: "w-7 h-7 text-[#123C73]" })}
                  </div>
                  <h3 className="text-lg font-bold text-[#1B1F24] mb-2 group-hover:text-[#123C73] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-[#667085] text-sm leading-relaxed">{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Featured Newsletter */}
        <Reveal delay={500}>
          <div className="mb-12 lg:mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B1F24] mb-8 text-center">
              Latest Edition
            </h2>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#123C73]/5 max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2">
                {/* Left side - Cover */}
                <div className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] p-12 flex flex-col items-center justify-center text-white overflow-hidden">
                  <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#F4C430]/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <div className="text-7xl mb-6">{getIcon(0)}</div>
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                      <span className="font-bold text-lg flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#F4C430]" />
                        {getYear(featuredNewsletter)}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{featuredNewsletter.title}</h3>
                    <div className="w-20 h-1 bg-[#F4C430] mx-auto rounded-full"></div>
                  </div>
                </div>

                {/* Right side - Details */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      New Release
                    </span>
                  </div>
                  
                  <p className="text-[#667085] text-lg leading-relaxed mb-8">
                    {featuredNewsletter.description || "Discover the latest highlights, achievements, and memorable moments from our school community."}
                  </p>

                  <div className="space-y-4 mb-8">
                    {["Full color digital magazine", "Comprehensive coverage", "Photo gallery & memories"].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[#F4C430]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-[#123C73]" />
                        </div>
                        <span className="text-[#667085] text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {getFileUrl(featuredNewsletter) && (
                    <a 
                      href={getFileUrl(featuredNewsletter)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#123C73]/20 hover:-translate-y-1"
                    >
                      <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
                      Download Newsletter
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Previous Editions */}
        {previousNewsletters.length > 0 && (
          <div>
            <Reveal delay={600}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
                <div className="px-6 py-2 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">Archive</span>
                </div>
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B1F24] mb-8 text-center">
                Previous Editions
              </h2>
            </Reveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {previousNewsletters.map((newsletter, index) => (
                <Reveal key={newsletter.id} delay={700 + index * 100}>
                  <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#123C73]/5 hover:border-[#F4C430]/20 transform hover:-translate-y-2">
                    <div className="bg-gradient-to-br from-[#123C73] to-[#0A2348] p-6 lg:p-8 text-center relative overflow-hidden">
                      <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4C430]/10 rounded-full blur-2xl"></div>
                      </div>
                      <div className="relative z-10">
                        <div className="text-5xl mb-4">{getIcon(index + 1)}</div>
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                          <span className="font-bold text-white text-sm flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#F4C430]" />
                            {getYear(newsletter)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white line-clamp-2">{newsletter.title}</h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-[#667085] text-sm mb-6 leading-relaxed line-clamp-3">
                        {newsletter.description || "View this edition of our annual newsletter."}
                      </p>
                      
                      {getFileUrl(newsletter) && (
                        <a 
                          href={getFileUrl(newsletter)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F7F9FC] hover:bg-[#123C73] text-[#667085] hover:text-white font-semibold rounded-xl transition-all duration-300"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <Reveal delay={900}>
          <div className="mt-16 lg:mt-20 text-center max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-[#F4C430]/5 to-[#123C73]/5 rounded-3xl p-8 lg:p-10 border border-[#F4C430]/20 shadow-lg">
              <div className="w-14 h-14 bg-[#F4C430] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-[#123C73]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1F24] mb-3">Want to Contribute?</h3>
              <p className="text-[#667085] mb-6 max-w-xl mx-auto">
                We welcome contributions from students, parents, and faculty for our annual newsletter. Share your stories, achievements, and memories with the SNPS community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:indianpublicschoolkollam@gmail.com?subject=Newsletter Contribution"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300 shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  Submit Your Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a 
                  href="tel:8891720292"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#123C73] font-semibold rounded-xl border-2 border-[#123C73]/20 hover:border-[#123C73] transition-all duration-300 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#123C73] rounded-full animate-pulse opacity-20"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#123C73] rounded-full animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-10 w-3 h-3 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};

export default AnnualNewsletter;