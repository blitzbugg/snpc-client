'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Download, Users, GraduationCap, Building2, BarChart3, Info, AlertCircle, Sparkles, RefreshCw, BookOpen, Shield, FileX } from 'lucide-react';

export default function AppendixPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appendixData, setAppendixData] = useState({});
  const [staffSummary, setStaffSummary] = useState(null);
  const [activeSection, setActiveSection] = useState('general');
  const [isEmpty, setIsEmpty] = useState(false);

  const sections = [
    { id: 'general', label: 'A: General Information', icon: <Info className="w-4 h-4" /> },
    { id: 'documents', label: 'B: Documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'academics', label: 'C: Academics', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'staff', label: 'D: Staff', icon: <Users className="w-4 h-4" /> },
    { id: 'result_x', label: 'Class X Results', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'result_xii', label: 'Class XII Results', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'infrastructure', label: 'E: Infrastructure', icon: <Building2 className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const fetchAppendixData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setIsEmpty(false);

        const appendixResponse = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/appendix?where[isActive][equals]=true&limit=200&sort=serialNumber`
        );

        if (!appendixResponse.ok) {
          throw new Error('Failed to fetch mandatory disclosure data');
        }

        const appendixDataResult = await appendixResponse.json();

        // Check if no data is available
        if (!appendixDataResult.docs || appendixDataResult.docs.length === 0) {
          setIsEmpty(true);
          setAppendixData({});
          return;
        }

        // Group data by section
        const groupedData = appendixDataResult.docs.reduce((acc, item) => {
          if (!acc[item.section]) {
            acc[item.section] = [];
          }
          acc[item.section].push(item);
          return acc;
        }, {});

        setAppendixData(groupedData);

        // Fetch staff summary separately
        const staffResponse = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/staff-summary?where[isActive][equals]=true&limit=1`
        );

        if (staffResponse.ok) {
          const staffData = await staffResponse.json();
          if (staffData.docs && staffData.docs.length > 0) {
            setStaffSummary(staffData.docs[0]);
          }
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppendixData();
  }, []);

  const renderTwoColumnTable = (items) => {
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-[#667085]/30 mx-auto mb-4" />
          <p className="text-[#667085]">No data available for this section</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F7F9FC]">
              <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider rounded-tl-xl">Title</th>
              <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider rounded-tr-xl">Details</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-white hover:bg-[#F7F9FC]' : 'bg-[#FCFCFD] hover:bg-[#F7F9FC]'}`}>
                <td className="p-4 border-b border-[#123C73]/5">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-[#123C73]/5 rounded-lg flex items-center justify-center text-xs font-bold text-[#123C73]">
                      {item.serialNumber}
                    </span>
                    <span className="font-medium text-[#1B1F24] text-sm">{item.title}</span>
                  </div>
                </td>
                <td className="p-4 border-b border-[#123C73]/5 text-sm text-[#667085]">
                  {item.details || item.resultData?.year || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderDocuments = (items) => {
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-12">
          <Download className="w-12 h-12 text-[#667085]/30 mx-auto mb-4" />
          <p className="text-[#667085]">No documents available for this section</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F7F9FC]">
              <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider rounded-tl-xl">Title</th>
              <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-white hover:bg-[#F7F9FC]' : 'bg-[#FCFCFD] hover:bg-[#F7F9FC]'}`}>
                <td className="p-4 border-b border-[#123C73]/5">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-[#123C73]/5 rounded-lg flex items-center justify-center text-xs font-bold text-[#123C73]">
                      {item.serialNumber}
                    </span>
                    <span className="font-medium text-[#1B1F24] text-sm">{item.title}</span>
                  </div>
                </td>
                <td className="p-4 border-b border-[#123C73]/5">
                  {(item.document || item.documentUrl) && (
                    <a
                      href={item.document?.url || item.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#123C73] text-white text-sm font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      View Document
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAcademics = (items) => (
    <div className="space-y-8">
      {staffSummary && (
        <div className="bg-gradient-to-br from-[#F4C430]/5 to-[#123C73]/5 rounded-2xl p-6 border border-[#F4C430]/20">
          <h4 className="text-lg font-bold text-[#1B1F24] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#123C73]" />
            Teaching Staff Summary
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Teachers', value: staffSummary.totalTeachers },
              { label: 'PGT', value: staffSummary.pgt },
              { label: 'TGT', value: staffSummary.tgt },
              { label: 'PRT', value: staffSummary.prt },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#123C73]/5">
                <p className="text-xs text-[#667085] font-medium mb-1">{stat.label}</p>
                <p className="text-2xl font-extrabold text-[#123C73]">{stat.value || '-'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {renderTwoColumnTable(items)}
    </div>
  );

  const renderResults = (items) => {
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-[#667085]/30 mx-auto mb-4" />
          <p className="text-[#667085]">No results data available for this section</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F7F9FC]">
              <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider">Year</th>
              <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider">Registered</th>
              <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider">Passed</th>
              <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider">Pass %</th>
              <th className="p-4 text-left text-sm font-bold text-[#123C73] uppercase tracking-wider">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-white hover:bg-[#F7F9FC]' : 'bg-[#FCFCFD] hover:bg-[#F7F9FC]'}`}>
                <td className="p-4 border-b border-[#123C73]/5 font-semibold text-[#1B1F24] text-sm">{item.resultData?.year || '-'}</td>
                <td className="p-4 border-b border-[#123C73]/5 text-sm text-[#667085]">{item.resultData?.registered || '-'}</td>
                <td className="p-4 border-b border-[#123C73]/5 text-sm text-[#667085]">{item.resultData?.passed || '-'}</td>
                <td className="p-4 border-b border-[#123C73]/5 text-sm text-[#667085]">
                  {item.resultData?.passPercentage ? (
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                      {item.resultData.passPercentage}%
                    </span>
                  ) : '-'}
                </td>
                <td className="p-4 border-b border-[#123C73]/5 text-sm text-[#667085]">{item.resultData?.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    const items = appendixData[activeSection] || [];

    switch (activeSection) {
      case 'documents':
        return renderDocuments(items);
      case 'academics':
        return renderAcademics(items);
      case 'result_x':
      case 'result_xii':
        return renderResults(items);
      default:
        return renderTwoColumnTable(items);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-[#123C73]" />
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-10 max-w-md mx-auto">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 border-4 border-[#123C73]/10 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#F4C430] rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-[#1B1F24] mb-2">Loading Mandatory Disclosures</h3>
            <p className="text-[#667085]">Please wait while we fetch the information...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-10 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-[#1B1F24] mb-2">Unable to Load Data</h3>
            <p className="text-[#667085] mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300">
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#123C73]/20 text-[#123C73] font-semibold rounded-xl hover:bg-[#F7F9FC] transition-all duration-300">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty State - No data available
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center text-sm text-[#123C73] hover:text-[#0A2348] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="w-24 h-24 bg-[#123C73]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FileX className="w-12 h-12 text-[#667085]/30" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-10 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1F24] mb-4">
              Mandatory Public{" "}
              <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">Disclosure</span>
            </h1>
            <p className="text-lg text-[#667085] font-light mb-8">APPENDIX-IX - As per CBSE requirements</p>

            <div className="bg-[#F7F9FC] rounded-2xl p-8 mb-8">
              <FileX className="w-16 h-16 text-[#667085]/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1B1F24] mb-2">No Disclosure Data Available</h3>
              <p className="text-[#667085] max-w-md mx-auto">
                The mandatory disclosure information is not available at the moment. Please check back later or contact the school administration for assistance.
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-[#F4C430]/5 to-[#123C73]/5 rounded-2xl p-6 border border-[#F4C430]/20">
              <h4 className="font-bold text-[#1B1F24] mb-3">Need Help?</h4>
              <div className="space-y-2 text-sm text-[#667085]">
                <p>📞 Phone: <span className="font-semibold text-[#123C73]">8891720292</span></p>
                <p>✉️ Email: <span className="font-semibold text-[#123C73]">indianpublicschoolkollam@gmail.com</span></p>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <Link href="/" className="inline-flex items-center text-sm text-[#123C73] hover:text-[#0A2348] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="w-20 h-20 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-[#123C73]" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1F24] mb-4">
            Mandatory Public{" "}
            <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">Disclosure</span>
          </h1>
          <p className="text-lg text-[#667085] font-light">APPENDIX-IX - As per CBSE requirements</p>
        </div>

        {/* Section Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#123C73]/5 mb-8 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex min-w-max sm:grid sm:grid-cols-7">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-4 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-[#123C73] text-white shadow-lg'
                      : 'text-[#667085] hover:bg-[#F7F9FC] hover:text-[#123C73]'
                  }`}
                >
                  {section.icon}
                  <span className="hidden sm:inline">{section.label}</span>
                  <span className="sm:hidden">{section.label.split(':')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#123C73]/10">
            <div className="w-10 h-10 bg-[#F4C430]/10 rounded-xl flex items-center justify-center">
              {sections.find((s) => s.id === activeSection)?.icon}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1B1F24]">
              {sections.find((s) => s.id === activeSection)?.label}
            </h2>
          </div>
          {renderContent()}
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-white rounded-2xl shadow-md border border-[#123C73]/5 p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#F4C430]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="w-4 h-4 text-[#123C73]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1B1F24] mb-1">Important Notice</h4>
              <p className="text-sm text-[#667085]">
                This information is provided in compliance with CBSE mandatory disclosure requirements. All documents are self-attested by the school authorities. For any queries, please contact the school administration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}