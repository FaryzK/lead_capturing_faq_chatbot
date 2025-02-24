"use client";

import { useState } from 'react';
import { CONFIG } from '../config';

interface BookingFormProps {
  onSubmit: (details: {
    clinic: string;
    service: string;
    date: string;
    time: string;
    comments?: string;
  }) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState({
    clinic: '',
    service: '',
    date: '',
    time: '',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6">
      <div className="text-left mb-8">
        <h2 className="text-2xl font-bold mb-2">Book an appointment</h2>
        <p className="text-gray-600 mb-2">
          Thank you for choosing Dr Chan Family Clinic!
        </p>
        <p className="text-gray-600 mb-4">
          Help us fill up this form and we will get in touch with you soon 😊
        </p>
        <div className="bg-blue-50 p-3 rounded-xl inline-block">
          <p className="text-blue-800 font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            For emergencies, call: {CONFIG.CLINIC_PHONE}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <label className="flex items-center text-gray-700 font-medium mb-1">
            Select Clinic
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={formData.clinic}
            onChange={(e) => setFormData(prev => ({ ...prev, clinic: e.target.value }))}
            className={`
              w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none
              ${!formData.clinic ? 'text-gray-400' : 'text-gray-700'}
            `}
            required
          >
            <option value="">Select a clinic</option>
            <option value="serangoon">Serangoon Branch</option>
            <option value="tampines">Tampines Branch</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-gray-700 font-medium mb-1">
            Services
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
            className={`
              w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none
              ${!formData.service ? 'text-gray-400' : 'text-gray-700'}
            `}
            required
          >
            <option value="">Select service</option>
            {CONFIG.BOOKING_SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center text-gray-700 font-medium mb-1">
            Appointment Date
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className={`
                w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${!formData.date ? 'text-transparent' : 'text-gray-700'}
              `}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            {!formData.date && (
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                Select appointment date
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="flex items-center text-gray-700 font-medium mb-1">
            Preferred Time
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={formData.time}
            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
            className={`
              w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none
              ${!formData.time ? 'text-gray-400' : 'text-gray-700'}
            `}
            required
          >
            <option value="">Select preferred time</option>
            {CONFIG.BOOKING_TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center text-gray-700 font-medium mb-1">
            Additional Comments
          </label>
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
            placeholder="Any specific concerns or requests?"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors font-medium mt-8"
        >
          Submit Booking Request
        </button>
      </form>
    </div>
  );
} 