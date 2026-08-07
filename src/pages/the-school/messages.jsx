import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Quote, MessageSquare, User, RefreshCw } from "lucide-react";

const Messages = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/leaders`);
        if (!response.ok) {
          throw new Error('Failed to fetch leaders');
        }
        const data = await response.json();
        // Sort to ensure Chairman (Prof. K. Sasikumar) comes first
        const sortedLeaders = data.docs.sort((a, b) => {
          if (a.name === "Prof. K. Sasikumar") return -1;
          if (b.name === "Prof. K. Sasikumar") return 1;
          return 0;
        });
        setLeaders(sortedLeaders);
      } catch (err) {
        setError("Failed to fetch leaders' messages.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  // Skeleton Card Component for Leader Message
  const LeaderSkeleton = () => (
    <div className="bg-white rounded-3xl shadow-lg border border-[#123C73]/5 overflow-hidden">
      {/* Decorative Top Bar */}
      <div className="h-2 bg-gradient-to-r from-[#123C73] to-[#F4C430]"></div>
      
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="relative mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Profile Image Skeleton */}
            <div className="relative flex-shrink-0">
              <Skeleton 
                height={144} 
                width={144} 
                circle 
                baseColor="#E8EDF5" 
                highlightColor="#F7F9FC" 
              />
              
              {/* Badge Skeleton */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <Skeleton 
                  height={32} 
                  width={200} 
                  baseColor="#E8EDF5" 
                  highlightColor="#F7F9FC" 
                  className="rounded-full"
                />
              </div>
            </div>
            
            <div className="flex-1 pt-2 sm:pt-8">
              {/* Name Skeleton */}
              <Skeleton 
                height={28} 
                width={200} 
                className="mb-2" 
                baseColor="#E8EDF5" 
                highlightColor="#F7F9FC" 
              />
              {/* Title Skeleton */}
              <Skeleton 
                height={20} 
                width={160} 
                baseColor="#E8EDF5" 
                highlightColor="#F7F9FC" 
              />
            </div>
          </div>
        </div>

        {/* Message Content Skeleton */}
        <div className="space-y-3">
          <Skeleton 
            height={16} 
            width="100%" 
            count={5} 
            containerClassName="space-y-3" 
            baseColor="#E8EDF5" 
            highlightColor="#F7F9FC" 
          />
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="bg-[#F7F9FC] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-[#123C73]/5">
            <div className="w-20 h-20 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-10 h-10 text-[#123C73]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B1F24] mb-3">Unable to Load Messages</h3>
            <p className="text-[#667085] mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300 hover:shadow-lg hover:shadow-[#123C73]/20"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#F7F9FC] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#123C73]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F4C430]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
            <MessageSquare className="w-4 h-4 text-[#F4C430] mr-2" />
            <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
              Messages
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
            Words from{" "}
            <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
              Our Leaders
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[#667085] max-w-2xl mx-auto leading-relaxed font-light">
            Hear from the visionary leaders who guide our school's mission and
            commitment to excellence in education.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <Quote className="w-5 h-5 text-[#F4C430]" />
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="space-y-8 lg:space-y-12">
          {loading ? (
            <>
              <LeaderSkeleton />
              <LeaderSkeleton />
            </>
          ) : leaders.length > 0 ? (
            leaders.map((leader, index) => (
              <div
                key={leader.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#123C73]/5 group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Top Gradient Bar */}
                <div className="h-2 bg-gradient-to-r from-[#123C73] via-[#F4C430] to-[#123C73] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="p-6 sm:p-8 lg:p-10">
                  {/* Leader Info Section */}
                  <div className="relative mb-8">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      {/* Profile Image */}
                      <div className="relative flex-shrink-0">
                        <div className="relative">
                          {/* Decorative Ring */}
                          <div className="absolute -inset-2 bg-gradient-to-br from-[#F4C430]/20 to-[#123C73]/20 rounded-full blur-md group-hover:blur-xl transition-all duration-500"></div>
                          
                          <img
                            src={leader.images?.url || "/placeholder.png"}
                            alt={leader.images?.alt || leader.name}
                            className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-xl z-10 group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = "/placeholder.png";
                            }}
                          />
                        </div>
                        
                        {/* Message Type Badge */}
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-20">
                          <div className="bg-gradient-to-r from-[#123C73] to-[#0A2348] text-white px-6 py-2 rounded-full shadow-lg shadow-[#123C73]/20 flex items-center gap-2 whitespace-nowrap">
                            <div className="w-2 h-2 bg-[#F4C430] rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold">
                              {leader.name === "Prof. K. Sasikumar" ? "Chairman's Message" : "Principal's Message"}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Leader Details */}
                      <div className="flex-1 pt-2 sm:pt-10">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#1B1F24] mb-1 group-hover:text-[#123C73] transition-colors duration-300">
                          {leader.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#F4C430]" />
                          <p className="text-sm sm:text-base text-[#667085] font-medium">
                            {leader.name === "Prof. K. Sasikumar" 
                              ? " Chairman" 
                              : "Principal"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="relative">
                    {/* Quote Icon */}
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#F4C430]/20" />
                    
                    <div className="prose prose-lg max-w-none text-[#667085] leading-relaxed space-y-4 pl-4 border-l-4 border-[#123C73]/10 group-hover:border-[#F4C430]/30 transition-colors duration-500">
                      {leader.message.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-base sm:text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="mt-8 flex items-center gap-2">
                    <div className="h-px flex-1 bg-[#123C73]/10"></div>
                    <div className="w-3 h-3 bg-[#F4C430] rounded-full rotate-45"></div>
                    <div className="h-px flex-1 bg-[#123C73]/10"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 max-w-lg mx-auto border border-[#123C73]/5">
                <div className="w-20 h-20 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-[#667085]/30" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B1F24] mb-3">No Messages Available</h3>
                <p className="text-[#667085]">
                  Messages from our leaders will appear here soon. Check back later!
                </p>
              </div>
            </div>
          )}
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

export default Messages;