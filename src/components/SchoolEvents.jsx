import React, { useState, useEffect } from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Sparkles, ChevronDown, ChevronUp, Camera } from 'lucide-react';

const SchoolEvents = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/events`);
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();
        setAnnouncements(data.docs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleViewMoreLess = async () => {
    setLoadingMore(true);
    
    setTimeout(() => {
      setDisplayedEvents(prev => 
        prev === 3 ? announcements.length : 3
      );
      setLoadingMore(false);
    }, 500);
  };

  // Skeleton Card Component
  const EventSkeleton = () => (
    <div className="bg-white rounded-3xl shadow-lg border border-[#123C73]/5 overflow-hidden animate-pulse">
      <div className="h-48 overflow-hidden">
        <Skeleton 
          height="100%" 
          width="100%" 
          className="h-full w-full"
          baseColor="#E8EDF5"
          highlightColor="#F7F9FC"
        />
      </div>
      <div className="p-6 lg:p-8">
        <Skeleton height={24} width="80%" className="mb-3" baseColor="#E8EDF5" highlightColor="#F7F9FC" />
        <Skeleton height={16} width="100%" count={3} containerClassName="space-y-2 mb-2" baseColor="#E8EDF5" highlightColor="#F7F9FC" />
        <Skeleton height={14} width="60%" baseColor="#E8EDF5" highlightColor="#F7F9FC" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="bg-[#F7F9FC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#123C73]/5 max-w-md mx-auto">
            <Sparkles className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-[#667085] mb-6">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const visibleEvents = announcements.slice(0, displayedEvents);
  const showButton = announcements.length > 3;

  return (
    <div className="bg-[#F7F9FC] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
            <Calendar className="w-4 h-4 text-[#F4C430] mr-2" />
            <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
              Events & Activities
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
            Upcoming{" "}
            <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[#667085] max-w-2xl mx-auto leading-relaxed font-light">
            Stay updated with our exciting school events, academic activities, and special programs throughout the year.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <Clock className="w-5 h-5 text-[#F4C430]" />
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {loading ? (
            <>
              <EventSkeleton />
              <EventSkeleton />
              <EventSkeleton />
            </>
          ) : visibleEvents.length > 0 ? (
            visibleEvents.map((event, index) => (
              <div
                key={event.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20 overflow-hidden transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.images?.url || '/placeholder.png'}
                    alt={event.images?.alt || event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/placeholder.png';
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Date Badge */}
                  {event.publishDate && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-[#F4C430] text-[#123C73] px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(event.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1B1F24] mb-3 group-hover:text-[#123C73] transition-colors duration-300 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[#667085] leading-relaxed line-clamp-3 mb-4">
                    {event.content}
                  </p>
                  
                  {event.publishDate && (
                    <div className="flex items-center gap-2 text-sm text-[#667085] pt-4 border-t border-[#123C73]/10">
                      <Clock className="w-4 h-4 text-[#123C73]" />
                      <span>Scheduled: {new Date(event.publishDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  )}

                  {/* Bottom Accent */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-px flex-1 bg-[#123C73]/10"></div>
                    <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
                    <div className="h-px flex-1 bg-[#123C73]/10"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="bg-white rounded-3xl p-12 shadow-lg border border-[#123C73]/5 max-w-lg mx-auto">
                <div className="w-20 h-20 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-[#667085]/30" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B1F24] mb-2">No Upcoming Events</h3>
                <p className="text-[#667085]">Check back later for exciting school activities and programs.</p>
              </div>
            </div>
          )}
        </div>

        {/* View More / View Less Button */}
        {!loading && showButton && (
          <div className="text-center">
            {loadingMore ? (
              <button
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#123C73] text-white font-bold rounded-2xl shadow-lg opacity-75 cursor-wait"
                disabled
              >
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </button>
            ) : displayedEvents === 3 ? (
              <Link href="/non-academics/events" className="inline-flex items-center gap-2 px-8 py-4 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#123C73]/20 hover:-translate-y-1 group">
                View All Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            ) : (
              <button
                onClick={() => setDisplayedEvents(3)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#123C73] font-bold rounded-2xl border-2 border-[#123C73]/20 hover:border-[#123C73] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
              >
                View Less
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            )}
          </div>
        )}
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

export default SchoolEvents;