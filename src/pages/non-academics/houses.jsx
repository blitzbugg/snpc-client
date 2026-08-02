import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Shield, Trophy, Star, Users, Sparkles, Flag, Heart } from 'lucide-react';

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

const HousesPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockData = {
          title: "House System",
          subtitle: "Building Character, Unity, and Competitive Spirit Through Inter-House Activities",
          mainImage: {
            url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
            alt: "Students celebrating house activities",
          },
          content: [
            {
              id: "1",
              paragraph: "The House System at Sree Narayana Public School is a time-honored tradition that divides our student community into four vibrant houses—Red House, Green House, Yellow House, and Blue House. This organizational structure goes beyond mere classification; it creates a sense of belonging, fosters healthy competition, develops leadership qualities, and builds lasting friendships across different grade levels.",
            },
            {
              id: "2",
              paragraph: "Each house operates as a mini-community within the larger school ecosystem, with elected house captains, vice-captains, and prefects who lead their teams in various inter-house competitions throughout the academic year. From sports tournaments and cultural festivals to academic quizzes and social service initiatives, house activities provide students with numerous opportunities to showcase their talents, learn teamwork, and develop a strong sense of identity and pride.",
            },
          ],
          houses: [
            {
              id: "red",
              name: "Red House",
              color: "red",
              motto: "Courage & Determination",
              description: "Red House represents passion, energy, and unwavering determination. Members are known for their bold spirit and competitive drive.",
              gradient: "from-red-500 to-rose-500",
              bgGradient: "from-red-50 to-rose-50",
              borderColor: "border-red-200",
              textColor: "text-red-600",
              icon: "🔴",
              qualities: ["Passionate", "Energetic", "Bold", "Competitive"],
            },
            {
              id: "green",
              name: "Green House",
              color: "green",
              motto: "Growth & Harmony",
              description: "Green House symbolizes growth, balance, and environmental consciousness. Members embody harmony and sustainable excellence.",
              gradient: "from-green-500 to-emerald-500",
              bgGradient: "from-green-50 to-emerald-50",
              borderColor: "border-green-200",
              textColor: "text-green-600",
              icon: "🟢",
              qualities: ["Balanced", "Nurturing", "Sustainable", "Harmonious"],
            },
            {
              id: "yellow",
              name: "Yellow House",
              color: "yellow",
              motto: "Optimism & Brilliance",
              description: "Yellow House stands for positivity, creativity, and intellectual brilliance. Members shine with optimism and innovative thinking.",
              gradient: "from-yellow-500 to-amber-500",
              bgGradient: "from-yellow-50 to-amber-50",
              borderColor: "border-yellow-200",
              textColor: "text-yellow-600",
              icon: "🟡",
              qualities: ["Optimistic", "Creative", "Brilliant", "Innovative"],
            },
            {
              id: "blue",
              name: "Blue House",
              color: "blue",
              motto: "Wisdom & Integrity",
              description: "Blue House represents wisdom, trust, and unwavering integrity. Members are known for their depth of character and reliability.",
              gradient: "from-blue-500 to-cyan-500",
              bgGradient: "from-blue-50 to-cyan-50",
              borderColor: "border-blue-200",
              textColor: "text-blue-600",
              icon: "🔵",
              qualities: ["Wise", "Trustworthy", "Reliable", "Principled"],
            },
          ],
          activities: [
            { id: "a1", title: "Sports Competitions", description: "Inter-house tournaments in cricket, football, basketball, athletics, and more", icon: "🏆" },
            { id: "a2", title: "Cultural Events", description: "Dance, music, drama competitions, and talent shows showcasing artistic excellence", icon: "🎭" },
            { id: "a3", title: "Academic Challenges", description: "Quiz competitions, debate tournaments, and subject-specific olympiads", icon: "📚" },
            { id: "a4", title: "Social Initiatives", description: "Community service projects, environmental campaigns, and charity drives", icon: "🤝" },
          ],
          specifications: [
            { label: "Houses", value: "4" },
            { label: "Events", value: "20+ Annual" },
            { label: "Participation", value: "100%" },
            { label: "Legacy", value: "Decades" },
          ],
        };

        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                  <Flag className="w-4 h-4 text-[#F4C430] mr-2" />
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Unity in Diversity
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
                  House{" "}
                  <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                    System
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
                <Shield className="w-5 h-5 text-[#F4C430]" />
                <div className="h-px w-12 bg-[#F4C430]/30"></div>
              </div>
            </>
          )}
        </div>

        {/* Introduction Section */}
        {!loading && !error && data?.content && (
          <div className="mb-16 lg:mb-24 max-w-4xl mx-auto">
            <Reveal delay={300}>
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-[#123C73]/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#F4C430]/10 rounded-2xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#123C73]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B1F24]">About Our House System</h3>
                </div>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#123C73] to-[#F4C430] rounded-full opacity-20"></div>
                  <p className="text-lg text-[#667085] leading-relaxed pl-6">
                    The House System at <strong className="text-[#123C73]">Sree Narayana Public School</strong> is a long-standing tradition that divides students into four vibrant houses—Red, Green, Yellow, and Blue—creating a sense of belonging and fostering healthy competition. Each house functions as a close-knit community with captains, vice-captains, and prefects leading their teams in sports, cultural events, academic contests, and social activities. This system nurtures leadership, teamwork, and sportsmanship while encouraging students to celebrate success with humility and face challenges with grace. It instills values of unity, dedication, and mutual respect, shaping confident and responsible future leaders.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* Houses Grid Section */}
        {!loading && !error && data?.houses && (
          <div className="mb-16 lg:mb-24">
            {/* Section Divider */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px flex-1 bg-[#123C73]/10"></div>
              <div className="px-6 py-2 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                  Our Houses
                </span>
              </div>
              <div className="h-px flex-1 bg-[#123C73]/10"></div>
            </div>

            <Reveal delay={400}>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1F24] text-center mb-4">
                Our Four{" "}
                <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                  Houses
                </span>
              </h3>
              <p className="text-lg text-[#667085] text-center mb-12 max-w-2xl mx-auto">
                Each house embodies unique values and spirit that inspire excellence
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {data.houses.map((house, index) => (
                <Reveal key={house.id} delay={500 + index * 100}>
                  <div className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${house.borderColor} overflow-hidden transform hover:-translate-y-2`}>
                    {/* Decorative background element */}
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${house.gradient} opacity-5 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700`}></div>
                    
                    {/* Top Gradient Line */}
                    <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${house.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div className="text-5xl">{house.icon}</div>
                        <div className={`px-4 py-2 bg-white rounded-2xl border-2 ${house.borderColor} shadow-sm`}>
                          <span className={`font-bold text-sm ${house.textColor}`}>
                            {house.motto}
                          </span>
                        </div>
                      </div>
                      
                      <h4 className={`text-2xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r ${house.gradient} bg-clip-text text-transparent`}>
                        {house.name}
                      </h4>
                      
                      <p className="text-[#667085] mb-6 leading-relaxed">
                        {house.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {house.qualities.map((quality, idx) => (
                          <span
                            key={idx}
                            className={`px-4 py-2 bg-white rounded-xl text-sm font-semibold ${house.textColor} border-2 ${house.borderColor} hover:scale-105 transition-transform duration-300`}
                          >
                            {quality}
                          </span>
                        ))}
                      </div>

                      {/* Bottom Accent */}
                      <div className="mt-6 flex items-center gap-2">
                        <div className="h-px flex-1 bg-[#123C73]/10"></div>
                        <Trophy className={`w-4 h-4 ${house.textColor}`} />
                        <div className="h-px flex-1 bg-[#123C73]/10"></div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Activities Section */}
        {!loading && !error && data?.activities && (
          <Reveal delay={600}>
            <div>
              {/* Section Divider */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
                <div className="px-6 py-2 bg-[#123C73]/5 rounded-full border border-[#123C73]/10">
                  <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                    Activities
                  </span>
                </div>
                <div className="h-px flex-1 bg-[#123C73]/10"></div>
              </div>

              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1F24] mb-4">
                  Inter-House{" "}
                  <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                    Activities
                  </span>
                </h3>
                <p className="text-lg text-[#667085] max-w-2xl mx-auto">
                  Diverse events that bring out the best in every student
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {data.activities.map((activity, index) => (
                  <Reveal key={activity.id} delay={700 + index * 100}>
                    <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20 text-center transform hover:-translate-y-2">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                        {activity.icon}
                      </div>
                      <h4 className="text-lg font-bold text-[#1B1F24] mb-2 group-hover:text-[#123C73] transition-colors duration-300">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-[#667085] leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Stats Section */}
        {!loading && !error && data?.specifications && (
          <Reveal delay={800}>
            <div className="mt-16 lg:mt-24">
              <div className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] rounded-3xl p-8 lg:p-12 shadow-2xl shadow-[#123C73]/20 overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C430]/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl lg:text-4xl font-bold text-white text-center mb-10">
                    House System at a Glance
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.specifications.map((spec, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl md:text-5xl font-extrabold text-[#F4C430] mb-2">
                          {spec.value}
                        </div>
                        <p className="text-white/70 font-medium text-sm uppercase tracking-wider">
                          {spec.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Decorative Floating Elements - Multi-colored for houses */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-30" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-yellow-500 rounded-full animate-pulse opacity-30" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-40 right-32 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-30" style={{ animationDelay: "1.5s" }}></div>
    </div>
  );
};

export default HousesPage;