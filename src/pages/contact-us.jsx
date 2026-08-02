import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Send, RotateCcw, User, Mail, Phone, MessageSquare, MapPin, Sparkles, ArrowRight } from "lucide-react";

// Skeleton Loader Component
const FormSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] py-8 lg:py-12">
      {/* Header Skeleton */}
      <div className="text-center mb-10 lg:mb-14">
        <div className="h-10 w-40 bg-[#E8EDF5] rounded-full mx-auto mb-4 animate-pulse"></div>
        <div className="h-8 w-48 bg-[#E8EDF5] rounded-xl mx-auto mb-3 animate-pulse"></div>
        <div className="h-5 w-64 bg-[#E8EDF5] rounded-lg mx-auto animate-pulse"></div>
      </div>

      {/* Form Container Skeleton */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-8 mb-8">
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              {[1, 2, 3].map((item) => (
                <div key={item} className="w-full lg:w-[500px] h-14 lg:h-16 bg-[#E8EDF5] rounded-2xl animate-pulse"></div>
              ))}
            </div>
            <div className="w-full lg:w-auto">
              <div className="w-full lg:w-[500px] h-48 lg:h-full bg-[#E8EDF5] rounded-2xl animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <div className="h-12 w-36 bg-[#E8EDF5] rounded-xl animate-pulse"></div>
            <div className="h-12 w-36 bg-[#E8EDF5] rounded-xl animate-pulse"></div>
          </div>
          <div className="h-64 lg:h-72 bg-[#E8EDF5] rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      studentName: "",
      email: "",
      phone: "",
      message: "",
    });
    toast.success("Form cleared successfully!", {
      style: { background: '#F7F9FC', color: '#1B1F24', borderRadius: '12px' },
    });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.studentName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields before submitting.", {
        style: { background: '#FCFCFD', color: '#1B1F24', borderRadius: '12px', border: '1px solid #123C73' },
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Message submitted successfully! 🎉", {
          style: { background: '#123C73', color: '#FCFCFD', borderRadius: '12px' },
          iconTheme: { primary: '#F4C430', secondary: '#123C73' },
        });
        console.log("Created Contact:", result);
        handleClear();
      } else {
        toast.error(result.errors?.[0]?.message || "Failed to submit message.", {
          style: { background: '#FCFCFD', color: '#1B1F24', borderRadius: '12px', border: '1px solid #123C73' },
        });
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.", {
        style: { background: '#FCFCFD', color: '#1B1F24', borderRadius: '12px', border: '1px solid #123C73' },
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <FormSkeleton />;
  }

  const inputClasses = "w-full h-14 lg:h-16 px-5 bg-[#FCFCFD] border-2 border-[#123C73]/10 rounded-2xl focus:outline-none focus:border-[#123C73] focus:ring-4 focus:ring-[#123C73]/5 placeholder-[#667085] text-[#1B1F24] text-sm lg:text-base transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-8 lg:py-12">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="text-center mb-10 lg:mb-14 px-4">
        <div className="inline-flex items-center px-5 py-2.5 bg-[#123C73]/5 rounded-full border border-[#123C73]/10 mb-6">
          <MessageSquare className="w-4 h-4 text-[#F4C430] mr-2" />
          <span className="text-[#123C73] font-semibold text-sm tracking-wider uppercase">
            Get in Touch
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1F24] mb-6 leading-tight">
          Contact{" "}
          <span className="bg-gradient-to-r from-[#123C73] to-[#0A2348] bg-clip-text text-transparent">
            Us
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-[#667085] max-w-2xl mx-auto leading-relaxed font-light">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="h-px w-12 bg-[#F4C430]/30"></div>
          <div className="w-2 h-2 bg-[#F4C430] rounded-full rotate-45"></div>
          <div className="h-px w-12 bg-[#F4C430]/30"></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-[#123C73]/5 p-6 lg:p-10">
          {/* Form Fields */}
          <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-8 mb-8 lg:mb-10">
            {/* Left Side - Input Fields */}
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              <div>
                <label className="block text-sm font-semibold text-[#1B1F24] mb-2 ml-1">Student Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <User className="w-5 h-5 text-[#667085]" />
                  </div>
                  <input
                    type="text"
                    name="studentName"
                    placeholder="Enter student name"
                    value={formData.studentName}
                    onChange={handleChange}
                    className={`${inputClasses} pl-12`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1B1F24] mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-[#667085]" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputClasses} pl-12`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1B1F24] mb-2 ml-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Phone className="w-5 h-5 text-[#667085]" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${inputClasses} pl-12`}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Textarea */}
            <div className="w-full lg:w-auto">
              <label className="block text-sm font-semibold text-[#1B1F24] mb-2 ml-1">Your Message</label>
              <div className="relative h-full">
                <div className="absolute left-4 top-4">
                  <MessageSquare className="w-5 h-5 text-[#667085]" />
                </div>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full lg:w-[500px] h-48 lg:h-full px-5 pl-12 py-4 bg-[#FCFCFD] border-2 border-[#123C73]/10 rounded-2xl focus:outline-none focus:border-[#123C73] focus:ring-4 focus:ring-[#123C73]/5 placeholder-[#667085] text-[#1B1F24] text-sm lg:text-base resize-none transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 lg:mb-12">
            <button
              type="button"
              onClick={handleClear}
              className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#123C73]/20 text-[#123C73] font-semibold rounded-2xl hover:bg-[#123C73]/5 hover:border-[#123C73] transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Clear Form
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#123C73] text-white font-bold rounded-2xl hover:bg-[#0A2348] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#123C73]/20 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Submit Message
                </>
              )}
            </button>
          </div>

          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10 lg:mb-12">
            <div className="bg-[#F7F9FC] rounded-2xl p-4 text-center hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Phone className="w-5 h-5 text-[#123C73]" />
              </div>
              <p className="text-xs text-[#667085] font-medium mb-1">Phone</p>
              <p className="text-sm font-bold text-[#1B1F24]">8891720292</p>
            </div>
            <div className="bg-[#F7F9FC] rounded-2xl p-4 text-center hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5 text-[#123C73]" />
              </div>
              <p className="text-xs text-[#667085] font-medium mb-1">Email</p>
              <p className="text-sm font-bold text-[#1B1F24] break-all">indianpublicschoolkollam@gmail.com</p>
            </div>
            <div className="bg-[#F7F9FC] rounded-2xl p-4 text-center hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-[#123C73]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-5 h-5 text-[#123C73]" />
              </div>
              <p className="text-xs text-[#667085] font-medium mb-1">Address</p>
              <p className="text-sm font-bold text-[#1B1F24]">Kizhavoor, Mukhathala, Kollam</p>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-[#123C73]/5">
            <iframe
              className="w-full h-64 lg:h-80"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.9573300349207!2d76.63385497501713!3d8.883559391172069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05fccbc9c07255%3A0x8308a0017e958447!2sSree%20Narayana%20Public%20School!5e0!3m2!1sen!2sin!4v1785499995562!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}