import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Academics = () => {
  const [academicSections, setAcademicSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/academics`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the API data to match your component structure
        const transformedData = data.docs
          .filter(item => item.isActive) // Only show active items
          .sort((a, b) => a.order - b.order) // Sort by order field
          .map(item => ({
            title: item.title,
            image: item.image?.url || '/placeholder-image.png', // Fallback image
            text: item.description
          }));
        
        setAcademicSections(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching academic data:', err);
        setError('Failed to load academic facilities. Please try again later.');
        
        // Fallback to empty array or you could use hardcoded data as backup
        setAcademicSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicData();
  }, []);

  // Skeleton loading component
  const AcademicSkeleton = () => (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div className="space-y-10 md:space-y-12">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index}
            className="w-full max-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
          >
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} h-full`}>
              {/* Image Skeleton */}
              <div className="flex-shrink-0 w-full md:w-[301px] h-48 md:h-64 lg:h-[264px]">
                <Skeleton height="100%" />
              </div>
              
              {/* Content Skeleton */}
              <div 
                className={`flex flex-col justify-start p-4 md:p-6 ${index % 2 === 0 ? 'md:ml-4' : 'md:mr-4'} flex-1`}
              >
                <div className="mb-2 md:mb-3">
                  <Skeleton height={28} width="60%" />
                </div>
                <div className="space-y-2">
                  <Skeleton count={4} />
                  <Skeleton width="80%" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-900">
              Academics
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              We make your child happy day after day
            </p>
          </div>
          
          {/* Header Section Skeleton */}
          <div className="mb-8">
            <div className="border-l-4 border-blue-600 pl-4 mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-bold text-blue-900 uppercase tracking-wide">
                MEDIUM OF INSTRUCTION
              </h2>
            </div>
            
            {/* Academic Sections Skeleton */}
            <AcademicSkeleton />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-900">
              Academics
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              We make your child happy day after day
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="text-red-500 mb-2">⚠️</div>
              <p className="text-red-600">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-900">
            Academics
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            We make your child happy day after day
          </p>
        </div>

        {/* Medium of Instruction Section */}
        <div className="mb-8">
          <div className="border-l-4 border-blue-600 pl-4 mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold text-blue-900 uppercase tracking-wide">
              MEDIUM OF INSTRUCTION
            </h2>
          </div>
          
          {/* Content Blocks */}
          {academicSections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No academic facilities available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-10 md:space-y-12">
              {academicSections.map((section, index) => (
                <div 
                  key={index}
                  className="w-full max-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} h-full`}>
                    {/* Image Section */}
                    <div className="flex-shrink-0 w-full md:w-[301px] h-48 md:h-64 lg:h-[264px]">
                      <img 
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.png'; // Fallback image
                        }}
                      />
                    </div>
                    
                    {/* Content Section */}
                    <div 
                      className={`flex flex-col justify-start p-4 md:p-6 ${index % 2 === 0 ? 'md:ml-4' : 'md:mr-4'}`}
                    >
                      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-gray-800">
                        {section.title}
                      </h3>
                      <p className="text-sm md:text-base leading-relaxed text-gray-700 text-justify">
                        {section.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academics;