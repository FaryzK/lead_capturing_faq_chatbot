"use client";

import { useEffect, useState } from 'react';
import { CONFIG } from '../config';

interface EmergencyFlowProps {
  onBack: () => void;
}

export default function EmergencyFlow({ onBack }: EmergencyFlowProps) {
  const [isClinicOpen, setIsClinicOpen] = useState(false);

  useEffect(() => {
    const checkClinicHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      // Check if current day is a weekday (Monday-Friday)
      const isWeekday = currentDay >= 1 && currentDay <= 5;
      
      // Check if current time is between 9 AM and 6 PM
      const isDuringHours = currentHour >= 9 && currentHour < 18;
      
      setIsClinicOpen(isWeekday && isDuringHours);
    };

    checkClinicHours();
  }, []);

  return (
    <div className="flex flex-col p-6">
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to menu
      </button>

      <div className="bg-gray-50 p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">Clinic Status:</h3>
          <span className={`font-medium ${isClinicOpen ? 'text-green-600' : 'text-red-600'}`}>
            {isClinicOpen ? 'Open' : 'Closed'}
          </span>
        </div>

        {isClinicOpen ? (
          <>
            <p className="text-gray-700 mb-2">
              Please call:{' '}
              <a 
                href={`tel:${CONFIG.CLINIC_PHONE}`} 
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                {CONFIG.CLINIC_PHONE}
              </a>
            </p>
            <p className="text-gray-600">
              To speak with a customer service executive immediately and schedule a same day appointment.
            </p>
          </>
        ) : (
          <>
            <p className="text-red-600 font-medium mb-2">
              For emergencies outside clinic hours:
            </p>
            <p className="text-gray-600">
              Please visit the nearest emergency department or call emergency services at 995.
            </p>
          </>
        )}
      </div>
    </div>
  );
} 