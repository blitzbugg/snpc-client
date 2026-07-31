import React, { useState, useEffect } from "react";
import { X, ChevronUp } from "lucide-react";
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
            className="mb-2" 
            style={{ lineHeight: 1.2 }}
          />
          <Skeleton 
            height={12} 
            width="100%" 
            count={2} 
            containerClassName="space-y-1"
          />
          <Skeleton 
            height={8} 
            width={80} 
            className="mt-2" 
          />
          {index < 2 && (
            <div className="border-b border-dotted border-gray-300 mt-3">
              <Skeleton height={1} width="100%" />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`bg-white border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
        isExpanded ? "" : "cursor-pointer"
      }`}
      style={{
        width: "285px",
        height: isExpanded ? "373px" : "48px",
      }}
      onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-50 border-b border-gray-200 p-3 rounded-t-lg">
        <h3 className="text-blue-700 font-semibold text-xl">
        Announcements
        </h3>
        {isExpanded ? (
          <X
            className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
          />
        ) : (
          <ChevronUp
            className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
          />
        )}
      </div>

      {/* Scrollable Content */}
      {isExpanded && (
        <div className="overflow-y-auto h-80 p-3">
          {isLoading ? (
            renderSkeleton()
          ) : announcements.length > 0 ? (
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={announcement.id} className="pb-3">
                  <h3 className="text-blue-700 font-medium text-sm mb-2 leading-tight">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {announcement.content}
                  </p>
                  <p className="text-gray-400 text-[10px] mt-1">
                    {new Date(announcement.publishDate).toLocaleDateString('en-GB',{
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                  {/* Separator */}
                  {index < announcements.length - 1 && (
                    <div className="border-b border-dotted border-gray-300 mt-3"></div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No announcements available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}