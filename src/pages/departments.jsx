import React, { useState, useEffect } from 'react';
import { BookOpen, Globe, Languages, Type, Microscope, Monitor, Heart, ChevronRight, Users } from 'lucide-react';

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
            // prefer a group/staff image if provided, otherwise department image
            image: c.image?.url || null,
            staffImage: (c['staff image'] && c['staff image'].url) || null,
            teachersList: Array.isArray(c.staff)
              ? c.staff.map((s) => ({
                  name: s.Name || s.name || 'Staff',
                  photo:
                    (s.Photo && s.Photo.url) || (s.photo && s.photo.url) || (s.image && s.image.url) ||
                    // fallback to generated initial avatar
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(s.Name || s.name || 'Staff')}&background=0D47A1&color=fff`,
                  position: s.Position || s.position || '',
                  }))
              : [],
          }));
          console.log('Fetched Departments:', depts);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0D47A1] to-[#012050] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Departments</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Excellence in education through specialized departments
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block lg:w-80 space-y-3">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Departments</h2>
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-white rounded-xl shadow-sm animate-pulse" />
                ))}
              </div>
            ) : (
              departments.map((dept, index) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeDept === index
                      ? 'bg-[#0D47A1] text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${activeDept === index ? 'bg-white/20' : 'bg-[#0D47A1]/10'}`}>
                        {React.cloneElement(dept.icon, {
                          className: `w-6 h-6 ${activeDept === index ? 'text-white' : 'text-[#0D47A1]'}`
                        })}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{dept.name}</h3>
                        <p className={`text-sm ${activeDept === index ? 'text-gray-200' : 'text-gray-500'}`}>
                          {dept.teachers} Teachers
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${activeDept === index ? 'translate-x-1' : ''}`} />
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
                  <div key={i} className="flex-shrink-0 w-48 h-20 bg-white rounded-xl shadow-sm animate-pulse" />
                ))
              ) : (
                departments.map((dept, index) => (
                  <button
                    key={dept.id}
                    onClick={() => setActiveDept(index)}
                    className={`flex-shrink-0 snap-start p-4 rounded-xl transition-all duration-300 w-48 ${
                      activeDept === index
                        ? 'bg-[#0D47A1] text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className={`p-3 rounded-lg ${activeDept === index ? 'bg-white/20' : 'bg-[#0D47A1]/10'}`}>
                        {React.cloneElement(dept.icon, {
                          className: `w-6 h-6 ${activeDept === index ? 'text-white' : 'text-[#0D47A1]'}`
                        })}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{dept.name}</h3>
                        <p className={`text-xs mt-1 ${activeDept === index ? 'text-gray-200' : 'text-gray-500'}`}>
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
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Department Image Header */}
              {loading ? (
                <div className="h-80 bg-gray-100 animate-pulse rounded-t-xl" />
              ) : departments.length === 0 ? (
                <div className="h-80 bg-gray-50 flex items-center justify-center">No departments available</div>
              ) : (
                <>
                  <div className="relative min-h-80 max-h-[600px] overflow-hidden">
                    <img
                      src={departments[activeDept]?.image || '/placeholder-dept.jpg'}
                      alt={departments[activeDept]?.name}
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-[#FBC02D] rounded-xl">
                          {React.cloneElement(departments[activeDept].icon, {
                            className: 'w-8 h-8 text-[#012050]'
                          })}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-white">{departments[activeDept].name}</h2>
                          <p className="text-gray-200 text-lg">Department</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Description */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">About the Department</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {departments[activeDept].description}
                      </p>
                    </div>

                    {/* Stats Bar (only faculty) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="bg-gradient-to-br from-[#0D47A1] to-[#012050] text-white p-6 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <Users className="w-6 h-6" />
                          <span className="text-sm font-medium opacity-90">Faculty Members</span>
                        </div>
                        <p className="text-4xl font-bold">{departments[activeDept].teachers}</p>
                      </div>
                    </div>

                    {/* Staff Group Photo Section */}
                    {departments[activeDept].staffImage && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Team</h3>
                        <div className="rounded-xl overflow-hidden shadow-lg">
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
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Meet Our Faculty</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {departments[activeDept].teachersList.map((teacher, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-[#0D47A1]/10 hover:to-transparent transition-all border border-gray-100"
                          >
                            <img
                              src={teacher.photo}
                              alt={teacher.name}
                              className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
                            />
                            <div>
                              <h4 className="font-bold text-gray-800 text-lg">{teacher.name}</h4>
                              <p className="text-gray-500 text-sm">{teacher.position}</p>
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