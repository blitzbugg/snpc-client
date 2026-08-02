import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Camera, Image, Sparkles, Maximize2, ArrowRight } from "lucide-react";
import Link from "next/link";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/gallery?limit=6`
        );
        const data = await res.json();
        setPhotos((data.docs || []).filter((item) => item.type === "photo").slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openImageModal = (photo) => setSelectedImage(photo);
  const closeImageModal = () => setSelectedImage(null);

  return (
    <section className="relative bg-gradient-to-br from-[#F7F9FC] via-white to-[#F7F9FC] py-16 lg:py-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-80 h-80 bg-[#123C73]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#F4C430]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
            <Camera className="w-4 h-4 text-[#F4C430] mr-2" />
            <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
              Our Gallery
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[#667085] max-w-2xl mx-auto leading-relaxed font-light">
            Capturing moments of excellence and memorable experiences
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
            <Image className="w-5 h-5 text-[#F4C430]" />
            <div className="h-px w-12 bg-[#F4C430]/30"></div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {loading
            ? Array(6)
                .fill()
                .map((_, i) => (
                  <div key={i} className="rounded-3xl overflow-hidden shadow-lg border border-[#123C73]/5">
                    <Skeleton
                      height={280}
                      borderRadius={0}
                      className="w-full"
                      baseColor="#E8EDF5"
                      highlightColor="#F7F9FC"
                    />
                  </div>
                ))
            : photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#123C73]/5 hover:border-[#F4C430]/20 cursor-pointer transform hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                  onClick={() => openImageModal(photo)}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={photo.media?.url}
                      alt={photo.media?.alt || photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Hover Content */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-[#F4C430] rounded-2xl p-3 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 className="w-6 h-6 text-[#123C73]" />
                      </div>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-semibold text-sm">{photo.title || 'Photo'}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#123C73]/20 hover:-translate-y-1"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Empty State */}
        {!loading && photos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#123C73]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Camera className="w-12 h-12 text-[#667085]/30" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B1F24] mb-2">No Photos Available</h3>
            <p className="text-[#667085]">Photos will appear here once they are added.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-[#123C73]/95 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white text-[#123C73] rounded-xl p-3 hover:bg-[#F7F9FC] transition-colors duration-300 z-10 shadow-lg flex items-center gap-2"
            >
              <span className="text-sm font-semibold hidden sm:inline">Close</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage.media?.url}
              alt={selectedImage.media?.alt || selectedImage.title}
              className="w-full rounded-3xl shadow-2xl"
            />
            <div className="absolute bottom-4 left-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                <p className="text-[#123C73] font-semibold">{selectedImage.title || 'Photo'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </section>
  );
};

export default Gallery;