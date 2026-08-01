import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Users, Award, Star, ChevronRight } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-center items-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#123C73]/5 text-center max-w-md">
            <div className="w-16 h-16 bg-[#F4C430]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-[#123C73]" />
            </div>
            <h3 className="text-xl font-bold text-[#1B1F24] mb-2">Unable to Load Data</h3>
            <p className="text-[#667085]">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F9FC] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Team Section */}
        <div className="mb-16 lg:mb-24">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
              <Users className="w-4 h-4 text-[#F4C430] mr-2" />
              <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                Leadership
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B1F24] mb-6 leading-tight">
              {loading ? (
                <Skeleton width={200} baseColor="#E8EDF5" highlightColor="#F7F9FC" />
              ) : (
                <>
                  Our{" "}
                  <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                    Team
                  </span>
                </>
              )}
            </h2>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-[#667085] leading-relaxed">
                {loading ? (
                  <Skeleton count={2} baseColor="#E8EDF5" highlightColor="#F7F9FC" />
                ) : (
                  'Meet the passionate minds driving our vision forward and making it all happen.'
                )}
              </p>
            </div>
          </div>
          
          {/* Top Management Cards */}
          <div className="flex justify-center gap-6 lg:gap-8 flex-wrap">
            {loading ? (
              // Skeleton loading for management cards
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="group">
                  <div className="w-[280px] bg-white rounded-3xl shadow-lg border border-[#123C73]/5 overflow-hidden">
                    {/* Card Top Accent */}
                    <div className="h-1.5 bg-gradient-to-r from-[#123C73] to-[#F4C430]"></div>
                    
                    <div className="p-8">
                      {/* Image Skeleton */}
                      <div className="flex justify-center mb-6">
                        <Skeleton 
                          circle 
                          width={128} 
                          height={128} 
                          baseColor="#E8EDF5" 
                          highlightColor="#F7F9FC" 
                        />
                      </div>
                      
                      {/* Content Skeleton */}
                      <div className="text-center">
                        <Skeleton 
                          width={120} 
                          height={24} 
                          className="mb-2" 
                          baseColor="#E8EDF5" 
                          highlightColor="#F7F9FC" 
                        />
                        <Skeleton 
                          width={100} 
                          height={20} 
                          baseColor="#E8EDF5" 
                          highlightColor="#F7F9FC" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : management.length > 0 ? (
              management.map((member, index) => (
                <div
                  key={member.id}
                  className="group cursor-pointer transition-all duration-500 hover:scale-105"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="w-[280px] bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#123C73]/5 hover:border-[#F4C430]/20">
                    {/* Card Top Accent */}
                    <div className="h-1.5 bg-gradient-to-r from-[#123C73] via-[#F4C430] to-[#123C73] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="p-8">
                      {/* Image Container */}
                      <div className="relative flex justify-center mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#F4C430]/20 to-[#123C73]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                          <img 
                            src={member.image?.url || '/chairman.png'} 
                            alt={member.image?.alt || member.name}
                            className="w-32 h-32 rounded-full object-cover relative z-10 border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        {/* Decorative Ring */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-2 border-dashed border-[#F4C430]/20 rounded-full group-hover:rotate-180 transition-transform duration-700"></div>
                      </div>
                      
                      {/* Info Section */}
                      <div className="text-center">
                        <h3 className="font-bold text-lg text-[#1B1F24] mb-2 group-hover:text-[#123C73] transition-colors duration-300">
                          {member.name}
                        </h3>
                        <div className="inline-flex items-center px-4 py-1.5 bg-[#123C73]/5 rounded-full">
                          <div className="w-1.5 h-1.5 bg-[#F4C430] rounded-full mr-2"></div>
                          <p className="text-sm font-semibold text-[#123C73] uppercase tracking-wider">
                            {member.designation?.replace(/-/g, ' ')}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Decoration */}
                    <div className="h-1 bg-gradient-to-r from-[#123C73] to-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full py-12">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#123C73]/5 max-w-md mx-auto">
                  <Users className="w-16 h-16 text-[#667085]/30 mx-auto mb-4" />
                  <p className="text-[#667085] text-lg">No management members found.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Executive Committee Section */}
        <div className="text-center">
          {/* Section Header */}
          <div className="mb-12">
            <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
              <Star className="w-4 h-4 text-[#F4C430] mr-2" />
              <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
                Committee
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B1F24] mb-6 leading-tight">
              {loading ? (
                <Skeleton width={350} baseColor="#E8EDF5" highlightColor="#F7F9FC" />
              ) : (
                <>
                  Members of{" "}
                  <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                    Executive Committee
                  </span>
                </>
              )}
            </h2>
          </div>
          
          {/* Executive Committee Grid */}
          <div className="space-y-8">
            {loading ? (
              // Skeleton loading for executive committee
              <>
                {/* First Row Skeleton */}
                <div className="flex justify-center gap-4 lg:gap-6 flex-wrap">
                  {Array(5).fill(0).map((_, index) => (
                    <div key={index} className="group">
                      <div className="w-[220px] bg-white rounded-2xl shadow-md border border-[#123C73]/5 overflow-hidden">
                        <div className="p-6">
                          <div className="flex justify-center mb-4">
                            <Skeleton 
                              circle 
                              width={80} 
                              height={80} 
                              baseColor="#E8EDF5" 
                              highlightColor="#F7F9FC" 
                            />
                          </div>
                          <div className="text-center">
                            <Skeleton 
                              width={100} 
                              height={20} 
                              className="mb-1" 
                              baseColor="#E8EDF5" 
                              highlightColor="#F7F9FC" 
                            />
                            <Skeleton 
                              width={80} 
                              height={16} 
                              baseColor="#E8EDF5" 
                              highlightColor="#F7F9FC" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Second Row Skeleton */}
                <div className="flex justify-center gap-4 lg:gap-6 flex-wrap">
                  {Array(5).fill(0).map((_, index) => (
                    <div key={index + 5} className="group">
                      <div className="w-[220px] bg-white rounded-2xl shadow-md border border-[#123C73]/5 overflow-hidden">
                        <div className="p-6">
                          <div className="flex justify-center mb-4">
                            <Skeleton 
                              circle 
                              width={80} 
                              height={80} 
                              baseColor="#E8EDF5" 
                              highlightColor="#F7F9FC" 
                            />
                          </div>
                          <div className="text-center">
                            <Skeleton 
                              width={100} 
                              height={20} 
                              className="mb-1" 
                              baseColor="#E8EDF5" 
                              highlightColor="#F7F9FC" 
                            />
                            <Skeleton 
                              width={80} 
                              height={16} 
                              baseColor="#E8EDF5" 
                              highlightColor="#F7F9FC" 
                            />
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
                <div className="flex justify-center gap-4 lg:gap-6 flex-wrap">
                  {executiveCommittee.slice(0, 5).map((member, index) => (
                    <div
                      key={member.id}
                      className="group cursor-pointer transition-all duration-300 hover:scale-105"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <div className="w-[220px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#123C73]/5 hover:border-[#F4C430]/20">
                        <div className="p-6">
                          {/* Image Container */}
                          <div className="flex justify-center mb-4">
                            <div className="relative">
                              <img 
                                src={member.image?.url || '/teacher.png'} 
                                alt={member.image?.alt || member.name}
                                className="w-20 h-20 rounded-full object-cover border-2 border-[#123C73]/10 group-hover:border-[#F4C430] transition-colors duration-300"
                              />
                            </div>
                          </div>
                          
                          {/* Info Section */}
                          <div className="text-center">
                            <h4 className="font-bold text-sm text-[#1B1F24] mb-1.5 group-hover:text-[#123C73] transition-colors duration-300">
                              {member.name}
                            </h4>
                            <p className="text-xs font-semibold text-[#123C73] uppercase tracking-wider bg-[#123C73]/5 rounded-full px-3 py-1 inline-block">
                              {member.title?.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        
                        {/* Hover Accent */}
                        <div className="h-0.5 bg-gradient-to-r from-[#123C73] to-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Second Row */}
                {executiveCommittee.length > 5 && (
                  <div className="flex justify-center gap-4 lg:gap-6 flex-wrap">
                    {executiveCommittee.slice(5, 10).map((member, index) => (
                      <div
                        key={member.id}
                        className="group cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          animation: `fadeInUp 0.5s ease-out ${(index + 5) * 0.1}s both`
                        }}
                      >
                        <div className="w-[220px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#123C73]/5 hover:border-[#F4C430]/20">
                          <div className="p-6">
                            {/* Image Container */}
                            <div className="flex justify-center mb-4">
                              <div className="relative">
                                <img 
                                  src={member.image?.url || '/principal.png'} 
                                  alt={member.image?.alt || member.name}
                                  className="w-20 h-20 rounded-full object-cover border-2 border-[#123C73]/10 group-hover:border-[#F4C430] transition-colors duration-300"
                                />
                              </div>
                            </div>
                            
                            {/* Info Section */}
                            <div className="text-center">
                              <h4 className="font-bold text-sm text-[#1B1F24] mb-1.5 group-hover:text-[#123C73] transition-colors duration-300">
                                {member.name}
                              </h4>
                              <p className="text-xs font-semibold text-[#123C73] uppercase tracking-wider bg-[#123C73]/5 rounded-full px-3 py-1 inline-block">
                                {member.title?.toUpperCase()}
                              </p>
                            </div>
                          </div>
                          
                          {/* Hover Accent */}
                          <div className="h-0.5 bg-gradient-to-r from-[#123C73] to-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center w-full py-12">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#123C73]/5 max-w-md mx-auto">
                  <Star className="w-16 h-16 text-[#667085]/30 mx-auto mb-4" />
                  <p className="text-[#667085] text-lg">No executive committee members found.</p>
                </div>
              </div>
            )}
          </div>
        </div>
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

export default Management;