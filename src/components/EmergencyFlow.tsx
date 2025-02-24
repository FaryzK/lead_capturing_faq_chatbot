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
    <div className="flex flex-col gap-4">
      <button 
        onClick={onBack}
        className="text-blue-600 hover:text-blue-700 transition"
      >
        ← Back to menu
      </button>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">
          Clinic Status: {isClinicOpen ? (
            <span className="text-green-600">Open</span>
          ) : (
            <span className="text-red-600">Closed</span>
          )}
        </h3>

        {isClinicOpen ? (
          <div>
            <p className="mb-2">Please call: <a href={`tel:${CONFIG.CLINIC_PHONE}`} className="text-blue-600 font-semibold">{CONFIG.CLINIC_PHONE}</a></p>
            <p>To speak with a customer service executive immediately and schedule a same day appointment.</p>
          </div>
        ) : (
          <div>
            <p className="text-red-600 font-semibold mb-2">For emergencies outside clinic hours:</p>
            <p>Please visit the nearest emergency department or call emergency services at 995.</p>
          </div>
        )}
      </div>
    </div>
  );
} 