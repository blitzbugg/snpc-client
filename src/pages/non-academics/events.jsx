import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Calendar, Filter, Sparkles, ArrowRight, Camera, Video, Facebook, ExternalLink } from 'lucide-react';

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

const EventsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("2024");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/events`);
        if (!res.ok) throw new Error('Failed to fetch events');
        const result = await res.json();

        const docs = result?.docs || [];

        const events = docs.map((ev) => ({
          id: ev.id ?? ev._id ?? String(Math.random()).slice(2),
          title: ev.title,
          category: (ev.category || '').toLowerCase(),
          publishDate: ev.publishDate || ev.updatedAt || ev.createdAt,
          date: ev.publishDate ? new Date(ev.publishDate).toLocaleDateString() : (ev.date || ''),
          year: ev.publishDate ? String(new Date(ev.publishDate).getFullYear()) : (ev.year || ''),
          description: ev.content || ev.description || '',
          coverImage: ev.images?.url || ev.coverImage || (ev.images && typeof ev.images === 'string' ? ev.images : null),
          photoCount: ev.photoCount || 0,
          videoCount: ev.videoCount || 0,
        }));

        const yearsSet = new Set(events.map((e) => e.year).filter(Boolean));
        const years = Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));

        const categoryIcons = { cultural: '🎭', sports: '⚽', celebration: '🎉', academic: '📚' };
        const categoriesSet = new Map();
        events.forEach((e) => {
          const id = e.category || 'other';
          if (!categoriesSet.has(id)) {
            categoriesSet.set(id, { id, name: id === 'other' ? 'Other' : id.charAt(0).toUpperCase() + id.slice(1), icon: categoryIcons[id] || '🎯' });
          }
        });
        const categories = [{ id: 'all', name: 'All Events', icon: '🎯' }, ...Array.from(categoriesSet.values())];

        const dataObj = {
          title: 'School Events',
          subtitle: 'A Visual Journey Through Our Memorable Celebrations and Activities',
          years: years.length ? years : ['2024'],
          categories,
          events,
        };

        setData(dataObj);
        if (years.length) setSelectedYear(years[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = data?.events?.filter(
    event => 
      (selectedCategory === "all" || event.category === selectedCategory) &&
      event.year === selectedYear
  );

  // Facebook page URL
  const facebookPageUrl = "https://www.facebook.com/p/S-N-Public-School-Kizhavoor-Mukhathala-100067848552245/";

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
                <Skeleton height={40} width={160} className="rounded-full" baseColor="#E8EDF5" highlightColor="#F7F9FC" />
              </div>
              <Skeleton height={56} width={500} className="mx-auto mb-6" baseColor="#E8EDF5" highlightColor="#F7F9FC" />
              <Skeleton height={24} width={600} className="mx-auto" baseColor="#E8EDF5" highlightColor="#F7F9FC" count={2} />
            </>
          ) : error ? (
            <div className="text-center">
              <div className="inline-flex items-center px-5 py-2.5 bg-red-50 rounded-full border border-red-200 mb-6">
                <Sparkles className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-red-600 font-semibold text-sm tracking-wider uppercase">Error</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B1F24] mb-6">Unable to Load Content</h2>
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <Reveal>
                <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
                  <Calendar className="w-4 h-4 text-[#F4C430] mr-2" />
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Event Gallery
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
                  School{" "}
                  <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                    Events
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
                <Filter className="w-5 h-5 text-[#F4C430]" />
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
              </div>
            </>
          )}
        </div>

        {/* Year and Category Filters */}
        {!loading && !error && (
          <div className="mb-10 lg:mb-14">
            {/* Year Selector */}
            <Reveal delay={300}>
              <div className="flex justify-center gap-3 mb-6">
                {data?.years?.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                      selectedYear === year
                        ? "bg-[#123C73] text-white shadow-xl shadow-[#123C73]/20 scale-105"
                        : "bg-white text-[#667085] hover:bg-[#F7F9FC] shadow-md border border-[#123C73]/5"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Category Filter */}
            <Reveal delay={400}>
              <div className="flex flex-wrap justify-center gap-3">
                {data?.categories?.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-[#123C73] text-white shadow-lg scale-105"
                        : "bg-white text-[#667085] hover:bg-[#F7F9FC] shadow-md border border-[#123C73]/5"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && filteredEvents && (
          <div className="mb-16 lg:mb-24">
            {filteredEvents.length === 0 ? (
              <Reveal delay={500}>
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-[#123C73]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-12 h-12 text-[#667085]/30" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B1F24] mb-2">No Events Found</h3>
                  <p className="text-[#667085]">Try selecting a different category or year</p>
                </div>
              </Reveal>
            ) : (
              <>
                <Reveal delay={500}>
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                      <span className="text-[#667085] text-sm">
                        Showing <span className="font-bold text-[#123C73]">{filteredEvents.length}</span> events
                      </span>
                    </div>
                  </div>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredEvents.map((event, index) => (
                    <Reveal key={event.id} delay={600 + index * 50}>
                      <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20 transform hover:-translate-y-2">
                        {/* Image Section */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={event.coverImage}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/70 via-[#123C73]/20 to-transparent"></div>
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <div className="bg-[#F4C430] text-[#123C73] px-4 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </div>
                          </div>

                          {/* Media Count Badges */}
                          <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            {event.photoCount > 0 && (
                              <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-[#123C73] flex items-center gap-1">
                                <Camera className="w-3 h-3" />
                                {event.photoCount}
                              </span>
                            )}
                            {event.videoCount > 0 && (
                              <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-[#123C73] flex items-center gap-1">
                                <Video className="w-3 h-3" />
                                {event.videoCount}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-[#667085] mb-3">
                            <Calendar className="w-4 h-4 text-[#123C73]" />
                            <span className="font-semibold">{event.date}</span>
                          </div>
                          
                          <h4 className="text-xl font-bold text-[#1B1F24] mb-3 group-hover:text-[#123C73] transition-colors duration-300">
                            {event.title}
                          </h4>
                          
                          <p className="text-sm text-[#667085] leading-relaxed line-clamp-3">
                            {event.description}
                          </p>

                          {/* Bottom Accent */}
                          <div className="mt-4 flex items-center gap-2">
                            <div className="h-px flex-1 bg-[#123C73]/10"></div>
                            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
                            <div className="h-px flex-1 bg-[#123C73]/10"></div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Call to Action - Facebook */}
        {!loading && !error && (
          <Reveal delay={1000}>
            <div className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] rounded-3xl p-8 lg:p-12 shadow-2xl shadow-[#123C73]/20 overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C430]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1877F2] rounded-2xl mb-6">
                    <Facebook className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Follow Us on Facebook
                  </h3>
                  <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                    Stay updated with our latest events, activities, and school news by following our official Facebook page
                  </p>
                  
                  <a
                    href={facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#1877F2] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#166fe5] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Facebook className="w-5 h-5" />
                    Visit Our Facebook Page
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#123C73] rounded-full animate-pulse opacity-20"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#123C73] rounded-full animate-pulse opacity-20" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-40 right-32 w-3 h-3 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{ animationDelay: "1.5s" }}></div>
    </div>
  );
};

export default EventsPage;