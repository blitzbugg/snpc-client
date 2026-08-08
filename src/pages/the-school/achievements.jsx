import { useState, useEffect } from 'react';
import { Calendar, Award, Trophy, Star, Sparkles, ChevronRight, Medal, Clock, ArrowUpRight, TrendingUp } from 'lucide-react';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}/api/achievements`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        
        const data = await response.json();
        setAchievements(data.docs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Stats Counter Component
  const StatsCounter = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-${color}/20`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-white/60 text-sm">{label}</div>
        </div>
      </div>
    </div>
  );

  // Achievement Card Component
  const AchievementCard = ({ achievement, index }) => {
    const isHovered = hoveredIndex === index;
    
    return (
      <div
        key={achievement.id}
        className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
        style={{
          animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`,
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#123C73]/5 via-transparent to-[#F4C430]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Image Section */}
        {achievement.image?.url && (
          <div className="relative h-52 overflow-hidden">
            <img 
              src={achievement.image.url} 
              alt={achievement.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Date Badge on Image */}
            {achievement.publishDate && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(achievement.publishDate)}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F4C430]/90 backdrop-blur-md rounded-full text-[#123C73] text-xs font-semibold">
                  <Medal className="w-3.5 h-3.5" />
                  <span>Achievement</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={`p-6 ${!achievement.image?.url ? 'pt-8' : ''}`}>
          {/* Header without image */}
          {!achievement.image?.url && (
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#123C73]/10 to-[#F4C430]/10 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-[#123C73]" />
              </div>
              
              {achievement.publishDate && (
                <div className="flex items-center gap-1.5 text-xs text-[#667085] bg-[#F7F9FC] px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(achievement.publishDate)}</span>
                </div>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-[#1B1F24] mb-3 leading-tight group-hover:text-[#123C73] transition-colors duration-300">
            {achievement.title}
          </h3>

          {/* Content */}
          <p className="text-[#667085] text-sm leading-relaxed mb-4 line-clamp-3">
            {achievement.content}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#123C73]/5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#F4C430]/20 flex items-center justify-center">
                <Star className="w-3 h-3 text-[#F4C430] fill-[#F4C430]" />
              </div>
              <span className="text-xs text-[#667085]">Recognized Achievement</span>
            </div>
          </div>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-[#F4C430]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#123C73] via-[#F4C430] to-[#123C73] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    );
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-[#123C73]/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-[#F4C430] rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-r-[#123C73] rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-6 text-[#667085] font-medium">Loading achievements...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-8 sm:p-10 max-w-md text-center">
          <div className="w-20 h-20 bg-[#F4C430]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-[#123C73]" />
          </div>
          <h3 className="text-2xl font-bold text-[#1B1F24] mb-3">Unable to Load</h3>
          <p className="text-[#667085] leading-relaxed">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden bg-[#123C73] py-20 lg:py-28">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4C430]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Trophy className="w-4 h-4 text-[#F4C430]" />
                <span className="text-[#F4C430] text-sm font-medium">Our Journey of Excellence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Celebrating
                <span className="block bg-gradient-to-r from-[#F4C430] to-[#FFD95A] bg-clip-text text-transparent">
                  Our Achievements
                </span>
              </h1>

              <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                Every milestone tells a story of dedication, innovation, and the relentless pursuit of excellence.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <StatsCounter label="Total Achievements" value={achievements.length} icon={Trophy} color="[#F4C430]" />
                <StatsCounter label="This Year" value={new Date().getFullYear()} icon={TrendingUp} color="white" />
                <StatsCounter label="Recognitions" value={achievements.length > 0 ? "✨" : "0"} icon={Star} color="[#F4C430]" />
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-[#F4C430]/20 to-[#123C73]/20 rounded-3xl rotate-12"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-[#F4C430] to-[#FFD95A] rounded-2xl shadow-2xl flex items-center justify-center">
                    <Trophy className="w-32 h-32 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
                  <Medal className="w-12 h-12 text-[#F4C430]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" fill="none">
            <path d="M0 40C240 80 480 80 720 40C960 0 1200 0 1440 40V80H0V40Z" fill="#F7F9FC"/>
          </svg>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
        {/* Header with Count */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#123C73]/5 p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#123C73]" />
            <span className="text-sm font-medium text-[#1B1F24]">
              {achievements.length} {achievements.length === 1 ? 'Achievement' : 'Achievements'}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-[#667085]">
            <Clock className="w-4 h-4" />
            <span>Latest updates</span>
          </div>
        </div>

        {/* Achievements Grid */}
        {achievements.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-[#123C73]/5">
            <div className="w-24 h-24 bg-[#F4C430]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-[#667085]/30" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B1F24] mb-2">No Achievements Yet</h3>
            <p className="text-[#667085] text-lg">Exciting achievements are on the way. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#667085] mb-4">Inspired by our achievements?</p>
          <a 
            href="/admission"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#123C73] text-white font-semibold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 hover:shadow-xl hover:shadow-[#123C73]/20 group"
          >
            <span>Join Our Journey</span>
            <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Achievements;