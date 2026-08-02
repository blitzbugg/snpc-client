import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Users, Award, Phone, Building2, Sparkles, UserCheck, ImageIcon } from 'lucide-react';

const Associations = () => {
  const [ptaData, setPtaData] = useState({
    executiveCommittee: [],
    members: [],
    loading: true,
    error: null
  });

  const [groupPhoto, setGroupPhoto] = useState({
    url: null,
    title: '',
    loading: true,
    error: null,
    isEmpty: false
  });

  useEffect(() => {
    const fetchPTAData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pta?limit=100`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const sortedMembers = data.docs.sort((a, b) => a.order - b.order);
        
        const executiveCommittee = sortedMembers.filter(member => member.isExecutive);
        const members = sortedMembers.filter(member => !member.isExecutive);
        
        setPtaData({
          executiveCommittee,
          members,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching PTA data:', error);
        setPtaData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    const fetchGroupPhoto = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pta-group-photo?where[isActive][equals]=true`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if there are any docs at all
        if (!data.docs || data.docs.length === 0) {
          setGroupPhoto({
            url: null,
            title: '',
            loading: false,
            error: null,
            isEmpty: true
          });
          return;
        }
        
        const doc = data.docs[0];
        let imageUrl = doc.image?.url;
        
        // Check if image URL actually exists
        if (!imageUrl) {
          setGroupPhoto({
            url: null,
            title: doc.title || '',
            loading: false,
            error: null,
            isEmpty: true
          });
          return;
        }
        
        if (!imageUrl.startsWith('http')) {
          const cleanUrl = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
          imageUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/${cleanUrl}`;
        }
        
        setGroupPhoto({
          url: imageUrl,
          title: doc.title || "PTA Executive Committee Group Photo",
          loading: false,
          error: null,
          isEmpty: false
        });
      } catch (error) {
        console.error('Error fetching group photo:', error);
        setGroupPhoto({
          url: null,
          title: '',
          loading: false,
          error: error.message,
          isEmpty: true
        });
      }
    };

    fetchPTAData();
    fetchGroupPhoto();
  }, []);

  const formatRole = (role) => {
    const roleMap = {
      'president-pta': 'President, PTA',
      'chairman-foundation': 'Chairman, Sree Narayana Foundation',
      'secretary-foundation': 'Secretary, Sree Narayana Foundation',
      'secretary-pta': 'Secretary, PTA',
      'principal': 'Principal',
      'vice-principal': 'Vice Principal',
      'headmistress': 'Headmistress',
      'teacher': 'Teacher',
      'member': 'Member'
    };
    return roleMap[role] || role;
  };

  const { members } = ptaData;
  const col1 = members.slice(0, Math.ceil(members.length / 3));
  const col2 = members.slice(Math.ceil(members.length / 3), Math.ceil(members.length * 2 / 3));
  const col3 = members.slice(Math.ceil(members.length * 2 / 3));

  if (ptaData.error || groupPhoto.error) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-[#123C73]/5">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B1F24] mb-3">Error Loading Data</h3>
            <p className="text-[#667085]">{ptaData.error || groupPhoto.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
            <Users className="w-4 h-4 text-[#F4C430] mr-2" />
            <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
              PTA
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
            {ptaData.loading ? <Skeleton width={300} baseColor="#E8EDF5" highlightColor="#F7F9FC" /> : (
              <>
                Parent Teacher{" "}
                <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                  Association
                </span>
              </>
            )}
          </h1>
          
          <p className="text-lg md:text-xl text-[#667085] max-w-2xl mx-auto leading-relaxed font-light">
            {ptaData.loading ? (
              <Skeleton count={2} baseColor="#E8EDF5" highlightColor="#F7F9FC" />
            ) : (
              'Connect with and explore various associations to expand your network, share ideas, and collaborate effectively.'
            )}
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Group Photo Section */}
        <div className="mb-10 lg:mb-14">
          {groupPhoto.loading ? (
            <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 overflow-hidden">
              <Skeleton 
                height={400} 
                className="w-full" 
                baseColor="#E8EDF5" 
                highlightColor="#F7F9FC" 
              />
            </div>
          ) : groupPhoto.isEmpty ? (
            /* Empty State - No Image Available */
            <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-12 text-center">
              <div className="w-24 h-24 bg-[#123C73]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-12 h-12 text-[#667085]/30" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1F24] mb-2">No Group Photo Available</h3>
              <p className="text-[#667085] max-w-md mx-auto">
                The PTA group photo will be displayed here once it is uploaded. Please check back later.
              </p>
            </div>
          ) : (
            /* Image Available */
            <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 overflow-hidden">
              <div className="relative">
                <img
                  src={groupPhoto.url}
                  alt={groupPhoto.title}
                  className="w-full h-auto max-h-[453px] object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', groupPhoto.url);
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    // Show fallback if image fails to load
                    setGroupPhoto(prev => ({ ...prev, isEmpty: true }));
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#123C73]/60 to-transparent p-6">
                  <p className="text-white font-semibold text-lg">{groupPhoto.title}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PTA Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-6 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#123C73]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B1F24]">
              {ptaData.loading ? <Skeleton width={300} baseColor="#E8EDF5" highlightColor="#F7F9FC" /> : 'PARENT TEACHER ASSOCIATION'}
            </h2>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            {ptaData.loading ? (
              <>
                <p className="mb-4"><Skeleton count={3} baseColor="#E8EDF5" highlightColor="#F7F9FC" /></p>
                <p className="mb-6"><Skeleton count={4} baseColor="#E8EDF5" highlightColor="#F7F9FC" /></p>
              </>
            ) : (
              <>
                <p className="mb-4 text-[#667085] leading-relaxed">
                  There is a Parent-Teacher association in the school. The PTA is expected to bring to the notice of the management any shortcomings and put forward practical suggestions for the better functioning of the school.
                </p>
                <p className="mb-6 text-[#667085] leading-relaxed">
                  Our PTA vision is to build relationships with parents and teachers, help support the school, our children's education and all round development. PTA is holding general meetings once a year and when the need arises. PTA supports the school to enhance the cultural and educational life of the school, benefits the children.
                </p>
              </>
            )}
          </div>

          {/* Executive Committee */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#123C73]/5 rounded-xl flex items-center justify-center">
                <Award className="w-4 h-4 text-[#123C73]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1F24]">
                {ptaData.loading ? (
                  <Skeleton width={350} baseColor="#E8EDF5" highlightColor="#F7F9FC" />
                ) : (
                  `PTA EXECUTIVE COMMITTEE ${ptaData.executiveCommittee[0]?.academicYear || '2024-25'}`
                )}
              </h3>
            </div>
            <div className="bg-[#F7F9FC] rounded-2xl p-6 space-y-3">
              {ptaData.loading ? (
                Array(3).fill(0).map((_, index) => (
                  <div key={index} className="flex flex-wrap gap-2">
                    <Skeleton width={150} baseColor="#E8EDF5" highlightColor="#F7F9FC" />
                    <Skeleton width={100} baseColor="#E8EDF5" highlightColor="#F7F9FC" />
                  </div>
                ))
              ) : ptaData.executiveCommittee.length > 0 ? (
                ptaData.executiveCommittee.map((member, index) => (
                  <div key={member.id || index} className="flex flex-wrap items-center gap-2 text-[#667085] group hover:bg-white rounded-xl p-2 transition-colors duration-200">
                    <div className="w-6 h-6 bg-[#123C73]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-3.5 h-3.5 text-[#123C73]" />
                    </div>
                    <span className="font-semibold text-[#1B1F24]">{member.name}</span>
                    {member.role && (
                      <span className="text-sm">({formatRole(member.role)})</span>
                    )}
                    {member.phone && (
                      <span className="ml-auto flex items-center gap-1 text-sm text-[#123C73] font-medium">
                        <Phone className="w-3.5 h-3.5 text-[#F4C430]" />
                        {member.phone}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <UserCheck className="w-10 h-10 text-[#667085]/30 mx-auto mb-3" />
                  <p className="text-[#667085] text-sm">No executive committee members available.</p>
                </div>
              )}
            </div>
          </div>

          {/* Members List */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#123C73]/5 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 text-[#123C73]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B1F24]">PTA Members</h3>
              {!ptaData.loading && members.length > 0 && (
                <span className="bg-[#F4C430]/10 text-[#123C73] px-3 py-1 rounded-full text-sm font-semibold">
                  {members.length} Members
                </span>
              )}
            </div>
            
            {ptaData.loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-0">
                {Array(3).fill(0).map((_, colIndex) => (
                  <div key={colIndex} className="flex flex-col space-y-3">
                    {Array(8).fill(0).map((_, index) => (
                      <div key={index} className="flex text-sm items-center gap-2">
                        <Skeleton width={20} baseColor="#E8EDF5" highlightColor="#F7F9FC" />
                        <Skeleton width={120} baseColor="#E8EDF5" highlightColor="#F7F9FC" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-0">
                {[col1, col2, col3].map((column, colIdx) => (
                  <div key={colIdx} className="flex flex-col space-y-2">
                    {column.map((member, index) => {
                      const globalIndex = colIdx === 0 ? index : colIdx === 1 ? col1.length + index : col1.length + col2.length + index;
                      return (
                        <div key={member.id} className="flex items-center gap-2 text-sm text-[#667085] group hover:bg-[#F7F9FC] rounded-lg p-1.5 transition-colors duration-200">
                          <span className="w-6 h-6 bg-[#123C73]/5 rounded-lg flex items-center justify-center text-xs font-semibold text-[#123C73] flex-shrink-0">
                            {globalIndex + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-[#1B1F24]">{member.name}</span>
                            {member.role && (
                              <span className="text-xs ml-1">({formatRole(member.role)})</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[#F7F9FC] rounded-2xl">
                <Users className="w-12 h-12 text-[#667085]/30 mx-auto mb-4" />
                <p className="text-[#667085] font-medium">No PTA members data available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Associations;