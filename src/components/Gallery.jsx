import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/gallery?limit=6`
        );
        const data = await res.json();
        // only keep photos and slice to max 6
        setPhotos((data.docs || []).filter((item) => item.type === "photo").slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h4 className="text-2xl md:text-3xl font-bold text-[#0D47A1] mb-4">
            Our Gallery
          </h4>
          <p className="text-[#6E6E6E] text-base md:text-lg">
            We make your child happy day after day
          </p>
        </div>

        {/* Gallery Grid (strictly 3 columns, max 6 items) */}
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
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
