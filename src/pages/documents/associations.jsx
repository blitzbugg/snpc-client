import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const associations = () => {
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
    error: null
  });

  useEffect(() => {
    const fetchPTAData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pta?limit=100`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Sort all members by order field
        const sortedMembers = data.docs.sort((a, b) => a.order - b.order);
        
        // Separate executive committee from regular members
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
        
        // Debug logging - remove in production
        console.log('Group Photo API Response:', data);
        console.log('Number of docs:', data.docs?.length);
        
        if (data.docs && data.docs.length > 0) {
          const doc = data.docs[0];
          let imageUrl = doc.image?.url;
          
          console.log('Original image URL:', imageUrl);
          
          // Handle different URL formats
          if (imageUrl) {
            // If it's not already a full URL, construct it properly
            if (!imageUrl.startsWith('http')) {
              // Remove leading slash if present, then add CMS URL
              const cleanUrl = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
              imageUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/${cleanUrl}`;
            }
          }
          
          console.log('Final image URL:', imageUrl);
          
          setGroupPhoto({
            url: imageUrl || "/pta.png",
            title: doc.title || "PTA Executive Committee Group Photo",
            loading: false,
            error: null
          });
        } else {
          console.log('No active group photo found in API response, using fallback');
          setGroupPhoto({
            url: "/pta.png",
            title: "PTA Executive Committee Group Photo",
            loading: false,
            error: null
          });
        }
      } catch (error) {
        console.error('Error fetching group photo:', error);
        setGroupPhoto({
          url: "/pta.png", // Fallback to public folder
          title: "PTA Executive Committee Group Photo",
          loading: false,
          error: error.message
        });
      }
    };

    fetchPTAData();
    fetchGroupPhoto();
  }, []);

  // Function to format role display
  const formatRole = (role) => {
    const roleMap = {
      'president-pta': 'President, PTA',
      'chairman-foundation': 'Chairman, Sree Buddha Foundation',
      'secretary-foundation': 'Secretary, Sree Buddha Foundation',
      'secretary-pta': 'Secretary, PTA',
      'principal': 'Principal',
      'vice-principal': 'Vice Principal',
      'headmistress': 'Headmistress',
      'teacher': 'Teacher',
      'member': 'Member'
    };
    return roleMap[role] || role;
  };

  // Column-major distribution for members
  const { members } = ptaData;
  const col1 = members.slice(0, Math.ceil(members.length / 3));
  const col2 = members.slice(Math.ceil(members.length / 3), Math.ceil(members.length * 2 / 3));
  const col3 = members.slice(Math.ceil(members.length * 2 / 3));

  if (ptaData.error || groupPhoto.error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 bg-accent">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error loading PTA data</p>
            <p>{ptaData.error || groupPhoto.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-accent">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-primary">
          {ptaData.loading ? <Skeleton width={200} /> : 'Associations'}
        </h1>
        <p className="max-w-[486px] mx-auto text-dark">
          {ptaData.loading ? (
            <Skeleton count={2} />
          ) : (
            'Connect with and explore various associations to expand your network, share ideas, and collaborate effectively.'
          )}
        </p>
      </div>

      {/* Group Photo */}
      <div className="mb-8">
        <div className="w-full rounded-lg flex items-center justify-center shadow-lg bg-off-white">
          {groupPhoto.loading ? (
            <Skeleton 
              height={453} 
              className="w-full max-w-[1120px] rounded-lg" 
            />
          ) : (
            <img
              src={groupPhoto.url}
              alt={groupPhoto.title}
              className="w-full max-w-[1120px] h-auto max-h-[453px] object-cover rounded-lg"
              onError={(e) => {
                console.error('Image failed to load:', groupPhoto.url);
                e.target.src = "/pta.png";
              }}
            />
          )}
        </div>
      </div>

      {/* PTA Section */}
      <div className="rounded-lg p-6 shadow-lg bg-accent">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          {ptaData.loading ? <Skeleton width={300} /> : 'PARENT TEACHER ASSOCIATION'}
        </h2>
        
        {/* Description */}
        <div className="mb-6">
          {ptaData.loading ? (
            <>
              <p className="mb-4"><Skeleton count={3} /></p>
              <p className="mb-6"><Skeleton count={4} /></p>
            </>
          ) : (
            <>
              <p className="mb-4 text-dark">
                There is a Parent- Teacher association in the school. The PTA is expected to bring to the notice of the management any short comings and put forward practical suggestions for the better functioning of the school.
              </p>
              <p className="mb-6 text-dark">
                Our PTA vision is to build relationship with parents and teachers, help support the school, our children's education and all round development. PTA is holding general meetings once a year and when the need arises. PTA supports the school to enhance the cultural and educational life of the school, benefits the children.
              </p>
            </>
          )}
        </div>

        {/* Executive Committee */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-dark">
            {ptaData.loading ? (
              <Skeleton width={350} />
            ) : (
              `PTA EXECUTIVE COMMITTEE ${ptaData.executiveCommittee[0]?.academicYear || '2024-25'}`
            )}
          </h3>
          <div className="space-y-2 mb-6">
            {ptaData.loading ? (
              // Shimmer for executive committee
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="flex flex-wrap">
                  <Skeleton width={150} />
                  <Skeleton width={100} className="ml-2" />
                </div>
              ))
            ) : (
              ptaData.executiveCommittee.map((member, index) => (
                <div key={member.id || index} className="text-dark flex flex-wrap">
                  <span className="font-medium">{member.name}</span>
                  {member.role && (
                    <span className="text-light-dark"> ({formatRole(member.role)})</span>
                  )}
                  {member.phone && (
                    <span className="ml-2 text-secondary break-all">
                      Ph: {member.phone}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Members List - Responsive columns */}
        {ptaData.loading ? (
          // Shimmer for members list
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-10 gap-y-0">
            {Array(3).fill(0).map((_, colIndex) => (
              <div key={colIndex} className="flex flex-col space-y-3">
                {Array(8).fill(0).map((_, index) => (
                  <div key={index} className="flex text-sm">
                    <span className="w-6 flex-shrink-0">
                      <Skeleton width={16} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <Skeleton width={120} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : members.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-10 gap-y-0">
            <div className="flex flex-col space-y-3">
              {col1.map((member, index) => (
                <div key={member.id} className="flex text-sm text-dark">
                  <span className="w-6 text-light-dark flex-shrink-0">{index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium break-words">{member.name}</span>
                    {member.role && (
                      <span className="text-light-dark"> ({formatRole(member.role)})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-3">
              {col2.map((member, index) => (
                <div key={member.id} className="flex text-sm text-dark">
                  <span className="w-6 text-light-dark flex-shrink-0">{col1.length + index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium break-words">{member.name}</span>
                    {member.role && (
                      <span className="text-light-dark"> ({formatRole(member.role)})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-3">
              {col3.map((member, index) => (
                <div key={member.id} className="flex text-sm text-dark">
                  <span className="w-6 text-light-dark flex-shrink-0">{col1.length + col2.length + index + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium break-words">{member.name}</span>
                    {member.role && (
                      <span className="text-light-dark"> ({formatRole(member.role)})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* No members message */
          ptaData.executiveCommittee.length === 0 && (
            <div className="text-center py-8">
              <p className="text-light-dark">No PTA members data available at the moment.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default associations;