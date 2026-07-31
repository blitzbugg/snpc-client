import React, { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const gallery = () => {
  const [activeTab, setActiveTab] = useState("photos");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/gallery?limit=50`
        );
        const data = await res.json();
        setItems(data.docs || []);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const photos = items.filter((item) => item.type === "photo");
  const videos = items.filter((item) => item.type === "video");

  const openVideoModal = (video) => setSelectedVideo(video);
  const closeVideoModal = () => setSelectedVideo(null);

  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h4 className="text-2xl md:text-3xl font-bold text-[#0D47A1] mb-4">
            Our Gallery
          </h4>
          <p className="text-[#6E6E6E] text-base md:text-lg mb-8">
            We make your child happy day after day
          </p>
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("photos")}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === "photos"
                    ? "bg-[#FFB800] text-white shadow-md"
                    : "text-gray-600 hover:text-[#0D47A1]"
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`px-6 py-2 rounded-md font-medium ${
                  activeTab === "videos"
                    ? "bg-[#FFB800] text-white shadow-md"
                    : "text-gray-600 hover:text-[#0D47A1]"
                }`}
              >
                Videos
              </button>
            </div>
          </div>
        </div>

        {/* Photos */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {loading
              ? Array(6)
                  .fill()
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      height={250}
                      borderRadius={12}
                      className="w-full"
                    />
                  ))
              : photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="w-full h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
                  >
                    <img
                      src={photo.media?.url}
                      alt={photo.media?.alt || photo.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
          </div>
        )}

        {/* Videos */}
        {activeTab === "videos" && (
          <div className="flex flex-col items-center gap-6">
            {loading
              ? Array(3)
                  .fill()
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      height={300}
                      borderRadius={12}
                      className="w-full max-w-2xl"
                    />
                  ))
              : videos.map((video) => (
                  <div
                    key={video.id}
                    className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
                    style={{ width: "640px", maxWidth: "100%" }}
                    onClick={() => openVideoModal(video)}
                  >
                    <video className="w-full h-[360px] object-cover" muted>
                      <source
                        src={video.media?.url}
                        type={video.media?.mimeType}
                      />
                    </video>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40">
                      <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform">
                        <Play className="w-12 h-12 text-[#0D47A1]" />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        )}

        {/* Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden">
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </button>
              <video controls autoPlay className="w-full h-full">
                <source
                  src={selectedVideo.media?.url}
                  type={selectedVideo.media?.mimeType}
                />
              </video>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#0D47A1]">
                  {selectedVideo.title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default gallery;
