import React, { useState, useEffect } from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from 'next/link';

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
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      // Toggle between showing initial 3 or all events
      setDisplayedEvents(prev => 
        prev === 3 ? announcements.length : 3
      );
      setLoadingMore(false);
    }, 500);
  };

  // Skeleton Card Component
  const EventSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Event Image Skeleton */}
      <div className="h-48 overflow-hidden">
        <Skeleton 
          height="100%" 
          width="100%" 
          className="h-full w-full"
          style={{ 
            background: 'linear-gradient(90deg,#f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite'
          }}
        />
      </div>
      
      {/* Event Content Skeleton */}
      <div className="p-6">
        <Skeleton height={24} width="80%" className="mb-3" />
        <Skeleton height={16} width="100%" count={3} containerClassName="space-y-2 mb-2" />
        <Skeleton height={14} width="60%" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const visibleEvents = announcements.slice(0, displayedEvents);
  const showButton = announcements.length > 3;

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Upcoming Events & Activities
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-dark">
            Stay updated with our exciting school events, academic
            activities, and special programs throughout the year.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {loading ? (
            <>
              <EventSkeleton />
              <EventSkeleton />
              <EventSkeleton />
            </>
          ) : visibleEvents.length > 0 ? (
            visibleEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Event Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.images?.url || '/placeholder.png'}
                    alt={event.images?.alt || event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/placeholder.png';
                    }}
                  />
                </div>
                
                {/* Event Content */}
                <div className="p-6">
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{ color: '#0D47A1' }}
                  >
                    {event.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: '#6E6E6E' }}
                  >
                    {event.content}
                  </p>
                  {event.publishDate && (
                    <p 
                      className="text-sm mt-2"
                      style={{ color: '#6E6E6E' }}
                    >
                      Scheduled: {new Date(event.publishDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg text-dark mb-2">No upcoming events</p>
                <p className="text-sm text-gray-600">Check back later for exciting school activities and programs.</p>
              </div>
            </div>
          )}
        </div>

        {/* View More / Redirect to Events Page */}
        {!loading && showButton && (
          <div className="text-center">
            <p className="mb-6 text-lg text-gray-600">
              {loadingMore
                ? "Loading..."
                : displayedEvents === 3
                ? "View more upcoming events and activities"
                : `Showing all ${announcements.length} events`}
            </p>

            {loadingMore ? (
              <button
                className="px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-md bg-blue-700"
                disabled
              >
                Loading...
              </button>
            ) : displayedEvents === 3 ? (
              <Link href="/non-academics/events" legacyBehavior>
                <a
                  className="px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-md inline-block bg-blue-700"
                >
                  View More
                </a>
              </Link>
            ) : (
              <button
                onClick={() => setDisplayedEvents(3)}
                className="px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-md bg-blue-700"
              >
                View Less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolEvents;