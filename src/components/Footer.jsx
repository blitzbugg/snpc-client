import React from 'react';
import { Facebook, Youtube, MapPin, Phone, Mail, ArrowRight, ExternalLink, Building2 } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0A2348] to-[#123C73] text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4C430]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        {/* Logo Section */}
        <div className="flex justify-center mb-12 lg:mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-[#F4C430]/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white p-4 rounded-2xl shadow-2xl shadow-[#F4C430]/10">
              <img 
                src="/logo.jpg" 
                alt="Sree Narayana Public School"
                className="h-16 md:h-20 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mb-12 lg:mb-16">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F4C430]/20 rounded-lg flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#F4C430]" />
              </div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/the-school/messages", label: "Words from Leaders" },
                { href: "/gallery", label: "Our Gallery" },
                { href: "/contact-us", label: "Contact Us" },
                { href: "/admission", label: "Admissions" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-white/70 hover:text-[#F4C430] transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 bg-[#F4C430] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F4C430]/20 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-[#F4C430]" />
              </div>
              Connect With Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.facebook.com/p/S-N-Public-School-Kizhavoor-Mukhathala-100067848552245/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-white/70 hover:text-[#F4C430] transition-all duration-300 bg-white/5 rounded-xl p-3 hover:bg-white/10"
                >
                  <div className="w-10 h-10 bg-[#1877F2]/20 rounded-lg flex items-center justify-center group-hover:bg-[#1877F2]/30 transition-colors duration-300">
                    <Facebook className="w-5 h-5 text-[#1877F2]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Facebook</p>
                    <p className="text-xs text-white/50">Follow our page</p>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="group flex items-center gap-3 text-white/70 hover:text-[#F4C430] transition-all duration-300 bg-white/5 rounded-xl p-3 hover:bg-white/10"
                >
                  <div className="w-10 h-10 bg-[#FF0000]/20 rounded-lg flex items-center justify-center group-hover:bg-[#FF0000]/30 transition-colors duration-300">
                    <Youtube className="w-5 h-5 text-[#FF0000]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">YouTube</p>
                    <p className="text-xs text-white/50">Watch our videos</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F4C430]/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-[#F4C430]" />
              </div>
              Get in Touch
            </h3>
            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3 group cursor-default">
                <div className="w-10 h-10 bg-[#F4C430]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#F4C430]/20 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-[#F4C430]" />
                </div>
                <div>
                  <p className="text-white/90 leading-relaxed text-sm">
                    Sree Narayana Public School<br/>
                    Kizhavoor, Mukhathala<br/>
                    Kollam, Kerala - 691577
                  </p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-10 h-10 bg-[#F4C430]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#F4C430]/20 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-[#F4C430]" />
                </div>
                <a 
                  href="tel:8891720292" 
                  className="text-white/90 hover:text-[#F4C430] transition-colors duration-300 text-sm"
                >
                  8891720292
                </a>
              </div>
              
              {/* Email */}
              <div className="flex items-start gap-3 group cursor-default">
                <div className="w-10 h-10 bg-[#F4C430]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#F4C430]/20 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-[#F4C430]" />
                </div>
                <a 
                  href="mailto:indianpublicschoolkollam@gmail.com" 
                  className="text-white/90 hover:text-[#F4C430] transition-colors duration-300 text-sm break-all"
                >
                  indianpublicschoolkollam@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Sree Narayana Public School. All rights reserved.
            </p>
            <p className="text-white/40 text-sm">
              Designed & Developed by{" "}
              <a 
                href="https://www.obsidyne.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F4C430] hover:text-[#FFD95A] transition-colors duration-300 font-medium"
              >
                Obsidyne
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;