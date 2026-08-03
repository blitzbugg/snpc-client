// src/pages/BusTablesPage.jsx
import React, { useState } from "react";
import { Bus, Clock, MapPin, ChevronLeft, ChevronRight, ArrowUp, Navigation, Sparkles } from "lucide-react";

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

export default function BusTablesPage({ initialData, error }) {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(initialData.page || 1);
  const [loading, setLoading] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

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
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Error fetching page:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= data.totalPages && pageNum !== currentPage) {
      fetchPage(pageNum);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const totalPages = data.totalPages || 1;
    const current = currentPage;
    
    pages.push(1);
    
    if (current > 3) {
      pages.push('...');
    }
    
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    if (current < totalPages - 2) {
      pages.push('...');
    }
    
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const sortedBuses = [...(data.docs || [])].sort((a, b) => {
    const getNumberFromTitle = (title) => {
      const match = title.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    
    const numA = getNumberFromTitle(a.title);
    const numB = getNumberFromTitle(b.title);
    
    if (numA && numB) {
      return numA - numB;
    }
    
    return a.title.localeCompare(b.title);
  });

  if (!data.docs || data.docs.length === 0) {
    return (
      <div className="bg-[#F7F9FC] min-h-screen py-16 lg:py-24 px-4 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="w-24 h-24 bg-[#123C73]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Bus className="w-12 h-12 text-[#667085]/30" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1B1F24] mb-4">
            School Bus Timetables {currentYear}
          </h1>
          <p className="text-[#667085] text-lg">
            {error ? `Error: ${error}` : "Bus schedules are currently unavailable. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
            <Bus className="w-4 h-4 text-[#F4C430] mr-2" />
            <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">Transport</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
            School Bus{" "}
            <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">Timetables</span>
            {" "}{currentYear}
          </h1>
          
          <p className="text-lg md:text-xl text-[#667085] max-w-2xl mx-auto leading-relaxed font-light">
            Find your bus route, pickup points, and timings for safe school transportation
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <Navigation className="w-5 h-5 text-[#F4C430]" />
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="fixed top-4 right-4 bg-[#123C73] text-white px-5 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 animate-pulse">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </div>
        )}

        {/* Bus tables */}
        <div className="space-y-10 lg:space-y-14">
          {sortedBuses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 overflow-hidden"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] p-6 lg:p-8 overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#F4C430]/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#F4C430] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Bus className="w-7 h-7 text-[#123C73]" />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-white">{bus.title}</h2>
                      {bus.routeDescription && (
                        <div className="flex items-center gap-2 mt-2 text-white/70">
                          <MapPin className="w-4 h-4 text-[#F4C430]" />
                          <p className="text-sm">{bus.routeDescription}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-4xl hidden sm:block">🚌</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto p-4 lg:p-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F7F9FC]">
                      <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider rounded-tl-xl">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#F4C430] flex-shrink-0" />
                          <span>Stop</span>
                        </div>
                      </th>
                      <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#F4C430] flex-shrink-0" />
                          <span>Morning</span>
                        </div>
                      </th>
                      <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider rounded-tr-xl">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#F4C430] flex-shrink-0" />
                          <span>Evening</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bus.stops?.map((stop, i) => (
                      <tr
                        key={stop.id || i}
                        className={`transition-all duration-200 ${
                          i % 2 === 0
                            ? "bg-white hover:bg-[#F7F9FC]"
                            : "bg-[#FCFCFD] hover:bg-[#F7F9FC]"
                        }`}
                      >
                        <td className="p-4 border-b border-[#123C73]/5 font-medium text-[#1B1F24]">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-[#123C73]/5 rounded-lg flex items-center justify-center text-xs font-bold text-[#123C73] flex-shrink-0">
                              {i + 1}
                            </span>
                            <span>{stop.stop}</span>
                          </div>
                        </td>
                        <td className="p-4 border-b border-[#123C73]/5 text-[#667085]">
                          <span className="bg-[#F4C430]/10 text-[#123C73] px-3 py-1 rounded-lg text-sm font-semibold">
                            {stop.morning || "-"}
                          </span>
                        </td>
                        <td className="p-4 border-b border-[#123C73]/5 text-[#667085]">
                          <span className="bg-[#123C73]/5 text-[#123C73] px-3 py-1 rounded-lg text-sm font-semibold">
                            {stop.evening || "-"}
                          </span>
                        </td>
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
          <div className="mt-16">
            <div className="flex justify-center items-center gap-3">
              {/* Previous button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={!data.hasPrevPage || loading}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  data.hasPrevPage && !loading
                    ? 'bg-[#123C73] text-white hover:bg-[#0A2348] shadow-lg hover:shadow-xl hover:shadow-[#123C73]/20'
                    : 'bg-[#E8EDF5] text-[#667085] cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              {/* Page numbers */}
              <div className="flex gap-2">
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-[#667085] font-medium">
                      ...
                    </span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      disabled={loading}
                      className={`w-11 h-11 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        currentPage === pageNum
                          ? 'bg-[#123C73] text-white shadow-lg'
                          : 'bg-white text-[#667085] border border-[#123C73]/10 hover:border-[#123C73] hover:text-[#123C73]'
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
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  data.hasNextPage && !loading
                    ? 'bg-[#123C73] text-white hover:bg-[#0A2348] shadow-lg hover:shadow-xl hover:shadow-[#123C73]/20'
                    : 'bg-[#E8EDF5] text-[#667085] cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Page info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-[#667085]">
                Page <span className="font-bold text-[#123C73]">{currentPage}</span> of{" "}
                <span className="font-bold text-[#123C73]">{data.totalPages}</span>
                {" • "}Showing {data.docs.length} of {data.totalDocs} bus routes
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}