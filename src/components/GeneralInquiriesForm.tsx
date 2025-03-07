"use client";

import { useState, FormEvent } from 'react';

interface GeneralInquiriesFormProps {
  onSubmit: (details: { name: string; phone: string; email: string }) => void;
  onBack: () => void;
}

export default function GeneralInquiriesForm({ onSubmit, onBack }: GeneralInquiriesFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.name && formData.phone && formData.email;

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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="text-sm text-gray-500 mt-2">
          I agree that Dr Chan Family Clinic may collect, use and disclose my personal data according to Dr Chan Family Clinic privacy policy.
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`
            w-full p-3 rounded-xl text-white font-medium mt-4
            ${isFormValid 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-300 cursor-not-allowed'}
            transition-colors
          `}
        >
          Start Chat
        </button>
      </form>
    </div>
  );
} 