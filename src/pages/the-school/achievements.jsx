import { useState, useEffect } from 'react';
import { Calendar, Award, Trophy, Star, Sparkles } from 'lucide-react';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#123C73]/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#F4C430] rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-[#667085] font-medium">Loading achievements...</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-br from-[#123C73] via-[#123C73] to-[#0A2348] py-16 lg:py-24 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 border-2 border-white/5 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 border-2 border-[#F4C430]/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#F4C430]/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
              <Trophy className="w-5 h-5 text-[#F4C430] mr-3" />
              <span className="text-[#F4C430] font-semibold text-sm tracking-wider uppercase">
                Excellence in Action
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-[#F4C430] via-[#FFD95A] to-[#F4C430] bg-clip-text text-transparent">
                Achievements
              </span>
            </h1>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-[#F4C430]/30"></div>
              <div className="w-3 h-3 bg-[#F4C430] rounded-full rotate-45"></div>
              <div className="h-px w-16 bg-[#F4C430]/30"></div>
            </div>

            {/* Subtitle */}
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Celebrating milestones and accomplishments that define our journey of excellence
            </p>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="none">
            <path d="M0 120V60C240 0 480 0 720 60C960 120 1200 120 1440 60V120H0Z" fill="#F7F9FC"/>
          </svg>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-16 lg:pb-24">
        {achievements.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-[#123C73]/5">
              <Trophy className="w-12 h-12 text-[#667085]/30" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B1F24] mb-2">No Achievements Yet</h3>
            <p className="text-[#667085] text-lg">Exciting achievements are on the way. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#123C73]/5 hover:border-[#F4C430]/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Top Accent Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#123C73] via-[#F4C430] to-[#123C73] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-6 sm:p-8">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F4C430]/10 to-[#123C73]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-6 h-6 text-[#123C73]" />
                    </div>
                    
                    {/* Date Badge */}
                    {achievement.publishDate && (
                      <div className="flex items-center gap-2 bg-[#F7F9FC] text-[#667085] px-4 py-2 rounded-xl text-sm font-medium border border-[#123C73]/5">
                        <Calendar className="w-4 h-4 text-[#123C73]" />
                        <span>{formatDate(achievement.publishDate)}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#1B1F24] mb-4 group-hover:text-[#123C73] transition-colors duration-300 leading-tight">
                    {achievement.title}
                  </h3>

                  {/* Content */}
                  <p className="text-[#667085] leading-relaxed mb-6 line-clamp-4">
                    {achievement.content}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-[#123C73] font-semibold text-sm group/link cursor-pointer">
                    <span className="group-hover/link:text-[#F4C430] transition-colors duration-300">Read More</span>
                    <svg 
                      className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#123C73] to-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* Corner Decoration */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#F4C430] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 rotate-45"></div>
              </div>
            ))}
          </div>
        )}
      </div>

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
      `}</style>
    </div>
  );
};

export default Achievements;