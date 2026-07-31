import { Home, BookOpen, Users, Phone } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      {/* Main Content Container */}
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <div 
          className="text-8xl md:text-9xl font-bold mb-4"
          style={{ color: '#0D47A1' }}
        >
          404
        </div>
        
        {/* Error Message */}
        <h1 
          className="text-2xl md:text-3xl font-semibold mb-4"
          style={{ color: '#212121' }}
        >
          Page Not Found
        </h1>
        
        <p 
          className="text-lg mb-8 leading-relaxed"
          style={{ color: '#6E6E6E' }}
        >
          Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you may have typed the wrong URL.
        </p>
        
        {/* School Branding */}
        <div className="mb-8">
          <h2 
            className="text-xl font-semibold mb-2"
            style={{ color: '#0D47A1' }}
          >
            Sree Budha Central High School
          </h2>
          <p 
            className="text-sm"
            style={{ color: '#6E6E6E' }}
          >
            Excellence in Education
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button 
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 hover:opacity-90"
            style={{ 
              backgroundColor: '#0D47A1', 
              color: '#FFFFFF' 
            }}
            onClick={() => window.location.href = '/'}
          >
            <Home size={20} />
            Go Home
          </button>
          
          <button 
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border-2 transition-colors duration-200 hover:opacity-80"
            style={{ 
              borderColor: '#0D47A1', 
              color: '#0D47A1',
              backgroundColor: 'transparent'
            }}
            onClick={() => window.history.back()}
          >
            ← Go Back
          </button>
        </div>
        
      </div>
      
      {/* Footer */}
      <div className="mt-12 text-center">
        <p 
          className="text-sm"
          style={{ color: '#6E6E6E' }}
        >
          © 2024 Sree Budha Central High School, Kerala. All rights reserved.
        </p>
      </div>
    </div>
  );
}