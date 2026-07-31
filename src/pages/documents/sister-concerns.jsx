import React, { useState, useEffect } from 'react';

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/institutions?limit=10`);
        const data = await response.json();
        setInstitutions(data.docs);
      } catch (error) {
        console.error('Error fetching institutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-300 animate-pulse">
      <div className="relative w-full h-96">
        <div className="w-full h-full bg-gray-400"></div>
        
        {/* Content Overlay Skeleton */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="h-8 bg-gray-500 rounded mb-3 w-3/4"></div>
          <div className="h-6 bg-gray-500 rounded mb-6 w-full"></div>
          <div className="w-full py-4 rounded-lg bg-gray-500"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <div className="text-center py-16 px-4">
          <div className="h-10 bg-gray-300 rounded mx-auto mb-4 w-1/3 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded mx-auto w-2/3 animate-pulse"></div>
        </div>

        {/* Institutions Cards Skeleton */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">
          Our Institutions
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600 leading-relaxed">
          Your gateway to important institutional information,<br />
          services, and updates — all in one place.
        </p>
      </div>

      {/* Institutions Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {institutions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No institutions found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {institutions.map((institution) => (
              <div key={institution.id} className="relative rounded-lg overflow-hidden shadow-lg">
                <div className="relative w-full h-96">
                  <img 
                    src={institution.image?.url || "/school-front.png"}
                    alt={institution.image?.alt || institution.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {institution.name}
                    </h3>
                    <p className="text-lg text-white mb-6 opacity-90">
                      {institution.description}
                    </p>
                    <a 
                      href={institution.website || '/contact-us'} 
                      target={institution.website ? "_blank" : "_self"}
                      rel={institution.website ? "noopener noreferrer" : ""}
                      className="w-full py-4 text-center rounded-lg font-semibold text-lg bg-secondary text-primary hover:bg-yellow-300 transition-colors duration-200"
                    >
                      Visit
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Institutions;