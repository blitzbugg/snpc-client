'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Download, ArrowLeft, CheckCircle, AlertCircle, Info, Sparkles, RefreshCw, ExternalLink, FileX } from 'lucide-react';

export default function TCDownloadPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tcData, setTcData] = useState(null);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchTCData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setIsEmpty(false);

        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/tc?where[isActive][equals]=true`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch TC certificate');
        }

        const data = await response.json();
        
        if (!data.docs || data.docs.length === 0) {
          setIsEmpty(true);
          setTcData(null);
          return;
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
      const link = document.createElement('a');
      link.href = tcData.file.url;
      link.download = tcData.file.filename;
      link.target = '_blank';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloaded(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-[#123C73] hover:text-[#0A2348] transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="w-20 h-20 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-[#123C73]" />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-8 lg:p-10 text-center">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 border-4 border-[#123C73]/10 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#F4C430] rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-[#1B1F24] mb-2">Loading TC Application</h3>
            <p className="text-[#667085]">Please wait while we prepare your download...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-[#123C73] hover:text-[#0A2348] transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-8 lg:p-10 text-center">
            <h3 className="text-xl font-bold text-[#1B1F24] mb-2">Unable to Load TC</h3>
            <p className="text-[#667085] mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#123C73]/20 text-[#123C73] font-semibold rounded-xl hover:bg-[#F7F9FC] transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty State - No TC document available
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-[#123C73] hover:text-[#0A2348] transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="w-20 h-20 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileX className="w-10 h-10 text-[#667085]/40" />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-8 lg:p-10">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1F24] mb-4">
                Transfer Certificate{" "}
                <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
                  Application
                </span>
              </h1>
              <p className="text-lg text-[#667085] font-light mb-8">
                Download the official TC application form for student transfers
              </p>

              {/* Empty State Card */}
              <div className="bg-[#F7F9FC] rounded-2xl p-8 mb-8">
                <div className="w-16 h-16 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileX className="w-8 h-8 text-[#667085]/40" />
                </div>
                <h3 className="text-xl font-bold text-[#1B1F24] mb-2">No TC Form Available</h3>
                <p className="text-[#667085] max-w-md mx-auto">
                  The Transfer Certificate application form is not available at the moment. Please check back later or contact the school administration for assistance.
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-[#F4C430]/5 to-[#123C73]/5 rounded-2xl p-6 border border-[#F4C430]/20">
                <h4 className="font-bold text-[#1B1F24] mb-3">Need Help?</h4>
                <div className="space-y-2 text-sm text-[#667085]">
                  <p>📞 Phone: <span className="font-semibold text-[#123C73]">8891720292</span></p>
                  <p>✉️ Email: <span className="font-semibold text-[#123C73]">indianpublicschoolkollam@gmail.com</span></p>
                  <p>📍 Visit: School Administration Office during working hours</p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isDownloaded) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-[#123C73] hover:text-[#0A2348] transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-8 lg:p-10">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#1B1F24] mb-2">Download Complete!</h3>
              <p className="text-[#667085] mb-6">Your TC application form has been downloaded successfully.</p>
              
              <div className="bg-[#F7F9FC] rounded-2xl p-4 mb-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-[#123C73]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#1B1F24] text-sm truncate">{tcData.file.filename}</p>
                    <p className="text-xs text-[#667085]">{formatFileSize(tcData.file.filesize)} • PDF</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#123C73] text-white font-semibold rounded-xl hover:bg-[#0A2348] transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Download Again
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#123C73]/20 text-[#123C73] font-semibold rounded-xl hover:bg-[#F7F9FC] transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-3xl shadow-lg border border-[#123C73]/5 p-6 lg:p-8">
            <h4 className="text-lg font-bold text-[#1B1F24] mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F4C430]/10 rounded-xl flex items-center justify-center">
                <Info className="w-4 h-4 text-[#123C73]" />
              </div>
              What to do next?
            </h4>
            <ul className="space-y-3">
              {[
                "Print the downloaded application form",
                "Fill out all required information completely",
                "Submit the completed form to the school administration",
                "Allow 3-5 working days for processing"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#F4C430]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-[#123C73]" />
                  </div>
                  <span className="text-[#667085] text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Main download page
  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12 lg:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 lg:mb-10">
          <Link href="/" className="inline-flex items-center text-sm text-[#123C73] hover:text-[#0A2348] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="w-20 h-20 bg-[#123C73]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-[#123C73]" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1F24] mb-4">
            Transfer Certificate{" "}
            <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
              Application
            </span>
          </h1>
          <p className="text-lg text-[#667085] font-light">
            Download the official TC application form for student transfers
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-6 lg:p-10 mb-8">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#1B1F24] mb-3">{tcData.title}</h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-xl text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Active
                </span>
                <span className="text-sm text-[#667085]">
                  Updated: {new Date(tcData.updatedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            <div className="w-14 h-14 bg-[#123C73]/5 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-[#123C73]" />
            </div>
          </div>

          {tcData.description && (
            <p className="text-[#667085] leading-relaxed mb-6">
              {tcData.description}
            </p>
          )}

          <div className="bg-[#F7F9FC] rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-[#123C73]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#1B1F24] text-sm truncate">{tcData.file.filename}</p>
                  <p className="text-xs text-[#667085]">{formatFileSize(tcData.file.filesize)} • PDF</p>
                </div>
              </div>
              <span className="px-3 py-1.5 bg-[#F4C430]/10 text-[#123C73] rounded-xl text-xs font-bold uppercase flex-shrink-0">
                PDF
              </span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#123C73]/20 hover:-translate-y-1 text-lg"
          >
            <Download className="w-6 h-6 group-hover:translate-y-0.5 transition-transform duration-300" />
            Download TC Application Form
            <ExternalLink className="w-4 h-4 ml-1 opacity-50" />
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-[#123C73]/5 p-6 lg:p-8">
          <h4 className="text-lg font-bold text-[#1B1F24] mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F4C430]/10 rounded-xl flex items-center justify-center">
              <Info className="w-4 h-4 text-[#123C73]" />
            </div>
            Important Information
          </h4>
          <ul className="space-y-3">
            {[
              "Click the download button above to get the TC application form",
              "Print and fill out the form completely",
              "Submit to school administration with required documents"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#F4C430]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-[#123C73]" />
                </div>
                <span className="text-[#667085] text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}