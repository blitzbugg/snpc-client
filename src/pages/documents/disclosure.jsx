import React, { useState, useEffect } from 'react';
import { FileText, Download, ExternalLink, ChevronLeft, ChevronRight, Sparkles, RefreshCw, Eye } from 'lucide-react';

const Disclosure = () => {
  const [disclosureItems, setDisclosureItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
    totalDocs: 0
  });

  useEffect(() => {
    fetchDisclosureItems();
  }, [page]);

  const fetchDisclosureItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/disclosure?page=${page}&limit=10`);
      if (!response.ok) {
        throw new Error('Failed to fetch disclosure documents');
      }
      
      const data = await response.json();
      
      if (data.docs) {
        const activeItems = data.docs
          .filter(item => item.isActive !== false)
          .sort((a, b) => a.order - b.order);
        
        setDisclosureItems(activeItems);
        setPagination({
          hasNextPage: data.hasNextPage || false,
          hasPrevPage: data.hasPrevPage || false,
          totalPages: data.totalPages || 1,
          totalDocs: data.totalDocs || 0
        });
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching disclosure items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDocument = (document) => {
    if (document && document.url) {
      window.open(document.url, '_blank', 'noopener,noreferrer');
    } else {
      console.error('Document URL not available');
    }
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage && page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setPage(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="h-10 w-48 bg-[#E8EDF5] rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-8 w-72 bg-[#E8EDF5] rounded-xl mx-auto mb-3 animate-pulse"></div>
            <div className="h-5 w-96 bg-[#E8EDF5] rounded-lg mx-auto animate-pulse"></div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 overflow-hidden">
            <div className="bg-[#123C73] px-6 py-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 h-5 bg-white/10 rounded-lg animate-pulse"></div>
                <div className="col-span-4 h-5 bg-white/10 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="divide-y divide-[#123C73]/5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 px-6 py-5">
                  <div className="col-span-8 space-y-2">
                    <div className="h-5 bg-[#E8EDF5] rounded-lg w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-[#E8EDF5] rounded-lg w-1/2 animate-pulse"></div>
                  </div>
                  <div className="col-span-4 flex justify-end">
                    <div className="h-9 w-20 bg-[#E8EDF5] rounded-xl animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-[#123C73]/5">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B1F24] mb-3">Error Loading Documents</h3>
            <p className="text-[#667085] mb-6">{error}</p>
            <button
              onClick={fetchDisclosureItems}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300"
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
    <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
            <FileText className="w-4 h-4 text-[#F4C430] mr-2" />
            <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
              Compliance
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B1F24] mb-6 leading-tight">
            Mandatory{" "}
            <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
              Disclosure
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#667085] max-w-2xl mx-auto leading-relaxed font-light">
            Access all essential compliance and regulatory information in one place with our easy-to-view mandatory disclosure section.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-[#123C73] to-[#0A2348]">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8 px-6 lg:px-8 py-4">
                <span className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#F4C430]" />
                  File Name
                </span>
              </div>
              <div className="col-span-4 px-6 lg:px-8 py-4 text-right">
                <span className="text-white font-semibold text-sm uppercase tracking-wider">
                  Document
                </span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#123C73]/5">
            {disclosureItems.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="w-20 h-20 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-[#667085]/30" />
                </div>
                <h3 className="text-xl font-bold text-[#1B1F24] mb-2">No Documents Available</h3>
                <p className="text-[#667085]">Documents will appear here once they are added.</p>
              </div>
            ) : (
              disclosureItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`grid grid-cols-12 gap-4 hover:bg-[#F7F9FC] transition-all duration-200 group ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#FCFCFD]'
                  }`}
                >
                  <div className="col-span-8 px-6 lg:px-8 py-5">
                    <p className="text-sm font-semibold text-[#1B1F24] leading-relaxed group-hover:text-[#123C73] transition-colors duration-200">
                      {item.fileName}
                    </p>
                    {item.description && (
                      <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="col-span-4 px-6 lg:px-8 py-5 text-right flex items-center justify-end">
                    <button
                      onClick={() => handleViewDocument(item.document)}
                      className="group/btn inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#123C73] border-2 border-[#123C73]/20 rounded-xl hover:bg-[#123C73] hover:text-white hover:border-[#123C73] transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      View
                      <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {disclosureItems.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[#667085] font-medium">
              Page <span className="font-bold text-[#123C73]">{page}</span> of <span className="font-bold text-[#123C73]">{pagination.totalPages}</span>
              {pagination.totalDocs > 0 && (
                <span className="ml-2 text-[#667085]/60">
                  ({pagination.totalDocs} documents)
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevPage}
                disabled={!pagination.hasPrevPage}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  pagination.hasPrevPage
                    ? 'bg-[#123C73] text-white hover:bg-[#0A2348] shadow-lg hover:shadow-xl hover:shadow-[#123C73]/20'
                    : 'bg-[#E8EDF5] text-[#667085] cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={!pagination.hasNextPage}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  pagination.hasNextPage
                    ? 'bg-[#123C73] text-white hover:bg-[#0A2348] shadow-lg hover:shadow-xl hover:shadow-[#123C73]/20'
                    : 'bg-[#E8EDF5] text-[#667085] cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-[#123C73]/10"></div>
            <div className="w-1.5 h-1.5 bg-[#F4C430] rounded-full"></div>
            <div className="h-px w-8 bg-[#123C73]/10"></div>
          </div>
          <p className="text-sm text-[#667085]">
            All documents are regularly updated to ensure compliance with current regulations.
            <br className="sm:hidden" />
            <span className="text-[#667085]/60"> Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclosure;