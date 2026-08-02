import React, { useState, useEffect } from "react";
import { X, ChevronUp, Bell, Megaphone, Calendar, Sparkles } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AnnouncementBoard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/announcements?sort=-publishDate&limit=10`
        );
        if (!res.ok) throw new Error("Failed to fetch announcements");
        const data = await res.json();
        setAnnouncements(data.docs || []);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setAnnouncements([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  const renderSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={`skeleton-${index}`} className="pb-3">
          <Skeleton 
            height={16} 
            width={180} 
            className="mb-2 rounded-lg" 
            baseColor="#E8EDF5"
            highlightColor="#F7F9FC"
          />
          <Skeleton 
            height={12} 
            width="100%" 
            count={2} 
            containerClassName="space-y-1"
            baseColor="#E8EDF5"
            highlightColor="#F7F9FC"
            className="rounded-lg"
          />
          <Skeleton 
            height={8} 
            width={80} 
            className="mt-2 rounded-lg" 
            baseColor="#E8EDF5"
            highlightColor="#F7F9FC"
          />
          {index < 2 && (
            <div className="border-b border-dotted border-[#123C73]/10 mt-3"></div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`bg-white rounded-2xl shadow-2xl transition-all duration-500 ease-in-out border border-[#123C73]/5 ${
        isExpanded ? "" : "cursor-pointer hover:shadow-2xl hover:shadow-[#123C73]/10"
      }`}
      style={{
        width: "min(300px, 100%)",
        height: isExpanded ? "400px" : "52px",
      }}
      onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-3.5 rounded-t-2xl transition-all duration-300 ${
        isExpanded 
          ? 'bg-gradient-to-r from-[#123C73] to-[#0A2348]' 
          : 'bg-[#123C73] hover:bg-[#0A2348]'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg transition-all duration-300 ${
            isExpanded ? 'bg-[#F4C430]/20' : 'bg-white/10'
          }`}>
            <Bell className={`w-4 h-4 ${
              isExpanded ? 'text-[#F4C430]' : 'text-white'
            }`} />
          </div>
          <h3 className="text-white font-bold text-sm tracking-wide">
            Announcements
          </h3>
          {!isExpanded && announcements.length > 0 && (
            <span className="bg-[#F4C430] text-[#123C73] text-xs font-bold px-2 py-0.5 rounded-full">
              {announcements.length}
            </span>
          )}
        </div>
        
        <button
          className={`p-1.5 rounded-lg transition-all duration-300 ${
            isExpanded 
              ? 'hover:bg-white/10 text-white' 
              : 'hover:bg-white/10 text-white'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? (
            <X className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Scrollable Content */}
      {isExpanded && (
        <div className="overflow-y-auto h-[348px] p-4">
          {isLoading ? (
            renderSkeleton()
          ) : announcements.length > 0 ? (
            <div className="space-y-3">
              {announcements.map((announcement, index) => (
                <div 
                  key={announcement.id} 
                  className="group pb-3"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
                  }}
                >
                  {/* Announcement Card */}
                  <div className="bg-[#F7F9FC] rounded-xl p-3 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#123C73]/5">
                    {/* Title with icon */}
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-6 h-6 bg-[#F4C430]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Megaphone className="w-3.5 h-3.5 text-[#123C73]" />
                      </div>
                      <h4 className="text-[#1B1F24] font-semibold text-sm leading-tight group-hover:text-[#123C73] transition-colors duration-300">
                        {announcement.title}
                      </h4>
                    </div>
                    
                    {/* Content */}
                    <p className="text-[#667085] text-xs leading-relaxed ml-8">
                      {announcement.content}
                    </p>
                    
                    {/* Date */}
                    <div className="flex items-center gap-1.5 ml-8 mt-2">
                      <Calendar className="w-3 h-3 text-[#F4C430]" />
                      <p className="text-[#667085]/60 text-[10px] font-medium">
                        {new Date(announcement.publishDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {/* Separator */}
                  {index < announcements.length - 1 && (
                    <div className="flex items-center gap-2 mt-3 px-2">
                      <div className="h-px flex-1 bg-[#123C73]/5"></div>
                      <div className="w-1 h-1 bg-[#F4C430] rounded-full"></div>
                      <div className="h-px flex-1 bg-[#123C73]/5"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-[#667085]/30" />
              </div>
              <p className="text-[#667085] text-sm font-medium">
                No announcements available.
              </p>
              <p className="text-[#667085]/60 text-xs mt-1">
                Check back later for updates.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
