import { Home, BookOpen, Users, Phone, ArrowLeft, Search, Compass, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#F7F9FC] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#123C73]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F4C430]/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#123C73]/2 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#123C73 1px, transparent 1px), linear-gradient(90deg, #123C73 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      {/* Main Content Container */}
      <div className="text-center max-w-2xl mx-auto relative z-10">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          {/* Large 404 Number */}
          <div className="text-[150px] md:text-[200px] font-black leading-none select-none">
            <span className="bg-gradient-to-br from-[#123C73] via-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
              4
            </span>
            <span className="bg-gradient-to-br from-[#F4C430] via-[#FFD95A] to-[#F4C430] bg-clip-text text-transparent">
              0
            </span>
            <span className="bg-gradient-to-br from-[#123C73] via-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
              4
            </span>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 animate-float">
            <div className="w-12 h-12 bg-[#F4C430] rounded-2xl flex items-center justify-center shadow-lg rotate-12">
              <Search className="w-6 h-6 text-[#123C73]" />
            </div>
          </div>
          <div className="absolute top-20 right-10 animate-float animation-delay-200">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg -rotate-6">
              <Compass className="w-5 h-5 text-[#123C73]" />
            </div>
          </div>
          <div className="absolute bottom-10 left-20 animate-float animation-delay-400">
            <div className="w-8 h-8 bg-[#123C73] rounded-lg flex items-center justify-center shadow-lg rotate-45">
              <Sparkles className="w-4 h-4 text-[#F4C430]" />
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        <div className="mb-6">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
            <Compass className="w-4 h-4 text-[#F4C430] mr-2" />
            <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
              Page Not Found
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F24] mb-4">
            Oops! This page doesn't exist
          </h1>
          
          <p className="text-lg text-[#667085] leading-relaxed max-w-md mx-auto font-light">
            Sorry, the page you're looking for might have been moved, deleted, or you may have typed the wrong URL.
          </p>
        </div>
        
        {/* School Branding */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#123C73]/5 mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#123C73] rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#F4C430]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1B1F24]">
                Sree Narayana Public School
              </h2>
              <p className="text-sm text-[#667085]">Excellence in Education</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#123C73]/20 hover:-translate-y-1"
          >
            <Home className="w-5 h-5" />
            Go Home
            <ArrowLeft className="w-4 h-4 ml-1 group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#123C73] font-bold rounded-2xl border-2 border-[#123C73]/20 hover:border-[#123C73] hover:bg-[#F7F9FC] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Link href="/admission" className="px-5 py-2.5 bg-white rounded-2xl text-sm font-semibold text-[#667085] hover:text-[#123C73] hover:shadow-md transition-all duration-300 border border-[#123C73]/5">
            Admissions
          </Link>
          <Link href="/gallery" className="px-5 py-2.5 bg-white rounded-2xl text-sm font-semibold text-[#667085] hover:text-[#123C73] hover:shadow-md transition-all duration-300 border border-[#123C73]/5">
            Gallery
          </Link>
          <Link href="/contact-us" className="px-5 py-2.5 bg-white rounded-2xl text-sm font-semibold text-[#667085] hover:text-[#123C73] hover:shadow-md transition-all duration-300 border border-[#123C73]/5">
            Contact Us
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-px w-8 bg-[#123C73]/10"></div>
          <div className="w-1.5 h-1.5 bg-[#F4C430] rounded-full"></div>
          <div className="h-px w-8 bg-[#123C73]/10"></div>
        </div>
        <p className="text-sm text-[#667085]">
          © {new Date().getFullYear()} Sree Narayana Public School, Kerala. All rights reserved.
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}