'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AppendixPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appendixData, setAppendixData] = useState({});
  const [staffSummary, setStaffSummary] = useState(null);
  const [activeSection, setActiveSection] = useState('general');

  // Section mapping
  const sections = [
    { id: 'general', label: 'A: General Information', icon: 'info' },
    { id: 'documents', label: 'B: Documents', icon: 'document' },
    { id: 'academics', label: 'C: Academics', icon: 'academic' },
    { id: 'staff', label: 'D: Staff', icon: 'users' },
    { id: 'result_x', label: 'Class X Results', icon: 'chart' },
    { id: 'result_xii', label: 'Class XII Results', icon: 'chart' },
    { id: 'infrastructure', label: 'E: Infrastructure', icon: 'building' },
  ];

  useEffect(() => {
    const fetchAppendixData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all appendix data
        const appendixResponse = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/appendix?where[isActive][equals]=true&limit=200&sort=serialNumber`
        );

        if (!appendixResponse.ok) {
          throw new Error('Failed to fetch mandatory disclosure data');
        }

        const appendixDataResult = await appendixResponse.json();

        if (!appendixDataResult.docs || appendixDataResult.docs.length === 0) {
          throw new Error('No mandatory disclosure data found');
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

  const getIcon = (type) => {
    const icons = {
      info: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      document: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      ),
      academic: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      ),
      users: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      ),
      chart: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      ),
      building: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      ),
    };
    return icons[type] || icons.info;
  };

  const renderTwoColumnTable = (items) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-8 text-light-dark">
          <p>No data available for this section</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-neutral border border-neutral rounded-lg overflow-hidden">
          <thead className="bg-primary text-accent">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-accent divide-y divide-neutral">
            {items.map((item, index) => (
              <tr 
                key={item.id} 
                className={index % 2 === 0 ? 'bg-white' : 'bg-accent'}
              >
                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-dark font-medium">
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold mr-3">
                      {item.serialNumber}
                    </span>
                    {item.title}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-dark">
                  {item.details || item.resultData?.year || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderGeneralInfo = (items) => renderTwoColumnTable(items);
  
  const renderDocuments = (items) => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full divide-y divide-neutral border border-neutral rounded-lg overflow-hidden">
        <thead className="bg-primary text-accent">
          <tr>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-accent divide-y divide-neutral">
          {items.map((item, index) => (
            <tr 
              key={item.id} 
              className={index % 2 === 0 ? 'bg-white' : 'bg-accent'}
            >
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-dark font-medium">
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold mr-3">
                    {item.serialNumber}
                  </span>
                  {item.title}
                </div>
              </td>
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                {(item.document || item.documentUrl) && (
                  <a
                    href={item.document?.url || item.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm bg-primary hover:bg-primary/90 text-accent px-4 py-2 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
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

  const renderAcademics = (items) => {
    return (
      <div className="space-y-6">
        {/* Staff Summary */}
        {staffSummary && (
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-5 border-2 border-primary/20">
            <h4 className="text-base font-bold text-primary mb-4">Teaching Staff Summary</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-accent p-3 rounded-lg border border-primary/10">
                <p className="text-xs text-light-dark mb-1">Total Teachers</p>
                <p className="text-xl font-bold text-primary">
                  {staffSummary.totalTeachers}
                </p>
              </div>
              <div className="bg-accent p-3 rounded-lg border border-primary/10">
                <p className="text-xs text-light-dark mb-1">PGT</p>
                <p className="text-xl font-bold text-primary">
                  {staffSummary.pgt}
                </p>
              </div>
              <div className="bg-accent p-3 rounded-lg border border-primary/10">
                <p className="text-xs text-light-dark mb-1">TGT</p>
                <p className="text-xl font-bold text-primary">
                  {staffSummary.tgt}
                </p>
              </div>
              <div className="bg-accent p-3 rounded-lg border border-primary/10">
                <p className="text-xs text-light-dark mb-1">PRT</p>
                <p className="text-xl font-bold text-primary">
                  {staffSummary.prt}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Academic Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-neutral border border-neutral rounded-lg overflow-hidden">
            <thead className="bg-primary text-accent">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  Details/Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-accent divide-y divide-neutral">
              {items.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-accent'}
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-dark font-medium">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold mr-3">
                        {item.serialNumber}
                      </span>
                      {item.title}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    {item.details ? (
                      <span className="text-sm sm:text-base text-dark">{item.details}</span>
                    ) : (item.document || item.documentUrl) ? (
                      <a
                        href={item.document?.url || item.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm bg-primary hover:bg-primary/90 text-accent px-4 py-2 rounded-lg transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        View Document
                      </a>
                    ) : (
                      <span className="text-sm text-light-dark">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderStaff = (items) => renderTwoColumnTable(items);

  const renderResults = (items) => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full divide-y divide-neutral border border-neutral rounded-lg overflow-hidden">
        <thead className="bg-primary text-accent">
          <tr>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Year
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Registered
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Passed
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Pass %
            </th>
            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody className="bg-accent divide-y divide-neutral">
          {items.map((item, index) => (
            <tr 
              key={item.id} 
              className={index % 2 === 0 ? 'bg-white' : 'bg-accent'}
            >
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base font-semibold text-dark">
                {item.resultData?.year || '-'}
              </td>
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-dark">
                {item.resultData?.registered || '-'}
              </td>
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-dark">
                {item.resultData?.passed || '-'}
              </td>
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-dark">
                {item.resultData?.passPercentage ? `${item.resultData.passPercentage}%` : '-'}
              </td>
              <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base text-dark">
                {item.resultData?.remarks || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderInfrastructure = (items) => renderTwoColumnTable(items);

  const renderContent = () => {
    const items = appendixData[activeSection] || [];

    switch (activeSection) {
      case 'general':
        return renderGeneralInfo(items);
      case 'documents':
        return renderDocuments(items);
      case 'academics':
        return renderAcademics(items);
      case 'staff':
        return renderStaff(items);
      case 'result_x':
      case 'result_xii':
        return renderResults(items);
      case 'infrastructure':
        return renderInfrastructure(items);
      default:
        return (
          <div className="text-center py-8 text-light-dark">
            <p>No data available for this section</p>
          </div>
        );
    }
  };

  // Loading and error states remain the same...
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral to-accent py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm sm:text-base text-primary hover:text-primary/80 transition-colors mb-4 sm:mb-6"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>

            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {getIcon('document')}
              </svg>
            </div>
          </div>

          <div className="bg-accent rounded-xl sm:rounded-2xl shadow-lg border border-neutral p-6 sm:p-8 text-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto mb-3 sm:mb-4"></div>
            <h3 className="text-lg sm:text-xl font-semibold text-dark mb-2">
              Loading Mandatory Disclosures
            </h3>
            <p className="text-sm sm:text-base text-light-dark">
              Please wait while we fetch the information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral to-accent py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm sm:text-base text-primary hover:text-primary/80 transition-colors mb-4 sm:mb-6"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>

            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div className="bg-accent rounded-xl sm:rounded-2xl shadow-lg border border-neutral p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-dark mb-2">
              Unable to Load Data
            </h3>
            <p className="text-sm sm:text-base text-light-dark mb-4 sm:mb-6 px-2">
              {error}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary text-accent rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-primary text-primary rounded-lg hover:bg-neutral transition-colors text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral to-accent py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm sm:text-base text-primary hover:text-primary/80 transition-colors mb-4 sm:mb-6"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {getIcon('document')}
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4 px-2">
            Mandatory Public Disclosure
          </h1>
          <p className="text-base sm:text-lg text-light-dark px-4">
            APPENDIX-IX - As per CBSE requirements
          </p>
        </div>

        {/* Section Tabs */}
        <div className="bg-accent rounded-xl sm:rounded-2xl shadow-lg border border-neutral mb-6 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex min-w-max sm:min-w-0 sm:grid sm:grid-cols-7 border-b border-neutral">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-1 px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-primary text-accent border-b-2 border-secondary'
                      : 'text-light-dark hover:bg-neutral hover:text-primary'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {getIcon(section.icon)}
                    </svg>
                    <span className="hidden sm:inline">{section.label}</span>
                    <span className="sm:hidden">
                      {section.label.split(':')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-accent rounded-xl sm:rounded-2xl shadow-lg border border-neutral p-4 sm:p-6 md:p-8">
          <div className="mb-6 pb-4 border-b border-neutral">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              {sections.find((s) => s.id === activeSection)?.label}
            </h2>
          </div>
          {renderContent()}
        </div>

        {/* Footer Note */}
        <div className="mt-6 bg-accent rounded-xl shadow-md border border-neutral p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-dark mb-1">
                Important Notice
              </h4>
              <p className="text-xs sm:text-sm text-light-dark">
                This information is provided in compliance with CBSE mandatory
                disclosure requirements. All documents are self-attested by the
                school authorities. For any queries, please contact the school
                administration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}