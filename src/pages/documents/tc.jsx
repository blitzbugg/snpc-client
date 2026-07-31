'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TCDownloadPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tcData, setTcData] = useState(null);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    const fetchTCData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch TC data from CMS
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/tc?where[isActive][equals]=true`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch TC certificate');
        }

        const data = await response.json();
        
        if (!data.docs || data.docs.length === 0) {
          throw new Error('No active TC certificate found');
        }

        setTcData(data.docs[0]);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTCData();
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = () => {
    if (tcData) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = tcData.file.url;
      link.download = tcData.file.filename;
      link.target = '_blank';
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      setIsDownloaded(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-off-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-sm sm:text-base text-primary hover:text-primary-dark transition-colors mb-4 sm:mb-6"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-off-white p-6 sm:p-8 text-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto mb-3 sm:mb-4"></div>
            <h3 className="text-lg sm:text-xl font-semibold text-dark mb-2">Loading TC Application</h3>
            <p className="text-sm sm:text-base text-light-dark">Please wait while we prepare your download...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-off-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-sm sm:text-base text-primary hover:text-primary-dark transition-colors mb-4 sm:mb-6"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-off-white p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-dark mb-2">Unable to Load TC</h3>
            <p className="text-sm sm:text-base text-light-dark mb-4 sm:mb-6 px-2">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-primary text-primary rounded-lg hover:bg-off-white transition-colors text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isDownloaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-off-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-sm sm:text-base text-primary hover:text-primary-dark transition-colors mb-4 sm:mb-6"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-off-white p-6 sm:p-8">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-dark mb-2">Download Complete!</h3>
              <p className="text-sm sm:text-base text-light-dark mb-4 sm:mb-6 px-2">Your TC application form has been downloaded successfully.</p>
              
              {/* File Info */}
              <div className="bg-off-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-left">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center min-w-0 flex-1">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-dark text-sm sm:text-base truncate">{tcData.file.filename}</p>
                      <p className="text-xs sm:text-sm text-light-dark">
                        {formatFileSize(tcData.file.filesize)} • PDF
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Again
                </button>
                <Link
                  href="/"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-primary text-primary rounded-lg hover:bg-off-white transition-colors text-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-off-white p-5 sm:p-6">
            <h4 className="text-base sm:text-lg font-semibold text-dark mb-3 flex items-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What to do next?
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-light-dark">
              <li className="flex items-start">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mr-2 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Print the downloaded application form</span>
              </li>
              <li className="flex items-start">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mr-2 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Fill out all required information completely</span>
              </li>
              <li className="flex items-start">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mr-2 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Submit the completed form to the school administration</span>
              </li>
              <li className="flex items-start">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mr-2 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Allow 3-5 working days for processing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Main download page (before download)
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-off-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-sm sm:text-base text-primary hover:text-primary-dark transition-colors mb-4 sm:mb-6"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-dark mb-3 sm:mb-4 px-2">
            Transfer Certificate Application
          </h1>
          <p className="text-base sm:text-lg text-light-dark px-4">
            Download the official TC application form for student transfers
          </p>
        </div>

        {/* TC Certificate Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-off-white p-5 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1 w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3">
                {tcData.title}
              </h3>
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Active
                </span>
                <span className="text-xs sm:text-sm text-light-dark">
                  Updated: {new Date(tcData.updatedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            <div className="p-3 sm:p-4 bg-primary/10 rounded-xl self-center sm:self-start">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          {tcData.description && (
            <p className="text-sm sm:text-base md:text-lg text-light-dark mb-4 sm:mb-6 leading-relaxed">
              {tcData.description}
            </p>
          )}

          <div className="bg-off-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center min-w-0 flex-1">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-dark text-sm sm:text-base truncate">{tcData.file.filename}</p>
                  <p className="text-xs sm:text-sm text-light-dark">
                    {formatFileSize(tcData.file.filesize)} • {tcData.file.mimeType}
                  </p>
                </div>
              </div>
              <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium uppercase flex-shrink-0">
                PDF
              </span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-lg text-white bg-primary hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download TC Application Form
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-off-white p-5 sm:p-6">
          <h4 className="text-base sm:text-lg font-semibold text-dark mb-3 flex items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Important Information
          </h4>
          <ul className="space-y-2 text-sm sm:text-base text-light-dark">
            <li className="flex items-start">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mr-2 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Click the download button above to get the TC application form</span>
            </li>
            <li className="flex items-start">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mr-2 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Print and fill out the form completely</span>
            </li>
            <li className="flex items-start">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mr-2 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Submit to school administration with required documents</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}