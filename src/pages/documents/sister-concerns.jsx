import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/institutions?limit=10`);
        const data = await response.json();
        setInstitutions(data.docs);
      } catch (error) {
        console.error('Error fetching institutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100 animate-pulse h-96">
      <div className="w-full h-full bg-slate-200"></div>
      
      {/* Content Overlay Skeleton */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 bg-gradient-to-t from-slate-900/60 to-transparent">
        <div className="h-8 bg-slate-300/80 rounded-md mb-3 w-2/3"></div>
        <div className="h-5 bg-slate-300/60 rounded-md mb-6 w-full"></div>
        <div className="h-12 bg-slate-300/80 rounded-xl w-full"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Header Section Skeleton */}
        <div className="text-center py-16 sm:py-24 px-4 max-w-3xl mx-auto">
          <div className="h-6 bg-slate-200 rounded-full mx-auto mb-4 w-32 animate-pulse"></div>
          <div className="h-12 bg-slate-200 rounded-lg mx-auto mb-4 w-2/3 animate-pulse"></div>
          <div className="h-6 bg-slate-200 rounded-lg mx-auto w-3/4 animate-pulse"></div>
        </div>

        {/* Institutions Cards Skeleton */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-2 gap-8">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[200px] -right-[300px] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative text-center py-16 sm:py-24 px-4 max-w-4xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/5 border border-primary/10 text-primary mb-4 uppercase tracking-wider"
        >
          <span>Our Network</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-slate-900"
        >
          Our <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Institutions</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto text-slate-600 leading-relaxed font-light"
        >
          Your gateway to important institutional information,{' '}
          <span className="block sm:inline">services, and updates — all in one place.</span>
        </motion.p>
      </div>

      {/* Institutions Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        {institutions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm"
          >
            <p className="text-lg text-slate-500">No institutions found.</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-8"
          >
            {institutions.map((institution) => (
              <motion.div 
                key={institution.id} 
                variants={cardVariants}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 bg-white transition-all duration-300"
              >
                <div className="relative w-full h-96 overflow-hidden">
                  <img 
                    src={institution.image?.url || "/school-front.png"}
                    alt={institution.image?.alt || institution.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
                      {institution.name}
                    </h3>
                    <p className="text-base text-white/90 mb-6 line-clamp-3 font-light leading-relaxed">
                      {institution.description}
                    </p>
                    <a 
                      href={institution.website || '/contact-us'} 
                      target={institution.website ? "_blank" : "_self"}
                      rel={institution.website ? "noopener noreferrer" : ""}
                      className="w-full py-3.5 px-6 text-center rounded-xl font-semibold text-base bg-secondary text-primary hover:bg-[#ffcf33] transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                      <span>Visit Institution</span>
                      {institution.website ? (
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      ) : (
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      )}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Institutions;