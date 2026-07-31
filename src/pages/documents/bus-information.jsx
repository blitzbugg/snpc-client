// src/pages/BusTablesPage.jsx
import React, { useState } from "react";

// Data fetching happens here (server-side)
export async function getServerSideProps() {
  try {
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
    
    if (!cmsUrl) {
      console.error("NEXT_PUBLIC_CMS_URL environment variable is not set");
      return { 
        props: { 
          initialData: { docs: [], totalPages: 1, page: 1 },
          error: "CMS URL not configured"
        } 
      };
    }

    // Fetch first page initially
    const res = await fetch(`${cmsUrl}/api/bus-tables?page=1&limit=10`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch bus tables: ${res.status}`);
    }
    
    const data = await res.json();
    return { 
      props: { 
        initialData: data,
        error: null
      } 
    };
  } catch (error) {
    console.error("Error fetching bus tables:", error);
    return { 
      props: { 
        initialData: { docs: [], totalPages: 1, page: 1 },
        error: error.message
      } 
    };
  }
}

// Component with client-side pagination
export default function BusTablesPage({ initialData, error }) {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(initialData.page || 1);
  const [loading, setLoading] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Fetch data for a specific page
  const fetchPage = async (pageNum) => {
    setLoading(true);
    try {
      const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
      const res = await fetch(`${cmsUrl}/api/bus-tables?page=${pageNum}&limit=10`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch page ${pageNum}`);
      }
      
      const newData = await res.json();
      setData(newData);
      setCurrentPage(pageNum);
      
      // Scroll to top of page smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Error fetching page:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle page navigation
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= data.totalPages && pageNum !== currentPage) {
      fetchPage(pageNum);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const totalPages = data.totalPages || 1;
    const current = currentPage;
    
    // Always show first page
    pages.push(1);
    
    // Show ellipsis if needed
    if (current > 3) {
      pages.push('...');
    }
    
    // Show pages around current page
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    // Show ellipsis if needed
    if (current < totalPages - 2) {
      pages.push('...');
    }
    
    // Always show last page if there are multiple pages
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Sort buses by number extracted from title
  const sortedBuses = [...(data.docs || [])].sort((a, b) => {
    // Extract numbers from bus titles for proper numerical sorting
    const getNumberFromTitle = (title) => {
      const match = title.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    
    const numA = getNumberFromTitle(a.title);
    const numB = getNumberFromTitle(b.title);
    
    // If both have numbers, sort numerically
    if (numA && numB) {
      return numA - numB;
    }
    
    // Otherwise, sort alphabetically
    return a.title.localeCompare(b.title);
  });

  // Handle case where no data is available
  if (!data.docs || data.docs.length === 0) {
    return (
      <div className="bg-neutral min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            School Bus Timetables {currentYear}
          </h1>
          <p className="text-dark text-lg">
            {error ? `Error: ${error}` : "Bus schedules are currently unavailable. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral min-h-screen p-8">
      <h1 className="text-4xl font-bold text-primary mb-10 text-center">
        School Bus Timetables {currentYear}
      </h1>

      {/* Loading indicator */}
      {loading && (
        <div className="fixed top-4 right-4 bg-primary text-accent px-4 py-2 rounded-lg shadow-lg z-50">
          Loading...
        </div>
      )}

      {/* Bus tables */}
      <div className="space-y-16">
        {sortedBuses.map((bus) => (
          <div
            key={bus.id}
            className="bg-accent rounded-2xl shadow-md border border-off-white overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-dark text-accent p-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">{bus.title}</h2>
                {bus.routeDescription && (
                  <p className="text-sm text-secondary mt-1">{bus.routeDescription}</p>
                )}
              </div>
              <span className="text-secondary font-bold text-3xl">🚌</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-dark">
                <thead>
                  <tr className="bg-primary text-accent text-left">
                    <th className="p-3 border border-off-white">STOP</th>
                    <th className="p-3 border border-off-white">MORNING</th>
                    <th className="p-3 border border-off-white">EVENING</th>
                  </tr>
                </thead>
                <tbody>
                  {bus.stops?.map((stop, i) => (
                    <tr
                      key={stop.id || i}
                      className={
                        i % 2 === 0
                          ? "bg-off-white hover:bg-secondary/20 transition"
                          : "bg-accent hover:bg-secondary/20 transition"
                      }
                    >
                      <td className="p-3 border border-neutral font-medium">{stop.stop}</td>
                      <td className="p-3 border border-neutral">{stop.morning || "-"}</td>
                      <td className="p-3 border border-neutral">{stop.evening || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {data.totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2">
          {/* Previous button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={!data.hasPrevPage || loading}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              data.hasPrevPage && !loading
                ? 'bg-primary text-accent hover:bg-primary-dark'
                : 'bg-neutral text-dark cursor-not-allowed opacity-50'
            }`}
          >
            Previous
          </button>

          {/* Page numbers */}
          <div className="flex gap-2">
            {getPageNumbers().map((pageNum, index) => (
              pageNum === '...' ? (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-dark">
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    currentPage === pageNum
                      ? 'bg-primary-dark text-accent'
                      : 'bg-accent text-primary border border-primary hover:bg-primary hover:text-accent'
                  }`}
                >
                  {pageNum}
                </button>
              )
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={!data.hasNextPage || loading}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              data.hasNextPage && !loading
                ? 'bg-primary text-accent hover:bg-primary-dark'
                : 'bg-neutral text-dark cursor-not-allowed opacity-50'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Page info */}
      {data.totalPages > 1 && (
        <div className="mt-6 text-center text-dark">
          <p className="text-sm">
            Page {currentPage} of {data.totalPages} • Showing {data.docs.length} of {data.totalDocs} bus routes
          </p>
        </div>
      )}
    </div>
  );
}