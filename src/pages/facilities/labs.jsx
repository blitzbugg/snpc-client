import React, { useState, useEffect } from 'react';
import { FlaskConical, Microscope, Atom, Beaker, TestTube, Sparkles, RefreshCw } from 'lucide-react';

// Skeleton Loader Component
const LabCardSkeleton = ({ index }) => (
  <div className="w-full bg-white rounded-3xl overflow-hidden shadow-lg border border-[#123C73]/5 animate-pulse">
    <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} h-full`}>
      {/* Image Skeleton */}
      <div className="w-full lg:w-[350px] flex-shrink-0 h-56 lg:h-72 bg-[#E8EDF5]"></div>
      
      {/* Content Skeleton */}
      <div className="flex-1 p-6 lg:p-8">
        <div className="h-7 bg-[#E8EDF5] rounded-xl mb-4 w-3/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-[#E8EDF5] rounded-lg w-full"></div>
          <div className="h-4 bg-[#E8EDF5] rounded-lg w-full"></div>
          <div className="h-4 bg-[#E8EDF5] rounded-lg w-full"></div>
          <div className="h-4 bg-[#E8EDF5] rounded-lg w-4/5"></div>
          <div className="h-4 bg-[#E8EDF5] rounded-lg w-full"></div>
          <div className="h-4 bg-[#E8EDF5] rounded-lg w-3/4"></div>
        </div>
      </div>
    </div>
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center py-16">
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#123C73]/5 max-w-md mx-auto">
      <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-[#1B1F24] mb-2">Failed to Load</h3>
      <p className="text-sm text-[#667085] mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  </div>
);

const Labs = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000';

  const fetchLabs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${CMS_URL}/api/labs`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const activeLabs = data.docs
        .filter(lab => lab.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      
      setLabs(activeLabs);
    } catch (err) {
      console.error('Error fetching labs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  const handleRetry = () => {
    fetchLabs();
  };

  // Lab icons mapping
  const labIcons = [FlaskConical, Microscope, Atom, Beaker, TestTube];

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#123C73]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F4C430]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
            <FlaskConical className="w-4 h-4 text-[#F4C430] mr-2" />
            <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
              Our Facilities
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
              Labs
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#667085] max-w-2xl mx-auto leading-relaxed font-light">
            State-of-the-art laboratory facilities for hands-on learning and scientific exploration
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <Atom className="w-5 h-5 text-[#F4C430]" />
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Section Label */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-[#123C73] to-[#F4C430] rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1F24] uppercase tracking-wider">
              Lab Facilities
            </h2>
          </div>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="space-y-8 lg:space-y-10">
            {[...Array(6)].map((_, index) => (
              <LabCardSkeleton key={index} index={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Content - Labs */}
        {!loading && !error && (
          <>
            {labs.length > 0 ? (
              <div className="space-y-8 lg:space-y-10">
                {labs.map((lab, index) => {
                  const IconComponent = labIcons[index % labIcons.length];
                  return (
                    <div 
                      key={lab.id}
                      className="w-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 group"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} h-full`}>
                        {/* Image Section */}
                        <div className="w-full lg:w-[350px] flex-shrink-0 h-56 lg:h-72 relative overflow-hidden">
                          <img 
                            src={lab.image?.url || '/placeholder-lab.png'}
                            alt={lab.image?.alt || lab.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              e.target.src = '/placeholder-lab.png';
                            }}
                          />
                          
                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/40 via-transparent to-transparent"></div>
                          
                          {/* Lab Icon Badge */}
                          <div className="absolute top-4 left-4">
                            <div className="w-12 h-12 bg-[#F4C430] rounded-2xl flex items-center justify-center shadow-lg">
                              <IconComponent className="w-6 h-6 text-[#123C73]" />
                            </div>
                          </div>

                          {/* Image Label */}
                          <div className="absolute bottom-4 left-4">
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                              <span className="text-sm font-semibold text-[#123C73]">Lab {index + 1}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex-1 p-6 lg:p-8">
                          {/* Title with accent */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-[#F4C430]/10 rounded-xl flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-[#123C73]" />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold text-[#1B1F24] group-hover:text-[#123C73] transition-colors duration-300">
                              {lab.title}
                            </h3>
                          </div>
                          
                          {/* Description */}
                          <div className="relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#123C73] to-[#F4C430] rounded-full opacity-20"></div>
                            <p className="text-base lg:text-lg leading-relaxed text-[#667085] text-justify pl-6">
                              {lab.description}
                            </p>
                          </div>

                          {/* Bottom Accent */}
                          <div className="mt-6 flex items-center gap-2">
                            <div className="h-px flex-1 bg-[#123C73]/10"></div>
                            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
                            <div className="h-px flex-1 bg-[#123C73]/10"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white rounded-3xl p-12 shadow-lg border border-[#123C73]/5 max-w-lg mx-auto">
                  <div className="w-24 h-24 bg-[#123C73]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Beaker className="w-12 h-12 text-[#667085]/30" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B1F24] mb-3">No Lab Facilities Available</h3>
                  <p className="text-[#667085]">Lab facilities will be displayed here once they are added.</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#123C73] rounded-full animate-pulse opacity-20"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-[#123C73] rounded-full animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-32 w-3 h-3 bg-[#F4C430] rounded-full animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>

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

export default Labs;