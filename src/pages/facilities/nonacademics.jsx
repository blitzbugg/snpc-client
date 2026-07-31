import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const NonAcademics = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/nonacademics`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.docs) {
          // Filter only active sections and sort by sortOrder
          const activeSections = data.docs
            .filter(section => section.isActive)
            .sort((a, b) => a.sortOrder - b.sortOrder);
          
          setSections(activeSections);
        }
      } catch (err) {
        console.error('Error fetching non-academic activities:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="space-y-2">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white shadow-sm overflow-hidden">
          <div className="w-full bg-gray-300 h-16 animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-6 bg-accent">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Non-Academics</h1>
          <p className="text-gray-600">We make your child happy day after day</p>
        </div>
        <div className="text-center text-red-500 p-4">
          Error loading content: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 bg-accent">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Non-Academics</h1>
        <p className="text-gray-600">We make your child happy day after day</p>
      </div>

      {/* Loading state */}
      {loading && <SkeletonLoader />}

      {/* Content */}
      {!loading && sections.length > 0 && (
        <div className="space-y-2">
          {sections.map((section) => (
            <div key={section.id} className="bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full bg-blue-800 hover:bg-blue-900 text-white px-6 py-4 flex justify-between items-center transition-colors duration-200"
              >
                <span className="text-lg font-medium">{section.title}</span>
                {expandedSections[section.id] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              
              {expandedSections[section.id] && section.description && (
                <div className="bg-gray-100 px-6 py-4">
                  <p className="text-gray-700 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && sections.length === 0 && (
        <div className="text-center text-gray-500 p-4">
          No non-academic activities available at the moment.
        </div>
      )}
    </div>
  );
};

export default NonAcademics;