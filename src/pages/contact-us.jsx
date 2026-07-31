import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// Skeleton Loader Component
const FormSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      {/* Header Skeleton */}
      <div className="text-center mb-8 md:mb-12">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
        <div className="h-5 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
      </div>

      {/* Form Container Skeleton */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-center gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Left Side - Input Fields Skeleton */}
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-full lg:w-[550px] h-16 md:h-20 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>

          {/* Right Side - Textarea Skeleton */}
          <div className="w-full lg:w-auto">
            <div className="w-full lg:w-[550px] h-48 md:h-64 lg:h-72 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 md:mb-12">
          <div className="px-6 py-3 h-12 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="px-6 py-3 h-12 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Map Skeleton */}
        <div className="flex justify-center">
          <div className="rounded-lg w-full max-w-4xl h-48 md:h-60 lg:h-72 bg-gray-200 animate-pulse"></div>
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
  const [isLoading, setIsLoading] = useState(true); // For initial loading state

  // Simulate initial loading
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
  };

  const handleSubmit = async () => {
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
        toast.success("Message submitted successfully! 🎉");
        console.log("Created Contact:", result);
        handleClear();
      } else {
        toast.error(result.errors?.[0]?.message || "Failed to submit message.");
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show skeleton while loading
  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
          Contact Us
        </h2>
        <p className="text-base md:text-lg text-light-dark">
          We make your child happy day after day
        </p>
      </div>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-center gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Left Side - Input Fields */}
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <input
              type="text"
              name="studentName"
              placeholder="Name of the Student"
              value={formData.studentName}
              onChange={handleChange}
              className="px-4 py-3 text-base rounded-lg focus:outline-none focus:border-primary border-2 border-light-dark text-dark w-full lg:w-[550px] h-16 md:h-20"
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail ID"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-3 text-base rounded-lg focus:outline-none focus:border-primary border-2 border-light-dark text-dark w-full lg:w-[550px] h-16 md:h-20"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="px-4 py-3 text-base rounded-lg focus:outline-none focus:border-primary border-2 border-light-dark text-dark w-full lg:w-[550px] h-16 md:h-20"
            />
          </div>

          {/* Right Side - Textarea */}
          <div className="w-full lg:w-auto">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="px-4 py-3 text-base rounded-lg focus:outline-none focus:border-primary border-2 border-light-dark text-dark w-full lg:w-[550px] h-48 md:h-64 lg:h-72"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 md:mb-12">
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 text-base rounded-lg border-2 border-light-dark text-light-dark hover:bg-neutral transition-colors"
          >
            Clear form
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 text-base rounded-lg text-white bg-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit form"}
          </button>
        </div>

        {/* Map */}
        <div className="flex justify-center">
          <iframe
            className="rounded-lg w-full max-w-4xl h-48 md:h-60 lg:h-72"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15349.119451110402!2d76.555631!3d9.074611!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b060486d944e3ef%3A0x1fc0ffd45235fe05!2zU3JlZSBCdWRkaGEgQ2VudHJhbCBTY2hvb2wg4LS24LWN4LSw4LWAIOC0rOC1geC0puC1jeC0pyDgtLjgtYbgtbvgtJ_gtY3gtLDgtb0g4LS44LWN4LSV4LWC4LW-!5e1!3m2!1sen!2sin!4v1757143485544!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}