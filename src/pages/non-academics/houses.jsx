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

const HousesPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - replace with actual API call
        const mockData = {
          title: "House System",
          subtitle:
            "Building Character, Unity, and Competitive Spirit Through Inter-House Activities",
          mainImage: {
            url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
            alt: "Students celebrating house activities",
          },
          content: [
            {
              id: "1",
              paragraph:
                "The House System at Sree Buddha Central School is a time-honored tradition that divides our student community into four vibrant houses—Red House, Green House, Yellow House, and Blue House. This organizational structure goes beyond mere classification; it creates a sense of belonging, fosters healthy competition, develops leadership qualities, and builds lasting friendships across different grade levels.",
            },
            {
              id: "2",
              paragraph:
                "Each house operates as a mini-community within the larger school ecosystem, with elected house captains, vice-captains, and prefects who lead their teams in various inter-house competitions throughout the academic year. From sports tournaments and cultural festivals to academic quizzes and social service initiatives, house activities provide students with numerous opportunities to showcase their talents, learn teamwork, and develop a strong sense of identity and pride.",
            },
            {
              id: "3",
              paragraph:
                "The house system promotes values of sportsmanship, collaboration, and collective responsibility. Students learn to celebrate victories graciously, accept defeats with dignity, support their housemates unconditionally, and work together toward common goals. Through this structure, we cultivate future leaders who understand that success is achieved through unity, dedication, and mutual respect.",
            },
          ],
          houses: [
            {
              id: "red",
              name: "Red House",
              color: "red",
              motto: "Courage & Determination",
              description: "Red House represents passion, energy, and unwavering determination. Members are known for their bold spirit and competitive drive.",
              gradient: "from-red-600 to-rose-600",
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
              gradient: "from-green-600 to-emerald-600",
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
              gradient: "from-blue-600 to-cyan-600",
              bgGradient: "from-blue-50 to-cyan-50",
              borderColor: "border-blue-200",
              textColor: "text-blue-600",
              icon: "🔵",
              qualities: ["Wise", "Trustworthy", "Reliable", "Principled"],
            },
          ],
          activities: [
            {
              id: "a1",
              title: "Sports Competitions",
              description: "Inter-house tournaments in cricket, football, basketball, athletics, and more",
              icon: "🏆",
            },
            {
              id: "a2",
              title: "Cultural Events",
              description: "Dance, music, drama competitions, and talent shows showcasing artistic excellence",
              icon: "🎭",
            },
            {
              id: "a3",
              title: "Academic Challenges",
              description: "Quiz competitions, debate tournaments, and subject-specific olympiads",
              icon: "📚",
            },
            {
              id: "a4",
              title: "Social Initiatives",
              description: "Community service projects, environmental campaigns, and charity drives",
              icon: "🤝",
            },
          ],
          benefits: [
            {
              id: "b1",
              title: "Leadership Development",
              description: "House captains and prefects gain invaluable leadership experience and organizational skills",
            },
            {
              id: "b2",
              title: "Team Building",
              description: "Students from different grades work together, building camaraderie and collaborative spirit",
            },
            {
              id: "b3",
              title: "Healthy Competition",
              description: "Friendly rivalry motivates students to excel while maintaining sportsmanship and respect",
            },
            {
              id: "b4",
              title: "School Spirit",
              description: "House pride fosters a deeper connection to school community and lasting memories",
            },
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
                <span className="text-red-600 font-semibold text-sm tracking-wide">
                  ERROR
                </span>
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
                  <div className="w-2 h-2 bg-[#0D47A1] rounded-full mr-2 animate-pulse"></div>
                  <span className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] bg-clip-text text-transparent font-semibold text-sm tracking-wide">
                    UNITY IN DIVERSITY
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    <>
                      House{" "}
                      <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                        System
                      </span>
                    </>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Building Character, Unity, and Competitive Spirit Through Inter-House Activities
                </p>
              </Reveal>
            </>
          )}
        </div>

        {/* Introduction Section */}
        {!loading && !error && data?.content && (
          <div className="mb-20 max-w-4xl mx-auto">
            
              <Reveal delay={500} >
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The House System at <strong>Sree Buddha Central School</strong> is a long-standing tradition that divides students into four vibrant houses—Red, Green, Yellow, and Blue—creating a sense of belonging and fostering healthy competition. Each house functions as a close-knit community with captains, vice-captains, and prefects leading their teams in sports, cultural events, academic contests, and social activities. This system nurtures leadership, teamwork, and sportsmanship while encouraging students to celebrate success with humility and face challenges with grace. It instills values of unity, dedication, and mutual respect, shaping confident and responsible future leaders.
                </p>
              </Reveal>
    
          </div>
        )}

        {/* Houses Grid Section */}
        {!loading && !error && data?.houses && (
          <div className="mb-20">
            <Reveal delay={500}>
              <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                Our Four{" "}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                  Houses
                </span>
              </h3>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Each house embodies unique values and spirit that inspire excellence
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {data.houses.map((house, index) => (
                <Reveal key={house.id} delay={600 + index * 100}>
                  <div className={`group relative bg-gradient-to-br ${house.bgGradient} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${house.borderColor} overflow-hidden`}>
                    {/* Decorative background element */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${house.gradient} opacity-10 rounded-full -translate-y-16 translate-x-16`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-6xl">{house.icon}</div>
                        <div className={`px-4 py-2 bg-white rounded-full border-2 ${house.borderColor}`}>
                          <span className={`font-bold text-sm ${house.textColor}`}>
                            {house.motto}
                          </span>
                        </div>
                      </div>
                      
                      <h4 className={`text-3xl font-bold mb-3 bg-gradient-to-r ${house.gradient} bg-clip-text text-transparent`}>
                        {house.name}
                      </h4>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {house.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {house.qualities.map((quality, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 bg-white rounded-full text-sm font-semibold ${house.textColor} border ${house.borderColor}`}
                          >
                            {quality}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements - Multi-colored */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
      <div
        className="absolute top-32 right-20 w-2 h-2 bg-green-500 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 right-32 w-3 h-3 bg-blue-600 rounded-full animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-1/2 left-32 w-2 h-2 bg-red-500 rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute top-1/3 right-40 w-3 h-3 bg-green-600 rounded-full animate-pulse"
        style={{ animationDelay: "2.5s" }}
      ></div>
    </div>
  );
};

export default HousesPage;