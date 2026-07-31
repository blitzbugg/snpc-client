import React, { useState, useEffect } from 'react';

// Skeleton Loader Component
const LabCardSkeleton = ({ index }) => (
  <div className="w-full max-w-full bg-white rounded-lg overflow-hidden shadow-md md:shadow-lg">
    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} h-full animate-pulse`}>
      {/* Image Skeleton */}
      <div className="w-full md:w-[301px] flex-shrink-0 h-48 md:h-64 bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="flex-1 p-4 md:p-6">
        {/* Title Skeleton */}
        <div className="h-6 md:h-7 bg-gray-200 rounded mb-3 w-3/4"></div>
        
        {/* Text Skeleton - Multiple lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center py-12">
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
      <div className="text-red-600 mb-4">
        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-medium">Failed to load lab facilities</p>
        <p className="text-xs text-red-500 mt-1">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
      >
        Try Again
      </button>
    </div>
  </div>
);

const Labs = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get CMS URL from environment variables
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
      
      // Filter active labs and sort by order
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

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-900">
            Our Labs
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            We make your child happy day after day
          </p>
        </div>

        {/* Lab Facilities Section */}
        <div className="mb-8">
          <div className="border-l-4 border-blue-600 pl-4 mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-blue-900 uppercase tracking-wide">
              LAB FACILITIES
            </h2>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="space-y-8 md:space-y-12">
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
                <div className="space-y-8 md:space-y-12">
                  {labs.map((lab, index) => (
                    <div 
                      key={lab.id}
                      className="w-full max-w-full text-dark bg-white rounded-lg overflow-hidden shadow-md md:shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} h-full`}>
                        {/* Image Section */}
                        <div className="w-full md:w-[301px] flex-shrink-0 h-48 md:h-64">
                          <img 
                            src={lab.image?.url || '/placeholder-lab.png'}
                            alt={lab.image?.alt || lab.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/placeholder-lab.png'; // Fallback image
                            }}
                          />
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex-1 p-4 md:p-6">
                          <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">
                            {lab.title}
                          </h3>
                          <p className="text-sm md:text-base leading-relaxed text-gray-700 text-justify">
                            {lab.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">No Lab Facilities Available</h3>
                    <p className="text-sm">Lab facilities will be displayed here once they are added.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-50 left-10 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-32 w-3 h-3 bg-red-600 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute top-1/2 left-32 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
    </div>
  );
};

export default Labs;