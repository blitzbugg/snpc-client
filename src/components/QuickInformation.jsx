import React from 'react';
import { GraduationCap, Bus, Calendar, FileText, Phone, Download, Clock, User, ArrowRight, Sparkles } from 'lucide-react';

export default function QuickInformation() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  const infoCards = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Admissions Open",
      description: `Apply for Academic Year ${currentYear}-${currentYear + 1}. Limited seats available.`,
      buttonText: "Apply Now",
      isPrimary: true,
      linkTo: "/admission"
    },
    {
      icon: <Bus className="w-8 h-8" />,
      title: "Transport Facility",
      description: "Safe and reliable bus service covering major routes in the city.",
      buttonText: "View Routes",
      isPrimary: false,
      linkTo: "/documents/bus-information"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Important Documents",
      description: "Download fee structure, syllabus, and other important documents.",
      buttonText: "Download",
      isPrimary: false,
      linkTo: "/documents/disclosure"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Contact Support",
      description: "Get help with admissions, fees, or general inquiries.",
      buttonText: "Contact Now",
      isPrimary: false,
      linkTo: "/contact-us"
    }
  ];

  return (
    <div className="w-full bg-[#F7F9FC]">
      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
            <Sparkles className="w-4 h-4 text-[#F4C430] mr-2" />
            <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
              Quick Access
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
            Quick{" "}
            <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
              Information
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[#667085] max-w-2xl mx-auto leading-relaxed font-light">
            Access important information and services quickly with our convenient quick access cards.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20 transform hover:-translate-y-2 flex flex-col overflow-hidden"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Top Gradient Line */}
              <div className={`absolute top-0 left-4 right-4 h-1 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
                card.isPrimary 
                  ? 'bg-gradient-to-r from-[#123C73] to-[#F4C430]' 
                  : 'bg-gradient-to-r from-[#123C73] to-[#F4C430]'
              }`}></div>

              <div className="p-6 lg:p-8 flex flex-col flex-grow">
                {/* Icon Container */}
                <div className="relative mb-6 flex justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F4C430]/20 to-[#123C73]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    card.isPrimary
                      ? 'bg-gradient-to-br from-[#123C73] to-[#0A2348]'
                      : 'bg-[#123C73]/5'
                  }`}>
                    {React.cloneElement(card.icon, { 
                      className: `w-8 h-8 ${card.isPrimary ? 'text-[#F4C430]' : 'text-[#123C73]'} group-hover:scale-110 transition-transform duration-300`
                    })}
                  </div>
                </div>

                {/* Card Content */}
                <div className="text-center flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-[#1B1F24] mb-3 group-hover:text-[#123C73] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-[#667085] text-sm leading-relaxed mb-6 flex-grow">
                    {card.description}
                  </p>

                  {/* Action Button */}
                  <a
                    href={card.linkTo}
                    className={`group/btn inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-300 mt-auto ${
                      card.isPrimary
                        ? 'bg-[#123C73] text-white hover:bg-[#0A2348] shadow-lg hover:shadow-xl hover:shadow-[#123C73]/20'
                        : 'bg-white text-[#123C73] border-2 border-[#123C73]/20 hover:border-[#123C73] hover:bg-[#123C73]/5'
                    }`}
                  >
                    {card.buttonText}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
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
}