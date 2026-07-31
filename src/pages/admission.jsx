import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

// Simple Skeleton component
const Skeleton = ({ height = "h-16", width = "w-full", className = "" }) => (
  <div className={`${height} ${width} ${className} bg-gray-200 rounded-md animate-pulse`}></div>
);

// Input Skeleton
const InputSkeleton = () => (
  <div className="space-y-1">
    <Skeleton height="h-16 sm:h-20" />
  </div>
);

// Textarea Skeleton
const TextareaSkeleton = ({ rows = 3 }) => (
  <Skeleton height={rows === 3 ? "h-24" : "h-32"} />
);

// Button Skeleton
const ButtonSkeleton = () => (
  <Skeleton height="h-12" width="w-full sm:w-auto" className="sm:w-32" />
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

    // Apply appropriate sanitization based on field type
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

    // Clear error for this field when user starts typing
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
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message);
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

  // Format date for Payload CMS (YYYY-MM-DD format)
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
      // Prepare data for API submission
      const submissionData = {
        ...formData,
        dateOfBirth: formatDateForPayload(formData.dateOfBirth),
        // Convert age to number if it exists
        ageOn31stMarch: formData.ageOn31stMarch ? parseInt(formData.ageOn31stMarch) : undefined,
      };

      // Remove empty fields to avoid validation issues
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

  // Updated input classes with theme colors
  const inputClasses = "w-full h-16 sm:h-20 px-4 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:border-transparent placeholder-light-dark text-dark text-sm sm:text-base";
  const errorInputClasses = "w-full h-16 sm:h-20 px-4 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent placeholder-light-dark text-dark text-sm sm:text-base";

  const getInputClasses = (fieldName) => {
    return errors[fieldName] ? errorInputClasses : inputClasses;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral py-4 sm:py-8 px-4">
        <div className="max-w-7xl mx-auto bg-accent rounded-lg p-4 sm:p-8 shadow-sm">
          {/* Header Skeleton */}
          <div className="text-center mb-6 sm:mb-8">
            <Skeleton height="h-8" width="w-80" className="mx-auto mb-2" />
            <Skeleton height="h-4" width="w-64" className="mx-auto" />
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Student Information Row Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <InputSkeleton />
              <InputSkeleton />
              <InputSkeleton />
            </div>

            {/* Personal Details Row Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <InputSkeleton />
              <InputSkeleton />
              <InputSkeleton />
            </div>

            {/* Address Row Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TextareaSkeleton />
              <TextareaSkeleton />
            </div>

            {/* Contact Information Row Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <InputSkeleton />
              <InputSkeleton />
              <InputSkeleton />
            </div>

            {/* Parent Information Skeleton - Balanced Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Skeleton height="h-8" width="w-40" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputSkeleton />
                  <InputSkeleton />
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton height="h-8" width="w-40" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputSkeleton />
                  <InputSkeleton />
                </div>
              </div>
            </div>

            {/* Additional Information Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InputSkeleton />
              <TextareaSkeleton rows={4} />
            </div>

            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
              <ButtonSkeleton />
              <ButtonSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral py-4 sm:py-8 px-4">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto bg-accent rounded-lg p-4 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            ADMISSION REGISTRATION FORM
          </h1>
          <p className="text-light-dark text-xs sm:text-sm mt-2">We make your child happy day after day</p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Student Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary border-b pb-2">Student Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  name="studentName"
                  placeholder="Name of the Student *"
                  value={formData.studentName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses('studentName')}
                  style={{ '--tw-ring-color': errors.studentName ? '#ef4444' : '#0D47A1' }}
                  required
                />
                {errors.studentName && <p className="mt-1 text-sm text-red-600">{errors.studentName}</p>}
              </div>
              <div>
                <select
                  name="classAdmission"
                  value={formData.classAdmission}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses('classAdmission')}
                  style={{ '--tw-ring-color': errors.classAdmission ? '#ef4444' : '#0D47A1' }}
                  required
                >
                  <option value="">Class to which admission is sought ({getCurrentAcademicYear()}) *</option>
                  {classOptions.map((classOption, index) => (
                    <option key={index} value={classOption}>
                      {classOption}
                    </option>
                  ))}
                </select>
                {errors.classAdmission && <p className="mt-1 text-sm text-red-600">{errors.classAdmission}</p>}
              </div>
              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses('gender')}
                  style={{ '--tw-ring-color': errors.gender ? '#ef4444' : '#0D47A1' }}
                  required
                >
                  <option value="">Select Gender *</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary border-b pb-2">Personal Details</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth *"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses('dateOfBirth')}
                  style={{ '--tw-ring-color': errors.dateOfBirth ? '#ef4444' : '#0D47A1' }}
                  required
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
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
                  style={{ '--tw-ring-color': errors.ageOn31stMarch ? '#ef4444' : '#0D47A1' }}
                />
                {errors.ageOn31stMarch && <p className="mt-1 text-sm text-red-600">{errors.ageOn31stMarch}</p>}
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
                  style={{ '--tw-ring-color': errors.email ? '#ef4444' : '#0D47A1' }}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary border-b pb-2">Address Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <textarea
                  name="presentAddress"
                  placeholder="Present Address *"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={3}
                  className={`w-full px-4 py-3 border ${errors.presentAddress ? 'border-red-300' : 'border-neutral'} rounded-md focus:outline-none focus:ring-2 focus:border-transparent placeholder-light-dark text-dark resize-none text-sm sm:text-base`}
                  style={{ '--tw-ring-color': errors.presentAddress ? '#ef4444' : '#0D47A1' }}
                />
                {errors.presentAddress && <p className="mt-1 text-sm text-red-600">{errors.presentAddress}</p>}
              </div>
              <div>
                <textarea
                  name="permanentAddress"
                  placeholder="Permanent Address (if different from present address)"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:border-transparent placeholder-light-dark text-dark resize-none text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#0D47A1' }}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary border-b pb-2">Contact Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="contactNo"
                  placeholder="Contact Number *"
                  value={formData.contactNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses('contactNo')}
                  style={{ '--tw-ring-color': errors.contactNo ? '#ef4444' : '#0D47A1' }}
                  required
                />
                {errors.contactNo && <p className="mt-1 text-sm text-red-600">{errors.contactNo}</p>}
              </div>
            </div>
          </div>

          {/* Parent Information - Balanced Layout */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary border-b pb-2">Parent Information</h2>
            
            {/* Father's Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="text-md font-medium text-dark">Father's Details</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="fatherName"
                      placeholder="Father's Name"
                      value={formData.fatherName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClasses('fatherName')}
                      style={{ '--tw-ring-color': errors.fatherName ? '#ef4444' : '#0D47A1' }}
                    />
                    {errors.fatherName && <p className="mt-1 text-sm text-red-600">{errors.fatherName}</p>}
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
                      style={{ '--tw-ring-color': errors.fatherOccupation ? '#ef4444' : '#0D47A1' }}
                    />
                    {errors.fatherOccupation && <p className="mt-1 text-sm text-red-600">{errors.fatherOccupation}</p>}
                  </div>
                </div>
              </div>

              {/* Mother's Information */}
              <div className="space-y-4">
                <h3 className="text-md font-medium text-dark">Mother's Details</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="motherName"
                      placeholder="Mother's Name"
                      value={formData.motherName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClasses('motherName')}
                      style={{ '--tw-ring-color': errors.motherName ? '#ef4444' : '#0D47A1' }}
                    />
                    {errors.motherName && <p className="mt-1 text-sm text-red-600">{errors.motherName}</p>}
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
                      style={{ '--tw-ring-color': errors.motherOccupation ? '#ef4444' : '#0D47A1' }}
                    />
                    {errors.motherOccupation && <p className="mt-1 text-sm text-red-600">{errors.motherOccupation}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary border-b pb-2">Additional Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="schoolPreviouslyAttended"
                  placeholder="School previously attended"
                  value={formData.schoolPreviouslyAttended}
                  onChange={handleChange}
                  className={inputClasses}
                  style={{ '--tw-ring-color': '#0D47A1' }}
                />
              </div>
              <div>
                <textarea
                  name="specialRequests"
                  placeholder="Special requests if any"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:border-transparent placeholder-light-dark text-dark resize-none text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#0D47A1' }}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 sm:pt-8 border-t border-neutral">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={handleClearForm}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-primary text-primary font-medium rounded-md transition duration-200 hover:bg-primary hover:text-accent text-sm sm:text-base"
                disabled={isSubmitting}
              >
                Clear form
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-secondary hover:bg-yellow-600 text-dark font-medium rounded-md transition duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
            <p className="text-center text-light-dark text-xs mt-4">
              Fields marked with * are required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}