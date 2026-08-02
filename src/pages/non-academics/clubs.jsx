import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Users, Calendar, Filter, Sparkles, ArrowRight, Star, Clock } from 'lucide-react';

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

const ClubsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/clubs`);
        if (!res.ok) throw new Error('Failed to fetch clubs');
        const result = await res.json();

        const docs = result?.docs || [];

        const inferCategory = (title = '', description = '') => {
          const txt = (title + ' ' + (description || '')).toLowerCase();
          if (/\b(drama|dance|art|music|literary|debate|poetry)\b/.test(txt)) return 'arts';
          if (/\b(robot|coding|computer|program|science|math|stem)\b/.test(txt)) return 'stem';
          if (/\b(football|basketball|yoga|sport|athlet|cricket|tennis)\b/.test(txt)) return 'sports';
          if (/\b(eco|nss|social|service|community|environment)\b/.test(txt)) return 'social';
          return 'other';
        };

        const clubs = docs.map((c) => ({
          id: c.id ?? c._id ?? String(Math.random()).slice(2),
          name: c.title || c.name || 'Club',
          description: c.description || c.content || '',
          category: (c.category && String(c.category).toLowerCase()) || inferCategory(c.title || c.name, c.description || c.content),
          meetingDay: c.meetingDay || c.meeting || 'TBD',
          members: c.members || '',
          image: c.image?.url || (typeof c.image === 'string' ? c.image : null),
        }));

        const categoryIcons = { arts: '🎨', stem: '🔬', sports: '⚽', social: '💚', other: '🎯' };
        const categoriesMap = new Map();
        clubs.forEach((cl) => {
          const id = cl.category || 'other';
          if (!categoriesMap.has(id)) {
            const name = id === 'other' ? 'Other' : id.charAt(0).toUpperCase() + id.slice(1);
            categoriesMap.set(id, { id, name, icon: categoryIcons[id] || '🎯' });
          }
        });

        const categories = [{ id: 'all', name: 'All Clubs', icon: '🎯' }, ...Array.from(categoriesMap.values())];

        const dataObj = {
          title: 'Student Clubs',
          subtitle: 'Discover Your Passion and Develop New Skills Through Diverse Club Activities',
          categories,
          clubs,
        };

        setData(dataObj);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredClubs = data?.clubs?.filter(
    club => selectedCategory === "all" || club.category === selectedCategory
  );

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
                  <Users className="w-4 h-4 text-[#F4C430] mr-2" />
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Co-Curricular Activities
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
                  Student{" "}
                  <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                    Clubs
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
                <Star className="w-5 h-5 text-[#F4C430]" />
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
              </div>
            </>
          )}
        </div>

        {/* Category Filter */}
        {!loading && !error && data?.categories && (
          <Reveal delay={300}>
            <div className="flex flex-wrap justify-center gap-3 mb-12 lg:mb-16">
              {data.categories.map((category) => (
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
        )}

        {/* Clubs Grid */}
        {!loading && !error && filteredClubs && (
          <div className="mb-16 lg:mb-24">
            {filteredClubs.length === 0 ? (
              <Reveal delay={400}>
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-[#123C73]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-12 h-12 text-[#667085]/30" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B1F24] mb-2">No Clubs Found</h3>
                  <p className="text-[#667085]">Try selecting a different category</p>
                </div>
              </Reveal>
            ) : (
              <>
                <Reveal delay={400}>
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                      <span className="text-[#667085] text-sm">
                        Showing <span className="font-bold text-[#123C73]">{filteredClubs.length}</span> clubs
                      </span>
                    </div>
                  </div>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredClubs.map((club, index) => (
                    <Reveal key={club.id} delay={500 + index * 50}>
                      <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20 transform hover:-translate-y-2">
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={club.image}
                            alt={club.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/70 via-[#123C73]/20 to-transparent"></div>
                          
                          {/* Club Category Badge */}
                          <div className="absolute top-4 left-4">
                            <div className="bg-[#F4C430] text-[#123C73] px-4 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                              {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
                            </div>
                          </div>

                          {/* Members Count */}
                          <div className="absolute bottom-4 right-4">
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold text-[#123C73] flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {club.members} Members
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-[#1B1F24] mb-3 group-hover:text-[#123C73] transition-colors duration-300">
                            {club.name}
                          </h4>
                          
                          <p className="text-sm text-[#667085] leading-relaxed mb-5 line-clamp-3">
                            {club.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-[#123C73]/10">
                            <div className="flex items-center gap-2 text-sm text-[#667085]">
                              <Clock className="w-4 h-4 text-[#123C73]" />
                              <span className="font-semibold">{club.meetingDay}</span>
                            </div>
                            <button className="group/btn bg-[#123C73] text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-[#0A2348] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#123C73]/20 flex items-center gap-2">
                              Join Club
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </button>
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
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#123C73] rounded-full animate-pulse opacity-20"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#123C73] rounded-full animate-pulse opacity-20" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-40 right-32 w-3 h-3 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{ animationDelay: "1.5s" }}></div>
    </div>
  );
};

export default ClubsPage;