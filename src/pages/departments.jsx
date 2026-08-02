import React, { useState, useEffect } from 'react';
import { BookOpen, Globe, Languages, Type, Microscope, Monitor, Heart, ChevronRight, Users, Sparkles, Building2 } from 'lucide-react';

const Departments = () => {
  const [activeDept, setActiveDept] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resolveIcon = (iconVal) => {
    if (!iconVal || typeof iconVal !== 'string') return <BookOpen className="w-8 h-8" />;
    const key = iconVal.replace(/[^a-zA-Z]/g, '').toLowerCase();
    switch (key) {
      case 'bookopen':
      case 'book':
        return <BookOpen className="w-8 h-8" />;
      case 'globe':
        return <Globe className="w-8 h-8" />;
      case 'languages':
        return <Languages className="w-8 h-8" />;
      case 'type':
        return <Type className="w-8 h-8" />;
      case 'microscope':
        return <Microscope className="w-8 h-8" />;
      case 'monitor':
        return <Monitor className="w-8 h-8" />;
      case 'heart':
        return <Heart className="w-8 h-8" />;
      default:
        return <BookOpen className="w-8 h-8" />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/departments`);
        if (!res.ok) throw new Error('Failed to fetch departments');
        const result = await res.json();

        const docs = result?.docs || [];

        const depts = docs
          .slice()
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
          .map((c) => ({
            id: c.id ?? c._id,
            name: c.name || c.title || 'Department',
            icon: resolveIcon(typeof c.icon === 'string' ? c.icon : (c.icon?.name || '')),
            teachers: c['No of Faculty'] || (Array.isArray(c.staff) ? c.staff.length : 0),
            description: c.description || '',
            image: c.image?.url || null,
            staffImage: (c['staff image'] && c['staff image'].url) || null,
            teachersList: Array.isArray(c.staff)
              ? c.staff.map((s) => ({
                  name: s.Name || s.name || 'Staff',
                  photo:
                    (s.Photo && s.Photo.url) || (s.photo && s.photo.url) || (s.image && s.image.url) ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(s.Name || s.name || 'Staff')}&background=123C73&color=fff`,
                  position: s.Position || s.position || '',
                  }))
              : [],
          }));
          
        setDepartments(depts);
        setLoading(false);
        setActiveDept(0);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] py-16 lg:py-24 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 border-2 border-white/5 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 border-2 border-[#F4C430]/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#F4C430]/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Building2 className="w-4 h-4 text-[#F4C430] mr-2" />
              <span className="text-[#F4C430] font-semibold text-sm tracking-wider uppercase">
                Academic Departments
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-[#F4C430] via-[#FFD95A] to-[#F4C430] bg-clip-text text-transparent">
                Departments
              </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
              Excellence in education through specialized departments
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block lg:w-80 space-y-3">
            <h2 className="text-2xl font-bold text-[#1B1F24] mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-[#F4C430]" />
              Departments
            </h2>
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-white rounded-2xl shadow-sm animate-pulse border border-[#123C73]/5" />
                ))}
              </div>
            ) : (
              departments.map((dept, index) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(index)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                    activeDept === index
                      ? 'bg-[#123C73] text-white shadow-xl shadow-[#123C73]/20 scale-105'
                      : 'bg-white text-[#667085] hover:bg-[#F7F9FC] shadow-md border border-[#123C73]/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${activeDept === index ? 'bg-white/20' : 'bg-[#123C73]/5'}`}>
                        {React.cloneElement(dept.icon, {
                          className: `w-6 h-6 ${activeDept === index ? 'text-[#F4C430]' : 'text-[#123C73]'}`
                        })}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{dept.name}</h3>
                        <p className={`text-sm ${activeDept === index ? 'text-white/70' : 'text-[#667085]'}`}>
                          {dept.teachers} Teachers
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${activeDept === index ? 'translate-x-1 text-[#F4C430]' : ''}`} />
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Mobile Horizontal Scroll Navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-48 h-20 bg-white rounded-2xl shadow-sm animate-pulse border border-[#123C73]/5" />
                ))
              ) : (
                departments.map((dept, index) => (
                  <button
                    key={dept.id}
                    onClick={() => setActiveDept(index)}
                    className={`flex-shrink-0 snap-start p-4 rounded-2xl transition-all duration-300 w-48 ${
                      activeDept === index
                        ? 'bg-[#123C73] text-white shadow-lg scale-105'
                        : 'bg-white text-[#667085] shadow-md border border-[#123C73]/5'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className={`p-3 rounded-xl ${activeDept === index ? 'bg-white/20' : 'bg-[#123C73]/5'}`}>
                        {React.cloneElement(dept.icon, {
                          className: `w-6 h-6 ${activeDept === index ? 'text-[#F4C430]' : 'text-[#123C73]'}`
                        })}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{dept.name}</h3>
                        <p className={`text-xs mt-1 ${activeDept === index ? 'text-white/70' : 'text-[#667085]'}`}>
                          {dept.teachers} Teachers
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 overflow-hidden">
              {/* Department Image Header */}
              {loading ? (
                <div className="h-80 bg-[#E8EDF5] animate-pulse rounded-t-3xl" />
              ) : departments.length === 0 ? (
                <div className="h-80 bg-[#F7F9FC] flex items-center justify-center rounded-t-3xl">
                  <div className="text-center">
                    <Building2 className="w-16 h-16 text-[#667085]/30 mx-auto mb-4" />
                    <p className="text-[#667085] text-lg">No departments available</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative min-h-80 max-h-[600px] overflow-hidden rounded-t-3xl">
                    <img
                      src={departments[activeDept]?.image || '/placeholder-dept.jpg'}
                      alt={departments[activeDept]?.name}
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#123C73]/80 via-[#123C73]/30 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-[#F4C430] rounded-2xl shadow-lg">
                          {React.cloneElement(departments[activeDept].icon, {
                            className: 'w-8 h-8 text-[#123C73]'
                          })}
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-4xl font-bold text-white">{departments[activeDept].name}</h2>
                          <p className="text-white/80 text-lg">Department</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 lg:p-10">
                    {/* Description */}
                    <div className="mb-10">
                      <h3 className="text-2xl font-bold text-[#1B1F24] mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#F4C430]/10 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-[#123C73]" />
                        </div>
                        About the Department
                      </h3>
                      <div className="relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#123C73] to-[#F4C430] rounded-full opacity-20"></div>
                        <p className="text-[#667085] leading-relaxed text-lg pl-6">
                          {departments[activeDept].description}
                        </p>
                      </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                      <div className="bg-gradient-to-br from-[#123C73] to-[#0A2348] text-white p-6 lg:p-8 rounded-2xl shadow-lg shadow-[#123C73]/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-[#F4C430] rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-[#123C73]" />
                          </div>
                          <span className="text-sm font-medium text-white/80">Faculty Members</span>
                        </div>
                        <p className="text-4xl md:text-5xl font-extrabold">{departments[activeDept].teachers}</p>
                      </div>
                    </div>

                    {/* Staff Group Photo Section */}
                    {departments[activeDept].staffImage && (
                      <div className="mb-10">
                        <h3 className="text-2xl font-bold text-[#1B1F24] mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#F4C430]/10 rounded-xl flex items-center justify-center">
                            <Users className="w-4 h-4 text-[#123C73]" />
                          </div>
                          Our Team
                        </h3>
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-[#123C73]/5">
                          <img
                            src={departments[activeDept].staffImage}
                            alt={`${departments[activeDept].name} staff`}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Teachers Section */}
                    <div>
                      <h3 className="text-2xl font-bold text-[#1B1F24] mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#F4C430]/10 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-[#123C73]" />
                        </div>
                        Meet Our Faculty
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {departments[activeDept].teachersList.map((teacher, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-[#F7F9FC] rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-[#123C73]/5 group"
                          >
                            <div className="relative">
                              <img
                                src={teacher.photo}
                                alt={teacher.name}
                                className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#F4C430] rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                              <h4 className="font-bold text-[#1B1F24] group-hover:text-[#123C73] transition-colors duration-300">
                                {teacher.name}
                              </h4>
                              <p className="text-[#667085] text-sm">{teacher.position}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;