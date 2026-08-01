import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Send, RotateCcw, User, Mail, Phone, MapPin, GraduationCap, Users, FileText } from 'lucide-react';

// Simple Skeleton component
const Skeleton = ({ height = "h-16", width = "w-full", className = "" }) => (
  <div className={`${height} ${width} ${className} bg-[#E8EDF5] rounded-xl animate-pulse`}></div>
);

// Input Skeleton
const InputSkeleton = () => (
  <div className="space-y-2">
    <Skeleton height="h-14 sm:h-16" />
  </div>
);

// Textarea Skeleton
const TextareaSkeleton = ({ rows = 3 }) => (
  <Skeleton height={rows === 3 ? "h-24" : "h-32"} />
);

// Button Skeleton
const ButtonSkeleton = () => (
  <Skeleton height="h-12" width="w-full sm:w-auto" className="sm:w-40" />
);

export default function AdmissionForm() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    studentName: '',
    classAdmission: '',
    gender: '',
    dateOfBirth: '',
    ageOn31stMarch: '',
    email: '',
    presentAddress: '',
    permanentAddress: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    contactNo: '',
    schoolPreviouslyAttended: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API endpoint from environment variable
  const API_URL = process.env.NEXT_PUBLIC_CMS_URL ? 
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/admissions` : 
    'http://localhost:3000/api/admissions';

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Generate dynamic academic year
  const getCurrentAcademicYear = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear} - ${currentYear + 1}`;
  };

  // Class options for dropdown
  const classOptions = [
    'KG Section',
    'Class I',
    'Class II', 
    'Class III',
    'Class IV',
    'Class V',
    'Class VI',
    'Class VII',
    'Class VIII',
    'Class IX',
    'Class X',
    'Class XI',
    'Class XII'
  ];

  // Sanitization functions
  const sanitizeText = (text) => {
    return text.trim().replace(/[<>\"']/g, '');
  };

  const sanitizeEmail = (email) => {
    return email.trim().toLowerCase().replace(/[<>\"']/g, '');
  };

  const sanitizePhone = (phone) => {
    return phone.replace(/[^0-9+\-\s()]/g, '');
  };

  const sanitizeNumber = (number) => {
    return number.replace(/[^0-9]/g, '');
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
  };

  const validateAge = (age) => {
    const numAge = parseInt(age);
    return numAge >= 1 && numAge <= 25;
  };

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - 25, 0, 1);
    const maxDate = new Date(currentDate.getFullYear() - 1, 11, 31);
    return selectedDate >= minDate && selectedDate <= maxDate;
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'studentName':
        if (!value.trim()) {
          error = 'Student name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s.]+$/.test(value.trim())) {
          error = 'Name can only contain letters, spaces, and periods';
        }
        break;

      case 'classAdmission':
        if (!value.trim()) {
          error = 'Class admission is required';
        }
        break;

      case 'gender':
        if (!value) {
          error = 'Gender selection is required';
        }
        break;

      case 'dateOfBirth':
        if (!value) {
          error = 'Date of birth is required';
        } else if (!validateDate(value)) {
          error = 'Please enter a valid date of birth';
        }
        break;

      case 'ageOn31stMarch':
        if (value && !validateAge(value)) {
          error = 'Age must be between 1 and 25';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'presentAddress':
        if (!value.trim()) {
          error = 'Present address is required';
        } else if (value.trim().length < 10) {
          error = 'Address must be at least 10 characters';
        }
        break;

      case 'contactNo':
        if (!value.trim()) {
          error = 'Contact number is required';
        } else if (!validatePhone(value)) {
          error = 'Please enter a valid 10-digit phone number';
        }
        break;

      case 'fatherName':
        if (value.trim() && !/^[a-zA-Z\s.]+$/.test(value.trim())) {
          error = 'Name can only contain letters, spaces, and periods';
        }
        break;

      case 'fatherOccupation':
        if (value.trim() && !/^[a-zA-Z\s.]+$/.test(value.trim())) {
          error = 'Occupation can only contain letters, spaces, and periods';
        }
        break;

      case 'motherName':
        if (value.trim() && !/^[a-zA-Z\s.]+$/.test(value.trim())) {
          error = 'Name can only contain letters, spaces, and periods';
        }
        break;

      case 'motherOccupation':
        if (value.trim() && !/^[a-zA-Z\s.]+$/.test(value.trim())) {
          error = 'Occupation can only contain letters, spaces, and periods';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    switch (name) {
      case 'studentName':
      case 'fatherName':
      case 'motherName':
      case 'schoolPreviouslyAttended':
        sanitizedValue = sanitizeText(value);
        break;
      case 'email':
        sanitizedValue = sanitizeEmail(value);
        break;
      case 'contactNo':
        sanitizedValue = sanitizePhone(value);
        break;
      case 'ageOn31stMarch':
        sanitizedValue = sanitizeNumber(value);
        break;
      case 'presentAddress':
      case 'permanentAddress':
      case 'specialRequests':
        sanitizedValue = value.trim();
        break;
      default:
        sanitizedValue = value;
    }

    setFormData({
      ...formData,
      [name]: sanitizedValue
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    if (error) {
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showPopupMessage = (type, title, message) => {
    if (type === 'success') {
      toast.success(message, {
        style: {
          background: '#123C73',
          color: '#FCFCFD',
          borderRadius: '12px',
        },
        iconTheme: {
          primary: '#F4C430',
          secondary: '#123C73',
        },
      });
    } else if (type === 'error') {
      toast.error(message, {
        style: {
          background: '#FCFCFD',
          color: '#1B1F24',
          borderRadius: '12px',
          border: '1px solid #123C73',
        },
      });
    } else {
      toast(message, {
        style: {
          background: '#F7F9FC',
          color: '#1B1F24',
          borderRadius: '12px',
        },
      });
    }
  };

  const handleClearForm = () => {
    setFormData({
      studentName: '',
      classAdmission: '',
      gender: '',
      dateOfBirth: '',
      ageOn31stMarch: '',
      email: '',
      presentAddress: '',
      permanentAddress: '',
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      contactNo: '',
      schoolPreviouslyAttended: '',
      specialRequests: ''
    });
    setErrors({});
    showPopupMessage('info', 'Form Cleared', 'All form fields have been cleared successfully.');
  };

  const formatDateForPayload = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showPopupMessage('error', 'Validation Error', 'Please correct the errors in the form before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        dateOfBirth: formatDateForPayload(formData.dateOfBirth),
        ageOn31stMarch: formData.ageOn31stMarch ? parseInt(formData.ageOn31stMarch) : undefined,
      };

      Object.keys(submissionData).forEach(key => {
        if (submissionData[key] === '' || submissionData[key] === undefined) {
          delete submissionData[key];
        }
      });

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      showPopupMessage('success', 'Success!', 'Your admission application has been submitted successfully. We will contact you soon.');
      handleClearForm();
    } catch (error) {
      console.error('Submission error:', error);
      
      let errorMessage = 'Unable to submit the form. Please try again later.';
      
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
      } else if (error.message.includes('HTTP error')) {
        errorMessage = 'Server error occurred. Please try again later.';
      }
      
      showPopupMessage('error', 'Submission Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full h-14 sm:h-16 px-4 bg-[#FCFCFD] border-2 border-[#123C73]/10 rounded-2xl focus:outline-none focus:border-[#123C73] focus:ring-4 focus:ring-[#123C73]/5 placeholder-[#667085] text-[#1B1F24] text-sm sm:text-base transition-all duration-300";
  const errorInputClasses = "w-full h-14 sm:h-16 px-4 bg-[#FCFCFD] border-2 border-red-300 rounded-2xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50 placeholder-[#667085] text-[#1B1F24] text-sm sm:text-base transition-all duration-300";

  const getInputClasses = (fieldName) => {
    return errors[fieldName] ? errorInputClasses : inputClasses;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-6 sm:p-10">
            {/* Header Skeleton */}
            <div className="text-center mb-8 sm:mb-12">
              <Skeleton height="h-10" width="w-96" className="mx-auto mb-3" />
              <Skeleton height="h-5" width="w-72" className="mx-auto" />
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Section Title Skeletons */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton height="h-7" width="w-48" />
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <InputSkeleton />
                    <InputSkeleton />
                    <InputSkeleton />
                  </div>
                </div>
              ))}

              {/* Buttons Skeleton */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 border-t border-[#123C73]/10">
                <ButtonSkeleton />
                <ButtonSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-8 sm:py-12 px-4">
      <Toaster position="top-right" />

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <div className="relative bg-gradient-to-br from-[#123C73] to-[#0A2348] rounded-3xl p-8 sm:p-12 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C430]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <GraduationCap className="w-5 h-5 text-[#F4C430] mr-2" />
              <span className="text-[#F4C430] font-semibold text-sm tracking-wider uppercase">
                Admissions {getCurrentAcademicYear()}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Admission Registration Form
            </h1>
            <p className="text-lg text-white/80 font-light">
              Begin your child's journey towards excellence
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-6 sm:p-10">
          <div className="space-y-8 sm:space-y-10">
            {/* Student Information */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-[#123C73]/10">
                <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-[#123C73]" />
                </div>
                <h2 className="text-xl font-bold text-[#1B1F24]">Student Information</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <input
                    type="text"
                    name="studentName"
                    placeholder="Name of the Student *"
                    value={formData.studentName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses('studentName')}
                    required
                  />
                  {errors.studentName && <p className="mt-2 text-sm text-red-500 ml-2">{errors.studentName}</p>}
                </div>
                <div>
                  <select
                    name="classAdmission"
                    value={formData.classAdmission}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses('classAdmission')}
                    required
                  >
                    <option value="">Class for Admission *</option>
                    {classOptions.map((classOption, index) => (
                      <option key={index} value={classOption}>
                        {classOption}
                      </option>
                    ))}
                  </select>
                  {errors.classAdmission && <p className="mt-2 text-sm text-red-500 ml-2">{errors.classAdmission}</p>}
                </div>
                <div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses('gender')}
                    required
                  >
                    <option value="">Select Gender *</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-2 text-sm text-red-500 ml-2">{errors.gender}</p>}
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-[#123C73]/10">
                <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#123C73]" />
                </div>
                <h2 className="text-xl font-bold text-[#1B1F24]">Personal Details</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses('dateOfBirth')}
                    required
                  />
                  {errors.dateOfBirth && <p className="mt-2 text-sm text-red-500 ml-2">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <input
                    type="number"
                    name="ageOn31stMarch"
                    placeholder={`Age on 31st March ${currentYear}`}
                    min="1"
                    max="25"
                    value={formData.ageOn31stMarch}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses('ageOn31stMarch')}
                  />
                  {errors.ageOn31stMarch && <p className="mt-2 text-sm text-red-500 ml-2">{errors.ageOn31stMarch}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail ID *"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses('email')}
                    required
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-500 ml-2">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-[#123C73]/10">
                <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#123C73]" />
                </div>
                <h2 className="text-xl font-bold text-[#1B1F24]">Address Information</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <textarea
                    name="presentAddress"
                    placeholder="Present Address *"
                    value={formData.presentAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                    className={`w-full px-4 py-3 bg-[#FCFCFD] border-2 ${errors.presentAddress ? 'border-red-300 focus:border-red-500 focus:ring-red-50' : 'border-[#123C73]/10 focus:border-[#123C73] focus:ring-[#123C73]/5'} rounded-2xl focus:outline-none focus:ring-4 placeholder-[#667085] text-[#1B1F24] resize-none text-sm sm:text-base transition-all duration-300`}
                  />
                  {errors.presentAddress && <p className="mt-2 text-sm text-red-500 ml-2">{errors.presentAddress}</p>}
                </div>
                <div>
                  <textarea
                    name="permanentAddress"
                    placeholder="Permanent Address (if different)"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#FCFCFD] border-2 border-[#123C73]/10 rounded-2xl focus:outline-none focus:border-[#123C73] focus:ring-4 focus:ring-[#123C73]/5 placeholder-[#667085] text-[#1B1F24] resize-none text-sm sm:text-base transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-[#123C73]/10">
                <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#123C73]" />
                </div>
                <h2 className="text-xl font-bold text-[#1B1F24]">Contact Information</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    name="contactNo"
                    placeholder="Contact Number *"
                    value={formData.contactNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClasses('contactNo')}
                    required
                  />
                  {errors.contactNo && <p className="mt-2 text-sm text-red-500 ml-2">{errors.contactNo}</p>}
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-[#123C73]/10">
                <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#123C73]" />
                </div>
                <h2 className="text-xl font-bold text-[#1B1F24]">Parent Information</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Father's Details */}
                <div className="bg-[#F7F9FC] rounded-2xl p-5 sm:p-6 space-y-4">
                  <h3 className="font-semibold text-[#123C73] flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F4C430] rounded-full"></div>
                    Father's Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="fatherName"
                        placeholder="Father's Name"
                        value={formData.fatherName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses('fatherName')}
                      />
                      {errors.fatherName && <p className="mt-2 text-sm text-red-500 ml-2">{errors.fatherName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="fatherOccupation"
                        placeholder="Father's Occupation"
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses('fatherOccupation')}
                      />
                      {errors.fatherOccupation && <p className="mt-2 text-sm text-red-500 ml-2">{errors.fatherOccupation}</p>}
                    </div>
                  </div>
                </div>

                {/* Mother's Details */}
                <div className="bg-[#F7F9FC] rounded-2xl p-5 sm:p-6 space-y-4">
                  <h3 className="font-semibold text-[#123C73] flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F4C430] rounded-full"></div>
                    Mother's Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="motherName"
                        placeholder="Mother's Name"
                        value={formData.motherName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses('motherName')}
                      />
                      {errors.motherName && <p className="mt-2 text-sm text-red-500 ml-2">{errors.motherName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="motherOccupation"
                        placeholder="Mother's Occupation"
                        value={formData.motherOccupation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses('motherOccupation')}
                      />
                      {errors.motherOccupation && <p className="mt-2 text-sm text-red-500 ml-2">{errors.motherOccupation}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-[#123C73]/10">
                <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#123C73]" />
                </div>
                <h2 className="text-xl font-bold text-[#1B1F24]">Additional Information</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <input
                    type="text"
                    name="schoolPreviouslyAttended"
                    placeholder="School previously attended"
                    value={formData.schoolPreviouslyAttended}
                    onChange={handleChange}
                    className="w-full h-14 sm:h-16 px-4 bg-[#FCFCFD] border-2 border-[#123C73]/10 rounded-2xl focus:outline-none focus:border-[#123C73] focus:ring-4 focus:ring-[#123C73]/5 placeholder-[#667085] text-[#1B1F24] text-sm sm:text-base transition-all duration-300"
                  />
                </div>
                <div>
                  <textarea
                    name="specialRequests"
                    placeholder="Special requests if any"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#FCFCFD] border-2 border-[#123C73]/10 rounded-2xl focus:outline-none focus:border-[#123C73] focus:ring-4 focus:ring-[#123C73]/5 placeholder-[#667085] text-[#1B1F24] resize-none text-sm sm:text-base transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-8 border-t-2 border-[#123C73]/10">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={handleClearForm}
                  className="group w-full sm:w-auto px-8 py-4 border-2 border-[#123C73] text-[#123C73] font-semibold rounded-2xl hover:bg-[#123C73] hover:text-white transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  Clear Form
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="group w-full sm:w-auto px-8 py-4 bg-[#F4C430] hover:bg-[#FFD95A] text-[#123C73] font-bold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#F4C430]/20 hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#123C73] border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-[#667085] text-sm mt-6">
                Fields marked with <span className="text-[#123C73] font-semibold">*</span> are required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}