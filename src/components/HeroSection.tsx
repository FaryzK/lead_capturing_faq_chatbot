"use client";

import Image from 'next/image';

export default function HeroSection() {
  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[500px]"> {/* Fixed height container */}
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
            alt="Dental Clinic Background"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Banner Content */}
        <div className="relative h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Welcome to Dr Chan Family Clinic
              </h1>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Your trusted healthcare partner providing comprehensive medical services in Singapore
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-12">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                  Book Appointment
                </button>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
                  Our Services
                </button>
              </div>

              {/* Location Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Thomson",
                  "Serangoon",
                  "Bedok",
                  "Jalan Kayu"
                ].map((location, index) => (
                  <div 
                    key={index}
                    className="bg-[#C5E1A5] bg-opacity-90 text-gray-800 px-6 py-2 rounded-full font-medium"
                  >
                    {location}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Separate from Banner */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                text: "Experienced Doctors"
              },
              {
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                text: "Multiple Locations"
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                text: "Same Day Appointments"
              },
              {
                icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
                text: "Comprehensive Care"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-4 rounded-xl flex flex-col items-center text-center hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <svg 
                    className="w-6 h-6 text-green-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 