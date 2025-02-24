"use client";

import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to Dr Chan Family Clinic
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your trusted healthcare partner providing comprehensive medical services in Singapore
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Book Appointment
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                Our Services
              </button>
            </div>
            
            {/* Clinic Features */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                "Experienced Doctors",
                "Multiple Locations",
                "Same Day Appointments",
                "Comprehensive Care"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-[400px]">
            <Image 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
              alt="Modern clinic interior"
              fill
              className="rounded-lg shadow-xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
} 