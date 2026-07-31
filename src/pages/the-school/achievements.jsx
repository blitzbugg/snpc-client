import { useState, useEffect } from 'react';
import { Calendar, Award, ChevronRight } from 'lucide-react';

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-900 border-t-yellow-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading achievements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Achievements</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4">
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-3">
            Our Achievements
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrating milestones and accomplishments that define our journey of excellence
          </p>
        </div>

        {/* Achievements Grid */}
        {achievements.length === 0 ? (
          <div className="text-center py-16">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No achievements to display yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Card Header with Accent */}
                <div className="h-2 bg-gradient-to-r from-blue-900 to-yellow-500"></div>
                
                <div className="p-6">
                  {/* Date Badge */}
                  {achievement.publishDate && (
                    <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mb-4">
                      <Calendar className="w-4 h-4 text-blue-900" />
                      <span className="font-medium">{formatDate(achievement.publishDate)}</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {achievement.title}
                  </h3>

                  {/* Content */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {achievement.content}
                  </p>

                </div>

                {/* Bottom Accent Line */}
                <div className="h-1 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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