import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

        // simple heuristic to infer category when API doesn't provide one
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

        // build categories from clubs
        const categoryIcons = { arts: '🎨', stem: '🔬', sports: '⚽', social: '�', other: '🎯' };
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
          {loading ? (
            <>
              <Skeleton height={8} width={120} className="mx-auto mb-6 rounded-full" baseColor="#f3f4f6" highlightColor="#e5e7eb" />
              <Skeleton height={48} width={400} className="mx-auto mb-6" baseColor="#f3f4f6" highlightColor="#e5e7eb" />
              <Skeleton height={24} width={600} className="mx-auto" baseColor="#f3f4f6" highlightColor="#e5e7eb" count={2} />
            </>
          ) : error ? (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full border border-red-200 mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-red-600 font-semibold text-sm tracking-wide">ERROR</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Unable to Load Content</h2>
              <p className="text-lg text-red-600">{error}</p>
            </div>
          ) : (
            <>
              <Reveal>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-300 mb-6">
                  <div className="w-2 h-2 bg-[#0D47A1] rounded-full mr-2 animate-pulse"></div>
                  <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent font-semibold text-sm tracking-wide">
                    CO-CURRICULAR ACTIVITIES
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Student{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                    Clubs
                  </span>
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

        {/* Category Filter */}
        {/* {!loading && !error && data?.categories && (
              <Reveal delay={300}>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {data.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-blue-50 shadow-md hover:shadow-lg"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </Reveal>
        )} */}

        {/* Clubs Grid */}
        {!loading && !error && filteredClubs && (
          <div className="mb-20">
            {filteredClubs.length === 0 ? (
              <Reveal delay={400}>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Clubs Found</h3>
                  <p className="text-gray-600">Try selecting a different category</p>
                </div>
              </Reveal>
            ) : (
              <>
                <Reveal delay={400}>
                    <div className="text-center mb-8">
                    <p className="text-lg text-gray-600">
                      Showing <span className="font-bold text-[#0D47A1]">{filteredClubs.length}</span> clubs
                    </p>
                  </div>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredClubs.map((club, index) => (
                    <Reveal key={club.id} delay={500 + index * 50}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={club.image}
                            alt={club.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          {/* Club Icon */}
                          <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                            {club.icon}
                          </div>

                          {/* Members Count */}
                          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                            👥 {club.members} Members
                          </div>
                        </div>

                        <div className="p-6">
                          <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0D47A1] transition-colors">
                            {club.name}
                          </h4>
                          
                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {club.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span className="text-[#0D47A1]">📅</span>
                              <span className="font-semibold">{club.meetingDay}</span>
                            </div>
                            <button className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white font-semibold px-4 py-2 rounded-lg text-sm hover:from-[#0D47A1] hover:to-[#1565C0] transition-all duration-300 shadow-md hover:shadow-lg">
                              Join Club
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

        {/* Call to Action */}
        {/* <Reveal delay={800}>
          <div className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] rounded-2xl p-8 lg:p-12 shadow-2xl text-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Start Your Journey Today
            </h3>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Join a club that matches your interests and passions. Develop new skills, make friends, and create lasting memories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#0D47A1] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                Register Interest
              </button>
              <button className="bg-[#0D47A1] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#08306b] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                Contact Coordinators
              </button>
            </div>
          </div>
        </Reveal> */}
      </div>

      {/* Decorative Elements */}
  <div className="absolute top-20 left-10 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
  <div className="absolute top-32 right-20 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
  <div className="absolute bottom-20 left-20 w-4 h-4 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
  <div className="absolute bottom-40 right-32 w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>
  <div className="absolute top-1/2 left-32 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
    </div>
  );
};

export default ClubsPage;