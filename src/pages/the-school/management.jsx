import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Management = () => {
  const [management, setManagement] = useState([]);
  const [executiveCommittee, setExecutiveCommittee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch management data
        const managementResponse = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/management?limit=0`);
        if (!managementResponse.ok) {
          throw new Error('Failed to fetch management data');
        }
        const managementData = await managementResponse.json();
        const sortedManagement = (managementData.docs || []).sort((a, b) => a.order - b.order);
        setManagement(sortedManagement);
        
        // Fetch executive committee data
        const committeeResponse = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/executive-committee?limit=0`);
        if (!committeeResponse.ok) {
          throw new Error('Failed to fetch executive committee data');
        }
        const committeeData = await committeeResponse.json();
        const sortedCommittee = (committeeData.docs || []).sort((a, b) => a.order - b.order);
        setExecutiveCommittee(sortedCommittee);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Our Team Section */}
      <div className="text-center mb-12">
        <h4 className="text-3xl font-bold mb-4 text-primary">
          {loading ? <Skeleton width={150} /> : 'Our Team'}
        </h4>
        <div className='max-w-120 mx-auto'>
          <p className="text-lg mb-12 text-dark">
            {loading ? <Skeleton count={2} /> : 'Meet the passionate minds driving our vision forward and making it all happen.'}
          </p>
        </div>
        
        {/* Top Management Cards */}
        <div className="flex justify-center gap-6 flex-wrap">
          {loading ? (
            // Shimmer effect for management cards
            Array(4).fill(0).map((_, index) => (
              <div
                key={index}
                className="group transition-all duration-300"
              >
                <div className="w-[265px] h-[273px] rounded-lg border-2 border-blue-200 bg-accent py-6 transition-colors duration-300 overflow-hidden">
                  <div className="w-full h-full flex flex-col">
                    {/* Image area shimmer */}
                    <div className="flex-1 flex items-center justify-center p-4">
                      <Skeleton circle width={128} height={128} />
                    </div>
                    {/* Name and designation area shimmer */}
                    <div className="h-16 flex flex-col items-center justify-center text-center px-4 bg-secondary">
                      <Skeleton width={100} className="mb-1" />
                      <Skeleton width={80} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : management.length > 0 ? (
            management.map((member) => (
              <div
                key={member.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="w-[265px] h-[273px] rounded-lg border-2 border-blue-200 bg-accent py-6 transition-colors duration-300 overflow-hidden hover:border-secondary">
                  <div className="w-full h-full flex flex-col">
                    {/* Image area */}
                    <div className="flex-1 flex items-center justify-center p-4">
                      <img 
                        src={member.image?.url || '/chairman.png'} 
                        alt={member.image?.alt || member.name}
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>
                    {/* Name and designation area */}
                    <div className="h-16 flex flex-col items-center justify-center text-center px-4 bg-secondary">
                      <div className="font-bold text-sm text-dark mb-1">{member.name}</div>
                      <div className="text-xs font-medium text-primary uppercase tracking-wide">
                        {member.designation?.replace(/-/g, ' ').toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-full py-8">
              <p className="text-dark">No management members found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Members of Executive Committee Section */}
      <div className="text-center">
        <h4 className="text-3xl font-bold mb-12 text-primary">
          {loading ? <Skeleton width={300} /> : 'Members of Executive Committee'}
        </h4>
        
        {/* Executive Committee Grid */}
        <div className="space-y-6">
          {loading ? (
            // Shimmer effect for executive committee cards
            <>
              {/* First Row Shimmer */}
              <div className="flex justify-center gap-6 flex-wrap">
                {Array(5).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="group transition-all duration-300"
                  >
                    <div className="w-[203px] h-[209px] rounded-lg border-2 py-6 border-blue-200 bg-accent transition-colors duration-300">
                      <div className="w-full h-full flex flex-col">
                        {/* Image area shimmer */}
                        <div className="flex-1 flex items-center justify-center p-3">
                          <Skeleton circle width={80} height={80} />
                        </div>
                        {/* Name and designation area shimmer */}
                        <div className="h-12 flex flex-col items-center justify-center text-center px-2 bg-secondary">
                          <Skeleton width={80} className="mb-0.5" />
                          <Skeleton width={60} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Second Row Shimmer */}
              <div className="flex justify-center gap-6 flex-wrap">
                {Array(5).fill(0).map((_, index) => (
                  <div
                    key={index + 5}
                    className="group transition-all duration-300"
                  >
                    <div className="w-[203px] h-[209px] rounded-lg border-2 py-6 border-blue-200 bg-accent transition-colors duration-300">
                      <div className="w-full h-full flex flex-col">
                        {/* Image area shimmer */}
                        <div className="flex-1 flex items-center justify-center p-3">
                          <Skeleton circle width={80} height={80} />
                        </div>
                        {/* Name and designation area shimmer */}
                        <div className="h-12 flex flex-col items-center justify-center text-center px-2 bg-secondary">
                          <Skeleton width={80} className="mb-0.5" />
                          <Skeleton width={60} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : executiveCommittee.length > 0 ? (
            <>
              {/* First Row */}
              <div className="flex justify-center gap-6 flex-wrap">
                {executiveCommittee.slice(0, 5).map((member) => (
                  <div
                    key={member.id}
                    className="group cursor-pointer transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-[203px] h-[209px] rounded-lg border-2 py-6 border-blue-200 bg-accent transition-colors duration-300 hover:border-secondary">
                      <div className="w-full h-full flex flex-col">
                        {/* Image area */}
                        <div className="flex-1 flex items-center justify-center p-3">
                          <img 
                            src={member.image?.url || '/teacher.png'} 
                            alt={member.image?.alt || member.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        </div>
                        {/* Name and designation area */}
                        <div className="h-12 flex flex-col items-center justify-center text-center px-2 bg-secondary">
                          <div className="font-bold text-xs text-dark mb-0.5">{member.name}</div>
                          <div className="text-xs font-medium text-primary uppercase tracking-wide">
                            {member.title?.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Second Row */}
              {executiveCommittee.length > 5 && (
                <div className="flex justify-center gap-6 flex-wrap">
                  {executiveCommittee.slice(5, 10).map((member) => (
                    <div
                      key={member.id}
                      className="group cursor-pointer transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-[203px] h-[209px] rounded-lg border-2 py-6 border-blue-200 bg-accent transition-colors duration-300 hover:border-secondary">
                        <div className="w-full h-full flex flex-col">
                          {/* Image area */}
                          <div className="flex-1 flex items-center justify-center p-3">
                            <img 
                              src={member.image?.url || '/principal.png'} 
                              alt={member.image?.alt || member.name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                          </div>
                          {/* Name and designation area */}
                          <div className="h-12 flex flex-col items-center justify-center text-center px-2 bg-secondary">
                            <div className="font-bold text-xs text-dark mb-0.5">{member.name}</div>
                            <div className="text-xs font-medium text-primary uppercase tracking-wide">
                              {member.title?.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center w-full py-8">
              <p className="text-dark">No executive committee members found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Management;