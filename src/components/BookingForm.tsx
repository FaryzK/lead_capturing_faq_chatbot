"use client";

import { useState } from 'react';
import { CONFIG } from '../config';
import { BookingDetails } from '../types/chat';

interface BookingFormProps {
  onSubmit: (details: BookingDetails) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    service: '',
    date: '',
    time: '',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(bookingDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service
        </label>
        <select
          value={bookingDetails.service}
          onChange={(e) => setBookingDetails(prev => ({ ...prev, service: e.target.value }))}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Select a service</option>
          {CONFIG.BOOKING_SERVICES.map(service => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          value={bookingDetails.date}
          onChange={(e) => setBookingDetails(prev => ({ ...prev, date: e.target.value }))}
          className="w-full p-2 border rounded-lg"
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time
        </label>
        <select
          value={bookingDetails.time}
          onChange={(e) => setBookingDetails(prev => ({ ...prev, time: e.target.value }))}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Select a time</option>
          {CONFIG.BOOKING_TIME_SLOTS.map(slot => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Comments (optional)
        </label>
        <textarea
          value={bookingDetails.comments}
          onChange={(e) => setBookingDetails(prev => ({ ...prev, comments: e.target.value }))}
          className="w-full p-2 border rounded-lg"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Booking
      </button>
    </form>
  );
} 